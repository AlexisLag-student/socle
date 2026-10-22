/**
 * Schémas Zod du contenu (exercices, pathologies, références…).
 * Les types TypeScript sont inférés de ces schémas : une seule source de vérité.
 * Les objets sont « stricts » : une clé inconnue (faute de frappe) fait échouer la validation.
 */
import { z } from 'zod';
import {
  BODY_AREAS,
  BODY_ZONES,
  EQUIPMENT,
  EVIDENCE_LEVELS,
  INTENSITY_KINDS,
  MUSCLE_GROUPS,
  MUSCLE_IDS,
  OBJECTIVES,
  PATHOLOGY_REGIONS,
  PERF_GOALS,
  PHASES,
  QUALITIES,
  REFERENCE_TYPES,
  SPORTS,
  ZOOM_REGIONS,
} from './ids';

const nonEmpty = z.string().trim().min(1, 'texte vide');
const kebabId = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'identifiant attendu en kebab-case (a-z, 0-9, tirets)');

/** Texte bilingue. Les deux langues sont obligatoires. */
export const LocalizedSchema = z.strictObject({ fr: nonEmpty, en: nonEmpty });
export type L = z.infer<typeof LocalizedSchema>;

export const SportSchema = z.enum(SPORTS);
export const ObjectiveSchema = z.enum(OBJECTIVES);
export const PerfGoalSchema = z.enum(PERF_GOALS);
export const PhaseSchema = z.enum(PHASES);
export const QualitySchema = z.enum(QUALITIES);
export const EvidenceLevelSchema = z.enum(EVIDENCE_LEVELS);
export const EquipmentIdSchema = z.enum(EQUIPMENT);
export const BodyZoneSchema = z.enum(BODY_ZONES);
export const ZoomRegionSchema = z.enum(ZOOM_REGIONS);
export const BodyAreaIdSchema = z.enum(BODY_AREAS);
export const MuscleIdSchema = z.enum(MUSCLE_IDS);
export const MuscleGroupSchema = z.enum(MUSCLE_GROUPS);

// ---------------------------------------------------------------------------
// Registres
// ---------------------------------------------------------------------------

export const MuscleSchema = z.strictObject({
  id: MuscleIdSchema,
  name: LocalizedSchema,
  kind: z.enum(['muscle', 'tendon', 'fascia']),
  /** Muscle profond : dessiné avec un contour en pointillés. */
  deep: z.boolean(),
  group: MuscleGroupSchema,
  /** Rôle général du muscle, affiché au survol / dans la légende détaillée. */
  role: LocalizedSchema.optional(),
});
export type Muscle = z.infer<typeof MuscleSchema>;

export const EquipmentSchema = z.strictObject({
  id: EquipmentIdSchema,
  name: LocalizedSchema,
  hint: LocalizedSchema,
});
export type Equipment = z.infer<typeof EquipmentSchema>;

export const BodyAreaSchema = z.strictObject({
  id: BodyAreaIdSchema,
  name: LocalizedSchema,
  view: z.enum(['front', 'back']),
});
export type BodyArea = z.infer<typeof BodyAreaSchema>;

// ---------------------------------------------------------------------------
// Références scientifiques
// ---------------------------------------------------------------------------

export const ReferenceSchema = z
  .strictObject({
    id: kebabId,
    authors: z.array(nonEmpty).min(1),
    year: z.number().int().min(1950).max(2100),
    title: nonEmpty,
    journal: nonEmpty,
    doi: z
      .string()
      .regex(/^10\.\d{4,9}\/\S+$/, 'DOI invalide (attendu : 10.xxxx/...)')
      .optional(),
    pmid: z.string().regex(/^\d{5,9}$/, 'PMID invalide').optional(),
    url: z.url().optional(),
    type: z.enum(REFERENCE_TYPES),
    verification: z.strictObject({
      status: z.literal('verified'),
      checkedAt: z.iso.date(),
      via: z.enum(['pubmed', 'crossref', 'publisher']),
      /** Le résumé a été lu pour confirmer la phrase « ce que l'étude a montré ». */
      abstractChecked: z.boolean(),
    }),
  })
  .refine((r) => r.doi || r.pmid || r.url, {
    message: 'une référence doit avoir un DOI, un PMID ou une URL',
  });
export type Reference = z.infer<typeof ReferenceSchema>;

export const CitationSchema = z.strictObject({
  refId: kebabId,
  /** Une phrase résumant ce que l'étude a montré (en lien avec l'exercice ou la pathologie). */
  finding: LocalizedSchema,
});
export type Citation = z.infer<typeof CitationSchema>;

