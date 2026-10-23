import { defineAnimation, type Keyframe } from '../schema';

/**
 * Corde à sauter — « Sautez juste assez haut pour laisser passer la corde, sur l’avant-pied, en tournant la corde
 * avec les poignets. » Coudes près du corps, mains à hauteur des hanches ; petits sauts, talons décollés.
 * La corde elle-même n'est pas dessinée (elle tourne autour du personnage, hors du plan de profil).
 */
const hop = (): Keyframe[] => [
  { pose: { hip: 4, knee: 10, ankle: -14, shoulder: 10, elbow: 70, wrist: 20 }, dur: 0.12, phase: 'concentrique', say: 'jump' },
  { pose: { hip: 2, knee: 3, ankle: -38, wrist: -10 }, dur: 0.12, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
  { pose: { y: 6, ankle: -32, wrist: -30 }, dur: 0.12, phase: 'excentrique', ease: 'easeIn', say: 'land' },
  { pose: { y: 0, ankle: -38, wrist: 0 }, dur: 0.1, phase: 'excentrique', ease: 'easeOut', say: 'land' },
];

export default defineAnimation({
  exerciseId: 'jump-rope',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 2,
  keyframes: hop(),
  contacts: [
    { point: 'toeN', from: 3, to: 1 },
    { point: 'toeF', from: 3, to: 1 },
  ],
  overrides: [
    // Niveau 3 : pas de course sur place, un pied puis l'autre, sur l'avant-pied.
    {
      levels: [3],
      keyframes: [
        { pose: { hip: 3, knee: 5, ankle: -20, shoulder: 10, elbow: 70, wrist: 20 }, dur: 0.14, phase: 'concentrique', say: 'step', anchor: 'toeF' },
        { pose: { hipN: 20, kneeN: 40, ankleN: -25, ankleF: -30, wrist: -20 }, dur: 0.14, phase: 'concentrique', say: 'step', anchor: 'toeF' },
        { pose: { hipN: 3, kneeN: 5, ankleN: -20, ankleF: -20, wrist: 20 }, dur: 0.14, phase: 'concentrique', say: 'step', anchor: 'toeN' },
        { pose: { hipF: 20, kneeF: 40, ankleF: -25, ankleN: -30, wrist: -20 }, dur: 0.14, phase: 'concentrique', say: 'step', anchor: 'toeN' },
      ],
      contacts: [
        { point: 'toeF', from: 0, to: 2 },
        { point: 'toeN', from: 2, to: 0 },
      ],
      still: 1,
    },
    // Niveau 4 : sur une jambe.
    { levels: [4], side: 'unilateral', pose: { hipF: 25, kneeF: 75, ankleF: -15 }, contacts: [{ point: 'toeN', from: 3, to: 1 }] },
  ],
});
