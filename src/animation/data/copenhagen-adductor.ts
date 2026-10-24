import { defineAnimation } from '../schema';

/**
 * Copenhagen (gainage latéral adducteurs) — « Serrez la jambe du dessus contre le support pour décoller le bassin jusqu’à
 * aligner le corps. Tenez ou montez-descendez lentement selon le niveau ; la jambe du dessous peut monter rejoindre le banc. »
 * Vue de face (comme le gainage latéral), appui sur l'avant-bras proche ; jambe du dessus posée sur un banc par la cheville
 * (levier long, niveaux 3 et 4, cheville recalée sur le banc) ou par le genou (levier court, niveaux 1 et 2, jambe repliée
 * derrière). La jambe du dessous reste libre sous le banc.
 */
export default defineAnimation({
  exerciseId: 'copenhagen-adductor',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'elbowN' },
  still: 1,
  keyframes: [
    // Bassin bas (la cheville du dessus reste sur le banc).
    { pose: { tilt: 72, trunk: -5.3, hipF: 14.8, hipN: -2.7, shoulderN: 60, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
    // Corps aligné, bassin haut.
    { pose: { tilt: 80, trunk: 0, hipF: 0, hipN: 8, shoulderN: 80 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.2, phase: 'retour' },
  ],
  contacts: [{ point: 'elbowN' }],
  overrides: [
    { levels: [3, 4], props: [{ kind: 'bench', at: [-152, 0], size: [28, 33] }] },
    // Niveaux 2 et 4 : montées-descentes lentes du bassin.
    {
      levels: [2, 4],
      keyframes: [
        { pose: { tilt: 72, trunk: -5.3, hipF: 14.8, hipN: -2.7, shoulderN: 60, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { tilt: 80, trunk: 0, hipF: 0, hipN: 8, shoulderN: 80 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
    },
    // Niveau 4 : en haut, la jambe du dessous monte rejoindre le banc.
    { levels: [4], keyframes: [
      { pose: { tilt: 72, trunk: -5.3, hipF: 14.8, hipN: -2.7, shoulderN: 60, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
      { pose: { tilt: 80, trunk: 0, hipF: 0, hipN: 4, shoulderN: 80 }, dur: 0, phase: 'pause' },
      { pose: {}, dur: 3, phase: 'excentrique' },
    ] },
      // Niveaux 1 et 2 : levier court, genou du dessus posé sur le banc, jambe repliée vers l'arrière (vue en raccourci).
    {
      levels: [1, 2],
      pose: { fs_shankF: 0.15, fs_footF: 0.6 },
      props: [{ kind: 'bench', at: [-106, 0], size: [16, 40] }],
    },
    { levels: [1, 2], keyframes: [
      { pose: { tilt: 72, trunk: -10.6, hipF: 26.7, hipN: -2.7, shoulderN: 60, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
      { pose: { tilt: 80, trunk: 0, hipF: 0, hipN: 8, shoulderN: 80 }, dur: 3, phase: 'isométrique' },
      { pose: {}, dur: 1.2, phase: 'retour' },
    ] },
    { levels: [2], keyframes: [
      { pose: { tilt: 72, trunk: -10.6, hipF: 26.7, hipN: -2.7, shoulderN: 60, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
      { pose: { tilt: 80, trunk: 0, hipF: 0, hipN: 8, shoulderN: 80 }, dur: 0, phase: 'pause' },
      { pose: {}, dur: 3, phase: 'excentrique' },
    ] },
  ],
});
