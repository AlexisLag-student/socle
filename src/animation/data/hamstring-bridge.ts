import { defineAnimation } from '../schema';

/**
 * Pont ischios (levier long) — « Poussez dans les talons pour décoller le bassin jusqu’à aligner épaules, hanches et genoux.
 * Tenez la position ou redescendez lentement selon le niveau. » Allongé sur le dos, tête à gauche (inclinaison −90°),
 * talons au sol, genoux peu fléchis (20 à 30°), bras le long du corps. Appui = haut du dos ; talons recalés au sol.
 */
export default defineAnimation({
  exerciseId: 'hamstring-bridge',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder' },
  ik: [
    { limb: 'legN', pin: 'heel' },
    { limb: 'legF', pin: 'heel' },
  ],
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hip: 25, knee: 28, ankle: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
    // Bassin décollé : épaules, hanches et genoux alignés.
    { pose: { tilt: -102, hip: 3, knee: 25 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'heelF' }],
  overrides: [
    // Niveau 2 : maintien sur un seul talon, l'autre genou plié vers la poitrine.
    { levels: [2], side: 'unilateral', ik: [{ limb: 'legN', pin: 'heel' }], pose: { hipF: 110, kneeF: 110, ankleF: -10 }, contacts: [{ point: 'shoulder' }, { point: 'heelN' }] },
    // Niveaux 3 à 5 : talon sur une marche ou une chaise (environ 50 cm), répétitions sur une jambe.
    {
      levels: [3, 4, 5],
      side: 'unilateral',
      ik: [{ limb: 'legN', pin: 'heel', y: 44 }],
      keyframes: [
        { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hipN: 60, kneeN: 30, ankleN: -22, hipF: 110, kneeF: 110, ankleF: -10 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { tilt: -125, hipN: 20, kneeN: 25 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelN', y: 44 }],
      props: [{ kind: 'box', at: [108, 0], size: [40, 42] }],
    },
    { levels: [5], pose: { shoulder: 12, elbow: 10 }, props: [{ kind: 'dumbbell', attach: 'pelvis', at: [0.15, -1.5] }] },
  ],
});
