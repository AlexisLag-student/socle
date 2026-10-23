import { defineAnimation } from '../schema';

/**
 * Étirement du fascia plantaire — niveau 2 : « Orteils relevés contre le bas d’un mur, talon au sol, genou qui avance
 * doucement. » ; niveau 3 : « Orteils posés sur le rebord d’une marche, talon qui descend. » Mains au mur.
 * Le niveau 1 (cheville posée sur le genou opposé, orteils tirés à la main) ne se dessine pas de profil :
 * il garde le schéma musculaire seul. Jambe proche = pied étiré ; jambe arrière recalée sur sa pointe de pied.
 */
export default defineAnimation({
  exerciseId: 'plantar-fascia-stretch',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'heelN' },
  ik: [
    { limb: 'legF', pin: 'toe' },
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    // Pointe du pied relevée contre le mur, talon au sol ; pied arrière à plat (cheville = genou − hanche + inclinaison).
    { pose: { tilt: 4, hipN: 22, kneeN: 32, ankleN: 25, hipF: -10, kneeF: 8, ankleF: 5, shoulder: 35, elbow: 125 }, dur: 1.5, phase: 'concentrique', say: 'push' },
    // Le genou avance doucement.
    { pose: { hipN: 30, kneeN: 48, ankleN: 30 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeF' }],
  overrides: [
    { levels: [2], props: [{ kind: 'wall', at: [24, 0] }] },
    // Niveau 3 : avant-pied sur le rebord d’une marche, le talon descend sous le niveau de la marche.
    {
      levels: [3],
      anchor: { point: 'toeN', y: 18 },
      ik: [
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      keyframes: [
        { pose: { tilt: 4, hip: 4, knee: 3, ankle: 3, shoulder: 62, elbow: 12 }, dur: 1.5, phase: 'excentrique' },
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
