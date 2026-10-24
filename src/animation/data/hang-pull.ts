import { defineAnimation, type Keyframe } from '../schema';

/**
 * Tirage explosif depuis la suspension (hang pull) — « Tendez violemment hanches, genoux et chevilles en montant sur la
 * pointe des pieds, puis haussez les épaules et tirez les coudes vers le haut et l’extérieur : la barre monte le long du
 * corps jusqu’au bas de la poitrine. Laissez-la redescendre en contrôle jusqu’aux cuisses. » Départ debout, barre contre
 * les cuisses ; on recule les fesses jusqu'à ce que la barre arrive au-dessus des genoux (dos plat, épaules au-dessus de la
 * barre), puis triple extension. Pieds à plat : cheville = genou − hanche + inclinaison. Le haussement d'épaules ne se
 * dessine pas (pas d'omoplate dans le squelette). Niveau 1 : barre à vide ou bâton, sans tirage de bras.
 */
const stand: Keyframe['pose'] = { tilt: 0, trunk: 0, neck: 0, hip: 2, knee: 3, ankle: 1, shoulder: 2, elbow: 0 };
const hang = (deep: boolean): Keyframe['pose'] =>
  deep ? { tilt: 52, hip: 72, knee: 32, ankle: 12, shoulder: 52, elbow: 0 } : { tilt: 38, hip: 48, knee: 22, ankle: 12, shoulder: 38, elbow: 0 };
// Triple extension : hanches et genoux tendus, sur la pointe des pieds, bras encore tendus.
const extension: Keyframe['pose'] = { tilt: -4, hip: -6, knee: 0, ankle: -32, shoulder: 0, elbow: 0 };
const pull = (arms: boolean, deep = false, jump = 0): Keyframe[] => [
  { pose: stand, dur: 1, phase: 'excentrique', say: 'flatBack' },
  { pose: hang(deep), dur: 0.3, phase: 'concentrique', ease: 'easeIn', say: 'jump' },
  { pose: { ...extension, y: 0 }, dur: jump ? 0.2 : 0.25, phase: 'concentrique', ease: 'easeOut', say: 'jump' },
  ...(jump ? [{ pose: { y: jump, ankle: -25 }, dur: 0.2, phase: 'retour', ease: 'easeIn', say: 'land' } as Keyframe] : []),
  // Coudes tirés vers le haut, la barre remonte le long du corps jusqu'au bas de la poitrine.
  ...(arms ? [{ pose: { y: 0, ankle: -30, shoulder: -28, elbow: 75 }, dur: 0.15, phase: 'concentrique', say: 'jump' } as Keyframe] : []),
  { pose: arms ? { y: 0, ankle: -30, shoulder: -15, elbow: 140 } : { y: 0, ankle: -30 }, dur: 1.2, phase: 'retour', say: 'return' },
];

export default defineAnimation({
  exerciseId: 'hang-pull',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'toeN' },
  still: 4,
  keyframes: pull(true),
  contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 1 }, { point: 'heelF', from: 0, to: 1 }],
  overrides: [
    { levels: [1], keyframes: pull(false), still: 2 },
    // Niveau 2 : jump shrug, les pieds décollent légèrement, bras tendus.
    {
      levels: [2],
      keyframes: pull(false, false, 6),
      contacts: [{ point: 'toeN', from: 4, to: 2 }, { point: 'toeF', from: 4, to: 2 }, { point: 'heelN', from: 0, to: 1 }, { point: 'heelF', from: 0, to: 1 }],
      still: 2,
    },
    // Niveau 4 : depuis sous les genoux, sans tirage de bras.
    { levels: [4], keyframes: pull(false, true), still: 2 },
    // Niveau 5 : épaulé, réception de la barre sur l'avant des épaules en quart de squat.
    {
      levels: [5],
      keyframes: [
        ...pull(true).slice(0, 3),
        { pose: { y: 0, ankle: -30, shoulder: -28, elbow: 75 }, dur: 0.12, phase: 'concentrique', say: 'jump' },
        { pose: { shoulder: -15, elbow: 140 }, dur: 0.15, phase: 'concentrique', say: 'jump' },
        // Réception : coudes devant, barre sur les épaules, quart de squat (pieds à plat).
        { pose: { tilt: 18, hip: 40, knee: 45, ankle: 23, shoulder: 75, elbow: 145 }, dur: 0.8, phase: 'isométrique', say: 'hold' },
        { pose: { tilt: 0, hip: 2, knee: 3, ankle: 1 }, dur: 1.2, phase: 'retour', say: 'return' },
      ],
      contacts: [{ point: 'toeN' }, { point: 'toeF' }, { point: 'heelN', from: 5, to: 1 }, { point: 'heelF', from: 5, to: 1 }],
      still: 5,
    },
    { variants: ['bodyweight', 'barbell'], props: [{ kind: 'barbell', attach: 'handN' }] },
    { variants: ['dumbbells'], props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
  ],
});
