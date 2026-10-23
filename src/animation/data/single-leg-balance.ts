import { defineAnimation } from '../schema';

/**
 * Équilibre sur une jambe — « Tenez l’équilibre pendant la durée indiquée en gardant le bassin horizontal, puis changez
 * de jambe. » Genou d'appui légèrement fléchi, l'autre pied décollé derrière. Jambe proche = jambe d'appui.
 * Pied à plat : cheville = genou − hanche + inclinaison.
 */
export default defineAnimation({
  exerciseId: 'single-leg-balance',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { hip: 3, knee: 5, ankle: 2, shoulder: 4, elbow: 8 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
    { pose: { hipN: 6, kneeN: 10, ankleN: 4, hipF: 12, kneeF: 75, ankleF: -20 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 0.8, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF', from: 0, to: 0 }, { point: 'toeF', from: 0, to: 0 }],
  overrides: [
    // Niveaux 3 et 5 : sur un coussin (surface instable).
    {
      levels: [3, 5],
      anchor: { point: 'midN', y: 6 },
      contacts: [{ point: 'heelN', y: 6 }, { point: 'toeN', y: 6 }, { point: 'heelF', y: 6, from: 0, to: 0 }, { point: 'toeF', y: 6, from: 0, to: 0 }],
      props: [{ kind: 'pad', at: [-30, 0], size: [60, 6] }],
    },
    // Niveau 4 : perturbations, balayages de la jambe libre d'avant en arrière, bras écartés pour l'équilibre.
    {
      levels: [4],
      keyframes: [
        { pose: { hipN: 6, kneeN: 10, ankleN: 4, hipF: -15, kneeF: 25, ankleF: -15, shoulder: 40, elbow: 10 }, dur: 0.9, phase: 'concentrique', say: 'step' },
        { pose: { hipF: 40, kneeF: 15, ankleF: -5 }, dur: 0.9, phase: 'concentrique', say: 'step' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }],
      still: 0,
    },
    // Niveau 5 : mini-squats sur une jambe, sur le coussin.
    {
      levels: [5],
      keyframes: [
        { pose: { hipN: 6, kneeN: 10, ankleN: 4, hipF: 12, kneeF: 75, ankleF: -20, shoulder: 4, elbow: 8 }, dur: 1.2, phase: 'excentrique' },
        { pose: { tilt: 20, hipN: 45, kneeN: 45, ankleN: 20, hipF: 30, shoulder: 25 }, dur: 0.3, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
      ],
      contacts: [{ point: 'heelN', y: 6 }, { point: 'toeN', y: 6 }],
      still: 1,
    },
  ],
});
