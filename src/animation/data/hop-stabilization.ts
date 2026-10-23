import { defineAnimation } from '../schema';

/**
 * Saut sur une jambe et réception stabilisée — « Sautez, réceptionnez-vous en souplesse sur la même jambe et figez
 * la position 3 secondes avant le saut suivant. » Genou d'appui au-dessus du pied, hanche et genou fléchis à la réception.
 * Saut vertical : la direction des niveaux 3 à 5 (avant, côté, diagonale) n'est pas montrée.
 * Jambe proche = jambe d'appui ; appui = pointe du pied, envol = décalage vertical de la racine.
 */
export default defineAnimation({
  exerciseId: 'hop-stabilization',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'toeN' },
  still: 5,
  keyframes: [
    { pose: { hipN: 6, kneeN: 10, ankleN: 4, hipF: 12, kneeF: 75, ankleF: -20, shoulder: 10, elbow: 20 }, dur: 0.4, phase: 'excentrique' },
    // Prise d'élan : quart de squat sur une jambe, pied à plat.
    { pose: { tilt: 22, hipN: 45, kneeN: 45, ankleN: 22, shoulder: -30 }, dur: 0.25, phase: 'concentrique', say: 'jump' },
    { pose: { tilt: 5, hipN: 6, kneeN: 3, ankleN: -35, shoulder: 60 }, dur: 0.22, phase: 'retour', ease: 'easeIn', say: 'land' },
    { pose: { y: 14, ankleN: -28, kneeN: 6 }, dur: 0.22, phase: 'retour', ease: 'easeOut', say: 'land' },
    // Réception sur l'avant-pied, puis pied entier, genou et hanche fléchis.
    { pose: { y: 0, tilt: 8, hipN: 14, kneeN: 14, ankleN: -30, shoulder: 30 }, dur: 0.18, phase: 'retour', say: 'land' },
    { pose: { tilt: 22, hipN: 42, kneeN: 42, ankleN: 22, shoulder: 20 }, dur: 3, phase: 'isométrique', say: 'hold' },
    { pose: {}, dur: 0.8, phase: 'retour' },
  ],
  contacts: [
    { point: 'toeN', from: 4, to: 2 },
    { point: 'heelN', from: 5, to: 1 },
  ],
  overrides: [
    // Niveau 1 : élan sur deux pieds, réception sur une jambe.
    {
      levels: [1],
      keyframes: [
        { pose: { hip: 3, knee: 5, ankle: 2, shoulder: 10, elbow: 20 }, dur: 0.4, phase: 'excentrique' },
        { pose: { tilt: 22, hip: 45, knee: 45, ankle: 22, shoulder: -30 }, dur: 0.25, phase: 'concentrique', say: 'jump' },
        { pose: { tilt: 5, hip: 6, knee: 3, ankle: -35, shoulder: 60 }, dur: 0.22, phase: 'retour', ease: 'easeIn', say: 'land' },
        { pose: { y: 10, ankleN: -28, kneeN: 6, hipF: 12, kneeF: 75, ankleF: -20 }, dur: 0.22, phase: 'retour', ease: 'easeOut', say: 'land' },
        { pose: { y: 0, tilt: 8, hipN: 14, kneeN: 14, ankleN: -30, shoulder: 30 }, dur: 0.18, phase: 'retour', say: 'land' },
        { pose: { tilt: 22, hipN: 42, kneeN: 42, ankleN: 22, shoulder: 20 }, dur: 3, phase: 'isométrique', say: 'hold' },
        { pose: { tilt: 0, hip: 3, knee: 5, ankle: 2, shoulder: 10 }, dur: 0.8, phase: 'retour' },
      ],
      contacts: [
        { point: 'toeN', from: 4, to: 2 },
        { point: 'heelN', from: 5, to: 1 },
        { point: 'toeF', from: 6, to: 2 },
        { point: 'heelF', from: 6, to: 1 },
      ],
    },
  ],
});
