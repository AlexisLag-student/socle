import { defineAnimation } from '../schema';

/**
 * Marche arrière tractée — « Reculez à petits pas en posant d’abord l’avant-pied et en poussant le sol devant vous,
 * genoux toujours fléchis, à rythme régulier. » Buste légèrement penché en arrière, genoux fléchis.
 * Montrée sur place (un cycle d'animation revient à son point de départ) : un pied se lève pendant que l'autre pousse.
 * Niveaux 3 et 4 : sangle tenue à deux mains, reliée au traîneau (ou à l'élastique) devant.
 */
export default defineAnimation({
  exerciseId: 'backward-sled-drag',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    // Genoux fléchis, pieds à plat : cheville = genou − hanche + inclinaison.
    { pose: { tilt: -6, trunk: -4, hip: 25, knee: 40, ankle: 9, shoulder: 15, elbow: 30 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midF' },
    { pose: { hipN: 15, kneeN: 55, ankleN: -15 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midF' },
    { pose: { hipN: 25, kneeN: 40, ankleN: 9 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midN' },
    { pose: { hipF: 15, kneeF: 55, ankleF: -15 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midN' },
  ],
  contacts: [
    { point: 'heelF', from: 0, to: 2 },
    { point: 'toeF', from: 0, to: 2 },
    { point: 'heelN', from: 2, to: 0 },
    { point: 'toeN', from: 2, to: 0 },
  ],
  overrides: [
    {
      levels: [3, 4],
      pose: { shoulder: 55, elbow: 5 },
      props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { world: [140, 25] } }],
    },
    { levels: [3, 4], variants: ['bodyweight', 'sled'], props: [{ kind: 'box', at: [140, 0], size: [45, 30] }] },
    { levels: [3, 4], variants: ['band'], props: [{ kind: 'wall', at: [140, 0], size: [5, 110] }] },
  ],
});
