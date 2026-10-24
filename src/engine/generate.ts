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
import { itemBounds, reduceDosage, sessionSeconds } from './duration';
import { orderSession, sessionCategory } from './balance';

export const ENGINE_VERSION = 2;

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
  /** Plafond de niveau imposé par la phase de la pathologie. */
  maxLevel?: number;
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
        ...(pe.maxLevel ? { maxLevel: pe.maxLevel } : {}),
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
  const levels = availableLevels(ex, variant, eq).filter((l) => !c.maxLevel || l <= c.maxLevel);
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
    ...(c.maxLevel ? { maxLevel: c.maxLevel } : {}),
  };
}

/** Fréquences du contenu qui permettent l'exercice tous les jours (comparées sur le libellé anglais, stable). */
const DAILY_FREQUENCIES = new Set(['Daily', 'Twice a day']);
/** Nombre maximal de séances par semaine selon la fréquence du contenu. */
const WEEKLY_MAX: Record<string, number> = { 'Every other day': 3, '3 times a week': 3, '2 times a week': 2 };

/**
 * Un exercice « demande de la récupération » si sa fréquence (dans le contenu) n'est pas quotidienne ;
 * sans fréquence, s'il développe la force, la puissance ou la raideur du tendon.
 */
export function needsRecovery(ex: Exercise, dosage: Dosage): boolean {
  const f = dosage.frequency?.en;
  if (f) return !DAILY_FREQUENCIES.has(f);
  return ex.qualities.some((q) => q === 'strength' || q === 'power' || q === 'tendon-stiffness');
}

function weeklyMax(dosage: Dosage): number {
  return WEEKLY_MAX[dosage.frequency?.en ?? ''] ?? 2;
}

/** Séances voisines dans la rotation (la dernière précède la première de la semaine suivante). */
export function neighbours(index: number, count: number): number[] {
  if (count < 2) return [];
  return [...new Set([(index - 1 + count) % count, (index + 1) % count])].filter((k) => k !== index);
}

/** Nombre de séances types : une par séance hebdomadaire jusqu'à 3, puis 4 ou 5 séances distinctes. */
export function sessionTypeCount(sessionsPerWeek: number): number {
  return Math.min(Math.max(Math.round(sessionsPerWeek), 1), SESSION_KEYS.length);
}

