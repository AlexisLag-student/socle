/** Zone vélo et haut du corps : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/cycling';
import exercises from '../exercises/upper-body';
import cyclistNeckPain from '../pathologies/cyclist-neck-pain';
import cyclistShoulderTrapeziusPain from '../pathologies/cyclist-shoulder-trapezius-pain';
import cyclistHandNumbness from '../pathologies/cyclist-hand-numbness';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [cyclistNeckPain, cyclistShoulderTrapeziusPain, cyclistHandNumbness],
} satisfies ZoneBundle;
