import { defineAnimation } from '../schema';

/**
 * Serrage des adducteurs (isométrie) — « Serrez progressivement l’objet entre vos genoux, tenez la durée indiquée, puis
 * relâchez doucement. » Allongé sur le dos, tête à gauche (inclinaison −90°), genoux fléchis, pieds au sol (recalés à plat).
 * Vue de profil : le ballon, entre les genoux, est caché par le genou proche. Isométrie : la pose ne change pas.
 */
export default defineAnimation({
  exerciseId: 'adductor-squeeze',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'shoulder' },
  ik: [
    { limb: 'legN', pin: 'mid', flat: true },
    { limb: 'legF', pin: 'mid', flat: true },
  ],
  still: 1,
  keyframes: [
    { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hip: 50, knee: 100, ankle: -40 }, dur: 1, phase: 'concentrique', say: 'push' },
    { pose: {}, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'toeN' }, { point: 'heelF' }, { point: 'toeF' }],
  overrides: [
    // Niveau 3 : jambes tendues, ballon entre les chevilles ou les genoux.
    {
      levels: [3],
      ik: [],
      keyframes: [
        { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hip: -4.5, knee: 0, ankle: 10 }, dur: 1, phase: 'concentrique', say: 'push' },
        { pose: {}, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelN' }, { point: 'heelF' }],
    },
  ],
});