/**
 * Génère un programme pour un profil. Fonction pure : mêmes entrées → même sortie.
 *
 * À partir de 4 séances par semaine, les séances voisines dans la rotation sont traitées comme deux jours
 * de suite : un exercice qui demande de la récupération n'y figure jamais deux fois, et deux séances voisines
 * ne sollicitent pas en charge le même groupe musculaire principal (voir DECISIONS.md).
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
  const bounds = itemBounds(profile.minutes);
  const sessionCount = sessionTypeCount(profile.sessionsPerWeek);
  const spread = sessionCount >= 4;

  // Candidats réalisables avec le matériel.
  const pool = candidates
    .map((c) => ({ c, item: toItem(c, eq, states.get(c.exercise.id)) }))
    .filter((x): x is { c: Candidate; item: ProgramItem } => !!x.item);

  const mandatory = pool.filter((x) => x.c.mandatory);
  const optional = pool.filter((x) => !x.c.mandatory);

  type Slot = { items: ProgramItem[]; families: Set<string>; groups: Map<string, number>; heavy: Set<string> };
  const slots: Slot[] = Array.from({ length: sessionCount }, () => ({ items: [], families: new Set(), groups: new Map(), heavy: new Set() }));

  const exById = new Map(content.exercises.map((e) => [e.id, e]));
  const groupOf = (id: string) => primaryGroup(exById.get(id)!, muscleGroups) ?? 'other';
  const uses = (id: string) => slots.filter((s) => s.items.some((i) => i.exerciseId === id)).length;

  /** Règles de récupération (4 et 5 séances) : jamais deux séances voisines lourdes sur le même exercice ou le même groupe. */
  const recoveryOk = (k: number, x: { c: Candidate; item: ProgramItem }) => {
    if (!spread || !needsRecovery(x.c.exercise, x.item.dosage)) return true;
    const id = x.c.exercise.id;
    const g = groupOf(id);
    if (uses(id) >= weeklyMax(x.item.dosage)) return false;
    return neighbours(k, sessionCount).every((n) => !slots[n]!.items.some((i) => i.exerciseId === id) && !slots[n]!.heavy.has(g));
  };

  const tryAdd = (k: number, x: { c: Candidate; item: ProgramItem }, opts: { force?: boolean; maxPerGroup: number }) => {
    const slot = slots[k]!;
    const ex = x.c.exercise;
    if (slot.items.length >= bounds.max) return false;
    if (slot.items.some((i) => i.exerciseId === ex.id) || slot.families.has(ex.family)) return false;
    if (!recoveryOk(k, x)) return false;
    const g = groupOf(ex.id);
    if (!opts.force && (slot.groups.get(g) ?? 0) >= opts.maxPerGroup) return false;
    let item = { ...x.item };
    const over = (it: ProgramItem) => sessionSeconds([...slot.items, it]) > budget;
    while (over(item)) {
      const reduced = reduceDosage(item.dosage);
      if (!reduced) break;
      item = { ...item, dosage: reduced };
    }
    if (!opts.force && over(item)) return false;
    slot.items.push(item);
    slot.families.add(ex.family);
    slot.groups.set(g, (slot.groups.get(g) ?? 0) + 1);
    if (spread && needsRecovery(ex, item.dosage)) slot.heavy.add(g);
    return true;
  };

  // 1. Exercices essentiels des pathologies : dans chaque séance. À partir de 4 séances, ceux qui demandent
  //    de la récupération vont dans deux séances non voisines (A et C, B et D…), en choisissant la paire
  //    la moins chargée pour que les séances restent différentes.
  const pairs: number[][] = [];
  for (let a = 0; a < sessionCount; a++)
    for (let b = a + 2; b < sessionCount; b++) if (!neighbours(a, sessionCount).includes(b)) pairs.push([a, b]);
  const load = (k: number) => sessionSeconds(slots[k]!.items);
  for (const x of mandatory) {
    if (!(spread && needsRecovery(x.c.exercise, x.item.dosage))) {
      slots.forEach((_, k) => tryAdd(k, x, { force: true, maxPerGroup: 99 }));
      continue;
    }
    const pair = pairs
      .filter((pr) => pr.every((k) => recoveryOk(k, x)))
      .sort((p1, p2) => load(p1[0]!) + load(p1[1]!) - (load(p2[0]!) + load(p2[1]!)))[0];
    for (const k of pair ?? [0]) tryAdd(k, x, { force: true, maxPerGroup: 99 });
  }

  // 2. Autres candidats, par ordre de priorité, répartis pour varier les séances.
  let cursor = 0;
  for (const x of optional) {
    for (let j = 0; j < sessionCount; j++) {
      const k = (cursor + j) % sessionCount;
      if (tryAdd(k, x, { maxPerGroup: 2 })) {
        cursor = (k + 1) % sessionCount;
        break;
      }
    }
  }

  // 3. Séances de 45 min et plus : un exercice léger (tronc, contrôle, mobilité) pour finir, s'il en manque un.
  if (profile.minutes >= 45)
    slots.forEach((slot, k) => {
      const light = (id: string) => sessionCategory(exById.get(id)!) >= 3;
      if (slot.items.some((i) => light(i.exerciseId))) return;
      for (const x of optional) if (light(x.c.exercise.id) && tryAdd(k, x, { maxPerGroup: 2 })) return;
    });

  // 3 bis. Séance nettement plus courte que la durée choisie (choix réparti sur 4 ou 5 séances, plafond
  //        d'exercices) : la compléter avec les exercices les moins utilisés, règles de récupération comprises.
  slots.forEach((slot, k) => {
    const byUse = [...optional].sort((a, b) => uses(a.c.exercise.id) - uses(b.c.exercise.id));
    for (const x of byUse) {
      if (sessionSeconds(slot.items) >= budget * 0.95 || slot.items.length >= bounds.max) return;
      tryAdd(k, x, { maxPerGroup: 2 });
    }
  });

  // 4. Compléter les séances trop courtes (minimum selon la durée), en réduisant le volume si besoin.
  //    On privilégie d'abord un groupe musculaire absent de la séance (équilibre), même au prix d'un volume réduit.
  //    Les règles de récupération ne sont jamais levées.
  slots.forEach((slot, k) => {
    const fill = (pred: (x: (typeof optional)[number]) => boolean, opts: { force?: boolean; maxPerGroup: number }) => {
      for (const x of optional) {
        if (slot.items.length >= bounds.min) return;
        if (pred(x)) tryAdd(k, x, opts);
      }
    };
    const newGroup = (x: (typeof optional)[number]) => !slot.groups.has(groupOf(x.c.exercise.id));
    fill(newGroup, { maxPerGroup: 2 });
    fill(newGroup, { force: true, maxPerGroup: 99 });
    for (const maxPerGroup of [2, 3]) fill(() => true, { maxPerGroup });
    fill(() => true, { force: true, maxPerGroup: 99 });
  });

  // 4 bis. Deux séances types identiques (exercices essentiels qui remplissent tout) : ajouter à la seconde
  //       l'exercice le plus court qui la distingue, en respectant les règles de récupération.
  const signature = (items: readonly ProgramItem[]) => items.map((i) => i.exerciseId).sort().join(',');
  const duplicates = (k: number, items: readonly ProgramItem[]) => slots.some((o, j) => j !== k && signature(o.items) === signature(items));
  //       Séance pleine : son dernier exercice facultatif est remplacé (ou retiré).
  const isMandatory = (id: string) => mandatory.some((m) => m.c.exercise.id === id);
  slots.forEach((slot, k) => {
    const twin = slots.find((o, j) => j < k && signature(o.items) === signature(slot.items));
    if (!twin) return;
    const shortest = [...optional]
      .filter((x) => !twin.items.some((i) => i.exerciseId === x.c.exercise.id))
      .sort((a, b) => sessionSeconds([a.item]) - sessionSeconds([b.item]));
    const distinct = (x: (typeof optional)[number]) => !duplicates(k, [...slot.items, x.item]);
    for (const x of shortest) if (distinct(x) && tryAdd(k, x, { force: true, maxPerGroup: 99 })) return;
    const last = [...slot.items].reverse().find((i) => !isMandatory(i.exerciseId));
    if (!last) return; // séance faite des seuls exercices essentiels : le protocole l'impose
    const ex = exById.get(last.exerciseId)!;
    const g = groupOf(ex.id);
    slot.items.splice(slot.items.indexOf(last), 1);
    slot.families.delete(ex.family);
    slot.groups.set(g, (slot.groups.get(g) ?? 1) - 1);
    if (!slot.items.some((i) => needsRecovery(exById.get(i.exerciseId)!, i.dosage) && groupOf(i.exerciseId) === g)) slot.heavy.delete(g);
    for (const x of shortest) if (x.c.exercise.id !== last.exerciseId && distinct(x) && tryAdd(k, x, { force: true, maxPerGroup: 99 })) return;
    // Aucun remplaçant possible : la séance, plus courte d'un exercice, reste distincte si le minimum est tenu.
    if (slot.items.length >= bounds.min && !duplicates(k, slot.items)) return;
    tryAdd(k, { c: optional.find((o) => o.c.exercise.id === last.exerciseId)!.c, item: last }, { force: true, maxPerGroup: 99 });
  });

  // 5. Si la séance dépasse le budget (exercices essentiels nombreux), réduire le volume des moins prioritaires.
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
        const k = slots.indexOf(slot);
        const removable = [...slot.items]
          .reverse()
          .find((it) => !isMandatory(it.exerciseId) && !duplicates(k, slot.items.filter((x) => x !== it)));
        if (slot.items.length > bounds.min && removable) slot.items.splice(slot.items.indexOf(removable), 1);
        else break;
      }
    }
  }

  if (slots.some((s) => s.items.length < bounds.min)) warnings.push({ kind: 'few-exercises' });

  const sessions: GeneratedSession[] = slots.map((slot, i) => {
    const items = orderSession(slot.items, exById, muscleGroups);
    return { key: SESSION_KEYS[i]!, items, estimatedSec: sessionSeconds(items) };
  });
  return { sessions, warnings, pathologies };
}
