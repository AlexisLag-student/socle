import { defineAnimation } from '../schema';

/**
 * Chat-vache — « Arrondissez lentement le dos en rentrant le bassin et le menton (chat), puis creusez doucement en ouvrant
 * la poitrine et en basculant le bassin (vache). Alternez sans forcer. » À quatre pattes (mains et genoux fixes),
 * orteils repliés. Chat : bassin basculé vers l'arrière, tronc fléchi, tête rentrée ; vache : l'inverse.
 * Amplitude modérée, dans la zone sans douleur. Niveau 3 : le recul vers les talons (posture de l'enfant) n'est pas montré.
 */
export default defineAnimation({
  exerciseId: 'cat-cow',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'kneeF' },
  ik: [
    { limb: 'armN', pin: 'hand' },
    { limb: 'armF', pin: 'hand' },
  ],
  still: 1,
  keyframes: [
    // Vache : dos creusé, poitrine ouverte, regard devant.
    { pose: { tilt: 78, trunk: -10, neck: -30, head: -10, hip: 78, knee: 107, ankle: 8, shoulder: 76, elbow: 0, wrist: 75 }, dur: 3, phase: 'excentrique' },
    // Chat : dos arrondi, bassin rentré, menton rentré.
    { pose: { tilt: 66, trunk: 22, neck: 25, head: 10, hip: 66 }, dur: 3, phase: 'concentrique', say: 'push' },
  ],
  contacts: [{ point: 'kneeF' }, { point: 'kneeN' }, { point: 'toeF' }, { point: 'toeN' }, { point: 'handN' }, { point: 'handF' }],
  overrides: [],
});
