/** Zone hanche (fessiers, rotateurs, fléchisseurs) : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/hip';
import exercises from '../exercises/hip';
import glutealTendinopathy from '../pathologies/gluteal-tendinopathy';
import iliopsoasTendinopathy from '../pathologies/iliopsoas-tendinopathy';
import piriformisSyndrome from '../pathologies/piriformis-syndrome';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [glutealTendinopathy, iliopsoasTendinopathy, piriformisSyndrome],
} satisfies ZoneBundle;
