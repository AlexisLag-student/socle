/** Zone pied / cheville / jambe : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/foot-ankle';
import exCalf from '../exercises/calf';
import achillesMidportion from '../pathologies/achilles-midportion';

export default {
  references: [...references],
  exercises: [...exCalf],
  pathologies: [achillesMidportion],
} satisfies ZoneBundle;
