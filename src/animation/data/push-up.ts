import { defineAnimation } from '../schema';

/**
 * Pompes — « Descendez la poitrine vers le sol en gardant les coudes à environ 45° du corps, puis poussez pour remonter
 * jusqu’aux bras tendus. » Corps aligné de la tête aux talons (ou aux genoux), abdominaux serrés ; mains fixes (bras
 * recalés), le corps pivote autour des pointes de pied. Niveau 1 : mains sur une table. Niveau 2 : sur les genoux.
 * Niveau 4 : pieds surélevés sur un banc. Niveau 5 : élastique tendu dans le dos, tenu sous les mains.
 */
export default defineAnimation({
  exerciseId: 'push-up',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  ik: [
    { limb: 'armN', pin: 'hand' },
    { limb: 'armF', pin: 'hand' },
  ],
  still: 1,
  keyframes: [
    // Bras tendus sous les épaules.
    { pose: { tilt: 71.2, trunk: 0, neck: -10, hip: 0, knee: 0, ankle: 15, shoulder: 71.2, elbow: 0, wrist: 80 }, dur: 2, phase: 'excentrique' },
    // Poitrine près du sol.
    { pose: { tilt: 86 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'handN' }, { point: 'handF' }],
  overrides: [
    // Niveau 1 : mains sur une table (pompes inclinées).
    {
      levels: [1],
      ik: [
        { limb: 'armN', pin: 'hand', y: 75 },
        { limb: 'armF', pin: 'hand', y: 75 },
      ],
      keyframes: [
        { pose: { tilt: 37.4, trunk: 0, neck: -10, hip: 0, knee: 0, ankle: 15, shoulder: 75, elbow: 0, wrist: 80 }, dur: 2, phase: 'excentrique' },
        { pose: { tilt: 47 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'handN', y: 75 }, { point: 'handF', y: 75 }],
      props: [{ kind: 'bench', at: [98, 0], size: [50, 73.5] }],
    },
    // Niveau 2 : sur les genoux.
    {
      levels: [2],
      anchor: { point: 'kneeN' },
      keyframes: [
        { pose: { tilt: 47.3, trunk: 0, neck: -10, hip: 0, knee: 100, ankle: 8, shoulder: 47.3, elbow: 0, wrist: 80 }, dur: 2, phase: 'excentrique' },
        { pose: { tilt: 61 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'kneeN' }, { point: 'kneeF' }, { point: 'handN' }, { point: 'handF' }],
    },
    // Niveau 4 : pieds surélevés sur un banc.
    {
      levels: [4],
      anchor: { point: 'toeN', y: 45 },
      keyframes: [
        { pose: { tilt: 90.5, trunk: 0, neck: -10, hip: 0, knee: 0, ankle: 15, shoulder: 90.5, elbow: 0, wrist: 80 }, dur: 2, phase: 'excentrique' },
        { pose: { tilt: 103 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'toeN', y: 45 }, { point: 'toeF', y: 45 }, { point: 'handN' }, { point: 'handF' }],
      props: [{ kind: 'bench', at: [-40, 0], size: [48, 45] }],
    },
    { levels: [5], props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { seg: 'trunk', u: 0.75, v: 1.1 } }] },
  ],
});
