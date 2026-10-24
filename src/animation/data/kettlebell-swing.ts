import { defineAnimation } from '../schema';

/**
 * Swing kettlebell — « Faites passer la kettlebell entre les cuisses, puis tendez les hanches avec force : elle monte jusqu’à
 * hauteur de poitrine grâce à l’élan des hanches, bras relâchés. Laissez-la redescendre et repartez en charnière, sans pause. »
 * Charnière de hanche (fesses vers l'arrière, dos plat, genoux peu fléchis), pieds à plat (cheville = genou − hanche +
 * inclinaison) ; bras tendus du début à la fin. Niveau 1 : même charnière, sans charge.
 */
export default defineAnimation({
  exerciseId: 'kettlebell-swing',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    // Kettlebell entre les cuisses, buste penché, bras vers l'arrière.
    { pose: { tilt: 62, trunk: 0, neck: -15, hip: 82, knee: 25, ankle: 5, shoulder: 25, elbow: 0 }, dur: 0.45, phase: 'concentrique', ease: 'easeOut', say: 'push' },
    // Hanches tendues avec force : la kettlebell monte à hauteur de poitrine.
    { pose: { tilt: 0, neck: 0, hip: 0, knee: 3, ankle: 3, shoulder: 90 }, dur: 0.5, phase: 'excentrique', ease: 'easeIn', say: 'lower' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    { variants: ['kettlebell'], props: [{ kind: 'kettlebell', attach: 'handN', at: [0.6, 0] }] },
    { levels: [2, 3, 4, 5], variants: ['bodyweight'], props: [{ kind: 'kettlebell', attach: 'handN', at: [0.6, 0] }] },
  ],
});
