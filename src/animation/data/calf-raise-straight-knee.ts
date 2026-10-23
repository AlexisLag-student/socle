import { defineAnimation } from '../schema';

/**
 * Montée sur pointes jambe tendue — « Montez le plus haut possible sur la pointe des pieds en 3 secondes,
 * puis redescendez lentement en 3 secondes jusqu’à la position de départ (ou sous le niveau de la marche). »
 * Genou tendu sans être verrouillé (3°), une main contre le mur, sans rebond en bas.
 * Appui = pointe du pied (le talon monte autour de l'avant-pied).
 */
export default defineAnimation({
  exerciseId: 'calf-raise-straight-knee',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  // Les deux mains restent posées au mur : les coudes se plient quand le corps monte.
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    { pose: { knee: 3, hip: 3, shoulder: 62, elbow: 12 }, dur: 1.5, phase: 'concentrique', say: 'rise' },
    { pose: { ankle: -42 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1.5, phase: 'excentrique' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  props: [{ kind: 'wall', at: [43, 0] }],
  overrides: [
    // Niveaux 2 à 5 : sur une jambe, l'autre pied décollé derrière.
    { levels: [2, 3, 4, 5], side: 'unilateral', pose: { hipF: 12, kneeF: 75, ankleF: -20 }, contacts: [{ point: 'toeN' }, { point: 'heelN', from: 0, to: 0 }] },
    // Niveau 3 : avant-pied au bord d’une marche, talon qui descend sous le niveau de la marche.
    {
      levels: [3],
      anchor: { point: 'toeN', y: 18 },
      keyframes: [
        { pose: { knee: 3, hip: 3, ankle: 18, shoulder: 62, elbow: 12, hipF: 12, kneeF: 75, ankleF: -20 }, dur: 1.5, phase: 'concentrique', say: 'rise' },
        { pose: { ankle: -42, ankleF: -20 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1.5, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN', y: 18 }],
      props: [{ kind: 'step', at: [-5, 0], size: [36, 18] }],
    },
    // Charge du côté de la jambe qui travaille, l’autre main au mur (seul cas à un bras, demandé par le texte).
    { levels: [4, 5], variants: ['dumbbell', 'bodyweight'], pose: { shoulderN: 4, elbowN: 6, shoulderF: 62, elbowF: 12 }, ik: [{ limb: 'armF', pin: 'wrist' }], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    // Machine ou barre guidée : charge sur les épaules, sans appui au mur.
    { levels: [4, 5], variants: ['machine'], pose: { shoulder: -35, elbow: 125 }, ik: [], props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
