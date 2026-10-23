import { defineAnimation } from '../schema';

/**
 * Montée sur pointes explosive — « Redescendez en 2 secondes, puis montez le plus vite possible sur la pointe du pied,
 * sans quitter le sol. » Mains au mur, genoux tendus ; montée rapide (fin de course amortie), descente lente.
 */
export default defineAnimation({
  exerciseId: 'calf-raise-explosive',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    { pose: { knee: 3, hip: 3, shoulder: 62, elbow: 12 }, dur: 0.8, phase: 'concentrique', ease: 'easeOut', say: 'rise' },
    { pose: { ankle: -42 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  props: [{ kind: 'wall', at: [43, 0] }],
  overrides: [
    { levels: [2, 3, 4], side: 'unilateral', pose: { hipF: 12, kneeF: 75, ankleF: -20 }, contacts: [{ point: 'toeN' }, { point: 'heelN', from: 0, to: 0 }] },
    // Niveau 3 : depuis le talon sous le niveau de la marche.
    {
      levels: [3],
      anchor: { point: 'toeN', y: 18 },
      keyframes: [
        { pose: { knee: 3, hip: 3, ankle: 18, shoulder: 62, elbow: 12, hipF: 12, kneeF: 75, ankleF: -20 }, dur: 0.8, phase: 'concentrique', ease: 'easeOut', say: 'rise' },
        { pose: { ankle: -42, ankleF: -20 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN', y: 18 }],
      props: [{ kind: 'step', at: [-5, 0], size: [36, 18] }],
    },
    { levels: [4], variants: ['bodyweight', 'dumbbell'], pose: { shoulderN: 4, elbowN: 6, shoulderF: 62, elbowF: 12 }, ik: [{ limb: 'armF', pin: 'wrist' }], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [4], variants: ['machine'], pose: { shoulder: -35, elbow: 125 }, ik: [], props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
