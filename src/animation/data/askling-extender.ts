import { defineAnimation } from '../schema';

/**
 * Extender (protocole d’Askling) — « Tendez le genou aussi loin que possible juste avant la gêne, sans lâcher la cuisse,
 * puis repliez-le. » Allongé sur le dos, tête à gauche (inclinaison −90°), cuisse travaillée tenue à deux mains, hanche
 * fléchie à environ 90° ; l'autre jambe tendue au sol. Jambe proche = jambe travaillée. Niveau 1 : amplitude partielle.
 */
export default defineAnimation({
  exerciseId: 'askling-extender',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'shoulder' },
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 15, hipN: 90, kneeN: 95, ankleN: -10, hipF: -4.5, kneeF: 0, ankleF: 10, shoulder: 70, elbow: 70 }, dur: 2, phase: 'concentrique', say: 'push' },
    // Niveaux 2 et 3 : jusqu'à l'amplitude maximale confortable (genou presque tendu).
    { pose: { kneeN: 15, ankleN: 0 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelF' }],
  overrides: [
    { levels: [1], keyframes: [
      { pose: { tilt: -90, neck: 15, hipN: 90, kneeN: 95, ankleN: -10, hipF: -4.5, kneeF: 0, ankleF: 10, shoulder: 70, elbow: 70 }, dur: 2, phase: 'concentrique', say: 'push' },
      { pose: { kneeN: 45, ankleN: 0 }, dur: 0, phase: 'pause' },
      { pose: {}, dur: 2, phase: 'excentrique' },
    ] },
  ],
});
