import { defineAnimation } from '../schema';

/**
 * Montée sur pointes genou fléchi — « Montez sur la pointe des pieds en gardant le genou fléchi à angle constant,
 * puis redescendez lentement. » Genou fléchi d'environ 30° (debout) ou 90° (assis) : la cheville fait le mouvement.
 * Niveau 1 : dos contre un mur, deux jambes ; le bassin glisse le long du mur (appui fixe en x, monté par le décalage y)
 * et les jambes sont recalées sur la pointe des pieds.
 */
export default defineAnimation({
  exerciseId: 'calf-raise-bent-knee',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'seat', x: -45.6, y: 92.9 },
  ik: [
    { limb: 'legN', pin: 'toe' },
    { limb: 'legF', pin: 'toe' },
  ],
  still: 1,
  keyframes: [
    // Pied à plat : cheville = genou − hanche + inclinaison.
    { pose: { hip: 25, knee: 30, ankle: 5, shoulder: 4, elbow: 8 }, dur: 1, phase: 'concentrique', say: 'rise' },
    { pose: { y: 10, ankle: -32 }, dur: 0, phase: 'pause' },
    { pose: {}, dur: 1, phase: 'excentrique' },
  ],
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'heelF', from: 0, to: 0 }],
  overrides: [
    { levels: [1], props: [{ kind: 'wall', at: [-53, 0], flip: true }] },
    // Niveau 2 : sur une jambe, genou fléchi, les deux mains au mur ; l'autre pied décollé derrière.
    {
      levels: [2],
      side: 'unilateral',
      anchor: { point: 'toeN' },
      ik: [
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      keyframes: [
        { pose: { tilt: 5, hipN: 25, kneeN: 30, ankleN: 10, hipF: 12, kneeF: 75, ankleF: -20, shoulder: 62, elbow: 12 }, dur: 1, phase: 'concentrique', say: 'rise' },
        { pose: { ankleN: -28 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'excentrique' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'heelN', from: 0, to: 0 }],
      props: [{ kind: 'wall', at: [38, 0] }],
    },
    // Niveaux 3 et 4 : assis, genoux à 90°, charge posée sur les genoux ; le bassin reste sur le banc,
    // les genoux montent avec les talons.
    {
      levels: [3, 4],
      anchor: { point: 'seat', y: 53 },
      keyframes: [
        { pose: { tilt: 0, trunk: 0, hip: 90, knee: 90, ankle: 0, shoulder: 20, elbow: 75 }, dur: 1, phase: 'concentrique', say: 'rise' },
        { pose: { ankle: -28 }, dur: 0, phase: 'pause' },
        { pose: {}, dur: 1, phase: 'excentrique' },
      ],
      props: [{ kind: 'bench', at: [-30, 0], size: [66, 41] }],
    },
    // Charge posée sur les genoux (haltère ; le boudin de la machine à mollets assis est représenté de la même façon).
    { levels: [3, 4], props: [{ kind: 'dumbbell', attach: 'thighN', at: [0.86, 1.9] }] },
  ],
});
