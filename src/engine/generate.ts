/**
 * Moteur de recommandation — fonction pure et déterministe.
 *
 * Priorités : (1) exercices des pathologies déclarées, dans la bonne phase ;
 * (2) exercices liés aux objectifs ; (3) prévention générale du sport.
 * À pertinence égale, le meilleur niveau de preuve l'emporte.
 * Les séances sont équilibrées (familles, groupes musculaires, haut/bas du corps) et tiennent dans la durée choisie.
 */
import { PHASES, type EvidenceLevel, type MuscleGroup, type Phase } from '@/domain/ids';
import type { Dosage, Exercise, Muscle, Pathology } from '@/domain/schema';
import type { ItemReason, Profile, ProgramItem, ProgramSession } from '@/domain/user';
import { SESSION_KEYS } from '@/domain/user';
import { resolveExerciseId, resolvePathologyId } from '@/content/aliases';
import {
  availableLevels,
  clampLevel,
  equipmentSet,
  pickVariant,
  type EquipmentSet,
} from './availability';
import { exerciseSeconds, reduceDosage } from './duration';
import { orderSession } from './balance';

export const ENGINE_VERSION = 1;
export const MIN_ITEMS = 4;
export const MAX_ITEMS = 8;

export type EngineProfile = Pick<
  Profile,
  'sports' | 'objectives' | 'perfGoals' | 'pathologies' | 'equipment' | 'sessionsPerWeek' | 'minutes'
>;

export interface EngineContent {
  exercises: readonly Exercise[];
  pathologies: readonly Pathology[];
  muscles: readonly Muscle[];
}

/** État acquis d'un exercice (niveau atteint, variante choisie), conservé entre deux régénérations. */
export interface EngineExerciseState {
  level: number;
  variantId?: string;
}

export interface EngineWarning {
  kind: 'pathology-unknown' | 'pathology-phase-adjusted' | 'pathology-no-exercise' | 'medical-clearance' | 'few-exercises';
  ref?: string;
  phase?: Phase;
}

export interface GeneratedSession extends ProgramSession {
  estimatedSec: number;
}

export interface GenerationResult {
  sessions: GeneratedSession[];
  warnings: EngineWarning[];
  /** Pathologies prises en compte, avec la phase réellement utilisée. */
  pathologies: { id: string; phase: Phase }[];
}

interface Candidate {
  exercise: Exercise;
  tier: 1 | 2 | 3;
  priority: number;
  reason: ItemReason;
  startLevel?: number;
  phaseDosage?: Dosage;
  /** Exercice essentiel d'une pathologie : présent dans chaque séance. */
  mandatory: boolean;
  /** Nombre de sous-objectifs de performance couverts (départage). */
  match: number;
}

const EVIDENCE_RANK: Record<EvidenceLevel, number> = { strong: 0, moderate: 1, low: 2, expert: 3 };
const DEFAULT_LEVEL_BY_PHASE: Record<Phase, number> = { irritable: 1, rebuild: 2, 'return-to-sport': 3 };

function compareCandidates(a: Candidate, b: Candidate): number {
  return (
    a.tier - b.tier ||
    a.priority - b.priority ||
    b.match - a.match ||
    EVIDENCE_RANK[a.exercise.evidence.level] - EVIDENCE_RANK[b.exercise.evidence.level] ||
    a.exercise.id.localeCompare(b.exercise.id)
  );
}

/** Phase de la pathologie la plus proche de celle demandée. */
export function resolvePhase(p: Pathology, wanted: Phase): Phase {
  const available = p.phases.map((ph) => ph.phase);
  if (available.includes(wanted)) return wanted;
  const wi = PHASES.indexOf(wanted);
  return [...available].sort(
    (a, b) => Math.abs(PHASES.indexOf(a) - wi) - Math.abs(PHASES.indexOf(b) - wi) || PHASES.indexOf(b) - PHASES.indexOf(a),
  )[0]!;
}

export function primaryGroup(ex: Exercise, muscleGroups: ReadonlyMap<string, MuscleGroup>): MuscleGroup | undefined {
  return muscleGroups.get(ex.muscles.primary[0]!);
}

