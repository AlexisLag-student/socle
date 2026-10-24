import { defineAnimation } from '../schema';

/**
 * Leg curl glissé — « Montez le bassin en pont, puis glissez les talons vers les fesses en gardant le bassin haut.
 * Repoussez lentement les talons jusqu’à jambes presque tendues, bassin toujours décollé. » Allongé sur le dos, tête à
 * gauche (inclinaison −90°), talons sur une serviette qui glisse au sol, bras le long du corps.
 * Niveau 1 : retour seulement (on repose le bassin pour revenir). Niveaux 3 et 4 : une jambe, l'autre tendue en l'air.
 */
export default defineAnimation({
  exerciseId: 'hamstring-slider-curl',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder' },
  still: 1,
  keyframes: [
    // Talons près des fesses, bassin haut.
    { pose: { tilt: -112, neck: 15, shoulder: 6, elbow: 0, hip: 10, knee: 110, ankle: -10 }, dur: 3, phase: 'excentrique', say: 'brake' },
    // Jambes presque tendues, bassin toujours décollé.
    { pose: { tilt: -95, hip: -2, knee: 18, ankle: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'shoulder' }],
  overrides: [
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: -112, neck: 15, shoulder: 6, elbow: 0, hip: 10, knee: 110, ankle: -10 }, dur: 4, phase: 'excentrique', say: 'brake' },
        { pose: { tilt: -95, hip: -2, knee: 18, ankle: 10 }, dur: 0.5, phase: 'concentrique', say: 'return' },
        // Bassin reposé, talons ramenés pour recommencer.
        { pose: { tilt: -90, hip: -4.5, knee: 0, ankle: 10 }, dur: 0.5, phase: 'concentrique', say: 'return' },
      ],
    },
    { levels: [3, 4], side: 'unilateral', pose: { hipF: 85, kneeF: 5, ankleF: 0 } },
  ],
});
