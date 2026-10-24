import { defineAnimation } from '../schema';

/**
 * Abduction de hanche couché sur le côté — « Montez la jambe du dessus d’environ 30 à 40°, légèrement en arrière de l’axe
 * du corps, talon en tête. Tenez une seconde puis redescendez lentement sans poser la jambe. »
 * Vue de face, couché sur le côté proche (tête à droite, inclinaison 90°), tête posée sur le bras du dessous,
 * jambe du dessous fléchie (vue en raccourci). Le mur derrière le dos et l'extension légère ne se voient pas de face.
 */
export default defineAnimation({
  exerciseId: 'side-lying-hip-abduction',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'kneeN' },
  still: 1,
  keyframes: [
    // Jambe du dessus juste au-dessus de la jambe du dessous, sans la poser.
    { pose: { tilt: 84, trunk: 0, hipN: -4.9, fs_thighN: 0.7, fs_shankN: 0.7, hipF: 9, shoulderN: 180, elbowN: 0, shoulderF: -8, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
    { pose: { hipF: 40 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeN' }, { point: 'toeN' }],
  overrides: [
    // Niveau 1 : genou du dessus fléchi à 90° (jambe vers l'arrière, vue en raccourci).
    { levels: [1], pose: { fs_shankF: 0.15, fs_footF: 0.6 } },
    // Niveau 4 : élastique autour des chevilles (ou poulie basse).
    { levels: [4], variants: ['bodyweight', 'band'], props: [{ kind: 'band', from: { seg: 'shankF', u: 0.9 }, to: { seg: 'shankN', u: 0.9 } }] },
    { levels: [4], variants: ['cable'], props: [{ kind: 'band', from: { seg: 'shankF', u: 0.9 }, to: { world: [-70, 0] } }] },
  ],
});
