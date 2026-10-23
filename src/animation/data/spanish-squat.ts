import { defineAnimation } from '../schema';

/**
 * Squat espagnol — « Asseyez-vous en arrière en gardant les tibias verticaux, jusqu’à environ 60 à 90° de flexion de
 * genou, et tenez la position. » Élastique épais ou sangle attaché à un poteau devant, passé derrière les deux genoux.
 * Tibias verticaux : hanche = genou + inclinaison ; pied à plat : cheville = genou − hanche + inclinaison = 0.
 */
export default defineAnimation({
  exerciseId: 'spanish-squat',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 3, hip: 6, knee: 3, ankle: 0, shoulder: 75, elbow: 5 }, dur: 2, phase: 'excentrique' },
    // Niveau 2 : environ 90°.
    { pose: { tilt: 22, trunk: 3, hip: 112, knee: 90, ankle: 0, shoulder: 85 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 2, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [
    { kind: 'wall', at: [80, 0], size: [5, 110] },
    { kind: 'band', from: { seg: 'shankN', u: 0.08, v: -1.2 }, to: { world: [80, 52] } },
  ],
  overrides: [
    // Niveau 1 : environ 45 à 60°.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 3, hip: 6, knee: 3, ankle: 0, shoulder: 75, elbow: 5 }, dur: 2, phase: 'excentrique' },
        { pose: { tilt: 16, trunk: 2, hip: 71, knee: 55, ankle: 0, shoulder: 80 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 2, phase: 'retour' },
      ],
    },
    // Niveau 3, haltère : tenu contre la poitrine.
    { levels: [3], variants: ['dumbbell'], pose: { shoulder: 30, elbow: 140 }, props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }] },
  ],
});
