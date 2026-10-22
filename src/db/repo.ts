/**
 * Accès aux données locales (profil, programmes, séances, progression, sauvegarde).
 */
import type { Feedback } from '@/domain/ids';
import {
  BackupSchema,
  type Backup,
  type ExerciseState,
  type Profile,
  type Program,
  type SessionEntry,
  type SessionLog,
} from '@/domain/user';
import { ENGINE_VERSION, generateProgram, type EngineContent, type GenerationResult } from '@/engine/generate';
import { initialState, recordFeedback, resolveSuggestion, type ProgressionContext } from '@/engine/progression';
import { db, getReminders, type SocleDB } from './db';

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// --- Profil -----------------------------------------------------------------

export async function getProfile(d: SocleDB = db): Promise<Profile | undefined> {
  return d.profile.get('me');
}

export async function saveProfile(profile: Omit<Profile, 'id' | 'updatedAt'>, d: SocleDB = db): Promise<Profile> {
  const p: Profile = { ...profile, id: 'me', updatedAt: Date.now() };
  await d.profile.put(p);
  return p;
}

// --- Programmes ---------------------------------------------------------------

export async function getActiveProgram(d: SocleDB = db): Promise<Program | undefined> {
  return (await d.programs.toArray()).find((p) => p.active);
}

export async function listPrograms(d: SocleDB = db): Promise<Program[]> {
  return (await d.programs.toArray()).sort((a, b) => b.createdAt - a.createdAt);
}

/** Enregistre un programme ; s'il est activé, les autres sont désactivés. */
export async function saveProgram(program: Program, d: SocleDB = db): Promise<Program> {
  const p = { ...program, updatedAt: Date.now() };
  await d.transaction('rw', d.programs, async () => {
    if (p.active) {
      const others = (await d.programs.toArray()).filter((x) => x.active && x.id !== p.id);
      for (const o of others) await d.programs.put({ ...o, active: false });
    }
    await d.programs.put(p);
  });
  return p;
}

export async function activateProgram(id: string, d: SocleDB = db): Promise<void> {
  const p = await d.programs.get(id);
  if (p) await saveProgram({ ...p, active: true, archivedAt: undefined }, d);
}

export async function deleteProgram(id: string, d: SocleDB = db): Promise<void> {
  await d.programs.delete(id);
}