export const EvidenceSchema = z.strictObject({
  level: EvidenceLevelSchema,
  citations: z.array(CitationSchema),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

// ---------------------------------------------------------------------------
// Exercices
// ---------------------------------------------------------------------------

const repRange = z
  .tuple([z.number().int().min(1), z.number().int().min(1)])
  .refine(([a, b]) => a <= b, 'plage de répétitions inversée');

export const DosageSchema = z
  .strictObject({
    sets: z.number().int().min(1).max(10),
    /** Répétitions [min, max] (identiques si fixe). */
    reps: repRange.optional(),
    /** Durée de maintien ou d'effort, en secondes. */
    holdSec: z.number().int().min(5).max(600).optional(),
    /** Tempo excentrique-pause-concentrique(-pause), « X » = explosif. Ex. « 3-0-3 ». */
    tempo: z
      .string()
      .regex(/^([0-9]|X)(-([0-9]|X)){2,3}$/, 'tempo attendu sous la forme 3-1-1 ou X-0-X')
      .optional(),
    restSec: z.number().int().min(0).max(600),
    perSide: z.boolean(),
    intensity: z.strictObject({ kind: z.enum(INTENSITY_KINDS), value: LocalizedSchema }),
    frequency: LocalizedSchema.optional(),
  })
  .refine((d) => d.reps || d.holdSec, {
    message: 'un dosage doit préciser des répétitions ou une durée',
  });
export type Dosage = z.infer<typeof DosageSchema>;

export const ProgressionLevelSchema = z.strictObject({
  level: z.number().int().min(1).max(5),
  name: LocalizedSchema,
  description: LocalizedSchema,
  /** Critère de maîtrise pour passer au niveau suivant. */
  mastery: LocalizedSchema,
  dosage: DosageSchema,
  /** Matériel indispensable à ce niveau (en plus de la variante choisie). */
  requires: z.array(EquipmentIdSchema).optional(),
  /** Ce niveau demande une charge additionnelle : seulement possible avec une variante `loadable`. */
  loaded: z.boolean().optional(),
});
export type ProgressionLevel = z.infer<typeof ProgressionLevelSchema>;

export const EquipmentVariantSchema = z.strictObject({
  id: kebabId,
  /** Matériel requis (tous). Tableau vide = poids du corps. */
  equipment: z.array(EquipmentIdSchema),
  name: LocalizedSchema,
  instructions: LocalizedSchema,
  /** La charge peut être augmentée progressivement (haltères, machine, barre…). */
  loadable: z.boolean(),
  /** Préférence quand plusieurs variantes sont possibles : plus grand = préféré. */
  rank: z.number().int().min(0).max(10),
});
export type EquipmentVariant = z.infer<typeof EquipmentVariantSchema>;

export const ExerciseSchema = z
  .strictObject({
    id: kebabId,
    /** Famille de mouvement : le moteur ne met jamais deux exercices de la même famille dans une séance. */
    family: kebabId,
    name: LocalizedSchema,
    sports: z.array(SportSchema).min(1),
    zones: z.array(BodyZoneSchema).min(1),
    half: z.enum(['lower', 'upper', 'trunk']),
    muscles: z.strictObject({
      primary: z.array(MuscleIdSchema).min(1),
      secondary: z.array(MuscleIdSchema),
    }),
    zoom: ZoomRegionSchema,
    qualities: z.array(QualitySchema).min(1),
    objectives: z.array(ObjectiveSchema).min(1),
    perfGoals: z.array(PerfGoalSchema).optional(),
    /** Exercice de prévention générale pour ces sports (niveau 3 du moteur). */
    preventionFor: z.array(SportSchema).optional(),
    /** Rôle général du muscle dans la course ou le vélo, en langage clair. */
    why: LocalizedSchema,
    how: z.strictObject({
      setup: LocalizedSchema,
      movement: LocalizedSchema,
      cues: z.array(LocalizedSchema).min(1),
      breathing: LocalizedSchema.optional(),
    }),
    mistakes: z.array(LocalizedSchema).min(1),
    levels: z.array(ProgressionLevelSchema).min(3).max(5),
    variants: z.array(EquipmentVariantSchema).min(1),
    precautions: z.array(LocalizedSchema).min(1),
    contraindications: z.array(LocalizedSchema).optional(),
    evidence: EvidenceSchema,
  })
  .superRefine((e, ctx) => {
    e.levels.forEach((l, i) => {
      if (l.level !== i + 1)
        ctx.addIssue({
          code: 'custom',
          path: ['levels', i, 'level'],
          message: `les niveaux doivent être numérotés 1..n dans l'ordre (trouvé ${l.level} en position ${i + 1})`,
        });
    });
    const variantIds = e.variants.map((v) => v.id);
    if (new Set(variantIds).size !== variantIds.length)
      ctx.addIssue({ code: 'custom', path: ['variants'], message: 'identifiants de variantes en double' });
    const overlap = e.muscles.primary.filter((m) => e.muscles.secondary.includes(m));
    if (overlap.length)
      ctx.addIssue({
        code: 'custom',
        path: ['muscles'],
        message: `muscle à la fois principal et secondaire : ${overlap.join(', ')}`,
      });
    if (e.objectives.includes('performance') && !e.perfGoals?.length)
      ctx.addIssue({
        code: 'custom',
        path: ['perfGoals'],
        message: 'un exercice lié à la performance doit préciser perfGoals',
      });
  });
export type Exercise = z.infer<typeof ExerciseSchema>;

// ---------------------------------------------------------------------------
// Pathologies
// ---------------------------------------------------------------------------

export const PhaseExerciseSchema = z.strictObject({
  exerciseId: kebabId,
  /** 1 = essentiel, 2 = recommandé, 3 = complémentaire. */
  priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  /** Niveau de progression conseillé au départ dans cette phase. */
  startLevel: z.number().int().min(1).max(5).optional(),
  /** Dosage spécifique à la phase (ex. protocole publié), prioritaire sur celui du niveau. */
  dosage: DosageSchema.optional(),
  note: LocalizedSchema.optional(),
});
export type PhaseExercise = z.infer<typeof PhaseExerciseSchema>;

export const PathologyPhaseSchema = z.strictObject({
  phase: PhaseSchema,
  summary: LocalizedSchema,
  goals: z.array(LocalizedSchema).min(1),
  exercises: z.array(PhaseExerciseSchema).min(2),
  avoid: z.array(z.strictObject({ exerciseId: kebabId, reason: LocalizedSchema })).optional(),
  /** Critères pour passer à la phase suivante (vide autorisé pour la dernière phase). */
  nextPhaseCriteria: z.array(LocalizedSchema),
  /** Conseils de gestion de charge propres à la phase. */
  loadAdvice: LocalizedSchema.optional(),
});
export type PathologyPhase = z.infer<typeof PathologyPhaseSchema>;

export const PathologySchema = z
  .strictObject({
    id: kebabId,
    region: z.enum(PATHOLOGY_REGIONS),
    bodyAreas: z.array(BodyAreaIdSchema).min(1),
    sports: z.array(SportSchema).min(1),
    name: LocalizedSchema,
    aka: z.array(LocalizedSchema).optional(),
    /** Description simple. */
    description: LocalizedSchema,
    /** Aide à se reconnaître, sans jamais poser de diagnostic. */
    recognize: LocalizedSchema,
    symptoms: z.array(LocalizedSchema).min(1),
    riskFactors: z.array(LocalizedSchema).min(1),
    /** Mise en garde (ex. diagnostic débattu). */
    caveat: LocalizedSchema.optional(),
    /** N'est proposée qu'en reprise, après feu vert médical. */
    medicalClearanceRequired: z.boolean().optional(),
    phases: z.array(PathologyPhaseSchema).min(1),
    whenToConsult: z.array(LocalizedSchema).min(1),
    complementaryAdvice: z.array(LocalizedSchema).optional(),
    evidence: EvidenceSchema,
  })
  .superRefine((p, ctx) => {
    const phases = p.phases.map((ph) => ph.phase);
    if (new Set(phases).size !== phases.length)
      ctx.addIssue({ code: 'custom', path: ['phases'], message: 'phase en double' });
    const order = PHASES.filter((ph) => phases.includes(ph));
    if (order.join() !== phases.join())
      ctx.addIssue({
        code: 'custom',
        path: ['phases'],
        message: 'phases attendues dans l’ordre irritable → rebuild → return-to-sport',
      });
    if (p.medicalClearanceRequired && phases.join() !== 'return-to-sport')
      ctx.addIssue({
        code: 'custom',
        path: ['phases'],
        message: 'une pathologie avec feu vert médical requis ne propose que la phase return-to-sport',
      });
    p.phases.forEach((ph, i) => {
      const ids = ph.exercises.map((e) => e.exerciseId);
      if (new Set(ids).size !== ids.length)
        ctx.addIssue({
          code: 'custom',
          path: ['phases', i, 'exercises'],
          message: 'exercice en double dans une phase',
        });
      const isLast = i === p.phases.length - 1;
      if (!isLast && ph.nextPhaseCriteria.length === 0)
        ctx.addIssue({
          code: 'custom',
          path: ['phases', i, 'nextPhaseCriteria'],
          message: 'critères de passage à la phase suivante manquants',
        });
    });
  });
export type Pathology = z.infer<typeof PathologySchema>;

// ---------------------------------------------------------------------------
// Aides d'écriture du contenu
// ---------------------------------------------------------------------------

/** Identité typée : autocomplétion et vérification des ids à l'écriture. */
export const defineExercise = (e: Exercise): Exercise => e;
export const definePathology = (p: Pathology): Pathology => p;
export const defineReference = (r: Reference): Reference => r;
