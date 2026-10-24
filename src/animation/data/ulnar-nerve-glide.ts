import { defineAnimation } from '../schema';

/**
 * Glissement du nerf ulnaire — « Pliez le coude et ramenez la paume vers l’oreille (doigts vers l’arrière) en penchant la
 * tête de l’autre côté, puis tendez le coude en ramenant la tête au centre. Le nerf coulisse sans être étiré. »
 * Vue de face, bras proche écarté (à 90° au niveau 3, moins au niveau 2), paume vers le sol au départ.
 * Le niveau 1 (doigts et poignet, coude le long du corps) garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'ulnar-nerve-glide',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, shoulderF: 8, shoulderN: 90, elbowN: 5, wristN: 0, neck: 0 }, dur: 2, phase: 'concentrique', say: 'push' },
    // Paume vers l'oreille (« masque »), tête penchée de l'autre côté.
    { pose: { elbowN: 135, wristN: -50, neck: -15 }, dur: 2, phase: 'excentrique', say: 'return' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    { levels: [2], keyframes: [
      { pose: { hip: 3, shoulderF: 8, shoulderN: 50, elbowN: 5, wristN: 0, neck: 0 }, dur: 2, phase: 'concentrique', say: 'push' },
      { pose: { elbowN: 70, wristN: -50, neck: -15 }, dur: 2, phase: 'excentrique', say: 'return' },
    ], still: 1 },
  ],
});
