import { defineAnimation } from '../schema';

/**
 * Extension de genou — « Tendez la jambe jusqu’à l’horizontale, marquez un temps d’arrêt, puis redescendez lentement. »
 * Assis, dos contre le dossier, genoux au bord du siège ; seul le genou bouge. Jambe proche = jambe travaillée.
 * Niveau 1 : de 90° à environ 45° de flexion, sur une chaise.
 */
export default defineAnimation({
  exerciseId: 'leg-extension',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 54.5 },
  still: 1,
  keyframes: [
    { pose: { hip: 90, knee: 90, ankle: 0, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 15, elbow: 30 }, dur: 2, phase: 'concentrique', say: 'push' },
    { pose: { kneeN: 45, ankleN: 5 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelF' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }],
  props: [{ kind: 'chair', at: [-30, 0], size: [46, 41] }],
  overrides: [
    // Niveaux 2 à 4 : extension complète.
    {
      levels: [2, 3, 4],
      keyframes: [
        { pose: { hip: 90, knee: 90, ankle: 0, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 15, elbow: 30 }, dur: 2, phase: 'concentrique', say: 'push' },
        { pose: { kneeN: 2, ankleN: 8 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
    },
    // Niveaux 3 et 4 : machine (deux jambes ou une jambe) ; boudin juste au-dessus de la cheville.
    { levels: [3, 4], variants: ['bodyweight', 'machine'], props: [{ kind: 'dumbbell', attach: 'shankN', at: [0.86, 2.2] }] },
    { levels: [2], variants: ['machine'], props: [{ kind: 'dumbbell', attach: 'shankN', at: [0.86, 2.2] }] },
    // Élastique : attaché au pied de la chaise, derrière la cheville.
    { levels: [2, 3, 4], variants: ['band'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.9, v: -1 }, to: { world: [10, 2] } }] },
  ],
});
