import { defineAnimation } from '../schema';

/**
 * Étirement des mollets au mur — « Avancez le bassin vers le mur en gardant le talon arrière au sol, jusqu’à sentir
 * l’étirement dans le mollet. Maintenez, puis pliez le genou arrière pour cibler le soléaire. » Mains au mur.
 * Jambe proche = jambe arrière (étirée), pied à plat : cheville = genou − hanche + inclinaison ;
 * jambe avant fléchie, pied à plat recalé.
 */
export default defineAnimation({
  exerciseId: 'calf-wall-stretch',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  ik: [
    { limb: 'legF', pin: 'mid', flat: true },
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    { pose: { tilt: 5, hipN: -8, kneeN: 0, ankleN: 13, hipF: 36, kneeF: 30, ankleF: -1, shoulder: 70, elbow: 40 }, dur: 1.5, phase: 'concentrique', say: 'push' },
    // Bassin vers le mur, talon arrière au sol.
    { pose: { tilt: 10, hipN: -16, ankleN: 26, hipF: 32, kneeF: 32 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    { levels: [1, 2], props: [{ kind: 'wall', at: [82.5, 0] }] },
    // Niveau 2 : puis genou arrière plié (soléaire), talon toujours au sol.
    {
      levels: [2],
      keyframes: [
        { pose: { tilt: 5, hipN: -8, kneeN: 0, ankleN: 13, hipF: 36, kneeF: 30, ankleF: -1, shoulder: 70, elbow: 40 }, dur: 1.5, phase: 'concentrique', say: 'push' },
        { pose: { tilt: 10, hipN: -16, ankleN: 26, hipF: 32, kneeF: 32 }, dur: 3, phase: 'isométrique' },
        { pose: { tilt: 6, hipN: 0, kneeN: 22, ankleN: 28 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
    },
    // Niveau 3 : avant-pied sur une marche, talon qui descend lentement sous le niveau de la marche.
    {
      levels: [3],
      anchor: { point: 'toeN', y: 18 },
      ik: [
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      keyframes: [
        { pose: { tilt: 4, hip: 4, knee: 3, ankle: 3, shoulder: 62, elbow: 12 }, dur: 2, phase: 'excentrique' },
        { pose: { ankle: 24 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
      contacts: [{ point: 'toeN', y: 18 }, { point: 'toeF', y: 18 }],
      props: [
        { kind: 'step', at: [-5, 0], size: [36, 18] },
        { kind: 'wall', at: [43, 0] },
      ],
    },
  ],
});
