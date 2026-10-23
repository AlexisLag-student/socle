/**
 * Exercices — pied et cheville : muscles du pied, proprioception, stabilisateurs de la cheville,
 * mobilité et sauts de réception (skill add-exercise).
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, rir, rpe, symptomGuided } from '../helpers';

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'short-foot',
    family: 'foot-intrinsic',
    name: { fr: 'Pied court (short foot)', en: 'Short foot exercise' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['abductor-hallucis', 'flexor-digitorum-brevis', 'quadratus-plantae'],
      secondary: ['abductor-digiti-minimi', 'plantar-fascia', 'tibialis-posterior'],
    },
    zoom: 'foot-sole',
    qualities: ['control', 'endurance'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'Les petits muscles de la plante du pied soutiennent l’arche et rigidifient le pied à chaque appui. Des muscles du pied entraînés aident le pied à amortir puis à pousser efficacement.',
      en: 'The small muscles of the sole support the arch and stiffen the foot at each step. Trained foot muscles help the foot absorb load and then push off efficiently.',
    },
    how: {
      setup: {
        fr: 'Assis, pied nu à plat au sol, genou au-dessus de la cheville.',
        en: 'Seated, bare foot flat on the floor, knee above the ankle.',
      },
      movement: {
        fr: 'Sans recroqueviller les orteils, rapprochez la base du gros orteil du talon : l’arche du pied se creuse et le pied « raccourcit ». Tenez, puis relâchez.',
        en: 'Without curling the toes, draw the base of the big toe towards the heel: the arch lifts and the foot “shortens”. Hold, then relax.',
      },
      cues: [
        { fr: 'Les orteils restent longs et à plat.', en: 'Keep the toes long and flat.' },
        { fr: 'La base du gros orteil reste au sol.', en: 'The base of the big toe stays on the floor.' },
        { fr: 'Le talon ne bouge pas.', en: 'The heel does not move.' },
      ],
      breathing: { fr: 'Respirez normalement pendant le maintien.', en: 'Breathe normally during the hold.' },
    },
    mistakes: [
      { fr: 'Griffer le sol avec les orteils.', en: 'Clawing the floor with the toes.' },
      { fr: 'Décoller la base du gros orteil en tournant le pied vers l’extérieur.', en: 'Lifting the base of the big toe by rolling the foot outwards.' },
      { fr: 'Contracter tout le mollet au lieu du pied.', en: 'Tensing the whole calf instead of the foot.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Assis', en: 'Seated' },
        description: { fr: 'Assis, pied à plat, maintien court.', en: 'Seated, foot flat, short hold.' },
        mastery: { fr: '3 × 10 maintiens de 5 s sans griffer les orteils.', en: '3 × 10 holds of 5 s without clawing the toes.' },
        dosage: { sets: 3, reps: [10, 10], holdSec: 5, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Debout, deux pieds', en: 'Standing, both feet' },
        description: { fr: 'Même contraction debout, le poids réparti sur les deux pieds.', en: 'Same contraction standing, weight shared over both feet.' },
        mastery: { fr: '3 × 10 maintiens de 5 s des deux côtés.', en: '3 × 10 holds of 5 s on both sides.' },
        dosage: { sets: 3, reps: [10, 10], holdSec: 5, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Sur une jambe', en: 'Single leg' },
        description: { fr: 'Debout sur une jambe, pied court maintenu.', en: 'Standing on one leg, holding the short foot.' },
        mastery: { fr: '3 × 8 maintiens de 10 s par pied, sans perdre l’équilibre.', en: '3 × 8 holds of 10 s per foot without losing balance.' },
        dosage: { sets: 3, reps: [8, 8], holdSec: 10, restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'En mouvement', en: 'With movement' },
        description: { fr: 'Pied court maintenu pendant un mini-squat sur une jambe ou une montée sur pointe.', en: 'Hold the short foot during a single-leg mini squat or a heel raise.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 par jambe, arche stable du début à la fin.', en: 'Maintenance level: 3 × 10 per leg with a stable arch throughout.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-1-2', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Pieds nus', en: 'Barefoot' },
        instructions: { fr: 'Pieds nus sur un sol ferme, éventuellement devant un miroir.', en: 'Barefoot on firm ground, ideally in front of a mirror.' },
      },
    ],
    precautions: [
      { fr: 'Des crampes du pied sont fréquentes au début : relâchez, puis reprenez avec des maintiens plus courts.', en: 'Foot cramps are common at first: relax, then resume with shorter holds.' },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'taddei-2020',
          finding: {
            fr: 'Chez 118 coureurs loisir, 8 semaines de renforcement des muscles du pied et de la cheville suivies d’un entretien à distance ont divisé par 2,4 le taux de blessures de course sur un an.',
            en: 'In 118 recreational runners, 8 weeks of foot and ankle muscle training followed by remote maintenance cut the running injury rate by a factor of 2.4 over one year.',
          },
        },
        {
          refId: 'taddei-2020-b',
          finding: {
            fr: 'Chez 28 coureurs, 8 semaines de renforcement des muscles intrinsèques du pied ont augmenté leur volume et la force de propulsion verticale en course.',
            en: 'In 28 runners, 8 weeks of intrinsic foot muscle training increased their volume and vertical propulsive force during running.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'toe-flexor-strength',
    family: 'toe-flexor',
    name: { fr: 'Renforcement des orteils (toe yoga, pression des orteils)', en: 'Toe strengthening (toe yoga, toe press)' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['flexor-digitorum-brevis', 'abductor-hallucis', 'quadratus-plantae'],
      secondary: ['flexor-hallucis-longus', 'flexor-digitorum-longus', 'plantar-fascia'],
    },
    zoom: 'foot-sole',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'pain', 'return'],
    why: {
      fr: 'Les orteils, et surtout le gros orteil, transmettent la poussée finale de chaque foulée. Des fléchisseurs d’orteils forts stabilisent l’avant-pied et répartissent mieux la charge sous le pied.',
      en: 'The toes, especially the big toe, transmit the final push of every stride. Strong toe flexors stabilise the forefoot and spread load better under the foot.',
    },
    how: {
      setup: {
        fr: 'Assis ou debout, pieds nus à plat au sol.',
        en: 'Seated or standing, bare feet flat on the floor.',
      },
      movement: {
        fr: 'Selon le niveau : soulevez le gros orteil seul puis les quatre autres seuls (toe yoga), ou appuyez fortement les orteils dans le sol sans décoller le reste du pied.',
        en: 'Depending on the level: lift the big toe alone, then the other four alone (toe yoga), or press the toes firmly into the floor without lifting the rest of the foot.',
      },
      cues: [
        { fr: 'Le reste du pied reste immobile.', en: 'The rest of the foot stays still.' },
        { fr: 'Orteils longs : on presse, on ne griffe pas.', en: 'Long toes: press, don’t claw.' },
      ],
    },
    mistakes: [
      { fr: 'Rouler le pied vers l’extérieur pour aider le gros orteil.', en: 'Rolling the foot outwards to help the big toe.' },
      { fr: 'Recroqueviller les orteils au lieu de les appuyer.', en: 'Curling the toes instead of pressing them down.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Toe yoga assis', en: 'Seated toe yoga' },
        description: { fr: 'Alternez : gros orteil levé (les autres au sol), puis quatre orteils levés (gros orteil au sol).', en: 'Alternate: big toe up (others down), then four toes up (big toe down).' },
        mastery: { fr: '3 × 10 alternances propres de chaque pied.', en: '3 × 10 clean alternations with each foot.' },
        dosage: { sets: 3, reps: [10, 10], restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Pression des orteils assis', en: 'Seated toe press' },
        description: { fr: 'Assis, appuyez fort le gros orteil puis les autres orteils dans le sol, maintenez.', en: 'Seated, press the big toe and then the other toes firmly into the floor and hold.' },
        mastery: { fr: '5 × 10 s par pied, sans crampe.', en: '5 × 10 s per foot without cramping.' },
        dosage: { sets: 5, holdSec: 10, restSec: 20, perSide: true, intensity: rpe('6-7'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Pression des orteils debout', en: 'Standing toe press' },
        description: { fr: 'Debout, poids légèrement vers l’avant, appuyez fort les orteils dans le sol.', en: 'Standing with the weight slightly forward, press the toes hard into the floor.' },
        mastery: { fr: '5 × 10 s par pied, en appui sur une jambe.', en: '5 × 10 s per foot, standing on one leg.' },
        dosage: { sets: 5, holdSec: 10, restSec: 30, perSide: true, intensity: rpe('7-8'), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Sur pointe, orteils actifs', en: 'On tiptoe, active toes' },
        description: { fr: 'Sur une jambe, montez sur pointe et tenez en poussant activement le gros orteil dans le sol.', en: 'On one leg, rise onto your toes and hold while actively pressing the big toe into the floor.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 8 maintiens de 5 s par pied.', en: 'Maintenance level: 3 × 8 holds of 5 s per foot.' },
        dosage: { sets: 3, reps: [8, 8], holdSec: 5, restSec: 45, perSide: true, intensity: rpe('7-8'), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Pieds nus', en: 'Barefoot' },
        instructions: { fr: 'Pieds nus. Variante : ramasser une serviette avec les orteils.', en: 'Barefoot. Variation: scrunch a towel towards you with the toes.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Assis, élastique passé sous les orteils et tenu en main : fléchissez les orteils contre la résistance.', en: 'Seated, band looped under the toes and held in your hand: flex the toes against the resistance.' },
      },
    ],
    precautions: [
      { fr: 'Des crampes sont fréquentes au début : raccourcissez le maintien.', en: 'Cramps are common at first: shorten the holds.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'taddei-2020-b',
          finding: {
            fr: 'Un programme de 8 semaines centré sur les muscles intrinsèques du pied (dont des exercices des orteils) a augmenté leur volume et la force de propulsion en course chez 28 coureurs.',
            en: 'An 8-week programme focused on the intrinsic foot muscles (including toe exercises) increased their volume and propulsive force during running in 28 runners.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'single-leg-balance',
    family: 'balance-static',
    name: { fr: 'Équilibre sur une jambe', en: 'Single-leg balance' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['fibularis-longus', 'fibularis-brevis', 'tibialis-anterior'],
      secondary: ['tibialis-posterior', 'soleus', 'glute-med', 'abductor-hallucis'],
    },
    zoom: 'leg-front',
    qualities: ['control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'La cheville se stabilise grâce à des réflexes rapides des muscles de la jambe et du pied. Les entraîner protège des entorses, en course sur sentier comme lors des marches et descentes du vélo.',
      en: 'The ankle is stabilised by fast reflexes of the leg and foot muscles. Training them protects against sprains, on trails as well as when stepping on and off the bike.',
    },
    how: {
      setup: {
        fr: 'Debout sur une jambe, pied nu ou en chaussures, genou légèrement fléchi, un appui à portée de main.',
        en: 'Standing on one leg, barefoot or in shoes, knee slightly bent, a support within reach.',
      },
      movement: {
        fr: 'Tenez l’équilibre pendant la durée indiquée en gardant le bassin horizontal, puis changez de jambe.',
        en: 'Hold your balance for the set time keeping the pelvis level, then switch legs.',
      },
      cues: [
        { fr: 'Le pied reste « vivant » : les orteils et la cheville corrigent en permanence.', en: 'Keep the foot “alive”: toes and ankle constantly adjust.' },
        { fr: 'Bassin horizontal, genou dans l’axe du pied.', en: 'Pelvis level, knee in line with the foot.' },
      ],
    },
    mistakes: [
      { fr: 'Verrouiller le genou en extension.', en: 'Locking the knee straight.' },
      { fr: 'Laisser tomber la hanche du côté de la jambe levée.', en: 'Letting the hip drop on the side of the raised leg.' },
      { fr: 'Rester trop longtemps au même niveau : la difficulté doit progresser.', en: 'Staying at the same level too long: difficulty must progress.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sol, yeux ouverts', en: 'Floor, eyes open' },
        description: { fr: 'Sur une jambe, sol stable, yeux ouverts.', en: 'On one leg, stable floor, eyes open.' },
        mastery: { fr: '3 × 30 s par jambe sans poser le pied.', en: '3 × 30 s per leg without touching down.' },
        dosage: { sets: 3, holdSec: 30, restSec: 20, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Sol, yeux fermés', en: 'Floor, eyes closed' },
        description: { fr: 'Même exercice, yeux fermés.', en: 'Same exercise with the eyes closed.' },
        mastery: { fr: '3 × 30 s par jambe yeux fermés, symétrique des deux côtés.', en: '3 × 30 s per leg eyes closed, symmetrical on both sides.' },
        dosage: { sets: 3, holdSec: 30, restSec: 20, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Surface instable', en: 'Unstable surface' },
        description: { fr: 'Sur un coussin, un oreiller plié ou un plateau d’équilibre.', en: 'On a cushion, a folded pillow or a balance board.' },
        mastery: { fr: '3 × 45 s par jambe yeux ouverts sans poser le pied.', en: '3 × 45 s per leg eyes open without touching down.' },
        dosage: { sets: 3, holdSec: 45, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Avec perturbations', en: 'With perturbations' },
        description: { fr: 'Sur une jambe, lancers de balle contre un mur, mouvements de bras ou balayages de l’autre jambe.', en: 'On one leg with ball throws against a wall, arm movements or sweeps of the other leg.' },
        mastery: { fr: '3 × 45 s par jambe en gardant le contrôle.', en: '3 × 45 s per leg while staying in control.' },
        dosage: { sets: 3, holdSec: 45, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 5,
        name: { fr: 'Instable et dynamique', en: 'Unstable and dynamic' },
        description: { fr: 'Surface instable, yeux fermés ou mini-squats sur une jambe.', en: 'Unstable surface with eyes closed, or single-leg mini squats.' },
        mastery: { fr: 'Niveau d’entretien : 2 à 3 fois par semaine.', en: 'Maintenance level: 2 to 3 times a week.' },
        dosage: { sets: 3, holdSec: 45, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Coussin ou oreiller plié pour la surface instable.', en: 'Cushion or folded pillow for the unstable surface.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique autour de la cheville libre : balayages vers l’avant, le côté et l’arrière pendant l’équilibre.', en: 'Band around the free ankle: sweep forwards, sideways and backwards while balancing.' },
      },
    ],
    precautions: [caution.balanceSupport],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'martin-2021',
          finding: {
            fr: 'La recommandation JOSPT 2021 recommande fortement (grade A) les programmes d’équilibre et de proprioception pour prévenir la récidive après une entorse latérale de cheville.',
            en: 'The 2021 JOSPT guideline strongly recommends (grade A) balance and proprioceptive exercise programmes to prevent recurrence after a lateral ankle sprain.',
          },
        },
        {
          refId: 'hupperets-2009',
          finding: {
            fr: 'Chez 522 sportifs ayant eu une entorse, 8 semaines de proprioception à domicile, sans supervision, ont réduit de 35 % le risque de récidive sur un an.',
            en: 'In 522 athletes after an ankle sprain, 8 weeks of unsupervised home proprioceptive training reduced the risk of recurrence by 35% over one year.',
          },
        },
        {
          refId: 'doherty-2017',
          finding: {
            fr: 'Cette synthèse de 46 revues retrouve des preuves modérées en faveur du travail neuromusculaire pour prévenir la récidive d’entorse de cheville.',
            en: 'This overview of 46 reviews found moderate evidence that neuromuscular training prevents recurrent ankle sprains.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hop-stabilization',
    family: 'hop-landing',
    name: { fr: 'Saut sur une jambe et réception stabilisée', en: 'Single-leg hop and stick' },
    sports: ['run'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'soleus', 'fibularis-longus', 'achilles-tendon'],
      secondary: ['glute-max', 'glute-med', 'vastus-lateralis', 'tibialis-posterior', 'fibularis-brevis'],
    },
    zoom: 'leg-back',
    qualities: ['control', 'power'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'Courir, c’est enchaîner des petits sauts d’une jambe sur l’autre. Apprendre à réceptionner et à stabiliser un saut prépare la cheville et le genou aux appuis rapides, aux trous et aux changements de direction.',
      en: 'Running is a series of small hops from one leg to the other. Learning to land and stabilise a hop prepares the ankle and knee for quick steps, uneven ground and changes of direction.',
    },
    how: {
      setup: {
        fr: 'Debout sur une jambe, genou légèrement fléchi, sur un sol ferme.',
        en: 'Standing on one leg, knee slightly bent, on firm ground.',
      },
      movement: {
        fr: 'Sautez, réceptionnez-vous en souplesse sur la même jambe et figez la position 3 secondes avant le saut suivant.',
        en: 'Hop, land softly on the same leg and freeze the position for 3 seconds before the next hop.',
      },
      cues: [
        { fr: 'Réception silencieuse sur l’avant-pied, puis le talon.', en: 'Quiet landing on the forefoot, then the heel.' },
        { fr: 'Genou dans l’axe du pied, bassin horizontal.', en: 'Knee in line with the foot, pelvis level.' },
        { fr: 'Figez 3 secondes sans sautiller.', en: 'Freeze for 3 seconds without hopping about.' },
      ],
    },
    mistakes: [
      { fr: 'Réception jambe tendue et bruyante.', en: 'Stiff-legged, noisy landing.' },
      { fr: 'Genou qui part vers l’intérieur.', en: 'Knee caving inwards.' },
      { fr: 'Enchaîner sans stabiliser.', en: 'Chaining hops without stabilising.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds vers un pied', en: 'Two feet to one' },
        description: { fr: 'Petit saut sur deux pieds, réception sur une jambe.', en: 'Small two-foot jump, landing on one leg.' },
        mastery: { fr: '3 × 6 réceptions stables par jambe.', en: '3 × 6 stable landings per leg.' },
        dosage: { sets: 3, reps: [5, 6], restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Sur place, une jambe', en: 'On the spot, single leg' },
        description: { fr: 'Saut vertical sur une jambe, réception sur la même jambe.', en: 'Vertical hop on one leg, landing on the same leg.' },
        mastery: { fr: '3 × 8 par jambe, réceptions silencieuses et symétriques.', en: '3 × 8 per leg, quiet and symmetrical landings.' },
        dosage: { sets: 3, reps: [6, 8], restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Vers l’avant', en: 'Forwards' },
        description: { fr: 'Saut vers l’avant de 30 à 50 cm, réception tenue 3 s.', en: 'Forward hop of 30 to 50 cm, landing held for 3 s.' },
        mastery: { fr: '3 × 6 par jambe, distance identique des deux côtés.', en: '3 × 6 per leg, same distance on both sides.' },
        dosage: { sets: 3, reps: [6, 6], restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Latéral et diagonal', en: 'Sideways and diagonal' },
        description: { fr: 'Sauts vers le côté et en diagonale, réception tenue 3 s.', en: 'Hops sideways and diagonally, landing held for 3 s.' },
        mastery: { fr: '3 × 6 par jambe dans chaque direction, sans perte d’équilibre.', en: '3 × 6 per leg in each direction without losing balance.' },
        dosage: { sets: 3, reps: [6, 8], restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Enchaînements réactifs', en: 'Reactive sequences' },
        description: { fr: 'Directions variées annoncées par un partenaire ou au hasard, ou réception sur coussin.', en: 'Varied directions called by a partner or chosen at random, or landing on a cushion.' },
        mastery: { fr: 'Niveau d’entretien avant les séances de vitesse ou de trail.', en: 'Maintenance level before speed or trail sessions.' },
        dosage: { sets: 3, reps: [6, 8], restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sol ferme, marquez des repères au sol pour les directions.', en: 'Firm ground, mark targets on the floor for the directions.' },
      },
      {
        id: 'step', equipment: ['step'], loadable: false, rank: 2,
        name: { fr: 'Descente de marche', en: 'Step drop' },
        instructions: { fr: 'Descendez d’une marche basse (10 à 20 cm) et réceptionnez-vous sur une jambe.', en: 'Drop off a low step (10 to 20 cm) and land on one leg.' },
      },
    ],
    precautions: [caution.noPainJump, caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'martin-2021',
          finding: {
            fr: 'La recommandation JOSPT 2021 recommande (grade A) les programmes d’équilibre et de proprioception pour prévenir les récidives d’entorse de cheville.',
            en: 'The 2021 JOSPT guideline recommends (grade A) balance and proprioceptive programmes to prevent recurrent ankle sprains.',
          },
        },
        {
          refId: 'marques-2025',
          finding: {
            fr: 'Dans une méta-analyse d’essais de prévention, l’entraînement neuromusculaire réduisait le risque de syndrome de stress tibial médial (4 essais, 3 887 participants, certitude élevée).',
            en: 'In a meta-analysis of prevention trials, neuromuscular training reduced the risk of medial tibial stress syndrome (4 trials, 3,887 participants, high certainty).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'star-excursion-reach',
    family: 'balance-reach',
    name: { fr: 'Atteintes en étoile (Y-balance)', en: 'Star excursion reach (Y-balance)' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle', 'knee'],
    half: 'lower',
    muscles: {
      primary: ['fibularis-longus', 'tibialis-anterior', 'vastus-medialis', 'vastus-lateralis'],
      secondary: ['glute-med', 'glute-max', 'soleus', 'tibialis-posterior'],
    },
    zoom: 'leg-front',
    qualities: ['control', 'mobility'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'Tendre la jambe libre le plus loin possible oblige la cheville, le genou et la hanche d’appui à travailler ensemble. C’est un équilibre dynamique proche des appuis de la course en terrain varié.',
      en: 'Reaching the free leg as far as possible forces the standing ankle, knee and hip to work together. It is dynamic balance close to running on varied terrain.',
    },
    how: {
      setup: {
        fr: 'Debout sur une jambe au centre d’une étoile (trois ou huit lignes au sol), mains sur les hanches.',
        en: 'Standing on one leg at the centre of a star (three or eight lines on the floor), hands on the hips.',
      },
      movement: {
        fr: 'Pliez la jambe d’appui et allez toucher légèrement le sol le plus loin possible avec la pointe de l’autre pied, dans chaque direction, puis revenez au centre.',
        en: 'Bend the standing leg and lightly tap the floor as far as possible with the other foot in each direction, then return to the centre.',
      },
      cues: [
        { fr: 'Le talon d’appui reste au sol.', en: 'The standing heel stays down.' },
        { fr: 'Touche légère : le poids reste sur la jambe d’appui.', en: 'Light tap: the weight stays on the standing leg.' },
        { fr: 'Genou d’appui dans l’axe du pied.', en: 'Standing knee in line with the foot.' },
      ],
    },
    mistakes: [
      { fr: 'S’appuyer sur le pied qui touche le sol.', en: 'Leaning on the reaching foot.' },
      { fr: 'Décoller le talon d’appui.', en: 'Lifting the standing heel.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Trois directions, amplitude modérée', en: 'Three directions, moderate reach' },
        description: { fr: 'Avant, arrière-intérieur et arrière-extérieur, sans chercher la distance maximale.', en: 'Forward, back-inward and back-outward, without chasing maximal distance.' },
        mastery: { fr: '3 tours de 5 touches par direction et par jambe, sans perte d’équilibre.', en: '3 rounds of 5 taps per direction and per leg without losing balance.' },
        dosage: { sets: 3, reps: [5, 5], restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Trois directions, amplitude maximale', en: 'Three directions, maximal reach' },
        description: { fr: 'Même parcours en allant le plus loin possible.', en: 'Same pattern reaching as far as possible.' },
        mastery: { fr: 'Moins de 4 cm d’écart entre les deux jambes sur l’atteinte avant.', en: 'Less than 4 cm difference between legs on the forward reach.' },
        dosage: { sets: 3, reps: [5, 6], restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Huit directions', en: 'Eight directions' },
        description: { fr: 'Étoile complète à huit branches, enchaînées sans reposer le pied.', en: 'Full eight-point star, linked without putting the foot down.' },
        mastery: { fr: '3 tours complets par jambe sans poser le pied.', en: '3 full rounds per leg without putting the foot down.' },
        dosage: { sets: 3, reps: [8, 8], restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Avec charge', en: 'Loaded' },
        description: { fr: 'Haltère tenu du côté opposé à la jambe d’appui.', en: 'Dumbbell held on the side opposite the standing leg.' },
        mastery: { fr: 'Niveau d’entretien.', en: 'Maintenance level.' },
        dosage: { sets: 3, reps: [6, 8], restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Tracez les directions avec du ruban adhésif ou repérez-les sur un carrelage.', en: 'Mark the directions with tape or use floor tiles as guides.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Haltère léger à modéré, tenu bras tendu.', en: 'Light to moderate dumbbell held with a straight arm.' },
      },
    ],
    precautions: [caution.balanceSupport, caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'plisky-2006',
          finding: {
            fr: 'Chez 235 basketteurs lycéens, une différence de plus de 4 cm entre les jambes à l’atteinte avant multipliait par 2,5 le risque de blessure du membre inférieur (étude du test, pas de l’entraînement).',
            en: 'In 235 high-school basketball players, a difference of more than 4 cm between legs on the forward reach was linked to a 2.5-fold higher lower-limb injury risk (a study of the test, not of training).',
          },
        },
        {
          refId: 'mckeon-2009',
          finding: {
            fr: 'Chez 29 personnes souffrant d’instabilité chronique de cheville, 4 semaines d’équilibre dynamique sur une jambe ont amélioré la stabilité de la coordination jambe–arrière-pied à la marche.',
            en: 'In 29 people with chronic ankle instability, 4 weeks of dynamic single-leg balance training improved the stability of shank–rearfoot coordination during walking.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'band-ankle-inversion',
    family: 'ankle-inversion',
    name: { fr: 'Inversion de cheville contre élastique (tibial postérieur)', en: 'Banded ankle inversion (tibialis posterior)' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['tibialis-posterior'],
      secondary: ['tibialis-anterior', 'flexor-digitorum-longus', 'flexor-hallucis-longus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'endurance'],
    objectives: ['pain', 'return', 'prevention'],
    why: {
      fr: 'Le tibial postérieur soutient l’arche interne et freine l’affaissement du pied à chaque appui. Il travaille beaucoup en course longue et en descente.',
      en: 'The tibialis posterior supports the inner arch and controls the foot rolling in at each step. It works hard on long runs and downhills.',
    },
    how: {
      setup: {
        fr: 'Assis, jambe tendue ou croisée, élastique attaché sur le côté extérieur et passé autour de l’avant-pied.',
        en: 'Seated with the leg straight or crossed, band anchored on the outer side and looped around the forefoot.',
      },
      movement: {
        fr: 'Tournez la plante du pied vers l’intérieur et vers le bas contre l’élastique, puis revenez lentement.',
        en: 'Turn the sole of the foot inwards and downwards against the band, then return slowly.',
      },
      cues: [
        { fr: 'Le mouvement vient de la cheville, pas de la hanche.', en: 'The movement comes from the ankle, not the hip.' },
        { fr: 'Retour lent, en 3 à 4 secondes.', en: 'Slow return, over 3 to 4 seconds.' },
      ],
    },
    mistakes: [
      { fr: 'Tourner la jambe entière au lieu du pied.', en: 'Rotating the whole leg instead of the foot.' },
      { fr: 'Recroqueviller les orteils.', en: 'Curling the toes.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie', en: 'Isometric' },
        description: { fr: 'Pousser le bord interne du pied contre un pied de table ou l’autre pied, sans bouger.', en: 'Push the inner edge of the foot against a table leg or the other foot, without moving.' },
        mastery: { fr: '5 × 30 s par pied avec une gêne stable ou en baisse.', en: '5 × 30 s per foot with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Élastique léger', en: 'Light band' },
        description: { fr: 'Inversion contre un élastique léger, amplitude complète.', en: 'Inversion against a light band, full range.' },
        mastery: { fr: '3 × 15 répétitions sans douleur accrue le lendemain.', en: '3 × 15 reps without increased pain the next day.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-1', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Élastique fort', en: 'Strong band' },
        description: { fr: 'Élastique plus résistant, même tempo.', en: 'Stronger band, same tempo.' },
        mastery: { fr: '3 × 15 avec un élastique fort.', en: '3 × 15 with a strong band.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Excentrique lent', en: 'Slow eccentric' },
        description: { fr: 'Élastique fort, retour très lent en 4 secondes.', en: 'Strong band, very slow return over 4 seconds.' },
        mastery: { fr: 'Niveau d’entretien ; complétez par les montées sur pointes balle serrée.', en: 'Maintenance level; add heel raises with a ball between the heels.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '4-0-1', restSec: 60, perSide: true, intensity: rir('1-2'), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Résistance avec l’autre pied', en: 'Resistance from the other foot' },
        instructions: { fr: 'Croisez l’autre pied par-dessus et dosez la résistance à la main ou au pied.', en: 'Cross the other foot over and adjust the resistance with your hand or foot.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique attaché à un pied de meuble, du côté extérieur.', en: 'Band tied to a furniture leg on the outer side.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Sangle de cheville sur la poulie basse, assis de profil.', en: 'Ankle strap on the low cable, seated side-on.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'kulig-2009',
          finding: {
            fr: 'Chez 36 adultes atteints de tendinopathie du tibial postérieur, ajouter des exercices progressifs contre résistance aux semelles et aux étirements a davantage réduit la douleur et amélioré la fonction ressentie en 12 semaines.',
            en: 'In 36 adults with tibialis posterior tendinopathy, adding progressive resistance exercise to orthoses and stretching further reduced pain and improved perceived function over 12 weeks.',
          },
        },
        {
          refId: 'hall-2015',
          finding: {
            fr: 'Chez 39 personnes avec instabilité chronique de cheville, 6 semaines d’exercices à l’élastique, 3 fois par semaine, ont augmenté la force (notamment en inversion et en éversion) et diminué la sensation d’instabilité.',
            en: 'In 39 people with chronic ankle instability, 6 weeks of band exercises 3 times a week increased strength (including inversion and eversion) and reduced perceived instability.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'band-ankle-eversion',
    family: 'ankle-eversion',
    name: { fr: 'Éversion de cheville contre élastique (fibulaires)', en: 'Banded ankle eversion (peroneals)' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['fibularis-longus', 'fibularis-brevis'],
      secondary: ['extensor-digitorum-longus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'pain', 'return'],
    why: {
      fr: 'Les muscles fibulaires, sur le côté extérieur de la jambe, empêchent la cheville de se tordre vers l’extérieur. Ils sont la première protection contre l’entorse, surtout en trail.',
      en: 'The peroneal muscles, on the outer side of the leg, stop the ankle rolling outwards. They are the first line of defence against sprains, especially on trails.',
    },
    how: {
      setup: {
        fr: 'Assis, jambe tendue, élastique attaché du côté intérieur et passé autour de l’avant-pied.',
        en: 'Seated with the leg straight, band anchored on the inner side and looped around the forefoot.',
      },
      movement: {
        fr: 'Tournez la plante du pied vers l’extérieur contre l’élastique, puis revenez lentement.',
        en: 'Turn the sole of the foot outwards against the band, then return slowly.',
      },
      cues: [
        { fr: 'Gardez la jambe immobile : seule la cheville tourne.', en: 'Keep the leg still: only the ankle turns.' },
        { fr: 'Retour contrôlé, sans laisser l’élastique ramener le pied.', en: 'Controlled return, don’t let the band snap the foot back.' },
      ],
    },
    mistakes: [
      { fr: 'Tourner la hanche ou le genou vers l’extérieur.', en: 'Rotating the hip or knee outwards.' },
      { fr: 'Relever seulement les orteils.', en: 'Only lifting the toes.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie', en: 'Isometric' },
        description: { fr: 'Pousser le bord extérieur du pied contre un mur ou un pied de meuble, sans bouger.', en: 'Push the outer edge of the foot against a wall or furniture leg, without moving.' },
        mastery: { fr: '5 × 30 s par pied, gêne stable ou en baisse.', en: '5 × 30 s per foot, discomfort stable or decreasing.' },
        dosage: { sets: 5, holdSec: 30, restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Élastique léger', en: 'Light band' },
        description: { fr: 'Éversion contre un élastique léger, amplitude complète.', en: 'Eversion against a light band, full range.' },
        mastery: { fr: '3 × 15 répétitions contrôlées.', en: '3 × 15 controlled reps.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-1', restSec: 45, perSide: true, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Élastique fort', en: 'Strong band' },
        description: { fr: 'Élastique plus résistant, retour en 3 secondes.', en: 'Stronger band, 3-second return.' },
        mastery: { fr: '3 × 15 avec un élastique fort, symétrique des deux côtés.', en: '3 × 15 with a strong band, symmetrical on both sides.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Debout, en charge', en: 'Standing, weight-bearing' },
        description: { fr: 'Debout sur la jambe de travail, élastique autour de l’autre cheville : balayages latéraux rapides qui obligent les fibulaires d’appui à stabiliser.', en: 'Standing on the working leg with a band around the other ankle: quick side sweeps that force the standing peroneals to stabilise.' },
        mastery: { fr: 'Niveau d’entretien, à associer aux sauts de cheville.', en: 'Maintenance level, combine with ankle hops.' },
        dosage: { sets: 3, reps: [12, 15], restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Résistance manuelle', en: 'Manual resistance' },
        instructions: { fr: 'Résistance avec la main ou contre un pied de meuble (isométrie).', en: 'Resistance from your hand or against a furniture leg (isometric).' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique attaché à un pied de meuble, du côté intérieur.', en: 'Band tied to a furniture leg on the inner side.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Sangle de cheville sur la poulie basse, assis de profil.', en: 'Ankle strap on the low cable, seated side-on.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'hall-2015',
          finding: {
            fr: 'Chez 39 personnes avec instabilité chronique de cheville, 6 semaines d’exercices à l’élastique ont augmenté la force en éversion et en inversion et diminué la sensation d’instabilité, sans améliorer à elles seules les tests de saut.',
            en: 'In 39 people with chronic ankle instability, 6 weeks of band exercises increased eversion and inversion strength and reduced perceived instability, but did not on their own improve hop tests.',
          },
        },
        {
          refId: 'doherty-2017',
          finding: {
            fr: 'Cette synthèse de revues conclut que l’exercice et les orthèses de cheville aident à prévenir l’instabilité chronique après une entorse.',
            en: 'This overview of reviews concludes that exercise therapy and bracing help prevent chronic ankle instability after a sprain.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'tibialis-anterior-raise',
    family: 'ankle-dorsiflexion',
    name: { fr: 'Relevé de pointe (tibial antérieur)', en: 'Tibialis raise' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['tibialis-anterior'],
      secondary: ['extensor-digitorum-longus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'endurance'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'Le tibial antérieur freine la descente du pied à chaque attaque du sol, surtout en descente, et relève le pied pendant la phase aérienne. Au vélo, il aide à remonter la pédale.',
      en: 'The tibialis anterior brakes the foot as it lands, especially downhill, and lifts the foot during swing. On the bike, it helps lift the pedal.',
    },
    how: {
      setup: {
        fr: 'Dos appuyé contre un mur, talons à 20 à 40 cm du mur, jambes tendues.',
        en: 'Back against a wall, heels 20 to 40 cm from the wall, legs straight.',
      },
      movement: {
        fr: 'Relevez les pointes de pied le plus haut possible en gardant les talons au sol, puis reposez-les lentement.',
        en: 'Lift the front of your feet as high as possible keeping the heels down, then lower them slowly.',
      },
      cues: [
        { fr: 'Les talons restent au sol.', en: 'Keep the heels down.' },
        { fr: 'Montez haut, redescendez lentement.', en: 'Lift high, lower slowly.' },
      ],
    },
    mistakes: [
      { fr: 'Plier les hanches pour s’aider.', en: 'Bending at the hips to help.' },
      { fr: 'Laisser retomber les pieds.', en: 'Letting the feet slap down.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds, talons proches du mur', en: 'Both feet, heels close to the wall' },
        description: { fr: 'Talons à environ 20 cm du mur.', en: 'Heels about 20 cm from the wall.' },
        mastery: { fr: '3 × 20 répétitions en pleine amplitude.', en: '3 × 20 reps through full range.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-0-1', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Talons éloignés du mur', en: 'Heels further from the wall' },
        description: { fr: 'Talons à 40 cm ou plus : le poids du corps à soulever augmente.', en: 'Heels 40 cm or more away: more body weight to lift.' },
        mastery: { fr: '3 × 20 avec les talons à 40 cm.', en: '3 × 20 with the heels 40 cm away.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-0-1', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: { fr: 'Même mouvement sur un seul pied.', en: 'Same movement on one foot.' },
        mastery: { fr: '3 × 15 par jambe, symétriques.', en: '3 × 15 per leg, symmetrical.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Chargé', en: 'Loaded' },
        description: { fr: 'Assis au bord d’un banc, charge sur l’avant-pied (haltère, élastique ou appareil dédié).', en: 'Seated on a bench edge with load on the forefoot (dumbbell, band or dedicated device).' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 3 × 15 deviennent faciles.', en: 'Maintenance level: add load when 3 × 15 feels easy.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Dos au mur, éloignez les talons pour augmenter la difficulté.', en: 'Back to the wall, move the heels further away to make it harder.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Assis, élastique attaché devant vous et passé sur le dessus du pied.', en: 'Seated, band anchored in front of you and looped over the top of the foot.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Assis sur un banc, un haltère léger coincé entre les avant-pieds.', en: 'Seated on a bench with a light dumbbell held between the forefeet.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'hall-2015',
          finding: {
            fr: 'Chez 39 personnes avec instabilité chronique de cheville, 6 semaines d’exercices à l’élastique ont notamment augmenté la force de flexion dorsale (relevé du pied).',
            en: 'In 39 people with chronic ankle instability, 6 weeks of band exercises increased, among others, dorsiflexion strength (lifting the foot).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'heel-walk',
    family: 'heel-walk',
    name: { fr: 'Marche sur les talons', en: 'Heel walk' },
    sports: ['run'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['tibialis-anterior', 'extensor-digitorum-longus'],
      secondary: [],
    },
    zoom: 'leg-front',
    qualities: ['endurance', 'control'],
    objectives: ['prevention', 'return'],
    why: {
      fr: 'Marcher sur les talons fait travailler en endurance les muscles de l’avant de la jambe, qui freinent la retombée du pied à chaque foulée, en particulier en descente.',
      en: 'Walking on the heels trains the endurance of the front-of-shin muscles, which control the foot coming down at every stride, especially downhill.',
    },
    how: {
      setup: {
        fr: 'Debout, relevez l’avant des deux pieds pour ne garder que les talons au sol.',
        en: 'Standing, lift the front of both feet so only the heels touch the ground.',
      },
      movement: {
        fr: 'Marchez à petits pas sur les talons, pointes relevées pendant toute la durée.',
        en: 'Walk with small steps on your heels, keeping the toes up the whole time.',
      },
      cues: [
        { fr: 'Pointes de pied hautes, buste droit.', en: 'Toes high, trunk upright.' },
        { fr: 'Petits pas réguliers.', en: 'Small, even steps.' },
      ],
    },
    mistakes: [
      { fr: 'Se pencher en arrière ou plier les hanches.', en: 'Leaning back or bending at the hips.' },
      { fr: 'Laisser retomber les pointes en fin de série.', en: 'Letting the toes drop at the end of the set.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Marche avant courte', en: 'Short forward walk' },
        description: { fr: 'Marche avant sur les talons, 20 secondes.', en: 'Forward heel walk, 20 seconds.' },
        mastery: { fr: '3 × 30 s sans reposer les pointes.', en: '3 × 30 s without lowering the toes.' },
        dosage: { sets: 3, holdSec: 20, restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Pointes tournées', en: 'Toes turned' },
        description: { fr: 'Alternez pointes tournées vers l’intérieur puis vers l’extérieur.', en: 'Alternate toes turned in and turned out.' },
        mastery: { fr: '3 × 45 s en alternant les orientations.', en: '3 × 45 s alternating directions.' },
        dosage: { sets: 3, holdSec: 40, restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Longue durée', en: 'Long duration' },
        description: { fr: 'Marche avant et arrière sur les talons, 60 secondes.', en: 'Forward and backward heel walk, 60 seconds.' },
        mastery: { fr: 'Niveau d’entretien.', en: 'Maintenance level.' },
        dosage: { sets: 3, holdSec: 60, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Pieds nus ou en chaussures, sur un sol plat.', en: 'Barefoot or in shoes, on flat ground.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'knee-to-wall-mobility',
    family: 'ankle-mobility',
    name: { fr: 'Mobilité de cheville genou au mur', en: 'Knee-to-wall ankle mobility' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['soleus', 'achilles-tendon'],
      secondary: ['gastrocnemius-medial'],
    },
    zoom: 'leg-back',
    qualities: ['mobility'],
    objectives: ['prevention', 'return'],
    why: {
      fr: 'La cheville doit plier suffisamment vers l’avant pour amortir l’appui en course, en côte et en descente. Une cheville raide reporte les contraintes sur le pied, le tendon d’Achille ou le genou.',
      en: 'The ankle must bend forwards enough to absorb landing when running, climbing and descending. A stiff ankle shifts stress onto the foot, Achilles tendon or knee.',
    },
    how: {
      setup: {
        fr: 'Face à un mur, en fente, le pied avant à quelques centimètres du mur, talon au sol.',
        en: 'Facing a wall in a split stance, front foot a few centimetres from the wall, heel down.',
      },
      movement: {
        fr: 'Avancez le genou vers le mur, dans l’axe du 2e orteil, sans décoller le talon, puis revenez. Reculez le pied quand le genou touche facilement.',
        en: 'Drive the knee towards the wall in line with the second toe without lifting the heel, then come back. Move the foot back when the knee touches easily.',
      },
      cues: [
        { fr: 'Le talon reste collé au sol.', en: 'The heel stays on the floor.' },
        { fr: 'Le genou avance au-dessus du 2e orteil.', en: 'The knee travels over the second toe.' },
      ],
    },
    mistakes: [
      { fr: 'Laisser le genou partir vers l’intérieur.', en: 'Letting the knee drift inwards.' },
      { fr: 'Décoller le talon.', en: 'Lifting the heel.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Mouvements lents', en: 'Slow repetitions' },
        description: { fr: 'Allers-retours lents du genou vers le mur.', en: 'Slow knee-to-wall repetitions.' },
        mastery: { fr: '2 × 10 par jambe sans douleur.', en: '2 × 10 per leg without pain.' },
        dosage: { sets: 2, reps: [10, 10], tempo: '2-0-2', restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Maintien en fin d’amplitude', en: 'End-range hold' },
        description: { fr: 'Pied un peu plus loin, maintien 3 s genou contre le mur.', en: 'Foot a little further away, hold the knee on the wall for 3 s.' },
        mastery: { fr: 'Distance pied-mur proche entre les deux côtés (l’écart de mesure habituel est d’environ 2 cm).', en: 'Similar foot-to-wall distance on both sides (the usual measurement error is about 2 cm).' },
        dosage: { sets: 3, reps: [10, 10], holdSec: 5, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Avec élastique', en: 'With a band' },
        description: { fr: 'Élastique fixé derrière vous, passé à l’avant de la cheville : il tire l’os vers l’arrière pendant que le genou avance.', en: 'Band anchored behind you and looped around the front of the ankle: it pulls the bone back while the knee moves forwards.' },
        mastery: { fr: 'Niveau d’entretien, en échauffement.', en: 'Maintenance level, as part of the warm-up.' },
        dosage: { sets: 3, reps: [10, 10], holdSec: 5, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
        requires: ['band'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Mesurez la distance pied-mur pour suivre vos progrès.', en: 'Measure the foot-to-wall distance to track progress.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique solide fixé bas derrière vous.', en: 'Strong band anchored low behind you.' },
      },
    ],
    precautions: [
      { fr: 'Une sensation d’étirement ou de blocage léger à l’avant de la cheville est possible ; une douleur vive impose d’arrêter.', en: 'A stretch or mild pinch at the front of the ankle is possible; sharp pain means stop.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'powden-2015',
          finding: {
            fr: 'Cette revue de 12 études montre que le test genou au mur mesure de façon fiable la flexion de cheville ; un changement d’environ 1,6 à 1,9 cm dépasse l’erreur de mesure.',
            en: 'This review of 12 studies shows the knee-to-wall test reliably measures ankle dorsiflexion; a change of about 1.6 to 1.9 cm exceeds measurement error.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'line-hops',
    family: 'ankle-hop-multidirectional',
    name: { fr: 'Sauts de cheville sur une ligne', en: 'Ankle line hops' },
    sports: ['run'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['fibularis-longus', 'fibularis-brevis', 'soleus', 'gastrocnemius-medial'],
      secondary: ['tibialis-anterior', 'tibialis-posterior', 'achilles-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['power', 'control'],
    objectives: ['return', 'prevention'],
    why: {
      fr: 'Sauter rapidement de part et d’autre d’une ligne entraîne la cheville à se stabiliser en une fraction de seconde, comme sur un terrain irrégulier ou un changement de direction.',
      en: 'Hopping quickly back and forth over a line trains the ankle to stabilise in a split second, as on uneven ground or when changing direction.',
    },
    how: {
      setup: {
        fr: 'Debout à côté d’une ligne au sol (ruban adhésif, joint de carrelage).',
        en: 'Standing next to a line on the floor (tape, tile joint).',
      },
      movement: {
        fr: 'Sautez de part et d’autre de la ligne, sur l’avant-pied, le plus vite possible en restant précis.',
        en: 'Hop back and forth over the line on the balls of your feet, as fast as possible while staying accurate.',
      },
      cues: [
        { fr: 'Contacts courts et légers.', en: 'Short, light contacts.' },
        { fr: 'Le buste reste stable, seules les jambes bougent.', en: 'The trunk stays still, only the legs move.' },
      ],
    },
    mistakes: [
      { fr: 'Atterrir sur le bord extérieur du pied.', en: 'Landing on the outer edge of the foot.' },
      { fr: 'Continuer quand la précision baisse.', en: 'Carrying on when accuracy drops.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds, avant-arrière', en: 'Both feet, forward-back' },
        description: { fr: 'Sauts avant-arrière par-dessus la ligne, pieds joints.', en: 'Forward-back hops over the line, feet together.' },
        mastery: { fr: '3 × 15 s rythmées, sans douleur le lendemain.', en: '3 × 15 s rhythmic, without pain the next day.' },
        dosage: { sets: 3, holdSec: 15, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Deux pieds, latéral', en: 'Both feet, side to side' },
        description: { fr: 'Sauts latéraux pieds joints.', en: 'Side-to-side hops with feet together.' },
        mastery: { fr: '3 × 20 s sans toucher la ligne.', en: '3 × 20 s without touching the line.' },
        dosage: { sets: 3, holdSec: 20, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Une jambe, avant-arrière', en: 'Single leg, forward-back' },
        description: { fr: 'Sauts avant-arrière sur une jambe.', en: 'Forward-back hops on one leg.' },
        mastery: { fr: '3 × 15 s par jambe, nombre de sauts comparable des deux côtés.', en: '3 × 15 s per leg, similar number of hops on both sides.' },
        dosage: { sets: 3, holdSec: 15, restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Une jambe, latéral', en: 'Single leg, side to side' },
        description: { fr: 'Sauts latéraux sur une jambe.', en: 'Side-to-side hops on one leg.' },
        mastery: { fr: '3 × 15 s par jambe sans perte de contrôle.', en: '3 × 15 s per leg without losing control.' },
        dosage: { sets: 3, holdSec: 15, restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Une jambe, en carré', en: 'Single leg, square pattern' },
        description: { fr: 'Sur une jambe, sauts en carré ou en croix (avant, côté, arrière, côté).', en: 'On one leg, hops in a square or cross pattern (front, side, back, side).' },
        mastery: { fr: 'Niveau d’entretien avant les sorties en trail.', en: 'Maintenance level before trail runs.' },
        dosage: { sets: 4, holdSec: 15, restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Une ligne au sol suffit ; sol ferme, non glissant.', en: 'A line on the floor is enough; firm, non-slip ground.' },
      },
    ],
    precautions: [caution.noPainJump, caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'plantar-fascia-stretch',
    family: 'plantar-stretch',
    name: { fr: 'Étirement du fascia plantaire', en: 'Plantar fascia stretch' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['plantar-fascia'],
      secondary: ['flexor-digitorum-brevis', 'flexor-hallucis-longus'],
    },
    zoom: 'foot-sole',
    qualities: ['mobility'],
    objectives: ['pain'],
    why: {
      fr: 'Le fascia plantaire relie le talon aux orteils et soutient l’arche à chaque pas. L’étirer, surtout avant les premiers pas du matin, aide souvent à réduire la douleur sous le talon.',
      en: 'The plantar fascia links the heel to the toes and supports the arch at every step. Stretching it, especially before the first steps of the morning, often helps reduce pain under the heel.',
    },
    how: {
      setup: {
        fr: 'Assis, la cheville du pied douloureux posée sur le genou opposé.',
        en: 'Seated, with the ankle of the painful foot resting on the opposite knee.',
      },
      movement: {
        fr: 'Tirez les orteils vers le tibia avec une main jusqu’à sentir une tension sous la voûte plantaire ; avec l’autre main, vérifiez que le fascia est tendu. Maintenez.',
        en: 'Pull the toes back towards the shin with one hand until you feel tension under the arch; check with the other hand that the fascia is taut. Hold.',
      },
      cues: [
        { fr: 'Tension nette sous le pied, pas de douleur vive.', en: 'Clear tension under the foot, no sharp pain.' },
        { fr: 'À faire aussi avant de poser le pied par terre le matin.', en: 'Also do it before stepping out of bed in the morning.' },
      ],
    },
    mistakes: [
      { fr: 'Tirer sur la cheville au lieu des orteils.', en: 'Pulling the ankle instead of the toes.' },
      { fr: 'Tenir trop peu de temps.', en: 'Holding too briefly.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Assis, à la main', en: 'Seated, by hand' },
        description: { fr: 'Orteils tirés à la main, cheville sur le genou opposé.', en: 'Toes pulled back by hand, ankle on the opposite knee.' },
        mastery: { fr: '3 × 30 s, plusieurs fois par jour, bien toléré.', en: '3 × 30 s several times a day, well tolerated.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 2,
        name: { fr: 'Debout contre un mur', en: 'Standing against a wall' },
        description: { fr: 'Orteils relevés contre le bas d’un mur, talon au sol, genou qui avance doucement.', en: 'Toes propped up against the base of a wall, heel down, knee moving gently forwards.' },
        mastery: { fr: '3 × 30 s par pied, sans douleur accrue le lendemain.', en: '3 × 30 s per foot without increased pain the next day.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 3,
        name: { fr: 'Sur une marche', en: 'On a step' },
        description: { fr: 'Orteils posés sur le rebord d’une marche, talon qui descend : fascia et mollet s’étirent ensemble.', en: 'Toes on the edge of a step, heel lowering: fascia and calf stretch together.' },
        mastery: { fr: 'Niveau d’entretien tant que la douleur matinale persiste.', en: 'Maintenance level while morning pain persists.' },
        dosage: { sets: 3, holdSec: 45, restSec: 15, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
        requires: ['step'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans matériel', en: 'No equipment' },
        instructions: { fr: 'À la main, contre un mur ou sur une marche d’escalier.', en: 'By hand, against a wall or on a stair.' },
      },
    ],
    precautions: [
      { fr: 'L’étirement doit rester tolérable ; il complète le renforcement, il ne le remplace pas.', en: 'The stretch should stay tolerable; it complements strengthening, it does not replace it.' },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'koc-2023',
          finding: {
            fr: 'La recommandation JOSPT 2023 sur la talalgie recommande (grade A) les étirements spécifiques du fascia plantaire et des mollets pour diminuer la douleur et améliorer la fonction.',
            en: 'The 2023 JOSPT heel pain guideline recommends (grade A) plantar fascia-specific and calf stretching to reduce pain and improve function.',
          },
        },
        {
          refId: 'rathleff-2015',
          finding: {
            fr: 'Dans cet essai, les étirements quotidiens du fascia (avec semelles) ont donné des résultats moins rapides que le renforcement lourd à 3 mois, mais équivalents à 6 et 12 mois.',
            en: 'In this trial, daily plantar fascia stretching (with shoe inserts) gave slower results than heavy strengthening at 3 months, but similar results at 6 and 12 months.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'calf-wall-stretch',
    family: 'calf-stretch',
    name: { fr: 'Étirement des mollets au mur', en: 'Wall calf stretch' },
    sports: ['run', 'bike'],
    zones: ['calf'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus'],
      secondary: ['achilles-tendon'],
    },
    zoom: 'leg-back',
    qualities: ['mobility'],
    objectives: ['pain', 'prevention'],
    why: {
      fr: 'Des mollets raides tirent sur le talon et la voûte plantaire à chaque pas. Les étirer, genou tendu puis genou fléchi, fait partie de la prise en charge des douleurs sous le talon.',
      en: 'Stiff calves pull on the heel and the arch at every step. Stretching them, knee straight then knee bent, is part of managing heel pain.',
    },
    how: {
      setup: {
        fr: 'Face à un mur, mains en appui, une jambe en arrière, pied à plat orienté droit devant.',
        en: 'Facing a wall with hands on it, one leg back, foot flat and pointing straight ahead.',
      },
      movement: {
        fr: 'Avancez le bassin vers le mur en gardant le talon arrière au sol, jusqu’à sentir l’étirement dans le mollet. Maintenez, puis pliez le genou arrière pour cibler le soléaire.',
        en: 'Move the hips towards the wall keeping the back heel down until you feel the stretch in the calf. Hold, then bend the back knee to target the soleus.',
      },
      cues: [
        { fr: 'Talon arrière au sol, pied droit.', en: 'Back heel down, foot straight.' },
        { fr: 'Étirement net, jamais douloureux.', en: 'Clear stretch, never painful.' },
      ],
    },
    mistakes: [
      { fr: 'Pied arrière tourné vers l’extérieur.', en: 'Back foot turned outwards.' },
      { fr: 'Décoller le talon.', en: 'Lifting the heel.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Genou tendu', en: 'Knee straight' },
        description: { fr: 'Étirement des gastrocnémiens, jambe arrière tendue.', en: 'Gastrocnemius stretch with the back leg straight.' },
        mastery: { fr: '3 × 30 s par jambe bien tolérés.', en: '3 × 30 s per leg, well tolerated.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Genou tendu puis fléchi', en: 'Knee straight then bent' },
        description: { fr: 'Une série genou tendu, une série genou fléchi (soléaire).', en: 'One set knee straight, one set knee bent (soleus).' },
        mastery: { fr: '3 × 30 s dans chaque position.', en: '3 × 30 s in each position.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Sur une marche', en: 'On a step' },
        description: { fr: 'Avant-pied sur une marche, talon qui descend lentement sous le niveau de la marche.', en: 'Forefoot on a step, heel slowly lowering below step level.' },
        mastery: { fr: 'Niveau d’entretien.', en: 'Maintenance level.' },
        dosage: { sets: 3, holdSec: 45, restSec: 15, perSide: true, intensity: bodyweight(), frequency: freq.daily },
        requires: ['step'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Contre un mur ou en appui sur le vélo, après la sortie.', en: 'Against a wall or leaning on the bike after a ride.' },
      },
    ],
    precautions: [
      { fr: 'En cas de douleur à l’insertion du tendon d’Achille sur le talon, évitez l’étirement sur une marche : il comprime le tendon contre l’os.', en: 'If you have pain where the Achilles tendon attaches to the heel, avoid stretching off a step: it compresses the tendon against the bone.' },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'koc-2023',
          finding: {
            fr: 'La recommandation JOSPT 2023 sur la talalgie recommande (grade A) les étirements des mollets et du fascia plantaire pour diminuer la douleur et améliorer la fonction.',
            en: 'The 2023 JOSPT heel pain guideline recommends (grade A) calf and plantar fascia stretching to reduce pain and improve function.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'ankling-drill',
    family: 'running-drill-ankle',
    name: { fr: 'Gamme de cheville (ankling)', en: 'Ankling drill' },
    sports: ['run'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'soleus', 'achilles-tendon'],
      secondary: ['tibialis-anterior', 'fibularis-longus'],
    },
    zoom: 'leg-back',
    qualities: ['control', 'tendon-stiffness'],
    objectives: ['performance', 'prevention'],
    perfGoals: ['running-economy'],
    why: {
      fr: 'Cette gamme apprend à poser le pied sous le corps et à rebondir sur une cheville tonique. Elle sert d’échauffement spécifique avant les séances de vitesse.',
      en: 'This drill teaches you to land under your body and bounce off a stiff, springy ankle. It is a specific warm-up before speed sessions.',
    },
    how: {
      setup: {
        fr: 'Debout, buste droit, jambes presque tendues, bras qui accompagnent comme en course.',
        en: 'Standing tall, legs almost straight, arms moving as in running.',
      },
      movement: {
        fr: 'Avancez à tout petits pas rapides en ne déroulant que la cheville : l’avant-pied touche le sol sous la hanche et rebondit aussitôt.',
        en: 'Move forward with tiny quick steps using only the ankle: the forefoot lands under the hip and bounces straight back up.',
      },
      cues: [
        { fr: 'Pas plus long que la longueur d’un pied.', en: 'Steps no longer than one foot length.' },
        { fr: 'Contacts rapides, genoux presque tendus.', en: 'Quick contacts, knees almost straight.' },
      ],
    },
    mistakes: [
      { fr: 'Lever les genoux (cela devient un skipping).', en: 'Lifting the knees (it turns into skipping).' },
      { fr: 'Poser le talon en premier.', en: 'Landing heel first.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sur place', en: 'On the spot' },
        description: { fr: 'Alternance rapide des pieds sur place.', en: 'Quick alternating feet on the spot.' },
        mastery: { fr: '3 × 15 s fluides et réguliers.', en: '3 × 15 s, smooth and even.' },
        dosage: { sets: 3, holdSec: 15, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'En avançant', en: 'Moving forwards' },
        description: { fr: 'Même gamme en avançant lentement sur 15 à 20 m.', en: 'Same drill moving slowly forward over 15 to 20 m.' },
        mastery: { fr: '3 passages de 20 s sans poser le talon.', en: '3 runs of 20 s without landing on the heel.' },
        dosage: { sets: 3, holdSec: 20, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Rapide', en: 'Fast' },
        description: { fr: 'Fréquence de pas maximale, en avançant.', en: 'Maximal step rate while moving forwards.' },
        mastery: { fr: '4 passages de 20 s avec une fréquence stable.', en: '4 runs of 20 s with a steady rate.' },
        dosage: { sets: 4, holdSec: 20, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Enchaîné avec une accélération', en: 'Linked to a stride-out' },
        description: { fr: '10 s d’ankling puis accélération progressive sur 50 m.', en: '10 s of ankling then a progressive stride-out over 50 m.' },
        mastery: { fr: 'Niveau d’entretien, avant les séances rapides.', en: 'Maintenance level, before fast sessions.' },
        dosage: { sets: 4, holdSec: 20, restSec: 90, perSide: false, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur piste, chemin plat ou herbe rase.', en: 'On a track, flat path or short grass.' },
      },
    ],
    precautions: [caution.noPainJump],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'jump-rope',
    family: 'jump-rope',
    name: { fr: 'Corde à sauter', en: 'Jump rope' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon'],
      secondary: ['fibularis-longus', 'flexor-hallucis-longus', 'tibialis-anterior'],
    },
    zoom: 'leg-back',
    qualities: ['tendon-stiffness', 'endurance', 'power'],
    objectives: ['prevention'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'La corde à sauter enchaîne de petits rebonds sur l’avant-pied : elle entraîne le ressort mollet–tendon d’Achille et habitue les os aux impacts. Elle complète utilement le vélo, un sport presque sans impact.',
      en: 'Jumping rope links small bounces on the balls of the feet: it trains the calf–Achilles spring and gets bones used to impact. It is a useful complement to cycling, an almost impact-free sport.',
    },
    how: {
      setup: {
        fr: 'Debout, corde à la bonne longueur (poignées à hauteur des aisselles quand on marche au milieu).',
        en: 'Standing with a rope of the right length (handles at armpit height when standing on the middle).',
      },
      movement: {
        fr: 'Sautez juste assez haut pour laisser passer la corde, sur l’avant-pied, en tournant la corde avec les poignets.',
        en: 'Jump just high enough to clear the rope, on the balls of your feet, turning the rope with the wrists.',
      },
      cues: [
        { fr: 'Petits sauts, réception silencieuse.', en: 'Small jumps, quiet landings.' },
        { fr: 'Les talons ne touchent pas le sol.', en: 'The heels don’t touch the ground.' },
      ],
    },
    mistakes: [
      { fr: 'Sauter trop haut et se réceptionner lourdement.', en: 'Jumping too high and landing heavily.' },
      { fr: 'Augmenter la durée trop vite.', en: 'Increasing the duration too quickly.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Courtes séries', en: 'Short sets' },
        description: { fr: 'Pieds joints, séries de 30 s.', en: 'Feet together, 30-second sets.' },
        mastery: { fr: '6 × 30 s sans douleur le lendemain.', en: '6 × 30 s without pain the next day.' },
        dosage: { sets: 6, holdSec: 30, restSec: 30, perSide: false, intensity: rpe('5-6'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Séries d’une minute', en: 'One-minute sets' },
        description: { fr: 'Pieds joints, séries d’une minute.', en: 'Feet together, one-minute sets.' },
        mastery: { fr: '5 × 60 s réguliers.', en: '5 × 60 s, steady.' },
        dosage: { sets: 5, holdSec: 60, restSec: 45, perSide: false, intensity: rpe('6-7'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Pas alternés', en: 'Alternate steps' },
        description: { fr: 'Pas de course sur place en passant la corde.', en: 'Running steps on the spot while turning the rope.' },
        mastery: { fr: '5 × 60 s sans accroc.', en: '5 × 60 s without tripping.' },
        dosage: { sets: 5, holdSec: 60, restSec: 45, perSide: false, intensity: rpe('6-7'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Sur une jambe', en: 'Single leg' },
        description: { fr: 'Séries courtes sur une jambe, en alternant.', en: 'Short single-leg sets, alternating legs.' },
        mastery: { fr: 'Niveau d’entretien.', en: 'Maintenance level.' },
        dosage: { sets: 6, holdSec: 20, restSec: 40, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Corde ou sans corde', en: 'With or without a rope' },
        instructions: { fr: 'Avec une corde, ou en mimant le geste si vous n’en avez pas.', en: 'With a rope, or miming the movement if you don’t have one.' },
      },
    ],
    precautions: [caution.noPainJump, caution.painFlare],
    contraindications: [
      { fr: 'Fracture de fatigue récente ou non consolidée : uniquement après feu vert médical.', en: 'Recent or unhealed stress fracture: only after medical clearance.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),
] satisfies ReturnType<typeof defineExercise>[];
