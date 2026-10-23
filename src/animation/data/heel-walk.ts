import { defineAnimation } from '../schema';

/**
 * Marche sur les talons — « Marchez à petits pas sur les talons, pointes relevées pendant toute la durée. »
 * Montrée en marche sur place (un cycle d'animation revient à son point de départ) : un pied se lève pendant que
 * l'autre reste sur son talon, pointe relevée.
 */
export default defineAnimation({
  exerciseId: 'heel-walk',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'heelF' },
  still: 1,
  keyframes: [
    { pose: { tilt: 3, hip: 3, knee: 4, ankle: 25, shoulder: 4, elbow: 15 }, dur: 0.35, phase: 'concentrique', say: 'step', anchor: 'heelF' },
    { pose: { hipN: 25, kneeN: 30, ankleN: 25, shoulderN: -14, shoulderF: 22 }, dur: 0.35, phase: 'concentrique', say: 'step', anchor: 'heelF' },
    { pose: { hipN: 3, kneeN: 4, shoulderN: 4, shoulderF: 4 }, dur: 0.35, phase: 'concentrique', say: 'step', anchor: 'heelN' },
    { pose: { hipF: 25, kneeF: 30, ankleF: 25, shoulderF: -14, shoulderN: 22 }, dur: 0.35, phase: 'concentrique', say: 'step', anchor: 'heelN' },
  ],
  contacts: [
    { point: 'heelF', from: 0, to: 2 },
    { point: 'heelN', from: 2, to: 0 },
  ],
});
