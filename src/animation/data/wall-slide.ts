import { defineAnimation } from '../schema';

/**
 * Glissé au mur — « Faites glisser les avant-bras vers le haut le long du mur en poussant légèrement le mur, puis
 * redescendez lentement. » Face au mur, avant-bras posés contre le mur à hauteur d'épaules, un pied en avant ;
 * le buste s'incline un peu vers le mur pour que les avant-bras restent au contact en montant.
 * Niveaux 2 et 4 : en haut, les bras se décollent du mur de quelques centimètres.
 */
export default defineAnimation({
  exerciseId: 'wall-slide',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    // Pied avant (proche) et pied arrière à plat ; avant-bras verticaux contre le mur.
    { pose: { tilt: 4, hipN: 20, kneeN: 18, ankleN: 2, hipF: -8, kneeF: 5, ankleF: 17, shoulder: 90, elbow: 86 }, dur: 2, phase: 'concentrique', say: 'lift' },
    { pose: { tilt: 14.3, hipN: 30.3, ankleN: 2, hipF: 2.3, ankleF: 17, shoulder: 150, elbow: 47 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'wall', at: [58, 0] }],
  overrides: [
    { levels: [2, 4], keyframes: [
      { pose: { tilt: 4, hipN: 20, kneeN: 18, ankleN: 2, hipF: -8, kneeF: 5, ankleF: 17, shoulder: 90, elbow: 86 }, dur: 2, phase: 'concentrique', say: 'lift' },
      { pose: { tilt: 14.3, hipN: 30.3, ankleN: 2, hipF: 2.3, ankleF: 17, shoulder: 150, elbow: 47 }, dur: 0.5, phase: 'pause' },
      { pose: { shoulder: 165, elbow: 25 }, dur: 2, phase: 'pause', say: 'hold' },
      { pose: { shoulder: 150, elbow: 47 }, dur: 2, phase: 'excentrique' },
    ], still: 2 },
    { levels: [3, 4], props: [{ kind: 'band', from: { seg: 'forearmN', u: 0.6, v: -1 }, to: { seg: 'forearmF', u: 0.6, v: 1 } }] },
  ],
});
