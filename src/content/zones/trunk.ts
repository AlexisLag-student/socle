/** Zone tronc : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/trunk';
import exercises from '../exercises/trunk';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
