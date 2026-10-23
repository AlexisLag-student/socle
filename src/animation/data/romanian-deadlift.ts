import { defineAnimation } from '../schema';

/**
 * Soulevé de terre roumain — « Poussez les fesses vers l’arrière en penchant le buste, la charge glissant le long
 * des cuisses, jusqu’à sentir une forte tension derrière les cuisses (souvent sous les genoux). Remontez en poussant
 * les hanches vers l’avant. » Le mouvement vient des hanches : tronc aligné sur le bassin (dos droit),
 * genoux légèrement fléchis (15°) et fixes, bras ramenés vers les jambes pour garder la charge collée aux cuisses et aux tibias.
 * Amplitude retenue : mains juste sous les genoux (version prudente de « souvent sous les genoux »).
 */
export default defineAnimation({
  exerciseId: 'romanian-deadlift',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    // Pied à plat : cheville = genou − hanche + inclinaison.
    // Annotation « dos droit » pendant la descente et en bas : la consigne du texte (« dos droit », « le mouvement vient des hanches »).
    { pose: { hip: 5, knee: 15, ankle: 10, shoulder: 8, elbow: 0 }, dur: 1.5, phase: 'excentrique', say: 'flatBack' },
    { pose: { tilt: 77, hip: 97, knee: 15, ankle: -5, shoulder: 56 }, dur: 0, phase: 'pause', say: 'flatBack' },
    { pose: {}, dur: 1, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    { levels: [2, 3, 4], variants: ['dumbbells'], props: [{ kind: 'dumbbell', attach: 'handN' }, { kind: 'dumbbell', attach: 'handF' }] },
    { levels: [2, 3, 4], variants: ['barbell'], props: [{ kind: 'barbell', attach: 'handN' }] },
    { levels: [2, 3, 4], variants: ['band'], props: [{ kind: 'band', from: { world: [2, 1] }, to: { seg: 'handN', u: 0.4 } }] },
  ],
});
