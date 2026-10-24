import { defineAnimation, type Keyframe } from '../schema';

/**
 * Sauts de haies — « Pieds joints, sautez par-dessus chaque obstacle en remontant les genoux, et rebondissez
 * immédiatement après chaque réception, avec des contacts courts. » Obstacles espacés d'environ un mètre, dessinés comme
 * de petits blocs. Pieds à plat : cheville = genou − hanche + inclinaison ; vol = décalage de la racine. Pour que le cycle
 * revienne à son départ, le personnage revient ensuite en marchant à reculons (pas chassés ; le décalage est recalé sur
 * l'appui, sans mouvement visible). Niveau 1 : sauts d'avant en arrière au-dessus d'une ligne (non dessinée).
 */
const together = { hip: 2, knee: 3, ankle: 1 };
const ready = { tilt: 15, hip: 25, knee: 25, ankle: 15, shoulder: 15, elbow: 60 };
const landing = { tilt: 25, hip: 60, knee: 60, ankle: 25, shoulder: 30, elbow: 40 };
/** Distance entre deux obstacles (≈ 1 m). */
const GAP = 100;

/** Retour à reculons sur `dist` unités : pied éloigné en arrière, puis pied proche qui le rejoint. */
const walkBack = (dist: number, steps: number): Keyframe[] => {
  const a = (Math.asin(dist / steps / 2 / 88.3) * 180) / Math.PI;
  return Array.from({ length: steps }, (): Keyframe[] => [
    { pose: { tilt: 0, ...together, shoulder: 4, elbow: 8 }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'heelN' },
    { pose: { hipN: a, ankleN: 1 - a, hipF: -a, ankleF: 1 + a }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'toeF' },
  ]).flat();
};

/** Niveau unipodal : la jambe libre suit la jambe d'appui, hanche et genou plus fléchis (pied décollé). */
const lift = (k: Keyframe): Keyframe => {
  const { hip, knee } = k.pose as { hip: number; knee: number };
  return { ...k, pose: { ...k.pose, hipF: hip + 25, kneeF: Math.min(150, knee + 50), ankleF: 0 } };
};

/** Un saut pieds joints de `dist` unités depuis le décalage x0, au-dessus d'un obstacle de hauteur hh. */
const hop = (x0: number, dist: number, hh: number): Keyframe[] =>
  [
    { pose: { x: x0, y: 0, tilt: 25, hip: 45, knee: 45, ankle: 25, shoulder: -40, elbow: 30 }, dur: 0.16, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' },
    { pose: { tilt: 15, hip: 10, knee: 5, ankle: -35, shoulder: 60, elbow: 20 }, dur: 0.18, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
    // Genoux remontés au-dessus de l'obstacle.
    { pose: { x: x0 + dist / 2, y: hh + 20, tilt: 20, hip: 95, knee: 110, ankle: 5, shoulder: 40, elbow: 50 }, dur: 0.2, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
    { pose: { x: x0 + dist, y: 0, tilt: 10, hip: 20, knee: 15, ankle: -15, shoulder: 20, elbow: 40 }, dur: 0.14, phase: 'excentrique', ease: 'linear', say: 'land', anchor: 'toeN' },
  ];

/** Sauts enchaînés au-dessus de n obstacles, réception stabilisée ou non, puis retour à pied. */
const hops = (n: number, hh: number, opts: { hold?: boolean; dist?: number; single?: boolean } = {}): Keyframe[] => {
  const dist = opts.dist ?? GAP;
  const jumps: Keyframe[] = [{ pose: { x: 0, y: 0, ...ready }, dur: 0.4, phase: 'excentrique', anchor: 'toeN' }];
  for (let i = 0; i < n; i++) {
    jumps.push(...hop(i * dist, dist, hh));
    // Réception stabilisée (niveau 2) : on tient l'amorti avant le saut suivant.
    if (opts.hold) jumps.push({ pose: { ...landing }, dur: 1.2, phase: 'isométrique', say: 'hold', anchor: 'toeN' });
  }
  jumps.push({ pose: { ...landing }, dur: 0.6, phase: 'retour', say: 'rise', anchor: 'toeN' });
  const keys = opts.single ? jumps.map(lift) : jumps;
  keys.push(
    { pose: { tilt: 0, ...together, shoulder: 4, elbow: 8 }, dur: 0, phase: 'retour', say: 'return', anchor: 'toeN' },
    // Recalage du décalage (passage de durée nulle, rien ne bouge), puis retour à pied.
    { pose: { x: 0 }, dur: 0.3, phase: 'retour', say: 'return', anchor: 'heelN' },
    ...walkBack(n * dist, Math.ceil((n * dist) / 40)),
    { pose: { tilt: 0, ...together, shoulder: 4, elbow: 8 }, dur: 0.4, phase: 'retour', say: 'return', anchor: 'heelN' },
  );
  return keys;
};

const hurdles = (n: number, hh: number, dist = GAP) =>
  Array.from({ length: n }, (_, i) => ({ kind: 'box' as const, at: [i * dist + dist / 2 - 15, 0] as [number, number], size: [4, hh] as [number, number], beside: true }));

export default defineAnimation({
  exerciseId: 'hurdle-hops',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 3,
  // Niveau 1 : sauts d'avant en arrière au-dessus d'une ligne, contacts brefs.
  keyframes: [
    { pose: { x: 0, y: 0, ...ready, tilt: 10, hip: 15, knee: 15, ankle: 10 }, dur: 0.14, phase: 'concentrique', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
    { pose: { x: 12, y: 12, tilt: 10, hip: 15, knee: 15, ankle: -25 }, dur: 0.14, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
    { pose: { x: 25, y: 0, tilt: 10, hip: 15, knee: 15, ankle: 10 }, dur: 0.14, phase: 'concentrique', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
    { pose: { x: 12, y: 12, tilt: 10, hip: 15, knee: 15, ankle: -25 }, dur: 0.14, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
  ],
  contacts: [],
  overrides: [
    { levels: [2], still: 3, keyframes: hops(1, 18, { hold: true }), props: hurdles(1, 18) },
    { levels: [3], still: 3, keyframes: hops(2, 25), props: hurdles(2, 25) },
    { levels: [4], still: 3, keyframes: hops(2, 45), props: hurdles(2, 45) },
    { levels: [5], still: 3, keyframes: hops(1, 12, { dist: 70, single: true }), props: hurdles(1, 12, 70) },
  ],
});
