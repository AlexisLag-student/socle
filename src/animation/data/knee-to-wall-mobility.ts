import { defineAnimation } from '../schema';

/**
 * Mobilité de cheville genou au mur — « Avancez le genou vers le mur, dans l’axe du 2e orteil, sans décoller le talon,
 * puis revenez. » Face au mur, en fente, pied avant à quelques centimètres du mur, mains au mur.
 * Jambe proche = jambe avant (cheville travaillée) : talon au sol, la cheville se fléchit (jusqu'à 30°) ;
 * jambe arrière recalée sur sa pointe de pied.
 */
export default defineAnimation({
  exerciseId: 'knee-to-wall-mobility',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  ik: [
    { limb: 'legF', pin: 'toe' },
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    // Pied avant à plat (cheville = genou − hanche + inclinaison), pied arrière sur la pointe.
    { pose: { tilt: 5, hipN: 30, kneeN: 30, ankleN: 5, hipF: -15, kneeF: 15, ankleF: -10, shoulder: 45, elbow: 120 }, dur: 2, phase: 'concentrique', say: 'push' },
    { pose: { hipN: 42, kneeN: 67, ankleN: 30 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF' }],
  props: [{ kind: 'wall', at: [20, 0] }],
  overrides: [
    // Niveaux 2 et 3 : maintien en fin d'amplitude, genou contre le mur.
    {
      levels: [2, 3],
      keyframes: [
        { pose: { tilt: 5, hipN: 30, kneeN: 30, ankleN: 5, hipF: -15, kneeF: 15, ankleF: -10, shoulder: 45, elbow: 120 }, dur: 1.5, phase: 'concentrique', say: 'push' },
        { pose: { hipN: 42, kneeN: 67, ankleN: 30 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
    },
    // Niveau 3 : élastique fixé derrière, passé à l’avant de la cheville.
    { levels: [3], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.9, v: 1 }, to: { world: [-90, 8] } }] },
  ],
});
