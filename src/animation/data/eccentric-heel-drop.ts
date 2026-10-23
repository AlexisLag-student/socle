import { defineAnimation } from '../schema';

/**
 * Descente excentrique du talon (Alfredson) — « Montez sur les deux pieds, transférez le poids sur la jambe à travailler,
 * puis descendez lentement le talon sous le niveau de la marche sur cette seule jambe. Remontez avec les deux jambes. »
 * Version genou tendu (l'autre moitié des séries se fait genou fléchi). Mains au mur pour l'équilibre.
 * Jambe proche = jambe travaillée ; l'autre pied se décolle au début de la descente et revient pour remonter.
 */
export default defineAnimation({
  exerciseId: 'eccentric-heel-drop',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'toeN' },
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    // Sur la pointe des deux pieds.
    { pose: { knee: 3, hip: 3, ankle: -38, shoulder: 62, elbow: 12 }, dur: 0.5, phase: 'excentrique', say: 'lift' },
    // L'autre pied se décolle : tout le poids sur la jambe travaillée.
    { pose: { hipF: 12, kneeF: 75, ankleF: -20 }, dur: 2.5, phase: 'excentrique', say: 'brake' },
    // Talon au sol (niveau 1 : jamais sous l'horizontale).
    { pose: { ankleN: 0 }, dur: 0.8, phase: 'concentrique', say: 'rise' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF', from: 0, to: 0 }, { point: 'heelN', from: 2, to: 2 }],
  props: [{ kind: 'wall', at: [43, 0] }],
  overrides: [
    // Niveaux 2 et 3 : avant-pied au bord d’une marche, talon qui descend sous le niveau de la marche.
    {
      levels: [2, 3],
      anchor: { point: 'toeN', y: 18 },
      keyframes: [
        { pose: { knee: 3, hip: 3, ankle: -38, shoulder: 62, elbow: 12 }, dur: 0.5, phase: 'excentrique', say: 'lift' },
        { pose: { hipF: 12, kneeF: 75, ankleF: -20 }, dur: 2.5, phase: 'excentrique', say: 'brake' },
        { pose: { ankleN: 18 }, dur: 0.8, phase: 'concentrique', say: 'rise' },
      ],
      contacts: [{ point: 'toeN', y: 18 }, { point: 'toeF', y: 18, from: 0, to: 0 }],
      props: [{ kind: 'step', at: [-5, 0], size: [36, 18] }],
    },
    // Niveau 3 : lesté (haltère du côté de la jambe travaillée, l'autre main au mur).
    { levels: [3], pose: { shoulderN: 4, elbowN: 6, shoulderF: 62, elbowF: 12 }, ik: [{ limb: 'armF', pin: 'wrist' }], props: [{ kind: 'dumbbell', attach: 'handN' }] },
  ],
});
