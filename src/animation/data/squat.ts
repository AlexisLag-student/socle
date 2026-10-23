import { defineAnimation } from '../schema';

/**
 * Squat — « Descendez en poussant les hanches vers l’arrière et en pliant les genoux, jusqu’à ce que
 * les cuisses soient proches de l’horizontale (ou jusqu’à la chaise) ». Talons au sol (pied à plat :
 * cheville = genou − hanche + inclinaison), dos long (tronc presque aligné sur le bassin), genou dans l'axe du pied.
 */
export default defineAnimation({
  exerciseId: 'squat',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    // « Bras tendus devant vous pour l’équilibre » (variante au poids du corps).
    { pose: { shoulder: 80, elbow: 5 }, dur: 1.6, phase: 'excentrique' },
    // Cuisse horizontale : hanche − inclinaison = 90 ; tibia incliné de 25° ; pied à plat.
    { pose: { tilt: 35, trunk: 5, hip: 125, knee: 115, ankle: 25, shoulder: 105 }, dur: 0.25, phase: 'pause' },
    { pose: {}, dur: 1.1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveau 1 : squat jusqu'à la chaise, effleurée en bas.
    {
      levels: [1],
      props: [{ kind: 'chair', at: [-62, 0], size: [43, 55] }],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }, { point: 'seat', y: 55, from: 1, to: 2 }],
    },
    // Gobelet : haltère tenu verticalement contre la poitrine.
    { variants: ['goblet'], pose: { shoulder: 30, elbow: 140 }, props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }] },
    // Barre sur le haut du dos, mains sur la barre.
    { variants: ['barbell', 'smith'], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
