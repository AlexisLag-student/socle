import { defineAnimation } from '../schema';

/**
 * Adduction debout (élastique ou poulie) — « Ramenez la jambe tendue devant la jambe d’appui en croisant légèrement,
 * puis laissez-la revenir lentement sur le côté. » Vue de face, en appui sur la jambe éloignée, élastique à la cheville
 * de la jambe proche, fixé du côté extérieur. Bassin horizontal, buste droit.
 */
export default defineAnimation({
  exerciseId: 'standing-hip-adduction',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    // Jambe sur le côté, tirée par l'élastique.
    { pose: { hipF: 2, hipN: 22, shoulderF: 8, shoulderN: 30 }, dur: 1, phase: 'concentrique', say: 'push' },
    // Jambe ramenée devant la jambe d'appui, en croisant légèrement.
    { pose: { hipN: -14 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'midF' }],
  overrides: [
    { variants: ['band', 'cable'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [90, 6] } }] },
  ],
});
