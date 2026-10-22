/**
 * Genou du cycliste : douleurs antérieure, médiale et latérale liées au pédalage.
 */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'cyclist-knee-pain',
  region: 'knee',
  bodyAreas: ['knee-anterior', 'knee-medial', 'knee-lateral'],
  sports: ['bike'],
  name: {
    fr: 'Genou du cycliste',
    en: 'Cyclist’s knee pain',
  },
  aka: [{ fr: 'Douleur du genou liée au pédalage', en: 'Cycling-related knee pain' }],
  description: {
    fr: 'Le genou fait plusieurs milliers de flexions par heure de vélo. Une position mal réglée, une hausse brutale du volume ou trop de gros braquets concentrent les contraintes sur une zone : l’avant, l’intérieur ou l’extérieur du genou selon le réglage en cause.',
    en: 'The knee bends several thousand times per hour of cycling. A poorly set position, a sudden rise in volume or too much pushing of big gears concentrate stress on one area: the front, inside or outside of the knee depending on the setting involved.',
  },
  recognize: {
    fr: 'Douleur qui apparaît en pédalant et augmente avec la durée ou l’intensité. Devant, autour ou sous la rotule : souvent avec une selle trop basse ou trop avancée, des manivelles longues ou de gros braquets. À l’intérieur : souvent quand le genou est dévié par l’orientation des cales ou des pieds trop écartés. À l’extérieur : souvent avec une selle trop haute ou trop reculée, ou des pieds trop rapprochés.',
    en: 'Pain that appears while pedalling and increases with duration or intensity. At the front, around or below the kneecap: often with a saddle too low or too far forward, long cranks or big gears. On the inside: often when cleat angle steers the knee, or feet are too wide. On the outside: often with a saddle too high or too far back, or feet too narrow.',
  },
  symptoms: [
    { fr: 'Douleur à l’avant du genou en montée ou avec de gros braquets.', en: 'Front-of-knee pain when climbing or in big gears.' },
    { fr: 'Douleur à l’intérieur du genou qui augmente au fil de la sortie.', en: 'Inner-knee pain that builds over the ride.' },
    { fr: 'Douleur à l’extérieur du genou, souvent après un temps de pédalage assez précis.', en: 'Outer-knee pain, often after a fairly predictable riding time.' },
    { fr: 'Gêne qui persiste dans les escaliers après la sortie.', en: 'Discomfort that lingers on stairs after the ride.' },
  ],
  riskFactors: [
    { fr: 'Changement récent de vélo, de selle, de chaussures ou de cales.', en: 'Recent change of bike, saddle, shoes or cleats.' },
    { fr: 'Hausse rapide du volume ou du dénivelé (stage, début de saison).', en: 'Rapid increase in volume or climbing (training camp, start of season).' },
    { fr: 'Pédalage en force à faible cadence.', en: 'Grinding big gears at low cadence.' },
    { fr: 'Manque de force des quadriceps et des fessiers.', en: 'Weak quadriceps and glutes.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On corrige la position, on allège le pédalage et on commence un renforcement doux de la cuisse et de la hanche.',
        en: 'Correct the position, ease off the pedalling and start gentle thigh and hip strengthening.',
      },
      goals: [
        { fr: 'Faire vérifier et corriger la position sur le vélo.', en: 'Have the bike position checked and corrected.' },
        { fr: 'Diminuer la douleur en pédalant.', en: 'Reduce pain while pedalling.' },
      ],
      exercises: [
        { exerciseId: 'wall-sit', priority: 1, startLevel: 1 },
        { exerciseId: 'side-lying-hip-abduction', priority: 1, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 1 },
        { exerciseId: 'isometric-knee-extension', priority: 2, startLevel: 1 },
        { exerciseId: 'terminal-knee-extension', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: '1 h de vélo souple sans douleur pendant ni le lendemain, avec la position corrigée.', en: '1 h of easy riding without pain during or the next day, with the corrected position.' },
        { fr: 'Escaliers sans douleur.', en: 'Stairs without pain.' },
      ],
      loadAdvice: {
        fr: 'Roulez plus court, sur le plat, à cadence élevée (environ 85 à 95 tours par minute) avec de petits braquets ; évitez les montées assis en force.',
        en: 'Ride shorter, on the flat, at high cadence (about 85–95 rpm) in small gears; avoid seated grinding on climbs.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce lourdement les cuisses et les fessiers pour que le genou supporte mieux le volume et l’intensité.',
        en: 'Build heavy thigh and glute strength so the knee better tolerates volume and intensity.',
      },
      goals: [
        { fr: 'Augmenter la force des quadriceps et des fessiers.', en: 'Increase quad and glute strength.' },
        { fr: 'Reprendre progressivement le volume.', en: 'Gradually rebuild volume.' },
      ],
      exercises: [
        { exerciseId: 'leg-press', priority: 1, startLevel: 1 },
        { exerciseId: 'squat', priority: 1, startLevel: 1 },
        { exerciseId: 'step-up', priority: 2, startLevel: 1 },
        { exerciseId: 'lateral-band-walk', priority: 2, startLevel: 2 },
        { exerciseId: 'split-squat', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Sorties de 2 h, dont des montées à cadence normale, sans douleur le lendemain.', en: '2 h rides including climbs at normal cadence, without next-day pain.' },
        { fr: 'Exercices de force réalisés sans douleur croissante.', en: 'Strength exercises done without increasing pain.' },
      ],
      loadAdvice: {
        fr: 'Augmentez la durée avant l’intensité ; réintroduisez montées et fractionné en force en dernier.',
        en: 'Increase duration before intensity; bring back climbs and low-cadence intervals last.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On reprend l’intensité habituelle en gardant la force lourde et le contrôle sur une jambe.',
        en: 'Return to usual intensity while keeping heavy strength and single-leg control.',
      },
      goals: [{ fr: 'Retrouver l’entraînement habituel et entretenir la force.', en: 'Return to usual training and maintain strength.' }],
      exercises: [
        { exerciseId: 'leg-press', priority: 1, startLevel: 4 },
        { exerciseId: 'single-leg-squat', priority: 1, startLevel: 2 },
        { exerciseId: 'step-up', priority: 2, startLevel: 3 },
        { exerciseId: 'glute-bridge', priority: 3, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez deux séances de musculation par semaine en période de préparation et une en saison.',
        en: 'Keep two strength sessions a week in the build-up and one in season.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Genou gonflé, chaud ou rouge, ou fièvre.', en: 'Swollen, hot or red knee, or fever.' },
    { fr: 'Blocage ou dérobement du genou.', en: 'Knee locking or giving way.' },
    { fr: 'Douleur apparue après une chute ou un choc (pédale, cadre, sol).', en: 'Pain that started after a crash or knock (pedal, frame, ground).' },
    { fr: 'Douleur la nuit ou au repos complet.', en: 'Pain at night or at complete rest.' },
    { fr: 'Pas d’amélioration après 4 à 6 semaines malgré la correction de la position et l’adaptation de l’entraînement.', en: 'No improvement after 4 to 6 weeks despite position correction and training adjustment.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Faites vérifier votre position par un professionnel de l’étude posturale (bike fitter) ou un kinésithérapeute formé au vélo, surtout après un changement de matériel.',
      en: 'Have your position checked by a bike fitter or a cycling-trained physiotherapist, especially after any equipment change.',
    },
    {
      fr: 'Hauteur de selle : genou fléchi d’environ 25 à 30° pédale en bas. Trop basse, elle charge l’avant du genou ; trop haute, elle fait basculer le bassin et peut irriter l’extérieur ou l’arrière du genou. Modifiez-la par petits pas (quelques millimètres).',
      en: 'Saddle height: knee bent about 25–30° with the pedal at the bottom. Too low loads the front of the knee; too high makes the pelvis rock and may irritate the outside or back of the knee. Change it in small steps (a few millimetres).',
    },
    {
      fr: 'Recul de selle : une selle trop avancée augmente la charge sur l’avant du genou, une selle trop reculée peut étirer l’arrière et l’extérieur.',
      en: 'Saddle setback: a saddle too far forward increases load on the front of the knee; too far back may strain the back and outside.',
    },
    {
      fr: 'Cales : leur rotation et leur position latérale doivent respecter l’orientation naturelle du pied ; un genou qui rentre ou sort pendant le pédalage oriente souvent vers un réglage de cales ou d’écartement des pieds. Des pédales avec un peu de liberté angulaire peuvent aider.',
      en: 'Cleats: their rotation and side-to-side position should respect the foot’s natural angle; a knee that moves in or out while pedalling often points to cleat or stance-width settings. Pedals with some float may help.',
    },
    {
      fr: 'Longueur de manivelles : des manivelles trop longues pour votre taille augmentent la flexion du genou en haut du coup de pédale et peuvent charger l’avant du genou.',
      en: 'Crank length: cranks too long for your size increase knee bend at the top of the stroke and may load the front of the knee.',
    },
    {
      fr: 'Pédalez en souplesse (cadence plutôt élevée) et augmentez le volume progressivement, en particulier en début de saison ou en stage.',
      en: 'Spin smoothly (rather high cadence) and increase volume gradually, especially at the start of the season or on training camps.',
    },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'viau-2025',
        finding: {
          fr: 'Chez 76 cyclistes amateurs souffrant du genou, une prise en charge associant étude posturale, conseils sur la cadence et la progression, et exercices a été suivie d’une baisse de la douleur à 4 et 12 semaines (étude sans groupe contrôle).',
          en: 'In 76 recreational cyclists with knee pain, care combining a bike fit, advice on cadence and progression, and exercises was followed by reduced pain at 4 and 12 weeks (study without a control group).',
        },
      },
      {
        refId: 'johnston-2017',
        finding: {
          fr: 'Cette revue de 14 études montre que cadence, puissance, longueur de manivelles, recul et hauteur de selle et position du pied modifient les contraintes du genou, sans lien direct démontré avec le risque de blessure.',
          en: 'This review of 14 studies shows that cadence, power, crank length, saddle setback and height and foot position change knee loading, without a demonstrated direct link to injury risk.',
        },
      },
      {
        refId: 'bini-2022',
        finding: {
          fr: 'La hauteur de selle se règle de préférence à partir de l’angle du genou mesuré en pédalant ; les preuves sur son effet sur le risque de blessure restent limitées.',
          en: 'Saddle height is best set from the knee angle measured while pedalling; evidence on its effect on injury risk remains limited.',
        },
      },
      {
        refId: 'clarsen-2010',
        finding: {
          fr: 'Chez 109 cyclistes professionnels, 36 % avaient eu une douleur à l’avant du genou dans l’année, et le genou représentait 57 % des blessures ayant fait perdre des jours d’entraînement.',
          en: 'Among 109 professional cyclists, 36% had anterior knee pain in the past year, and the knee accounted for 57% of time-loss injuries.',
        },
      },
    ],
  },
});
