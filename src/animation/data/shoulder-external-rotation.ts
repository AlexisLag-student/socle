import { defineAnimation } from '../schema';

/**
 * Rotation externe d’épaule — « Faites pivoter l’avant-bras vers l’extérieur sans décoller le coude, tenez 1 seconde,
 * puis revenez lentement. » Vue de face, debout, coude plié à 90° collé au corps : au départ l'avant-bras pointe devant
 * le ventre (vers l'observateur, vu en raccourci), à l'arrivée il est ouvert sur le côté. Élastique fixé de l'autre côté,
 * à hauteur du coude. Niveau 1 : isométrie (dos de la main contre un cadre de porte). Niveau 5 : bras levé à 90° sur le
 * côté, l'avant-bras passe de l'avant vers le haut. L'haltère (version couchée sur le côté) n'est pas dessiné : debout,
 * il ne résisterait pas à la rotation. Le niveau 2 (couché sur le côté) garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'shoulder-external-rotation',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, shoulderF: 8, shoulderN: 2, elbowN: 0, fs_forearmN: 0.25, fs_handN: 0.4 }, dur: 2, phase: 'concentrique', say: 'push' },
    { pose: { elbowN: 90, fs_forearmN: 1, fs_handN: 1 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    {
      levels: [1],
      keyframes: [
        { pose: { hip: 3, shoulderF: 8, shoulderN: 2, elbowN: 60, fs_forearmN: 0.45, fs_handN: 0.6 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
    },
    { levels: [3, 4], variants: ['band', 'cable'], props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { world: [-80, 110] } }] },
    // Niveau 5 : bras à 90° d'abduction, coude à 90° ; l'avant-bras monte de l'avant vers le haut.
    {
      levels: [5],
      keyframes: [
        { pose: { hip: 3, shoulderF: 8, shoulderN: 90, elbowN: 90, fs_forearmN: 0.2, fs_handN: 0.4 }, dur: 2, phase: 'concentrique', say: 'push' },
        { pose: { fs_forearmN: 1, fs_handN: 1 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { world: [140, 120] } }],
    },
  ],
});
