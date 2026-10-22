/**
 * Validation complète du contenu : schémas Zod + contrôles croisés.
 * Fonction pure, utilisée par `npm run validate:content` (prebuild) et par les tests.
 */
import type { z } from 'zod';
import { BODY_AREAS, EQUIPMENT, MUSCLE_IDS, type MuscleId, type ReferenceType } from '@/domain/ids';
import {
  BodyAreaSchema,
  EquipmentSchema,
  ExerciseSchema,
  MuscleSchema,
  PathologySchema,
  ReferenceSchema,
  type BodyArea,
  type Equipment,
  type Evidence,
  type Exercise,
  type Muscle,
  type Pathology,
  type Reference,
} from '@/domain/schema';

export interface ContentBundle {
  muscles: Muscle[];
  equipment: Equipment[];
  bodyAreas: BodyArea[];
  references: Reference[];
  exercises: Exercise[];
  pathologies: Pathology[];
}

/** Muscles effectivement dessinés, par vue (silhouettes `front`/`back` et zooms). */
export type DrawnMuscles = Record<string, ReadonlySet<MuscleId>>;

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

const STRONG_TYPES: ReferenceType[] = ['cpg', 'meta-analysis', 'systematic-review'];
const MODERATE_TYPES: ReferenceType[] = [...STRONG_TYPES, 'rct'];

function zodErrors(label: string, error: z.ZodError): string[] {
  return error.issues.map((i) => `${label} › ${i.path.join('.') || '(racine)'} : ${i.message}`);
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const id of ids) (seen.has(id) ? dup : seen).add(id);
  return [...dup];
}

/** Vérifie que le niveau de preuve déclaré est cohérent avec les types d'études citées. */
export function checkEvidence(
  label: string,
  evidence: Evidence,
  refs: Map<string, Reference>,
): string[] {
  const errors: string[] = [];
  const types: ReferenceType[] = [];
  for (const c of evidence.citations) {
    const ref = refs.get(c.refId);
    if (!ref) errors.push(`${label} › référence inconnue « ${c.refId} »`);
    else types.push(ref.type);
  }
  const dupRefs = duplicates(evidence.citations.map((c) => c.refId));
  if (dupRefs.length) errors.push(`${label} › référence citée deux fois : ${dupRefs.join(', ')}`);
  if (errors.length) return errors;

  const rctCount = types.filter((t) => t === 'rct').length;
  switch (evidence.level) {
    case 'strong':
      if (!types.some((t) => STRONG_TYPES.includes(t)) && rctCount < 2)
        errors.push(
          `${label} › niveau « fort » : il faut une recommandation, une méta-analyse, une revue systématique ou au moins deux essais randomisés`,
        );
      break;
    case 'moderate':
      if (!types.some((t) => MODERATE_TYPES.includes(t)))
        errors.push(`${label} › niveau « modéré » : il faut au moins un essai randomisé (ou mieux)`);
      break;
    case 'low':
      if (types.length === 0) errors.push(`${label} › niveau « faible » : au moins une référence requise`);
      break;
    case 'expert':
      break;
  }
  return errors;
}

export interface ValidateOptions {
  /** Exercices réservés mais pas encore écrits (mode rédaction) : simple avertissement s'ils manquent. */
  planned?: ReadonlySet<string>;
}

