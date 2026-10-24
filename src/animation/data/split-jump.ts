import { defineAnimation, type Keyframe } from '../schema';

/**
 * Fentes sautées — « Poussez fort sur les deux jambes pour sauter à la verticale. En l’air, inversez les jambes, puis
 * réceptionnez-vous en fente de l’autre côté en amortissant jusqu’à la position de départ. » Fente basse : genoux à 90°,
 * buste droit, pied arrière sur l'avant-pied. Saut vertical (envol = décalage vertical de la racine).
 * Niveau 1 : remontée explosive sur la pointe des pieds, sans décoller. Niveau 2 : saut sans changer de jambe, tenue 2 s.
 * Niveaux 3 à 5 : changement de jambe en l'air (niveaux 3 et 5 : tenue de 2 s à chaque réception).
 */
// Fente : jambe avant à 90°, pied à plat ; jambe arrière sur la pointe (valeurs de la fente arrière).
const lunge = (front: 'N' | 'F'): Keyframe['pose'] => {
  const back = front === 'N' ? 'F' : 'N';
  return { tilt: 0, [`hip${front}`]: 90, [`knee${front}`]: 95, [`ankle${front}`]: 5, [`hip${back}`]: -5.6, [`knee${back}`]: 101.8, [`ankle${back}`]: 25 } as Keyframe['pose'];
};
// Impulsion : deux jambes tendues, sur la pointe des pieds.
const push = (front: 'N' | 'F'): Keyframe['pose'] => {
  const back = front === 'N' ? 'F' : 'N';
  return { [`hip${front}`]: 30, [`knee${front}`]: 6, [`ankle${front}`]: -35, [`hip${back}`]: -17.2, [`knee${back}`]: 35.7, [`ankle${back}`]: -30 } as Keyframe['pose'];
};
const arms = { shoulder: 10, elbow: 80 };
// Poses intermédiaires de l'impulsion et de la réception (réglées pour que la pointe du pied arrière ne glisse pas).
const STEPS = [
  [75, 72, -5, 1.5, 93.3, 12],
  [60, 50, -15, -0.2, 77.4, 0],
  [45, 28, -25, -6, 59, -15],
] as const;
const step = (i: 0 | 1 | 2, front: 'N' | 'F'): Keyframe['pose'] => {
  const back = front === 'N' ? 'F' : 'N';
  const [h, k, a, hb, kb, ab] = STEPS[i];
  return { [`hip${front}`]: h, [`knee${front}`]: k, [`ankle${front}`]: a, [`hip${back}`]: hb, [`knee${back}`]: kb, [`ankle${back}`]: ab } as Keyframe['pose'];
};
/** Saut avec changement de jambe : de la fente `from` à la fente opposée (tenue `hold` secondes à la réception). */
const switchJump = (from: 'N' | 'F', hold: number): Keyframe[] => {
  const to = from === 'N' ? 'F' : 'N';
  const jump: Keyframe[] = [
    { pose: lunge(from), dur: 0.08, phase: 'concentrique', ease: 'easeIn', say: 'jump', anchor: `toe${from}` },
    { pose: step(0, from), dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: `toe${from}` },
    { pose: step(1, from), dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: `toe${from}` },
    { pose: step(2, from), dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: `toe${from}` },
    { pose: push(from), dur: 0.22, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: `toe${from}` },
    // En l'air : jambes croisées à mi-chemin, pointes de pied à la même hauteur.
    { pose: { y: 18, hip: 12, knee: 30, ankle: -30 }, dur: 0.22, phase: 'retour', ease: 'easeIn', say: 'land', anchor: `toe${to}` },
    { pose: { y: 0, ...step(2, to) }, dur: 0.1, phase: 'retour', ease: 'linear', say: 'land', anchor: `toe${to}` },
    { pose: step(1, to), dur: 0.1, phase: 'retour', ease: 'linear', say: 'land', anchor: `toe${to}` },
    { pose: step(0, to), dur: 0.1, phase: 'retour', ease: 'linear', say: 'land', anchor: `toe${to}` },
  ];
  return hold ? [...jump, { pose: lunge(to), dur: hold, phase: 'isométrique', say: 'hold', anchor: `toe${to}` }] : jump;
};

