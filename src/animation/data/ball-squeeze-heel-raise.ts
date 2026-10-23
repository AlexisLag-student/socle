import { defineAnimation } from '../schema';

/**
 * Montée sur pointes, balle serrée entre les talons — « Serrez la balle, montez sur la pointe des pieds en la gardant
 * serrée, puis redescendez lentement. » Vue de profil : la balle, entre les talons, est cachée par le talon proche.
 * Mains au mur, genoux tendus sans être verrouillés.
 */
export default defineAnimation({
  exerciseId: 'ball-squeeze-heel-raise',
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
    { pose: { knee: 3, hip: 3, shoulder: 62, elbow: 12 }, dur: 2, phase: 'concentrique', say: 'rise' },
    { pose: { ankle: -40 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  props: [{ kind: 'wall', at: [43, 0] }],
  overrides: [
    // Niveaux 2 à 4 : avant-pieds sur une marche, talons sous le niveau de la marche.
    {
      levels: [2, 3, 4],
      anchor: { point: 'toeN', y: 18 },
      keyframes: [
        { pose: { knee: 3, hip: 3, ankle: 18, shoulder: 62, elbow: 12 }, dur: 2, phase: 'concentrique', say: 'rise' },
        { pose: { ankle: -40 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN', y: 18 }, { point: 'toeF', y: 18 }],
      props: [{ kind: 'step', at: [-5, 0], size: [36, 18] }],
    },
    // Lesté : haltères le long du corps, sans appui au mur ; machine : charge sur les épaules.
    { levels: [3, 4], variants: ['bodyweight', 'dumbbells'], pose: { shoulder: 4, elbow: 6 }, ik: [], props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [3, 4], variants: ['machine'], pose: { shoulder: -35, elbow: 125 }, ik: [], props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
