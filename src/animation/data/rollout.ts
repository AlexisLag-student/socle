import { defineAnimation } from '../schema';

/**
 * Rollout — « Avancez lentement les bras en laissant les hanches suivre, jusqu’où vous pouvez garder le dos neutre,
 * puis revenez en contractant les abdominaux. » À genoux (orteils repliés), mains sur l'outil sous les épaules ;
 * les mains glissent vers l'avant au sol, dos neutre (tronc aligné sur le bassin). L'outil (serviette, roue, ballon,
 * sangles) n'est pas dessiné. Niveau 3 : depuis la planche sur les avant-bras (body saw).
 * Le niveau 4 (debout ou grand levier) n'est pas dessiné : il garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'rollout',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeN' },
  still: 1,
  keyframes: [
    // À quatre pattes : cuisses verticales (hanche = inclinaison), bras verticaux (épaule = inclinaison).
    { pose: { tilt: 70.2, trunk: 0, neck: -15, hip: 70.2, knee: 107, ankle: 8, shoulder: 70.2, elbow: 0, wrist: 60 }, dur: 3, phase: 'excentrique' },
    // Bras loin devant, corps presque aligné des genoux aux épaules.
    { pose: { tilt: 82.3, hip: 0, knee: 25, shoulder: 160, wrist: 0 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'concentrique', say: 'return' },
  ],
  contacts: [{ point: 'kneeN' }, { point: 'kneeF' }],
  overrides: [
    // Niveau 1 : petite amplitude (bras avancés de 20 à 30 cm).
    { levels: [1], keyframes: [
      { pose: { tilt: 70.2, trunk: 0, neck: -15, hip: 70.2, knee: 107, ankle: 8, shoulder: 70.2, elbow: 0, wrist: 60 }, dur: 3, phase: 'excentrique' },
      { pose: { tilt: 74.6, hip: 40, knee: 70, shoulder: 110, wrist: 30 }, dur: 1, phase: 'pause' },
      { pose: {}, dur: 2, phase: 'concentrique', say: 'return' },
    ] },
    // Niveau 3 : planche sur les avant-bras, le corps recule et avance, pointes de pied fixes.
    {
      levels: [3],
      anchor: { point: 'toeN' },
      keyframes: [
        { pose: { tilt: 82.8, trunk: 0, neck: -15, hip: 0, knee: 0, ankle: 10, shoulder: 80, elbow: 90, wrist: 0 }, dur: 3, phase: 'excentrique' },
        { pose: { tilt: 86, shoulder: 125, elbow: 70 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'concentrique', say: 'return' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'toeF' }],
    },
  ],
});
