import { defineAnimation } from '../schema';

/**
 * Flexion plantaire contre élastique — « Poussez la pointe du pied vers l’avant contre l’élastique, comme sur une pédale,
 * puis revenez lentement. » Assis au sol, jambe tendue, élastique (ou serviette) passé sous l’avant-pied et tenu à deux mains.
 * Seule la cheville bouge. Jambe proche = jambe travaillée.
 */
export default defineAnimation({
  exerciseId: 'band-plantar-flexion',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 11.3 },
  still: 1,
  keyframes: [
    // Buste droit, jambes tendues au sol, pied relevé au départ ; mains qui tiennent l'élastique devant le ventre.
    { pose: { tilt: 0, trunk: -8, hip: 90, knee: 0, ankle: 5, shoulder: 38, elbow: 30 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: { ankleN: -40 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [],
  props: [{ kind: 'band', from: { seg: 'footN', u: 0.85, v: -1 }, to: { seg: 'handN', u: 0.4 } }],
});
