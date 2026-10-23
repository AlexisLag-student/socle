/**
 * Dix profils variés, utilisés pour tester le moteur sur le contenu réel
 * (tests d'invariants et rapport PROFILES_REPORT.md).
 */
import type { EngineProfile } from './generate';

export interface NamedProfile {
  id: string;
  label: string;
  profile: EngineProfile;
}

export const TEST_PROFILES: NamedProfile[] = [
  {
    id: 'runner-beginner-prevention',
    label: 'Coureuse débutante, prévention, poids du corps seul, 2 × 30 min',
    profile: { sports: ['run'], objectives: ['prevention'], perfGoals: [], pathologies: [], equipment: [], sessionsPerWeek: 2, minutes: 30 },
  },
  {
    id: 'marathon-performance-gym',
    label: 'Marathonien, performance (force, économie de course), salle de musculation, 3 × 45 min',
    profile: { sports: ['run'], objectives: ['performance'], perfGoals: ['strength', 'running-economy'], pathologies: [], equipment: ['gym', 'barbell', 'dumbbells'], sessionsPerWeek: 3, minutes: 45 },
  },
  {
    id: 'road-cyclist-sprint',
    label: 'Cycliste sur route, performance (force, sprint / force-vélocité), salle + barre, 2 × 45 min',
    profile: { sports: ['bike'], objectives: ['performance'], perfGoals: ['strength', 'sprint-fv'], pathologies: [], equipment: ['gym', 'barbell'], sessionsPerWeek: 2, minutes: 45 },
  },
  {
    id: 'trail-achilles-irritable',
    label: 'Traileur, tendinopathie d’Achille (portion moyenne) en phase irritable, élastique, 3 × 15 min',
    profile: { sports: ['run'], objectives: ['pain'], perfGoals: [], pathologies: [{ id: 'achilles-midportion', phase: 'irritable' }], equipment: ['band'], sessionsPerWeek: 3, minutes: 15 },
  },
  {
    id: 'runner-pfps-rebuild',
    label: 'Coureuse, syndrome fémoro-patellaire en reconstruction, haltères + marche, 2 × 30 min',
    profile: { sports: ['run'], objectives: ['pain', 'prevention'], perfGoals: [], pathologies: [{ id: 'patellofemoral-pain', phase: 'rebuild' }], equipment: ['dumbbells', 'step'], sessionsPerWeek: 2, minutes: 30 },
  },
  {
    id: 'cyclist-knee-lowback',
    label: 'Cycliste, genou du cycliste + lombalgie en phase irritable, poids du corps + swiss ball, 2 × 30 min',
    profile: { sports: ['bike'], objectives: ['pain'], perfGoals: [], pathologies: [{ id: 'cyclist-knee-pain', phase: 'irritable' }, { id: 'low-back-pain', phase: 'irritable' }], equipment: ['swiss-ball'], sessionsPerWeek: 2, minutes: 30 },
  },
  {
    id: 'triathlete-prevention-performance',
    label: 'Triathlète (course + vélo), prévention + puissance, haltères + élastique + TRX, 4 × 45 min',
    profile: { sports: ['run', 'bike'], objectives: ['prevention', 'performance'], perfGoals: ['power'], pathologies: [], equipment: ['dumbbells', 'band', 'suspension'], sessionsPerWeek: 4, minutes: 45 },
  },
  {
    id: 'runner-bone-stress-return',
    label: 'Coureur en reprise après fracture de fatigue (feu vert médical), poids du corps + marche, 2 × 30 min',
    profile: { sports: ['run'], objectives: ['return'], perfGoals: [], pathologies: [{ id: 'bone-stress-injury', phase: 'return-to-sport' }], equipment: ['step'], sessionsPerWeek: 2, minutes: 30 },
  },
  {
    id: 'cyclist-neck-hands',
    label: 'Cycliste, cervicalgie + fourmillements des mains en reconstruction, élastique + haltères, 1 × 15 min',
    profile: { sports: ['bike'], objectives: ['pain'], perfGoals: [], pathologies: [{ id: 'cyclist-neck-pain', phase: 'rebuild' }, { id: 'cyclist-hand-numbness', phase: 'rebuild' }], equipment: ['band', 'dumbbells'], sessionsPerWeek: 1, minutes: 15 },
  },
  {
    id: 'runner-gluteal-plantar',
    label: 'Coureuse, tendinopathie glutéale (irritable) + talalgie plantaire (reconstruction), salle, 3 × 30 min',
    profile: { sports: ['run'], objectives: ['pain', 'prevention'], perfGoals: [], pathologies: [{ id: 'gluteal-tendinopathy', phase: 'irritable' }, { id: 'plantar-heel-pain', phase: 'rebuild' }], equipment: ['gym', 'dumbbells', 'band', 'step'], sessionsPerWeek: 3, minutes: 30 },
  },
];
