import { defineAnimation } from '../schema';

/**
 * Gainage latéral — « Décollez le bassin pour aligner tête, bassin et pieds (ou genoux), puis tenez. »
 * Vue de face, couché sur le côté proche : avant-bras au sol, coude sous l’épaule (bras vertical),
 * l’avant-bras pointe vers l'observateur (raccourci). Tronc ni creusé ni arrondi (flexion latérale nulle).
 * Inclinaison 70° : le corps forme une ligne droite des pieds à la tête.
 */
export default defineAnimation({
  exerciseId: 'side-plank',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'elbowN' },
  still: 2,
  keyframes: [
    // Couché sur le côté : jambes au sol, bassin posé, buste relevé par l'avant-bras (flexion latérale).
    { pose: { tilt: 70, trunk: -40, hipN: -20, hipF: 20, shoulderN: 30, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1.2, phase: 'concentrique', say: 'lift' },
    // Bassin décollé : tête, bassin et pieds alignés ; bras vertical sous l'épaule.
    { pose: { tilt: 73, trunk: 0, hipN: 0, hipF: 0, shoulderN: 73 }, dur: 0.01, phase: 'isométrique' },
    { pose: {}, dur: 2.5, phase: 'isométrique' },
    { pose: {}, dur: 1.2, phase: 'retour' },
  ],
  contacts: [{ point: 'elbowN' }, { point: 'toeN', from: 1, to: 3 }],
  overrides: [
    // Niveau 1 : sur les genoux, fléchis à 90° (jambes vers l'arrière, vues en raccourci).
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 70, trunk: -40, hipN: -20, hipF: 20, fs_shank: 0.18, fs_foot: 0.6, shoulderN: 30, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1.2, phase: 'concentrique', say: 'lift' },
        { pose: { tilt: 64, trunk: 0, hipN: 0, hipF: 0, shoulderN: 64 }, dur: 0.01, phase: 'isométrique' },
        { pose: {}, dur: 2.5, phase: 'isométrique' },
        { pose: {}, dur: 1.2, phase: 'retour' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'kneeN', from: 1, to: 3 }],
      still: 2,
    },
    // Niveau 3 : jambe du dessus levée d’environ 30 cm pendant le maintien.
    {
      levels: [3],
      keyframes: [
        { pose: { tilt: 70, trunk: -40, hipN: -20, hipF: 20, shoulderN: 30, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1.2, phase: 'concentrique', say: 'lift' },
        { pose: { tilt: 73, trunk: 0, hipN: 0, hipF: 0, shoulderN: 73 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
        { pose: { hipF: 18 }, dur: 2.5, phase: 'isométrique' },
        { pose: {}, dur: 0.8, phase: 'retour' },
        { pose: { hipF: 0 }, dur: 1.2, phase: 'retour' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'toeN', from: 1, to: 4 }],
      still: 2,
    },
    // Niveau 4 : bassin tenu, le bras du dessus passe sous le buste puis s'ouvre vers le plafond.
    {
      levels: [4],
      keyframes: [
        { pose: { tilt: 73, shoulderN: 73, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 110, elbowF: 0 }, dur: 2, phase: 'excentrique', say: 'lower' },
        { pose: { shoulderF: -15, elbowF: 20 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'concentrique', say: 'lift' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'toeN' }],
      still: 0,
    },
  ],
});
