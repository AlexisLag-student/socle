import { defineAnimation, type Keyframe } from '../schema';

/**
 * Saut sur box — « Faites un contre-mouvement rapide avec les bras, sautez et posez les deux pieds à plat au centre de la
 * box, en quart de squat. Redressez-vous, puis redescendez en marchant, sans sauter en arrière. » Départ à un demi-pas de
 * la box ; pieds à plat : cheville = genou − hanche + inclinaison ; vol = décalage de la racine. Redescente à reculons, un
 * pied après l'autre, puis petit pas en arrière pour revenir au départ (le décalage est recalé sur l'appui, sans
 * mouvement visible).
 */
const together = { hip: 2, knee: 3, ankle: 1 };
const stand = { tilt: 0, ...together, shoulder: 4, elbow: 8 };
const BOX_X = 20;

/** Pose de la descente : jambe d'appui fléchie sur la box, pointe du pied éloigné posée au sol, au départ. */
type Down = { tilt: number; hipN: number; kneeN: number; ankleN: number; hipF: number; kneeF: number };
/** Jambe libre des niveaux unipodaux (genou fléchi, pied décollé), pour les poses clés 0 à 6. */
const FREE = [
  { hipF: 25, kneeF: 75, ankleF: 0 },
  { hipF: 115, kneeF: 120, ankleF: 0 },
  { hipF: 75, kneeF: 95, ankleF: 0 },
  { hipF: 60, kneeF: 90, ankleF: -10 },
  { hipF: 100, kneeF: 110, ankleF: 0 },
  { hipF: 90, kneeF: 110, ankleF: 0 },
  { hipF: 25, kneeF: 75, ankleF: 0 },
];

const jump = (h: number, down: Down, opts: { single?: boolean; seated?: boolean } = {}): Keyframe[] => {
  const keys: Keyframe[] = [
    { pose: { x: 0, y: 0, ...stand }, dur: 0.5, phase: 'excentrique', anchor: 'toeN' },
    // Contre-mouvement : bras vers l'arrière, hanches et genoux fléchis.
    { pose: { tilt: 40, hip: 105, knee: 90, ankle: 25, shoulder: -55, elbow: 10 }, dur: 0.22, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' },
    { pose: { tilt: 30, hip: 55, knee: 40, ankle: 10, shoulder: 60, elbow: 8 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' },
    // Impulsion vers le haut, bras lancés.
    { pose: { tilt: 12, hip: 10, knee: 5, ankle: -35, shoulder: 150 }, dur: 0.25, phase: 'retour', ease: 'easeOut', say: 'jump', anchor: 'toeN' },
    // Genoux remontés au-dessus de l'arête de la box.
    { pose: { x: 30, y: h + 25, tilt: 15, hip: 90, knee: 100, ankle: 10, shoulder: 110 }, dur: 0.25, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'toeN' },
    // Réception pieds à plat au centre de la box, en quart de squat.
    { pose: { x: opts.single ? 52 : 60, y: h, tilt: 25, hip: 60, knee: 60, ankle: 25, shoulder: 50, elbow: 15 }, dur: 0.6, phase: 'retour', say: 'rise', anchor: 'toeN' },
    { pose: { ...stand }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'heelN' },
    // Le pied éloigné recule au-dessus de l'arête de la box…
    { pose: { tilt: 10, hipN: 35, kneeN: 40, ankleN: 15, hipF: -8, kneeF: 40, ankleF: 15, shoulder: 15 }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'heelN' },
    // … puis descend jusqu'au sol, jambe d'appui fléchie.
    { pose: { ...down, ankleF: -20, shoulder: 25 }, dur: 0.3, phase: 'retour', say: 'step', anchor: 'toeF' },
    // Le pied proche décolle de la box, genou haut pour passer l'arête, et rejoint l'autre.
    { pose: { hipN: 90 + Math.max(0, h - 30), kneeN: h > 30 ? 140 : 130, ankleN: 20 }, dur: 0.25, phase: 'retour', say: 'step', anchor: 'toeF' },
    { pose: { tilt: 5, hipN: 55, kneeN: 110, ankleN: 5, hipF: 0, kneeF: 5, ankleF: 5, shoulder: 10 }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'toeF' },
    { pose: { ...stand }, dur: 0, phase: 'retour', say: 'return', anchor: 'toeF' },
    // Recalage du décalage (passage de durée nulle, rien ne bouge).
    { pose: { x: 0, y: 0 }, dur: opts.seated ? 1 : 0.5, phase: 'retour', say: opts.seated ? 'lower' : 'return', anchor: 'toeN' },
  ];
  if (opts.single) FREE.forEach((free, i) => (keys[i] = { ...keys[i]!, pose: { ...keys[i]!.pose, ...free } }));
  // Départ assis : pas de contre-mouvement, le buste se penche et les bras partent en arrière avant de pousser.
  if (opts.seated) keys.splice(0, 2, { pose: { x: 0, y: 0, tilt: 5, hip: 95, knee: 95, ankle: 5, shoulder: 10, elbow: 70 }, dur: 0.6, phase: 'pause', anchor: 'toeN' }, { pose: { tilt: 40, hip: 115, knee: 95, ankle: 20, shoulder: 30, elbow: 10 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump', anchor: 'toeN' });
  return keys;
};

const box = (h: number) => [{ kind: 'box' as const, at: [BOX_X, 0] as [number, number], size: [50, h] as [number, number] }];

export default defineAnimation({
  exerciseId: 'box-jump',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 5,
  keyframes: jump(30, { tilt: 15, hipN: 70, kneeN: 85, ankleN: 30, hipF: 1.8, kneeF: 18.2 }),
  contacts: [],
  overrides: [
    { levels: [1], props: box(30) },
    { levels: [2], keyframes: jump(45, { tilt: 20, hipN: 95, kneeN: 105, ankleN: 30, hipF: 13.7, kneeF: 23.8 }), props: box(45) },
    {
      levels: [3],
      keyframes: jump(30, { tilt: 15, hipN: 70, kneeN: 85, ankleN: 30, hipF: 1.8, kneeF: 18.2 }, { seated: true }),
      props: [...box(30), { kind: 'bench', at: [-120, 0], size: [65, 42] }],
    },
    { levels: [4], keyframes: jump(25, { tilt: 15, hipN: 60, kneeN: 75, ankleN: 30, hipF: 5.3, kneeF: 21.2 }, { single: true }), props: box(25) },
  ],
});
