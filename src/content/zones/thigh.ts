/** Zone cuisse (ischio-jambiers, adducteurs) : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/thigh';
import exercises from '../exercises/hamstrings-adductors';
import proximalHamstringTendinopathy from '../pathologies/proximal-hamstring-tendinopathy';
import hamstringStrain from '../pathologies/hamstring-strain';
import adductorGroinPain from '../pathologies/adductor-groin-pain';

export default {
  references: [...references],
  exercises: [...exercises],
  pathologies: [proximalHamstringTendinopathy, hamstringStrain, adductorGroinPain],
} satisfies ZoneBundle;
