import { defineAnimation, type Keyframe } from '../schema';

/**
 * Drop jump — « Avancez un pied dans le vide et laissez-vous tomber, sans sauter vers le bas. Dès que les pieds touchent
 * le sol, rebondissez le plus vite et le plus haut possible, avec un contact très bref, puis réceptionnez-vous en
 * douceur. » Pieds à plat : cheville = genou − hanche + inclinaison ; chute et vol = décalage de la racine.
 * Pour que le cycle revienne à son départ, le personnage remonte ensuite sur la box à reculons (pied éloigné posé sur la
 * box, puis l'autre ; le décalage est recalé sur l'appui, sans mouvement visible).
 */
const together = { hip: 2, knee: 3, ankle: 1 };
const stand = { tilt: 0, ...together, shoulder: 4, elbow: 8 };
/** Distance de la réception devant le bord de la box. */
const LAND = 62;

/** Pose où le pied éloigné se pose sur la box, derrière, jambe d'appui fléchie au sol. */
type Back = { tilt: number; hipN: number; kneeN: number; ankleN: number; hipF: number; kneeF: number; ankleF: number };

const STEP = 31;
/** Écart des hanches pour un pas de STEP unités (jambes tendues). */
const A = (Math.asin(STEP / 2 / 88.3) * 180) / Math.PI;
/** Retour à reculons : pied éloigné en arrière, puis pied proche qui le rejoint. */
const walkBack = (steps: number): Keyframe[] =>
  Array.from({ length: steps }, (): Keyframe[] => [
    { pose: { ...together }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'heelN' },
    { pose: { hipN: A, ankleN: 1 - A, hipF: -A, ankleF: 1 + A }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'toeF' },
  ]).flat();

/** Jambe libre du niveau unipodal (genou fléchi, pied décollé). */
const free = (k: Keyframe): Keyframe => ({ ...k, pose: { ...k.pose, hipF: 30 + Number(k.pose.hip ?? 0) * 0.6, kneeF: 80, ankleF: 0 } });

