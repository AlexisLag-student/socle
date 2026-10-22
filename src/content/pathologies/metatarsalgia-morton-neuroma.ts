/** Métatarsalgie et névrome de Morton : renforcement du pied en complément. */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'metatarsalgia-morton-neuroma',
  region: 'foot-ankle',
  bodyAreas: ['forefoot'],
  sports: ['run', 'bike'],
  name: { fr: 'Métatarsalgie et névrome de Morton', en: 'Metatarsalgia and Morton’s neuroma' },
  aka: [
    { fr: 'Douleur de l’avant-pied', en: 'Forefoot pain' },
    { fr: 'Syndrome de Morton', en: 'Morton’s neuroma' },
  ],
  description: {
    fr: 'L’avant-pied supporte une pression importante à chaque poussée. Une surcharge peut irriter les têtes des métatarsiens ou comprimer un petit nerf entre deux orteils (névrome de Morton), souvent entre le 3e et le 4e.',
    en: 'The forefoot takes high pressure at every push-off. Overload can irritate the metatarsal heads or compress a small nerve between two toes (Morton’s neuroma), often between the third and fourth.',
  },
  recognize: {
    fr: 'Douleur sous l’avant-pied, sensation de marcher sur un caillou ou un pli de chaussette, parfois brûlures ou fourmillements qui irradient vers deux orteils, souvent soulagés en enlevant la chaussure.',
    en: 'Pain under the ball of the foot, a feeling of walking on a pebble or a sock fold, sometimes burning or tingling into two toes, often relieved by taking the shoe off.',
  },
  symptoms: [
    { fr: 'Douleur sous l’avant-pied à la marche et à la course.', en: 'Pain under the ball of the foot when walking and running.' },
    { fr: 'Brûlures, décharges ou engourdissement entre deux orteils.', en: 'Burning, shooting pain or numbness between two toes.' },
    { fr: 'Gêne aggravée par des chaussures étroites ou serrées.', en: 'Discomfort worse in narrow or tight shoes.' },
  ],
  riskFactors: [
    { fr: 'Chaussures étroites à l’avant ou à talon haut.', en: 'Shoes narrow at the front or with a high heel.' },
    { fr: 'Chaussures de vélo trop serrées, sangles ou serrages très tendus.', en: 'Cycling shoes too tight, straps or dials over-tightened.' },
    { fr: 'Augmentation rapide du volume, de la vitesse ou des côtes.', en: 'Rapid increase in volume, speed or hills.' },
  ],
  caveat: {
    fr: 'Les exercices du pied sont ici un complément : ils ne font pas disparaître un névrome. L’essentiel passe souvent par le chaussage et l’avis d’un podologue ou d’un médecin.',
    en: 'Foot exercises are a complement here: they do not make a neuroma go away. Footwear and advice from a podiatrist or doctor are often the key.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On soulage l’avant-pied (chaussage, réduction des impacts) et on entretient doucement les muscles du pied.',
        en: 'Offload the forefoot (footwear, less impact) and gently maintain the foot muscles.',
      },
      goals: [
        { fr: 'Réduire la pression sur l’avant-pied.', en: 'Reduce forefoot pressure.' },
        { fr: 'Garder le pied actif sans réveiller la douleur.', en: 'Keep the foot active without flaring the pain.' },
      ],
      exercises: [
        { exerciseId: 'short-foot', priority: 1, startLevel: 1 },
        { exerciseId: 'toe-flexor-strength', priority: 2, startLevel: 1 },
        { exerciseId: 'calf-wall-stretch', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Rebonds répétés sur l’avant-pied.', en: 'Repeated bouncing on the forefoot.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Rebonds répétés sur l’avant-pied.', en: 'Repeated bouncing on the forefoot.' } },
        { exerciseId: 'line-hops', reason: { fr: 'Impacts répétés sur l’avant-pied.', en: 'Repeated forefoot impact.' } },
        { exerciseId: 'ankling-drill', reason: { fr: 'Appuis répétés sur l’avant-pied.', en: 'Repeated forefoot contacts.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Marche de 30 minutes avec des chaussures adaptées sans douleur.', en: '30 minutes of walking in suitable shoes without pain.' },
        { fr: 'Plus de brûlures ni de fourmillements au quotidien.', en: 'No more burning or tingling in daily life.' },
      ],
      loadAdvice: {
        fr: 'Réduisez la vitesse et les côtes, qui chargent l’avant-pied ; le vélo avec des chaussures desserrées est souvent mieux toléré.',
        en: 'Cut back on speed and hills, which load the forefoot; cycling with loosened shoes is often better tolerated.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce le pied et le mollet pour mieux répartir la charge, en reprenant la course progressivement.',
        en: 'Strengthen the foot and calf to spread load better, while gradually resuming running.',
      },
      goals: [
        { fr: 'Renforcer les muscles du pied et du mollet.', en: 'Strengthen the foot and calf muscles.' },
        { fr: 'Reprendre la course habituelle.', en: 'Resume usual running.' },
      ],
      exercises: [
        { exerciseId: 'short-foot', priority: 1, startLevel: 3 },
        { exerciseId: 'toe-flexor-strength', priority: 1, startLevel: 2 },
        { exerciseId: 'calf-raise-bent-knee', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-balance', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez le volume par paliers ; arrêtez la progression si les fourmillements reviennent.',
        en: 'Increase volume in steps; stop progressing if tingling returns.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Engourdissement permanent d’un ou plusieurs orteils.', en: 'Constant numbness in one or more toes.' },
    { fr: 'Douleur très localisée sur un os de l’avant-pied, gonflement, ou douleur la nuit (possible fracture de fatigue).', en: 'Pain localised to one forefoot bone, swelling, or pain at night (possible stress fracture).' },
    { fr: 'Orteil qui se déforme, rougeur ou chaleur d’une articulation.', en: 'A toe changing shape, or a red or warm joint.' },
    { fr: 'Diabète ou troubles de la sensibilité des pieds.', en: 'Diabetes or reduced sensation in the feet.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines de changement de chaussage.', en: 'No improvement after 6 to 8 weeks of footwear changes.' },
  ],
  complementaryAdvice: [
    { fr: 'Choisissez des chaussures larges à l’avant, avec un drop modéré et un amorti suffisant sous l’avant-pied.', en: 'Choose shoes that are wide at the front, with a moderate drop and enough cushioning under the forefoot.' },
    { fr: 'Desserrez le laçage sur l’avant-pied ; au vélo, desserrez les sangles avant et vérifiez la largeur des chaussures.', en: 'Loosen the lacing over the forefoot; on the bike, loosen the front straps and check shoe width.' },
    { fr: 'Un podologue peut proposer une barre ou un appui rétro-capital dans la semelle.', en: 'A podiatrist can suggest a metatarsal pad or bar in the insole.' },
    { fr: 'Cyclistes : des cales un peu reculées réduisent la pression sur l’avant-pied.', en: 'Cyclists: moving the cleats slightly back reduces forefoot pressure.' },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'matthews-2019',
        finding: {
          fr: 'Cette méta-analyse de 25 études sur le névrome de Morton trouve les preuves les plus solides pour les infiltrations de corticoïdes et les manipulations-mobilisations, sans traitement de référence ; les exercices de renforcement n’y ont pas été évalués.',
          en: 'This meta-analysis of 25 studies on Morton’s neuroma found the strongest evidence for corticosteroid injections and manipulation/mobilisation, with no gold-standard treatment; strengthening exercises were not evaluated.',
        },
      },
    ],
  },
});
