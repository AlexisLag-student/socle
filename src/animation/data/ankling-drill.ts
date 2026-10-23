import { defineAnimation } from '../schema';

/**
 * Gamme de cheville (ankling) — « Avancez à tout petits pas rapides en ne déroulant que la cheville : l’avant-pied
 * touche le sol sous la hanche et rebondit aussitôt. » Buste droit, jambes presque tendues, bras qui accompagnent
 * comme en course. Montrée sur place (un cycle d'animation revient à son point de départ).
 */
export default defineAnimation({
  exerciseId: 'ankling-drill',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeF' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, knee: 5, ankle: -12, shoulder: 0, elbow: 80 }, dur: 0.16, phase: 'concentrique', say: 'step', anchor: 'toeF' },
    { pose: { hipN: 14, kneeN: 22, ankleN: -22, ankleF: -26, shoulderN: -25, shoulderF: 25 }, dur: 0.16, phase: 'concentrique', say: 'step', anchor: 'toeF' },
    { pose: { hipN: 3, kneeN: 5, ankleN: -12, ankleF: -12, shoulderN: 0, shoulderF: 0 }, dur: 0.16, phase: 'concentrique', say: 'step', anchor: 'toeN' },
    { pose: { hipF: 14, kneeF: 22, ankleF: -22, ankleN: -26, shoulderF: -25, shoulderN: 25 }, dur: 0.16, phase: 'concentrique', say: 'step', anchor: 'toeN' },
  ],
  contacts: [
    { point: 'toeF', from: 0, to: 2 },
    { point: 'toeN', from: 2, to: 0 },
  ],
});
