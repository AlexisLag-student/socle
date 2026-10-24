import { defineAnimation } from '../schema';

/**
 * Isométrie des ischio-jambiers — « Poussez le talon contre la résistance (sol, chaise, élastique ou main d’un partenaire)
 * comme pour fléchir le genou, sans bouger, et tenez la durée indiquée. » Isométrie : la pose ne change pas.
 * Niveau 2 (base) : sur le dos, genou à 90°, talon enfoncé dans le sol. Jambe proche = jambe travaillée.
 */
export default defineAnimation({
  exerciseId: 'hamstring-isometric-hold',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'shoulder' },
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hipN: 44.8, kneeN: 95, ankleN: 0, hipF: -4.5, kneeF: 0, ankleF: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: {}, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'heelF' }],
  overrides: [
    // Niveau 1 : à plat ventre, genou fléchi d'environ 30°, talon qui pousse vers le haut contre un élastique.
    {
      levels: [1],
      anchor: { point: 'kneeF' },
      keyframes: [
        { pose: { tilt: 86, trunk: 0, neck: -10, hip: -4, knee: 0, ankle: -30, shoulder: 165, elbow: 140, kneeN: 30 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'kneeF' }],
      props: [{ kind: 'band', from: { seg: 'shankN', u: 0.95, v: -1 }, to: { world: [-90, 70] } }],
    },
    // Niveau 3 : sur le dos, talon posé sur une chaise, hanche et genou à 90°.
    {
      levels: [3],
      keyframes: [
        { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hipN: 90, kneeN: 90, ankleN: 0, hipF: -4.5, kneeF: 0, ankleF: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelF' }],
      // Chaise dessinée comme un siège sans dossier : l'autre jambe passe dessous.
      props: [{ kind: 'bench', at: [86, 0], size: [40, 49] }],
    },
    // Niveau 4 : debout sur une jambe, buste penché à mi-course (charnière), maintien.
    {
      levels: [4],
      anchor: { point: 'midN' },
      keyframes: [
        { pose: { tilt: 0, trunk: 0, neck: 0, hipN: 3, kneeN: 10, ankleN: 7, hipF: -8, kneeF: 30, ankleF: -10, shoulder: 4, elbow: 6 }, dur: 1.5, phase: 'excentrique' },
        { pose: { tilt: 45, hipN: 47, kneeN: 15, ankleN: 13, hipF: 0, kneeF: 0, ankleF: -5, shoulder: 45 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }],
    },
  ],
});