/** Construit la liste ordonnée des candidats, avec les exclusions des pathologies. */
export function collectCandidates(
  profile: EngineProfile,
  content: EngineContent,
): { candidates: Candidate[]; warnings: EngineWarning[]; pathologies: { id: string; phase: Phase }[] } {
  const warnings: EngineWarning[] = [];
  const exById = new Map(content.exercises.map((e) => [e.id, e]));
  const pathById = new Map(content.pathologies.map((p) => [p.id, p]));
  const sports = new Set(profile.sports);
  const sportOk = (e: Exercise) => e.sports.some((s) => sports.has(s));
  const avoid = new Set<string>();
  const candidates: Candidate[] = [];
  const used: { id: string; phase: Phase }[] = [];

  // --- 1. Pathologies -------------------------------------------------------
  for (const declared of profile.pathologies) {
    const p = pathById.get(resolvePathologyId(declared.id));
    if (!p) {
      warnings.push({ kind: 'pathology-unknown', ref: declared.id });
      continue;
    }
    if (p.medicalClearanceRequired) warnings.push({ kind: 'medical-clearance', ref: p.id });
    const phase = p.medicalClearanceRequired ? 'return-to-sport' : resolvePhase(p, declared.phase);
    const finalPhase = p.phases.some((ph) => ph.phase === phase) ? phase : resolvePhase(p, phase);
    if (finalPhase !== declared.phase) warnings.push({ kind: 'pathology-phase-adjusted', ref: p.id, phase: finalPhase });
    used.push({ id: p.id, phase: finalPhase });
    const ph = p.phases.find((x) => x.phase === finalPhase)!;
    ph.avoid?.forEach((a) => avoid.add(resolveExerciseId(a.exerciseId)));
    for (const pe of ph.exercises) {
      const ex = exById.get(resolveExerciseId(pe.exerciseId));
      if (!ex) continue;
      candidates.push({
        exercise: ex,
        tier: 1,
        priority: pe.priority,
        reason: { kind: 'pathology', ref: p.id },
        startLevel: pe.startLevel ?? DEFAULT_LEVEL_BY_PHASE[finalPhase],
        phaseDosage: pe.dosage,
        mandatory: pe.priority === 1,
        match: 0,
      });
    }
  }

  // --- 2. Objectifs ------------------------------------------------------------
  const perfGoals = new Set(profile.perfGoals);
  for (const ex of content.exercises) {
    if (!sportOk(ex)) continue;
    if (profile.objectives.includes('performance') && ex.objectives.includes('performance')) {
      const goals = ex.perfGoals ?? [];
      const match = perfGoals.size ? goals.filter((g) => perfGoals.has(g)).length : 1;
      if (match > 0)
        candidates.push({
          exercise: ex, tier: 2, priority: 2, match, mandatory: false, startLevel: 2,
          reason: { kind: 'objective', ref: 'performance' },
        });
    }
    if (
      profile.objectives.includes('prevention') &&
      ex.objectives.includes('prevention') &&
      ex.preventionFor?.some((s) => sports.has(s))
    )
      candidates.push({
        exercise: ex, tier: 2, priority: 2, match: 0, mandatory: false,
        reason: { kind: 'objective', ref: 'prevention' },
      });
  }

  // --- 3. Prévention générale du sport ----------------------------------------
  for (const ex of content.exercises) {
    if (!sportOk(ex)) continue;
    const forSports = ex.preventionFor?.filter((s) => sports.has(s)) ?? [];
    if (forSports.length)
      candidates.push({
        exercise: ex, tier: 3, priority: 3, match: 0, mandatory: false,
        reason: { kind: 'prevention', ref: forSports.join('+') },
      });
  }

  // Exclusions, puis tri et dédoublonnage (un exercice garde sa meilleure raison).
  const kept = candidates.filter((c) => !avoid.has(c.exercise.id)).sort(compareCandidates);
  const seen = new Set<string>();
  const unique = kept.filter((c) => (seen.has(c.exercise.id) ? false : (seen.add(c.exercise.id), true)));

  for (const u of used) {
    if (!unique.some((c) => c.reason.kind === 'pathology' && c.reason.ref === u.id))
      warnings.push({ kind: 'pathology-no-exercise', ref: u.id });
  }
  return { candidates: unique, warnings, pathologies: used };
}

/** Transforme un candidat en élément de programme selon le matériel et l'état acquis. */
function toItem(
  c: Candidate,
  eq: EquipmentSet,
  state: EngineExerciseState | undefined,
): ProgramItem | undefined {
  const ex = c.exercise;
  const variant = pickVariant(ex, eq, state?.variantId);
  if (!variant) return undefined;
  const levels = availableLevels(ex, variant, eq);
  const wanted = state?.level ?? c.startLevel ?? 1;
  const level = clampLevel(wanted, levels);
  if (level === undefined) return undefined;
  const levelDef = ex.levels.find((l) => l.level === level)!;
  // Le dosage propre à la phase s'applique tant que l'on est au niveau de départ prescrit.
  const usePhaseDosage = c.phaseDosage && level === clampLevel(c.startLevel ?? level, levels);
  return {
    exerciseId: ex.id,
    variantId: variant.id,
    level,
    dosage: usePhaseDosage ? c.phaseDosage! : levelDef.dosage,
    reason: c.reason,
  };
}

const sessionSeconds = (items: readonly ProgramItem[]) => items.reduce((s, i) => s + exerciseSeconds(i.dosage), 0);

/**
 * Génère un programme pour un profil. Fonction pure : mêmes entrées → même sortie.
 */
