import { defineAnimation } from '../schema';

/**
 * Élévation de jambe tendue — « Contractez la cuisse pour verrouiller le genou, levez la jambe tendue jusqu’à la hauteur
 * de l’autre genou, tenez 2 s, puis redescendez lentement. » Allongé sur le dos, tête à gauche (inclinaison −90°),
 * l'autre jambe pliée pied au sol (pied recalé à plat). Jambe proche = jambe travaillée.
 */
export default defineAnimation({
  exerciseId: 'straight-leg-raise',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'shoulder' },
  ik: [{ limb: 'legF', pin: 'mid', flat: true }],
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hipN: -4.5, kneeN: 0, ankleN: 10, hipF: 55, kneeF: 115, ankleF: -25 }, dur: 2, phase: 'concentrique', say: 'lift' },
    { pose: { hipN: 45 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelF' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }],
  overrides: [
    // Niveau 3 : élastique à la cheville, attaché bas au-delà des pieds.
    { levels: [3], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [150, 3] } }] },
  ],
});
