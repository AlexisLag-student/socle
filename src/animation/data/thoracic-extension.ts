import { defineAnimation } from '../schema';

/**
 * Mobilité du haut du dos (extension thoracique) — niveau 1 : « Penchez le haut du dos en arrière au-dessus du dossier en
 * ouvrant les coudes, sans creuser le bas du dos, puis revenez. » Assis sur une chaise à dossier bas, mains croisées
 * derrière la tête. Niveau 3 : allongé sur le ventre, mains près des épaules, le haut de la poitrine décolle du sol par les
 * muscles du dos (sans pousser sur les mains). Le niveau 2 (à genoux, coudes sur une chaise) garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'thoracic-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'seat', y: 54.5 },
  still: 1,
  keyframes: [
    { pose: { tilt: 0, trunk: 5, neck: 5, hip: 90, knee: 90, ankle: 0, shoulder: 150, elbow: 150 }, dur: 2, phase: 'excentrique' },
    // Haut du dos en arrière au-dessus du dossier, coudes ouverts.
    { pose: { trunk: -22, neck: -10, shoulder: 165 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'concentrique', say: 'return' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }],
  overrides: [
    { levels: [1], props: [{ kind: 'chair', at: [-15, 0], size: [44, 41] }] },
    {
      levels: [3],
      anchor: { point: 'kneeF' },
      keyframes: [
        { pose: { tilt: 86, trunk: 0, neck: 6, hip: -4, knee: 0, ankle: -30, shoulder: 60, elbow: 145 }, dur: 2, phase: 'concentrique', say: 'lift' },
        { pose: { trunk: -14, neck: 2 }, dur: 3, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'kneeF' }, { point: 'kneeN' }],
    },
  ],
});
