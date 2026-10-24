import { defineAnimation } from '../schema';

/**
 * Coquillage (clamshell) — « Gardez les pieds collés et ouvrez le genou du dessus comme une coquille, sans faire rouler
 * le bassin. Tenez une seconde puis refermez lentement. » Vue de face, couché sur le côté proche, tête sur le bras,
 * hanches fléchies à 45° et genoux à 90° : cuisses et jambes vont vers l'observateur puis vers l'arrière (raccourci 0,7).
 * L'ouverture fait tourner la cuisse du dessus autour de l'axe hanche-pied : vue de face, la cuisse monte et la jambe
 * redescend vers le pied resté collé (genou vu en projection).
 */
export default defineAnimation({
  exerciseId: 'clamshell',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  projectedKnee: true,
  anchor: { point: 'kneeN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 84, trunk: 0, hipN: -4.9, hipF: 9, fs_thigh: 0.7, fs_shank: 0.7, kneeF: 0, shoulderN: 180, elbowN: 0, shoulderF: -8, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
    // Ouverture d'environ 40° : cuisse projetée à +33°, jambe projetée à −33° (genou à 66° en projection).
    { pose: { hipF: 42, fs_thighF: 0.84, fs_shankF: 0.84, kneeF: 66 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'kneeN' }],
  overrides: [
    // Niveaux 2 et 4 : mini-bande au-dessus des genoux.
    { levels: [2], props: [{ kind: 'band', from: { seg: 'thighF', u: 0.85 }, to: { seg: 'thighN', u: 0.85 } }] },
    { levels: [4], variants: ['band'], props: [{ kind: 'band', from: { seg: 'thighF', u: 0.85 }, to: { seg: 'thighN', u: 0.85 } }] },
    // Niveau 4 : en gainage latéral sur l'avant-bras et le genou du dessous, bassin décollé.
    {
      levels: [4],
      anchor: { point: 'elbowN' },
      keyframes: [
        { pose: { tilt: 64, trunk: 0, hipN: 0, hipF: 0, fs_thighN: 1, fs_shankN: 0.18, fs_footN: 0.6, fs_thighF: 0.7, fs_shankF: 0.7, kneeF: 0, shoulderN: 64, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipF: 33, fs_thighF: 0.84, fs_shankF: 0.84, kneeF: 66 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'kneeN' }],
    },
  ],
});
