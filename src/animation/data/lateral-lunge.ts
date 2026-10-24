import { defineAnimation } from '../schema';

/**
 * Fente latérale et squat cosaque — « Fléchissez une jambe en poussant les fesses vers l’arrière, l’autre jambe restant
 * tendue, jusqu’à sentir l’étirement à l’intérieur de la cuisse tendue. Repoussez pour revenir au centre. »
 * Vue de face, pieds largement écartés, pointes vers l'avant. La jambe proche fléchit (cuisse et jambe vues en raccourci,
 * genou dans l'axe du pied), la jambe éloignée reste tendue ; les deux pieds restent fixes.
 * Niveau 1 : à mi-hauteur. Niveaux 2 et 4 : cuisse parallèle au sol. Niveau 3 (cosaque) : descente profonde.
 */
export default defineAnimation({
  exerciseId: 'lateral-lunge',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 22, shoulder: 10 }, dur: 3, phase: 'excentrique' },
    { pose: { hipF: 44.8, hipN: 3.9, fs_thighN: 0.45, fs_shankN: 0.9 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    {
      levels: [1],
      keyframes: [
        { pose: { hip: 22, shoulder: 10 }, dur: 2, phase: 'excentrique' },
        { pose: { hipF: 32.4, hipN: 14.3, fs_thighN: 0.75, fs_shankN: 0.96 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
    },
    {
      levels: [3],
      keyframes: [
        { pose: { hip: 22, shoulder: 10 }, dur: 3, phase: 'excentrique' },
        { pose: { hipF: 48.8, hipN: 0, fs_thighN: 0.35, fs_shankN: 0.88 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
    },
    // Niveau 4 : haltère ou kettlebell tenu contre la poitrine.
    { levels: [4], variants: ['bodyweight', 'dumbbells'], pose: { shoulder: 10, elbow: 140, fs_forearm: 0.4 }, props: [{ kind: 'dumbbell', attach: 'handN' }] },
  ],
});
