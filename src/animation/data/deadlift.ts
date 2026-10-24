import { defineAnimation } from '../schema';

/**
 * Soulevé de terre — « Poussez le sol avec les pieds et montez en gardant la charge collée aux jambes jusqu’à être debout,
 * hanches et genoux tendus. Redescendez par le même chemin : fesses vers l’arrière d’abord, puis pliez les genoux une fois
 * la charge passée sous les genoux. » Pieds à plat (cheville = genou − hanche + inclinaison), dos plat (tronc aligné sur
 * le bassin), bras tendus, charge au-dessus du milieu du pied. Niveau 1 : charnière de hanche avec un bâton le long du dos.
 */
export default defineAnimation({
  exerciseId: 'deadlift',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 2,
  keyframes: [
    { pose: { tilt: 0, trunk: 0, hip: 2, knee: 3, ankle: 1, shoulder: 2, elbow: 0 }, dur: 1, phase: 'excentrique', say: 'flatBack' },
    // Fesses vers l'arrière d'abord, genoux encore peu fléchis (la charge passe sous les genoux).
    { pose: { tilt: 45, hip: 52, knee: 15, ankle: 8, shoulder: 45 }, dur: 1, phase: 'excentrique', say: 'flatBack' },
    // En bas : charge au sol, au-dessus du milieu du pied.
    { pose: { tilt: 70, hip: 130, knee: 85, ankle: 25, shoulder: 57 }, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveau 1 : charnière de hanche au bâton (contact tête, haut du dos, bas du dos), sans charge, genoux peu fléchis.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 0, trunk: 0, hip: 2, knee: 3, ankle: 1, shoulderN: -45, elbowN: 95, shoulderF: 160, elbowF: 150 }, dur: 2, phase: 'excentrique', say: 'flatBack' },
        { pose: { tilt: 60, hip: 72, knee: 18, ankle: 6 }, dur: 0, phase: 'pause', say: 'flatBack' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      props: [{ kind: 'stick', attach: 'trunk', at: [0, 1.25] }],
      still: 1,
    },
    { levels: [2], props: [{ kind: 'kettlebell', attach: 'handN', at: [0.6, 0] }] },
    { levels: [3, 4, 5], variants: ['bodyweight', 'kettlebell', 'barbell'], props: [{ kind: 'barbell', attach: 'handN' }] },
    { levels: [3, 4, 5], variants: ['trap-bar'], props: [{ kind: 'barbell', attach: 'handN' }] },
  ],
});
