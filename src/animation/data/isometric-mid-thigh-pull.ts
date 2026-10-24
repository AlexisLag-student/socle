import { defineAnimation } from '../schema';

/**
 * Tirage isométrique mi-cuisse — « Poussez le sol avec les jambes en tirant la barre vers le haut comme pour la soulever,
 * en montant jusqu’à votre effort maximal en 1 à 2 secondes. Tenez cet effort, puis relâchez progressivement. »
 * Barre bloquée à mi-cuisse (ou sangle passée sous les pieds), genoux légèrement fléchis, buste penché, dos plat, épaules
 * au-dessus de la barre, bras tendus. Isométrie : la pose ne change pas ; pieds à plat (cheville = genou − hanche + inclinaison).
 * Niveau 4 : sur une jambe, en fente.
 */
export default defineAnimation({
  exerciseId: 'isometric-mid-thigh-pull',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 28, trunk: 0, neck: -8, hip: 48, knee: 30, ankle: 10, shoulder: 22, elbow: 0 }, dur: 1.5, phase: 'concentrique', say: 'push' },
    { pose: {}, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1.5, phase: 'retour' },
  ],
  contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    { variants: ['rack', 'smith'], props: [{ kind: 'barbell', attach: 'handN' }] },
    { variants: ['strap'], props: [{ kind: 'band', from: { seg: 'handN', u: 0.4 }, to: { seg: 'footN', u: 0.25, v: -1 } }] },
    // Niveau 4 : en fente sous la barre, jambe avant (proche) qui pousse, pied arrière sur la pointe.
    {
      levels: [4],
      side: 'unilateral',
      keyframes: [
        { pose: { tilt: 28, trunk: 0, neck: -8, hipN: 55, kneeN: 40, ankleN: 13, hipF: 8, kneeF: 30, ankleF: -5, shoulder: 22, elbow: 0 }, dur: 1.5, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1.5, phase: 'retour' },
      ],
      contacts: [{ point: 'heelN' }, { point: 'toeN' }, { point: 'toeF' }],
    },
  ],
});
