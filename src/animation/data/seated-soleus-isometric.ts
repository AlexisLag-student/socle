import { defineAnimation } from '../schema';

/**
 * Isométrie du soléaire assis — « Poussez l’avant-pied dans le sol comme pour monter le talon, contre le blocage,
 * et maintenez la poussée sans bouger. » Assis, genou à 90°, avant-pied sur un livre épais (cale),
 * haut de la cuisse calé sous une table (banc haut). Isométrie : la pose ne change pas, seuls les muscles s'activent.
 * Jambe proche = jambe travaillée ; l'autre pied reste à plat au sol.
 */
export default defineAnimation({
  exerciseId: 'seated-soleus-isometric',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 54.5 },
  still: 1,
  keyframes: [
    // Avant-pied proche sur le livre (pied relevé), pied éloigné à plat ; avant-bras posés sur la table.
    { pose: { hip: 90, knee: 90, ankleN: 18, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 53, elbow: 37 }, dur: 0.8, phase: 'concentrique', say: 'push' },
    { pose: {}, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'toeN', y: 8 }, { point: 'heelN' }, { point: 'heelF' }, { point: 'toeF' }],
  props: [{ kind: 'chair', at: [-30, 0], size: [46, 41] }],
  overrides: [
    {
      levels: [1, 2],
      props: [
        { kind: 'pad', at: [64, 0], size: [18, 8] },
        // Table : plateau juste au-dessus de la cuisse.
        { kind: 'bench', at: [24, 0], size: [70, 72] },
      ],
    },
    // Niveaux 3 et 4 : charge sur les cuisses (machine à mollets assis, barre guidée ou haltères), talons à mi-hauteur,
    // avant-pieds sur une cale. Niveau 3 : deux jambes.
    {
      levels: [3, 4],
      keyframes: [
        { pose: { hip: 90, knee: 90, ankleN: -20, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 20, elbow: 75 }, dur: 0.8, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      // Avant-pied sur la cale : la jambe est recalée sur la pointe du pied, le genou monte avec le talon.
      ik: [{ limb: 'legN', pin: 'toe', y: 8 }],
      contacts: [{ point: 'toeN', y: 8 }, { point: 'heelF' }, { point: 'toeF' }],
      props: [{ kind: 'pad', at: [60, 0], size: [18, 8] }],
    },
    {
      levels: [3],
      side: 'bilateral',
      pose: { hipF: 90, kneeF: 90, ankleF: -20 },
      ik: [
        { limb: 'legN', pin: 'toe', y: 8 },
        { limb: 'legF', pin: 'toe', y: 8 },
      ],
      contacts: [{ point: 'toeN', y: 8 }, { point: 'toeF', y: 8 }],
    },
    // Charge sur les genoux (haltères ; machine et barre guidée représentées de la même façon).
    { levels: [3, 4], props: [{ kind: 'dumbbell', attach: 'thighN', at: [0.86, 1.9] }] },
  ],
});
