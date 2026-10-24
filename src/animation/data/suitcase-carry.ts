import { defineAnimation } from '../schema';

/**
 * Marche avec charge d’un côté (suitcase carry) — « Marchez à pas normaux pendant la durée indiquée en restant parfaitement
 * droit, posez la charge, changez de main et repartez. » Vue de face (épaules de niveau, buste vertical malgré la charge),
 * charge dans la main proche, bras le long du corps. Montrée en marche sur place (un cycle d'animation revient à son point
 * de départ) : genou qui avance = cuisse vue en raccourci. Niveau 4 : arrêt de 2 secondes sur une jambe, genou levé.
 */
export default defineAnimation({
  exerciseId: 'suitcase-carry',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, shoulderN: 3, shoulderF: 8 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midF' },
    { pose: { fs_thighN: 0.6, fs_footN: 0.8 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midF' },
    { pose: { fs_thighN: 1, fs_footN: 1 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midN' },
    { pose: { fs_thighF: 0.6, fs_footF: 0.8 }, dur: 0.4, phase: 'concentrique', say: 'step', anchor: 'midN' },
  ],
  contacts: [
    { point: 'midF', from: 0, to: 2 },
    { point: 'midN', from: 2, to: 0 },
  ],
  props: [{ kind: 'dumbbell', attach: 'handN', axis: 'vertical' }],
  overrides: [
    {
      levels: [4],
      keyframes: [
        { pose: { hip: 3, shoulderN: 3, shoulderF: 8 }, dur: 0.6, phase: 'concentrique', say: 'step', anchor: 'midF' },
        // Arrêt sur une jambe, genou opposé levé.
        { pose: { fs_thighN: 0.15, fs_footN: 0.6 }, dur: 2, phase: 'concentrique', say: 'hold', anchor: 'midF' },
        { pose: { fs_thighN: 1, fs_footN: 1 }, dur: 0.6, phase: 'concentrique', say: 'step', anchor: 'midN' },
        { pose: { fs_thighF: 0.6, fs_footF: 0.8 }, dur: 0.6, phase: 'concentrique', say: 'step', anchor: 'midN' },
      ],
    },
  ],
});
