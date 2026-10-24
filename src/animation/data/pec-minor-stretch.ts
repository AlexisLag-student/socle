import { defineAnimation } from '../schema';

/**
 * Étirement du petit pectoral (cadre de porte) — « Avancez d’un pas et tournez doucement le buste à l’opposé du bras
 * jusqu’à sentir un étirement à l’avant de l’épaule, sous la clavicule. Tenez. » Vue de face : avant-bras posé contre
 * le montant de la porte, coude à 90° à hauteur d'épaule (plus haut au niveau 2). Le pas en avant et la rotation du buste
 * ne se voient pas de face. Étirement tenu.
 */
export default defineAnimation({
  exerciseId: 'pec-minor-stretch',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 2,
  keyframes: [
    { pose: { hip: 3, shoulderF: 8, shoulderN: 6, elbowN: 10 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
    // Le coude se plie avant que le bras ne monte : l'avant-bras ne traverse pas le montant.
    { pose: { shoulderN: 40, elbowN: 110 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
    { pose: { shoulderN: 90, elbowN: 90 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    { levels: [1, 3], props: [{ kind: 'wall', at: [72, 0], size: [4.5, 190] }] },
    { levels: [2], props: [{ kind: 'wall', at: [66, 0], size: [4.5, 205] }] },
    { levels: [2], keyframes: [
      { pose: { hip: 3, shoulderF: 8, shoulderN: 6, elbowN: 10 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
      { pose: { shoulderN: 25, elbowN: 125 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
      { pose: { shoulderN: 125, elbowN: 55 }, dur: 3, phase: 'isométrique' },
      { pose: {}, dur: 1.5, phase: 'retour' },
    ], still: 2 },
  ],
});
