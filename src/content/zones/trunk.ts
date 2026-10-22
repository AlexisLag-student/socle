/** Zone tronc : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/trunk';
import exercises from '../exercises/trunk';
import lowBackPain from '../pathologies/low-back-pain';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [lowBackPain],
} satisfies ZoneBundle;
