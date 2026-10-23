import { defineAnimation } from '../schema';

/**
 * Squat sur plan incliné — « Descendez lentement (3 s) sur une jambe jusqu’à environ 60 à 90° de flexion de genou,
 * puis remontez à l’aide des deux jambes. » Talons en haut de la pente : le plan incliné d'environ 25° est représenté
 * par une cale sous les talons (pieds inclinés, pointes au sol). Buste droit, genou au-dessus du pied.
 * Niveau 1 : deux jambes. Niveaux 2 et 3 : descente sur la jambe proche, l'autre pied se pose pour remonter.
 * Pied incliné de 25° : cheville = genou − hanche + inclinaison − 25.
 */
export default defineAnimation({
  exerciseId: 'decline-squat',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'toeN' },
  still: 2,
  keyframes: [
    { pose: { tilt: 3, hip: 3, knee: 5, ankle: -20, shoulder: 35, elbow: 10 }, dur: 0.5, phase: 'excentrique', say: 'lift' },
    // L'autre pied se décolle : la jambe proche porte tout.
    { pose: { hipF: 20, kneeF: 70, ankleF: -10 }, dur: 2.5, phase: 'excentrique', say: 'brake' },
    { pose: { tilt: 22, hipN: 70, kneeN: 75, ankleN: 2, shoulder: 55 }, dur: 0.8, phase: 'concentrique', say: 'rise' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'heelN', y: 11 }, { point: 'toeF', from: 0, to: 0 }, { point: 'heelF', y: 11, from: 0, to: 0 }],
  props: [{ kind: 'pad', at: [-34, 0], size: [16, 11] }],
  overrides: [
    {
      levels: [1],
      side: 'bilateral',
      keyframes: [
        { pose: { tilt: 3, hip: 3, knee: 5, ankle: -20, shoulder: 35, elbow: 10 }, dur: 3, phase: 'excentrique' },
        { pose: { tilt: 18, hip: 55, knee: 60, ankle: -2, shoulder: 50 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'heelN', y: 11 }, { point: 'toeF' }, { point: 'heelF', y: 11 }],
      still: 1,
    },
    // Niveau 3 : lesté (haltère tenu le long du corps, ou charge sur le dos en salle).
    { levels: [3], variants: ['bodyweight', 'dumbbell'], pose: { shoulderN: 4, elbowN: 6 }, props: [{ kind: 'dumbbell', attach: 'handN' }] },
    { levels: [3], variants: ['gym'], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
