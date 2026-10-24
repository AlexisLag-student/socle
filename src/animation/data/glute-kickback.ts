import { defineAnimation } from '../schema';

/**
 * Extension de hanche à quatre pattes (kickback) — « Genou fléchi à 90°, poussez le talon vers le plafond jusqu’à ce que
 * la cuisse soit dans le prolongement du dos. Tenez une seconde puis redescendez lentement. »
 * À quatre pattes, mains sous les épaules (bras recalés, mains fixes), genoux sous les hanches, dos plat, orteils repliés.
 * Jambe proche = jambe qui travaille.
 */
export default defineAnimation({
  exerciseId: 'glute-kickback',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'kneeF' },
  ik: [
    { limb: 'armN', pin: 'hand' },
    { limb: 'armF', pin: 'hand' },
  ],
  still: 1,
  keyframes: [
    // Cuisses verticales (hanche = inclinaison), tibias au sol, orteils repliés ; bras verticaux.
    { pose: { tilt: 82, trunk: 0, neck: -20, hip: 82, knee: 107, ankle: 8, shoulder: 98, elbow: 0, wrist: 75 }, dur: 1, phase: 'concentrique', say: 'lift' },
    // Cuisse dans le prolongement du dos, genou à 90°.
    { pose: { hipN: -6, kneeN: 90, ankleN: 0 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeF' }, { point: 'toeF' }, { point: 'handN' }, { point: 'handF' }, { point: 'kneeN', from: 0, to: 0 }],
  overrides: [
    { levels: [2], props: [{ kind: 'band', from: { seg: 'footN', u: 0.5, v: -1 }, to: { seg: 'handN', u: 0.3 } }] },
    // Niveau 3 : planche sur les avant-bras, montée d'une jambe tendue de quelques centimètres.
    {
      levels: [3],
      anchor: { point: 'elbowN' },
      ik: [],
      keyframes: [
        { pose: { tilt: 82.8, trunk: 0, neck: -15, hip: 0, knee: 0, ankle: 10, shoulder: 80, elbow: 90, wrist: 0 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: -12 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'excentrique' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'elbowF' }, { point: 'toeF' }, { point: 'toeN', from: 0, to: 0 }],
    },
    // Niveau 4 : debout, buste légèrement penché, sangle à la cheville sur la poulie basse devant.
    {
      levels: [4],
      anchor: { point: 'midF' },
      ik: [],
      keyframes: [
        { pose: { tilt: 20, trunk: 0, hip: 20, knee: 5, ankle: 5, hipN: 22, kneeN: 10, ankleN: -5, shoulder: 60, elbow: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: -22, kneeN: 5 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'heelF' }, { point: 'toeF' }],
      props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [90, 6] } }],
    },
  ],
});
