// Gabarit d'exercice : copier dans src/content/exercises/<groupe>.ts, dans le tableau exporté.
// Imports à placer en haut du fichier :
//   import { defineExercise } from '@/domain/schema';
//   import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

defineExercise({
  id: 'exercise-id', // kebab-case, anglais, définitif
  family: 'movement-family', // deux exercices de même famille ne sont jamais dans la même séance
  name: { fr: 'Nom français', en: 'English name' },
  sports: ['run', 'bike'],
  zones: ['thigh'], // BODY_ZONES
  half: 'lower', // lower | upper | trunk
  muscles: {
    primary: ['vastus-lateralis'], // MUSCLE_IDS — dessinés dans le zoom ci-dessous
    secondary: ['glute-max'],
  },
  zoom: 'leg-front', // ZOOM_REGIONS
  qualities: ['strength'],
  objectives: ['prevention', 'performance'],
  perfGoals: ['strength'], // obligatoire si 'performance'
  preventionFor: ['run'], // optionnel
  why: {
    fr: 'Rôle général du muscle dans la course ou le vélo, en langage clair.',
    en: 'General role of the muscle in running or cycling, in plain language.',
  },
  how: {
    setup: { fr: 'Position de départ.', en: 'Starting position.' },
    movement: { fr: 'Description du mouvement.', en: 'Movement description.' },
    cues: [{ fr: 'Consigne clé.', en: 'Key cue.' }],
    breathing: { fr: 'Optionnel.', en: 'Optional.' },
  },
  mistakes: [{ fr: 'Erreur fréquente.', en: 'Common mistake.' }],
  levels: [
    {
      level: 1,
      name: { fr: 'Niveau 1', en: 'Level 1' },
      description: { fr: 'Version la plus facile.', en: 'Easiest version.' },
      mastery: { fr: 'Critère objectif pour passer au niveau 2.', en: 'Objective criterion to move to level 2.' },
      dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
    },
    {
      level: 2,
      name: { fr: 'Niveau 2', en: 'Level 2' },
      description: { fr: '…', en: '…' },
      mastery: { fr: '…', en: '…' },
      dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      requires: ['step'], // optionnel : matériel indispensable à ce niveau
    },
    {
      level: 3,
      name: { fr: 'Niveau 3', en: 'Level 3' },
      description: { fr: '…', en: '…' },
      mastery: { fr: '…', en: '…' },
      dosage: { sets: 4, reps: [6, 8], tempo: '3-0-1', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      loaded: true, // optionnel : exige une variante chargeable
    },
  ],
  variants: [
    { id: 'bodyweight', equipment: [], loadable: false, rank: 1,
      name: { fr: 'Poids du corps', en: 'Bodyweight' },
      instructions: { fr: '…', en: '…' } },
    { id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
      name: { fr: 'Haltères', en: 'Dumbbells' },
      instructions: { fr: '…', en: '…' } },
    { id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
      name: { fr: 'Machine', en: 'Machine' },
      instructions: { fr: '…', en: '…' } },
  ],
  precautions: [caution.painFlare],
  evidence: {
    level: 'expert', // strong | moderate | low | expert — voir le skill verify-reference
    citations: [
      // { refId: 'auteur-2020', finding: { fr: 'Ce que l’étude a montré.', en: 'What the study showed.' } },
    ],
  },
}),
