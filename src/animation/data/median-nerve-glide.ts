import { defineAnimation } from '../schema';

/**
 * Glissement du nerf médian — « Quand vous tendez le coude et ramenez le poignet et les doigts vers l’arrière, penchez la
 * tête du même côté ; quand vous pliez le coude et le poignet, penchez la tête de l’autre côté. Le nerf coulisse sans être
 * étiré. » Vue de face, bras proche ; niveau 3 : bras écarté à environ 90°, paume vers le haut ; niveau 2 : bras le long
 * du corps, petite amplitude. Le niveau 1 (glissements des tendons de la main) garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'median-nerve-glide',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    // Coude et poignet pliés, tête penchée de l'autre côté.
    { pose: { hip: 3, shoulderF: 8, shoulderN: 90, elbowN: 80, wristN: 40, neck: -15 }, dur: 2, phase: 'concentrique', say: 'push' },
    // Coude tendu, poignet ramené vers l'arrière, tête penchée du même côté.
    { pose: { elbowN: 5, wristN: -50, neck: 15 }, dur: 2, phase: 'excentrique', say: 'return' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    { levels: [2], keyframes: [
      { pose: { hip: 3, shoulderF: 8, shoulderN: 20, elbowN: 50, wristN: 40, neck: -15 }, dur: 2, phase: 'concentrique', say: 'push' },
      { pose: { elbowN: 10, wristN: -50, neck: 15 }, dur: 2, phase: 'excentrique', say: 'return' },
    ], still: 1 },
  ],
});
