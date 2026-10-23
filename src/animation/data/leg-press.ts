import { defineAnimation } from '../schema';

/**
 * Presse à cuisses — « Déverrouillez, laissez fléchir les genoux jusqu’à environ 90°, puis poussez la plateforme sans
 * verrouiller les genoux en fin de mouvement. » Presse horizontale : dos et bassin collés au siège, pieds à plat sur la
 * plateforme (pieds recalés, fixes) ; le siège coulisse vers l'arrière quand les jambes se tendent (décalage x de la racine).
 * Élastique : allongé sur le dos, élastique sous le pied, jambe poussée vers le plafond.
 */
export default defineAnimation({
  exerciseId: 'leg-press',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'seat', x: 0, y: 58 },
  ik: [
    { limb: 'legN', pin: 'ankle', flat: true },
    { limb: 'legF', pin: 'ankle', flat: true },
  ],
  still: 1,
  keyframes: [
    // Assis, buste incliné en arrière contre le dossier, cuisses vers la poitrine, plantes de pied contre la plateforme.
    { pose: { tilt: -20, trunk: 0, hip: 135, knee: 95, ankle: 30, shoulder: 20, elbow: 30 }, dur: 2, phase: 'concentrique', say: 'push' },
    // Jambes presque tendues, sans verrouiller.
    { pose: { x: -22 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 3, phase: 'excentrique' },
  ],
  contacts: [],
  overrides: [
    // Plateforme verticale devant les pieds, siège sous le bassin.
    {
      variants: ['machine'],
      props: [
        { kind: 'wall', at: [78.5, 57], size: [5, 60] },
        { kind: 'bench', at: [-95, 0], size: [90, 52] },
      ],
    },
    // Niveaux 2 et 5 : une jambe, l'autre jambe repliée hors de la plateforme.
    { levels: [2, 5], variants: ['machine'], side: 'unilateral', ik: [{ limb: 'legN', pin: 'ankle', flat: true }], pose: { hipF: 100, kneeF: 120, ankleF: 0 } },
    // Élastique : allongé sur le dos, une jambe, élastique sous le pied tenu à deux mains.
    {
      variants: ['band'],
      side: 'unilateral',
      anchor: { point: 'shoulder' },
      ik: [{ limb: 'legF', pin: 'mid', flat: true }],
      keyframes: [
        { pose: { x: 0, tilt: -90, trunk: 0, neck: 10, hipN: 120, kneeN: 110, ankleN: 0, hipF: 55, kneeF: 125, ankleF: -20, shoulder: 55, elbow: 30 }, dur: 2, phase: 'concentrique', say: 'push' },
        { pose: { hipN: 85, kneeN: 8, ankleN: 10 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 3, phase: 'excentrique' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelF' }, { point: 'toeF' }],
      props: [{ kind: 'band', from: { seg: 'footN', u: 0.6, v: -1 }, to: { seg: 'handN', u: 0.4 } }],
    },
  ],
});
