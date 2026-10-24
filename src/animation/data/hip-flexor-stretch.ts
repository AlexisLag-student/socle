import { defineAnimation } from '../schema';

/**
 * Étirement des fléchisseurs de hanche (fente à genou) — « Rentrez le bassin en contractant le fessier de la jambe arrière,
 * puis avancez légèrement le bassin jusqu’à sentir l’étirement à l’avant de la hanche arrière. Tenez. »
 * Genou arrière (jambe proche, étirée) sur un coussin, orteils repliés ; pied avant à plat, genou avant à 90°, buste droit.
 * Bascule du bassin vers l'arrière = inclinaison négative, le tronc reste vertical.
 */
export default defineAnimation({
  exerciseId: 'hip-flexor-stretch',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'kneeN', y: 4 },
  ik: [{ limb: 'legF', pin: 'mid', flat: true }],
  still: 1,
  keyframes: [
    // Cuisse arrière verticale (tibia au sol : genou = 108 − inclinaison + hanche), cuisse avant horizontale.
    { pose: { tilt: 0, trunk: 0, hipN: 0, kneeN: 102.2, ankleN: 8, hipF: 90, kneeF: 90, ankleF: 0, shoulder: -20, elbow: 100 }, dur: 1.5, phase: 'concentrique', say: 'push' },
    // Bassin rentré et avancé : hanche arrière en extension.
    { pose: { tilt: -8, trunk: 8, hipN: -14, kneeN: 96.2, hipF: 80 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'kneeN', y: 4 }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'pad', at: [-14, 0], size: [26, 4] }],
  overrides: [
    // Niveau 2 : bras du même côté levé au-dessus de la tête.
    { levels: [2], pose: { shoulderN: 170, elbowN: 10 } },
  ],
});
