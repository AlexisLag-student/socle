import { defineAnimation } from '../schema';

/**
 * Pont fessier / hip thrust — « Poussez dans les talons pour monter le bassin jusqu’à aligner épaules, hanches
 * et genoux. Tenez une seconde en serrant les fessiers, puis redescendez lentement sans relâcher. »
 * Couché sur le dos, tête à gauche : inclinaison −90° = tronc horizontal, ventre vers le haut.
 * Pas de cambrure (tronc aligné sur le bassin), menton légèrement rentré, tibias verticaux en haut.
 * Appui = haut du dos ; les pieds restent à plat (IK sur le milieu du pied).
 */
export default defineAnimation({
  exerciseId: 'glute-bridge',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder' },
  ik: [
    { limb: 'legN', pin: 'mid', flat: true },
    { limb: 'legF', pin: 'mid', flat: true },
  ],
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hip: 55, knee: 125, ankle: -20 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: { tilt: -114, hip: 25, knee: 95, ankle: -20 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveau 2 : poussée sur une jambe, l'autre genou ramené vers la poitrine.
    {
      levels: [2],
      side: 'unilateral',
      ik: [{ limb: 'legN', pin: 'mid', flat: true }],
      pose: { hipF: 105, kneeF: 115, ankleF: -10 },
      contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'toeN' }],
    },
    // Hip thrust : haut du dos sur un banc d’environ 40 cm, plus grande amplitude.
    {
      levels: [3, 4, 5],
      anchor: { point: 'shoulder', y: 40 },
      keyframes: [
        { pose: { tilt: -62, trunk: 0, neck: 15, shoulder: 10, elbow: 0, hip: 95, knee: 110, ankle: -47 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { tilt: -92, neck: 20, hip: 2, knee: 90 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'shoulder', y: 40 }, { point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
      props: [{ kind: 'bench', at: [-62, 0], size: [62, 40] }],
    },
    // Niveau 3 : sur une jambe.
    { levels: [3], side: 'unilateral', ik: [{ limb: 'legN', pin: 'mid', flat: true }], pose: { hipF: 110, kneeF: 110, ankleF: -10 }, contacts: [{ point: 'shoulder', y: 40 }, { point: 'heelN' }, { point: 'toeN' }] },
    { variants: ['band'], props: [{ kind: 'band', from: { seg: 'thighN', u: 0.82, v: 1.4 }, to: { seg: 'thighN', u: 0.82, v: -1.4 } }] },
    { variants: ['dumbbell'], pose: { shoulder: 12, elbow: 10 }, props: [{ kind: 'dumbbell', attach: 'pelvis', at: [0.15, -1.5] }] },
    { variants: ['barbell'], pose: { shoulder: 12, elbow: 10 }, props: [{ kind: 'barbell', attach: 'pelvis', at: [0.15, -1.6] }] },
  ],
});
