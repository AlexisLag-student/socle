import { defineAnimation } from '../schema';

/**
 * Descente de marche contrôlée — « Pliez lentement la jambe d’appui pour venir effleurer le sol du talon de l’autre pied,
 * sans vous y poser, puis remontez. » Debout sur la marche sur la jambe proche, l'autre pied dans le vide devant ;
 * genou d'appui dans l'axe du pied, bassin horizontal. Vue de profil : la descente latérale des niveaux 1 et 2
 * est montrée comme la descente avant (pied libre devant la marche).
 */
export default defineAnimation({
  exerciseId: 'step-down',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN', y: 20 },
  still: 1,
  keyframes: [
    // Pied d'appui à plat (cheville = genou − hanche + inclinaison), jambe libre tendue devant, pointe relevée.
    { pose: { tilt: 5, hipN: 5, kneeN: 5, ankleN: 5, hipF: 40, kneeF: 10, ankleF: 10, shoulder: 30, elbow: 20 }, dur: 3, phase: 'excentrique', say: 'brake' },
    { pose: { tilt: 35, trunk: 5, hipN: 97, kneeN: 92, ankleN: 30, hipF: 67.9, kneeF: 4, shoulder: 60 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN', y: 20 }, { point: 'toeN', y: 20 }],
  overrides: [
    { levels: [2, 3, 4], props: [{ kind: 'step', at: [-49, 0], size: [58, 20] }] },
    // Niveau 1 : marche basse.
    {
      levels: [1],
      anchor: { point: 'midN', y: 12 },
      keyframes: [
        { pose: { tilt: 5, hipN: 5, kneeN: 5, ankleN: 5, hipF: 40, kneeF: 10, ankleF: 10, shoulder: 30, elbow: 20 }, dur: 3, phase: 'excentrique', say: 'brake' },
        { pose: { tilt: 30, trunk: 5, hipN: 75, kneeN: 75, ankleN: 30, hipF: 59.5, kneeF: 4, shoulder: 55 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'heelN', y: 12 }, { point: 'toeN', y: 12 }],
      props: [{ kind: 'step', at: [-45, 0], size: [58, 12] }],
    },
    { levels: [4], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
  ],
});
