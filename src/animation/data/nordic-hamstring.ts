import { defineAnimation } from '../schema';

/**
 * Nordic hamstring — « Basculez lentement vers l’avant en freinant le plus longtemps possible avec l’arrière
 * des cuisses, hanches tendues. Réceptionnez-vous sur les mains, puis repoussez le sol pour revenir. »
 * À genoux sur un coussin, orteils repliés, chevilles bloquées (cale). Le corps reste droit des genoux à la tête :
 * hanche et tronc à 0°, seul le genou s'ouvre (genou = 108 − inclinaison garde le tibia au sol).
 * Descente accélérée en fin de course (« freinez jusqu’au bout, même si vous tombez à la fin »).
 */
export default defineAnimation({
  exerciseId: 'nordic-hamstring',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 0, hip: 0, knee: 108, ankle: 8, shoulder: 55, elbow: 95 }, dur: 3.5, phase: 'excentrique', ease: 'easeIn', say: 'brake' },
    // Réception : mains au sol sous les épaules, coudes pliés, poitrine près du sol.
    { pose: { tilt: 66, knee: 42, shoulder: 6, elbow: 80, wrist: 70 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 0.9, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'kneeN' }, { point: 'kneeF' }, { point: 'toeN' }, { point: 'toeF' }, { point: 'handN', from: 1, to: 2 }],
  props: [
    { kind: 'mat', at: [-20, 0], size: [40, 2] },
    { kind: 'pad', at: [-50, 29], size: [16, 9] },
  ],
  overrides: [
    // Niveau 1 : seulement la partie contrôlée (30 à 45°), mains prêtes à pousser.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 0, hip: 0, knee: 108, ankle: 8, shoulder: 55, elbow: 95 }, dur: 2.5, phase: 'excentrique', say: 'brake' },
        { pose: { tilt: 40, knee: 68, shoulder: 70, elbow: 70 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'kneeN' }, { point: 'kneeF' }, { point: 'toeN' }, { point: 'toeF' }],
    },
    // Lesté : disque ou haltère contre la poitrine, descente contrôlée sans réception sur les mains.
    {
      variants: ['dumbbells'],
      keyframes: [
        { pose: { tilt: 0, hip: 0, knee: 108, ankle: 8, shoulder: 25, elbow: 145 }, dur: 3.5, phase: 'excentrique', ease: 'easeIn', say: 'brake' },
        { pose: { tilt: 62, knee: 46 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 0.9, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'kneeN' }, { point: 'kneeF' }, { point: 'toeN' }, { point: 'toeF' }],
      props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }],
    },
  ],
});
