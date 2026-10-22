/** Zone cuisse (ischio-jambiers, adducteurs) : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/thigh';
import exercises from '../exercises/hamstrings-adductors';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
