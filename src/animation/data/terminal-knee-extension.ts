import { defineAnimation } from '../schema';

/**
 * Extension terminale du genou — « Tendez complètement le genou contre la résistance de l’élastique, tenez 2 secondes
 * en contractant la cuisse, puis relâchez lentement. » Élastique attaché bas devant, passé derrière le genou.
 * Jambe proche = jambe travaillée, pied à plat (cheville = genou − hanche + inclinaison).
 * Niveau 1 : assis jambes tendues, serviette roulée sous le genou, on écrase la serviette.
 */
export default defineAnimation({
  exerciseId: 'terminal-knee-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  // Pied arrière recalé sur sa pointe.
  ik: [{ limb: 'legF', pin: 'toe' }],
  still: 2,
  keyframes: [
    { pose: { tilt: 0, hip: 2, knee: 2, ankle: 0, hipF: -12, kneeF: 15, ankleF: 3, shoulder: 4, elbow: 8 }, dur: 2, phase: 'excentrique' },
    { pose: { tilt: 4, hipN: 18, kneeN: 28, ankleN: 14 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF' }],
  overrides: [
    { levels: [2, 3, 4], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.06, v: -1.2 }, to: { world: [110, 10] } }] },
    // Niveau 4 : sur la seule jambe travaillée.
    { levels: [4], ik: [], pose: { hipF: 15, kneeF: 70, ankleF: -10 }, contacts: [{ point: 'heelN' }, { point: 'toeN' }] },
    // Niveau 1 : assis jambes tendues, serviette roulée sous le genou.
    {
      levels: [1],
      anchor: { point: 'seat', y: 11.3 },
      ik: [],
      keyframes: [
        { pose: { tilt: 0, trunk: -8, hip: 90, knee: 8, ankle: 0, shoulder: -20, elbow: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { kneeN: 0, ankleN: 5 }, dur: 5, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'excentrique' },
      ],
      contacts: [],
      props: [{ kind: 'pad', at: [36, 0], size: [16, 7] }],
    },
  ],
});
