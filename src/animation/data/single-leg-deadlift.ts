import { defineAnimation } from '../schema';

/**
 * Soulevé de terre sur une jambe — « Penchez le buste vers l’avant en tendant la jambe libre vers l’arrière, jusqu’à ce
 * que buste et jambe soient presque à l’horizontale. Revenez debout en serrant la fesse de la jambe d’appui. »
 * Jambe proche = jambe d'appui, genou légèrement fléchi (15°), pied à plat (cheville = genou − hanche + inclinaison) ;
 * jambe libre dans le prolongement du buste (hanche à 0°), dos plat, bras qui pendent sous les épaules.
 */
export default defineAnimation({
  exerciseId: 'single-leg-deadlift',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 0, hipN: 3, kneeN: 10, ankleN: 7, hipF: -8, kneeF: 30, ankleF: -10, shoulder: 4, elbow: 6 }, dur: 3, phase: 'excentrique', say: 'flatBack' },
    // Buste et jambe libre presque à l'horizontale.
    { pose: { tilt: 76, hipN: 76, kneeN: 15, ankleN: 15, hipF: 0, kneeF: 0, ankleF: -5, shoulder: 76 }, dur: 0, phase: 'pause', say: 'flatBack' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }],
  overrides: [
    // Niveau 1 : pointe du pied arrière posée au sol pour l'équilibre (pied arrière recalé), amplitude partielle.
    {
      levels: [1],
      ik: [{ limb: 'legF', pin: 'toe' }],
      keyframes: [
        { pose: { tilt: 0, hipN: 3, kneeN: 10, ankleN: 7, hipF: -18, kneeF: 10, ankleF: 0, shoulder: 4, elbow: 6 }, dur: 3, phase: 'excentrique', say: 'flatBack' },
        { pose: { tilt: 55, hipN: 58, kneeN: 18, ankleN: 15, shoulder: 55 }, dur: 0, phase: 'pause', say: 'flatBack' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF' }],
    },
    // Niveau 2 (« diver ») : bras tendus vers l'avant pendant que la jambe libre part vers l'arrière.
    { levels: [2], keyframes: [
      { pose: { tilt: 0, hipN: 3, kneeN: 10, ankleN: 7, hipF: -8, kneeF: 30, ankleF: -10, shoulder: 100, elbow: 4 }, dur: 3, phase: 'excentrique', say: 'flatBack' },
      { pose: { tilt: 76, hipN: 76, kneeN: 15, ankleN: 15, hipF: 0, kneeF: 0, ankleF: -5, shoulder: 175 }, dur: 0, phase: 'pause', say: 'flatBack' },
      { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
    ] },
    // Niveau 3 : haltère dans la main opposée à la jambe d'appui ; niveau 4 : une charge dans chaque main.
    { levels: [3], props: [{ kind: 'dumbbell', attach: 'handF' }] },
    { levels: [4], variants: ['bodyweight', 'dumbbells'], props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [4], variants: ['gym'], props: [{ kind: 'kettlebell', attach: 'handF' }] },
  ],
});
