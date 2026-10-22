/**
 * Identifiants stables du domaine.
 * Ces listes sont la source de vérité des unions TypeScript et des énumérations Zod.
 * Ne jamais renommer un identifiant publié : les liens de partage et l'historique en dépendent
 * (ajouter un alias dans src/content/aliases.ts si un renommage est inévitable).
 */

export const SPORTS = ['run', 'bike'] as const;
export type Sport = (typeof SPORTS)[number];

export const OBJECTIVES = ['prevention', 'performance', 'return', 'pain'] as const;
export type Objective = (typeof OBJECTIVES)[number];

/** Sous-objectifs de performance. */
export const PERF_GOALS = ['strength', 'power', 'running-economy', 'sprint-fv'] as const;
export type PerfGoal = (typeof PERF_GOALS)[number];

/** Phases de prise en charge d'une douleur ou d'une reprise. */
export const PHASES = ['irritable', 'rebuild', 'return-to-sport'] as const;
export type Phase = (typeof PHASES)[number];

/** Ce que l'exercice développe. */
export const QUALITIES = [
  'strength',
  'endurance',
  'control',
  'power',
  'mobility',
  'tendon-stiffness',
  'isometric',
] as const;
export type Quality = (typeof QUALITIES)[number];

export const EVIDENCE_LEVELS = ['strong', 'moderate', 'low', 'expert'] as const;
export type EvidenceLevel = (typeof EVIDENCE_LEVELS)[number];

/** Matériel proposé dans le parcours. Le poids du corps est toujours disponible. */
export const EQUIPMENT = [
  'bodyweight',
  'band',
  'dumbbells',
  'barbell',
  'step',
  'gym',
  'swiss-ball',
  'suspension',
] as const;
export type EquipmentId = (typeof EQUIPMENT)[number];

/** Zones de la bibliothèque (filtre « zone »). */
export const BODY_ZONES = [
  'foot-ankle',
  'calf',
  'knee',
  'thigh',
  'hip-glutes',
  'adductors',
  'trunk',
  'neck-shoulders',
  'arms-hands',
] as const;
export type BodyZone = (typeof BODY_ZONES)[number];

/** Régions agrandies dans les schémas musculaires. */
export const ZOOM_REGIONS = [
  'leg-front',
  'leg-back',
  'foot-sole',
  'pelvis-front',
  'pelvis-back',
  'trunk-front',
  'trunk-back',
  'shoulders-neck',
  'forearm-hand',
] as const;
export type ZoomRegion = (typeof ZOOM_REGIONS)[number];

export const BODY_VIEWS = ['front', 'back'] as const;
export type BodyView = (typeof BODY_VIEWS)[number];

/** Régions des pathologies (organisation de la liste). */
export const PATHOLOGY_REGIONS = ['foot-ankle', 'knee', 'hip-thigh', 'trunk-upper'] as const;
export type PathologyRegion = (typeof PATHOLOGY_REGIONS)[number];

/** Zones cliquables de la carte du corps (choix des douleurs). */
export const BODY_AREAS = [
  'forefoot',
  'heel-plantar',
  'ankle-medial',
  'ankle-lateral',
  'achilles',
  'calf',
  'shin-medial',
  'knee-anterior',
  'knee-medial',
  'knee-lateral',
  'thigh-posterior',
  'ischial',
  'hip-lateral',
  'hip-anterior',
  'groin',
  'buttock',
  'lower-back',
  'neck',
  'shoulders-trapezius',
  'hands-wrists',
] as const;
export type BodyAreaId = (typeof BODY_AREAS)[number];

/** Groupes musculaires utilisés pour équilibrer les séances. */
export const MUSCLE_GROUPS = [
  'foot',
  'calf',
  'shin',
  'quads',
  'hamstrings',
  'adductors',
  'glutes',
  'hip-flexors',
  'hip-rotators',
  'core-anterior',
  'core-lateral',
  'core-posterior',
  'upper-back',
  'shoulders',
  'chest',
  'neck',
  'arms',
] as const;
export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

/**
 * Muscles et structures (tendons, fascias) dessinés dans les schémas.
 * Chaque identifiant doit exister dans au moins un dessin SVG (contrôlé par la validation).
 */
export const MUSCLE_IDS = [
  // Pied
  'plantar-fascia',
  'abductor-hallucis',
  'flexor-digitorum-brevis',
  'quadratus-plantae',
  'abductor-digiti-minimi',
  // Jambe
  'gastrocnemius-medial',
  'gastrocnemius-lateral',
  'soleus',
  'achilles-tendon',
  'tibialis-anterior',
  'tibialis-posterior',
  'fibularis-longus',
  'fibularis-brevis',
  'extensor-digitorum-longus',
  'flexor-hallucis-longus',
  'flexor-digitorum-longus',
  // Cuisse et genou
  'rectus-femoris',
  'vastus-lateralis',
  'vastus-medialis',
  'vastus-intermedius',
  'patellar-tendon',
  'biceps-femoris',
  'semitendinosus',
  'semimembranosus',
  'sartorius',
  'gracilis',
  'adductor-longus',
  'adductor-magnus',
  'tensor-fasciae-latae',
  'it-band',
  // Hanche
  'glute-max',
  'glute-med',
  'glute-min',
  'piriformis',
  'deep-hip-rotators',
  'iliopsoas',
  // Tronc
  'rectus-abdominis',
  'external-oblique',
  'internal-oblique',
  'transversus-abdominis',
  'erector-spinae',
  'multifidus',
  'quadratus-lumborum',
  'latissimus-dorsi',
  // Épaules, cou, membres supérieurs
  'pectoralis-major',
  'serratus-anterior',
  'trapezius-upper',
  'trapezius-middle',
  'trapezius-lower',
  'rhomboids',
  'levator-scapulae',
  'deltoid-anterior',
  'deltoid-lateral',
  'deltoid-posterior',
  'rotator-cuff',
  'sternocleidomastoid',
  'deep-neck-flexors',
  'neck-extensors',
  'biceps-brachii',
  'triceps-brachii',
  'forearm-flexors',
  'forearm-extensors',
  'hand-intrinsics',
] as const;
export type MuscleId = (typeof MUSCLE_IDS)[number];

export const REFERENCE_TYPES = [
  'cpg',
  'consensus',
  'meta-analysis',
  'systematic-review',
  'rct',
  'cohort',
  'case-series',
  'cross-sectional',
  'narrative-review',
] as const;
export type ReferenceType = (typeof REFERENCE_TYPES)[number];

export const INTENSITY_KINDS = ['rpe', 'rir', 'load', 'bodyweight', 'symptom-guided'] as const;
export type IntensityKind = (typeof INTENSITY_KINDS)[number];

export const FEEDBACK = ['easy', 'ok', 'hard'] as const;
export type Feedback = (typeof FEEDBACK)[number];
