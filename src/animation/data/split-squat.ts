import { defineAnimation } from '../schema';

/**
 * Fente statique / squat bulgare — « Descendez verticalement en pliant les deux genoux jusqu’à ce que le genou
 * arrière frôle le sol, puis remontez en poussant avec le pied avant. » Buste droit, poids sur le pied avant,
 * talon avant au sol, tibia avant presque vertical (le genou avant ne part pas loin devant).
 * Jambe proche = jambe avant (celle qui travaille) ; la jambe arrière est recalée par IK sur sa pointe de pied.
 */
export default defineAnimation({
  exerciseId: 'split-squat',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  ik: [{ limb: 'legF', pin: 'toe' }],
  still: 1,
  keyframes: [
    // Pied arrière sur la pointe : orientation du pied (avant IK) = −inclinaison + hanche − genou + cheville.
    { pose: { hipN: 32, kneeN: 12, ankleN: -20, hipF: -18, kneeF: 18, ankleF: -9 }, dur: 1.5, phase: 'excentrique' },
    { pose: { hipN: 92, kneeN: 98, ankleN: 6, hipF: -5, kneeF: 100, ankleF: 22 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF' }],
  overrides: [
    // Niveau 1 : mains en appui sur un mur (mains fixes, les coudes se plient), amplitude partielle.
    {
      levels: [1],
      keyframes: [
        { pose: { hipN: 32, kneeN: 12, ankleN: -20, hipF: -18, kneeF: 18, ankleF: -22, shoulder: 62, elbow: 18 }, dur: 1.5, phase: 'excentrique' },
        { pose: { hipN: 65, kneeN: 62, ankleN: -3, hipF: -10, kneeF: 65, ankleF: -14 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      ik: [
        { limb: 'legF', pin: 'toe' },
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      props: [{ kind: 'wall', at: [22, 0] }],
    },
    // Squat bulgare : pied arrière posé sur un banc d’environ 40 cm.
    {
      levels: [3, 4, 5],
      keyframes: [
        // Dessus du pied arrière posé sur le banc, pointe vers l'arrière.
        { pose: { tilt: 5, hipN: 32, kneeN: 14, ankleN: -13, hipF: -25, kneeF: 70, ankleF: -40 }, dur: 1.5, phase: 'excentrique' },
        { pose: { tilt: 8, hipN: 96, kneeN: 95, ankleN: 7, hipF: -10, kneeF: 120, ankleF: -30 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      ik: [{ limb: 'legF', pin: 'toe', y: 50 }],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF', y: 50 }],
      props: [{ kind: 'bench', at: [-170, 0], size: [60, 45] }],
    },
    { variants: ['dumbbells'], levels: [4, 5], pose: { shoulder: 0, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { variants: ['barbell'], levels: [4, 5], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
