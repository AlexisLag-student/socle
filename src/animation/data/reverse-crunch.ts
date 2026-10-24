import { defineAnimation } from '../schema';

/**
 * Relevé de bassin contrôlé (crunch inversé) — « Enroulez lentement le bassin pour décoller le bas des fesses du sol,
 * en rapprochant les genoux de la poitrine, puis redéroulez vertèbre par vertèbre. » Sur le dos, tête à gauche
 * (inclinaison −90°), bras le long du corps, haut du dos au sol. Niveau 1 : pieds au sol, simple bascule du bassin.
 * Niveau 2 : genoux au-dessus des hanches. Les niveaux 3 et 4 (en appui sur les mains, pieds sur un outil) ne sont pas
 * dessinés : ils gardent le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'reverse-crunch',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder' },
  still: 1,
  keyframes: [
    { pose: { tilt: -90, trunk: 0, neck: 10, hip: 90, knee: 95, ankle: -10, shoulder: 6, elbow: 0 }, dur: 2, phase: 'concentrique', say: 'lift' },
    // Bassin enroulé, fesses décollées, genoux vers la poitrine.
    { pose: { tilt: -118, trunk: 26, hip: 100 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'seat', from: 0, to: 0 }],
  overrides: [
    {
      levels: [1],
      anchor: { point: 'seat' },
      ik: [
        { limb: 'legN', pin: 'mid', flat: true },
        { limb: 'legF', pin: 'mid', flat: true },
      ],
      keyframes: [
        { pose: { tilt: -90, trunk: 0, neck: 10, hip: 50, knee: 100, ankle: -40, shoulder: 6, elbow: 0 }, dur: 2, phase: 'concentrique', say: 'lift' },
        // Bascule du bassin : bas du dos plaqué au sol.
        { pose: { tilt: -95, trunk: 10 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'seat' }, { point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
    },
  ],
});
