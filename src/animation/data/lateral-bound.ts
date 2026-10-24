import { defineAnimation, type Keyframe } from '../schema';

/**
 * Bonds latéraux (patineur) — « Poussez sur la jambe droite pour bondir vers la gauche et réceptionnez-vous sur la jambe
 * gauche seule, hanche fléchie, genou dans l’axe. Stabilisez, puis repartez de l’autre côté. » Vue de face : appui sur une
 * jambe fléchie (cuisse et jambe vues en raccourci), l'autre jambe décollée ; bond de côté (décalage de la racine),
 * réception sur l'autre jambe. Niveaux 1 et 2 : stabilisation 2 s ; niveaux 3 et 4 : rebond immédiat.
 */
const bounds = (dist: number, height: number, hold: number): Keyframe[] => {
  const iso = hold > 0;
  return [
    // Appui sur la jambe proche, l'autre genou décollé.
    { pose: { x: 0, y: 0, tilt: 0, hipN: 4, fs_thighN: 0.82, fs_shankN: 0.96, hipF: -4, fs_thighF: 0.55, fs_shankF: 0.9, shoulder: 25 }, dur: iso ? hold : 0.15, phase: iso ? 'isométrique' : 'excentrique', say: iso ? 'hold' : 'land', anchor: 'midN' },
    // Poussée de côté : la jambe d'appui se tend.
    { pose: { hipN: 18, fs_thighN: 1, fs_shankN: 1 }, dur: 0.2, phase: 'concentrique', ease: 'easeOut', say: 'jump', anchor: 'midN' },
    // En l'air : pieds à la même hauteur.
    { pose: { x: -0.5 * dist, y: height, hipN: 12, hipF: -12, fs_thighN: 0.85, fs_shankN: 1, fs_thighF: 0.85, fs_shankF: 1 }, dur: 0.22, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'midF' },
    // Réception sur l'autre jambe, genou fléchi.
    { pose: { x: -dist, y: 0, hipF: 4, fs_thighF: 0.82, fs_shankF: 0.96, hipN: -4, fs_thighN: 0.55, fs_shankN: 0.9 }, dur: iso ? hold : 0.15, phase: iso ? 'isométrique' : 'excentrique', say: iso ? 'hold' : 'land', anchor: 'midF' },
    { pose: { hipF: 18, fs_thighF: 1, fs_shankF: 1 }, dur: 0.2, phase: 'concentrique', ease: 'easeOut', say: 'jump', anchor: 'midF' },
    { pose: { x: -0.5 * dist, y: height, hipN: 12, hipF: -12, fs_thighN: 0.85, fs_shankN: 1, fs_thighF: 0.85, fs_shankF: 1 }, dur: 0.22, phase: 'retour', ease: 'easeIn', say: 'land', anchor: 'midN' },
  ];
};

export default defineAnimation({
  exerciseId: 'lateral-bound',
  view: 'face',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 2,
  keyframes: bounds(40, 10, 2),
  contacts: [
    { point: 'midN', from: 0, to: 1 },
    { point: 'midF', from: 3, to: 4 },
  ],
  overrides: [
    { levels: [2], keyframes: bounds(75, 16, 2) },
    { levels: [3], keyframes: bounds(60, 14, 0) },
    { levels: [4], keyframes: bounds(60, 24, 0) },
  ],
});
