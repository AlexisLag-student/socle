import { defineAnimation } from '../schema';

/**
 * Poussée de traîneau — « Poussez le traîneau par des pas courts et puissants, en poussant le sol derrière vous avec
 * l’avant-pied, sans relever le buste. » Corps incliné à environ 45°, mains sur les montants (mains fixes, bras recalés).
 * Niveau 1 : mains au mur, une jambe levée genou haut, l'autre pousse le sol (maintien). Niveaux 2 à 4 : pas alternés ;
 * le cycle d'animation reste sur place : les mains restent sur les montants et les pieds repoussent le sol vers l'arrière.
 */
export default defineAnimation({
  exerciseId: 'sled-push',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  // Mains fixes sur les montants du traîneau : les pieds poussent le sol vers l'arrière, un pas après l'autre.
  anchor: { point: 'handN', x: 100, y: 101 },
  still: 1,
  keyframes: [
    // Jambe proche qui pousse (tendue, sur l'avant-pied), genou éloigné devant.
    { pose: { tilt: 48, trunk: 0, neck: -15, hipN: 0, kneeN: 5, ankleN: -15, hipF: 85, kneeF: 95, ankleF: 10, shoulder: 125, elbow: 10, wrist: 40 }, dur: 0.3, phase: 'concentrique', say: 'step' },
    { pose: { hipF: 63.4, kneeF: 86.6, ankleF: -12, hipN: 70, kneeN: 105, ankleN: 10 }, dur: 0.3, phase: 'concentrique', say: 'step' },
    { pose: { hipF: 0, kneeF: 5, ankleF: -15, hipN: 85, kneeN: 95, ankleN: 10 }, dur: 0.3, phase: 'concentrique', say: 'step' },
    { pose: { hipN: 63.4, kneeN: 86.6, ankleN: -12, hipF: 70, kneeF: 105, ankleF: 10 }, dur: 0.3, phase: 'concentrique', say: 'step' },
  ],
  contacts: [],
  overrides: [
    // Niveau 1 : mains au mur, position tenue.
    {
      levels: [1],
      side: 'unilateral',
      keyframes: [
        { pose: { tilt: 45, trunk: 0, neck: -15, hipN: 0, kneeN: 5, ankleN: -12, hipF: 30, kneeF: 40, ankleF: 0, shoulder: 125, elbow: 10, wrist: 40 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipF: 105, kneeF: 100 }, dur: 3, phase: 'isométrique', say: 'push' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      anchor: { point: 'toeN' },
      ik: [
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      contacts: [{ point: 'toeN' }],
      props: [{ kind: 'wall', at: [164.5, 0] }],
      still: 1,
    },
    { levels: [2, 3, 4], props: [{ kind: 'box', at: [104, 0], size: [44, 30] }, { kind: 'band', from: { world: [106, 30] }, to: { seg: 'handN', u: 0.4 } }] },
  ],
});
