import { defineAnimation } from '../schema';

/**
 * Montée sur banc explosive — « Poussez le plus vite possible sur le pied posé sur le banc pour monter, en lançant le genou
 * opposé vers le haut. Redescendez en contrôle sur la même jambe et recommencez. » Banc assez haut pour que le genou soit
 * plié à environ 90° quand le pied est posé dessus. Jambe proche = jambe sur le banc (pied à plat : cheville = genou −
 * hanche + inclinaison). Niveau 2 : le pied d'appui décolle du banc (envol = décalage vertical). Le niveau 3 (changement de
 * pied sauté) garde le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'explosive-step-up',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN', y: 40 },
  still: 2,
  keyframes: [
    { pose: { tilt: 18, hipN: 100, kneeN: 100, ankleN: 18, hipF: 18, kneeF: 4, ankleF: 4, shoulderN: 40, shoulderF: -30, elbow: 80 }, dur: 0.4, phase: 'concentrique', ease: 'linear', say: 'push' },
    // Le pied libre décolle derrière, talon vers la fesse, puis le genou passe devant au-dessus du banc.
    { pose: { tilt: 8, hipN: 45, kneeN: 45, ankleN: 8, hipF: 15, kneeF: 110, ankleF: -10 }, dur: 0.4, phase: 'concentrique', ease: 'easeOut', say: 'push' },
    // En haut : hanche d'appui tendue, genou opposé lancé haut, bras qui accompagnent.
    { pose: { tilt: 0, hipN: 0, kneeN: 3, ankleN: 3, hipF: 95, kneeF: 95, ankleF: -10, shoulderN: -30, shoulderF: 60 }, dur: 0.6, phase: 'excentrique' },
    // La jambe libre redescend derrière la jambe d'appui avant la descente.
    { pose: { hipF: -8, kneeF: 70, ankleF: -20, shoulderN: 10, shoulderF: 10, elbow: 20 }, dur: 2.4, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN', y: 40 }, { point: 'toeN', y: 40 }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
  props: [{ kind: 'box', at: [-15, 0], size: [50, 40] }],
  overrides: [
    // Niveau 2 : montée sautée, réception sur le même pied, sur le banc.
    {
      levels: [2],
      keyframes: [
        { pose: { tilt: 18, hipN: 100, kneeN: 100, ankleN: 18, hipF: 18, kneeF: 4, ankleF: 4, shoulderN: 40, shoulderF: -30, elbow: 80 }, dur: 0.2, phase: 'concentrique', ease: 'linear', say: 'jump' },
        { pose: { tilt: 8, hipN: 45, kneeN: 45, ankleN: 8, hipF: 15, kneeF: 110, ankleF: -10 }, dur: 0.2, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
        { pose: { tilt: 0, hipN: 0, kneeN: 3, ankleN: -30, hipF: 95, kneeF: 95, ankleF: -10, shoulderN: -30, shoulderF: 60 }, dur: 0.2, phase: 'retour', ease: 'easeOut', say: 'jump' },
        { pose: { y: 10, ankleN: -20 }, dur: 0.2, phase: 'retour', ease: 'easeIn', say: 'land' },
        { pose: { y: 0, tilt: 8, hipN: 20, kneeN: 22, ankleN: 10 }, dur: 0.3, phase: 'retour', say: 'land' },
        { pose: { hipF: -8, kneeF: 70, ankleF: -20, shoulderN: 10, shoulderF: 10, elbow: 20 }, dur: 0.8, phase: 'excentrique' },
        { pose: {}, dur: 1.5, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN', y: 40, from: 4, to: 2 }, { point: 'heelN', y: 40, from: 4, to: 1 }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
      anchor: { point: 'toeN', y: 40 },
    },
    { levels: [4], variants: ['bodyweight', 'dumbbells'], pose: { shoulder: 2, elbow: 4 }, props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [4], variants: ['barbell'], pose: { shoulder: -35, elbow: 125 }, props: [{ kind: 'barbell', attach: 'trunk', at: [0.97, 1.2] }] },
  ],
});
