import { defineAnimation } from '../schema';

/**
 * Isométries cervicales — « Poussez la tête contre la main sans qu’elle ne bouge, tenez, relâchez. Faites les quatre
 * directions. » Debout, dos droit, menton légèrement rentré. Vue de profil : vers l'avant (main sur le front) puis vers
 * l'arrière (main derrière la tête) ; les poussées sur les côtés ne se voient pas de profil.
 * Niveaux 3 et 4 : élastique passé autour de la tête, fixé à hauteur du visage devant, tête immobile.
 */
export default defineAnimation({
  exerciseId: 'neck-isometric',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { hip: 2, knee: 3, ankle: 1, neck: 2, head: 4, shoulderN: 4, elbowN: 8, shoulderF: 4, elbowF: 8 }, dur: 0.8, phase: 'concentrique', say: 'push' },
    // Main sur le front.
    { pose: { shoulderN: 89, elbowN: 120.6 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 0.8, phase: 'retour' },
    // Main derrière la tête.
    { pose: { shoulderN: 4, elbowN: 8, shoulderF: 148.4, elbowF: 127.4 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 0.8, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    {
      levels: [3, 4],
      variants: ['band', 'hand'],
      keyframes: [
        { pose: { hip: 2, knee: 3, ankle: 1, neck: 2, head: 4, shoulder: 4, elbow: 8 }, dur: 0.8, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 0.8, phase: 'retour' },
      ],
      props: [{ kind: 'band', from: { seg: 'head', u: 0.5, v: -1 }, to: { world: [110, 165] } }],
      still: 1,
    },
  ],
});
