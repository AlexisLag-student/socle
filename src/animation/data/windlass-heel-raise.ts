import { defineAnimation } from '../schema';

/**
 * Montée sur pointes, serviette sous les orteils (Rathleff) — « Montez sur la pointe du pied en 3 secondes,
 * tenez 2 secondes en haut, puis redescendez en 3 secondes. » Serviette roulée sous les orteils (cale arrondie),
 * genoux tendus sans être verrouillés, mains au mur. Appui = pointe du pied, posée sur la serviette.
 */
export default defineAnimation({
  exerciseId: 'windlass-heel-raise',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN', y: 4 },
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    // Orteils relevés sur la serviette : pied légèrement incliné, talon au sol.
    { pose: { knee: 3, hip: 3, ankle: 9, shoulder: 62, elbow: 12 }, dur: 3, phase: 'concentrique', say: 'rise' },
    { pose: { ankle: -38 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'toeN', y: 4 }, { point: 'toeF', y: 4 }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  props: [
    { kind: 'wall', at: [43, 0] },
    { kind: 'pad', at: [-6, 0], size: [12, 4] },
  ],
  overrides: [
    // Niveaux 2 à 5 : sur une jambe, l'autre pied décollé derrière.
    { levels: [2, 3, 4, 5], side: 'unilateral', pose: { hipF: 12, kneeF: 75, ankleF: -20 }, contacts: [{ point: 'toeN', y: 4 }, { point: 'heelN', from: 0, to: 0 }] },
    // Niveaux 3 et 5 : sur une marche, serviette sous les orteils, talon sous le niveau de la marche.
    {
      levels: [3, 5],
      anchor: { point: 'toeN', y: 22 },
      keyframes: [
        { pose: { knee: 3, hip: 3, ankle: 22, shoulder: 62, elbow: 12, hipF: 12, kneeF: 75, ankleF: -20 }, dur: 3, phase: 'concentrique', say: 'rise' },
        { pose: { ankle: -38, ankleF: -20 }, dur: 2, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN', y: 22 }],
      props: [
        { kind: 'step', at: [-5, 0], size: [36, 18] },
        { kind: 'pad', at: [-6, 18], size: [12, 4] },
      ],
    },
    // Niveaux 4 et 5 : lesté, charge du côté de la jambe qui travaille, l'autre main au mur.
    { levels: [4, 5], variants: ['bodyweight', 'dumbbell'], pose: { shoulderN: 4, elbowN: 6, shoulderF: 62, elbowF: 12 }, ik: [{ limb: 'armF', pin: 'wrist' }], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [4, 5], variants: ['machine'], pose: { shoulder: -35, elbow: 125 }, ik: [], props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
