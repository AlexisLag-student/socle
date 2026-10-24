import { defineAnimation } from '../schema';

/**
 * Curl-up de McGill — « Décollez la tête et le haut des épaules de quelques centimètres, d’un bloc, sans plier la nuque.
 * Tenez 8 à 10 secondes, reposez. » Sur le dos, tête à gauche (inclinaison −90°), jambe proche tendue, jambe éloignée
 * genou plié pied au sol (recalé à plat), mains sous le creux des reins (coudes au sol au niveau 1). Le bassin reste posé.
 */
export default defineAnimation({
  exerciseId: 'mcgill-curl-up',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'seat' },
  ik: [{ limb: 'legF', pin: 'mid', flat: true }],
  still: 1,
  keyframes: [
    { pose: { tilt: -90, trunk: 0, neck: 0, hipN: -4.5, kneeN: 0, ankleN: 10, hipF: 50, kneeF: 100, ankleF: -40, shoulder: -10, elbow: 70 }, dur: 1, phase: 'concentrique', say: 'lift' },
    // Tête et haut des épaules décollés de quelques centimètres, nuque dans l'axe.
    { pose: { trunk: 12 }, dur: 8, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'excentrique' },
  ],
  contacts: [{ point: 'seat' }, { point: 'heelN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveaux 2 à 4 : coudes décollés du sol pendant le maintien.
    { levels: [2, 3, 4], keyframes: [
      { pose: { tilt: -90, trunk: 0, neck: 0, hipN: -4.5, kneeN: 0, ankleN: 10, hipF: 50, kneeF: 100, ankleF: -40, shoulder: -10, elbow: 70 }, dur: 1, phase: 'concentrique', say: 'lift' },
      { pose: { trunk: 12, shoulder: 5 }, dur: 9, phase: 'pause' },
      { pose: {}, dur: 1, phase: 'excentrique' },
    ] },
    { levels: [4], props: [{ kind: 'dumbbell', attach: 'trunk', at: [0.7, -1.6] }] },
  ],
});
