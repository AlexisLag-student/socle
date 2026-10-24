import { defineAnimation } from '../schema';

/**
 * Glider (protocole d’Askling) — « Faites glisser lentement le pied arrière vers l’arrière en gardant le poids sur la jambe
 * avant, buste légèrement penché. Revenez en vous aidant des bras, pas de la jambe avant. » Mains sur le dossier d'une
 * chaise ou une barre (mains fixes), jambe avant légèrement fléchie (jambe proche, travaillée), pied arrière sur une serviette qui glisse.
 */
export default defineAnimation({
  exerciseId: 'askling-glider',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  ik: [
    { limb: 'armN', pin: 'wrist' },
    { limb: 'armF', pin: 'wrist' },
  ],
  still: 1,
  keyframes: [
    // Pied avant à plat (cheville = genou − hanche + inclinaison) ; pied arrière à plat sur la serviette.
    { pose: { tilt: 15, trunk: 0, hipN: 22, kneeN: 12, ankleN: 5, hipF: 8, kneeF: 12, ankleF: 19, shoulder: 55, elbow: 30 }, dur: 3, phase: 'excentrique', say: 'brake' },
    { pose: { tilt: 30, hipN: 55, kneeN: 18, ankleN: -7, hipF: -10, kneeF: 2, ankleF: 25 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'concentrique', say: 'return' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }],
  // Appui stable à hauteur de taille (dossier de chaise ou barre), dessiné comme un plateau.
  props: [{ kind: 'bench', at: [50, 0], size: [36, 99.5] }],
});
