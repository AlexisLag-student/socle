/** Tendinopathie du psoas / douleur antérieure de hanche (skill add-pathology). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'iliopsoas-tendinopathy',
  region: 'hip-thigh',
  bodyAreas: ['hip-anterior', 'groin'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie du psoas (douleur antérieure de hanche)',
    en: 'Iliopsoas tendinopathy (anterior hip pain)',
  },
  aka: [
    { fr: 'Douleur de l’aine liée au psoas', en: 'Iliopsoas-related groin pain' },
    { fr: 'Tendinite du psoas', en: 'Psoas tendinitis' },
  ],
  description: {
    fr: 'Le psoas, qui monte le genou, devient sensible à l’avant de la hanche après une charge trop forte ou trop rapide : côtes, fractionné, fortes cadences ou longues heures en position fléchie sur le vélo.',
    en: 'The psoas, which lifts the knee, becomes sensitive at the front of the hip after load that is too high or increased too quickly: hills, intervals, high cadence or long hours in a flexed position on the bike.',
  },
  recognize: {
    fr: 'Douleur à l’avant de la hanche ou dans le pli de l’aine, souvent réveillée en montant le genou (sortir de la voiture, monter des escaliers, accélérer) et parfois en fin d’étirement de l’avant de la hanche.',
    en: 'Pain at the front of the hip or in the groin crease, often brought on by lifting the knee (getting out of a car, climbing stairs, speeding up) and sometimes at the end of a stretch of the front of the hip.',
  },
  symptoms: [
    { fr: 'Douleur dans le pli de l’aine en levant le genou, surtout au-dessus de l’horizontale.', en: 'Groin-crease pain when lifting the knee, especially above horizontal.' },
    { fr: 'Gêne en côte, en accélération ou en danseuse au vélo.', en: 'Discomfort uphill, when accelerating or out of the saddle on the bike.' },
    { fr: 'Parfois un ressaut indolore ou douloureux à l’avant de la hanche.', en: 'Sometimes a painless or painful snapping at the front of the hip.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du fractionné, des côtes ou du sprint.', en: 'Rapid increase in intervals, hills or sprinting.' },
    { fr: 'Longues périodes en position assise ou très fléchie sur le vélo.', en: 'Long periods sitting or in a very flexed position on the bike.' },
    { fr: 'Reprise après un arrêt, avec des fléchisseurs de hanche peu entraînés.', en: 'Returning after a break with untrained hip flexors.' },
  ],
  caveat: {
    fr: 'Les preuves sur cette douleur sont limitées : les tests cliniques sont peu fiables et les études de traitement sont de qualité faible à moyenne. Une douleur antérieure de hanche peut aussi venir de l’articulation elle-même, des adducteurs ou de la région inguinale : un avis professionnel aide à faire la part des choses.',
    en: 'Evidence on this condition is limited: clinical tests are unreliable and treatment studies are of low to moderate quality. Anterior hip pain can also come from the joint itself, the adductors or the inguinal region: a professional assessment helps sort this out.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On apaise l’avant de la hanche : isométrie douce des fléchisseurs, renforcement des fessiers, et moins de montées de genou à haute intensité.',
        en: 'Settle the front of the hip: gentle hip flexor isometrics, glute strengthening, and fewer high-intensity knee drives.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité en levant le genou.', en: 'Reduce sensitivity when lifting the knee.' },
        { fr: 'Garder une charge tolérée sur la hanche.', en: 'Keep a tolerated load on the hip.' },
      ],
      exercises: [
        { exerciseId: 'hip-flexor-isometric', priority: 1, startLevel: 1 },
        {
          exerciseId: 'glute-bridge',
          priority: 2,
          startLevel: 1,
          dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-2', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'side-lying-hip-abduction', priority: 3, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'hip-flexor-stretch',
          reason: {
            fr: 'L’étirement de l’avant de la hanche peut irriter le tendon tant qu’il est sensible.',
            en: 'Stretching the front of the hip may irritate the tendon while it is sensitive.',
          },
        },
        {
          exerciseId: 'hip-flexor-march',
          reason: {
            fr: 'Les montées de genou dynamiques viennent après l’isométrie, quand la douleur s’est calmée.',
            en: 'Dynamic knee drives come after isometrics, once the pain has settled.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Monter les escaliers et sortir de la voiture sans douleur.', en: 'Climb stairs and get out of a car without pain.' },
        { fr: 'Maintien du genou haut assis (niveau 2) toléré sans aggravation le lendemain.', en: 'Seated high-knee hold (level 2) tolerated without next-day flare.' },
      ],
      loadAdvice: {
        fr: 'Supprimez temporairement côtes raides, sprints et fractionné ; gardez de l’endurance facile sur le plat si la gêne reste modérée. Au vélo, privilégiez une cadence modérée, assis, et faites des pauses debout lors des longues sorties.',
        en: 'Temporarily drop steep hills, sprints and intervals; keep easy endurance on the flat if discomfort stays moderate. On the bike, favour a moderate cadence seated, and take standing breaks on long rides.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement les fléchisseurs de hanche, d’abord lentement puis contre résistance, avec le reste de la chaîne.',
        en: 'Progressively strengthen the hip flexors, slowly first and then against resistance, together with the rest of the chain.',
      },
      goals: [
        { fr: 'Retrouver la force de flexion de hanche, comparable entre les deux côtés.', en: 'Regain hip flexion strength, comparable on both sides.' },
        { fr: 'Renforcer fessiers et tronc pour mieux répartir la charge.', en: 'Strengthen the glutes and trunk to share the load.' },
      ],
      exercises: [
        { exerciseId: 'hip-flexor-march', priority: 1, startLevel: 1 },
        { exerciseId: 'hip-flexor-isometric', priority: 2, startLevel: 3 },
        { exerciseId: 'dead-bug', priority: 2, startLevel: 1 },
        { exerciseId: 'split-squat', priority: 2, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 3, startLevel: 2 },
      ],
      avoid: [
        {
          exerciseId: 'hip-flexor-stretch',
          reason: {
            fr: 'Réintroduisez l’étirement plus tard, quand la montée de genou contre résistance est indolore.',
            en: 'Bring stretching back later, once resisted knee drives are pain-free.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Montée de genou debout avec élastique (niveau 3) sans douleur.', en: 'Standing banded knee drive (level 3) without pain.' },
        { fr: 'Course facile de 30 minutes, ou sortie vélo habituelle, sans douleur le lendemain.', en: 'An easy 30-minute run, or a usual ride, without next-day pain.' },
      ],
      loadAdvice: {
        fr: 'Réintroduisez d’abord le volume facile, puis les côtes douces ; gardez sprints et fractionné court pour la phase suivante.',
        en: 'Bring back easy volume first, then gentle hills; keep sprints and short intervals for the next phase.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare la hanche à la vitesse : montées de genou rapides, exercices unipodaux et reprise progressive de l’intensité.',
        en: 'Prepare the hip for speed: fast knee drives, single-leg exercises and a gradual return to intensity.',
      },
      goals: [
        { fr: 'Tolérer les montées de genou rapides et le sprint.', en: 'Tolerate fast knee drives and sprinting.' },
        { fr: 'Retrouver une amplitude d’extension de hanche confortable.', en: 'Regain comfortable hip extension range.' },
      ],
      exercises: [
        { exerciseId: 'hip-flexor-march', priority: 1, startLevel: 3 },
        { exerciseId: 'step-up', priority: 2, startLevel: 1 },
        { exerciseId: 'lunge', priority: 2, startLevel: 1 },
        { exerciseId: 'hip-flexor-stretch', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Reprenez les accélérations courtes et progressives avant le fractionné rapide et les côtes raides.',
        en: 'Return to short, progressive strides before fast intervals and steep hills.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur profonde de l’aine avec blocage, accrochage ou sensation que la hanche se dérobe : l’articulation peut être en cause.', en: 'Deep groin pain with locking, catching or the hip giving way: the joint itself may be involved.' },
    { fr: 'Douleur de l’aine qui augmente à chaque sortie et persiste au repos ou la nuit, surtout après une hausse de volume : une fracture de fatigue du col du fémur doit être écartée rapidement.', en: 'Groin pain that worsens with every run and persists at rest or at night, especially after a rise in volume: a femoral neck stress fracture must be ruled out quickly.' },
    { fr: 'Fièvre, frissons ou douleur importante avec impossibilité de marcher.', en: 'Fever, chills or severe pain with inability to walk.' },
    { fr: 'Boule à l’aine qui apparaît à la toux ou à l’effort.', en: 'A lump in the groin that appears when coughing or straining.' },
    { fr: 'Douleur après une chute ou un traumatisme, ou amaigrissement inexpliqué.', en: 'Pain after a fall or injury, or unexplained weight loss.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines de prise en charge bien conduite.', en: 'No improvement after 6 to 8 weeks of well-conducted management.' },
  ],
  complementaryAdvice: [
    { fr: 'Au vélo, une selle trop basse ou trop avancée et un poste très plongeant ferment l’angle de hanche : faites vérifier votre position.', en: 'On the bike, a saddle that is too low or too far forward and a very low front end close the hip angle: have your position checked.' },
    { fr: 'Levez-vous régulièrement lors des longues journées assises.', en: 'Get up regularly during long sitting days.' },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'vandeputte-2026',
        finding: {
          fr: 'Cette revue de 71 études de traitement rapporte de bons résultats du traitement conservateur chez les sportifs (77 à 100 %), mais dans des études de qualité faible à moyenne, sans test diagnostique fiable.',
          en: 'This review of 71 treatment studies reports good results from conservative care in athletes (77 to 100%), but in studies of low to moderate quality and without a reliable diagnostic test.',
        },
      },
      {
        refId: 'holmich-2026',
        finding: {
          fr: 'Ce consensus européen retient la douleur de l’aine liée au psoas comme catégorie distincte, rappelle que plusieurs causes coexistent souvent et que les signes d’alerte ne doivent pas être ignorés.',
          en: 'This European consensus keeps iliopsoas-related groin pain as a distinct category, notes that several causes often coexist and that red flags must not be ignored.',
        },
      },
      {
        refId: 'kemp-2020',
        finding: {
          fr: 'Pour les douleurs de hanche liées à l’articulation chez l’adulte actif, les experts recommandent un traitement basé sur l’exercice d’au moins 3 mois, tout en notant l’absence de preuves fortes.',
          en: 'For joint-related hip pain in active adults, experts recommend exercise-based treatment for at least 3 months, while noting that strong evidence is lacking.',
        },
      },
    ],
  },
});
