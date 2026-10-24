import { defineAnimation } from '../schema';

/**
 * Écarté d’élastique — « Écartez les bras sur les côtés jusqu’à ce que l’élastique touche la poitrine en serrant les
 * omoplates, tenez 1 seconde, puis revenez lentement. » Vue de face : au départ, bras tendus devant à hauteur d'épaules
 * (pointés vers l'observateur, vus en raccourci) ; à l'arrivée, bras ouverts sur les côtés.
 */
export default defineAnimation({
  exerciseId: 'band-pull-apart',
  view: 'face',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, shoulder: 88, elbow: 0, fs_upperArm: 0.1, fs_forearm: 0.1, fs_hand: 0.3 }, dur: 2, phase: 'concentrique', say: 'push' },
    { pose: { fs_upperArm: 1, fs_forearm: 1, fs_hand: 1 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN' }],
  overrides: [
    { variants: ['band', 'cable'], props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { seg: 'handF', u: 0.4 } }] },
    { variants: ['dumbbells'], props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
  ],
});
