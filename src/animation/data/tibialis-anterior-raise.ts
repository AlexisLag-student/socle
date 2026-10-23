import { defineAnimation } from '../schema';

/**
 * Relevé de pointe (tibial antérieur) — « Relevez les pointes de pied le plus haut possible en gardant les talons au sol,
 * puis reposez-les lentement. » Dos appuyé au mur, talons à 20 cm du mur (40 cm au niveau 2), jambes tendues :
 * le corps, droit, est incliné vers le mur. Appui = talon.
 */
export default defineAnimation({
  exerciseId: 'tibialis-anterior-raise',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  // Haut du dos fixe contre le mur ; les jambes sont recalées pour garder les talons au sol.
  anchor: { point: 'shoulder', x: -26.7, y: 135.1 },
  ik: [
    { limb: 'legN', pin: 'heel' },
    { limb: 'legF', pin: 'heel' },
  ],
  still: 1,
  keyframes: [
    // Pied à plat : cheville = genou − hanche + inclinaison ; menton légèrement rentré, tête contre le mur.
    { pose: { tilt: -9, neck: 12, hip: 0, knee: 0, ankle: -9, shoulder: 4, elbow: 8 }, dur: 1, phase: 'concentrique', say: 'lift' },
    { pose: { ankle: 12 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'heelF' }, { point: 'toeN', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
  overrides: [
    { levels: [1, 3], props: [{ kind: 'wall', at: [-27, 0], flip: true }] },
    // Niveau 2 : talons plus loin du mur, corps plus incliné.
    {
      levels: [2],
      anchor: { point: 'shoulder', x: -44.2, y: 129.3 },
      keyframes: [
        { pose: { tilt: -17, neck: 22, hip: 0, knee: 0, ankle: -17, shoulder: 4, elbow: 8 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { ankle: 10 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      props: [{ kind: 'wall', at: [-44.5, 0], flip: true }],
    },
    // Niveau 3 : sur un pied, l'autre pied décollé devant.
    { levels: [3], side: 'unilateral', ik: [{ limb: 'legN', pin: 'heel' }], pose: { hipF: 25, kneeF: 30, ankleF: 0 }, contacts: [{ point: 'heelN' }, { point: 'toeN', from: 0, to: 0 }] },
    // Niveau 4 : assis au bord d’un banc, charge sur l’avant-pied.
    {
      levels: [4],
      anchor: { point: 'heelN' },
      ik: [],
      keyframes: [
        { pose: { tilt: 0, trunk: 0, hip: 90, knee: 75, ankle: -15, shoulder: 15, elbow: 20 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { ankle: 20 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'heelF' }, { point: 'toeN', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
      props: [{ kind: 'bench', at: [-78, 0], size: [52, 36] }],
    },
    { levels: [4], variants: ['bodyweight', 'dumbbell'], props: [{ kind: 'dumbbell', attach: 'footN', at: [0.8, 2.6] }] },
    { levels: [4], variants: ['band'], props: [{ kind: 'band', from: { seg: 'footN', u: 0.85, v: 1 }, to: { world: [130, 0] } }] },
  ],
});
