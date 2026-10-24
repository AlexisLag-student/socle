import { defineAnimation } from '../schema';

/**
 * Rotation externe de hanche assis contre élastique — « Sans bouger la cuisse ni le genou, amenez le pied vers l’intérieur
 * (vers l’autre jambe) : la cuisse tourne sur elle-même. Revenez lentement. » Vue de face, assis au bord d'un banc haut,
 * cuisses horizontales (vers l'observateur, vues en raccourci), genoux à 90° : la jambe pivote sous le genou.
 * Élastique attaché à la cheville, fixé du côté extérieur. Jambe proche = jambe travaillée.
 */
export default defineAnimation({
  exerciseId: 'seated-hip-external-rotation',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  projectedKnee: true,
  anchor: { point: 'seat', y: 60 },
  still: 1,
  keyframes: [
    { pose: { hip: 3, fs_thigh: 0.12, fs_shank: 1, fs_foot: 0.6, shoulder: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
    // Pied ramené vers l'autre jambe : la jambe pivote sous le genou.
    { pose: { kneeN: 22 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [],
  // Banc vu de face (bloc derrière les jambes).
  props: [{ kind: 'pad', at: [-40, 0], size: [80, 48] }],
  overrides: [
    { variants: ['band', 'cable'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [60, 8] } }] },
    // Niveau 1 : isométrie, le pied pousse vers l'intérieur contre la main, sans bouger.
    {
      levels: [1],
      keyframes: [
        { pose: { hip: 3, fs_thigh: 0.12, fs_shank: 1, fs_foot: 0.6, shoulder: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
    },
  ],
});
