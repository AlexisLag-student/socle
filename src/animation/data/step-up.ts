import { defineAnimation } from '../schema';

/**
 * Montée sur marche — « Montez en poussant uniquement avec la jambe posée sur la marche, sans prendre d’élan avec
 * la jambe du bas. Redescendez lentement, en contrôlant. » Genou dans l’axe du pied, buste peu penché,
 * hanche complètement tendue en haut. Jambe proche = jambe sur la marche (appui fixe) ; le pied du bas reste
 * détendu et ne repousse pas le sol. Pieds à plat : cheville = genou − hanche + inclinaison.
 */
export default defineAnimation({
  exerciseId: 'step-up',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN', y: 18 },
  still: 1,
  keyframes: [
    { pose: { tilt: 12, hipN: 63, kneeN: 69, ankleN: 18, hipF: 6, kneeF: 4, ankleF: 10 }, dur: 1, phase: 'concentrique', say: 'rise' },
    { pose: { tilt: 0, hipN: 0, kneeN: 3, ankleN: 3, hipF: -8, kneeF: 70, ankleF: -20 }, dur: 0.2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN', y: 18 }, { point: 'toeN', y: 18 }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
  props: [{ kind: 'step', at: [-17, 0], size: [44, 18] }],
  overrides: [
    // Banc ou box d’environ 40 cm : cuisse proche de l’horizontale au départ.
    {
      levels: [2, 3, 4],
      anchor: { point: 'midN', y: 40 },
      keyframes: [
        { pose: { tilt: 18, hipN: 100, kneeN: 100, ankleN: 18, hipF: 18, kneeF: 4, ankleF: 4 }, dur: 1, phase: 'concentrique', say: 'rise' },
        { pose: { tilt: 0, hipN: 0, kneeN: 3, ankleN: 3, hipF: -8, kneeF: 70, ankleF: -20 }, dur: 0.2, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'heelN', y: 40 }, { point: 'toeN', y: 40 }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
      props: [{ kind: 'box', at: [-15, 0], size: [50, 40] }],
    },
    { levels: [3, 4], variants: ['dumbbells'], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [4], variants: ['barbell'], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
