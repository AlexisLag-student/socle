/** Zone vélo et haut du corps : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/cycling';
import exercises from '../exercises/upper-body';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [],
} satisfies ZoneBundle;
