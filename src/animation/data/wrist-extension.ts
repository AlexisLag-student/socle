import { defineAnimation } from '../schema';

/**
 * Extension du poignet — « Relevez le dos de la main vers le plafond, puis redescendez lentement en 3 secondes. »
 * Assis, avant-bras posé sur la cuisse, paume vers le sol, main dans le vide au-delà du genou ; seul le poignet bouge.
 * Niveau 1 : isométrie, poignet droit (l'autre main appuie sur le dos de la main). Jambe et bras proches.
 */
export default defineAnimation({
  exerciseId: 'wrist-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 56.5 },
  still: 1,
  keyframes: [
    { pose: { tilt: 18, trunk: 5, hip: 108, knee: 90, ankle: 0, hipF: 106, kneeF: 95, ankleF: 7, shoulderN: 52.4, elbowN: 49.7, wristN: -45, shoulderF: 52, elbowF: 50 }, dur: 1, phase: 'concentrique', say: 'lift' },
    { pose: { wristN: 40 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'chair', at: [-30, 0], size: [46, 41] }],
  overrides: [
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 18, trunk: 5, hip: 108, knee: 90, ankle: 0, hipF: 106, kneeF: 95, ankleF: 7, shoulderN: 52.4, elbowN: 49.7, wristN: 0, shoulderF: 52, elbowF: 50 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
    },
    { levels: [2, 3, 4], variants: ['bodyweight', 'dumbbell'], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [2, 3, 4], variants: ['band'], props: [{ kind: 'band', from: { seg: 'handN', u: 0.5 }, to: { seg: 'footN', u: 0.3, v: 1 } }] },
  ],
});