export function validateContent(
  content: ContentBundle,
  drawn?: DrawnMuscles,
  options: ValidateOptions = {},
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // --- 1. Schémas -----------------------------------------------------------
  const parse = <T>(schema: z.ZodType<T>, items: T[], kind: string, idOf: (x: T) => string) => {
    for (const item of items) {
      const r = schema.safeParse(item);
      if (!r.success) errors.push(...zodErrors(`${kind}[${idOf(item)}]`, r.error));
    }
    const dup = duplicates(items.map(idOf));
    if (dup.length) errors.push(`${kind} › identifiants en double : ${dup.join(', ')}`);
  };
  parse(MuscleSchema, content.muscles, 'muscle', (m) => m.id);
  parse(EquipmentSchema, content.equipment, 'matériel', (e) => e.id);
  parse(BodyAreaSchema, content.bodyAreas, 'zone', (a) => a.id);
  parse(ReferenceSchema, content.references, 'référence', (r) => r.id);
  parse(ExerciseSchema, content.exercises, 'exercice', (e) => e.id);
  parse(PathologySchema, content.pathologies, 'pathologie', (p) => p.id);

  // --- 2. Registres complets --------------------------------------------------
  if (drawn) {
    for (const id of MUSCLE_IDS)
      if (!drawn.front?.has(id) && !drawn.back?.has(id) && !drawn.sole?.has(id))
        errors.push(`muscle › « ${id} » n'est dessiné sur aucune vue`);
  }
  const registered = new Set(content.muscles.map((m) => m.id));
  for (const id of MUSCLE_IDS)
    if (!registered.has(id)) errors.push(`muscle › « ${id} » absent du registre src/content/muscles.ts`);
  const eqIds = new Set(content.equipment.map((e) => e.id));
  for (const id of EQUIPMENT) if (!eqIds.has(id)) errors.push(`matériel › « ${id} » non décrit`);
  const areaIds = new Set(content.bodyAreas.map((a) => a.id));
  for (const id of BODY_AREAS) if (!areaIds.has(id)) errors.push(`zone › « ${id} » non décrite`);

  // --- 3. Références ------------------------------------------------------------
  const refs = new Map(content.references.map((r) => [r.id, r]));
  for (const key of ['doi', 'pmid'] as const) {
    const values = content.references.map((r) => r[key]?.toLowerCase()).filter(Boolean) as string[];
    const dup = duplicates(values);
    if (dup.length) errors.push(`référence › ${key.toUpperCase()} en double : ${dup.join(', ')}`);
  }
  const usedRefs = new Set<string>();

  // --- 4. Exercices -------------------------------------------------------------
  const exercises = new Map(content.exercises.map((e) => [e.id, e]));
  const usedByPathology = new Set<string>();
  for (const ex of content.exercises) {
    const label = `exercice[${ex.id}]`;
    ex.evidence.citations.forEach((c) => usedRefs.add(c.refId));
    errors.push(...checkEvidence(label, ex.evidence, refs));
    if (ex.evidence.level !== 'expert' && ex.evidence.citations.length === 0)
      errors.push(`${label} › niveau de preuve « ${ex.evidence.level} » sans référence`);

    if (drawn) {
      const all = [...ex.muscles.primary, ...ex.muscles.secondary];
      for (const m of all) {
        if (!drawn.front?.has(m) && !drawn.back?.has(m) && !drawn.sole?.has(m))
          errors.push(`${label} › muscle « ${m} » dessiné sur aucune vue (face, dos, plante du pied)`);
      }
      const zoom = drawn[ex.zoom];
      if (!zoom) errors.push(`${label} › zoom « ${ex.zoom} » sans dessin`);
      else {
        const missing = ex.muscles.primary.filter((m) => !zoom.has(m));
        if (missing.length)
          errors.push(`${label} › muscles principaux absents du zoom « ${ex.zoom} » : ${missing.join(', ')}`);
      }
    }
    if (!ex.variants.some((v) => v.equipment.length === 0 || v.equipment.every((e) => e === 'bodyweight')))
      warnings.push(`${label} › aucune variante au poids du corps`);
  }

  // --- 5. Pathologies ---------------------------------------------------------
  for (const p of content.pathologies) {
    const label = `pathologie[${p.id}]`;
    p.evidence.citations.forEach((c) => usedRefs.add(c.refId));
    errors.push(...checkEvidence(label, p.evidence, refs));
    if (p.evidence.level !== 'expert' && p.evidence.citations.length === 0)
      errors.push(`${label} › niveau de preuve « ${p.evidence.level} » sans référence`);
    for (const ph of p.phases) {
      for (const pe of ph.exercises) {
        usedByPathology.add(pe.exerciseId);
        const ex = exercises.get(pe.exerciseId);
        if (!ex) {
          if (options.planned?.has(pe.exerciseId))
            warnings.push(`${label} › phase ${ph.phase} › exercice réservé pas encore écrit « ${pe.exerciseId} »`);
          else errors.push(`${label} › phase ${ph.phase} › exercice inconnu « ${pe.exerciseId} »`);
          continue;
        }
        if (pe.startLevel && pe.startLevel > ex.levels.length)
          errors.push(
            `${label} › phase ${ph.phase} › « ${pe.exerciseId} » : startLevel ${pe.startLevel} > ${ex.levels.length} niveaux`,
          );
        if (!ex.sports.some((s) => p.sports.includes(s)))
          warnings.push(`${label} › « ${pe.exerciseId} » ne concerne aucun des sports de la pathologie`);
      }
      for (const a of ph.avoid ?? []) {
        if (!exercises.has(a.exerciseId) && !options.planned?.has(a.exerciseId))
          errors.push(`${label} › phase ${ph.phase} › exercice à éviter inconnu « ${a.exerciseId} »`);
        if (ph.exercises.some((e) => e.exerciseId === a.exerciseId))
          errors.push(`${label} › phase ${ph.phase} › « ${a.exerciseId} » à la fois prescrit et à éviter`);
      }
    }
  }

  for (const r of content.references)
    if (!usedRefs.has(r.id)) warnings.push(`référence[${r.id}] › jamais citée`);
  for (const ex of content.exercises)
    if (!usedByPathology.has(ex.id) && !ex.preventionFor?.length && !ex.objectives.some((o) => o === 'performance'))
      warnings.push(`exercice[${ex.id}] › n'est atteignable par le moteur ni par une pathologie, ni par la prévention, ni par la performance`);

  return { errors, warnings };
}

export function contentStats(c: ContentBundle) {
  const byLevel = (items: { evidence: Evidence }[]) =>
    Object.fromEntries(
      (['strong', 'moderate', 'low', 'expert'] as const).map((l) => [
        l,
        items.filter((i) => i.evidence.level === l).length,
      ]),
    );
  return {
    exercises: c.exercises.length,
    pathologies: c.pathologies.length,
    references: c.references.length,
    exercisesByEvidence: byLevel(c.exercises),
    pathologiesByEvidence: byLevel(c.pathologies),
  };
}