export function generateProgram(
  profile: EngineProfile,
  content: EngineContent,
  states: ReadonlyMap<string, EngineExerciseState> = new Map(),
): GenerationResult {
  const eq = equipmentSet(profile.equipment);
  const { candidates, warnings, pathologies } = collectCandidates(profile, content);
  const muscleGroups = new Map(content.muscles.map((m) => [m.id as string, m.group]));
  const budget = profile.minutes * 60;
  const sessionCount = Math.min(Math.max(profile.sessionsPerWeek, 1), 3);

  // Candidats réalisables avec le matériel.
  const pool = candidates
    .map((c) => ({ c, item: toItem(c, eq, states.get(c.exercise.id)) }))
    .filter((x): x is { c: Candidate; item: ProgramItem } => !!x.item);

  const mandatory = pool.filter((x) => x.c.mandatory);
  const optional = pool.filter((x) => !x.c.mandatory);

  type Slot = { items: ProgramItem[]; families: Set<string>; groups: Map<string, number> };
  const slots: Slot[] = Array.from({ length: sessionCount }, () => ({ items: [], families: new Set(), groups: new Map() }));

  const groupOf = (id: string) => {
    const ex = content.exercises.find((e) => e.id === id)!;
    return primaryGroup(ex, muscleGroups) ?? 'other';
  };

  const tryAdd = (slot: Slot, x: { c: Candidate; item: ProgramItem }, opts: { force?: boolean; maxPerGroup: number }) => {
    const ex = x.c.exercise;
    if (slot.items.length >= MAX_ITEMS) return false;
    if (slot.items.some((i) => i.exerciseId === ex.id) || slot.families.has(ex.family)) return false;
    const g = groupOf(ex.id);
    if (!opts.force && (slot.groups.get(g) ?? 0) >= opts.maxPerGroup) return false;
    let item = { ...x.item };
    const remaining = budget - sessionSeconds(slot.items);
    while (exerciseSeconds(item.dosage) > remaining) {
      const reduced = reduceDosage(item.dosage);
      if (!reduced) break;
      item = { ...item, dosage: reduced };
    }
    if (!opts.force && exerciseSeconds(item.dosage) > remaining) return false;
    slot.items.push(item);
    slot.families.add(ex.family);
    slot.groups.set(g, (slot.groups.get(g) ?? 0) + 1);
    return true;
  };

  // 1. Exercices essentiels des pathologies : dans chaque séance.
  for (const slot of slots) for (const x of mandatory) tryAdd(slot, x, { force: true, maxPerGroup: 99 });

  // 2. Autres candidats, par ordre de priorité, répartis pour varier les séances.
  let cursor = 0;
  for (const x of optional) {
    for (let k = 0; k < sessionCount; k++) {
      const slot = slots[(cursor + k) % sessionCount]!;
      if (tryAdd(slot, x, { maxPerGroup: 2 })) {
        cursor = (cursor + k + 1) % sessionCount;
        break;
      }
    }
  }

  // 3. Compléter les séances trop courtes (minimum 4 exercices), en réduisant le volume si besoin.
  for (const slot of slots) {
    for (const maxPerGroup of [2, 3, 99]) {
      for (const x of optional) {
        if (slot.items.length >= MIN_ITEMS) break;
        tryAdd(slot, x, { maxPerGroup });
      }
    }
    for (const x of optional) {
      if (slot.items.length >= MIN_ITEMS) break;
      tryAdd(slot, x, { force: true, maxPerGroup: 99 });
    }
  }

  // 4. Si la séance dépasse le budget (exercices essentiels nombreux), réduire le volume des moins prioritaires.
  for (const slot of slots) {
    for (let guard = 0; guard < 40 && sessionSeconds(slot.items) > budget * 1.1; guard++) {
      let changed = false;
      for (let i = slot.items.length - 1; i >= 0 && sessionSeconds(slot.items) > budget * 1.1; i--) {
        const reduced = reduceDosage(slot.items[i]!.dosage);
        if (reduced) {
          slot.items[i] = { ...slot.items[i]!, dosage: reduced };
          changed = true;
        }
      }
      if (!changed) {
        // Retirer le dernier exercice non essentiel au-delà du minimum.
        const removable = [...slot.items].reverse().find((it) => !mandatory.some((m) => m.c.exercise.id === it.exerciseId));
        if (slot.items.length > MIN_ITEMS && removable) slot.items.splice(slot.items.indexOf(removable), 1);
        else break;
      }
    }
  }

  if (slots.some((s) => s.items.length < MIN_ITEMS)) warnings.push({ kind: 'few-exercises' });

  const exById = new Map(content.exercises.map((e) => [e.id, e]));
  const sessions: GeneratedSession[] = slots.map((slot, i) => {
    const items = orderSession(slot.items, exById, muscleGroups);
    return { key: SESSION_KEYS[i]!, items, estimatedSec: sessionSeconds(items) };
  });
  return { sessions, warnings, pathologies };
}
