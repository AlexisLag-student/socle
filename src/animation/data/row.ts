import { defineAnimation } from '../schema';

/**
 * Tirage horizontal (rowing) — « Tirez le coude vers la hanche en rapprochant l’omoplate de la colonne, tenez 1 seconde,
 * puis allongez le bras lentement. » Niveaux 3 et 4 : rowing à un bras, main éloignée sur un banc (main recalée), dos plat,
 * haltère dans la main proche ; montré pieds au sol (genou sur le banc, la jambe d'appui et le banc se superposeraient de profil). Niveaux 1 et 2 : corps incliné en arrière sous des sangles (ou une table),
 * talons au sol, mains fixes : on remonte la poitrine vers les mains (plus incliné au niveau 2).
 */
export default defineAnimation({
  exerciseId: 'row',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  // Pieds au sol en fente courte, main éloignée sur le banc (recalée), buste penché, dos plat.
  anchor: { point: 'midN' },
  ik: [{ limb: 'armF', pin: 'hand', y: 59.5 }],
  still: 1,
  keyframes: [
    // Bras proche tendu vers le sol (pieds à plat : cheville = genou − hanche + inclinaison).
    { pose: { tilt: 70, trunk: 0, neck: -10, hipN: 60, kneeN: 10, ankleN: 20, hipF: 95, kneeF: 26.9, ankleF: 1.9, shoulderF: 115, elbowF: 0, wristF: 40, shoulderN: 70, elbowN: 5 }, dur: 1, phase: 'concentrique', say: 'push' },
    // Coude tiré vers la hanche.
    { pose: { shoulderN: -10, elbowN: 95 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }, { point: 'handF', y: 59.5 }],
  overrides: [
    {
      levels: [3, 4],
      props: [
        { kind: 'bench', at: [90, 0], size: [36, 59.5] },
        { kind: 'dumbbell', attach: 'handN' },
      ],
    },
    {
      levels: [1, 2],
      side: 'bilateral',
      anchor: { point: 'heelN' },
      ik: [
        { limb: 'armN', pin: 'wrist' },
        { limb: 'armF', pin: 'wrist' },
      ],
      keyframes: [
        // Corps droit incliné en arrière, bras tendus vers les poignées.
        { pose: { x: 0, tilt: -32, trunk: 0, neck: 10, hip: 0, knee: 0, ankle: 0, shoulder: 90, elbow: 0, wrist: 65 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: { tilt: -22, shoulder: 40, elbow: 100, wrist: 30 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'heelF' }],
      props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { world: [70, 212] } }],
    },
  ],
});
