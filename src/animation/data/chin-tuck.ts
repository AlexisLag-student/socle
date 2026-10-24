import { defineAnimation } from '../schema';

/**
 * Rentré de menton — « Faites un petit « oui » de la tête : le menton recule et descend légèrement, l’arrière du cou
 * s’allonge. Tenez la position, puis relâchez doucement. » Niveau 1 : debout, dos et arrière de la tête près du mur.
 * Le rentré de menton = cou légèrement redressé et tête légèrement fléchie (la tête recule sans se pencher).
 * Niveaux 2 à 4 : allongé sur le dos (niveau 3 : tête décollée d'environ 2 cm ; niveau 4 : relevés jusqu'à regarder les pieds).
 */
export default defineAnimation({
  exerciseId: 'chin-tuck',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    // Tête un peu avancée au départ.
    { pose: { hip: 2, knee: 3, ankle: 1, neck: 16, head: -14, shoulder: 4, elbow: 8 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: { neck: -6, head: 14 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    { levels: [1], props: [{ kind: 'wall', at: [-21, 0], flip: true }] },
    // Niveau 2 : allongé sur le dos, petit hochement « oui », la tête reste posée.
    {
      levels: [2, 3],
      anchor: { point: 'shoulder' },
      keyframes: [
        { pose: { tilt: -90, neck: 0, head: -8, hip: 50, knee: 100, ankle: -40, shoulder: 6, elbow: 0 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { head: 12 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      ik: [
        { limb: 'legN', pin: 'mid', flat: true },
        { limb: 'legF', pin: 'mid', flat: true },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'toeN' }],
    },
    // Niveau 3 : menton rentré, tête décollée d'environ 2 cm.
    { levels: [3], keyframes: [
      { pose: { tilt: -90, neck: 0, head: -8, hip: 50, knee: 100, ankle: -40, shoulder: 6, elbow: 0 }, dur: 1, phase: 'concentrique', say: 'push' },
      { pose: { neck: 8, head: 12 }, dur: 3, phase: 'isométrique' },
      { pose: {}, dur: 1, phase: 'retour' },
    ] },
    // Niveau 4 : relevés de tête lents, menton rentré, jusqu'à regarder les pieds.
    { levels: [4], anchor: { point: 'shoulder' }, ik: [
      { limb: 'legN', pin: 'mid', flat: true },
      { limb: 'legF', pin: 'mid', flat: true },
    ], contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'toeN' }], keyframes: [
      { pose: { tilt: -90, neck: 0, head: 10, hip: 50, knee: 100, ankle: -40, shoulder: 6, elbow: 0 }, dur: 2, phase: 'concentrique', say: 'lift' },
      { pose: { neck: 40, head: 15 }, dur: 1, phase: 'pause' },
      { pose: {}, dur: 3, phase: 'excentrique' },
    ] },
  ],
});
