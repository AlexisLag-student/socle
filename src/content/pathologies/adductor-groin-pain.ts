/** Douleur de l'aine liée aux adducteurs (« pubalgie ») — zone cuisse. */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'adductor-groin-pain',
  region: 'hip-thigh',
  bodyAreas: ['groin'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Douleur de l’aine liée aux adducteurs',
    en: 'Adductor-related groin pain',
  },
  aka: [
    { fr: 'Pubalgie', en: 'Groin strain' },
    { fr: 'Tendinopathie des adducteurs', en: 'Adductor tendinopathy' },
  ],
  description: {
    fr: 'Les adducteurs, à l’intérieur de la cuisse, s’attachent sur le pubis. Quand leur charge dépasse leur capacité (changements de direction, trail, vitesse), leur attache devient douloureuse. Un renforcement actif et progressif est le traitement de base.',
    en: 'The adductors, on the inner thigh, attach to the pubic bone. When their load exceeds their capacity (changes of direction, trails, speed), their attachment becomes painful. Active, progressive strengthening is the core treatment.',
  },
  recognize: {
    fr: 'Douleur à l’intérieur du haut de la cuisse ou au pli de l’aine, près du pubis, souvent réveillée en serrant les genoux, en écartant la jambe, dans les virages et les appuis latéraux, et qui s’installe progressivement.',
    en: 'Pain on the inner upper thigh or in the groin crease near the pubic bone, often triggered by squeezing the knees together, moving the leg out, cornering and side-steps, and that builds up gradually.',
  },
  symptoms: [
    { fr: 'Douleur en serrant les genoux l’un contre l’autre.', en: 'Pain when squeezing the knees together.' },
    { fr: 'Gêne au démarrage de la course, qui peut s’atténuer à l’échauffement puis revenir après.', en: 'Discomfort at the start of a run that may ease when warm, then return afterwards.' },
    { fr: 'Douleur dans les virages, les relances et en sortant de voiture.', en: 'Pain when cornering, accelerating and getting out of a car.' },
    { fr: 'Sensibilité à la pression à l’attache des adducteurs sur le pubis.', en: 'Tenderness at the adductor attachment on the pubic bone.' },
  ],
  riskFactors: [
    { fr: 'Antécédent de douleur de l’aine.', en: 'Previous groin pain.' },
    { fr: 'Faible force des adducteurs.', en: 'Low adductor strength.' },
    { fr: 'Augmentation rapide du trail, des descentes, de la vitesse ou des sports à changements de direction.', en: 'Rapid increase in trail running, downhills, speed or change-of-direction sports.' },
    { fr: 'Niveau de pratique élevé.', en: 'High level of play.' },
  ],
  caveat: {
    fr: 'La douleur de l’aine a plusieurs origines : adducteurs, psoas, canal inguinal, pubis, articulation de la hanche, ou causes non musculaires (hernie, fracture de fatigue, causes urologiques ou gynécologiques). « Pubalgie » est un terme fourre-tout. Cette fiche concerne la forme liée aux adducteurs ; un examen permet de faire la différence.',
    en: 'Groin pain has several sources: adductors, iliopsoas, inguinal canal, pubic bone, hip joint, or non-muscular causes (hernia, stress fracture, urological or gynaecological causes). “Groin strain” is often used loosely. This page covers the adductor-related form; an examination tells them apart.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme l’aine en chargeant les adducteurs sans mouvement : serrages isométriques quotidiens, adduction légère et gainage.',
        en: 'Settle the groin by loading the adductors without movement: daily isometric squeezes, light adduction and core work.',
      },
      goals: [
        { fr: 'Diminuer la douleur au serrage des genoux.', en: 'Reduce pain when squeezing the knees.' },
        { fr: 'Garder une charge tolérée sur les adducteurs.', en: 'Keep a tolerated load on the adductors.' },
      ],
      exercises: [
        {
          exerciseId: 'adductor-squeeze',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 5, holdSec: 20, restSec: 30, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
        },
        { exerciseId: 'side-lying-hip-adduction', priority: 2, startLevel: 1 },
        { exerciseId: 'standing-hip-adduction', priority: 2, startLevel: 1 },
        { exerciseId: 'side-plank', priority: 3, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'copenhagen-adductor',
          reason: {
            fr: 'Charge élevée en levier long : à introduire dans la phase suivante, d’abord en levier court.',
            en: 'High long-lever load: introduce it in the next phase, short lever first.',
          },
        },
        {
          exerciseId: 'lateral-lunge',
          reason: {
            fr: 'Étirement sous charge des adducteurs, mal toléré tant que l’aine est sensible.',
            en: 'Loaded adductor stretch, poorly tolerated while the groin is sensitive.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Serrage genoux fléchis tenu 30 s à effort fort, sans douleur.', en: 'Bent-knee squeeze held 30 s at a strong effort, pain-free.' },
        { fr: 'Marche rapide, escaliers et sortie de voiture sans douleur.', en: 'Brisk walking, stairs and getting out of a car without pain.' },
        { fr: 'Footing facile sans douleur le lendemain.', en: 'Easy jog without pain the next day.' },
      ],
      loadAdvice: {
        fr: 'Courez sur terrain plat et régulier, à allure facile, si la gêne reste modérée et se calme le lendemain. Évitez temporairement trail technique, descentes rapides, virages serrés et sports à changements de direction.',
        en: 'Run on flat, even ground at an easy pace if discomfort stays moderate and settles by the next day. Temporarily avoid technical trails, fast downhills, tight turns and change-of-direction sports.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit la force des adducteurs avec des exercices dynamiques de plus en plus intenses, dont le Copenhagen.',
        en: 'Rebuild adductor strength with increasingly intense dynamic exercises, including the Copenhagen.',
      },
      goals: [
        { fr: 'Retrouver une force des adducteurs symétrique.', en: 'Regain symmetrical adductor strength.' },
        { fr: 'Renforcer aussi les abdominaux et les muscles du bassin.', en: 'Also strengthen the abdominals and pelvic muscles.' },
      ],
      exercises: [
        { exerciseId: 'copenhagen-adductor', priority: 1, startLevel: 1 },
        { exerciseId: 'standing-hip-adduction', priority: 1, startLevel: 2 },
        { exerciseId: 'adductor-squeeze', priority: 2, startLevel: 3 },
        { exerciseId: 'side-lying-hip-adduction', priority: 2, startLevel: 2 },
        { exerciseId: 'side-plank', priority: 3 },
      ],
      avoid: [
        {
          exerciseId: 'lateral-lunge',
          reason: {
            fr: 'À réintroduire en phase de reprise, quand le Copenhagen en levier court est indolore.',
            en: 'Reintroduce in the return phase, once the short-lever Copenhagen is pain-free.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Copenhagen en levier court : 3 × 10 de chaque côté sans douleur.', en: 'Short-lever Copenhagen: 3 × 10 per side without pain.' },
        { fr: 'Force perçue identique des deux côtés au serrage.', en: 'Squeeze strength feels equal on both sides.' },
        { fr: '40 minutes de course continue sans douleur le lendemain.', en: '40 minutes of continuous running without pain the next day.' },
      ],
      loadAdvice: {
        fr: 'Réintroduisez progressivement les côtes, les accélérations en ligne droite puis les virages larges.',
        en: 'Gradually reintroduce hills, straight-line strides, then wide turns.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare les adducteurs aux appuis latéraux, aux descentes et à la vitesse, en gardant le Copenhagen en entretien.',
        en: 'Prepare the adductors for side-steps, downhills and speed, keeping the Copenhagen for maintenance.',
      },
      goals: [
        { fr: 'Reprendre trail, vitesse et changements de direction sans douleur.', en: 'Resume trails, speed and changes of direction pain-free.' },
        { fr: 'Prévenir la récidive.', en: 'Prevent recurrence.' },
      ],
      exercises: [
        { exerciseId: 'copenhagen-adductor', priority: 1, startLevel: 3 },
        { exerciseId: 'lateral-lunge', priority: 1, startLevel: 1 },
        { exerciseId: 'standing-hip-adduction', priority: 2, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez une seule variable à la fois (dénivelé, vitesse, terrain technique). Gardez le Copenhagen une à deux fois par semaine pendant la saison.',
        en: 'Increase one variable at a time (elevation, speed, technical terrain). Keep the Copenhagen once or twice a week through the season.',
      },
    },
  ],
  whenToConsult: [
    {
      fr: 'Douleur de l’aine qui augmente à chaque sortie, présente au repos ou la nuit, ou qui empêche de sauter à cloche-pied : une fracture de fatigue du col du fémur ou du pubis doit être éliminée rapidement, en arrêtant la course d’ici là.',
      en: 'Groin pain that worsens with every run, is present at rest or at night, or prevents hopping on one leg: a femoral neck or pubic stress fracture must be ruled out promptly; stop running until then.',
    },
    { fr: 'Gonflement ou boule dans l’aine qui grossit à la toux ou à l’effort.', en: 'Swelling or a lump in the groin that grows when coughing or straining.' },
    {
      fr: 'Fièvre, brûlures urinaires, douleur des testicules, ou douleur pelvienne liée au cycle menstruel.',
      en: 'Fever, burning urination, testicular pain, or pelvic pain linked to the menstrual cycle.',
    },
    {
      fr: 'Douleur profonde de hanche avec blocages, accrochages ou perte de mobilité.',
      en: 'Deep hip pain with locking, catching or loss of mobility.',
    },
    { fr: 'Claquement net avec bleu à l’intérieur de la cuisse.', en: 'Clear snap with bruising on the inner thigh.' },
    { fr: 'Pas d’amélioration après 8 à 12 semaines de renforcement bien conduit.', en: 'No improvement after 8 to 12 weeks of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Le repos seul fait rarement disparaître ce type de douleur durablement : le renforcement actif des adducteurs et des abdominaux reste la base.',
      en: 'Rest alone rarely resolves this type of pain for good: active strengthening of the adductors and abdominals remains the foundation.',
    },
    {
      fr: 'Sur le vélo, une selle trop haute ou mal orientée peut irriter la région de l’aine : vérifiez la hauteur et l’inclinaison de selle si la douleur apparaît en roulant.',
      en: 'On the bike, a saddle that is too high or poorly angled can irritate the groin area: check saddle height and tilt if pain appears while riding.',
    },
  ],
  evidence: {
    level: 'moderate',
    citations: [
      {
        refId: 'holmich-1999',
        finding: {
          fr: 'Chez 68 athlètes avec une douleur de l’aine liée aux adducteurs depuis longtemps, un entraînement actif de 8 à 12 semaines centré sur les adducteurs a permis à 23 d’entre eux de reprendre leur sport sans douleur, contre 4 avec une kinésithérapie passive.',
          en: 'In 68 athletes with long-standing adductor-related groin pain, 8 to 12 weeks of active training focused on the adductors let 23 of them return to sport pain-free, versus 4 with passive physiotherapy.',
        },
      },
      {
        refId: 'almeida-2013',
        finding: {
          fr: 'La revue Cochrane juge les preuves de faible qualité, mais la meilleure disponible favorise le renforcement des muscles de la hanche et de l’abdomen plutôt que les traitements passifs.',
          en: 'The Cochrane review rates the evidence as low quality, but the best available favours strengthening the hip and abdominal muscles over passive treatments.',
        },
      },
      {
        refId: 'weir-2015',
        finding: {
          fr: 'Le consensus de Doha classe les douleurs de l’aine du sportif en formes liées aux adducteurs, au psoas, au canal inguinal et au pubis, en douleur d’origine articulaire de la hanche et en autres causes.',
          en: 'The Doha agreement classifies athletic groin pain into adductor-, iliopsoas-, inguinal- and pubic-related forms, hip-related groin pain and other causes.',
        },
      },
      {
        refId: 'haroy-2019',
        finding: {
          fr: 'En prévention, un programme fondé sur le Copenhagen a réduit de 41 % le risque de douleurs de l’aine chez 652 footballeurs.',
          en: 'For prevention, a Copenhagen-based programme cut the risk of groin problems by 41% in 652 football players.',
        },
      },
      {
        refId: 'quintana-cepedal-2025',
        finding: {
          fr: 'Méta-analyse de 13 cohortes : les sportifs qui ont ensuite souffert de l’aine avaient des adducteurs moins forts au départ ; la force des abducteurs n’était pas en cause.',
          en: 'Meta-analysis of 13 cohorts: athletes who later developed groin pain had weaker adductors at baseline; abductor strength was not involved.',
        },
      },
    ],
  },
});
