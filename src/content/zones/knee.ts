/** Zone genou : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/knee';
import exercises from '../exercises/knee';
import patellofemoralPain from '../pathologies/patellofemoral-pain';
import iliotibialBandSyndrome from '../pathologies/iliotibial-band-syndrome';
import patellarTendinopathy from '../pathologies/patellar-tendinopathy';
import pesAnserineTendinopathy from '../pathologies/pes-anserine-tendinopathy';
import cyclistKneePain from '../pathologies/cyclist-knee-pain';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [
    patellofemoralPain,
    iliotibialBandSyndrome,
    patellarTendinopathy,
    pesAnserineTendinopathy,
    cyclistKneePain,
  ],
} satisfies ZoneBundle;
