/**
 * Syndrome fémoro-patellaire (douleur de l'avant du genou), course et vélo.
 */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'patellofemoral-pain',
  region: 'knee',
  bodyAreas: ['knee-anterior'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Syndrome fémoro-patellaire',
    en: 'Patellofemoral pain',
  },
  aka: [
    { fr: 'Syndrome rotulien, douleur de l’avant du genou', en: 'Runner’s knee, anterior knee pain' },
  ],
  description: {
    fr: 'L’articulation entre la rotule et le fémur devient sensible quand on lui demande plus que ce qu’elle tolère du moment : trop de volume, de côtes ou de descentes, ou une cuisse et une hanche pas assez fortes. Elle se calme et se renforce avec une charge adaptée, pas avec le repos complet.',
    en: 'The joint between the kneecap and the thigh bone becomes sensitive when asked to do more than it currently tolerates: too much volume, hills or downhills, or a thigh and hip that are not strong enough. It settles and gets stronger with adapted loading, not complete rest.',
  },
  recognize: {
    fr: 'Douleur diffuse autour ou derrière la rotule, difficile à pointer du doigt, qui augmente dans les escaliers (surtout en descente), accroupi, en position assise prolongée genoux pliés, en course (surtout en descente) ou à vélo avec beaucoup de résistance.',
    en: 'Diffuse pain around or behind the kneecap, hard to point to with one finger, that increases on stairs (especially going down), when squatting, after sitting a long time with bent knees, when running (especially downhill) or when cycling against high resistance.',
  },
  symptoms: [
    { fr: 'Douleur en descendant les escaliers ou les côtes.', en: 'Pain going down stairs or hills.' },
    { fr: 'Gêne après être resté longtemps assis genoux pliés (cinéma, voiture).', en: 'Discomfort after sitting a long time with bent knees (cinema, car).' },
    { fr: 'Douleur accroupi ou en se relevant d’un siège bas.', en: 'Pain when squatting or getting up from a low seat.' },
    { fr: 'À vélo, gêne qui augmente dans les montées ou avec de gros braquets.', en: 'On the bike, discomfort that increases on climbs or in big gears.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume, du dénivelé ou des descentes.', en: 'Rapid increase in volume, elevation or downhill running.' },
    { fr: 'Manque de force du quadriceps et des muscles de la hanche.', en: 'Weak quadriceps and hip muscles.' },
    { fr: 'À vélo : selle trop basse, gros braquets à faible cadence.', en: 'On the bike: saddle too low, big gears at low cadence.' },
    { fr: 'Plus fréquent chez les femmes et les adolescents sportifs.', en: 'More common in women and active adolescents.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme le genou sans l’arrêter : exercices de hanche, isométrie du quadriceps et amplitude réduite, et on ajuste la course ou le vélo.',
        en: 'Settle the knee without stopping it: hip exercises, quadriceps isometrics and reduced range, while adjusting running or cycling.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité de l’avant du genou.', en: 'Reduce sensitivity at the front of the knee.' },
        { fr: 'Commencer le renforcement de la hanche et du quadriceps dès maintenant.', en: 'Start hip and quadriceps strengthening right away.' },
      ],
      exercises: [
        { exerciseId: 'side-lying-hip-abduction', priority: 1, startLevel: 1 },
        { exerciseId: 'wall-sit', priority: 1, startLevel: 1 },
        { exerciseId: 'clamshell', priority: 2, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 1 },
        {
          exerciseId: 'leg-extension',
          priority: 2,
          startLevel: 1,
          note: { fr: 'Restez entre 90° et 45° de flexion, la zone la mieux tolérée par la rotule.', en: 'Stay between 90° and 45° of knee bend, the range best tolerated by the kneecap.' },
        },
        { exerciseId: 'straight-leg-raise', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'reverse-nordic', reason: { fr: 'Forte compression de la rotule en flexion profonde.', en: 'High kneecap compression in deep knee bend.' } },
        { exerciseId: 'decline-squat', reason: { fr: 'Charge très élevée sur l’avant du genou.', en: 'Very high load on the front of the knee.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Escaliers montés et descendus sans douleur gênante.', en: 'Stairs up and down without bothersome pain.' },
        { fr: '3 × 15 squats sur chaise sans augmentation de la douleur le lendemain.', en: '3 × 15 box squats without increased pain the next day.' },
      ],
      loadAdvice: {
        fr: 'Réduisez volume, côtes et descentes plutôt que d’arrêter. À vélo, privilégiez le plat et une cadence élevée avec de petits braquets.',
        en: 'Cut volume, hills and downhills rather than stopping. On the bike, favour flat routes and a high cadence in easy gears.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit la force de la hanche et du genou, avec des exercices en charge de plus en plus profonds et lourds.',
        en: 'Rebuild hip and knee strength with progressively deeper and heavier weight-bearing exercises.',
      },
      goals: [
        { fr: 'Renforcer quadriceps et fessiers, 2 à 3 fois par semaine.', en: 'Strengthen quads and glutes 2 to 3 times a week.' },
        { fr: 'Retrouver une descente de marche contrôlée, genou dans l’axe.', en: 'Regain a controlled step-down with the knee aligned.' },
      ],
      exercises: [
        { exerciseId: 'squat', priority: 1, startLevel: 1 },
        { exerciseId: 'step-down', priority: 1, startLevel: 1 },
        { exerciseId: 'lateral-band-walk', priority: 1, startLevel: 2 },
        { exerciseId: 'leg-press', priority: 2, startLevel: 1 },
        { exerciseId: 'split-squat', priority: 2, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 2 },
        { exerciseId: 'leg-extension', priority: 3, startLevel: 2 },
      ],
      nextPhaseCriteria: [
        { fr: '3 × 12 descentes de marche avant par jambe, genou dans l’axe, sans douleur le lendemain.', en: '3 × 12 forward step-downs per leg, knee aligned, without next-day pain.' },
        { fr: '30 minutes de course facile ou 1 h 30 de vélo sans douleur pendant ni le lendemain.', en: '30 minutes of easy running or 1 h 30 of cycling without pain during or the next day.' },
      ],
      loadAdvice: {
        fr: 'Augmentez le volume de 10 à 20 % par semaine au plus, en réintroduisant côtes et descentes en dernier.',
        en: 'Increase volume by 10–20% per week at most, bringing back hills and downhills last.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare le genou aux appuis sur une jambe, aux descentes et à l’intensité, en gardant la force.',
        en: 'Prepare the knee for single-leg loading, downhills and intensity while keeping strength.',
      },
      goals: [
        { fr: 'Retrouver des appuis unipodaux forts et symétriques.', en: 'Regain strong, symmetrical single-leg control.' },
        { fr: 'Reprendre l’entraînement habituel progressivement.', en: 'Gradually return to usual training.' },
      ],
      exercises: [
        { exerciseId: 'single-leg-squat', priority: 1, startLevel: 2 },
        { exerciseId: 'lunge', priority: 1, startLevel: 1 },
        { exerciseId: 'hip-hike', priority: 2, startLevel: 2 },
        { exerciseId: 'step-up', priority: 2, startLevel: 2 },
        { exerciseId: 'squat', priority: 2, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez deux séances de renforcement par semaine plusieurs mois après la disparition de la douleur : les récidives sont fréquentes.',
        en: 'Keep two strength sessions a week for several months after the pain has gone: recurrences are common.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Genou gonflé, chaud ou rouge, ou fièvre.', en: 'Swollen, hot or red knee, or fever.' },
    { fr: 'Genou qui se bloque ou se dérobe, ou sensation que la rotule se déboîte.', en: 'Knee locking or giving way, or feeling that the kneecap slips out.' },
    { fr: 'Douleur apparue après une chute, un choc ou une torsion.', en: 'Pain that started after a fall, a knock or a twist.' },
    { fr: 'Douleur la nuit ou au repos complet.', en: 'Pain at night or at complete rest.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines de renforcement bien conduit.', en: 'No improvement after 6 to 8 weeks of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Gestion de la charge : diminuez temporairement le volume, les côtes et surtout les descentes, puis reprenez par paliers. La douleur doit rester modérée et revenir à son niveau habituel le lendemain.',
      en: 'Load management: temporarily reduce volume, hills and especially downhills, then build back in steps. Pain should stay moderate and settle by the next day.',
    },
    {
      fr: 'En course, raccourcir légèrement la foulée en augmentant la cadence d’environ 5 à 10 % diminue la charge sur l’articulation de la rotule.',
      en: 'When running, slightly shortening the stride by increasing cadence by about 5–10% reduces load on the kneecap joint.',
    },
    {
      fr: 'À vélo : une selle trop basse augmente la pression sur la rotule. Vérifiez la hauteur de selle (genou fléchi d’environ 25 à 30° en bas du coup de pédale), pédalez en souplesse et évitez les gros braquets le temps de la reprise.',
      en: 'On the bike: a saddle that is too low increases kneecap pressure. Check saddle height (knee bent about 25–30° at the bottom of the pedal stroke), spin smoothly and avoid big gears while recovering.',
    },
    {
      fr: 'Des semelles préfabriquées ou un strapping de la rotule peuvent soulager à court terme, en complément des exercices.',
      en: 'Prefabricated insoles or kneecap taping may help in the short term, alongside exercise.',
    },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'willy-2019',
        finding: {
          fr: 'La recommandation JOSPT 2019 préconise en priorité (grade A) un programme d’exercices ciblant à la fois la hanche et le genou ; strapping, semelles préfabriquées et rééducation de la foulée sont des options complémentaires de niveau plus faible.',
          en: 'The 2019 JOSPT guideline primarily recommends (grade A) exercise targeting both hip and knee; taping, prefabricated orthoses and gait retraining are weaker, complementary options.',
        },
      },
      {
        refId: 'nascimento-2018',
        finding: {
          fr: 'Sur 14 essais (673 participants), le renforcement de la hanche et du genou a réduit la douleur et amélioré l’activité, mieux que le genou seul, avec des effets maintenus après le programme.',
          en: 'Across 14 trials (673 participants), hip and knee strengthening reduced pain and improved activity more than knee work alone, with effects maintained after the programme.',
        },
      },
      {
        refId: 'lack-2015',
        finding: {
          fr: 'Associer la rééducation des muscles de la hanche à celle du quadriceps réduit la douleur et améliore la fonction à court terme (preuves fortes), avec un bénéfice qui semble durer jusqu’à un an.',
          en: 'Combining hip muscle and quadriceps rehabilitation reduces pain and improves function in the short term (strong evidence), with a benefit that appears to last up to a year.',
        },
      },
      {
        refId: 'lenhart-2014',
        finding: {
          fr: 'Chez 30 coureurs, augmenter la cadence de 10 % a réduit de 14 % la force maximale sur l’articulation de la rotule.',
          en: 'In 30 runners, increasing step rate by 10% reduced peak patellofemoral joint force by 14%.',
        },
      },
      {
        refId: 'bini-2011',
        finding: {
          fr: 'D’après cette revue, la compression de la rotule semble augmenter quand la selle est plus basse ; les auteurs suggèrent de régler la hauteur pour un genou fléchi de 25 à 30° en bas du coup de pédale.',
          en: 'According to this review, kneecap compression seems to rise as saddle height falls; the authors suggest setting the saddle for 25–30° of knee bend at the bottom of the stroke.',
        },
      },
    ],
  },
});
