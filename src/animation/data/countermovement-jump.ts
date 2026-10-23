import { defineAnimation } from '../schema';

/**
 * Saut avec contre-mouvement — « Descendez vite en quart ou demi-squat en lançant les bras vers l’arrière, puis
 * enchaînez sans pause un saut vertical le plus haut possible. Réceptionnez-vous sur l’avant-pied puis le pied entier,
 * genoux et hanches fléchis, et stabilisez 2 secondes. » Genoux au-dessus des pieds, bras lancés vers le haut.
 * Appui = pointe du pied : le talon monte à l'impulsion et redescend à la réception ; envol = décalage vertical de la racine.
 */
export default defineAnimation({
  exerciseId: 'countermovement-jump',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 1,
  keyframes: [
    { pose: { shoulder: 4, elbow: 8 }, dur: 0.45, phase: 'excentrique' },
    // Contre-mouvement : demi-squat, bras lancés vers l'arrière ; pied à plat (cheville = genou − hanche + inclinaison).
    { pose: { tilt: 38, trunk: 5, hip: 105, knee: 95, ankle: 28, shoulder: -55, elbow: 10 }, dur: 0.18, phase: 'concentrique', ease: 'linear', say: 'jump' },
    // Mi-poussée : les bras passent par l'avant (sans pose intermédiaire, le plus court chemin les ferait passer derrière).
    { pose: { tilt: 22, trunk: 2, hip: 55, knee: 50, ankle: 17, shoulder: 40, elbow: 8 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump' },
    // Impulsion : extension complète, sur la pointe des pieds, bras vers le haut.
    { pose: { tilt: 4, trunk: 0, hip: 6, knee: 2, ankle: -38, shoulder: 165, elbow: 5 }, dur: 0.3, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
    { pose: { y: 30, tilt: 2, hip: 4, knee: 4, ankle: -30, shoulder: 150 }, dur: 0.26, phase: 'retour', ease: 'easeIn', say: 'land' },
    // Contact sur l'avant-pied.
    { pose: { y: 0, tilt: 6, hip: 14, knee: 14, ankle: -30, shoulder: 60, elbow: 20 }, dur: 0.18, phase: 'retour', ease: 'easeOut', say: 'land' },
    // Puis pied entier, genoux et hanches fléchis : stabilisation 2 s.
    { pose: { tilt: 28, hip: 78, knee: 70, ankle: 20, shoulder: 40, elbow: 25 }, dur: 2, phase: 'isométrique', say: 'hold' },
    { pose: {}, dur: 0.8, phase: 'retour' },
  ],
  contacts: [
    { point: 'toeN', from: 5, to: 3 },
    { point: 'toeF', from: 5, to: 3 },
    { point: 'heelN', from: 6, to: 2 },
    { point: 'heelF', from: 6, to: 2 },
  ],
  overrides: [
    // Niveau 2 : sauts enchaînés, rebond immédiat sans stabilisation.
    {
      levels: [2],
      keyframes: [
        { pose: { tilt: 38, trunk: 5, hip: 105, knee: 95, ankle: 28, shoulder: -55, elbow: 10 }, dur: 0.18, phase: 'concentrique', ease: 'linear', say: 'jump' },
    // Mi-poussée : les bras passent par l'avant (sans pose intermédiaire, le plus court chemin les ferait passer derrière).
    { pose: { tilt: 22, trunk: 2, hip: 55, knee: 50, ankle: 17, shoulder: 40, elbow: 8 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump' },
        { pose: { tilt: 4, trunk: 0, hip: 6, knee: 2, ankle: -38, shoulder: 165, elbow: 5 }, dur: 0.3, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
        { pose: { y: 30, tilt: 2, hip: 4, knee: 4, ankle: -30, shoulder: 150 }, dur: 0.26, phase: 'retour', ease: 'easeIn', say: 'land' },
        { pose: { y: 0, tilt: 6, hip: 14, knee: 14, ankle: -30, shoulder: 60, elbow: 20 }, dur: 0.3, phase: 'excentrique', say: 'land' },
      ],
      contacts: [
        { point: 'toeN', from: 4, to: 2 },
        { point: 'toeF', from: 4, to: 2 },
        { point: 'heelN', from: 0, to: 1 },
        { point: 'heelF', from: 0, to: 1 },
      ],
      still: 0,
    },
    // Lesté (haltères ou trap bar) : bras tendus le long du corps, sans élan des bras.
    { variants: ['dumbbells'], pose: { shoulder: 4, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { variants: ['trap-bar'], pose: { shoulder: 4, elbow: 4 }, props: [{ kind: 'barbell', attach: 'handN' }] },
    // Niveau 4 : sur une jambe, l'autre genou fléchi.
    {
      levels: [4],
      side: 'unilateral',
      pose: { hipF: 30, kneeF: 80, ankleF: -10 },
      contacts: [
        { point: 'toeN', from: 5, to: 3 },
        { point: 'heelN', from: 6, to: 2 },
      ],
    },
  ],
});
