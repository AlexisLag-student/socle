/** Zone pied / cheville / jambe : références, exercices et pathologies. */
import type { ZoneBundle } from '../zone';
import references from '../references/foot-ankle';
import exCalf from '../exercises/calf';
import exFootAnkle from '../exercises/foot-ankle';
import achillesMidportion from '../pathologies/achilles-midportion';
import achillesInsertional from '../pathologies/achilles-insertional';
import plantarHeelPain from '../pathologies/plantar-heel-pain';
import medialTibialStressSyndrome from '../pathologies/medial-tibial-stress-syndrome';
import boneStressInjury from '../pathologies/bone-stress-injury';
import chronicAnkleInstability from '../pathologies/chronic-ankle-instability';
import tibialisPosteriorTendinopathy from '../pathologies/tibialis-posterior-tendinopathy';
import peronealTendinopathy from '../pathologies/peroneal-tendinopathy';
import metatarsalgiaMortonNeuroma from '../pathologies/metatarsalgia-morton-neuroma';
import calfMuscleStrain from '../pathologies/calf-muscle-strain';

export default {
  references: [...references],
  exercises: [...exCalf, ...exFootAnkle],
  pathologies: [
    achillesMidportion,
    achillesInsertional,
    plantarHeelPain,
    medialTibialStressSyndrome,
    boneStressInjury,
    chronicAnkleInstability,
    tibialisPosteriorTendinopathy,
    peronealTendinopathy,
    metatarsalgiaMortonNeuroma,
    calfMuscleStrain,
  ],
} satisfies ZoneBundle;
