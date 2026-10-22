/** Zone performance : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/performance';
import exercises from '../exercises/performance';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