const drop = (h: number, back: Back, opts: { rebound?: boolean; chain?: boolean; single?: boolean } = {}): Keyframe[] => {
  const ground = { x: LAND, y: -h };
  const landing = { tilt: 25, hip: 60, knee: 60, ankle: 25, shoulder: 40, elbow: 20 };
  const touch: Keyframe = { pose: { ...ground, tilt: 5, hip: 10, knee: 5, ankle: -25, shoulder: 35, elbow: 15 }, dur: 0.12, phase: 'excentrique', ease: 'easeOut', say: 'land', anchor: 'toeN' };
  const contact: Keyframe = { pose: { tilt: 20, hip: 40, knee: 45, ankle: 25, shoulder: 5, elbow: 10 }, dur: 0.22, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' };
  const air: Keyframe[] = opts.chain
    ? [
        // Rebond enchaîné en saut en longueur.
        { pose: { tilt: 35, hip: 30, knee: 5, ankle: -35, shoulder: 140 }, dur: 0.3, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
        { pose: { x: LAND + 31, y: -h + 25, tilt: 15, hip: 75, knee: 75, ankle: 0, shoulder: 120 }, dur: 0.3, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
        { pose: { x: LAND + 62, y: -h, ...landing }, dur: 1, phase: 'isométrique', say: 'hold', anchor: 'toeN' },
      ]
    : [
        // Rebond vertical, puis réception amortie.
        { pose: { tilt: 8, hip: 5, knee: 5, ankle: -35, shoulder: 150 }, dur: 0.3, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
        { pose: { y: -h + 30, tilt: 5, hip: 15, knee: 20, ankle: -20, shoulder: 120 }, dur: 0.3, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
        { ...touch, pose: { y: -h, tilt: 5, hip: 10, knee: 5, ankle: -25, shoulder: 35, elbow: 15 } },
        { pose: { ...landing }, dur: 1, phase: 'isométrique', say: 'hold', anchor: 'toeN' },
      ];
  const fall: Keyframe[] = [
    { pose: { x: 0, y: 0, ...stand }, dur: 0.6, phase: 'excentrique', anchor: 'toeF' },
    // Un pied avancé dans le vide, l'autre encore sur la box.
    { pose: { tilt: 3, hipN: 30, kneeN: 15, ankleN: 0, hipF: 0, kneeF: 6, ankleF: -25, shoulder: 15 }, dur: 0.35, phase: 'excentrique', ease: 'easeIn', say: 'step', anchor: 'toeF' },
    // Chute : pointes de pieds vers le sol.
    touch,
    ...(opts.rebound || opts.chain ? [contact, ...air] : [{ pose: { ...landing }, dur: 1, phase: 'isométrique', say: 'hold', anchor: 'toeN' } satisfies Keyframe]),
  ];
  // Unipodal : on descend sur la jambe proche, l'autre reste fléchie jusqu'à la réception stabilisée.
  const keys = opts.single ? fall.map((k, i) => (i >= 2 ? free(k) : k)) : fall;
  return [
    ...keys,
    { pose: { ...landing, ...(opts.single ? { hipF: 66, kneeF: 80, ankleF: 0 } : {}) }, dur: 0.6, phase: 'retour', say: 'rise', anchor: 'toeN' },
    ...(opts.chain
      ? ([
          { pose: { ...stand }, dur: 0, phase: 'retour', say: 'return', anchor: 'toeN' },
          // Recalage du décalage (passage de durée nulle), puis retour à reculons jusqu'à la première réception.
          { pose: { x: 0, y: 0 }, dur: 0.3, phase: 'retour', say: 'return', anchor: 'heelN' },
          ...walkBack(2),
        ] satisfies Keyframe[])
      : []),
    { pose: { ...stand }, dur: 0.5, phase: 'retour', say: 'step', anchor: 'heelN' },
    // Remontée à reculons : la pointe du pied éloigné se pose sur la box…
    { pose: { ...back, shoulder: 20 }, dur: 0.6, phase: 'retour', say: 'step', anchor: 'toeF' },
    // … puis on se hisse sur la box, genou proche remonté.
    { pose: { tilt: 5, hipF: 5, kneeF: 5, ankleF: 5, hipN: 45, kneeN: 95, ankleN: 10, shoulder: 10 }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'toeF' },
    { pose: { ...stand }, dur: 0, phase: 'retour', say: 'return', anchor: 'heelN' },
    // Recalage du décalage (passage de durée nulle, rien ne bouge).
    { pose: { x: 0, y: 0 }, dur: 0.6, phase: 'retour', say: 'return', anchor: 'toeF' },
  ];
};

const box = (h: number) => [{ kind: 'box' as const, at: [-48, 0] as [number, number], size: [50, h] as [number, number] }];
const BACK = { tilt: 5, hipN: 10, kneeN: 15, ankleN: 10, ankleF: -40 };

export default defineAnimation({
  exerciseId: 'drop-jump',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeF', y: 25 },
  still: 3,
  keyframes: drop(25, { ...BACK, hipF: 19.5, kneeF: 89 }),
  contacts: [],
  overrides: [
    { levels: [1], props: box(25) },
    { levels: [2], still: 3, keyframes: drop(25, { ...BACK, hipF: 19.5, kneeF: 89 }, { rebound: true }), props: box(25) },
    { levels: [3], still: 3, anchor: { point: 'toeF', y: 40 }, keyframes: drop(40, { ...BACK, hipF: 25.8, kneeF: 108.2 }, { rebound: true }), props: box(40) },
    { levels: [4], still: 3, anchor: { point: 'toeF', y: 30 }, keyframes: drop(30, { ...BACK, hipF: 22.2, kneeF: 96.2 }, { chain: true }), props: box(30) },
    { levels: [5], still: 3, anchor: { point: 'toeF', y: 18 }, keyframes: drop(18, { ...BACK, hipF: -4, kneeF: 75.6 }, { rebound: true, single: true }), props: box(18) },
  ],
});
