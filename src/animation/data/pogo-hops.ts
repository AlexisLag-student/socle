import { defineAnimation, type Keyframe } from '../schema';

/**
 * Sauts de cheville (pogo) — « Rebondissez sur l’avant-pied en enchaînant de petits sauts rapides, comme sur un trampoline,
 * sans que les talons touchent le sol. » Genoux presque tendus : la cheville fait le ressort. Appui = pointe du pied,
 * envol = décalage vertical de la racine ; les talons ne se posent jamais.
 */
const hop = (height: number): Keyframe[] => [
  // Appui : cheville qui cède un peu, talon toujours décollé.
  { pose: { hip: 4, knee: 8, ankle: -12, shoulder: 10, elbow: 30 }, dur: 0.2, phase: 'concentrique', say: 'jump' },
  { pose: { hip: 2, knee: 3, ankle: -40 }, dur: 0.2, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
  { pose: { y: height, ankle: -32 }, dur: 0.2, phase: 'excentrique', ease: 'easeIn', say: 'land' },
  { pose: { y: 0, ankle: -38 }, dur: 0.2, phase: 'excentrique', ease: 'easeOut', say: 'land' },
];

export default defineAnimation({
  exerciseId: 'pogo-hops',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 2,
  keyframes: hop(8),
  contacts: [
    { point: 'toeN', from: 3, to: 1 },
    { point: 'toeF', from: 3, to: 1 },
  ],
  overrides: [
    { levels: [2], keyframes: hop(16) },
    // Niveaux 3 à 5 : sur une jambe, l'autre genou fléchi (sur place ; les déplacements du niveau 4 ne sont pas montrés).
    { levels: [3, 4, 5], side: 'unilateral', pose: { hipF: 25, kneeF: 75, ankleF: -15 }, contacts: [{ point: 'toeN', from: 3, to: 1 }] },
    { variants: ['dumbbells'], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
  ],
});
