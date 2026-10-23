import { defineAnimation, type Keyframe } from '../schema';

/**
 * Marche latérale avec élastique — « Faites un pas de côté d’une demi-largeur d’épaules, puis ramenez l’autre pied
 * sans que les pieds se touchent. Faites tous les pas d’un côté, puis revenez dans l’autre sens. »
 * Vue de face, quart de squat (cuisses et jambes vues en raccourci), hauteur constante, buste droit sans balancer,
 * genoux dans l’axe des pieds. Un pas vers la droite puis un pas vers la gauche : l'appui passe d'un pied à l'autre.
 */
/**
 * Pieds à la largeur du bassin (hanches à 2°), puis écart d'une demi-largeur d'épaules (hanches à 9°, pas d'environ 20 cm).
 * Hauteur du bassin constante : (cuisse·fs + jambe·fs)·cos(angle) identique dans les deux positions.
 */
const steps = (thigh: number, shank: number, wide: number, lifted: number): Keyframe[] => [
  { pose: { hip: 2, fs_thigh: thigh, fs_shank: shank, shoulder: 8 }, dur: 0.45, phase: 'concentrique', say: 'step', anchor: 'midF' },
  // Le pied droit s'écarte (jambe un peu raccourcie : le pied décolle à peine).
  { pose: { hipF: 6, hipN: 11, fs_shankN: lifted, fs_shankF: (shank + wide) / 2 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midF' },
  { pose: { hip: 9, fs_shank: wide }, dur: 0.45, phase: 'retour', say: 'step', anchor: 'midN' },
  // Le pied gauche suit, sans toucher l'autre.
  { pose: { hip: 6, fs_shankF: lifted, fs_shankN: (shank + wide) / 2 }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'midN' },
  { pose: { hip: 2, fs_shank: shank }, dur: 0.45, phase: 'concentrique', say: 'step', anchor: 'midN' },
  // Puis dans l'autre sens.
  { pose: { hipN: 6, hipF: 11, fs_shankF: lifted, fs_shankN: (shank + wide) / 2 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midN' },
  { pose: { hip: 9, fs_shank: wide }, dur: 0.45, phase: 'retour', say: 'step', anchor: 'midF' },
  { pose: { hip: 6, fs_shankN: lifted, fs_shankF: (shank + wide) / 2 }, dur: 0.4, phase: 'retour', say: 'step', anchor: 'midF' },
];

export default defineAnimation({
  exerciseId: 'lateral-band-walk',
  view: 'face',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midF' },
  still: 2,
  keyframes: steps(0.92, 0.96, 0.98, 0.9),
  contacts: [
    { point: 'midN', from: 2, to: 6 },
    { point: 'midN', from: 0, to: 0 },
    { point: 'midF', from: 6, to: 2 },
    { point: 'midF', from: 4, to: 4 },
  ],
  overrides: [
    { levels: [2], props: [{ kind: 'band', from: { seg: 'thighN', u: 0.86, v: 1 }, to: { seg: 'thighF', u: 0.86, v: 1 } }] },
    { levels: [3], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92, v: 1 }, to: { seg: 'shankF', u: 0.92, v: 1 } }] },
    // Niveau 4 : demi-squat, élastique autour de l'avant-pied.
    {
      levels: [4],
      keyframes: steps(0.8, 0.94, 0.959, 0.88),
      props: [{ kind: 'band', from: { seg: 'footN', u: 0.85, v: 0.4 }, to: { seg: 'footF', u: 0.85, v: 0.4 } }],
    },
  ],
});
