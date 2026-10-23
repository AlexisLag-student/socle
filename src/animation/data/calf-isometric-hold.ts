import { defineAnimation } from '../schema';

/**
 * Maintien isométrique sur pointes — « Maintenez la position talons décollés sans bouger pendant la durée indiquée,
 * puis reposez doucement. » Mains contre le mur, talons à mi-hauteur, genoux tendus sans être verrouillés.
 */
export default defineAnimation({
  exerciseId: 'calf-isometric-hold',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    { pose: { knee: 3, hip: 3, shoulder: 62, elbow: 12 }, dur: 1, phase: 'concentrique', say: 'rise' },
    // Talons à mi-hauteur.
    { pose: { ankle: -22 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.2, phase: 'retour' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  props: [{ kind: 'wall', at: [43, 0] }],
  overrides: [
    // Niveaux 2 et 3 : sur une jambe, l'autre pied décollé derrière.
    { levels: [2, 3], side: 'unilateral', pose: { hipF: 12, kneeF: 75, ankleF: -20 }, contacts: [{ point: 'toeN' }, { point: 'heelN', from: 0, to: 0 }] },
    // Niveau 3 : charge du côté de la jambe qui travaille, l'autre main au mur.
    { levels: [3], variants: ['bodyweight', 'dumbbell'], pose: { shoulderN: 4, elbowN: 6, shoulderF: 62, elbowF: 12 }, ik: [{ limb: 'armF', pin: 'wrist' }], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [3], variants: ['machine'], pose: { shoulder: -35, elbow: 125 }, ik: [], props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
