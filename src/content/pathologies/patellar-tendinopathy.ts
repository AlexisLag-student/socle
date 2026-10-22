/**
 * Tendinopathie rotulienne (tendon patellaire), course et vélo.
 */
import { definePathology } from '@/domain/schema';
import { freq, load, symptomGuided } from '../helpers';

export default definePathology({
  id: 'patellar-tendinopathy',
  region: 'knee',
  bodyAreas: ['knee-anterior'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie rotulienne',
    en: 'Patellar tendinopathy',
  },
  aka: [{ fr: 'Tendinite rotulienne, genou du sauteur', en: 'Patellar tendinitis, jumper’s knee' }],
  description: {
    fr: 'Le tendon rotulien, sous la rotule, réagit à une charge trop importante ou trop rapide pour sa capacité du moment, surtout lors des sauts, des accélérations et des descentes. Il se renforce avec une charge progressive : d’abord isométrique, puis lourde et lente, puis rapide.',
    en: 'The patellar tendon, below the kneecap, reacts to load that is too high or increased too quickly for its current capacity, especially jumping, accelerating and downhill running. It gets stronger with progressive loading: isometric first, then heavy and slow, then fast.',
  },
  recognize: {
    fr: 'Douleur bien localisée juste sous la rotule, que l’on peut pointer du doigt, qui augmente avec l’intensité de l’effort du quadriceps (sauts, sprints, côtes, squats profonds) et qui est souvent plus marquée au début de l’effort et le lendemain.',
    en: 'Well-localised pain just below the kneecap that you can point to with a finger, which increases with the intensity of quadriceps effort (jumps, sprints, hills, deep squats) and is often worse at the start of activity and the next day.',
  },
  symptoms: [
    { fr: 'Douleur précise à la pointe de la rotule.', en: 'Precise pain at the tip of the kneecap.' },
    { fr: 'Douleur qui augmente avec la vitesse, les sauts et les squats profonds.', en: 'Pain that increases with speed, jumps and deep squats.' },
    { fr: 'Raideur en début d’effort, qui peut s’atténuer en s’échauffant puis revenir après.', en: 'Stiffness at the start of activity that may ease when warm, then return afterwards.' },
    { fr: 'Gêne en position assise prolongée ou en montant les escaliers.', en: 'Discomfort after prolonged sitting or climbing stairs.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide des sauts, sprints, côtes ou séances de fractionné.', en: 'Rapid increase in jumps, sprints, hills or interval sessions.' },
    { fr: 'Manque de force du quadriceps.', en: 'Insufficient quadriceps strength.' },
    { fr: 'À vélo : gros braquets, travail de force en côte, selle trop basse ou trop avancée.', en: 'On the bike: big gears, low-cadence climbing efforts, saddle too low or too far forward.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme le tendon sans l’arrêter : isométrie quotidienne du quadriceps et réduction des efforts rapides.',
        en: 'Settle the tendon without stopping it: daily quadriceps isometrics and fewer fast efforts.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité du tendon.', en: 'Reduce tendon sensitivity.' },
        { fr: 'Maintenir une charge tolérée tous les jours.', en: 'Maintain a tolerated load every day.' },
      ],
      exercises: [
        {
          exerciseId: 'isometric-knee-extension',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 5, holdSec: 45, restSec: 120, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
        },
        { exerciseId: 'spanish-squat', priority: 1, startLevel: 1 },
        { exerciseId: 'wall-sit', priority: 2, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'countermovement-jump', reason: { fr: 'Les sauts chargent fortement le tendon : à réintroduire en fin de rééducation.', en: 'Jumps load the tendon heavily: bring them back at the end of rehab.' } },
        { exerciseId: 'box-jump', reason: { fr: 'Les sauts chargent fortement le tendon : à réintroduire en fin de rééducation.', en: 'Jumps load the tendon heavily: bring them back at the end of rehab.' } },
        { exerciseId: 'reverse-nordic', reason: { fr: 'Charge élevée du tendon en position étirée.', en: 'High tendon load in a lengthened position.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'La douleur sous la rotule diminue d’une semaine à l’autre.', en: 'Pain below the kneecap decreases week after week.' },
        { fr: '3 × 15 squats sur chaise sans douleur croissante le lendemain.', en: '3 × 15 box squats without increasing next-day pain.' },
      ],
      loadAdvice: {
        fr: 'La course facile et le vélo souple peuvent souvent continuer si la gêne reste modérée et revient à la normale le lendemain ; suspendez fractionné, côtes, sauts et gros braquets.',
        en: 'Easy running and easy spinning can often continue if discomfort stays moderate and settles by the next day; pause intervals, hills, jumps and big gears.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit la force : charge lourde et lente du quadriceps, 3 fois par semaine, avec une charge qui augmente au fil des semaines.',
        en: 'Rebuild strength: heavy slow quadriceps loading, 3 times a week, with load increasing over the weeks.',
      },
      goals: [
        { fr: 'Augmenter progressivement la charge sur le tendon.', en: 'Progressively increase tendon load.' },
        { fr: 'Retrouver une force du quadriceps symétrique.', en: 'Regain symmetrical quadriceps strength.' },
      ],
      exercises: [
        {
          exerciseId: 'leg-press',
          priority: 1,
          startLevel: 3,
          dosage: { sets: 4, reps: [6, 15], tempo: '3-0-3', restSec: 150, perSide: false, intensity: load('Charge lourde : de 15 à 6 répétitions maximum au fil des semaines', 'Heavy load: from 15 down to 6 repetition maximum over the weeks'), frequency: freq.threePerWeek },
        },
        { exerciseId: 'squat', priority: 1, startLevel: 2 },
        { exerciseId: 'split-squat', priority: 2, startLevel: 2 },
        { exerciseId: 'leg-extension', priority: 2, startLevel: 3 },
        {
          exerciseId: 'decline-squat',
          priority: 3,
          startLevel: 1,
          note: { fr: 'Alternative excentrique possible si vous n’avez pas accès à une salle.', en: 'Possible eccentric alternative if you have no gym access.' },
        },
      ],
      avoid: [
        { exerciseId: 'countermovement-jump', reason: { fr: 'Sauts réservés à la phase de reprise.', en: 'Jumps are kept for the return phase.' } },
      ],
      nextPhaseCriteria: [
        { fr: '4 × 8 répétitions lourdes et lentes sans augmentation de la douleur le lendemain.', en: '4 × 8 heavy slow reps without increased next-day pain.' },
        { fr: 'Squat unipodal sur chaise réalisable sans douleur gênante, symétrique.', en: 'Single-leg box squat possible without bothersome pain, symmetrical.' },
      ],
      loadAdvice: {
        fr: 'Reprenez la course continue, puis les côtes douces. Espacez de 48 h les séances lourdes et les séances les plus intenses.',
        en: 'Resume continuous running, then gentle hills. Space heavy strength sessions and hard sessions 48 h apart.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On réapprend au tendon à stocker et restituer l’énergie : sauts progressifs, puis vitesse et gestes du sport, en gardant la force lourde.',
        en: 'Retrain the tendon to store and release energy: progressive jumps, then speed and sport-specific work, while keeping heavy strength.',
      },
      goals: [
        { fr: 'Tolérer sauts, sprints et côtes.', en: 'Tolerate jumps, sprints and hills.' },
        { fr: 'Reprendre l’entraînement habituel.', en: 'Return to usual training.' },
      ],
      exercises: [
        { exerciseId: 'countermovement-jump', priority: 1, startLevel: 1 },
        { exerciseId: 'single-leg-squat', priority: 1, startLevel: 2 },
        { exerciseId: 'leg-press', priority: 2, startLevel: 4 },
        { exerciseId: 'box-jump', priority: 2, startLevel: 1 },
        { exerciseId: 'lunge', priority: 3, startLevel: 2 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Introduisez les sauts un jour sur deux ou trois, à faible volume, et augmentez-les seulement si la douleur du lendemain reste stable. Gardez la force lourde deux fois par semaine.',
        en: 'Introduce jumps every second or third day at low volume, and increase them only if next-day pain stays stable. Keep heavy strength twice a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement brutal sous la rotule ou impossibilité de tendre la jambe.', en: 'Sudden snap below the kneecap or inability to straighten the leg.' },
    { fr: 'Genou gonflé, chaud ou rouge, ou fièvre.', en: 'Swollen, hot or red knee, or fever.' },
    { fr: 'Genou qui se bloque ou se dérobe.', en: 'Knee that locks or gives way.' },
    { fr: 'Douleur la nuit ou au repos complet.', en: 'Pain at night or at complete rest.' },
    { fr: 'Chez l’adolescent, douleur sur la bosse sous le genou (tubérosité tibiale) : avis médical.', en: 'In adolescents, pain on the bump below the knee (tibial tuberosity): seek medical advice.' },
    { fr: 'Pas d’amélioration après 12 semaines de renforcement bien conduit.', en: 'No improvement after 12 weeks of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    {
      fr: 'La rééducation d’un tendon rotulien est souvent longue (plusieurs mois) : la régularité des séances compte plus que leur intensité.',
      en: 'Patellar tendon rehab often takes months: consistency matters more than intensity.',
    },
    {
      fr: 'À vélo, privilégiez une cadence plus élevée avec de petits braquets et faites vérifier la hauteur et le recul de selle.',
      en: 'On the bike, favour a higher cadence in easier gears and have saddle height and setback checked.',
    },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'kongsgaard-2009',
        finding: {
          fr: 'Chez 39 hommes, la charge lourde et lente comme le squat excentrique sur plan incliné ont amélioré fonction et douleur à 12 semaines avec des résultats maintenus à 6 mois, contrairement aux infiltrations de corticoïdes ; la charge lourde et lente a donné la meilleure satisfaction.',
          en: 'In 39 men, heavy slow resistance and eccentric decline squats both improved function and pain at 12 weeks with results maintained at 6 months, unlike corticosteroid injections; heavy slow resistance gave the highest satisfaction.',
        },
      },
      {
        refId: 'breda-2021',
        finding: {
          fr: 'Chez 76 patients, un programme de charge progressive en plusieurs étapes, jusqu’aux sauts et aux gestes du sport, a donné de meilleurs résultats à 24 semaines que l’excentrique seul.',
          en: 'In 76 patients, a staged progressive loading programme, progressing to jumps and sport-specific tasks, gave better 24-week results than eccentric training alone.',
        },
      },
      {
        refId: 'lim-2018',
        finding: {
          fr: 'Cette revue de 15 études conclut que l’isométrie soulage la douleur à court terme, y compris en saison, alors que la charge lourde et lente ou l’excentrique conviennent mieux pour réduire la douleur et améliorer la fonction à long terme.',
          en: 'This review of 15 studies concludes that isometrics relieve pain in the short term, including in-season, while heavy slow resistance or eccentric training are better suited to long-term pain reduction and function.',
        },
      },
      {
        refId: 'rio-2015',
        finding: {
          fr: 'Une séance de contractions isométriques a réduit la douleur du tendon pendant au moins 45 minutes chez 6 volleyeurs.',
          en: 'One session of isometric contractions reduced tendon pain for at least 45 minutes in 6 volleyball players.',
        },
      },
      {
        refId: 'malliaras-2015',
        finding: {
          fr: 'La prise en charge doit développer progressivement la tolérance du tendon, des muscles et de toute la chaîne à la charge, en évitant les attentes de délai irréalistes et les traitements uniquement passifs.',
          en: 'Management should progressively build the load tolerance of the tendon, muscles and whole kinetic chain, avoiding unrealistic timeframes and over-reliance on passive treatments.',
        },
      },
    ],
  },
});
