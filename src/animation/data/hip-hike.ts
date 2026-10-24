import { defineAnimation } from '../schema';

/**
 * Élévation du bassin sur une marche (hip hike) — « Laissez descendre le bassin du côté de la jambe libre de quelques
 * centimètres, genou d’appui tendu sans le verrouiller, puis remontez le bassin un peu au-dessus de l’horizontale en poussant
 * avec la hanche d’appui. » Vue de face : debout sur la jambe proche, au bord de la marche, la jambe libre dans le vide.
 * Seul le bassin bascule (inclinaison frontale) ; jambe d'appui et buste restent verticaux.
 */
export default defineAnimation({
  exerciseId: 'hip-hike',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN', y: 20 },
  still: 1,
  keyframes: [
    // Bassin un peu au-dessus de l'horizontale.
    { pose: { tilt: 6, trunk: -6, hipN: 6, hipF: -6, fs_shankF: 0.96, shoulder: 8 }, dur: 2, phase: 'excentrique' },
    // Bassin descendu du côté de la jambe libre.
    { pose: { tilt: -10, trunk: 10, hipN: -10, hipF: 10 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'midN', y: 20 }],
  overrides: [
    { levels: [2, 3, 4], props: [{ kind: 'step', at: [-9, 0], size: [32, 20] }] },
    // Niveau 1 : au sol, genou libre légèrement plié, petite amplitude.
    {
      levels: [1],
      anchor: { point: 'midN' },
      keyframes: [
        { pose: { tilt: 6, trunk: -6, hipN: 6, hipF: -6, fs_shankF: 0.9, shoulder: 8 }, dur: 2, phase: 'excentrique' },
        { pose: { tilt: 0, trunk: 0, hipN: 0, hipF: 0 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'midN' }],
    },
    { levels: [4], props: [{ kind: 'dumbbell', attach: 'handF' }] },
  ],
});
