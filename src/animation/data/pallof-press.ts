import { defineAnimation } from '../schema';

/**
 * Pallof press (anti-rotation) — « Poussez les mains droit devant vous jusqu’à tendre les bras sans laisser le tronc tourner
 * vers l’ancrage, tenez 2 secondes, puis ramenez. » Debout, pieds largeur de hanches, mains jointes contre le sternum.
 * Vue de profil : l'élastique, fixé sur le côté (dans la profondeur), et la rotation que l'on refuse ne se voient pas ;
 * l'animation montre la poussée des bras, buste immobile. Niveau 3 : demi-agenouillé. Niveau 4 : poussée puis bras au-dessus
 * de la tête. Niveaux 1 et 5 : bras tendus tenus.
 */
export default defineAnimation({
  exerciseId: 'pallof-press',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { hip: 5, knee: 8, ankle: 3, shoulder: 15, elbow: 130 }, dur: 2, phase: 'concentrique', say: 'push' },
    { pose: { shoulder: 85, elbow: 3 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveaux 1 et 5 : maintien bras tendus.
    {
      levels: [1, 5],
      keyframes: [
        { pose: { hip: 5, knee: 8, ankle: 3, shoulder: 15, elbow: 130 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { shoulder: 85, elbow: 3 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
    },
    // Niveau 3 : demi-agenouillé, genou éloigné au sol, pied proche devant.
    {
      levels: [3],
      anchor: { point: 'kneeF', y: 2 },
      ik: [{ limb: 'legN', pin: 'mid', flat: true }],
      keyframes: [
        { pose: { tilt: 0, hipN: 90, kneeN: 90, ankleN: 0, hipF: 0, kneeF: 104.6, ankleF: 8, shoulder: 15, elbow: 130 }, dur: 2, phase: 'concentrique', say: 'push' },
        { pose: { shoulder: 85, elbow: 3 }, dur: 2, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'kneeF', y: 2 }, { point: 'toeF' }, { point: 'heelN' }, { point: 'toeN' }],
      props: [{ kind: 'mat', at: [-15, 0], size: [30, 2] }],
    },
    // Niveau 4 : mains poussées devant, puis montées au-dessus de la tête sans creuser le dos.
    {
      levels: [4],
      keyframes: [
        { pose: { hip: 5, knee: 8, ankle: 3, shoulder: 15, elbow: 130 }, dur: 2, phase: 'concentrique', say: 'push' },
        { pose: { shoulder: 85, elbow: 3 }, dur: 2, phase: 'concentrique', say: 'lift' },
        { pose: { shoulder: 170 }, dur: 1, phase: 'pause' },
        { pose: { shoulder: 85 }, dur: 2, phase: 'excentrique' },
      ],
    },
  ],
});
