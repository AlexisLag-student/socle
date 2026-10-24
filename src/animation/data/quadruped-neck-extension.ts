import { defineAnimation } from '../schema';

/**
 * Extension cervicale à quatre pattes — « Gardez le menton rentré et relevez lentement la tête pour regarder un peu devant
 * vous, puis revenez regarder le sol. Le mouvement vient du cou, pas du dos. » À quatre pattes (mains et genoux fixes),
 * dos plat ; seul le cou bouge. Niveau 3 : à plat ventre, tête décollée. Niveau 4 : buste penché comme sur le vélo,
 * tête tenue relevée. Le niveau 2 ajoute une rotation (« non ») qui ne se voit pas de profil.
 */
export default defineAnimation({
  exerciseId: 'quadruped-neck-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeF' },
  still: 1,
  keyframes: [
    { pose: { tilt: 71.7, trunk: 0, neck: 10, head: 10, hip: 71.7, knee: 107, ankle: 8, shoulder: 71.7, elbow: 0, wrist: 75 }, dur: 3, phase: 'concentrique', say: 'lift' },
    { pose: { neck: -30, head: 8 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeF' }, { point: 'kneeN' }, { point: 'toeF' }, { point: 'handN' }, { point: 'handF' }],
  overrides: [
    // Niveau 3 : à plat ventre, front sur une serviette, tête décollée de quelques centimètres et tenue.
    {
      levels: [3],
      keyframes: [
        { pose: { tilt: 86, trunk: 0, neck: 8, head: 5, hip: -4, knee: 0, ankle: -30, shoulder: 165, elbow: 140 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { neck: -14, head: 8 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'kneeF' }, { point: 'kneeN' }],
    },
    // Niveau 4 : buste penché comme sur le vélo, mains sur les cuisses, tête relevée tenue.
    {
      levels: [4],
      anchor: { point: 'midN' },
      keyframes: [
        { pose: { tilt: 45, trunk: 10, neck: 15, head: 5, hip: 60, knee: 20, ankle: 5, shoulder: 45, elbow: 20 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { neck: -25, head: 10 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }],
    },
  ],
});
