import { defineAnimation } from '../schema';

/**
 * Atteintes en étoile (Y-balance) — « Pliez la jambe d’appui et allez toucher légèrement le sol le plus loin possible
 * avec la pointe de l’autre pied, dans chaque direction, puis revenez au centre. » Mains sur les hanches.
 * Vue de profil : direction avant puis arrière (les directions de côté ne se voient pas).
 * Jambe proche = jambe d'appui (pied à plat : cheville = genou − hanche + inclinaison).
 */
export default defineAnimation({
  exerciseId: 'star-excursion-reach',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    // Debout sur la jambe d'appui, l'autre pied juste décollé ; mains sur les hanches.
    { pose: { hipN: 4, kneeN: 8, ankleN: 4, hipF: 10, kneeF: 25, ankleF: -10, shoulder: -25, elbow: 110 }, dur: 1.2, phase: 'excentrique' },
    // Atteinte vers l'avant : pointe du pied posée loin devant.
    { pose: { tilt: 12, hipN: 62, kneeN: 75, ankleN: 25, hipF: 44, kneeF: 0, ankleF: -15 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: { tilt: 0, hipN: 4, kneeN: 8, ankleN: 4, hipF: 10, kneeF: 25, ankleF: -10 }, dur: 1.2, phase: 'excentrique' },
    // Atteinte vers l'arrière : buste penché, jambe libre tendue derrière.
    { pose: { tilt: 38, hipN: 75, kneeN: 65, ankleN: 28, hipF: -9, kneeF: 2, ankleF: -30 }, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF', from: 1, to: 1 }, { point: 'toeF', from: 3, to: 3 }],
  overrides: [
    // Niveau 4 : haltère tenu du côté opposé à la jambe d’appui (main éloignée), l'autre main sur la hanche.
    { levels: [4], pose: { shoulderF: 4, elbowF: 6 }, props: [{ kind: 'dumbbell', attach: 'handF' }] },
  ],
});
