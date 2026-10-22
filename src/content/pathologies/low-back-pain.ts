/**
 * Lombalgie du coureur et du cycliste (lombalgie commune, non spécifique).
 */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'low-back-pain',
  region: 'trunk-upper',
  bodyAreas: ['lower-back'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Lombalgie du coureur et du cycliste',
    en: 'Low back pain in runners and cyclists',
  },
  aka: [
    { fr: 'Mal de dos, douleur lombaire', en: 'Lower back pain, backache' },
    { fr: 'Lombalgie commune (non spécifique)', en: 'Non-specific low back pain' },
  ],
  description: {
    fr: 'La plupart des douleurs du bas du dos ne sont pas liées à une lésion grave : le dos devient sensible quand la charge (heures en selle, volume de course, fatigue, stress) dépasse ce qu’il tolère pour le moment. Il se renforce et se désensibilise avec le mouvement et l’exercice progressif, pas avec le repos.',
    en: 'Most lower back pain is not caused by serious damage: the back becomes sensitive when load (hours in the saddle, running volume, fatigue, stress) exceeds what it currently tolerates. It gets stronger and less sensitive with movement and progressive exercise, not with rest.',
  },
  recognize: {
    fr: 'Douleur ou raideur dans le bas du dos, parfois d’un seul côté, qui peut s’installer au fil d’une longue sortie penchée sur le vélo ou après la course, et qui varie selon les positions et les mouvements.',
    en: 'Pain or stiffness in the lower back, sometimes on one side, that may build up during a long ride bent over the bike or after a run, and that changes with posture and movement.',
  },
  symptoms: [
    { fr: 'Douleur ou raideur du bas du dos, parfois étendue à la fesse.', en: 'Lower back pain or stiffness, sometimes spreading to the buttock.' },
    { fr: 'Gêne qui augmente avec la durée en position penchée sur le vélo.', en: 'Discomfort that builds up with time in the forward-leaning position on the bike.' },
    { fr: 'Raideur au réveil ou en se relevant après être resté assis.', en: 'Stiffness on waking or when getting up after sitting.' },
    { fr: 'Douleur qui varie selon les mouvements et qui se calme souvent en bougeant.', en: 'Pain that changes with movement and often eases as you get moving.' },
  ],
  riskFactors: [
    { fr: 'Antécédent de lombalgie.', en: 'Previous episode of low back pain.' },
    { fr: 'Augmentation rapide des heures en selle ou du volume de course.', en: 'Rapid increase in hours in the saddle or running volume.' },
    { fr: 'Cintre trop bas ou trop éloigné, qui augmente la flexion du bas du dos sur le vélo.', en: 'Handlebars too low or too far away, increasing lower-back flexion on the bike.' },
    { fr: 'Manque d’endurance des muscles du dos et du tronc.', en: 'Poor endurance of the back and trunk muscles.' },
    { fr: 'Fatigue, manque de sommeil et stress, qui augmentent la sensibilité à la douleur.', en: 'Fatigue, poor sleep and stress, which increase pain sensitivity.' },
  ],
  caveat: {
    fr: 'Cette fiche concerne la lombalgie commune. Une douleur qui descend sous le genou, ou accompagnée d’engourdissements ou de perte de force, demande un avis médical.',
    en: 'This page covers common low back pain. Pain that travels below the knee, or comes with numbness or weakness, needs a medical opinion.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On reste actif et on bouge le dos dans les amplitudes confortables, avec des exercices doux de contrôle du tronc.',
        en: 'Stay active and move the back within comfortable ranges, with gentle trunk-control exercises.',
      },
      goals: [
        { fr: 'Rester actif au quotidien et éviter le repos au lit.', en: 'Stay active day to day and avoid bed rest.' },
        { fr: 'Retrouver de la mobilité et la confiance dans le mouvement.', en: 'Regain mobility and confidence in movement.' },
      ],
      exercises: [
        { exerciseId: 'cat-cow', priority: 1, startLevel: 1 },
        { exerciseId: 'bird-dog', priority: 1, startLevel: 1 },
        { exerciseId: 'dead-bug', priority: 2, startLevel: 1 },
        { exerciseId: 'mcgill-curl-up', priority: 2, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 1 },
        {
          exerciseId: 'side-plank',
          priority: 3,
          startLevel: 1,
          dosage: { sets: 3, holdSec: 15, restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
      ],
      avoid: [
        {
          exerciseId: 'rollout',
          reason: {
            fr: 'Exercice très exigeant pour le tronc : à garder pour quand les gainages sont bien tolérés.',
            en: 'Very demanding trunk exercise: keep it for when planks are well tolerated.',
          },
        },
        {
          exerciseId: 'deadlift',
          reason: {
            fr: 'Charge lourde prématurée : l’apprentissage de la charnière de hanche vient d’abord.',
            en: 'Heavy loading too early: learning the hip hinge comes first.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Les gestes du quotidien (se pencher, s’habiller, sortir de voiture) redeviennent faciles.', en: 'Everyday tasks (bending, dressing, getting out of a car) become easy again.' },
        { fr: '30 minutes de marche, de vélo ou de course facile sans augmentation des symptômes le lendemain.', en: '30 minutes of walking, cycling or easy running without increased symptoms the next day.' },
        { fr: 'Bird dog bras-jambe opposés et dead bug réalisés lentement, sans appréhension.', en: 'Opposite arm-and-leg bird dog and dead bug done slowly, without apprehension.' },
      ],
      loadAdvice: {
        fr: 'Continuez à marcher, rouler ou courir en facile si c’est toléré, en réduisant la durée et l’intensité. Sur le vélo, une position temporairement plus relevée (cintre remonté) et des sorties plus courtes soulagent souvent.',
        en: 'Keep walking, riding or running easy if tolerated, with shorter, gentler sessions. On the bike, a temporarily more upright position (raised bars) and shorter rides often help.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit progressivement la force et l’endurance du tronc, du dos et des hanches.',
        en: 'Progressively rebuild strength and endurance of the trunk, back and hips.',
      },
      goals: [
        { fr: 'Retrouver l’endurance des extenseurs du dos et des gainages, symétrique des deux côtés.', en: 'Regain back-extensor and plank endurance, symmetrical on both sides.' },
        { fr: 'Reprendre le volume habituel de course ou de vélo.', en: 'Return to usual running or cycling volume.' },
      ],
      exercises: [
        { exerciseId: 'back-extension', priority: 1, startLevel: 2 },
        { exerciseId: 'front-plank', priority: 1, startLevel: 2 },
        { exerciseId: 'side-plank', priority: 1, startLevel: 2 },
        { exerciseId: 'bird-dog', priority: 2, startLevel: 2 },
        { exerciseId: 'pallof-press', priority: 2, startLevel: 2 },
        {
          exerciseId: 'romanian-deadlift',
          priority: 2,
          startLevel: 1,
          note: {
            fr: 'Commencez par la charnière de hanche sans charge, dos neutre, avant d’ajouter du poids.',
            en: 'Start with the unloaded hip hinge, back neutral, before adding weight.',
          },
        },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 2 },
        { exerciseId: 'thoracic-rotation', priority: 3, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'deadlift',
          reason: {
            fr: 'Le soulevé de terre lourd vient après la maîtrise de la charnière et du soulevé jambes tendues.',
            en: 'The heavy deadlift comes after mastering the hinge and the Romanian deadlift.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Gainage ventral et gainages latéraux tenus 45 s, avec moins de 10 s d’écart entre les côtés.', en: 'Front plank and side planks held for 45 s, with less than 10 s difference between sides.' },
        { fr: 'Maintien horizontal en extension du dos tenu 60 s.', en: 'Horizontal back-extension hold held for 60 s.' },
        { fr: 'Volume habituel de course ou de vélo repris sans regain de symptômes le lendemain.', en: 'Usual running or cycling volume resumed without symptoms flaring the next day.' },
      ],
      loadAdvice: {
        fr: 'Augmentez la durée des sorties avant l’intensité. Réintroduisez progressivement les longues sorties en position basse sur le vélo et les côtes en course.',
        en: 'Increase session duration before intensity. Gradually reintroduce long rides in a low position on the bike and hills when running.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare le dos aux efforts intenses et longs, et on garde un renforcement régulier pour limiter les récidives.',
        en: 'Prepare the back for long and hard efforts, and keep strengthening regularly to limit recurrences.',
      },
      goals: [
        { fr: 'Tolérer les charges lourdes et les efforts intenses.', en: 'Tolerate heavy loads and hard efforts.' },
        { fr: 'Installer un renforcement d’entretien deux fois par semaine.', en: 'Set up maintenance strengthening twice a week.' },
      ],
      exercises: [
        { exerciseId: 'romanian-deadlift', priority: 1, startLevel: 2 },
        { exerciseId: 'suitcase-carry', priority: 1, startLevel: 2 },
        { exerciseId: 'back-extension', priority: 1, startLevel: 4 },
        { exerciseId: 'rollout', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-deadlift', priority: 2, startLevel: 2 },
        { exerciseId: 'woodchop', priority: 3, startLevel: 2 },
        { exerciseId: 'deadlift', priority: 3, startLevel: 2 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez au moins deux séances de renforcement par semaine après la disparition de la douleur : l’exercice réduit le risque d’un nouvel épisode.',
        en: 'Keep at least two strengthening sessions a week after the pain has gone: exercise reduces the risk of a new episode.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Perte de force dans une jambe ou un pied (pied qui accroche, genou qui lâche).', en: 'Weakness in a leg or foot (foot catching, knee giving way).' },
    { fr: 'Engourdissement du périnée ou de la zone de la selle (entre les cuisses, autour de l’anus) : consultez en urgence.', en: 'Numbness in the perineum or saddle area (between the thighs, around the anus): seek urgent care.' },
    { fr: 'Troubles urinaires ou fécaux nouveaux (difficulté à uriner, fuites) : consultez en urgence.', en: 'New bladder or bowel problems (difficulty passing urine, incontinence): seek urgent care.' },
    { fr: 'Fièvre, perte de poids inexpliquée ou antécédent de cancer.', en: 'Fever, unexplained weight loss or a history of cancer.' },
    { fr: 'Douleur apparue après une chute ou un traumatisme.', en: 'Pain that started after a fall or other trauma.' },
    { fr: 'Douleur nocturne qui ne change pas avec les positions, ou douleur constante au repos.', en: 'Night pain that does not change with position, or constant pain at rest.' },
    { fr: 'Douleur qui descend sous le genou, avec ou sans fourmillements.', en: 'Pain travelling below the knee, with or without pins and needles.' },
    { fr: 'Pas d’amélioration nette après 4 à 6 semaines d’activité et d’exercices bien conduits.', en: 'No clear improvement after 4 to 6 weeks of well-conducted activity and exercise.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Hauteur de selle : une selle trop haute fait basculer le bassin à chaque coup de pédale, une selle trop basse referme les hanches et arrondit le dos. Le recul de selle doit permettre d’atteindre le cintre sans tendre les bras ni s’étirer.',
      en: 'Saddle height: a saddle too high makes the pelvis rock with each pedal stroke, too low closes the hips and rounds the back. Saddle setback should let you reach the bars without locking your arms or stretching.',
    },
    {
      fr: 'Cintre trop bas ou trop loin : il augmente la flexion du bas du dos. Remonter le cintre, raccourcir la potence ou rouler davantage les mains sur les cocottes soulage souvent.',
      en: 'Handlebars too low or too far: they increase lower-back flexion. Raising the bars, fitting a shorter stem or riding more on the hoods often helps.',
    },
    {
      fr: 'Inclinaison de la selle : une selle légèrement inclinée vers l’avant a soulagé une majorité de cyclistes dans une étude. En cas de doute, une étude posturale est utile.',
      en: 'Saddle tilt: a slightly nose-down saddle relieved most cyclists in one study. If in doubt, a professional bike fit is useful.',
    },
    {
      fr: 'Gestion de la charge : augmentez progressivement la durée des sorties et le temps passé en position basse ; levez-vous de la selle et changez de position régulièrement sur les longues sorties.',
      en: 'Load management: increase ride duration and time in a low position gradually; stand up and change position regularly on long rides.',
    },
    {
      fr: 'Course à pied : la course facile est en général bien tolérée et bénéfique pour le dos. Réduisez temporairement les côtes, la vitesse et le volume si la douleur augmente le lendemain.',
      en: 'Running: easy running is generally well tolerated and good for the back. Temporarily cut back on hills, speed and volume if pain increases the next day.',
    },
    {
      fr: 'Le type d’exercice importe moins que la régularité : choisissez ceux que vous aimez et que vous ferez vraiment.',
      en: 'The type of exercise matters less than consistency: choose the ones you enjoy and will actually do.',
    },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'george-2021',
        finding: {
          fr: 'La recommandation JOSPT 2021 préconise l’exercice (renforcement et endurance du tronc, exercice aérobie, exercice général…) dans la lombalgie chronique (grade A), sans supériorité nette d’un type d’exercice sur un autre.',
          en: 'The 2021 JOSPT guideline recommends exercise (trunk strengthening and endurance, aerobic exercise, general exercise…) for chronic low back pain (grade A), with no clear superiority of one exercise type over another.',
        },
      },
      {
        refId: 'hayden-2021',
        finding: {
          fr: 'Sur 249 essais, l’exercice réduit probablement la douleur lombaire chronique de façon cliniquement importante par rapport à l’absence de traitement ou aux soins habituels (certitude modérée).',
          en: 'Across 249 trials, exercise probably reduces chronic low back pain to a clinically important degree compared with no treatment or usual care (moderate certainty).',
        },
      },
      {
        refId: 'hayden-2021-b',
        finding: {
          fr: 'Dans cette méta-analyse en réseau (217 essais), la plupart des types d’exercice étaient efficaces ; Pilates, McKenzie et restauration fonctionnelle semblaient un peu plus efficaces, mais les auteurs conseillent l’exercice que l’on aime pour favoriser l’assiduité.',
          en: 'In this network meta-analysis (217 trials), most exercise types were effective; Pilates, McKenzie and functional restoration appeared somewhat more effective, but the authors advise the exercise people enjoy to support adherence.',
        },
      },
      {
        refId: 'saragiotto-2016',
        finding: {
          fr: 'Les exercices de contrôle moteur donnent des résultats similaires aux autres formes d’exercice : le choix peut dépendre des préférences, du coût et de la sécurité.',
          en: 'Motor control exercises give similar outcomes to other forms of exercise: the choice can depend on preferences, cost and safety.',
        },
      },
      {
        refId: 'dahm-2010',
        finding: {
          fr: 'Dans la lombalgie aiguë, le conseil de rester actif apporte un petit bénéfice sur la douleur et la fonction par rapport au repos au lit.',
          en: 'In acute low back pain, advice to stay active gives a small benefit in pain and function compared with bed rest.',
        },
      },
      {
        refId: 'steffens-2016',
        finding: {
          fr: 'L’exercice, seul ou associé à l’éducation, réduit le risque d’un nouvel épisode de lombalgie ; ceintures lombaires et semelles ne le réduisent pas.',
          en: 'Exercise, alone or combined with education, reduces the risk of a new episode of low back pain; back belts and insoles do not.',
        },
      },
      {
        refId: 'streisfeld-2017',
        finding: {
          fr: 'Chez les cyclistes, un cintre plus bas augmentait la flexion lombo-sacrée ; ceux qui souffraient du dos avaient plus de flexion lombaire et moins d’endurance des extenseurs du dos.',
          en: 'In cyclists, lower handlebars increased lumbosacral flexion; those with back pain showed more lumbar flexion and less back-extensor endurance.',
        },
      },
      {
        refId: 'van-hoof-2012',
        finding: {
          fr: 'Sur 2 h de vélo en extérieur, 8 cyclistes lombalgiques restaient plus fléchis au bas du dos que 9 cyclistes sans douleur, et leur douleur augmentait au fil de la sortie.',
          en: 'Over a 2-hour outdoor ride, 8 cyclists with low back pain stayed more flexed in the lower back than 9 pain-free cyclists, and their pain increased during the ride.',
        },
      },
      {
        refId: 'salai-1999',
        finding: {
          fr: 'Après réglage de l’inclinaison de la selle vers l’avant, plus de 70 % des cyclistes lombalgiques d’un club ont rapporté une nette amélioration de leur douleur.',
          en: 'After adjusting the saddle to tilt slightly forward, more than 70% of club cyclists with low back pain reported a major improvement in their pain.',
        },
      },
      {
        refId: 'maselli-2020',
        finding: {
          fr: 'La lombalgie est peu fréquente chez les coureurs par rapport aux autres blessures de la course et aux autres sportifs : la course pourrait même protéger le dos.',
          en: 'Low back pain is uncommon in runners compared with other running injuries and other athletes: running may even protect the back.',
        },
      },
    ],
  },
});
