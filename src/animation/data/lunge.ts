import { defineAnimation } from '../schema';

/**
 * Fente — « Faites un grand pas (vers l’arrière pour commencer), descendez jusqu’à ce que le genou arrière frôle le sol,
 * puis revenez à la position de départ en poussant avec la jambe avant. » Mains sur les hanches, buste droit,
 * tibia avant presque vertical. Jambe proche = jambe avant.
 * Niveau 1 : pas en arrière (le pied avant reste fixe). Niveaux 2 à 4 : pas en avant (le pied arrière reste fixe) ;
 * la fente marchée est montrée comme une fente avant (un cycle d'animation revient à son point de départ).
 */
export default defineAnimation({
  exerciseId: 'lunge',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 3,
  keyframes: [
    // Debout, pieds sous les hanches (pied à plat : cheville = genou − hanche + inclinaison).
    { pose: { hip: 2, knee: 4, ankle: 2, shoulder: -25, elbow: 110 }, dur: 0.7, phase: 'excentrique' },
    // Le pied arrière se pose loin derrière, sur la pointe.
    { pose: { hipN: 50, kneeN: 50, ankleN: 0, hipF: -18.4, kneeF: 48.9, ankleF: -10 }, dur: 0.65, phase: 'excentrique' },
    // Pose intermédiaire : la pointe du pied arrière reste au même endroit.
    { pose: { hipN: 70, kneeN: 72, ankleN: 2, hipF: -4.7, kneeF: 83, ankleF: 8 }, dur: 0.65, phase: 'excentrique' },
    // Genou arrière qui frôle le sol.
    { pose: { hipN: 90, kneeN: 95, ankleN: 5, hipF: -5.6, kneeF: 101.8, ankleF: 25 }, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 1, to: 3 }],
  overrides: [
    {
      levels: [2, 3, 4],
      anchor: { point: 'toeF' },
      still: 3,
      keyframes: [
        { pose: { hip: 2, knee: 4, ankle: 2, shoulder: -25, elbow: 110 }, dur: 0.7, phase: 'excentrique' },
        // Le pied avant se pose loin devant, talon d'abord ; le pied arrière roule sur sa pointe.
        { pose: { hipN: 49.2, kneeN: 56.2, ankleN: 15, hipF: -20, kneeF: 45, ankleF: -18 }, dur: 0.65, phase: 'excentrique' },
        { pose: { hipN: 67, kneeN: 75.9, ankleN: 8, hipF: -10, kneeF: 75, ankleF: 5 }, dur: 0.65, phase: 'excentrique' },
        { pose: { hipN: 90, kneeN: 95, ankleN: 5, hipF: -2.6, kneeF: 105, ankleF: 25 }, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'toeF' }, { point: 'heelF', from: 0, to: 0 }, { point: 'heelN', from: 0, to: 0 }, { point: 'toeN', from: 0, to: 0 }, { point: 'heelN', from: 1, to: 3 }, { point: 'toeN', from: 3, to: 3 }],
    },
    { levels: [4], variants: ['bodyweight', 'dumbbells'], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [4], variants: ['barbell'], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
