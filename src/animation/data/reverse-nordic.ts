import { defineAnimation } from '../schema';

/**
 * Reverse nordic — « Penchez-vous lentement en arrière d’un bloc, des genoux à la tête, aussi loin que vous contrôlez,
 * puis revenez en contractant les cuisses. » À genoux sur un tapis, orteils repliés, hanches tendues : hanche et tronc
 * à 0°, seul le genou s'ouvre (genou = 108 − inclinaison garde le tibia au sol). Bras croisés devant la poitrine.
 * Inclinaison maximale montrée : environ 40° (borne du genou à 150°), la grande amplitude du niveau 3 va au-delà.
 */
export default defineAnimation({
  exerciseId: 'reverse-nordic',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 0, hip: 0, knee: 108, ankle: 8, shoulder: 15, elbow: 135 }, dur: 3, phase: 'excentrique', say: 'brake' },
    // Niveau 2 : environ 40°.
    { pose: { tilt: -38, knee: 146 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'kneeN' }, { point: 'kneeF' }, { point: 'toeN' }, { point: 'toeF' }],
  props: [{ kind: 'mat', at: [-25, 0], size: [45, 2] }],
  overrides: [
    // Niveau 1 : 20 à 30° seulement.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 0, hip: 0, knee: 108, ankle: 8, shoulder: 15, elbow: 135 }, dur: 3, phase: 'excentrique', say: 'brake' },
        { pose: { tilt: -25, knee: 133 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'concentrique', say: 'push' },
      ],
    },
    // Lesté : haltère tenu contre la poitrine.
    { levels: [4], variants: ['bodyweight', 'dumbbell'], pose: { shoulder: 25, elbow: 145 }, props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }] },
    // Assisté : élastique attaché devant, tenu à deux mains.
    { variants: ['band-assisted'], pose: { shoulder: 70, elbow: 10 }, props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { world: [120, 90] } }] },
  ],
});