export default defineAnimation({
  exerciseId: 'split-jump',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'toeN' },
  still: 5,
  keyframes: [
    // Niveau 2 (base) : saut vertical, même fente à la réception, tenue 2 s.
    { pose: { ...lunge('N'), ...arms }, dur: 0.08, phase: 'concentrique', ease: 'easeIn', say: 'jump' },
    // Poses intermédiaires : la pointe du pied arrière reste au même endroit pendant l'impulsion.
    { pose: { hipN: 75, kneeN: 72, ankleN: -5, hipF: 1.5, kneeF: 93.3, ankleF: 12 }, dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump' },
    { pose: { hipN: 60, kneeN: 50, ankleN: -15, hipF: -0.2, kneeF: 77.4, ankleF: 0 }, dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump' },
    { pose: { hipN: 45, kneeN: 28, ankleN: -25, hipF: -6, kneeF: 59, ankleF: -15 }, dur: 0.08, phase: 'concentrique', ease: 'linear', say: 'jump' },
    { pose: push('N'), dur: 0.25, phase: 'retour', ease: 'easeOut', say: 'jump' },
    { pose: { y: 16 }, dur: 0.25, phase: 'retour', ease: 'easeIn', say: 'land' },
    // Réception sur les pointes, puis amorti jusqu'à la fente (mêmes poses intermédiaires qu'à l'impulsion).
    { pose: { y: 0, hipN: 45, kneeN: 28, ankleN: -25, hipF: -6, kneeF: 59, ankleF: -15 }, dur: 0.1, phase: 'retour', ease: 'linear', say: 'land' },
    { pose: { hipN: 60, kneeN: 50, ankleN: -15, hipF: -0.2, kneeF: 77.4, ankleF: 0 }, dur: 0.1, phase: 'retour', ease: 'linear', say: 'land' },
    { pose: { hipN: 75, kneeN: 72, ankleN: -5, hipF: 1.5, kneeF: 93.3, ankleF: 12 }, dur: 0.1, phase: 'retour', ease: 'linear', say: 'land' },
    { pose: lunge('N'), dur: 2, phase: 'isométrique', say: 'hold' },
  ],
  contacts: [
    { point: 'toeN', from: 6, to: 4 },
    { point: 'heelN', from: 9, to: 0 },
    { point: 'toeF', from: 6, to: 4 },
  ],
  overrides: [
    // Niveau 1 : descente contrôlée en fente puis remontée explosive sur la pointe des pieds, sans quitter le sol.
    {
      levels: [1],
      loop: 'pingpong',
      keyframes: [
        { pose: { ...push('N'), tilt: 0, ...arms }, dur: 0.5, phase: 'excentrique' },
        { pose: { hipN: 45, kneeN: 28, ankleN: -25, hipF: -6, kneeF: 59, ankleF: -15 }, dur: 0.5, phase: 'excentrique' },
        { pose: { hipN: 60, kneeN: 50, ankleN: -15, hipF: -0.2, kneeF: 77.4, ankleF: 0 }, dur: 0.5, phase: 'excentrique' },
        { pose: { hipN: 75, kneeN: 72, ankleN: -5, hipF: 1.5, kneeF: 93.3, ankleF: 12 }, dur: 0.5, phase: 'excentrique' },
        { pose: lunge('N'), dur: 0, phase: 'pause' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 4, to: 4 }],
      still: 4,
    },
    // Niveaux 3 et 5 : changement de jambe en l'air, stabilisation de 2 s à chaque réception.
    {
      levels: [3, 5],
      keyframes: [...switchJump('N', 2), ...switchJump('F', 2)].map((k, i) => (i === 0 ? { ...k, pose: { ...k.pose, ...arms } } : k)),
      contacts: [
        { point: 'toeN', from: 16, to: 4 },
        { point: 'toeF', from: 16, to: 4 },
        { point: 'toeN', from: 6, to: 14 },
        { point: 'toeF', from: 6, to: 14 },
        { point: 'heelN', from: 19, to: 0 },
        { point: 'heelF', from: 9, to: 10 },
      ],
      still: 5,
    },
    // Niveau 4 : changements de jambe enchaînés, sans pause.
    {
      levels: [4],
      keyframes: [...switchJump('N', 0), ...switchJump('F', 0)].map((k, i) => (i === 0 ? { ...k, pose: { ...k.pose, ...arms } } : k)),
      contacts: [
        { point: 'toeN', from: 15, to: 4 },
        { point: 'toeF', from: 15, to: 4 },
        { point: 'toeN', from: 6, to: 13 },
        { point: 'toeF', from: 6, to: 13 },
      ],
      still: 5,
    },
    { levels: [5], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
  ],
});
