import { defineAnimation } from '../schema';

/**
 * Dead bug — « Éloignez lentement un bras derrière la tête et la jambe opposée vers le sol, sans que le bas du dos décolle.
 * Revenez, puis changez de côté. » Sur le dos, tête à gauche (inclinaison −90°), hanches et genoux à 90°, tibias parallèles
 * au sol, bras tendus vers le plafond. Jambe proche et bras éloigné bougent ensemble ; le dos reste au sol.
 */
export default defineAnimation({
  exerciseId: 'dead-bug',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'shoulder' },
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, hip: 90, knee: 90, ankle: 0, shoulder: 90, elbow: 0 }, dur: 3, phase: 'excentrique' },
    // Niveaux 3 à 5 : jambe tendue, talon à quelques centimètres du sol ; bras éloigné derrière la tête.
    { pose: { hipN: -1.5, kneeN: 0, ankleN: 10, shoulderF: 172 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'concentrique', say: 'return' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'seat' }],
  overrides: [
    // Niveau 1 : jambes seules, bras au sol ; le talon effleure le sol, genou toujours plié.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: -90, neck: 10, hip: 90, knee: 90, ankle: 0, shoulder: 6, elbow: 0 }, dur: 2, phase: 'excentrique' },
        { pose: { hipN: 43 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'concentrique', say: 'return' },
      ],
    },
    // Niveau 2 : bras et jambe opposés, genou toujours plié.
    {
      levels: [2],
      keyframes: [
        { pose: { tilt: -90, neck: 10, hip: 90, knee: 90, ankle: 0, shoulder: 90, elbow: 0 }, dur: 3, phase: 'excentrique' },
        { pose: { hipN: 43, shoulderF: 172 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'concentrique', say: 'return' },
      ],
    },
    { levels: [5], variants: ['bodyweight', 'dumbbell'], props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [5], variants: ['band'], props: [{ kind: 'band', from: { seg: 'handF', u: 0.4 }, to: { world: [-120, 5] } }] },
  ],
});
