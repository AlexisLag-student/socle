import { defineAnimation, type Keyframe } from '../schema';

/**
 * Sauts de cheville sur une ligne — « Sautez de part et d’autre de la ligne, sur l’avant-pied, le plus vite possible
 * en restant précis. » Sauts avant-arrière par-dessus un ruban au sol, contacts brefs sur l'avant-pied (talons décollés),
 * genoux presque tendus. Vue de profil : les sauts latéraux des niveaux 2, 4 et 5 sont montrés comme les sauts avant-arrière.
 * Appui = pointe du pied ; déplacement et envol = décalage de la racine.
 */
const hops = (): Keyframe[] => [
  { pose: { hip: 6, knee: 12, ankle: -14, shoulder: 15, elbow: 70 }, dur: 0.12, phase: 'concentrique', say: 'jump' },
  { pose: { hip: 3, knee: 3, ankle: -38 }, dur: 0.12, phase: 'retour', ease: 'easeOut', say: 'jump' },
  { pose: { x: 16, y: 9, ankle: -30 }, dur: 0.12, phase: 'retour', ease: 'easeIn', say: 'land' },
  { pose: { x: 32, y: 0, ankle: -36 }, dur: 0.1, phase: 'excentrique', say: 'land' },
  { pose: { hip: 6, knee: 12, ankle: -14 }, dur: 0.12, phase: 'concentrique', say: 'jump' },
  { pose: { hip: 3, knee: 3, ankle: -38 }, dur: 0.12, phase: 'retour', ease: 'easeOut', say: 'jump' },
  { pose: { x: 16, y: 9, ankle: -30 }, dur: 0.12, phase: 'retour', ease: 'easeIn', say: 'land' },
  { pose: { x: 0, y: 0, ankle: -36 }, dur: 0.1, phase: 'excentrique', say: 'land' },
];

export default defineAnimation({
  exerciseId: 'line-hops',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 2,
  keyframes: hops(),
  contacts: [
    { point: 'toeN', from: 7, to: 1 },
    { point: 'toeN', from: 3, to: 5 },
    { point: 'toeF', from: 7, to: 1 },
    { point: 'toeF', from: 3, to: 5 },
  ],
  // Ruban au sol entre les deux positions des pieds.
  props: [{ kind: 'mat', at: [3, 0], size: [3, 1.5] }],
  overrides: [
    // Niveaux 3 à 5 : sur une jambe, l'autre genou fléchi.
    {
      levels: [3, 4, 5],
      side: 'unilateral',
      pose: { hipF: 25, kneeF: 75, ankleF: -15 },
      contacts: [
        { point: 'toeN', from: 7, to: 1 },
        { point: 'toeN', from: 3, to: 5 },
      ],
    },
  ],
});
