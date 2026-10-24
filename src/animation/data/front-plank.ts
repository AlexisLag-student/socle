import { defineAnimation } from '../schema';

/**
 * Gainage ventral (planche) — « Décollez le bassin pour aligner épaules, hanches et genoux (ou chevilles), puis tenez la
 * position sans bouger. » Appui sur les avant-bras, coudes sous les épaules, pointes de pieds (ou genoux) au sol.
 * Niveau 3 : un pied décollé quelques secondes, puis l'autre. Niveau 4 : coudes avancés devant les épaules.
 * Le niveau 5 (avant-bras sur un ballon, petits cercles) n'est pas dessiné : il garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'front-plank',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'elbowN' },
  still: 0,
  keyframes: [
    // Corps aligné des épaules aux chevilles, tenu sans bouger.
    { pose: { tilt: 82.8, trunk: 0, neck: -15, hip: 0, knee: 0, ankle: 10, shoulder: 80, elbow: 90, wrist: 0 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'isométrique' },
  ],
  contacts: [{ point: 'elbowN' }, { point: 'elbowF' }, { point: 'toeN' }, { point: 'toeF' }],
  overrides: [
    // Niveau 1 : sur les genoux, corps aligné des épaules aux genoux.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 65.8, trunk: 0, neck: -15, hip: 0, knee: 100, ankle: 8, shoulder: 66, elbow: 90, wrist: 0 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'isométrique' },
      ],
      still: 0,
      contacts: [{ point: 'elbowN' }, { point: 'elbowF' }, { point: 'kneeN' }, { point: 'kneeF' }],
    },
    // Niveau 3 : planche, un pied puis l'autre décollé de quelques centimètres, sans que le bassin bascule.
    {
      levels: [3],
      keyframes: [
        { pose: { tilt: 82.8, trunk: 0, neck: -15, hip: 0, knee: 0, ankle: 10, shoulder: 80, elbow: 90, wrist: 0 }, dur: 0.6, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: -8 }, dur: 2, phase: 'concentrique', say: 'hold' },
        { pose: { hipN: 0 }, dur: 0.6, phase: 'concentrique', say: 'lift' },
        { pose: { hipF: -8 }, dur: 2, phase: 'concentrique', say: 'hold' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'elbowF' }, { point: 'toeF', from: 0, to: 2 }, { point: 'toeN', from: 2, to: 0 }],
      still: 1,
    },
    // Niveau 4 : coudes avancés de 10 à 15 cm devant les épaules.
    { levels: [4], pose: { shoulder: 100, elbow: 75 } },
  ],
});
