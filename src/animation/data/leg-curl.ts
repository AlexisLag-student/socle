import { defineAnimation } from '../schema';

/**
 * Leg curl — « Fléchissez le genou en ramenant le talon vers la fesse, puis revenez lentement, sans laisser la charge
 * retomber. » Allongé sur le ventre, tête à droite (inclinaison 90°), front posé sur les mains ; hanche tendue.
 * Machine : leg curl assis (version préférée au niveau 4), boudin derrière la cheville.
 */
export default defineAnimation({
  exerciseId: 'leg-curl',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeF' },
  still: 1,
  keyframes: [
    { pose: { tilt: 86, trunk: 0, neck: -10, hip: -4, knee: 0, ankle: -30, shoulder: 165, elbow: 140 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: { knee: 115 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeF' }, { point: 'kneeN' }],
  overrides: [
    // Niveaux 2 et 3 : une jambe (niveau 2 : les deux montent, une seule redescend ; montré sur une jambe).
    { levels: [2, 3], side: 'unilateral', pose: { kneeF: 0 }, contacts: [{ point: 'kneeF' }, { point: 'kneeN', from: 0, to: 0 }] },
    { variants: ['band'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [-110, 2] } }] },
    // Machine : assis, cuisse sur le siège, la jambe passe de tendue devant à fléchie sous le siège.
    {
      variants: ['machine'],
      anchor: { point: 'seat', y: 54.5 },
      keyframes: [
        { pose: { tilt: -5, trunk: 0, neck: 0, hip: 95, knee: 10, ankle: 0, shoulder: 20, elbow: 40 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { knee: 115 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
      contacts: [],
      props: [
        { kind: 'bench', at: [-35, 0], size: [62, 41] },
        { kind: 'dumbbell', attach: 'shankN', at: [0.86, -2.2] },
      ],
    },
  ],
});
