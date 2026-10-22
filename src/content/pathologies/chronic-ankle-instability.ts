/** Instabilité chronique de cheville / entorses à répétition. */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'chronic-ankle-instability',
  region: 'foot-ankle',
  bodyAreas: ['ankle-lateral'],
  sports: ['run', 'bike'],
  name: { fr: 'Instabilité chronique de cheville (entorses à répétition)', en: 'Chronic ankle instability (recurrent sprains)' },
  aka: [{ fr: 'Entorses de cheville à répétition', en: 'Recurrent ankle sprains' }],
  description: {
    fr: 'Après une entorse, les ligaments, mais surtout les réflexes et la force des muscles qui stabilisent la cheville, ne récupèrent pas toujours complètement. La cheville se dérobe alors plus facilement.',
    en: 'After a sprain, the ligaments, and above all the reflexes and strength of the muscles that stabilise the ankle, do not always fully recover. The ankle then gives way more easily.',
  },
  recognize: {
    fr: 'Sensation que la cheville « lâche » ou se tord facilement sur terrain irrégulier, entorses répétées du même côté, appréhension en trail ou dans les descentes.',
    en: 'A feeling that the ankle “gives way” or rolls easily on uneven ground, repeated sprains on the same side, apprehension on trails or downhill.',
  },
  symptoms: [
    { fr: 'Dérobements ou sensation d’instabilité.', en: 'Episodes of giving way or a feeling of instability.' },
    { fr: 'Gêne ou gonflement léger sur l’extérieur de la cheville après l’effort.', en: 'Discomfort or mild swelling on the outside of the ankle after activity.' },
    { fr: 'Moins bon équilibre sur une jambe du côté atteint.', en: 'Poorer single-leg balance on the affected side.' },
  ],
  riskFactors: [
    { fr: 'Entorse précédente, surtout mal rééduquée.', en: 'Previous sprain, especially without proper rehabilitation.' },
    { fr: 'Équilibre sur une jambe diminué.', en: 'Reduced single-leg balance.' },
    { fr: 'Course sur terrain irrégulier (trail).', en: 'Running on uneven terrain (trail).' },
  ],
  phases: [
    {
      phase: 'rebuild',
      summary: {
        fr: 'On restaure l’équilibre, la force des stabilisateurs de la cheville et la mobilité, plusieurs fois par semaine.',
        en: 'Restore balance, ankle stabiliser strength and mobility, several times a week.',
      },
      goals: [
        { fr: 'Retrouver un équilibre sur une jambe comparable des deux côtés.', en: 'Regain single-leg balance comparable on both sides.' },
        { fr: 'Renforcer les fibulaires, le tibial postérieur et le mollet.', en: 'Strengthen the peroneals, tibialis posterior and calf.' },
      ],
      exercises: [
        { exerciseId: 'single-leg-balance', priority: 1, startLevel: 1 },
        { exerciseId: 'band-ankle-eversion', priority: 1, startLevel: 2 },
        { exerciseId: 'band-ankle-inversion', priority: 2, startLevel: 2 },
        { exerciseId: 'calf-raise-straight-knee', priority: 2, startLevel: 2 },
        { exerciseId: 'knee-to-wall-mobility', priority: 3, startLevel: 1 },
        { exerciseId: 'side-lying-hip-abduction', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'line-hops', reason: { fr: 'Les sauts latéraux viennent après la récupération de l’équilibre et de la force.', en: 'Lateral hops come once balance and strength have recovered.' } },
      ],
      nextPhaseCriteria: [
        { fr: '45 secondes d’équilibre sur une jambe sur surface instable, des deux côtés.', en: '45 seconds of single-leg balance on an unstable surface, on both sides.' },
        { fr: 'Force en éversion et 25 montées sur pointes comparables des deux côtés.', en: 'Eversion strength and 25 calf raises comparable on both sides.' },
      ],
      loadAdvice: {
        fr: 'Privilégiez les terrains réguliers pendant cette phase ; une chevillère ou un strapping peut sécuriser les sorties.',
        en: 'Favour even ground during this phase; an ankle brace or taping can make runs safer.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On ajoute les sauts, les réceptions et les changements de direction pour préparer le terrain varié.',
        en: 'Add hops, landings and changes of direction to prepare for varied terrain.',
      },
      goals: [
        { fr: 'Stabiliser la cheville lors des réceptions.', en: 'Stabilise the ankle on landing.' },
        { fr: 'Reprendre le trail sans dérobement.', en: 'Return to trail running without giving way.' },
      ],
      exercises: [
        { exerciseId: 'hop-stabilization', priority: 1, startLevel: 1 },
        { exerciseId: 'line-hops', priority: 1, startLevel: 1 },
        { exerciseId: 'star-excursion-reach', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-balance', priority: 2, startLevel: 4 },
        { exerciseId: 'pogo-hops', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Reprenez le trail progressivement ; continuez l’équilibre 2 à 3 fois par semaine pendant au moins plusieurs mois.',
        en: 'Return to trails gradually; keep balance work 2 to 3 times a week for at least several months.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Après une nouvelle entorse : impossibilité de faire 4 pas, douleur sur l’os de la malléole ou du pied (radiographie possible).', en: 'After a new sprain: inability to take 4 steps, or pain on the ankle or foot bones (an X-ray may be needed).' },
    { fr: 'Blocages, craquements douloureux ou gonflement persistant de la cheville.', en: 'Catching, painful clicking or persistent ankle swelling.' },
    { fr: 'Engourdissement ou faiblesse du pied.', en: 'Numbness or weakness of the foot.' },
    { fr: 'Dérobements fréquents malgré 3 mois de rééducation bien suivie.', en: 'Frequent giving way despite 3 months of well-followed rehabilitation.' },
  ],
  complementaryAdvice: [
    { fr: 'Une chevillère ou un strapping réduit le risque de nouvelle entorse, en complément des exercices.', en: 'An ankle brace or taping reduces the risk of a new sprain, alongside exercise.' },
    { fr: 'En trail, raccourcissez la foulée dans les descentes techniques.', en: 'On trails, shorten your stride on technical descents.' },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'martin-2021',
        finding: {
          fr: 'La recommandation JOSPT 2021 recommande fortement (grade A) les programmes d’équilibre et de proprioception, ainsi que les chevillères ou strappings, pour prévenir la récidive d’entorse.',
          en: 'The 2021 JOSPT guideline strongly recommends (grade A) balance and proprioceptive programmes, as well as bracing or taping, to prevent recurrent sprains.',
        },
      },
      {
        refId: 'doherty-2017',
        finding: {
          fr: 'Cette synthèse de 46 revues retrouve des preuves fortes pour les orthèses et modérées pour le travail neuromusculaire dans la prévention des récidives.',
          en: 'This overview of 46 reviews found strong evidence for bracing and moderate evidence for neuromuscular training in preventing recurrence.',
        },
      },
      {
        refId: 'hupperets-2009',
        finding: {
          fr: 'Chez 522 sportifs, 8 semaines de proprioception à domicile après une entorse ont réduit les récidives de 35 % sur un an.',
          en: 'In 522 athletes, 8 weeks of home proprioceptive training after a sprain reduced recurrences by 35% over one year.',
        },
      },
      {
        refId: 'hall-2015',
        finding: {
          fr: 'Chez 39 personnes avec instabilité chronique, 6 semaines de renforcement ont amélioré la force et la sensation d’instabilité, mais pas les tests de saut : d’où l’intérêt d’ajouter des exercices dynamiques.',
          en: 'In 39 people with chronic instability, 6 weeks of strengthening improved strength and perceived instability but not hop tests, hence the value of adding dynamic exercises.',
        },
      },
    ],
  },
});
