import { defineAnimation } from '../schema';

/**
 * Extension de genou isométrique — « Poussez la cheville vers l’avant comme pour tendre la jambe, sans que le genou bouge,
 * et maintenez la contraction. » Assis, genou fléchi d’environ 60°, cheville bloquée (élastique tendu, appui fixe
 * ou boudin de la machine). Isométrie : la pose ne change pas. Jambe proche = jambe travaillée.
 */
export default defineAnimation({
  exerciseId: 'isometric-knee-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 54.5 },
  still: 1,
  keyframes: [
    { pose: { hip: 90, kneeN: 60, ankleN: 0, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 15, elbow: 30 }, dur: 0.8, phase: 'concentrique', say: 'push' },
    { pose: {}, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'chair', at: [-30, 0], size: [46, 41] }],
  overrides: [
    // Appui fixe ou élastique tendu devant la cheville.
    { variants: ['bodyweight', 'band'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.9, v: 1 }, to: { world: [110, 22] } }] },
    // Machine bloquée à 60° : boudin devant la cheville.
    { variants: ['machine'], props: [{ kind: 'dumbbell', attach: 'shankN', at: [0.86, 2.2] }] },
  ],
});
