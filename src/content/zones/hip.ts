/** Zone hanche (fessiers, rotateurs, fléchisseurs) : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/hip';
import exercises from '../exercises/hip';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
