// Gabarit de pathologie : copier dans src/content/pathologies/<id>.ts puis l'importer dans src/content/index.ts.
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'pathology-id',
  region: 'knee', // foot-ankle | knee | hip-thigh | trunk-upper
  bodyAreas: ['knee-anterior'], // BODY_AREAS
  sports: ['run', 'bike'],
  name: { fr: 'Nom français', en: 'English name' },
  aka: [{ fr: 'Autre nom courant', en: 'Other common name' }],
  description: { fr: 'Mécanisme en 1–2 phrases simples.', en: 'Mechanism in 1–2 plain sentences.' },
  recognize: {
    fr: 'Aide à se reconnaître, sans diagnostic : localisation, circonstances, évolution.',
    en: 'Helps users recognise themselves, without diagnosing: location, circumstances, course.',
  },
  symptoms: [{ fr: '…', en: '…' }],
  riskFactors: [{ fr: '…', en: '…' }],
  // caveat: { fr: 'Diagnostic débattu…', en: 'Debated diagnosis…' },
  // medicalClearanceRequired: true, // → uniquement la phase return-to-sport
  phases: [
    {
      phase: 'irritable',
      summary: { fr: '…', en: '…' },
      goals: [{ fr: '…', en: '…' }],
      exercises: [
        { exerciseId: 'existing-exercise-id', priority: 1, startLevel: 1 },
        {
          exerciseId: 'other-exercise-id',
          priority: 2,
          startLevel: 1,
          // dosage spécifique de la phase (protocole publié) :
          dosage: { sets: 5, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
        },
      ],
      // avoid: [{ exerciseId: 'pogo-hops', reason: { fr: '…', en: '…' } }],
      nextPhaseCriteria: [{ fr: 'Critère observable.', en: 'Observable criterion.' }],
      loadAdvice: { fr: '…', en: '…' },
    },
    // { phase: 'rebuild', … }, { phase: 'return-to-sport', …, nextPhaseCriteria: [] },
  ],
  whenToConsult: [{ fr: 'Drapeau rouge…', en: 'Red flag…' }],
  complementaryAdvice: [{ fr: '…', en: '…' }],
  evidence: {
    level: 'moderate',
    citations: [{ refId: 'author-2020', finding: { fr: '…', en: '…' } }],
  },
});
