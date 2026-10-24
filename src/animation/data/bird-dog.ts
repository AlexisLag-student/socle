import { defineAnimation } from '../schema';

/**
 * Bird dog — « Tendez lentement un bras devant vous et la jambe opposée derrière, à l’horizontale. Tenez quelques secondes,
 * revenez, puis changez de côté. » À quatre pattes, mains sous les épaules, genoux sous les hanches, dos dans sa position
 * naturelle, orteils repliés. Jambe proche tendue en arrière, bras éloigné tendu en avant ; le dos ne bouge pas.
 * Cuisses verticales : hanche = inclinaison ; bras verticaux : épaule = inclinaison.
 * Niveau 4 (genoux décollés de 2 cm) : montré comme le niveau 2, l'écart n'est pas lisible à cette échelle.
 */
export default defineAnimation({
  exerciseId: 'bird-dog',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'kneeF' },
  still: 1,
  keyframes: [
    { pose: { tilt: 71.7, trunk: 0, neck: -15, hip: 71.7, knee: 107, ankle: 8, shoulder: 71.7, elbow: 0, wrist: 75 }, dur: 2, phase: 'concentrique', say: 'lift' },
    // Jambe proche et bras éloigné à l'horizontale, dans le prolongement du dos.
    { pose: { hipN: -18, kneeN: 0, ankleN: -20, shoulderF: 162, wristF: 0 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeF' }, { point: 'toeF' }, { point: 'handN' }, { point: 'kneeN', from: 0, to: 0 }, { point: 'handF', from: 0, to: 0 }],
  overrides: [
    // Niveau 1 : jambe seule, les deux mains au sol.
    { levels: [1], pose: { shoulderF: 71.7, wristF: 75 }, contacts: [{ point: 'kneeF' }, { point: 'toeF' }, { point: 'handN' }, { point: 'handF' }, { point: 'kneeN', from: 0, to: 0 }] },
    // Niveau 4 : genoux décollés de 2 cm (appui mains et pointes de pieds).
    { levels: [5], variants: ['bodyweight', 'dumbbell'], props: [{ kind: 'dumbbell', attach: 'handF' }] },
    { levels: [5], variants: ['band'], props: [{ kind: 'band', from: { seg: 'handF', u: 0.4 }, to: { seg: 'footN', u: 0.5 } }] },
  ],
});
