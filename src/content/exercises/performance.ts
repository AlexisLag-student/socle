/**
 * Exercices — performance : force maximale, puissance, pliométrie, économie de course, sprint et force-vélocité.
 * Références dans src/content/references/performance.ts (toutes vérifiées sur PubMed, résumé lu).
 */
import { defineExercise } from '@/domain/schema';
import type { L } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe } from '../helpers';

/** Intensité des sauts : intention maximale, qualité avant tout. */
const maxIntent = () =>
  load(
    'Intention maximale ; arrêtez la série dès que la hauteur, la distance ou la qualité de réception baisse',
    'Maximal intent; stop the set as soon as height, distance or landing quality drops',
  );

/** Précautions communes à la pliométrie et à la force lourde. */
const plyo = {
  prerequisite: {
    fr: 'Prérequis : une base de force (squats, fentes et montées sur pointes sur une jambe maîtrisés) avant de passer aux sauts enchaînés.',
    en: 'Prerequisite: a strength base (controlled squats, lunges and single-leg calf raises) before moving on to repeated jumps.',
  } satisfies L,
  surface: {
    fr: 'Sol souple mais stable (piste, herbe rase, sol sportif) et chaussures de sport ; évitez le béton et les surfaces glissantes.',
    en: 'Use a firm but forgiving surface (track, short grass, sports floor) and trainers; avoid concrete and slippery ground.',
  } satisfies L,
  volume: {
    fr: 'Comptez les contacts au sol, placez les sauts en début de séance, au repos, et à distance d’une séance de course intense. Récupération complète entre les séries.',
    en: 'Count ground contacts, do jumps early in the session while fresh, and away from a hard run. Take full recovery between sets.',
  } satisfies L,
  tendon: {
    fr: 'Pas de sauts pendant une phase douloureuse d’un tendon (Achille, rotulien) ou en cas de douleur osseuse : reprenez d’abord le renforcement lent.',
    en: 'No jumping during a painful tendon phase (Achilles, patellar) or with bone pain: go back to slow strength work first.',
  } satisfies L,
} as const;

