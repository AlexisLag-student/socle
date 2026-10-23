import { defineAnimation } from '../schema';

/**
 * Squat unipodal — « Descendez lentement sur une jambe jusqu’à effleurer le siège, puis remontez sans élan ni appui de
 * l’autre pied. » Debout sur la jambe proche devant une chaise, l'autre jambe tendue devant, bras tendus devant
 * pour l'équilibre ; talon d'appui au sol, genou dans l'axe du pied (pied à plat : cheville = genou − hanche + inclinaison).
 */
export default defineAnimation({
  exerciseId: 'single-leg-squat',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 5, hipN: 5, kneeN: 5, ankleN: 5, hipF: 35, kneeF: 5, ankleF: 0, shoulder: 80, elbow: 5 }, dur: 3, phase: 'excentrique' },
    // Siège effleuré (chaise d’environ 45 cm).
    { pose: { tilt: 40, trunk: 5, hipN: 115, kneeN: 105, ankleN: 30, hipF: 106, kneeF: 5, shoulder: 95 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }],
  props: [{ kind: 'chair', at: [-62, 0], size: [42, 40] }],
  overrides: [],
});
