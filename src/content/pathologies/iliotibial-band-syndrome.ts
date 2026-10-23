/**
 * Syndrome de la bandelette ilio-tibiale (douleur externe du genou), course et vélo.
 */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'iliotibial-band-syndrome',
  region: 'knee',
  bodyAreas: ['knee-lateral'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Syndrome de la bandelette ilio-tibiale',
    en: 'Iliotibial band syndrome',
  },
  aka: [{ fr: 'Syndrome de l’essuie-glace, TFL', en: 'ITB syndrome, ITB friction syndrome' }],
  description: {
    fr: 'La bandelette ilio-tibiale est une large bande fibreuse sur le côté de la cuisse. Sa zone d’attache, sur la face externe du genou, devient sensible quand la répétition des flexions dépasse sa tolérance du moment, souvent après une hausse brutale de volume.',
    en: 'The iliotibial band is a broad fibrous band along the side of the thigh. The area where it crosses the outside of the knee becomes sensitive when repeated bending exceeds its current tolerance, often after a sudden rise in volume.',
  },
  recognize: {
    fr: 'Douleur vive sur la face externe du genou, au-dessus de l’interligne, qui apparaît souvent après un temps ou une distance assez précis et peut obliger à s’arrêter ; elle est souvent plus forte en descente et disparaît vite au repos.',
    en: 'Sharp pain on the outside of the knee, just above the joint line, that often appears after a fairly predictable time or distance and may force you to stop; it is often worse downhill and settles quickly at rest.',
  },
  symptoms: [
    { fr: 'Douleur externe du genou qui apparaît au bout d’un certain temps de course ou de vélo.', en: 'Outer knee pain that appears after a certain time running or cycling.' },
    { fr: 'Gêne plus nette en descente ou en descendant les escaliers.', en: 'Discomfort more marked downhill or going down stairs.' },
    { fr: 'Sensibilité à la pression sur le côté externe du genou.', en: 'Tenderness to pressure on the outside of the knee.' },
    { fr: 'Marche jambe tendue souvent plus confortable que genou plié.', en: 'Walking with a straight leg often more comfortable than with a bent knee.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du kilométrage, surtout en descente ou sur piste dans le même sens.', en: 'Rapid mileage increase, especially downhill or running the same direction on a track.' },
    { fr: 'Faiblesse des abducteurs de hanche (moyen fessier).', en: 'Weak hip abductors (gluteus medius).' },
    { fr: 'À vélo : selle trop haute ou trop reculée, cales orientées vers l’intérieur, pieds trop rapprochés.', en: 'On the bike: saddle too high or too far back, cleats angled inwards, feet set too narrow.' },
    { fr: 'Plus fréquent chez les coureuses.', en: 'More common in female runners.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On réduit ce qui déclenche la douleur (volume, descentes) et on commence le renforcement de la hanche, peu irritant pour le genou.',
        en: 'Reduce what triggers the pain (volume, downhills) and start hip strengthening, which is gentle on the knee.',
      },
      goals: [
        { fr: 'Faire baisser la sensibilité de la face externe du genou.', en: 'Reduce sensitivity on the outside of the knee.' },
        { fr: 'Commencer à renforcer les abducteurs de hanche.', en: 'Start strengthening the hip abductors.' },
      ],
      exercises: [
        { exerciseId: 'side-lying-hip-abduction', priority: 1, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 1, startLevel: 1 },
        { exerciseId: 'clamshell', priority: 2, startLevel: 1 },
        { exerciseId: 'wall-sit', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Marche rapide et escaliers sans douleur externe du genou.', en: 'Brisk walking and stairs without outer knee pain.' },
        { fr: 'Pression sur la face externe du genou nettement moins sensible.', en: 'Pressure on the outside of the knee clearly less tender.' },
      ],
      loadAdvice: {
        fr: 'Arrêtez la sortie dès que la douleur apparaît plutôt que de forcer. Courez plus court, sur terrain plat, et évitez les descentes ; à vélo, roulez souple sur le plat.',
        en: 'Stop the session as soon as pain appears rather than pushing through. Run shorter, on flat ground, and avoid downhills; on the bike, spin easy on the flat.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce la hanche en charge et le contrôle du genou sur une jambe.',
        en: 'Strengthen the hip under load and single-leg knee control.',
      },
      goals: [
        { fr: 'Force des abducteurs de hanche comparable des deux côtés.', en: 'Hip abductor strength comparable on both sides.' },
        { fr: 'Bassin stable sur une jambe.', en: 'Stable pelvis on one leg.' },
      ],
      exercises: [
        { exerciseId: 'lateral-band-walk', priority: 1, startLevel: 2 },
        { exerciseId: 'hip-hike', priority: 1, startLevel: 1 },
        { exerciseId: 'step-down', priority: 2, startLevel: 1 },
        { exerciseId: 'split-squat', priority: 2, startLevel: 1 },
        { exerciseId: 'side-lying-hip-abduction', priority: 2, startLevel: 3 },
      ],
      nextPhaseCriteria: [
        { fr: '3 × 12 descentes de marche par jambe, bassin horizontal et genou dans l’axe.', en: '3 × 12 step-downs per leg, level pelvis and knee aligned.' },
        { fr: '30 minutes de course ou 1 h 30 de vélo sur le plat sans douleur.', en: '30 minutes of running or 1 h 30 of flat cycling without pain.' },
      ],
      loadAdvice: {
        fr: 'Reprenez par sorties courtes et fréquentes ; ajoutez la durée avant l’intensité et réintroduisez les descentes en dernier.',
        en: 'Return with short, frequent sessions; add duration before intensity and bring downhills back last.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare la hanche et le genou aux appuis unipodaux dynamiques et aux descentes.',
        en: 'Prepare the hip and knee for dynamic single-leg loading and downhills.',
      },
      goals: [
        { fr: 'Retrouver le volume et le dénivelé habituels.', en: 'Return to usual volume and elevation.' },
        { fr: 'Entretenir la force de la hanche.', en: 'Maintain hip strength.' },
      ],
      exercises: [
        { exerciseId: 'single-leg-squat', priority: 1, startLevel: 2 },
        { exerciseId: 'lunge', priority: 1, startLevel: 2 },
        { exerciseId: 'single-leg-deadlift', priority: 2, startLevel: 2 },
        { exerciseId: 'step-up', priority: 2, startLevel: 2 },
        { exerciseId: 'lateral-band-walk', priority: 3, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez deux séances de renforcement de la hanche par semaine et variez les parcours.',
        en: 'Keep two hip strength sessions a week and vary your routes.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Genou gonflé, chaud, ou qui se bloque ou se dérobe.', en: 'Swollen or hot knee, or a knee that locks or gives way.' },
    { fr: 'Douleur apparue après une torsion, une chute ou un choc.', en: 'Pain that started after a twist, a fall or a knock.' },
    { fr: 'Douleur sur l’interligne du genou (plus bas que la bandelette) ou à l’intérieur du genou.', en: 'Pain on the knee joint line (lower than the band) or on the inside of the knee.' },
    { fr: 'Douleur la nuit, au repos, ou fourmillements dans la jambe.', en: 'Pain at night, at rest, or tingling in the leg.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines d’adaptation de la charge et de renforcement.', en: 'No improvement after 6 to 8 weeks of load adjustment and strengthening.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Gestion de la charge : la douleur apparaît souvent à un kilométrage précis. Restez en dessous, puis allongez progressivement les sorties.',
      en: 'Load management: pain often appears at a predictable distance. Stay below it, then lengthen sessions gradually.',
    },
    {
      fr: 'À vélo, faites vérifier la hauteur et le recul de selle, l’orientation et l’écartement des cales : une selle trop haute ou des pieds trop rapprochés sont souvent en cause.',
      en: 'On the bike, have saddle height and setback, cleat angle and stance width checked: a saddle too high or feet set too narrow are common culprits.',
    },
    {
      fr: 'Les étirements et le rouleau de massage peuvent soulager, mais ne remplacent pas l’adaptation de la charge et le renforcement de la hanche.',
      en: 'Stretching and foam rolling may bring relief but do not replace load adjustment and hip strengthening.',
    },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'sanchez-alvarado-2024',
        finding: {
          fr: 'Cette revue de 13 études (201 coureurs) retrouve le renforcement des abducteurs de hanche comme stratégie commune des traitements efficaces, mais la grande hétérogénéité des études (dont 6 études de cas, sans méta-analyse possible) limite les conclusions.',
          en: 'This review of 13 studies (201 runners) found hip abductor strengthening to be a common feature of effective treatments, but large heterogeneity between studies (including 6 case studies, precluding meta-analysis) limits the conclusions.',
        },
      },
      {
        refId: 'fredericson-2000',
        finding: {
          fr: 'Chez 24 coureurs, la hanche du côté douloureux était plus faible ; après 6 semaines de renforcement du moyen fessier, 22 ont repris la course sans douleur, sans récidive à 6 mois.',
          en: 'In 24 runners, the hip on the painful side was weaker; after 6 weeks of gluteus medius strengthening, 22 returned to pain-free running, with no recurrence at 6 months.',
        },
      },
      {
        refId: 'foch-2023',
        finding: {
          fr: 'Cette méta-analyse retrouve une force des abducteurs de hanche plus faible chez les coureuses souffrant actuellement de ce syndrome, mais pas de profil commun aux hommes et aux femmes.',
          en: 'This meta-analysis found weaker hip abductors in female runners with current ITB syndrome, but no profile common to men and women.',
        },
      },
    ],
  },
});
