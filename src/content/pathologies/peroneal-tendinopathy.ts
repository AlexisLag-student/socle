/** Tendinopathie des fibulaires (péroniers). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'peroneal-tendinopathy',
  region: 'foot-ankle',
  bodyAreas: ['ankle-lateral'],
  sports: ['run', 'bike'],
  name: { fr: 'Tendinopathie des fibulaires', en: 'Peroneal tendinopathy' },
  aka: [{ fr: 'Tendinite des péroniers', en: 'Peroneal tendinitis' }],
  description: {
    fr: 'Les tendons fibulaires, qui passent derrière la malléole externe, réagissent à une charge répétée trop importante, souvent sur terrain en dévers ou après des entorses.',
    en: 'The peroneal tendons, which run behind the outer ankle bone, react to excessive repeated load, often on cambered terrain or after sprains.',
  },
  recognize: {
    fr: 'Douleur derrière et sous la malléole externe, le long du bord extérieur du pied, qui augmente en courant, sur terrain irrégulier ou en tournant le pied vers l’extérieur contre une résistance.',
    en: 'Pain behind and below the outer ankle bone, along the outer edge of the foot, that increases when running, on uneven ground or when turning the foot outwards against resistance.',
  },
  symptoms: [
    { fr: 'Douleur sur l’extérieur de la cheville à l’effort.', en: 'Pain on the outside of the ankle with activity.' },
    { fr: 'Gonflement léger derrière la malléole externe.', en: 'Mild swelling behind the outer ankle bone.' },
    { fr: 'Gêne sur terrain en dévers ou en trail.', en: 'Discomfort on cambered ground or trails.' },
  ],
  riskFactors: [
    { fr: 'Entorses de cheville antérieures ou instabilité.', en: 'Previous ankle sprains or instability.' },
    { fr: 'Augmentation rapide du volume, surtout en trail ou sur route bombée.', en: 'Rapid increase in volume, especially on trails or cambered roads.' },
    { fr: 'Pied creux qui appuie sur le bord extérieur.', en: 'High-arched foot loading the outer edge.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On garde les fibulaires actifs avec de l’isométrie et un équilibre simple, sans terrain irrégulier ni sauts.',
        en: 'Keep the peroneals active with isometrics and simple balance work, avoiding uneven ground and hops.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité des tendons.', en: 'Reduce tendon sensitivity.' },
        { fr: 'Maintenir le contrôle de la cheville.', en: 'Maintain ankle control.' },
      ],
      exercises: [
        { exerciseId: 'band-ankle-eversion', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-isometric-hold', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-balance', priority: 2, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'line-hops', reason: { fr: 'Les sauts latéraux sollicitent fortement les fibulaires.', en: 'Lateral hops load the peroneals heavily.' } },
        { exerciseId: 'pogo-hops', reason: { fr: 'Impacts à reporter à la phase de reprise.', en: 'Impact is postponed to the return phase.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Marche et course facile sur le plat sans douleur le lendemain.', en: 'Walking and easy flat running without next-day pain.' },
        { fr: '5 × 30 s d’isométrie en éversion sans douleur.', en: '5 × 30 s of isometric eversion without pain.' },
      ],
      loadAdvice: {
        fr: 'Courez sur terrain plat et régulier, évitez le dévers et le trail technique.',
        en: 'Run on flat, even ground; avoid cambered surfaces and technical trails.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'Renforcement progressif des fibulaires et du mollet, équilibre plus exigeant.',
        en: 'Progressive peroneal and calf strengthening, with more demanding balance work.',
      },
      goals: [
        { fr: 'Retrouver une force en éversion symétrique.', en: 'Regain symmetrical eversion strength.' },
        { fr: 'Améliorer l’équilibre dynamique.', en: 'Improve dynamic balance.' },
      ],
      exercises: [
        {
          exerciseId: 'band-ankle-eversion',
          priority: 1,
          startLevel: 2,
          dosage: { sets: 3, reps: [15, 15], tempo: '3-0-1', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 2 },
        { exerciseId: 'single-leg-balance', priority: 2, startLevel: 3 },
        { exerciseId: 'star-excursion-reach', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Force en éversion et équilibre sur une jambe comparables des deux côtés.', en: 'Eversion strength and single-leg balance comparable on both sides.' },
        { fr: 'Course habituelle sur route sans douleur.', en: 'Usual road running without pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare la cheville aux appuis rapides et au terrain varié.',
        en: 'Prepare the ankle for quick steps and varied terrain.',
      },
      goals: [
        { fr: 'Reprendre le trail et les terrains irréguliers.', en: 'Return to trails and uneven ground.' },
      ],
      exercises: [
        { exerciseId: 'line-hops', priority: 1, startLevel: 1 },
        { exerciseId: 'hop-stabilization', priority: 1, startLevel: 1 },
        { exerciseId: 'band-ankle-eversion', priority: 2, startLevel: 4 },
        { exerciseId: 'pogo-hops', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Réintroduisez le trail par des sorties courtes et peu techniques.',
        en: 'Reintroduce trails with short, non-technical runs.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement ou sensation de tendon qui « saute » derrière la malléole externe.', en: 'A snapping feeling or a tendon “jumping” behind the outer ankle bone.' },
    { fr: 'Gonflement important après un traumatisme, ou impossibilité d’appuyer.', en: 'Marked swelling after an injury, or inability to bear weight.' },
    { fr: 'Douleur sur le bord extérieur du pied, à la base du 5e métatarsien (possible fracture).', en: 'Pain on the outer edge of the foot at the base of the fifth metatarsal (possible fracture).' },
    { fr: 'Pas d’amélioration après 3 mois de rééducation bien suivie.', en: 'No improvement after 3 months of well-followed rehabilitation.' },
  ],
  complementaryAdvice: [
    { fr: 'Changez régulièrement de côté de route si elle est bombée.', en: 'Switch sides regularly on cambered roads.' },
    { fr: 'Cyclistes : vérifiez l’alignement des cales et l’inclinaison du pied sur la pédale.', en: 'Cyclists: check cleat alignment and foot tilt on the pedal.' },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'van-dijk-2018',
        finding: {
          fr: 'Ce consensus international recommande d’abord un traitement conservateur pour toutes les atteintes des tendons fibulaires, d’éviter l’immobilisation et de reprendre l’appui, la mobilité puis des exercices de mise en charge du tendon dès que la douleur le permet.',
          en: 'This international consensus recommends conservative treatment first for all peroneal tendon problems, avoiding immobilisation and resuming weight-bearing, range of motion and then tendon-loading exercises as soon as pain allows.',
        },
      },
    ],
  },
});
