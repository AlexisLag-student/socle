import { defineAnimation } from '../schema';

/**
 * Abduction de hanche isométrique, niveaux debout — « Debout de profil, genou côté mur fléchi à 90° et appuyé contre le mur :
 * poussez le genou dans le mur », bassin horizontal. Vue de face : jambe proche levée (cuisse vers l'observateur, vue en
 * raccourci), genou contre le mur ; niveau 4 en quart de squat sur la jambe d'appui. Le niveau 1 (allongé, ceinture autour
 * des cuisses) ne se dessine pas de face : il garde le schéma musculaire seul. Isométrie : la pose ne change pas.
 */
export default defineAnimation({
  exerciseId: 'hip-abduction-isometric',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    { pose: { hip: 2, shoulderF: 8, shoulderN: 2 }, dur: 1, phase: 'concentrique', say: 'lift' },
    { pose: { hipN: 6, fs_thighN: 0.12, fs_shankN: 1, fs_footN: 0.6 }, dur: 3, phase: 'isométrique', say: 'push' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'midF' }, { point: 'midN', from: 0, to: 0 }],
  props: [{ kind: 'wall', at: [37, 0] }],
  overrides: [
    // Niveau 4 : quart de squat sur la jambe d'appui (cuisse et jambe vues en léger raccourci).
    {
      levels: [4],
      keyframes: [
        { pose: { hip: 2, fs_thigh: 0.9, fs_shank: 0.97, shoulderF: 8, shoulderN: 2 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: 6, fs_thighN: 0.12, fs_shankN: 1, fs_footN: 0.6 }, dur: 3, phase: 'isométrique', say: 'push' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
    },
  ],
});
