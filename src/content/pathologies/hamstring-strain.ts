/** Lésion des ischio-jambiers : reprise après la phase aiguë (zone cuisse). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'hamstring-strain',
  region: 'hip-thigh',
  bodyAreas: ['thigh-posterior'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Lésion des ischio-jambiers (reprise)',
    en: 'Hamstring strain (return to sport)',
  },
  aka: [
    { fr: 'Claquage ou déchirure des ischios', en: 'Pulled hamstring' },
    { fr: 'Élongation des ischio-jambiers', en: 'Hamstring tear' },
  ],
  description: {
    fr: 'Des fibres des ischio-jambiers se sont déchirées, le plus souvent pendant un sprint (quand le muscle freine la jambe en fin de phase aérienne) ou lors d’un étirement brusque. La cicatrisation se guide par une charge progressive, et la récidive est fréquente si la reprise est trop rapide.',
    en: 'Hamstring fibres have torn, most often during a sprint (when the muscle brakes the leg at the end of the swing phase) or during a sudden stretch. Healing is guided by progressive loading, and recurrence is common if return is rushed.',
  },
  recognize: {
    fr: 'Douleur vive et soudaine à l’arrière de la cuisse pendant une accélération, un sprint ou un grand écart, parfois comme un coup de poignard, suivie d’une gêne à la marche rapide, en montant le genou ou en se penchant en avant.',
    en: 'Sudden sharp pain at the back of the thigh during acceleration, sprinting or the splits, sometimes like a stab, followed by discomfort with brisk walking, lifting the knee or bending forward.',
  },
  symptoms: [
    { fr: 'Douleur précise à l’arrière de la cuisse, sensible à la pression.', en: 'Pinpoint pain at the back of the thigh, tender to touch.' },
    { fr: 'Perte de force pour plier le genou ou tendre la hanche.', en: 'Loss of strength to bend the knee or extend the hip.' },
    { fr: 'Gêne quand on allonge la jambe vers l’avant (foulée, jambe tendue).', en: 'Discomfort when reaching the leg forward (stride, straight-leg raise).' },
    { fr: 'Parfois un bleu qui apparaît dans les jours suivants.', en: 'Sometimes bruising appearing over the following days.' },
  ],
  riskFactors: [
    { fr: 'Antécédent de lésion des ischios (premier facteur de risque).', en: 'Previous hamstring injury (the strongest risk factor).' },
    { fr: 'Sprints et accélérations, surtout en état de fatigue.', en: 'Sprinting and accelerating, especially when fatigued.' },
    { fr: 'Âge plus élevé.', en: 'Older age.' },
    { fr: 'Manque de force excentrique des ischios.', en: 'Lack of eccentric hamstring strength.' },
    { fr: 'Augmentation brutale de la vitesse ou du volume de sprint.', en: 'Sudden increase in speed or sprint volume.' },
  ],
  caveat: {
    fr: 'Cette fiche concerne la reprise, une fois la marche normale retrouvée. Pendant les premiers jours, marchez selon la tolérance et faites évaluer toute lésion importante.',
    en: 'This page covers the return phase, once walking is normal again. During the first days, walk as tolerated and have any significant injury assessed.',
  },
  phases: [
    {
      phase: 'rebuild',
      summary: {
        fr: 'On recharge le muscle et on lui redonne sa longueur de travail : isométrie, exercices d’allongement du protocole d’Askling, puis renforcement progressif.',
        en: 'Reload the muscle and restore its working length: isometrics, the Askling lengthening exercises, then progressive strengthening.',
      },
      goals: [
        { fr: 'Retrouver une amplitude et une force comparables à l’autre jambe.', en: 'Regain range and strength comparable to the other leg.' },
        { fr: 'Reprendre la course facile sans douleur.', en: 'Resume easy running without pain.' },
      ],
      exercises: [
        { exerciseId: 'hamstring-isometric-hold', priority: 1, startLevel: 1 },
        {
          exerciseId: 'askling-extender',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 3, reps: [12, 12], tempo: '2-0-2', restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
          note: {
            fr: 'Exercice 1 du protocole L d’Askling.',
            en: 'Exercise 1 of the Askling L-protocol.',
          },
        },
        {
          exerciseId: 'single-leg-deadlift',
          priority: 1,
          startLevel: 2,
          note: {
            fr: 'Le niveau 2 correspond au « diver », exercice 2 du protocole L d’Askling.',
            en: 'Level 2 is the “diver”, exercise 2 of the Askling L-protocol.',
          },
        },
        {
          exerciseId: 'askling-glider',
          priority: 1,
          startLevel: 1,
          note: {
            fr: 'Exercice 3 du protocole L d’Askling.',
            en: 'Exercise 3 of the Askling L-protocol.',
          },
        },
        { exerciseId: 'hamstring-bridge', priority: 2, startLevel: 1 },
        { exerciseId: 'leg-curl', priority: 2, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'nordic-hamstring',
          reason: {
            fr: 'Charge excentrique maximale : réservée à la phase de reprise, quand la force est presque revenue.',
            en: 'Maximal eccentric load: kept for the return-to-sport phase, once strength has nearly recovered.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Plus de douleur à la pression de la cuisse.', en: 'No more pain when pressing on the thigh.' },
        { fr: 'Extender en amplitude complète, comparable à l’autre jambe, sans appréhension.', en: 'Full-range extender, comparable to the other leg, without apprehension.' },
        { fr: 'Isométrie à 90/90 tenue avec le même effort des deux côtés, sans douleur.', en: '90/90 isometric held with the same effort on both sides, pain-free.' },
        { fr: 'Course facile de 20 à 30 minutes sans douleur pendant ni le lendemain.', en: '20 to 30 minutes of easy running without pain during or the next day.' },
      ],
      loadAdvice: {
        fr: 'Reprenez la course facile dès que la marche rapide est indolore, puis allongez la durée. Pas de sprint ni de côtes raides dans cette phase. À vélo, le pédalage souple est souvent bien toléré tôt ; évitez les sprints et les relances en danseuse.',
        en: 'Resume easy running as soon as brisk walking is pain-free, then build up the duration. No sprinting or steep hills in this phase. On the bike, easy spinning is often well tolerated early; avoid sprints and out-of-the-saddle surges.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare les ischios à la vitesse maximale : renforcement excentrique lourd, Nordic et reprise progressive des sprints.',
        en: 'Prepare the hamstrings for top speed: heavy eccentric strengthening, Nordics and a gradual return to sprinting.',
      },
      goals: [
        { fr: 'Retrouver la vitesse maximale sans douleur.', en: 'Regain top speed without pain.' },
        { fr: 'Réduire le risque de récidive.', en: 'Reduce the risk of recurrence.' },
      ],
      exercises: [
        { exerciseId: 'nordic-hamstring', priority: 1, startLevel: 1 },
        { exerciseId: 'romanian-deadlift', priority: 1, startLevel: 2 },
        { exerciseId: 'single-leg-deadlift', priority: 2, startLevel: 3 },
        { exerciseId: 'hamstring-slider-curl', priority: 2, startLevel: 2 },
        { exerciseId: 'askling-glider', priority: 3, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez la vitesse des accélérations par paliers (par exemple 60, 70, 80 puis 90 % de votre vitesse maximale) sur plusieurs séances ; le sprint doit être indolore avant le retour à la compétition. Gardez ensuite une séance de Nordic par semaine.',
        en: 'Increase stride speed in steps (for example 60, 70, 80 then 90% of top speed) over several sessions; sprinting must be pain-free before returning to competition. Then keep one Nordic session a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement audible avec impossibilité de marcher normalement.', en: 'Audible snap with inability to walk normally.' },
    { fr: 'Ecchymose étendue à l’arrière de la cuisse ou sous la fesse dans les jours suivants.', en: 'Extensive bruising at the back of the thigh or under the buttock in the following days.' },
    {
      fr: 'Douleur haute, juste sous la fesse, après une glissade ou un grand écart, avec perte de force ou creux palpable : suspicion de désinsertion du tendon, qui peut nécessiter une chirurgie dans les premières semaines.',
      en: 'High pain just under the buttock after a slip or the splits, with loss of strength or a palpable gap: suspected tendon avulsion, which may need surgery within the first weeks.',
    },
    { fr: 'Fourmillements, engourdissement ou faiblesse du pied.', en: 'Pins and needles, numbness or foot weakness.' },
    { fr: 'Mollet gonflé, chaud et douloureux, ou essoufflement inhabituel.', en: 'Swollen, warm, painful calf, or unusual breathlessness.' },
    { fr: 'Récidive, ou absence de progrès après 3 à 4 semaines de reprise progressive.', en: 'Recurrence, or no progress after 3 to 4 weeks of gradual return.' },
  ],
  complementaryAdvice: [
    {
      fr: 'La décision de reprise repose sur plusieurs critères (douleur, force, souplesse, tests sur le terrain, confiance), pas seulement sur un nombre de jours.',
      en: 'The return decision relies on several criteria (pain, strength, flexibility, field tests, confidence), not just a number of days.',
    },
    {
      fr: 'Échauffez-vous progressivement avant chaque séance de vitesse et évitez les sprints en fin de séance, quand la fatigue est installée.',
      en: 'Warm up progressively before every speed session and avoid sprints at the end of a session, when fatigue has set in.',
    },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'askling-2013',
        finding: {
          fr: 'Chez 75 footballeurs d’élite, un protocole fondé sur des exercices d’allongement a permis un retour à l’entraînement en 28 jours en moyenne, contre 51 jours avec des exercices classiques.',
          en: 'In 75 elite football players, a protocol based on lengthening exercises led to return to training in 28 days on average, versus 51 days with conventional exercises.',
        },
      },
      {
        refId: 'askling-2014',
        finding: {
          fr: 'Chez 56 sprinteurs et sauteurs d’élite, le même protocole a réduit le délai de retour (49 contre 86 jours) ; les lésions touchant le tendon proximal demandaient plus de temps.',
          en: 'In 56 elite sprinters and jumpers, the same protocol shortened return time (49 vs 86 days); injuries involving the proximal tendon took longer.',
        },
      },
      {
        refId: 'hickey-2020',
        finding: {
          fr: 'Progresser la rééducation jusqu’au seuil de douleur n’a pas accéléré la reprise, mais a mieux restauré la force et la longueur des faisceaux qu’une rééducation strictement indolore.',
          en: 'Progressing rehabilitation up to the pain threshold did not speed up return, but restored strength and fascicle length better than strictly pain-free rehabilitation.',
        },
      },
      {
        refId: 'paton-2023',
        finding: {
          fr: 'Le consensus international de Londres recommande une rééducation individualisée, d’éviter les fortes tensions au début et de progresser selon les capacités et les symptômes, le sprint devant rester indolore.',
          en: 'The London international consensus recommends individualised rehabilitation, avoiding high strain early on, and progressing according to capacity and symptoms, with sprinting kept pain-free.',
        },
      },
      {
        refId: 'van-der-horst-2017',
        finding: {
          fr: 'Des experts de 28 centres FIFA ont retenu comme critères de reprise l’absence de douleur à la palpation et aux tests de force et de souplesse, une souplesse symétrique, des tests sur le terrain et la préparation psychologique.',
          en: 'Experts from 28 FIFA centres agreed on return criteria including no pain on palpation or strength and flexibility testing, symmetrical flexibility, field tests and psychological readiness.',
        },
      },
      {
        refId: 'petersen-2011',
        finding: {
          fr: 'Le Nordic a fortement réduit les récidives de lésion des ischios chez des footballeurs (7,1 contre 45,8 pour 100 joueurs-saisons).',
          en: 'The Nordic exercise sharply reduced recurrent hamstring injuries in football players (7.1 vs 45.8 per 100 player-seasons).',
        },
      },
    ],
  },
});
