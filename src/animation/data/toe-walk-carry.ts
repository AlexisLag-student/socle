import { defineAnimation, type Keyframe } from '../schema';

/**
 * Marche sur la pointe des pieds — « Marchez à petits pas en gardant les talons hauts pendant toute la durée. »
 * Buste droit. Montrée en marche sur place (un cycle d'animation doit revenir à son point de départ) :
 * un pied se lève pendant que l'autre reste sur sa pointe, talons toujours décollés.
 */
/** `swing` : balancement des bras (0 quand les mains portent une charge). */
const walk = (knee: number, hip: number, swing = 18): Keyframe[] => [
  { pose: { tilt: 0, hip, knee, ankle: -30, shoulder: 4, elbow: 8 }, dur: 0.3, phase: 'concentrique', say: 'step', anchor: 'toeF' },
  { pose: { hipN: hip + 25, kneeN: knee + 40, ankleN: -25, shoulderN: 4 - swing, shoulderF: 4 + swing }, dur: 0.3, phase: 'concentrique', say: 'step', anchor: 'toeF' },
  { pose: { hipN: hip, kneeN: knee, ankleN: -30, shoulderN: 4, shoulderF: 4 }, dur: 0.3, phase: 'concentrique', say: 'step', anchor: 'toeN' },
  { pose: { hipF: hip + 25, kneeF: knee + 40, ankleF: -25, shoulderF: 4 - swing, shoulderN: 4 + swing }, dur: 0.3, phase: 'concentrique', say: 'step', anchor: 'toeN' },
];

export default defineAnimation({
  exerciseId: 'toe-walk-carry',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeF' },
  still: 1,
  keyframes: walk(4, 3),
  contacts: [
    { point: 'toeF', from: 0, to: 2 },
    { point: 'toeN', from: 2, to: 0 },
  ],
  overrides: [
    // Niveau 2 : genoux légèrement fléchis.
    { levels: [2], keyframes: walk(20, 14) },
    // Niveaux 3 et 4 : un haltère ou une kettlebell dans chaque main, bras le long du corps.
    {
      levels: [3, 4],
      keyframes: walk(4, 3, 0),
      pose: { elbow: 4 },
      props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }],
    },
  ],
});
