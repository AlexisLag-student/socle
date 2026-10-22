/**
 * Contenu synthétique pour les tests du moteur (indépendant du contenu réel).
 */
import type { EquipmentId, MuscleId } from '@/domain/ids';
import type { Dosage, Exercise, Pathology } from '@/domain/schema';
import { muscles } from '@/content/muscles';
import type { EngineContent } from './generate';

const L = (s: string) => ({ fr: s, en: s });

export const dose = (sets = 3, reps: [number, number] = [10, 12], restSec = 60, extra: Partial<Dosage> = {}): Dosage => ({
  sets,
  reps,
  restSec,
  perSide: false,
  tempo: '2-0-2',
  intensity: { kind: 'rir', value: L('2') },
  ...extra,
});

export function mkExercise(
  id: string,
  o: Partial<Exercise> & {
    primary?: MuscleId[];
    equipmentVariants?: { id: string; equipment: EquipmentId[]; rank: number; loadable?: boolean }[];
  } = {},
): Exercise {
  const { primary, equipmentVariants, ...rest } = o;
  return {
    id,
    family: id,
    name: L(id),
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: { primary: primary ?? ['vastus-lateralis'], secondary: [] },
    zoom: 'leg-front',
    qualities: ['strength'],
    objectives: ['prevention'],
    preventionFor: ['run', 'bike'],
    why: L('why'),
    how: { setup: L('s'), movement: L('m'), cues: [L('c')] },
    mistakes: [L('x')],
    levels: [1, 2, 3].map((level) => ({
      level,
      name: L(`L${level}`),
      description: L('d'),
      mastery: L('m'),
      dosage: dose(3, [10, 12], 60),
      loaded: level === 3,
    })),
    variants: (equipmentVariants ?? [{ id: 'bw', equipment: [], rank: 1 }]).map((v) => ({
      id: v.id,
      equipment: v.equipment,
      rank: v.rank,
      loadable: v.loadable ?? v.equipment.length > 0,
      name: L(v.id),
      instructions: L('i'),
    })),
    precautions: [L('p')],
    evidence: { level: 'expert', citations: [] },
    ...rest,
  };
}

export function mkPathology(id: string, o: Partial<Pathology> = {}): Pathology {
  return {
    id,
    region: 'knee',
    bodyAreas: ['knee-anterior'],
    sports: ['run', 'bike'],
    name: L(id),
    description: L('d'),
    recognize: L('r'),
    symptoms: [L('s')],
    riskFactors: [L('r')],
    phases: [],
    whenToConsult: [L('w')],
    evidence: { level: 'expert', citations: [] },
    ...o,
  };
}

/** Bibliothèque variée : groupes musculaires, moitiés du corps, matériel, niveaux de preuve. */
export function fixtureContent(): EngineContent {
  const exercises: Exercise[] = [
    mkExercise('quad-a', { primary: ['vastus-lateralis'], evidence: { level: 'strong', citations: [] } }),
    mkExercise('quad-b', { primary: ['rectus-femoris'], family: 'quad-a' }),
    mkExercise('quad-c', { primary: ['vastus-medialis'] }),
    mkExercise('glute-a', { primary: ['glute-max'] }),
    mkExercise('glute-b', { primary: ['glute-med'], evidence: { level: 'moderate', citations: [] } }),
    mkExercise('ham-a', { primary: ['biceps-femoris'] }),
    mkExercise('calf-a', { primary: ['soleus'] }),
    mkExercise('calf-gym', {
      primary: ['gastrocnemius-medial'],
      equipmentVariants: [{ id: 'machine', equipment: ['gym'], rank: 3 }],
    }),
    mkExercise('core-a', { primary: ['rectus-abdominis'], half: 'trunk', qualities: ['control'] }),
    mkExercise('core-b', { primary: ['erector-spinae'], half: 'trunk', qualities: ['endurance'] }),
    mkExercise('upper-a', { primary: ['trapezius-lower'], half: 'upper', preventionFor: ['bike'] }),
    mkExercise('upper-b', { primary: ['rhomboids'], half: 'upper', preventionFor: ['bike'] }),
    mkExercise('plyo-a', {
      primary: ['gastrocnemius-lateral'],
      qualities: ['power'],
      objectives: ['performance'],
      perfGoals: ['power'],
      preventionFor: undefined,
      sports: ['run'],
    }),
    mkExercise('heavy-a', {
      primary: ['glute-max'],
      objectives: ['performance'],
      perfGoals: ['strength'],
      preventionFor: undefined,
      equipmentVariants: [
        { id: 'bw', equipment: [], rank: 1 },
        { id: 'db', equipment: ['dumbbells'], rank: 2 },
        { id: 'bar', equipment: ['barbell'], rank: 3 },
      ],
    }),
    mkExercise('rehab-iso', { primary: ['patellar-tendon'], qualities: ['isometric'], objectives: ['pain'], preventionFor: undefined }),
    mkExercise('rehab-load', { primary: ['vastus-medialis'], objectives: ['pain', 'return'], preventionFor: undefined }),
    mkExercise('rehab-plyo', { primary: ['rectus-femoris'], qualities: ['power'], objectives: ['return'], preventionFor: undefined }),
  ];
  const pathologies: Pathology[] = [
    mkPathology('knee-pain', {
      phases: [
        {
          phase: 'irritable',
          summary: L('s'),
          goals: [L('g')],
          exercises: [
            { exerciseId: 'rehab-iso', priority: 1, startLevel: 1, dosage: dose(5, [1, 1], 60, { reps: undefined, holdSec: 45 }) },
            { exerciseId: 'quad-c', priority: 2, startLevel: 1 },
          ],
          avoid: [{ exerciseId: 'plyo-a', reason: L('r') }],
          nextPhaseCriteria: [L('c')],
        },
        {
          phase: 'rebuild',
          summary: L('s'),
          goals: [L('g')],
          exercises: [
            { exerciseId: 'rehab-load', priority: 1, startLevel: 2 },
            { exerciseId: 'quad-c', priority: 2, startLevel: 2 },
          ],
          nextPhaseCriteria: [],
        },
      ],
    }),
    mkPathology('stress-fracture', {
      medicalClearanceRequired: true,
      phases: [
        {
          phase: 'return-to-sport',
          summary: L('s'),
          goals: [L('g')],
          exercises: [
            { exerciseId: 'calf-a', priority: 1, startLevel: 1 },
            { exerciseId: 'rehab-plyo', priority: 2, startLevel: 1 },
          ],
          nextPhaseCriteria: [],
        },
      ],
    }),
  ];
  return { exercises, pathologies, muscles };
}
