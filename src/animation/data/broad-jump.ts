import { defineAnimation, type Keyframe } from '../schema';

/**
 * Saut en longueur sans élan — « Balancez les bras vers l’arrière en pliant hanches et genoux, puis projetez-vous le plus
 * loin possible vers l’avant en lançant les bras. Réceptionnez-vous sur les deux pieds, hanches basses, et tenez la position
 * 2 secondes. » Pieds joints, pieds à plat (cheville = genou − hanche + inclinaison) ; vol = décalage de la racine.
 * Pour que le cycle revienne à son départ, le personnage revient ensuite à la ligne en marchant à reculons (pas chassés
 * de 40 cm ; le décalage du vol est recalé sur l'appui, sans mouvement visible). Niveaux 3 et 5 (sauts enchaînés) :
 * un seul saut montré. Niveaux 4 et 5 : sur une jambe (saut plus court), l'autre genou fléchi.
 */
const STEP = 40;
/** Écart des hanches pour un pas de STEP unités (jambes tendues). */
const A = (Math.asin(STEP / 2 / 88.3) * 180) / Math.PI;
const together = { hip: 2, knee: 3, ankle: 1 };
/** Retour à reculons : pied éloigné en arrière, puis pied proche qui le rejoint. Appuis à plat, alternés. */
const walkBack = (steps: number): Keyframe[] =>
  Array.from({ length: steps }, (): Keyframe[] => [
    { pose: { ...together }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'heelN' },
    { pose: { hipN: A, ankleN: 1 - A, hipF: -A, ankleF: 1 + A }, dur: 0.45, phase: 'retour', say: 'return', anchor: 'toeF' },
  ]).flat();

/** Jambe libre des niveaux unipodaux (genou fléchi, pied décollé), par poses clés du saut. */
const FREE = [
  { hipF: 25, kneeF: 75, ankleF: 0 },
  { hipF: 115, kneeF: 120, ankleF: 0 },
  { hipF: 75, kneeF: 95, ankleF: 0 },
  { hipF: 60, kneeF: 90, ankleF: -10 },
  { hipF: 80, kneeF: 90, ankleF: 0 },
  { hipF: 115, kneeF: 115, ankleF: 0 },
  { hipF: 25, kneeF: 75, ankleF: 0 },
];

const jumpOnly = (dist: number): Keyframe[] => [
  { pose: { x: 0, y: 0, tilt: 0, ...together, shoulder: 4, elbow: 8 }, dur: 0.5, phase: 'excentrique', anchor: 'toeN' },
  // Bras lancés vers l'arrière, hanches et genoux fléchis.
  { pose: { tilt: 40, hip: 105, knee: 90, ankle: 25, shoulder: -55, elbow: 10 }, dur: 0.22, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' },
  // Mi-poussée : les bras passent par l'avant.
  { pose: { tilt: 38, hip: 60, knee: 40, ankle: 0, shoulder: 60, elbow: 8 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' },
  // Impulsion vers l'avant, corps tendu, bras lancés.
  { pose: { tilt: 35, hip: 30, knee: 5, ankle: -35, shoulder: 150 }, dur: 0.3, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
  { pose: { x: dist / 2, y: 30, tilt: 15, hip: 75, knee: 75, ankle: 0, shoulder: 120 }, dur: 0.3, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
  // Réception sur les deux pieds, hanches basses ; tenue 2 s.
  { pose: { x: dist, y: 0, tilt: 40, hip: 105, knee: 90, ankle: 25, shoulder: 60, elbow: 20 }, dur: 2, phase: 'isométrique', say: 'hold', anchor: 'toeN' },
  { pose: { tilt: 0, ...together, shoulder: 4, elbow: 8 }, dur: 0, phase: 'retour', say: 'return', anchor: 'toeN' },
];

const jump = (dist: number, single = false): Keyframe[] => [
  ...jumpOnly(dist).map((k, i) => (single && FREE[i] ? { ...k, pose: { ...k.pose, ...FREE[i] } } : k)),
  // Recalage du décalage horizontal (passage de durée nulle, rien ne bouge), puis retour à pied.
  { pose: { x: 0 }, dur: 0.3, phase: 'retour', say: 'return', anchor: 'heelN' },
  ...walkBack(Math.round(dist / STEP)),
  // Unipodal : pieds réunis avant de relever la jambe libre.
  ...(single ? [{ pose: { ...together }, dur: 0.4, phase: 'retour', say: 'return', anchor: 'heelN' } satisfies Keyframe] : []),
];

export default defineAnimation({
  exerciseId: 'broad-jump',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 4,
  keyframes: jump(80),
  contacts: [],
  overrides: [
    { levels: [2, 3], keyframes: jump(120) },
    { levels: [4, 5], keyframes: jump(80, true) },
  ],
});
