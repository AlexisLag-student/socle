import { defineAnimation } from '../schema';

/**
 * Chaise contre le mur — « Glissez le long du mur jusqu’à l’angle de genou indiqué et tenez la position, puis remontez
 * en glissant. » Dos plaqué au mur (appui fixe, monté et descendu par le décalage y), pieds à environ 40 cm du mur,
 * recalés à plat. Niveau 2 : cuisses à l’horizontale.
 */
export default defineAnimation({
  exerciseId: 'wall-sit',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder', y: 129 },
  ik: [
    { limb: 'legN', pin: 'mid', flat: true },
    { limb: 'legF', pin: 'mid', flat: true },
  ],
  still: 1,
  keyframes: [
    { pose: { tilt: -17, neck: 15, hip: 0, knee: 0, ankle: -17, shoulder: 4, elbow: 8 }, dur: 2, phase: 'excentrique' },
    { pose: { y: -36, tilt: 0, neck: 0 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 2, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'wall', at: [-1, 0], flip: true }],
  overrides: [
    // Niveau 1 : chaise haute (genoux à environ 45°).
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: -17, neck: 15, hip: 0, knee: 0, ankle: -17, shoulder: 4, elbow: 8 }, dur: 1.5, phase: 'excentrique' },
        { pose: { y: -14, tilt: -8, neck: 8 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
    },
    // Niveau 3 : une jambe avancée qui ne fait que toucher le sol.
    {
      levels: [3],
      side: 'unilateral',
      ik: [{ limb: 'legN', pin: 'mid', flat: true }],
      keyframes: [
        { pose: { tilt: -17, neck: 15, hip: 0, knee: 0, ankle: -17, hipF: 15, ankleF: -10, shoulder: 4, elbow: 8 }, dur: 2, phase: 'excentrique' },
        { pose: { y: -36, tilt: 0, neck: 0, hipF: 80, kneeF: 55, ankleF: -10 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 2, phase: 'retour' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }],
    },
    // Niveau 4 : haltères posés sur les cuisses, près des genoux.
    { levels: [4], pose: { shoulder: 20, elbow: 75 }, props: [{ kind: 'dumbbell', attach: 'thighN', at: [0.86, 1.9] }] },
  ],
});
