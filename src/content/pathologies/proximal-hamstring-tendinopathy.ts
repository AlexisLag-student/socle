/** Tendinopathie proximale des ischio-jambiers (zone cuisse). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'proximal-hamstring-tendinopathy',
  region: 'hip-thigh',
  bodyAreas: ['ischial', 'buttock', 'thigh-posterior'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie proximale des ischio-jambiers',
    en: 'Proximal hamstring tendinopathy',
  },
  aka: [
    { fr: 'Tendinite haute des ischios', en: 'High hamstring tendinopathy' },
    { fr: 'Douleur de l’ischion', en: 'Sitting-bone pain' },
  ],
  description: {
    fr: 'Le tendon commun des ischio-jambiers, attaché à l’os de la fesse (ischion), devient douloureux quand la charge dépasse sa capacité du moment. Il est surtout irrité quand il est à la fois tendu et comprimé contre l’os, hanche très fléchie.',
    en: 'The common hamstring tendon, attached to the sitting bone (ischial tuberosity), becomes painful when load exceeds its current capacity. It is especially irritated when it is both stretched and compressed against the bone, with the hip deeply flexed.',
  },
  recognize: {
    fr: 'Douleur profonde et localisée sous la fesse, à l’os sur lequel on s’assoit, souvent réveillée par la position assise prolongée, les côtes, les accélérations ou la selle du vélo, et qui s’installe progressivement plutôt qu’après un traumatisme.',
    en: 'Deep, localised pain under the buttock, at the bone you sit on, often triggered by prolonged sitting, hills, acceleration or the bike saddle, and that builds up gradually rather than after an injury.',
  },
  symptoms: [
    { fr: 'Douleur en position assise, surtout sur une surface dure ou une selle.', en: 'Pain when sitting, especially on a hard surface or a saddle.' },
    { fr: 'Gêne en course rapide, en côte ou en allongeant la foulée.', en: 'Discomfort when running fast, uphill or lengthening the stride.' },
    { fr: 'Douleur quand on se penche en avant jambes tendues (lacer ses chaussures, ramasser un objet).', en: 'Pain when bending forward with straight legs (tying shoes, picking something up).' },
    { fr: 'Raideur sous la fesse au démarrage, qui peut s’atténuer en s’échauffant.', en: 'Stiffness under the buttock at the start, which may ease once warmed up.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du travail de vitesse, des côtes ou du volume.', en: 'Rapid increase in speed work, hills or volume.' },
    { fr: 'Étirements appuyés des ischios, hanche très fléchie.', en: 'Forceful hamstring stretching with the hip deeply flexed.' },
    { fr: 'Longues périodes assis, au travail comme sur le vélo.', en: 'Long periods of sitting, at work as on the bike.' },
    { fr: 'Manque de force des ischio-jambiers et des fessiers.', en: 'Lack of hamstring and glute strength.' },
  ],
  caveat: {
    fr: 'Cette douleur évolue souvent lentement : il faut fréquemment trois mois de renforcement régulier pour un net progrès. D’autres causes (sciatique, articulation sacro-iliaque, bourse) peuvent donner une douleur au même endroit.',
    en: 'This pain often settles slowly: three months of regular strengthening are frequently needed for clear progress. Other causes (sciatica, sacroiliac joint, bursa) can produce pain in the same place.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme le tendon en le chargeant sans le comprimer : isométrie hanche peu fléchie, tous les jours, et réduction des positions assises prolongées.',
        en: 'Settle the tendon by loading it without compressing it: isometrics with little hip flexion, daily, and less prolonged sitting.',
      },
      goals: [
        { fr: 'Diminuer la douleur en position assise.', en: 'Reduce pain when sitting.' },
        { fr: 'Maintenir une charge tolérée des ischios chaque jour.', en: 'Maintain a tolerated hamstring load every day.' },
      ],
      exercises: [
        {
          exerciseId: 'hamstring-isometric-hold',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
          note: {
            fr: 'Restez aux niveaux 1 et 2 (hanche peu fléchie) dans cette phase.',
            en: 'Stay at levels 1 and 2 (little hip flexion) in this phase.',
          },
        },
        { exerciseId: 'hamstring-bridge', priority: 1, startLevel: 1 },
        {
          exerciseId: 'leg-curl',
          priority: 2,
          startLevel: 1,
          note: {
            fr: 'Plutôt allongé sur le ventre ou debout qu’assis au début : la hanche reste tendue.',
            en: 'Lying face down or standing rather than seated at first: the hip stays extended.',
          },
        },
        { exerciseId: 'glute-bridge', priority: 3, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'askling-extender',
          reason: {
            fr: 'Allonger les ischios hanche fléchie comprime le tendon contre l’os : à éviter tant qu’il est sensible.',
            en: 'Lengthening the hamstrings with the hip flexed compresses the tendon against the bone: avoid while it is sensitive.',
          },
        },
        {
          exerciseId: 'romanian-deadlift',
          reason: {
            fr: 'La flexion de hanche sous charge irrite souvent le tendon dans cette phase.',
            en: 'Loaded hip flexion often irritates the tendon in this phase.',
          },
        },
        {
          exerciseId: 'single-leg-deadlift',
          reason: {
            fr: 'Même raison : flexion de hanche importante sur une jambe.',
            en: 'Same reason: deep hip flexion on one leg.',
          },
        },
        {
          exerciseId: 'nordic-hamstring',
          reason: {
            fr: 'Charge excentrique très élevée, rarement tolérée quand le tendon est irritable.',
            en: 'Very high eccentric load, rarely tolerated while the tendon is irritable.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Rester assis 30 minutes sans augmentation durable de la douleur.', en: 'Sitting for 30 minutes without a lasting rise in pain.' },
        { fr: 'Pont ischios sur une jambe tenu 30 s de chaque côté, sans douleur accrue le lendemain.', en: 'Single-leg hamstring bridge held 30 s per side, without more pain the next day.' },
        { fr: 'Douleur au démarrage stable ou en baisse d’une semaine à l’autre.', en: 'Start-up pain stable or decreasing week to week.' },
      ],
      loadAdvice: {
        fr: 'La course sur le plat à allure facile est souvent possible si la gêne reste modérée et se calme le lendemain ; supprimez temporairement côtes, fractionné et foulées longues. À vélo, réduisez la durée des sorties et évitez les positions très basses et les longs efforts assis en force.',
        en: 'Easy running on the flat is often possible if discomfort stays moderate and settles by the next day; temporarily drop hills, intervals and long strides. On the bike, shorten rides and avoid very low positions and long seated high-torque efforts.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit la force en augmentant peu à peu la flexion de hanche sous charge : pont surélevé, leg curl, puis soulevé de terre en amplitude progressive.',
        en: 'Rebuild strength by gradually increasing loaded hip flexion: raised bridge, leg curls, then deadlifts with progressive range.',
      },
      goals: [
        { fr: 'Retrouver une force des ischios symétrique.', en: 'Regain symmetrical hamstring strength.' },
        { fr: 'Tolérer à nouveau la charge hanche fléchie.', en: 'Tolerate loading with the hip flexed again.' },
      ],
      exercises: [
        { exerciseId: 'hamstring-bridge', priority: 1, startLevel: 3 },
        { exerciseId: 'leg-curl', priority: 1, startLevel: 2 },
        {
          exerciseId: 'romanian-deadlift',
          priority: 2,
          startLevel: 1,
          note: {
            fr: 'Descendez d’abord jusqu’aux genoux, puis plus bas au fil des semaines selon la tolérance.',
            en: 'Lower to the knees at first, then further over the weeks as tolerated.',
          },
        },
        { exerciseId: 'single-leg-deadlift', priority: 2, startLevel: 1 },
        { exerciseId: 'hamstring-isometric-hold', priority: 3, startLevel: 3 },
      ],
      avoid: [
        {
          exerciseId: 'askling-extender',
          reason: {
            fr: 'Les mises en tension hanche fléchie restent à éviter tant que la position assise est gênante.',
            en: 'Stretching with the hip flexed should still be avoided while sitting is uncomfortable.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Soulevé de terre roumain chargé (3 × 8) sans douleur accrue le lendemain.', en: 'Loaded Romanian deadlift (3 × 8) without more pain the next day.' },
        { fr: 'Pont ischios surélevé : 3 × 15 par jambe, symétriques.', en: 'Raised hamstring bridge: 3 × 15 per leg, symmetrical.' },
        { fr: '30 minutes de course facile ou 1 h 30 de vélo sans réveil de la douleur le lendemain.', en: '30 minutes of easy running or 90 minutes of cycling without a flare the next day.' },
      ],
      loadAdvice: {
        fr: 'Réintroduisez d’abord les côtes douces et les accélérations progressives, une seule nouveauté par semaine.',
        en: 'Reintroduce gentle hills and progressive strides first, one new element per week.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare le tendon à la vitesse et aux grandes amplitudes, en gardant le renforcement lourd.',
        en: 'Prepare the tendon for speed and large ranges while keeping heavy strengthening.',
      },
      goals: [
        { fr: 'Reprendre le fractionné, les côtes et les efforts intenses à vélo.', en: 'Resume intervals, hills and hard efforts on the bike.' },
        { fr: 'Entretenir la force pour éviter la récidive.', en: 'Maintain strength to prevent recurrence.' },
      ],
      exercises: [
        { exerciseId: 'romanian-deadlift', priority: 1, startLevel: 3 },
        { exerciseId: 'single-leg-deadlift', priority: 1, startLevel: 3 },
        { exerciseId: 'nordic-hamstring', priority: 2, startLevel: 1 },
        { exerciseId: 'hamstring-slider-curl', priority: 2, startLevel: 2 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez la vitesse avant le volume de fractionné. Continuez le renforcement deux fois par semaine pendant plusieurs mois après la disparition de la douleur.',
        en: 'Increase speed before interval volume. Keep strengthening twice a week for several months after the pain has gone.',
      },
    },
  ],
  whenToConsult: [
    {
      fr: 'Douleur brutale sous la fesse avec claquement, souvent lors d’une glissade ou d’un grand écart, puis difficulté à marcher : une désinsertion du tendon (avulsion) doit être recherchée rapidement.',
      en: 'Sudden pain under the buttock with a snap, often during a slip or the splits, then difficulty walking: a tendon avulsion must be checked promptly.',
    },
    { fr: 'Ecchymose importante sous la fesse ou à l’arrière de la cuisse.', en: 'Extensive bruising under the buttock or at the back of the thigh.' },
    {
      fr: 'Douleur qui descend sous le genou, fourmillements, engourdissement ou faiblesse du pied.',
      en: 'Pain spreading below the knee, pins and needles, numbness or foot weakness.',
    },
    {
      fr: 'Engourdissement de la zone du périnée (zone de la selle) ou troubles urinaires : consultez en urgence.',
      en: 'Numbness around the perineum (saddle area) or bladder problems: seek urgent care.',
    },
    { fr: 'Douleur la nuit, au repos complet, fièvre ou perte de poids inexpliquée.', en: 'Pain at night or at complete rest, fever or unexplained weight loss.' },
    { fr: 'Pas d’amélioration après 3 mois de renforcement bien conduit.', en: 'No improvement after 3 months of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    {
      fr: 'Assis : préférez une assise rembourrée, ou un coussin placé sous les cuisses qui laisse l’os de la fesse dans le vide ; évitez les sièges bas et les jambes croisées, et levez-vous toutes les 20 à 30 minutes.',
      en: 'Sitting: choose a padded seat, or a cushion under the thighs that leaves the sitting bone unloaded; avoid low seats and crossed legs, and stand up every 20 to 30 minutes.',
    },
    {
      fr: 'Sur le vélo : une selle trop haute ou trop reculée met les ischios en tension, et une position très basse augmente la flexion de hanche. Vérifiez la hauteur et le recul de selle, relevez un peu le poste de pilotage pendant la phase douloureuse, et choisissez une selle adaptée à l’écartement de vos ischions. Une étude posturale peut aider.',
      en: 'On the bike: a saddle that is too high or too far back tensions the hamstrings, and a very low position increases hip flexion. Check saddle height and setback, raise the front end slightly during the painful phase, and choose a saddle suited to your sit-bone width. A bike fit can help.',
    },
    {
      fr: 'Évitez les étirements appuyés des ischios jambes tendues : ils compriment le tendon et entretiennent souvent la douleur.',
      en: 'Avoid forceful straight-leg hamstring stretches: they compress the tendon and often keep the pain going.',
    },
    {
      fr: 'En course, raccourcissez un peu la foulée et évitez temporairement les côtes raides et le sprint.',
      en: 'When running, shorten your stride slightly and temporarily avoid steep hills and sprinting.',
    },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'goom-2016',
        finding: {
          fr: 'Cette revue clinique de référence souligne l’absence d’essai randomisé sur la rééducation et propose d’appliquer les principes de mise en charge établis pour les tendinopathies d’Achille et rotulienne.',
          en: 'This key clinical review highlights the lack of randomised trials on rehabilitation and proposes applying loading principles established for Achilles and patellar tendinopathy.',
        },
      },
      {
        refId: 'nasser-2021',
        finding: {
          fr: 'Revue systématique de 12 études : les preuves sont insuffisantes pour recommander un traitement plutôt qu’un autre, et les auteurs conseillent de commencer par les approches efficaces dans les autres tendinopathies.',
          en: 'Systematic review of 12 studies: evidence is insufficient to recommend one treatment over another, and the authors advise starting with approaches that work in other tendinopathies.',
        },
      },
      {
        refId: 'rich-2025',
        finding: {
          fr: 'Chez 100 patients, 6 séances de kinésithérapie individualisée ont donné des résultats comparables aux ondes de choc sur la fonction et l’évolution globale jusqu’à un an.',
          en: 'In 100 patients, 6 sessions of individualised physiotherapy gave results comparable to shockwave therapy on function and global change up to one year.',
        },
      },
      {
        refId: 'rich-2026',
        finding: {
          fr: 'Une séance d’isométrie et une séance d’exercice dynamique ont eu des effets similaires sur la douleur et la gêne assise : le type d’exercice peut se choisir selon la tolérance.',
          en: 'One isometric and one dynamic exercise session had similar effects on pain and sitting symptoms: exercise type can be chosen according to tolerance.',
        },
      },
    ],
  },
});
