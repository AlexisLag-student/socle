import { defineAnimation } from '../schema';

/**
 * Extension du dos (lombaires) — « Redressez le buste lentement jusqu’à aligner épaules, hanches et genoux, sans aller
 * au-delà. Marquez une pause, puis redescendez en contrôlant. » Niveau 1 : à plat ventre au sol, mains sous le front,
 * la poitrine décolle de quelques centimètres. Niveaux 2 à 5 : à plat ventre sur un banc, bassin au bord, jambes tenues,
 * mains croisées sur la poitrine ; le buste part penché vers le sol et remonte jusqu'à l'alignement (jamais au-delà).
 * Ballon et banc à lombaires sont représentés par un banc horizontal.
 */
export default defineAnimation({
  exerciseId: 'back-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeF', y: 62 },
  still: 1,
  keyframes: [
    // Buste penché vers le sol, au-dessus du bord du banc.
    { pose: { tilt: 150, trunk: 0, neck: 0, hip: 60, knee: 0, ankle: -30, shoulder: 35, elbow: 145 }, dur: 2, phase: 'concentrique', say: 'lift' },
    // Épaules, hanches et genoux alignés.
    { pose: { tilt: 90, hip: 0, neck: -10 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeF', y: 62 }, { point: 'kneeN', y: 62 }],
  overrides: [
    { levels: [2, 3, 4, 5], props: [{ kind: 'bench', at: [-38, 0], size: [66, 61] }] },
    // Niveau 1 : au sol, petite amplitude, mains sous le front.
    {
      levels: [1],
      anchor: { point: 'kneeF' },
      keyframes: [
        { pose: { tilt: 86, trunk: 0, neck: -10, hip: -4, knee: 0, ankle: -30, shoulder: 165, elbow: 140 }, dur: 2, phase: 'concentrique', say: 'lift' },
        { pose: { trunk: -12, neck: -6 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'kneeF' }, { point: 'kneeN' }],
    },
    // Niveau 3 : maintien du buste aligné.
    {
      levels: [3],
      keyframes: [
        { pose: { tilt: 150, trunk: 0, neck: 0, hip: 60, knee: 0, ankle: -30, shoulder: 35, elbow: 145 }, dur: 2, phase: 'concentrique', say: 'lift' },
        { pose: { tilt: 90, hip: 0, neck: -10 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 2, phase: 'retour' },
      ],
    },
    // Niveaux 4 et 5 : disque ou haltère contre la poitrine.
    { levels: [4, 5], props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }] },
  ],
});
