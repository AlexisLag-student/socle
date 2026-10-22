/** Zone genou : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/knee';
import exercises from '../exercises/knee';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