export function newProgram(partial: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program {
  const now = Date.now();
  return { ...partial, id: uid(), createdAt: now, updatedAt: now };
}

/** États de progression connus, pour que le moteur réutilise les niveaux acquis. */
export async function exerciseStates(d: SocleDB = db): Promise<Map<string, ExerciseState>> {
  return new Map((await d.exerciseStates.toArray()).map((s) => [s.exerciseId, s]));
}

/**
 * (Re)génère le programme automatique à partir du profil. L'ancien programme automatique est archivé ;
 * l'historique des séances et les niveaux acquis sont conservés.
 */
export async function regenerateProgram(
  profile: Profile,
  content: EngineContent,
  meta: { title: string; contentVersion: string },
  d: SocleDB = db,
): Promise<{ program: Program; result: GenerationResult }> {
  const states = await exerciseStates(d);
  const result = generateProgram(profile, content, states);
  const program = newProgram({
    origin: 'auto',
    active: true,
    title: meta.title,
    sessions: result.sessions.map(({ key, items }) => ({ key, items })),
    sessionsPerWeek: profile.sessionsPerWeek,
    engineVersion: ENGINE_VERSION,
    contentVersion: meta.contentVersion,
  });
  await d.transaction('rw', d.programs, async () => {
    for (const old of (await d.programs.toArray()).filter((p) => p.origin === 'auto' && !p.archivedAt))
      await d.programs.put({ ...old, active: false, archivedAt: Date.now() });
  });
  await saveProgram(program, d);
  return { program, result };
}

// --- Séances ---------------------------------------------------------------------

export async function listLogs(d: SocleDB = db): Promise<SessionLog[]> {
  return (await d.logs.toArray()).sort((a, b) => a.startedAt - b.startedAt);
}

export async function saveLog(log: SessionLog, d: SocleDB = db): Promise<void> {
  await d.logs.put(log);
}

export function newLog(programId: string, sessionKey: SessionLog['sessionKey'], entries: SessionEntry[]): SessionLog {
  return { id: uid(), programId, sessionKey, startedAt: Date.now(), entries };
}

/** Prochaine séance à faire : rotation A → B → C après la dernière séance terminée du programme. */
export async function nextSessionKey(program: Program, d: SocleDB = db): Promise<Program['sessions'][number]['key']> {
  const keys = program.sessions.map((s) => s.key);
  const logs = (await d.logs.where('programId').equals(program.id).toArray()).filter((l) => l.finishedAt);
  const last = logs.sort((a, b) => (b.finishedAt ?? 0) - (a.finishedAt ?? 0))[0];
  if (!last) return keys[0]!;
  const i = keys.indexOf(last.sessionKey);
  return keys[(i + 1) % keys.length]!;
}

// --- Progression -------------------------------------------------------------------

export async function applyFeedback(
  exerciseId: string,
  level: number,
  variantId: string,
  feedback: Feedback,
  ctx: ProgressionContext,
  loadKg: number | undefined,
  d: SocleDB = db,
): Promise<ExerciseState> {
  const now = Date.now();
  const prev = (await d.exerciseStates.get(exerciseId)) ?? initialState(exerciseId, level, now, variantId);
  // Le niveau affiché fait foi (le praticien ou l'utilisateur peut l'avoir changé).
  const base: ExerciseState = { ...prev, level, variantId, ...(loadKg !== undefined ? { loadKg } : {}) };
  const next = recordFeedback(base, feedback, ctx, now);
  await d.exerciseStates.put(next);
  return next;
}

/** Accepte ou refuse une proposition ; si acceptée, met à jour le niveau dans le programme actif. */
export async function decideSuggestion(exerciseId: string, accepted: boolean, d: SocleDB = db): Promise<ExerciseState | undefined> {
  const st = await d.exerciseStates.get(exerciseId);
  if (!st?.pending) return st;
  const next = resolveSuggestion(st, accepted, Date.now());
  await d.exerciseStates.put(next);
  return next;
}

// --- Sauvegarde ----------------------------------------------------------------

export async function exportBackup(d: SocleDB = db): Promise<Backup> {
  return {
    app: 'socle',
    version: 1,
    exportedAt: Date.now(),
    profile: (await getProfile(d)) ?? null,
    programs: await d.programs.toArray(),
    logs: await d.logs.toArray(),
    exerciseStates: await d.exerciseStates.toArray(),
    reminders: await getReminders(d),
  };
}

/** Remplace toutes les données locales par celles de la sauvegarde (après validation). */
export async function importBackup(json: unknown, d: SocleDB = db): Promise<Backup> {
  const backup = BackupSchema.parse(json);
  await d.transaction('rw', [d.profile, d.programs, d.logs, d.exerciseStates, d.kv], async () => {
    await Promise.all([d.profile.clear(), d.programs.clear(), d.logs.clear(), d.exerciseStates.clear()]);
    if (backup.profile) await d.profile.put(backup.profile);
    await d.programs.bulkPut(backup.programs);
    await d.logs.bulkPut(backup.logs);
    await d.exerciseStates.bulkPut(backup.exerciseStates);
    if (backup.reminders) await d.kv.put({ key: 'reminders', value: backup.reminders });
  });
  return backup;
}

export async function clearAll(d: SocleDB = db): Promise<void> {
  await Promise.all([d.profile.clear(), d.programs.clear(), d.logs.clear(), d.exerciseStates.clear(), d.kv.clear()]);
}