const heavy = {
  technique: {
    fr: 'Apprenez la technique avec une charge légère, idéalement avec un coach, et faites 2 ou 3 séries de montée en charge avant les séries lourdes.',
    en: 'Learn the technique with a light load, ideally with a coach, and do 2 or 3 ramp-up sets before the heavy sets.',
  } satisfies L,
  scheduling: {
    fr: 'Évitez de placer une séance lourde juste avant une séance de course ou de vélo intense.',
    en: 'Avoid scheduling a heavy session right before a hard run or ride.',
  } satisfies L,
} as const;

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'deadlift',
    family: 'hip-hinge-bilateral',
    name: { fr: 'Soulevé de terre', en: 'Deadlift' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes', 'thigh', 'trunk'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'biceps-femoris', 'semitendinosus', 'adductor-magnus'],
      secondary: ['semimembranosus', 'vastus-lateralis', 'vastus-medialis', 'erector-spinae', 'multifidus', 'trapezius-upper', 'forearm-flexors'],
    },
    zoom: 'leg-back',
    qualities: ['strength'],
    objectives: ['performance'],
    perfGoals: ['strength', 'running-economy', 'sprint-fv'],
    why: {
      fr: 'Les fessiers et les ischio-jambiers étendent la hanche : ils propulsent le coureur vers l’avant et appuient sur la pédale lors de la poussée. Le soulevé de terre les renforce lourdement, dos gainé, en un seul geste.',
      en: 'The glutes and hamstrings extend the hip: they drive the runner forward and push down on the pedal. The deadlift loads them heavily, with a braced back, in a single movement.',
    },
    how: {
      setup: {
        fr: 'Pieds à largeur de hanches, charge au-dessus du milieu du pied, tibias proches de la barre. Reculez les fesses pour vous pencher, saisissez la charge mains juste à l’extérieur des genoux, dos plat, poitrine ouverte.',
        en: 'Feet hip-width apart, load over mid-foot, shins close to the bar. Push your hips back to lean forward, grip the load just outside the knees, back flat, chest open.',
      },
      movement: {
        fr: 'Poussez le sol avec les pieds et montez en gardant la charge collée aux jambes jusqu’à être debout, hanches et genoux tendus. Redescendez par le même chemin : fesses vers l’arrière d’abord, puis pliez les genoux une fois la charge passée sous les genoux.',
        en: 'Push the floor away and stand up, keeping the load against your legs, until hips and knees are straight. Lower along the same path: hips back first, then bend the knees once the load passes below them.',
      },
      cues: [
        { fr: 'Dos neutre du début à la fin : c’est la hanche qui bouge, pas le bas du dos.', en: 'Neutral back from start to finish: the hips move, not the lower back.' },
        { fr: 'La charge reste au contact des jambes.', en: 'Keep the load in contact with your legs.' },
        { fr: 'Poussez le sol plutôt que de tirer la barre.', en: 'Push the floor away rather than pulling the bar.' },
        { fr: 'Finissez debout, fesses serrées, sans vous pencher en arrière.', en: 'Finish tall, glutes squeezed, without leaning back.' },
      ],
      breathing: {
        fr: 'Inspirez et gainez le ventre avant de décoller la charge, soufflez en haut ou une fois la charge reposée.',
        en: 'Breathe in and brace before lifting, breathe out at the top or once the load is back down.',
      },
    },
    mistakes: [
      { fr: 'Arrondir le bas du dos au départ ou en fin de série.', en: 'Rounding the lower back at the start or late in the set.' },
      { fr: 'Laisser la charge s’éloigner des jambes.', en: 'Letting the load drift away from the legs.' },
      { fr: 'Monter les hanches avant les épaules : le dos fait alors tout le travail.', en: 'Hips rising before the shoulders, leaving the back to do all the work.' },
      { fr: 'Se cambrer en arrière en haut du mouvement.', en: 'Leaning back at the top.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Charnière de hanche au bâton', en: 'Hip hinge with a dowel' },
        description: {
          fr: 'Sans charge, un bâton le long du dos (contact tête, haut du dos et bas du dos) : penchez le buste en reculant les fesses, puis revenez debout.',
          en: 'No load, a dowel along your back (touching head, upper back and lower back): lean forward by pushing the hips back, then stand up.',
        },
        mastery: {
          fr: '3 × 10 en gardant les trois points de contact du bâton, sans gêne dans le bas du dos.',
          en: '3 × 10 keeping all three dowel contact points, with no lower-back discomfort.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Kettlebell ou haltères', en: 'Kettlebell or dumbbells' },
        description: {
          fr: 'Soulevé de terre avec une kettlebell entre les pieds ou deux haltères le long des jambes, charge modérée.',
          en: 'Deadlift with a kettlebell between the feet or two dumbbells along the legs, moderate load.',
        },
        mastery: {
          fr: '3 × 8 avec 3 répétitions en réserve et une technique identique sur toutes les répétitions.',
          en: '3 × 8 with 3 reps in reserve and identical technique on every rep.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1', restSec: 90, perSide: false, intensity: rir('3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Trap bar ou barre surélevée', en: 'Trap bar or raised bar' },
        description: {
          fr: 'Barre hexagonale (trap bar), ou barre droite posée sur des disques ou des blocs pour réduire l’amplitude. Charge plus lourde, montée volontairement rapide.',
          en: 'Hex (trap) bar, or a straight bar raised on plates or blocks to shorten the range. Heavier load, deliberately fast lift.',
        },
        mastery: {
          fr: '4 × 6 avec 2 à 3 répétitions en réserve, dos neutre et vitesse de montée constante.',
          en: '4 × 6 with 2–3 reps in reserve, neutral back and consistent lifting speed.',
        },
        dosage: { sets: 4, reps: [5, 6], tempo: '2-0-X', restSec: 150, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Soulevé de terre lourd', en: 'Heavy deadlift' },
        description: {
          fr: 'Depuis le sol, charge permettant 4 à 6 répétitions, intention d’accélérer la charge à chaque montée.',
          en: 'From the floor, a load allowing 4 to 6 reps, aiming to accelerate the load on every lift.',
        },
        mastery: {
          fr: '4 × 5 avec 2 répétitions en réserve et la même vitesse de la première à la dernière répétition.',
          en: '4 × 5 with 2 reps in reserve and the same speed from first to last rep.',
        },
        dosage: { sets: 4, reps: [4, 6], tempo: '2-0-X', restSec: 180, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Force maximale', en: 'Maximal strength' },
        description: {
          fr: 'Charges proches du maximum (environ 85 à 90 % de la charge maximale sur une répétition), 3 à 4 répétitions, récupération complète.',
          en: 'Near-maximal loads (about 85–90% of your one-rep max), 3 to 4 reps, full recovery.',
        },
        mastery: {
          fr: 'Niveau d’entretien : ajoutez 2,5 à 5 kg quand toutes les séries passent avec 2 répétitions en réserve.',
          en: 'Maintenance level: add 2.5–5 kg once every set is done with 2 reps in reserve.',
        },
        dosage: { sets: 5, reps: [3, 4], tempo: '2-0-X', restSec: 180, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Bâton ou manche à balai', en: 'Dowel or broomstick' },
        instructions: { fr: 'Pour apprendre la charnière de hanche (niveau 1).', en: 'To learn the hip hinge (level 1).' },
      },
      {
        id: 'kettlebell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Kettlebell ou haltères', en: 'Kettlebell or dumbbells' },
        instructions: { fr: 'Kettlebell posée entre les pieds, ou un haltère dans chaque main le long des cuisses.', en: 'Kettlebell between the feet, or a dumbbell in each hand alongside the thighs.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre et disques', en: 'Barbell and plates' },
        instructions: { fr: 'Barre au-dessus du milieu du pied ; surélevez-la sur des disques si l’amplitude complète n’est pas maîtrisée.', en: 'Bar over mid-foot; raise it on plates if you cannot yet control the full range.' },
      },
      {
        id: 'trap-bar', equipment: ['gym'], loadable: true, rank: 4,
        name: { fr: 'Trap bar (barre hexagonale)', en: 'Trap bar (hex bar)' },
        instructions: { fr: 'Debout au centre de la barre, poignées hautes au début : position plus droite et plus simple à apprendre.', en: 'Stand in the middle of the bar, high handles at first: a more upright position that is easier to learn.' },
      },
    ],
    precautions: [heavy.technique, heavy.scheduling, caution.painFlare],
    contraindications: [
      {
        fr: 'Douleur lombaire irradiant dans la jambe ou lombalgie aiguë : pas de charge lourde sans avis médical.',
        en: 'Low-back pain radiating into the leg, or acute low-back pain: no heavy loading without medical advice.',
      },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'eihara-2022',
          finding: {
            fr: 'Dans cette méta-analyse (22 études chez des coureurs de fond), la musculation lourde, surtout à charge quasi maximale (≥ 90 % du maximum), a davantage amélioré l’économie de course et le chrono que la pliométrie (effets faibles).',
            en: 'In this meta-analysis (22 studies in distance runners), heavy resistance training, especially near-maximal (≥ 90% 1RM), improved running economy and time-trial performance more than plyometrics (small effects).',
          },
        },
        {
          refId: 'vikmoen-2016',
          finding: {
            fr: 'Chez 19 cyclistes femmes, 11 semaines de musculation lourde ajoutées à l’entraînement habituel ont amélioré la puissance moyenne sur 40 minutes et l’économie de pédalage.',
            en: 'In 19 female cyclists, 11 weeks of heavy strength training added to usual training improved 40-minute mean power and cycling economy.',
          },
        },
        {
          refId: 'ronnestad-2014',
          finding: {
            fr: 'Cette revue conclut que la force lourde ou explosive améliore l’économie de course, et que la force lourde est à privilégier pour l’économie et la performance à vélo.',
            en: 'This review concludes that heavy or explosive strength training improves running economy, and that heavy strength training is preferred for cycling economy and performance.',
          },
        },
        {
          refId: 'blagrove-2018',
          finding: {
            fr: 'Revue de 24 études chez des coureurs de demi-fond et fond : le renforcement améliore en général l’économie de course (2 à 8 %) sans dégrader la composition corporelle ; 2 à 3 séances par semaine variant les méthodes sont recommandées.',
            en: 'Review of 24 studies in middle- and long-distance runners: strength training generally improves running economy (2–8%) without harming body composition; 2–3 varied sessions per week are recommended.',
          },
        },
        {
          refId: 'lauersen-2014',
          finding: {
            fr: 'Dans cette méta-analyse de 25 essais (26 610 participants), le renforcement musculaire a réduit les blessures sportives à moins d’un tiers, et l’ensemble des programmes d’exercice a presque divisé par deux les blessures de surmenage.',
            en: 'In this meta-analysis of 25 trials (26,610 participants), strength training cut sports injuries to less than a third, and exercise programmes overall almost halved overuse injuries.',
          },
        },
        {
          refId: 'beattie-2014',
          finding: {
            fr: 'Cette revue systématique de 26 études chez des athlètes d’endurance entraînés conclut que l’ajout de renforcement améliore l’économie, la puissance musculaire et la performance en contre-la-montre.',
            en: 'This systematic review of 26 studies in trained endurance athletes concludes that adding strength training improves economy, muscle power and time-trial performance.',
          },
        },
        {
          refId: 'suchomel-2016',
          finding: {
            fr: 'Cette revue narrative associe une plus grande force maximale à de meilleures capacités de saut, de sprint et de changement de direction, ainsi qu’à un risque de blessure plus faible (sportifs en général, pas spécifiquement d’endurance).',
            en: 'This narrative review links greater maximal strength to better jumping, sprinting and change-of-direction ability, and to lower injury risk (athletes in general, not specifically endurance athletes).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'countermovement-jump',
    family: 'vertical-jump',
    name: { fr: 'Saut vertical avec contre-mouvement (CMJ)', en: 'Countermovement jump (CMJ)' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'calf', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis', 'soleus'],
      secondary: ['glute-max', 'gastrocnemius-medial', 'gastrocnemius-lateral', 'biceps-femoris', 'achilles-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv', 'running-economy'],
    why: {
      fr: 'Le saut vertical apprend aux cuisses, aux fessiers et aux mollets à produire beaucoup de force en très peu de temps. Cette puissance sert dans les relances, les sprints et les côtes, en course comme à vélo.',
      en: 'The vertical jump trains the thighs, glutes and calves to produce a lot of force very quickly. That power is what you use for surges, sprints and climbs, running or riding.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds à largeur de hanches, bras le long du corps.',
        en: 'Stand with feet hip-width apart, arms by your sides.',
      },
      movement: {
        fr: 'Descendez vite en quart ou demi-squat en lançant les bras vers l’arrière, puis enchaînez sans pause un saut vertical le plus haut possible. Réceptionnez-vous sur l’avant-pied puis le pied entier, genoux et hanches fléchis, et stabilisez 2 secondes.',
        en: 'Dip quickly into a quarter or half squat while swinging the arms back, then jump as high as possible without pausing. Land on the forefoot then the whole foot, knees and hips bent, and hold for 2 seconds.',
      },
      cues: [
        { fr: 'Descente rapide, remontée explosive, sans temps d’arrêt.', en: 'Quick dip, explosive drive, no pause.' },
        { fr: 'Réception silencieuse, genoux au-dessus des pieds.', en: 'Quiet landing, knees over the feet.' },
        { fr: 'Lancez les bras vers le haut.', en: 'Drive the arms upwards.' },
      ],
    },
    mistakes: [
      { fr: 'Genoux qui rentrent vers l’intérieur à la réception.', en: 'Knees caving in on landing.' },
      { fr: 'Réception jambes tendues et bruyante.', en: 'Stiff-legged, noisy landing.' },
      { fr: 'Enchaîner des sauts en étant fatigué : la hauteur baisse et l’intérêt aussi.', en: 'Jumping on when fatigued: height drops and so does the benefit.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Saut avec réception stabilisée', en: 'Jump and stick the landing' },
        description: {
          fr: 'Saut maximal, réception tenue 2 secondes, on se replace entre chaque saut.',
          en: 'Maximal jump, landing held for 2 seconds, reset between jumps.',
        },
        mastery: {
          fr: '4 × 5 sauts avec réception silencieuse et genoux dans l’axe à chaque saut.',
          en: '4 × 5 jumps with a quiet landing and knees aligned on every jump.',
        },
        dosage: { sets: 4, reps: [5, 5], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Sauts enchaînés', en: 'Repeated jumps' },
        description: {
          fr: 'Saut, réception et rebond immédiat pour le saut suivant, 5 ou 6 sauts d’affilée.',
          en: 'Jump, land and rebound straight into the next jump, 5 or 6 in a row.',
        },
        mastery: {
          fr: '4 × 5 sauts enchaînés sans perte nette de hauteur ni de contrôle.',
          en: '4 × 5 repeated jumps without a clear loss of height or control.',
        },
        dosage: { sets: 4, reps: [5, 6], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Saut lesté léger', en: 'Lightly loaded jump' },
        description: {
          fr: 'Haltères en mains ou gilet lesté (environ 10 % du poids du corps), réception stabilisée.',
          en: 'Dumbbells in hand or a weighted vest (about 10% of body weight), stick the landing.',
        },
        mastery: {
          fr: '4 × 5 avec la charge et des réceptions aussi propres qu’au poids du corps.',
          en: '4 × 5 with the load and landings as clean as at bodyweight.',
        },
        dosage: {
          sets: 4, reps: [4, 5], restSec: 150, perSide: false,
          intensity: load('Environ 10 % du poids du corps, intention maximale', 'About 10% of body weight, maximal intent'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Saut unipodal', en: 'Single-leg jump' },
        description: {
          fr: 'Sur une jambe : contre-mouvement, saut vertical et réception sur la même jambe, stabilisée 2 secondes.',
          en: 'On one leg: dip, jump vertically and land on the same leg, held for 2 seconds.',
        },
        mastery: {
          fr: '3 × 5 par jambe avec réceptions stables et une hauteur comparable des deux côtés.',
          en: '3 × 5 per leg with stable landings and similar height on both sides.',
        },
        dosage: { sets: 3, reps: [4, 5], restSec: 90, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Jump squat chargé', en: 'Loaded jump squat' },
        description: {
          fr: 'Saut avec trap bar ou haltères, charge légère à modérée (environ 20 à 30 % de votre maximum au squat), réservé aux sportifs déjà habitués à la force lourde.',
          en: 'Jump with a trap bar or dumbbells, light to moderate load (about 20–30% of your squat max), for athletes already used to heavy strength work.',
        },
        mastery: {
          fr: 'Niveau d’entretien : gardez une vitesse de saut élevée ; si la hauteur baisse nettement, allégez.',
          en: 'Maintenance level: keep jump speed high; if height clearly drops, lighten the load.',
        },
        dosage: {
          sets: 4, reps: [3, 5], restSec: 180, perSide: false,
          intensity: load('Charge légère à modérée, vitesse maximale', 'Light to moderate load, maximal speed'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un sol souple et stable, en chaussures de sport.', en: 'On a firm, forgiving surface, wearing trainers.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères ou gilet lesté', en: 'Dumbbells or weighted vest' },
        instructions: { fr: 'Haltères tenus bras tendus le long du corps (sans élan des bras).', en: 'Dumbbells held at arm’s length by your sides (no arm swing).' },
      },
      {
        id: 'trap-bar', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Trap bar', en: 'Trap bar' },
        instructions: { fr: 'Poignées hautes, saut vertical, réception souple avec la barre.', en: 'High handles, jump vertically, land softly holding the bar.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.surface, plyo.volume],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'markovic-2007',
          finding: {
            fr: 'Cette méta-analyse de 26 études montre que la pliométrie augmente la hauteur du saut avec contre-mouvement d’environ 8,7 %.',
            en: 'This meta-analysis of 26 studies shows that plyometric training increases countermovement jump height by about 8.7%.',
          },
        },
        {
          refId: 'vlachopoulos-2018',
          finding: {
            fr: 'Dans cet essai randomisé chez des adolescents, dont des cyclistes, 9 mois de sauts avec contre-mouvement (séries de 20, gilet lesté progressif) ont amélioré la masse osseuse et la hauteur de saut par rapport au sport seul.',
            en: 'In this randomised trial in adolescents including cyclists, 9 months of countermovement jumps (sets of 20, progressive weighted vest) improved bone mass and jump height compared with sport alone.',
          },
        },
        {
          refId: 'lake-2012',
          finding: {
            fr: 'Dans cet essai, 6 semaines de jump squats chargés (2 séances par semaine) ont amélioré la force maximale au demi-squat et la détente verticale, sans différence avec le swing kettlebell.',
            en: 'In this trial, 6 weeks of loaded jump squats (twice a week) improved half-squat maximal strength and vertical jump height, with no difference versus kettlebell swings.',
          },
        },
        {
          refId: 'ramirez-campillo-2021',
          finding: {
            fr: 'Chez 511 coureurs d’endurance (21 études), l’entraînement par sauts a amélioré le chrono sur 2 à 5 km, la détente, la force réactive et l’économie de course, sans modifier la VO2max.',
            en: 'In 511 endurance runners (21 studies), jump training improved 2–5 km time-trial performance, jump height, reactive strength and running economy, without changing VO2max.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'box-jump',
    family: 'box-jump',
    name: { fr: 'Saut sur box', en: 'Box jump' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis'],
      secondary: ['glute-max', 'soleus', 'gastrocnemius-medial', 'biceps-femoris'],
    },
    zoom: 'leg-front',
    qualities: ['power'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv'],
    why: {
      fr: 'Sauter sur une box développe la puissance des cuisses et des hanches tout en réduisant le choc de la réception, puisqu’on atterrit plus haut que le point de départ. C’est une bonne porte d’entrée vers la pliométrie, pour le coureur comme pour le cycliste.',
      en: 'Jumping onto a box builds thigh and hip power while reducing landing impact, since you land higher than you took off. It is a good entry point into plyometrics for runners and cyclists alike.',
    },
    how: {
      setup: {
        fr: 'Face à une box stable, à environ un demi-pas, pieds à largeur de hanches.',
        en: 'Face a stable box about half a step away, feet hip-width apart.',
      },
      movement: {
        fr: 'Faites un contre-mouvement rapide avec les bras, sautez et posez les deux pieds à plat au centre de la box, en quart de squat. Redressez-vous, puis redescendez en marchant, sans sauter en arrière.',
        en: 'Make a quick dip with an arm swing, jump and land both feet flat in the middle of the box in a quarter squat. Stand up, then step down rather than jumping back.',
      },
      cues: [
        { fr: 'Atterrissez en douceur, dans la même position qu’au départ du saut.', en: 'Land softly, in the same position you took off from.' },
        { fr: 'Choisissez une hauteur qui ne vous oblige pas à ramener les genoux à la poitrine.', en: 'Pick a height that does not force your knees up to your chest.' },
        { fr: 'Redescendez toujours en marchant.', en: 'Always step down.' },
      ],
    },
    mistakes: [
      { fr: 'Box trop haute : réception en squat profond, genoux à la poitrine.', en: 'Box too high: landing in a deep squat, knees at the chest.' },
      { fr: 'Redescendre en sautant en arrière (impact inutile sur les tendons).', en: 'Jumping back down (needless impact on the tendons).' },
      { fr: 'Box instable ou glissante.', en: 'Unstable or slippery box.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Box basse', en: 'Low box' },
        description: { fr: 'Box de 20 à 30 cm, deux pieds.', en: '20–30 cm box, both feet.' },
        mastery: { fr: '4 × 5 réceptions silencieuses et stables.', en: '4 × 5 quiet, stable landings.' },
        dosage: { sets: 4, reps: [5, 5], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 2,
        name: { fr: 'Box moyenne', en: 'Medium box' },
        description: { fr: 'Box de 40 à 50 cm, deux pieds, saut maximal.', en: '40–50 cm box, both feet, maximal jump.' },
        mastery: { fr: '4 × 5 sans réception en squat profond.', en: '4 × 5 without landing in a deep squat.' },
        dosage: { sets: 4, reps: [4, 5], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Départ assis', en: 'Seated box jump' },
        description: {
          fr: 'Assis sur un banc face à la box, pieds au sol : saut sans contre-mouvement vers la box. Travaille le démarrage, comme une relance à vélo.',
          en: 'Seated on a bench facing the box, feet on the floor: jump onto the box without a dip. Trains the start, like a surge on the bike.',
        },
        mastery: { fr: '4 × 4 avec réception propre.', en: '4 × 4 with clean landings.' },
        dosage: { sets: 4, reps: [3, 4], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Box unipodale', en: 'Single-leg box jump' },
        description: {
          fr: 'Sur une jambe, box basse (15 à 30 cm), réception sur la même jambe.',
          en: 'On one leg, low box (15–30 cm), land on the same leg.',
        },
        mastery: { fr: '3 × 4 par jambe, stables et symétriques.', en: '3 × 4 per leg, stable and symmetrical.' },
        dosage: { sets: 3, reps: [3, 4], restSec: 120, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Box de pliométrie, banc solide ou marche d’escalier pour les plus basses hauteurs, posés sur un sol non glissant.',
          en: 'Plyo box, sturdy bench or stair step for the lowest heights, on a non-slip floor.',
        },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.volume],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'markovic-2007',
          finding: {
            fr: 'La pliométrie améliore nettement la détente verticale, de 4,7 à 8,7 % selon le type de saut (méta-analyse de 26 études).',
            en: 'Plyometric training clearly improves vertical jump height, by 4.7% to 8.7% depending on the jump type (meta-analysis of 26 studies).',
          },
        },
        {
          refId: 'denadai-2017',
          finding: {
            fr: 'Dans cette méta-analyse chez des coureurs d’endurance, l’entraînement explosif a amélioré l’économie de course d’environ 4,8 %, autant que la musculation lourde.',
            en: 'In this meta-analysis in endurance runners, explosive training improved running economy by about 4.8%, similar to heavy weight training.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'drop-jump',
    family: 'drop-jump',
    name: { fr: 'Drop jump (saut en contrebas)', en: 'Drop jump' },
    sports: ['run'],
    zones: ['calf', 'foot-ankle', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon'],
      secondary: ['glute-max', 'biceps-femoris', 'vastus-lateralis', 'rectus-femoris', 'fibularis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance'],
    perfGoals: ['power', 'running-economy'],
    why: {
      fr: 'À chaque foulée, le mollet et le tendon d’Achille encaissent puis restituent l’énergie en une fraction de seconde. Le drop jump entraîne cette capacité à rebondir : un contact au sol court et dynamique.',
      en: 'At every stride, the calf and Achilles tendon absorb and return energy in a split second. The drop jump trains this ability to rebound: a short, springy ground contact.',
    },
    how: {
      setup: {
        fr: 'Debout au bord d’une box ou d’une marche stable (20 à 40 cm), pieds à largeur de hanches.',
        en: 'Stand at the edge of a stable box or step (20–40 cm), feet hip-width apart.',
      },
      movement: {
        fr: 'Avancez un pied dans le vide et laissez-vous tomber, sans sauter vers le bas. Dès que les pieds touchent le sol, rebondissez le plus vite et le plus haut possible, avec un contact très bref, puis réceptionnez-vous en douceur.',
        en: 'Step off the box and drop, without jumping down. As soon as your feet hit the ground, bounce up as fast and as high as possible with a very brief contact, then land softly.',
      },
      cues: [
        { fr: 'Le sol est brûlant : contact le plus court possible.', en: 'The floor is hot: keep contact as short as possible.' },
        { fr: 'Atterrissez sur l’avant-pied, talons proches du sol sans s’écraser.', en: 'Land on the forefoot, heels close to the floor without sinking.' },
        { fr: 'Genoux dans l’axe des pieds, tronc gainé.', en: 'Knees in line with the feet, trunk braced.' },
      ],
    },
    mistakes: [
      { fr: 'Hauteur trop élevée : les talons s’écrasent et le contact s’allonge.', en: 'Too high a drop: the heels sink and contact gets longer.' },
      { fr: 'Sauter vers le haut depuis la box au lieu de se laisser tomber.', en: 'Jumping up off the box instead of stepping off.' },
      { fr: 'Genoux qui rentrent à l’impact.', en: 'Knees caving in on impact.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Réception en contrebas', en: 'Drop landing' },
        description: {
          fr: 'Laissez-vous tomber d’une marche de 20 à 30 cm et stabilisez-vous immédiatement, sans rebond : on apprend à amortir.',
          en: 'Step off a 20–30 cm step and stick the landing immediately, without rebounding: learning to absorb.',
        },
        mastery: {
          fr: '3 × 5 réceptions silencieuses, stabilisées en moins d’une seconde, genoux dans l’axe.',
          en: '3 × 5 quiet landings, stable within a second, knees aligned.',
        },
        dosage: { sets: 3, reps: [5, 5], restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 2,
        name: { fr: 'Drop jump bas', en: 'Low drop jump' },
        description: { fr: 'Depuis 20 à 30 cm, rebond vertical immédiat.', en: 'From 20–30 cm, immediate vertical rebound.' },
        mastery: {
          fr: '4 × 5 rebonds avec contact bref et réception contrôlée.',
          en: '4 × 5 rebounds with brief contact and a controlled landing.',
        },
        dosage: { sets: 4, reps: [5, 5], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Drop jump moyen', en: 'Medium drop jump' },
        description: {
          fr: 'Depuis 30 à 45 cm. Montez la hauteur seulement si le contact reste court et que le rebond ne baisse pas.',
          en: 'From 30–45 cm. Only raise the height if contact stays short and the rebound does not drop.',
        },
        mastery: {
          fr: '4 × 5 sans que les talons ne s’écrasent, rebond au moins aussi haut que depuis 30 cm.',
          en: '4 × 5 without the heels sinking, rebound at least as high as from 30 cm.',
        },
        dosage: { sets: 4, reps: [4, 5], restSec: 150, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Drop jump enchaîné', en: 'Drop jump into a jump' },
        description: {
          fr: 'Après le rebond, enchaînez un saut en longueur ou un saut sur une deuxième box.',
          en: 'After the rebound, go straight into a broad jump or onto a second box.',
        },
        mastery: { fr: '4 × 4 enchaînements fluides et contrôlés.', en: '4 × 4 smooth, controlled sequences.' },
        dosage: { sets: 4, reps: [3, 4], restSec: 180, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 5,
        name: { fr: 'Drop jump unipodal', en: 'Single-leg drop jump' },
        description: {
          fr: 'Sur une jambe, depuis une marche basse (15 à 20 cm), rebond immédiat. Réservé aux coureurs habitués à la pliométrie.',
          en: 'On one leg, from a low step (15–20 cm), immediate rebound. For runners experienced with plyometrics.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 3 × 4 par jambe, contacts brefs et symétriques ; gardez peu de séries.',
          en: 'Maintenance level: 3 × 4 per leg, brief and symmetrical contacts; keep the number of sets low.',
        },
        dosage: { sets: 3, reps: [3, 4], restSec: 150, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Box, banc ou marche stable, sur un sol souple et non glissant.',
          en: 'Stable box, bench or step, on a forgiving, non-slip floor.',
        },
      },
    ],
    precautions: [
      {
        fr: 'C’est l’exercice de saut le plus exigeant pour les tendons : à réserver aux coureurs qui maîtrisent déjà les sauts sur place et le saut vertical.',
        en: 'This is the most tendon-demanding jump: keep it for runners who already master hops in place and vertical jumps.',
      },
      plyo.tendon,
      plyo.surface,
      plyo.volume,
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'markovic-2007',
          finding: {
            fr: 'La pliométrie a augmenté la hauteur du drop jump d’environ 4,7 % (méta-analyse de 26 études).',
            en: 'Plyometric training increased drop jump height by about 4.7% (meta-analysis of 26 studies).',
          },
        },
        {
          refId: 'ramirez-campillo-2021',
          finding: {
            fr: 'L’entraînement par sauts a amélioré la force réactive, l’économie de course et le chrono sur 2 à 5 km chez les coureurs d’endurance (21 études, 511 participants).',
            en: 'Jump training improved reactive strength, running economy and 2–5 km time-trial performance in endurance runners (21 studies, 511 participants).',
          },
        },
        {
          refId: 'saunders-2006',
          finding: {
            fr: 'Chez 15 coureurs très entraînés, 9 semaines de pliométrie (3 séances de 30 minutes par semaine) ont amélioré l’économie de course de 4,1 % à 18 km/h.',
            en: 'In 15 highly trained runners, 9 weeks of plyometrics (three 30-minute sessions a week) improved running economy by 4.1% at 18 km/h.',
          },
        },
        {
          refId: 'drinkwater-2009',
          finding: {
            fr: 'Une séance de 212 contacts au sol a nettement réduit la force et sa vitesse de production juste après l’effort (retour à la normale en 2 heures) : le volume de sauts doit être surveillé.',
            en: 'A 212-contact session clearly reduced force and rate of force development right afterwards (back to normal within 2 hours): jump volume needs monitoring.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'bounding',
    family: 'bounding',
    name: { fr: 'Bondissements', en: 'Bounding' },
    sports: ['run'],
    zones: ['hip-glutes', 'thigh', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'biceps-femoris', 'gastrocnemius-medial', 'soleus'],
      secondary: ['semitendinosus', 'gastrocnemius-lateral', 'achilles-tendon', 'adductor-magnus', 'iliopsoas'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance'],
    perfGoals: ['running-economy', 'power', 'sprint-fv'],
    why: {
      fr: 'Les bondissements sont une course exagérée : chaque appui projette le corps loin vers l’avant. Ils renforcent la poussée de la hanche et la raideur du mollet, deux qualités d’une foulée économique.',
      en: 'Bounding is exaggerated running: each contact throws the body far forward. It strengthens hip drive and calf stiffness, two features of an economical stride.',
    },
    how: {
      setup: {
        fr: 'Sur une ligne droite de 20 à 30 m, sol souple et plat (piste, herbe rase).',
        en: 'On a 20–30 m straight, on a flat, forgiving surface (track, short grass).',
      },
      movement: {
        fr: 'Partez en trottinant, puis poussez fort sur une jambe pour bondir loin vers l’avant, genou opposé haut et bras amples. Réceptionnez-vous sur l’autre pied, sous le bassin, et enchaînez immédiatement le bond suivant.',
        en: 'Start with a jog, then push hard off one leg to bound far forward, opposite knee high and arms driving. Land on the other foot under your hips and go straight into the next bound.',
      },
      cues: [
        { fr: 'Poussez le sol derrière vous, ne sautez pas vers le haut.', en: 'Push the ground back behind you, do not jump upwards.' },
        { fr: 'Pied qui se pose sous le bassin, pas loin devant.', en: 'Foot lands under the hips, not far in front.' },
        { fr: 'Contact actif et bref, tronc droit.', en: 'Active, brief contact, tall trunk.' },
      ],
    },
    mistakes: [
      { fr: 'Poser le pied loin devant en freinant, talon en premier.', en: 'Reaching forward and braking, heel first.' },
      { fr: 'Chercher la hauteur au lieu de la distance.', en: 'Going for height instead of distance.' },
      { fr: 'Continuer alors que la qualité des appuis se dégrade.', en: 'Carrying on when contact quality deteriorates.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Skipping bondissant', en: 'Power skips' },
        description: {
          fr: 'Pas sautés (« power skip ») : à chaque appui, montez le genou opposé et cherchez l’amplitude, sans vitesse. Comptez les appuis.',
          en: 'Power skips: at each contact, drive the opposite knee up and aim for amplitude, not speed. Count the contacts.',
        },
        mastery: {
          fr: '4 × 12 appuis dynamiques avec des bras bien coordonnés.',
          en: '4 × 12 springy contacts with well-coordinated arms.',
        },
        dosage: {
          sets: 4, reps: [10, 12], restSec: 90, perSide: false,
          intensity: load('Amplitude sous-maximale, appuis dynamiques', 'Submaximal amplitude, springy contacts'),
          frequency: freq.twoPerWeek,
        },
      },
      {
        level: 2,
        name: { fr: 'Bonds alternés courts', en: 'Short alternate-leg bounds' },
        description: {
          fr: '6 à 8 bonds alternés à effort modéré, en se concentrant sur la pose du pied sous le bassin.',
          en: '6 to 8 alternate-leg bounds at moderate effort, focusing on landing under the hips.',
        },
        mastery: { fr: '4 × 8 bonds réguliers, sans freinage visible.', en: '4 × 8 even bounds, with no visible braking.' },
        dosage: { sets: 4, reps: [6, 8], restSec: 120, perSide: false, intensity: rpe('7'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Bonds alternés amples', en: 'Long alternate-leg bounds' },
        description: { fr: '8 à 10 bonds alternés pour la distance maximale.', en: '8 to 10 alternate-leg bounds for maximal distance.' },
        mastery: {
          fr: '5 × 8 bonds avec une distance stable d’une série à l’autre.',
          en: '5 × 8 bounds with consistent distance from set to set.',
        },
        dosage: { sets: 5, reps: [8, 10], restSec: 180, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Bonds combinés', en: 'Combination bounds' },
        description: {
          fr: 'Séquences « droite-droite-gauche-gauche » : deux bonds sur la même jambe puis changement. Très exigeant, pour coureurs expérimentés.',
          en: '“Right-right-left-left” sequences: two bounds on the same leg, then switch. Very demanding, for experienced runners.',
        },
        mastery: {
          fr: 'Niveau d’entretien : gardez des séries courtes de qualité, avec récupération complète.',
          en: 'Maintenance level: keep sets short and high-quality, with full recovery.',
        },
        dosage: { sets: 4, reps: [6, 8], restSec: 180, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur piste ou herbe rase, après un échauffement de course.', en: 'On a track or short grass, after a running warm-up.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.surface, plyo.volume],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'spurrs-2003',
          finding: {
            fr: 'Chez 17 coureurs, 6 semaines de pliométrie ont amélioré le chrono sur 3 km (2,7 %), l’économie de course, la raideur du mollet et le test des 5 bonds.',
            en: 'In 17 runners, 6 weeks of plyometrics improved 3 km time (2.7%), running economy, lower-leg stiffness and the 5-bound test.',
          },
        },
        {
          refId: 'paavolainen-1999',
          finding: {
            fr: 'Chez 18 athlètes d’endurance entraînés, remplacer 32 % de l’entraînement par du travail de force explosive pendant 9 semaines a amélioré le 5 km et l’économie de course, sans changement de VO2max.',
            en: 'In 18 trained endurance athletes, replacing 32% of training with explosive strength work for 9 weeks improved 5 km time and running economy, with no change in VO2max.',
          },
        },
        {
          refId: 'zhang-2025',
          finding: {
            fr: 'Dans cette méta-analyse d’essais randomisés, la pliométrie sur une jambe a davantage amélioré le saut unipodal et le sprint que la pliométrie sur deux jambes.',
            en: 'In this meta-analysis of randomised trials, single-leg plyometrics improved single-leg jumping and sprinting more than double-leg plyometrics.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'kettlebell-swing',
    family: 'kettlebell-swing',
    name: { fr: 'Swing kettlebell', en: 'Kettlebell swing' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes', 'thigh', 'trunk'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'biceps-femoris', 'semitendinosus'],
      secondary: ['semimembranosus', 'adductor-magnus', 'erector-spinae', 'multifidus', 'forearm-flexors'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'endurance'],
    objectives: ['performance'],
    perfGoals: ['power', 'strength'],
    why: {
      fr: 'Le swing entraîne l’extension explosive de la hanche, moteur de la poussée en course et du coup de pédale. Il développe la puissance des fessiers et des ischio-jambiers sans impact au sol.',
      en: 'The swing trains explosive hip extension, the engine of the running push-off and the pedal stroke. It builds glute and hamstring power with no ground impact.',
    },
    how: {
      setup: {
        fr: 'Pieds un peu plus larges que les hanches, kettlebell au sol 30 cm devant vous. Penchez-vous en reculant les fesses, dos plat, et saisissez la poignée à deux mains.',
        en: 'Feet slightly wider than hips, kettlebell on the floor 30 cm in front. Hinge at the hips, back flat, and grab the handle with both hands.',
      },
      movement: {
        fr: 'Faites passer la kettlebell entre les cuisses, puis tendez les hanches avec force : elle monte jusqu’à hauteur de poitrine grâce à l’élan des hanches, bras relâchés. Laissez-la redescendre et repartez en charnière, sans pause.',
        en: 'Hike the kettlebell back between your thighs, then snap the hips forward: it floats up to chest height from hip drive, arms relaxed. Let it swing back down and hinge again, without pausing.',
      },
      cues: [
        { fr: 'C’est la hanche qui lance, pas les bras.', en: 'The hips throw it, not the arms.' },
        { fr: 'En haut : debout, fesses serrées, ventre gainé, sans cambrer.', en: 'At the top: tall, glutes squeezed, braced, no arching.' },
        { fr: 'Avant-bras contre l’intérieur des cuisses en bas du mouvement.', en: 'Forearms brush the inner thighs at the bottom.' },
      ],
      breathing: { fr: 'Soufflez fort à chaque extension de hanche.', en: 'Breathe out sharply at each hip snap.' },
    },
    mistakes: [
      { fr: 'Plier les genoux comme un squat au lieu de reculer les fesses.', en: 'Squatting down instead of pushing the hips back.' },
      { fr: 'Lever la kettlebell avec les épaules.', en: 'Lifting the kettlebell with the shoulders.' },
      { fr: 'Arrondir le dos en bas ou se cambrer en haut.', en: 'Rounding the back at the bottom or arching at the top.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Charnière dynamique', en: 'Dynamic hip hinge' },
        description: {
          fr: 'Sans charge ou avec une kettlebell légère : charnière de hanche rapide, puis extension explosive des hanches jusqu’à la position debout.',
          en: 'Unloaded or with a light kettlebell: quick hip hinge, then explosive hip extension to standing.',
        },
        mastery: {
          fr: '3 × 10 avec dos neutre et mouvement lancé par la hanche.',
          en: '3 × 10 with a neutral back and the movement driven by the hips.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-X', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Swing à deux mains', en: 'Two-hand swing' },
        description: { fr: 'Kettlebell modérée, séries courtes.', en: 'Moderate kettlebell, short sets.' },
        mastery: {
          fr: '5 × 10 swings à hauteur de poitrine constante, sans gêne lombaire.',
          en: '5 × 10 swings at a consistent chest height, with no lower-back discomfort.',
        },
        dosage: { sets: 5, reps: [10, 10], restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Swing en intervalles', en: 'Interval swings' },
        description: {
          fr: 'Inspiré du protocole étudié (12 × 30 s) : 30 s de swings, 30 s de repos, avec 12 kg sous 70 kg de poids du corps et 16 kg au-delà.',
          en: 'Based on the studied protocol (12 × 30 s): 30 s of swings, 30 s rest, using 12 kg below 70 kg body weight and 16 kg above.',
        },
        mastery: {
          fr: '10 × 30 s sans dégradation de la technique.',
          en: '10 × 30 s without technique breaking down.',
        },
        dosage: {
          sets: 10, holdSec: 30, restSec: 30, perSide: false,
          intensity: load('12 kg sous 70 kg de poids du corps, 16 kg au-delà', '12 kg below 70 kg body weight, 16 kg above'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Swing à une main', en: 'One-hand swing' },
        description: {
          fr: 'Une main, en changeant de main à chaque série : le tronc doit en plus résister à la rotation.',
          en: 'One hand, switching hands each set: the trunk must also resist rotation.',
        },
        mastery: { fr: '4 × 10 par bras, buste qui ne tourne pas.', en: '4 × 10 per arm, torso not twisting.' },
        dosage: { sets: 4, reps: [8, 10], restSec: 75, perSide: true, intensity: rpe('7'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Swing lourd et explosif', en: 'Heavy, explosive swing' },
        description: {
          fr: 'Kettlebell lourde, séries courtes à vitesse maximale, récupération complète.',
          en: 'Heavy kettlebell, short sets at maximal speed, full recovery.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 5 × 6 restent rapides et nets.',
          en: 'Maintenance level: increase the load once 5 × 6 stays fast and crisp.',
        },
        dosage: {
          sets: 5, reps: [5, 6], restSec: 120, perSide: false,
          intensity: load('Kettlebell lourde, vitesse maximale', 'Heavy kettlebell, maximal speed'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans charge', en: 'Unloaded' },
        instructions: { fr: 'Pour apprendre le geste (niveau 1).', en: 'To learn the movement (level 1).' },
      },
      {
        id: 'kettlebell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Kettlebell (ou haltère)', en: 'Kettlebell (or dumbbell)' },
        instructions: {
          fr: 'Kettlebell de préférence ; à défaut, un haltère tenu verticalement par une extrémité.',
          en: 'Preferably a kettlebell; otherwise a dumbbell held vertically by one end.',
        },
      },
    ],
    precautions: [
      heavy.technique,
      { fr: 'Gardez un espace dégagé devant et derrière vous.', en: 'Keep the space in front of and behind you clear.' },
      caution.painFlare,
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'lake-2012',
          finding: {
            fr: 'Chez 21 hommes, 6 semaines de swings (2 séances de 12 × 30 s par semaine) ont amélioré la force maximale au demi-squat et la détente verticale, sans différence avec des jump squats.',
            en: 'In 21 men, 6 weeks of swings (two sessions of 12 × 30 s a week) improved half-squat maximal strength and vertical jump, with no difference versus jump squats.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'split-jump',
    family: 'split-jump',
    name: { fr: 'Fentes sautées', en: 'Split jumps' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis'],
      secondary: ['glute-max', 'adductor-magnus', 'biceps-femoris', 'soleus', 'gastrocnemius-medial'],
    },
    zoom: 'leg-front',
    qualities: ['power', 'control'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv'],
    why: {
      fr: 'Courir et pédaler sollicitent une jambe à la fois. Les fentes sautées développent la puissance de chaque jambe et la stabilité du bassin à la réception.',
      en: 'Running and pedalling work one leg at a time. Split jumps build each leg’s power and pelvic stability on landing.',
    },
    how: {
      setup: {
        fr: 'En fente : un pied devant, l’autre derrière sur l’avant-pied, buste droit, les deux genoux fléchis à environ 90°.',
        en: 'In a lunge: one foot forward, the other behind on the forefoot, torso upright, both knees bent to about 90°.',
      },
      movement: {
        fr: 'Poussez fort sur les deux jambes pour sauter à la verticale. En l’air, inversez les jambes, puis réceptionnez-vous en fente de l’autre côté en amortissant jusqu’à la position de départ.',
        en: 'Drive hard through both legs to jump straight up. Switch legs in the air, then land in a lunge on the other side, absorbing down to the start position.',
      },
      cues: [
        { fr: 'Buste droit, bassin face à l’avant.', en: 'Torso upright, pelvis facing forward.' },
        { fr: 'Genou avant au-dessus du pied, pas vers l’intérieur.', en: 'Front knee over the foot, not caving in.' },
        { fr: 'Réception douce, sans que le genou arrière ne heurte le sol.', en: 'Soft landing, back knee not hitting the floor.' },
      ],
    },
    mistakes: [
      { fr: 'Pencher le buste en avant.', en: 'Leaning the torso forward.' },
      { fr: 'Fente trop courte : le talon avant décolle.', en: 'Stance too short: the front heel lifts.' },
      { fr: 'Genou avant qui part vers l’intérieur.', en: 'Front knee drifting inwards.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Fente dynamique sans décoller', en: 'Dynamic lunge, no take-off' },
        description: {
          fr: 'Descente contrôlée en fente, puis remontée explosive jusqu’à la pointe des pieds, sans quitter le sol.',
          en: 'Controlled lunge down, then explosive drive up onto the toes without leaving the floor.',
        },
        mastery: { fr: '3 × 8 par jambe, rapides et stables.', en: '3 × 8 per leg, fast and stable.' },
        dosage: { sets: 3, reps: [8, 8], tempo: '2-0-X', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Fente sautée sans changement', en: 'Split jump, same stance' },
        description: {
          fr: 'Sautez à la verticale et retombez dans la même fente, stabilisez 2 secondes.',
          en: 'Jump straight up and land in the same lunge, hold for 2 seconds.',
        },
        mastery: { fr: '3 × 6 par jambe avec réception silencieuse.', en: '3 × 6 per leg with quiet landings.' },
        dosage: { sets: 3, reps: [5, 6], restSec: 90, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Fentes sautées alternées avec pause', en: 'Alternating split jumps with a pause' },
        description: {
          fr: 'Changement de jambe en l’air et stabilisation de 2 secondes à chaque réception.',
          en: 'Switch legs in the air and hold each landing for 2 seconds.',
        },
        mastery: {
          fr: '4 × 6 réceptions (3 par jambe) parfaitement stables.',
          en: '4 × 6 landings (3 per leg), perfectly stable.',
        },
        dosage: { sets: 4, reps: [6, 6], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Fentes sautées enchaînées', en: 'Continuous split jumps' },
        description: { fr: 'Changements de jambe sans pause, rythme rapide.', en: 'Leg switches without pausing, quick rhythm.' },
        mastery: { fr: '4 × 8 contacts avec une hauteur constante.', en: '4 × 8 contacts with consistent height.' },
        dosage: { sets: 4, reps: [8, 8], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Fentes sautées lestées', en: 'Weighted split jumps' },
        description: {
          fr: 'Haltères légers en mains, version avec pause à chaque réception.',
          en: 'Light dumbbells in hand, with a pause on each landing.',
        },
        mastery: {
          fr: 'Niveau d’entretien : la charge ne doit ni réduire la hauteur ni dégrader les réceptions.',
          en: 'Maintenance level: the load must not reduce height or spoil landings.',
        },
        dosage: {
          sets: 4, reps: [6, 6], restSec: 120, perSide: false,
          intensity: load('Haltères légers, intention maximale', 'Light dumbbells, maximal intent'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un sol souple et stable.', en: 'On a firm, forgiving surface.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères légers', en: 'Light dumbbells' },
        instructions: { fr: 'Un haltère léger dans chaque main, bras le long du corps.', en: 'A light dumbbell in each hand, arms by your sides.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.volume],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'zhang-2025',
          finding: {
            fr: 'Dans cette méta-analyse d’essais randomisés, la pliométrie sur une jambe a davantage amélioré le saut unipodal, le sprint et les changements de direction que la pliométrie sur deux jambes.',
            en: 'In this meta-analysis of randomised trials, single-leg plyometrics improved single-leg jumping, sprinting and change of direction more than double-leg plyometrics.',
          },
        },
        {
          refId: 'balsalobre-fernandez-2016',
          finding: {
            fr: 'Chez des coureurs de haut niveau, des programmes associant 2 à 4 exercices de musculation et jusqu’à 200 sauts, 2 à 3 fois par semaine pendant 8 à 12 semaines, ont nettement amélioré l’économie de course.',
            en: 'In highly trained runners, programmes combining 2–4 resistance exercises and up to 200 jumps, 2–3 times a week for 8–12 weeks, clearly improved running economy.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hurdle-hops',
    family: 'hurdle-hop',
    name: { fr: 'Sauts de haies', en: 'Hurdle hops' },
    sports: ['run'],
    zones: ['calf', 'foot-ankle', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'glute-max'],
      secondary: ['achilles-tendon', 'biceps-femoris', 'vastus-lateralis', 'rectus-femoris', 'iliopsoas'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance'],
    perfGoals: ['power', 'running-economy'],
    why: {
      fr: 'Enchaîner des sauts par-dessus des obstacles entraîne à rebondir vite et haut en coordonnant chevilles, genoux et hanches. C’est un travail de raideur et de réactivité utile à chaque foulée.',
      en: 'Hopping over a row of obstacles trains you to rebound fast and high while coordinating ankles, knees and hips. It builds the stiffness and reactivity used at every stride.',
    },
    how: {
      setup: {
        fr: 'Alignez 4 à 6 obstacles bas (mini-haies, cônes, bâton posé sur deux plots) espacés d’environ un mètre.',
        en: 'Line up 4 to 6 low obstacles (mini hurdles, cones, a stick resting on two markers) about one metre apart.',
      },
      movement: {
        fr: 'Pieds joints, sautez par-dessus chaque obstacle en remontant les genoux, et rebondissez immédiatement après chaque réception, avec des contacts courts.',
        en: 'Feet together, jump over each obstacle bringing the knees up, and rebound immediately after each landing with short contacts.',
      },
      cues: [
        { fr: 'Rebond actif, comme sur un trampoline.', en: 'Active rebound, like on a trampoline.' },
        { fr: 'Les genoux montent, les pieds restent sous le bassin.', en: 'Knees come up, feet stay under the hips.' },
        { fr: 'Bras coordonnés, tronc gainé.', en: 'Coordinated arms, braced trunk.' },
      ],
    },
    mistakes: [
      { fr: 'S’arrêter entre les obstacles, ce qui supprime l’effet rebond.', en: 'Stopping between obstacles, which kills the rebound.' },
      { fr: 'Réception sur les talons.', en: 'Landing on the heels.' },
      { fr: 'Obstacles trop hauts trop tôt.', en: 'Obstacles too high too soon.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sauts par-dessus une ligne', en: 'Line hops' },
        description: {
          fr: 'Sauts pieds joints d’avant en arrière au-dessus d’une ligne au sol, contacts rapides.',
          en: 'Two-footed hops forwards and backwards over a line on the floor, quick contacts.',
        },
        mastery: { fr: '3 × 10 contacts rapides et réguliers.', en: '3 × 10 quick, even contacts.' },
        dosage: { sets: 3, reps: [10, 10], restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Haies basses stabilisées', en: 'Low hurdles, stick landing' },
        description: {
          fr: 'Obstacles de 15 à 20 cm, réception stabilisée 1 à 2 secondes après chaque haie.',
          en: '15–20 cm obstacles, landing held 1–2 seconds after each hurdle.',
        },
        mastery: {
          fr: '4 × 5 haies avec réceptions silencieuses et genoux dans l’axe.',
          en: '4 × 5 hurdles with quiet landings and aligned knees.',
        },
        dosage: { sets: 4, reps: [5, 5], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Haies basses enchaînées', en: 'Continuous low hurdles' },
        description: {
          fr: '5 haies de 15 à 30 cm d’affilée, rebond immédiat.',
          en: '5 hurdles of 15–30 cm in a row, immediate rebound.',
        },
        mastery: {
          fr: '4 × 5 haies sans pause ni contact supplémentaire.',
          en: '4 × 5 hurdles without pausing or extra contacts.',
        },
        dosage: { sets: 4, reps: [5, 5], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Haies hautes enchaînées', en: 'Continuous high hurdles' },
        description: {
          fr: 'Obstacles de 40 à 50 cm, rebond immédiat ; pour les coureurs habitués aux sauts.',
          en: '40–50 cm obstacles, immediate rebound; for runners used to jumping.',
        },
        mastery: {
          fr: '4 × 5 haies fluides, sans contact qui s’allonge.',
          en: '4 × 5 smooth hurdles, without contacts getting longer.',
        },
        dosage: { sets: 4, reps: [5, 5], restSec: 150, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Haies unipodales', en: 'Single-leg hurdle hops' },
        description: { fr: 'Mini-haies de 10 à 15 cm, sur une jambe.', en: '10–15 cm mini hurdles, on one leg.' },
        mastery: {
          fr: 'Niveau d’entretien : 3 × 4 par jambe, contacts symétriques entre les deux côtés.',
          en: 'Maintenance level: 3 × 4 per leg, contacts symmetrical between sides.',
        },
        dosage: { sets: 3, reps: [4, 4], restSec: 120, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Mini-haies, cônes ou bâton posé sur deux plots : des obstacles qui tombent si on les touche.',
          en: 'Mini hurdles, cones or a stick on two markers: obstacles that fall over if touched.',
        },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.surface, plyo.volume],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'ramirez-campillo-2021',
          finding: {
            fr: 'Dans cette méta-analyse de 21 études chez des coureurs d’endurance, l’entraînement par sauts a amélioré le chrono sur 2 à 5 km (effet modéré) ainsi que la force réactive.',
            en: 'In this meta-analysis of 21 studies in endurance runners, jump training improved 2–5 km time-trial performance (moderate effect) and reactive strength.',
          },
        },
        {
          refId: 'llanos-lagos-2024',
          finding: {
            fr: 'La pliométrie a amélioré l’économie de course aux vitesses lentes à modérées (jusqu’à 12 km/h), alors que les charges lourdes agissaient surtout aux vitesses élevées.',
            en: 'Plyometric training improved running economy at slow to moderate speeds (up to 12 km/h), whereas heavy loads mainly helped at higher speeds.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'lateral-bound',
    family: 'lateral-bound',
    name: { fr: 'Bonds latéraux (patineur)', en: 'Lateral bounds (skater jumps)' },
    sports: ['run'],
    zones: ['hip-glutes', 'adductors', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'glute-max'],
      secondary: ['glute-min', 'adductor-magnus', 'tensor-fasciae-latae', 'biceps-femoris', 'fibularis-longus'],
    },
    zoom: 'pelvis-back',
    qualities: ['power', 'control'],
    objectives: ['performance'],
    perfGoals: ['power'],
    why: {
      fr: 'Le moyen fessier stabilise le bassin à chaque appui de course. Bondir d’une jambe sur l’autre sur le côté le renforce de façon dynamique et entraîne le contrôle du genou et de la cheville dans un plan souvent négligé.',
      en: 'The gluteus medius stabilises the pelvis at every running contact. Bounding sideways from one leg to the other strengthens it dynamically and trains knee and ankle control in an often-neglected plane.',
    },
    how: {
      setup: {
        fr: 'Debout sur la jambe droite, genou légèrement fléchi, buste un peu penché en avant.',
        en: 'Stand on your right leg, knee slightly bent, torso leaning slightly forward.',
      },
      movement: {
        fr: 'Poussez sur la jambe droite pour bondir vers la gauche et réceptionnez-vous sur la jambe gauche seule, hanche fléchie, genou dans l’axe. Stabilisez, puis repartez de l’autre côté.',
        en: 'Push off the right leg to bound to the left and land on the left leg only, hip bent, knee aligned. Stabilise, then go back the other way.',
      },
      cues: [
        { fr: 'Réception sur une jambe, genou au-dessus du pied.', en: 'Land on one leg, knee over the foot.' },
        { fr: 'Bassin horizontal à la réception.', en: 'Keep the pelvis level on landing.' },
        { fr: 'Poussez le sol vers le côté avec tout le pied.', en: 'Push the ground sideways through the whole foot.' },
      ],
    },
    mistakes: [
      { fr: 'Genou qui s’effondre vers l’intérieur à la réception.', en: 'Knee collapsing inwards on landing.' },
      { fr: 'Poser l’autre pied pour se rattraper.', en: 'Putting the other foot down to catch yourself.' },
      { fr: 'Buste qui bascule sur le côté.', en: 'Torso tipping sideways.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Bond latéral court stabilisé', en: 'Short lateral bound, stick' },
        description: {
          fr: 'Bond latéral d’environ une largeur d’épaules, réception stabilisée 2 secondes.',
          en: 'Lateral bound of about shoulder width, landing held for 2 seconds.',
        },
        mastery: { fr: '3 × 6 par côté, toutes stables.', en: '3 × 6 per side, all stable.' },
        dosage: { sets: 3, reps: [6, 6], restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Bond latéral long stabilisé', en: 'Long lateral bound, stick' },
        description: { fr: 'Distance maximale, réception stabilisée 2 secondes.', en: 'Maximal distance, landing held for 2 seconds.' },
        mastery: {
          fr: '3 × 6 par côté, avec une distance comparable des deux côtés.',
          en: '3 × 6 per side, with similar distance on both sides.',
        },
        dosage: { sets: 3, reps: [5, 6], restSec: 90, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Bonds latéraux enchaînés', en: 'Continuous lateral bounds' },
        description: {
          fr: 'Rebond immédiat d’un côté à l’autre, rythme dynamique (patineur).',
          en: 'Immediate rebound from side to side, dynamic rhythm (skater).',
        },
        mastery: { fr: '4 × 8 bonds avec réceptions stables.', en: '4 × 8 bounds with stable landings.' },
        dosage: { sets: 4, reps: [8, 8], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Bonds latéraux par-dessus un obstacle', en: 'Lateral bounds over an obstacle' },
        description: {
          fr: 'Bonds enchaînés par-dessus un obstacle bas (15 à 30 cm), qui oblige à pousser plus haut.',
          en: 'Continuous bounds over a low obstacle (15–30 cm), forcing a higher push-off.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 4 × 6 à 8 bonds fluides, sans perte de contrôle du genou.',
          en: 'Maintenance level: 4 × 6–8 smooth bounds without losing knee control.',
        },
        dosage: { sets: 4, reps: [6, 8], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un sol non glissant, avec de la place sur les côtés.', en: 'On a non-slip floor with room to the sides.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.surface, caution.balanceSupport],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'mccormick-2016',
          finding: {
            fr: 'Chez 14 basketteuses, 6 semaines de pliométrie latérale ont davantage amélioré le saut latéral (côté gauche) et un test de déplacement latéral que la pliométrie avant-arrière.',
            en: 'In 14 female basketball players, 6 weeks of frontal-plane plyometrics improved the lateral hop (left side) and a lateral shuffle test more than sagittal-plane plyometrics.',
          },
        },
        {
          refId: 'zhang-2025',
          finding: {
            fr: 'Les bénéfices de la pliométrie sont spécifiques : le travail sur une jambe améliore surtout le saut unipodal et les changements de direction.',
            en: 'Plyometric benefits are specific: single-leg work mainly improves single-leg jumping and change of direction.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'broad-jump',
    family: 'broad-jump',
    name: { fr: 'Saut en longueur sans élan', en: 'Standing broad jump' },
    sports: ['run'],
    zones: ['hip-glutes', 'thigh', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'biceps-femoris', 'semitendinosus', 'soleus'],
      secondary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'vastus-lateralis', 'rectus-femoris', 'adductor-magnus'],
    },
    zoom: 'leg-back',
    qualities: ['power'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv'],
    why: {
      fr: 'Le saut en longueur oriente la poussée vers l’avant, comme une accélération en course. Il sollicite surtout les extenseurs de la hanche : fessiers et ischio-jambiers.',
      en: 'The broad jump directs force forwards, like accelerating when running. It mainly works the hip extensors: glutes and hamstrings.',
    },
    how: {
      setup: { fr: 'Debout derrière une ligne, pieds à largeur de hanches.', en: 'Stand behind a line, feet hip-width apart.' },
      movement: {
        fr: 'Balancez les bras vers l’arrière en pliant hanches et genoux, puis projetez-vous le plus loin possible vers l’avant en lançant les bras. Réceptionnez-vous sur les deux pieds, hanches basses, et tenez la position 2 secondes.',
        en: 'Swing the arms back while bending hips and knees, then launch yourself as far forward as possible, driving the arms. Land on both feet, hips low, and hold for 2 seconds.',
      },
      cues: [
        { fr: 'Partez vers l’avant et vers le haut, à environ 45°.', en: 'Take off forwards and upwards, at about 45°.' },
        { fr: 'Réception « collée » : pas de pas supplémentaire.', en: '“Stuck” landing: no extra step.' },
        { fr: 'Genoux dans l’axe, poitrine au-dessus des genoux.', en: 'Knees aligned, chest over the knees.' },
      ],
    },
    mistakes: [
      { fr: 'Réception jambes tendues ou en déséquilibre arrière.', en: 'Landing stiff-legged or falling backwards.' },
      { fr: 'Faire un pas pour se rattraper : la distance dépasse ce que vous contrôlez.', en: 'Taking a step to recover: the distance exceeds what you can control.' },
      { fr: 'Genoux qui rentrent à la réception.', en: 'Knees caving in on landing.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Saut sous-maximal collé', en: 'Submaximal jump, stick' },
        description: {
          fr: 'Saut à environ 70 % de votre distance maximale, réception stabilisée 2 secondes.',
          en: 'Jump at about 70% of your maximal distance, landing held for 2 seconds.',
        },
        mastery: { fr: '4 × 5 sans pas de rattrapage.', en: '4 × 5 without a recovery step.' },
        dosage: {
          sets: 4, reps: [5, 5], restSec: 60, perSide: false,
          intensity: load('Environ 70 % de la distance maximale', 'About 70% of maximal distance'),
          frequency: freq.twoPerWeek,
        },
      },
      {
        level: 2,
        name: { fr: 'Saut maximal collé', en: 'Maximal jump, stick' },
        description: { fr: 'Distance maximale, réception stabilisée 2 secondes.', en: 'Maximal distance, landing held for 2 seconds.' },
        mastery: { fr: '4 × 4 sauts maximaux, tous stabilisés.', en: '4 × 4 maximal jumps, all stuck.' },
        dosage: { sets: 4, reps: [4, 4], restSec: 120, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Sauts enchaînés', en: 'Consecutive broad jumps' },
        description: { fr: '3 sauts en longueur d’affilée, avec rebond immédiat.', en: '3 broad jumps in a row, with an immediate rebound.' },
        mastery: { fr: '4 × 3 sauts avec une distance régulière.', en: '4 × 3 jumps with consistent distance.' },
        dosage: { sets: 4, reps: [3, 3], restSec: 150, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Saut unipodal collé', en: 'Single-leg broad jump, stick' },
        description: {
          fr: 'Sur une jambe, réception sur la même jambe, stabilisée 2 secondes.',
          en: 'On one leg, land on the same leg and hold for 2 seconds.',
        },
        mastery: {
          fr: '3 × 4 par jambe, avec moins de 10 % d’écart de distance entre les deux côtés.',
          en: '3 × 4 per leg, with less than 10% difference in distance between sides.',
        },
        dosage: { sets: 3, reps: [4, 4], restSec: 120, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Cloche-pied enchaînés', en: 'Consecutive single-leg hops' },
        description: {
          fr: '3 à 5 sauts vers l’avant sur la même jambe, rebond immédiat.',
          en: '3 to 5 forward hops on the same leg, immediate rebound.',
        },
        mastery: {
          fr: 'Niveau d’entretien : gardez peu de séries, une récupération complète et des contacts symétriques.',
          en: 'Maintenance level: keep sets few, recovery full and contacts symmetrical.',
        },
        dosage: { sets: 3, reps: [3, 5], restSec: 150, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur piste, herbe rase ou sol sportif, avec un repère pour mesurer la distance.', en: 'On a track, short grass or sports floor, with a marker to measure distance.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, plyo.surface, plyo.volume],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'zhang-2025',
          finding: {
            fr: 'Les deux formes se complètent : la pliométrie sur une jambe améliore davantage le saut unipodal et le sprint, la pliométrie sur deux jambes le saut à deux pieds (méta-analyse d’essais randomisés).',
            en: 'Both forms complement each other: single-leg plyometrics improve single-leg jumping and sprinting more, double-leg plyometrics improve two-footed jumping more (meta-analysis of randomised trials).',
          },
        },
        {
          refId: 'ramirez-campillo-2021',
          finding: {
            fr: 'L’entraînement par sauts a amélioré la détente, le sprint et la force réactive des coureurs d’endurance (21 études).',
            en: 'Jump training improved jumping, sprinting and reactive strength in endurance runners (21 studies).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'explosive-step-up',
    family: 'power-step-up',
    name: { fr: 'Montée sur banc explosive', en: 'Explosive step-up' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis'],
      secondary: ['glute-max', 'glute-med', 'soleus', 'gastrocnemius-medial', 'biceps-femoris'],
    },
    zoom: 'leg-front',
    qualities: ['power', 'strength'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv'],
    why: {
      fr: 'Pousser vite sur une jambe à partir d’un genou fléchi ressemble à la poussée sur la pédale lors d’une relance, ou à l’appui dans une côte raide. L’exercice développe la puissance de chaque jambe, avec une réception plus douce que les sauts au sol.',
      en: 'Driving hard off one bent leg resembles pushing the pedal in a surge, or a stride up a steep climb. It builds each leg’s power with a softer landing than floor jumps.',
    },
    how: {
      setup: {
        fr: 'Face à un banc ou une box assez haute pour que le genou soit plié à environ 90° quand le pied est posé dessus. Un pied à plat sur le banc.',
        en: 'Face a bench or box high enough that your knee is bent to about 90° with the foot on it. One foot flat on the bench.',
      },
      movement: {
        fr: 'Poussez le plus vite possible sur le pied posé sur le banc pour monter, en lançant le genou opposé vers le haut. Redescendez en contrôle sur la même jambe et recommencez.',
        en: 'Drive as fast as possible through the foot on the bench to step up, throwing the opposite knee upwards. Lower under control on the same leg and repeat.',
      },
      cues: [
        { fr: 'Toute la poussée vient de la jambe sur le banc, pas de celle au sol.', en: 'All the drive comes from the leg on the bench, not the one on the floor.' },
        { fr: 'Genou d’appui dans l’axe du pied.', en: 'Working knee in line with the foot.' },
        { fr: 'Montée explosive, descente contrôlée.', en: 'Explosive up, controlled down.' },
      ],
    },
    mistakes: [
      { fr: 'Pousser avec la jambe restée au sol.', en: 'Pushing off the leg on the floor.' },
      { fr: 'Banc trop haut : le bassin bascule.', en: 'Bench too high: the pelvis tilts.' },
      { fr: 'Genou qui part vers l’intérieur.', en: 'Knee drifting inwards.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Montée rapide', en: 'Fast step-up' },
        description: {
          fr: 'Montée explosive sans quitter le banc, genou opposé lancé haut, descente lente.',
          en: 'Explosive step-up without leaving the bench, opposite knee driven high, slow lowering.',
        },
        mastery: { fr: '3 × 6 par jambe, rapides et stables.', en: '3 × 6 per leg, fast and stable.' },
        dosage: { sets: 3, reps: [6, 6], tempo: '3-0-X', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 2,
        name: { fr: 'Montée sautée', en: 'Step-up jump' },
        description: {
          fr: 'Poussez assez fort pour que le pied d’appui décolle du banc, puis réceptionnez-vous sur ce même pied, sur le banc.',
          en: 'Drive hard enough for the working foot to leave the bench, then land on that same foot on the bench.',
        },
        mastery: { fr: '3 × 5 par jambe avec réceptions stables.', en: '3 × 5 per leg with stable landings.' },
        dosage: { sets: 3, reps: [5, 5], restSec: 90, perSide: true, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Changements de pied sautés', en: 'Alternating step-up jumps' },
        description: {
          fr: 'Un pied sur le banc : sautez et changez de pied en l’air pour atterrir avec l’autre pied sur le banc, puis enchaînez.',
          en: 'One foot on the bench: jump and switch feet in the air to land with the other foot on the bench, then keep going.',
        },
        mastery: { fr: '4 × 8 changements fluides.', en: '4 × 8 smooth switches.' },
        dosage: { sets: 4, reps: [8, 8], restSec: 90, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Montée explosive chargée', en: 'Loaded explosive step-up' },
        description: {
          fr: 'Avec haltères ou barre légère : montée la plus rapide possible, sans décoller du banc.',
          en: 'With dumbbells or a light barbell: step up as fast as possible, without leaving the bench.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge tant que la montée reste rapide.',
          en: 'Maintenance level: add load as long as the step-up stays fast.',
        },
        dosage: {
          sets: 4, reps: [4, 6], tempo: '2-0-X', restSec: 120, perSide: true,
          intensity: load('Charge légère à modérée, montée la plus rapide possible', 'Light to moderate load, step up as fast as possible'),
          frequency: freq.twoPerWeek,
        },
        requires: ['step'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Banc solide, box ou haute marche, posés contre un mur.', en: 'Sturdy bench, box or high step, set against a wall.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, bras le long du corps.', en: 'A dumbbell in each hand, arms by your sides.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre', en: 'Barbell' },
        instructions: { fr: 'Barre légère sur le haut du dos ; à réserver aux pratiquants à l’aise avec l’équilibre sur le banc.', en: 'Light barbell on the upper back; only if you are comfortable balancing on the bench.' },
      },
    ],
    precautions: [plyo.prerequisite, plyo.tendon, caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'paton-2005',
          finding: {
            fr: 'Chez 18 cyclistes sur route, 4 à 5 semaines de sauts unipodaux explosifs associés à des sprints en force sur le vélo ont amélioré la puissance sur 1 et 4 km d’environ 8 % ; l’effet propre des sauts n’est pas isolé.',
            en: 'In 18 road cyclists, 4–5 weeks of explosive single-leg jumps combined with high-resistance cycling sprints improved 1 km and 4 km power by about 8%; the effect of the jumps alone was not isolated.',
          },
        },
        {
          refId: 'beattie-2017',
          finding: {
            fr: 'Chez des cyclistes sur route, 20 semaines de force maximale et explosive ont amélioré la force maximale et la puissance de sprint sur le vélo (6 s) par rapport à un groupe contrôle (étude non randomisée).',
            en: 'In road cyclists, 20 weeks of maximal and explosive strength training improved maximal strength and 6-s bike sprint power versus a control group (non-randomised study).',
          },
        },
        {
          refId: 'yamamoto-2010',
          finding: {
            fr: 'Dans cette revue de 5 essais chez des cyclistes entraînés, les programmes qui remplaçaient une partie de l’endurance par de la musculation, souvent explosive, ont amélioré le contre-la-montre et la puissance maximale.',
            en: 'In this review of 5 trials in trained cyclists, programmes that replaced part of endurance training with resistance training, often explosive, improved time-trial performance and maximal power.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hang-pull',
    family: 'olympic-pull',
    name: { fr: 'Tirage explosif depuis la suspension (hang pull)', en: 'Hang pull' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes', 'thigh', 'trunk'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'biceps-femoris', 'semitendinosus'],
      secondary: ['adductor-magnus', 'vastus-lateralis', 'erector-spinae', 'trapezius-upper', 'trapezius-middle', 'gastrocnemius-medial', 'soleus'],
    },
    zoom: 'leg-back',
    qualities: ['power'],
    objectives: ['performance'],
    perfGoals: ['power', 'sprint-fv'],
    why: {
      fr: 'Les mouvements d’haltérophilie apprennent à tendre hanches, genoux et chevilles en même temps et le plus vite possible : c’est la « triple extension » de la poussée en sprint ou de la relance à vélo. Le tirage en est la version simple, sans réception de la barre sur les épaules.',
      en: 'Weightlifting movements teach you to extend hips, knees and ankles together as fast as possible: the “triple extension” of a sprint push-off or a surge on the bike. The pull is the simple version, without catching the bar on the shoulders.',
    },
    how: {
      setup: {
        fr: 'Debout, barre (ou haltères) tenue bras tendus contre les cuisses, prise un peu plus large que les hanches. Reculez légèrement les fesses jusqu’à ce que la barre arrive au-dessus des genoux, dos plat, épaules au-dessus de la barre.',
        en: 'Stand holding the bar (or dumbbells) at arm’s length against the thighs, grip slightly wider than hips. Push the hips back slightly until the bar is just above the knees, back flat, shoulders over the bar.',
      },
      movement: {
        fr: 'Tendez violemment hanches, genoux et chevilles en montant sur la pointe des pieds, puis haussez les épaules et tirez les coudes vers le haut et l’extérieur : la barre monte le long du corps jusqu’au bas de la poitrine. Laissez-la redescendre en contrôle jusqu’aux cuisses.',
        en: 'Violently extend hips, knees and ankles, rising onto your toes, then shrug and pull the elbows up and out: the bar travels up the body to the lower chest. Let it come back down under control to the thighs.',
      },
      cues: [
        { fr: 'Les jambes et la hanche lancent la barre ; les bras ne font que suivre.', en: 'The legs and hips launch the bar; the arms just follow.' },
        { fr: 'La barre reste collée au corps.', en: 'Keep the bar close to the body.' },
        { fr: 'Extension complète avant de tirer avec les bras.', en: 'Full extension before the arms pull.' },
      ],
    },
    mistakes: [
      { fr: 'Tirer avec les bras trop tôt.', en: 'Pulling with the arms too early.' },
      { fr: 'Laisser la barre partir vers l’avant.', en: 'Letting the bar swing forward.' },
      { fr: 'Se cambrer en arrière en fin d’extension.', en: 'Leaning back at the end of the extension.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Technique au bâton', en: 'Technique with a dowel' },
        description: {
          fr: 'Avec un bâton ou une barre à vide : position de départ, triple extension, haussement d’épaules.',
          en: 'With a dowel or empty bar: start position, triple extension, shrug.',
        },
        mastery: {
          fr: '3 × 8 dans le bon ordre : jambes, puis épaules, puis bras.',
          en: '3 × 8 in the right order: legs, then shoulders, then arms.',
        },
        dosage: { sets: 3, reps: [8, 8], restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Jump shrug', en: 'Jump shrug' },
        description: {
          fr: 'Barre légère ou haltères : triple extension explosive jusqu’à décoller légèrement du sol, haussement d’épaules, sans tirer avec les bras.',
          en: 'Light bar or dumbbells: explosive triple extension until your feet leave the floor slightly, shrug, no arm pull.',
        },
        mastery: { fr: '4 × 5 explosifs avec réception souple.', en: '4 × 5 explosive reps with soft landings.' },
        dosage: {
          sets: 4, reps: [5, 5], restSec: 90, perSide: false,
          intensity: load('Charge légère, vitesse maximale', 'Light load, maximal speed'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Hang high pull', en: 'Hang high pull' },
        description: {
          fr: 'Depuis au-dessus des genoux, tirage jusqu’au bas de la poitrine, coudes hauts.',
          en: 'From above the knees, pull to the lower chest with elbows high.',
        },
        mastery: { fr: '4 × 4 avec une barre rapide et collée au corps.', en: '4 × 4 with a fast bar kept close to the body.' },
        dosage: {
          sets: 4, reps: [3, 5], restSec: 120, perSide: false,
          intensity: load('Charge modérée, vitesse maximale', 'Moderate load, maximal speed'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Hang pull lourd', en: 'Heavy hang pull' },
        description: {
          fr: 'Depuis sous les genoux, charge plus lourde : extension complète et haussement d’épaules, sans tirage de bras.',
          en: 'From below the knees, heavier load: full extension and shrug, no arm pull.',
        },
        mastery: { fr: '5 × 3 avec une vitesse de barre maintenue.', en: '5 × 3 with bar speed maintained.' },
        dosage: {
          sets: 5, reps: [3, 3], restSec: 150, perSide: false,
          intensity: load('Charge lourde, extension la plus rapide possible', 'Heavy load, fastest possible extension'),
          frequency: freq.twoPerWeek,
        },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Hang power clean', en: 'Hang power clean' },
        description: {
          fr: 'Réception de la barre sur l’avant des épaules en quart de squat. À apprendre avec un entraîneur.',
          en: 'Catch the bar on the front of the shoulders in a quarter squat. Learn it with a coach.',
        },
        mastery: {
          fr: 'Niveau d’entretien : technique validée par un coach, charge augmentée par petits paliers.',
          en: 'Maintenance level: technique approved by a coach, load increased in small steps.',
        },
        dosage: {
          sets: 5, reps: [2, 3], restSec: 180, perSide: false,
          intensity: load('Charge modérée à lourde, technique parfaite', 'Moderate to heavy load, perfect technique'),
          frequency: freq.twoPerWeek,
        },
        requires: ['barbell'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Bâton ou manche à balai', en: 'Dowel or broomstick' },
        instructions: { fr: 'Pour apprendre l’ordre du mouvement (niveau 1).', en: 'To learn the movement sequence (level 1).' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères ou kettlebell', en: 'Dumbbells or kettlebell' },
        instructions: { fr: 'Haltères le long des cuisses ; même enchaînement, barre remplacée par les haltères.', en: 'Dumbbells alongside the thighs; same sequence, with dumbbells instead of a bar.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre et disques', en: 'Barbell and plates' },
        instructions: { fr: 'Barre olympique avec disques ; partez léger pour valider la technique.', en: 'Olympic bar with plates; start light to validate technique.' },
      },
    ],
    precautions: [
      {
        fr: 'Mouvement technique : apprenez-le progressivement, idéalement avec un coach, avant de charger.',
        en: 'Technical lift: learn it progressively, ideally with a coach, before adding load.',
      },
      heavy.scheduling,
      caution.painFlare,
    ],
    contraindications: [
      {
        fr: 'Douleur d’épaule ou de poignet à la réception de la barre : restez sur les niveaux de tirage (2 à 4).',
        en: 'Shoulder or wrist pain when catching the bar: stay on the pulling levels (2 to 4).',
      },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'hackett-2016',
          finding: {
            fr: 'Dans cette méta-analyse (6 études, 232 sportifs), l’haltérophilie a augmenté la détente verticale de 7,7 % par rapport au contrôle et de 5,1 % par rapport à la musculation classique, avec des gains comparables à la pliométrie.',
            en: 'In this meta-analysis (6 studies, 232 athletes), weightlifting increased vertical jump height by 7.7% versus control and 5.1% versus traditional resistance training, with gains similar to plyometrics.',
          },
        },
        {
          refId: 'morris-2022',
          finding: {
            fr: 'Comparée à la musculation classique, l’haltérophilie a davantage amélioré la détente et les charges soulevées ; ses effets sur le sprint, la puissance et la force étaient proches de ceux de la pliométrie (16 études).',
            en: 'Compared with traditional resistance training, weightlifting improved jump height and lifted loads more; its effects on sprint, power and strength were similar to plyometrics (16 studies).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'isometric-mid-thigh-pull',
    family: 'isometric-pull',
    name: { fr: 'Tirage isométrique mi-cuisse', en: 'Isometric mid-thigh pull' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'rectus-femoris'],
      secondary: ['glute-max', 'biceps-femoris', 'adductor-magnus', 'erector-spinae', 'trapezius-upper', 'forearm-flexors', 'soleus'],
    },
    zoom: 'leg-front',
    qualities: ['isometric', 'strength'],
    objectives: ['performance'],
    perfGoals: ['strength'],
    why: {
      fr: 'Pousser de toutes ses forces contre une résistance immobile développe la force maximale des jambes et des hanches, sans impact et sans phase de freinage. C’est une option simple quand la technique des charges lourdes n’est pas encore maîtrisée.',
      en: 'Pushing as hard as you can against an immovable resistance builds maximal leg and hip strength, with no impact and no braking phase. It is a simple option while heavy-lifting technique is still being learned.',
    },
    how: {
      setup: {
        fr: 'Barre bloquée à mi-cuisse (sur les sécurités d’une cage ou à la Smith machine), ou sangle solide passée sous les pieds. Genoux légèrement fléchis, buste penché, dos plat, épaules au-dessus de la barre, bras tendus.',
        en: 'Bar fixed at mid-thigh (on the safety pins of a rack or in a Smith machine), or a strong strap looped under the feet. Knees slightly bent, torso leaning forward, back flat, shoulders over the bar, arms straight.',
      },
      movement: {
        fr: 'Poussez le sol avec les jambes en tirant la barre vers le haut comme pour la soulever, en montant jusqu’à votre effort maximal en 1 à 2 secondes. Tenez cet effort, puis relâchez progressivement.',
        en: 'Push the floor away with your legs while pulling the bar up as if to lift it, building to maximal effort over 1–2 seconds. Hold that effort, then release gradually.',
      },
      cues: [
        { fr: 'Poussez le sol, bras tendus : ne tirez pas avec les bras.', en: 'Push the floor, arms straight: do not pull with the arms.' },
        { fr: 'Dos plat et gainé pendant tout l’effort.', en: 'Back flat and braced throughout.' },
        { fr: 'Montée en force progressive, sans à-coup.', en: 'Build force smoothly, without jerking.' },
      ],
      breathing: {
        fr: 'Inspirez et gainez avant l’effort, puis expirez en relâchant ; ne bloquez pas la respiration au-delà de l’effort.',
        en: 'Breathe in and brace before the effort, then breathe out as you release; do not hold your breath beyond the effort.',
      },
    },
    mistakes: [
      { fr: 'Arrondir le dos sous l’effort.', en: 'Rounding the back under effort.' },
      { fr: 'Plier les bras pour tirer.', en: 'Bending the arms to pull.' },
      { fr: 'Démarrer d’un coup sec, avec un à-coup sur le dos.', en: 'Starting with a sudden jerk that strains the back.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Effort sous-maximal', en: 'Submaximal effort' },
        description: {
          fr: 'Sangle ou barre fixe, environ 60 à 70 % de votre effort maximal, 5 secondes.',
          en: 'Strap or fixed bar, about 60–70% of maximal effort, 5 seconds.',
        },
        mastery: {
          fr: '5 × 5 s sans gêne dans le bas du dos, dos plat à chaque essai.',
          en: '5 × 5 s with no lower-back discomfort, back flat on every effort.',
        },
        dosage: { sets: 5, holdSec: 5, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Effort maximal', en: 'Maximal effort' },
        description: {
          fr: '5 secondes à effort maximal, après 2 efforts d’échauffement progressifs.',
          en: '5 seconds at maximal effort, after 2 progressive warm-up efforts.',
        },
        mastery: {
          fr: '5 × 5 s à effort maximal, position identique à chaque répétition.',
          en: '5 × 5 s at maximal effort, same position on every rep.',
        },
        dosage: { sets: 5, holdSec: 5, restSec: 120, perSide: false, intensity: rpe('9-10'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Montée en force rapide', en: 'Rapid force build-up' },
        description: {
          fr: 'Atteignez l’effort maximal le plus vite possible (intention explosive), sans à-coup, puis tenez.',
          en: 'Reach maximal effort as fast as possible (explosive intent), without jerking, then hold.',
        },
        mastery: {
          fr: '6 × 5 s avec un démarrage explosif mais contrôlé.',
          en: '6 × 5 s with an explosive yet controlled start.',
        },
        dosage: { sets: 6, holdSec: 5, restSec: 120, perSide: false, intensity: rpe('9-10'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Unipodal', en: 'Single-leg' },
        description: {
          fr: 'Même effort sur une jambe, en position de fente sous une barre fixe ou avec une sangle.',
          en: 'Same effort on one leg, in a split stance under a fixed bar or with a strap.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 4 × 5 s par jambe, en alternance avec la force dynamique.',
          en: 'Maintenance level: 4 × 5 s per leg, alternating with dynamic strength work.',
        },
        dosage: { sets: 4, holdSec: 5, restSec: 90, perSide: true, intensity: rpe('9'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'strap', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sangle ou serviette solide', en: 'Strap or strong towel' },
        instructions: {
          fr: 'Sangle non élastique ou serviette solide passée sous les deux pieds, tenue à mi-cuisse.',
          en: 'Non-elastic strap or strong towel looped under both feet, held at mid-thigh.',
        },
      },
      {
        id: 'rack', equipment: ['barbell'], loadable: false, rank: 2,
        name: { fr: 'Barre sur sécurités de cage', en: 'Bar on rack safety pins' },
        instructions: {
          fr: 'Barre posée sous les sécurités d’une cage, réglées à mi-cuisse.',
          en: 'Bar set under the safety pins of a rack, adjusted to mid-thigh.',
        },
      },
      {
        id: 'smith', equipment: ['gym'], loadable: false, rank: 3,
        name: { fr: 'Smith machine', en: 'Smith machine' },
        instructions: {
          fr: 'Barre verrouillée à mi-cuisse ou bloquée par les butées.',
          en: 'Bar locked at mid-thigh or held by the stoppers.',
        },
      },
    ],
    precautions: [
      {
        fr: 'Effort très intense : évitez-le en cas d’hypertension non contrôlée et ne bloquez pas la respiration longtemps.',
        en: 'Very intense effort: avoid it with uncontrolled high blood pressure and do not hold your breath for long.',
      },
      caution.painFlare,
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'lum-2023',
          finding: {
            fr: 'Chez 26 coureurs d’endurance, 6 semaines de renforcement isométrique (2 séances par semaine) ont amélioré le chrono sur 2,4 km autant que la pliométrie, avec un gain d’économie de course plus marqué.',
            en: 'In 26 endurance runners, 6 weeks of isometric strength training (twice a week) improved 2.4 km time as much as plyometrics, with a larger gain in running economy.',
          },
        },
        {
          refId: 'llanos-lagos-2024',
          finding: {
            fr: 'À l’inverse, cette méta-analyse ne retrouve pas d’amélioration de l’économie de course après un entraînement isométrique, contrairement aux charges lourdes et à la pliométrie.',
            en: 'Conversely, this meta-analysis found no improvement in running economy after isometric training, unlike heavy loads and plyometrics.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'sled-push',
    family: 'sled-push',
    name: { fr: 'Poussée de traîneau', en: 'Sled push' },
    sports: ['run'],
    zones: ['thigh', 'calf', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis', 'soleus', 'gastrocnemius-medial'],
      secondary: ['glute-max', 'biceps-femoris', 'gastrocnemius-lateral', 'achilles-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'power'],
    objectives: ['performance'],
    perfGoals: ['sprint-fv', 'strength'],
    why: {
      fr: 'Pousser un traîneau lourd oblige à appliquer la force vers l’arrière, dans le sol, comme lors d’une accélération ou d’une montée raide. C’est un travail de force proche du geste de course, sans impact ni phase de freinage.',
      en: 'Pushing a heavy sled forces you to drive force backwards into the ground, as when accelerating or climbing steeply. It is strength work close to the running action, with no impact or braking phase.',
    },
    how: {
      setup: {
        fr: 'Mains sur les montants du traîneau, corps incliné à environ 45°, une jambe en avant.',
        en: 'Hands on the sled posts, body leaning at about 45°, one leg forward.',
      },
      movement: {
        fr: 'Poussez le traîneau par des pas courts et puissants, en poussant le sol derrière vous avec l’avant-pied, sans relever le buste.',
        en: 'Drive the sled with short, powerful steps, pushing the ground back with the forefoot, without lifting the torso.',
      },
      cues: [
        { fr: 'Corps aligné de la tête aux talons, comme une planche inclinée.', en: 'Body in a straight line from head to heels, like an inclined plank.' },
        { fr: 'Pas courts et puissants.', en: 'Short, powerful steps.' },
        { fr: 'Le genou avance, le pied pousse vers l’arrière.', en: 'Knee drives forward, foot pushes back.' },
      ],
    },
    mistakes: [
      { fr: 'Dos arrondi ou fesses trop hautes.', en: 'Rounded back or hips too high.' },
      { fr: 'Charge si lourde que le traîneau s’arrête à chaque pas.', en: 'Load so heavy that the sled stops at every step.' },
      { fr: 'Relever le buste en cours d’effort.', en: 'Lifting the torso during the push.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Poussée contre un mur', en: 'Wall drive' },
        description: {
          fr: 'Mains au mur, corps incliné à 45°, une jambe levée genou haut : poussez le sol avec la jambe d’appui comme pour déplacer le mur, en tenant la position.',
          en: 'Hands on the wall, body at 45°, one knee driven up: push the ground with the standing leg as if to move the wall, holding the position.',
        },
        mastery: {
          fr: '4 × 10 s par jambe de poussée maximale, corps bien aligné.',
          en: '4 × 10 s per leg of maximal push, body well aligned.',
        },
        dosage: { sets: 4, holdSec: 10, restSec: 60, perSide: true, intensity: rpe('8-9'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Traîneau léger', en: 'Light sled' },
        description: {
          fr: 'Charge modérée, poussée rapide sur 10 à 15 m (environ 5 secondes).',
          en: 'Moderate load, fast push over 10–15 m (about 5 seconds).',
        },
        mastery: { fr: '6 poussées à vitesse régulière, posture stable.', en: '6 pushes at steady speed with stable posture.' },
        dosage: {
          sets: 6, holdSec: 5, restSec: 90, perSide: false,
          intensity: load('Charge modérée, poussée rapide', 'Moderate load, fast push'),
          frequency: freq.twoPerWeek,
        },
        requires: ['gym'],
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Traîneau lourd', en: 'Heavy sled' },
        description: {
          fr: 'Charge lourde qui ralentit nettement l’allure, marche puissante sur 10 à 15 m.',
          en: 'Heavy load that clearly slows you down, powerful march over 10–15 m.',
        },
        mastery: { fr: '6 poussées continues, sans arrêt du traîneau.', en: '6 continuous pushes without the sled stopping.' },
        dosage: {
          sets: 6, holdSec: 8, restSec: 150, perSide: false,
          intensity: load('Charge lourde, poussée continue', 'Heavy load, continuous push'),
          frequency: freq.twoPerWeek,
        },
        requires: ['gym'],
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Départs poussés', en: 'Sled starts' },
        description: {
          fr: 'Départ arrêté, accélération maximale sur 10 m avec une charge modérée.',
          en: 'Standing start, maximal acceleration over 10 m with a moderate load.',
        },
        mastery: {
          fr: 'Niveau d’entretien : gardez une vitesse élevée sur chaque départ ; allégez si elle chute.',
          en: 'Maintenance level: keep speed high on every start; lighten the load if it drops.',
        },
        dosage: { sets: 6, holdSec: 5, restSec: 180, perSide: false, intensity: maxIntent(), frequency: freq.twoPerWeek },
        requires: ['gym'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'wall', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Poussée isométrique contre un mur (niveau 1).', en: 'Isometric push against a wall (level 1).' },
      },
      {
        id: 'sled', equipment: ['gym'], loadable: true, rank: 2,
        name: { fr: 'Traîneau ou prowler', en: 'Sled or prowler' },
        instructions: { fr: 'Sur gazon synthétique ou piste dédiée ; la charge à prévoir dépend beaucoup du revêtement.', en: 'On artificial turf or a dedicated track; the load needed depends a lot on the surface.' },
      },
    ],
    precautions: [heavy.scheduling, caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'dougan-2025',
          finding: {
            fr: 'Dans cette méta-analyse (7 études), le sprint résisté (traîneau tiré ou poussé) a davantage amélioré la force horizontale, la puissance et l’accélération sur 5 à 20 m que le sprint sans charge.',
            en: 'In this meta-analysis (7 studies), resisted sprinting (towing or pushing a sled) improved horizontal force, power and 5–20 m acceleration more than unresisted sprinting.',
          },
        },
      ],
    },
  }),
] satisfies ReturnType<typeof defineExercise>[];
