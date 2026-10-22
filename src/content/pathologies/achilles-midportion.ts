/**
 * Tendinopathie d'Achille, portion moyenne.
 * Ce fichier sert d'exemple de référence pour le skill add-pathology.
 */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'achilles-midportion',
  region: 'foot-ankle',
  bodyAreas: ['achilles', 'calf'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie d’Achille (portion moyenne)',
    en: 'Midportion Achilles tendinopathy',
  },
  aka: [{ fr: 'Tendinite d’Achille', en: 'Achilles tendinitis' }],
  description: {
    fr: 'Le tendon d’Achille réagit à une charge trop importante ou trop rapide pour sa capacité du moment. Ce n’est pas une inflammation à mettre au repos : le tendon se renforce avec une charge progressive.',
    en: 'The Achilles tendon reacts to load that is too high or increased too quickly for its current capacity. It is not an inflammation that needs rest: the tendon gets stronger with progressive loading.',
  },
  recognize: {
    fr: 'Douleur localisée 2 à 6 cm au-dessus du talon, sur le tendon lui-même, souvent raide le matin ou au début de la course, et qui peut s’estomper en s’échauffant.',
    en: 'Pain localised 2 to 6 cm above the heel, on the tendon itself, often stiff in the morning or at the start of a run, and that may ease once warmed up.',
  },
  symptoms: [
    { fr: 'Raideur matinale du tendon lors des premiers pas.', en: 'Morning tendon stiffness during the first steps.' },
    { fr: 'Douleur au début de l’effort qui diminue puis revient après.', en: 'Pain at the start of activity that eases, then returns afterwards.' },
    { fr: 'Tendon parfois épaissi et sensible à la pression.', en: 'Tendon sometimes thickened and tender to touch.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume, des côtes ou de la vitesse.', en: 'Rapid increase in volume, hills or speed.' },
    { fr: 'Manque de force et d’endurance des mollets.', en: 'Lack of calf strength and endurance.' },
    { fr: 'Changement brusque de chaussures (drop plus faible).', en: 'Sudden change of shoes (lower drop).' },
    { fr: 'Âge (plus fréquent après 35 ans).', en: 'Age (more common after 35).' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme le tendon sans l’arrêter : charge isométrique quotidienne et activité ajustée selon la douleur.',
        en: 'Settle the tendon without stopping it: daily isometric loading and activity adjusted to pain.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité du tendon.', en: 'Reduce tendon sensitivity.' },
        { fr: 'Maintenir une charge tolérée tous les jours.', en: 'Maintain a tolerated load every day.' },
      ],
      exercises: [
        { exerciseId: 'calf-isometric-hold', priority: 1, startLevel: 1 },
        {
          exerciseId: 'calf-raise-straight-knee',
          priority: 2,
          startLevel: 1,
          dosage: { sets: 3, reps: [10, 15], tempo: '3-0-3', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'seated-soleus-isometric', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Les rebonds rapides chargent fortement un tendon encore irritable.', en: 'Fast bouncing heavily loads a still-irritable tendon.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Les rebonds rapides chargent fortement un tendon encore irritable.', en: 'Fast bouncing heavily loads a still-irritable tendon.' } },
        { exerciseId: 'line-hops', reason: { fr: 'Sauts à reporter à la phase de reprise.', en: 'Hops are postponed to the return phase.' } },
        { exerciseId: 'calf-raise-explosive', reason: { fr: 'La charge rapide vient après la reconstruction de la force.', en: 'Fast loading comes after strength has been rebuilt.' } },
        { exerciseId: 'calf-wall-stretch', reason: { fr: 'Les étirements appuyés peuvent irriter le tendon ; la mise en charge est prioritaire.', en: 'Strong stretches can irritate the tendon; loading comes first.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'La raideur matinale diminue d’une semaine à l’autre.', en: 'Morning stiffness decreases week after week.' },
        { fr: '15 montées sur pointes sur une jambe sont possibles sans douleur croissante.', en: '15 single-leg calf raises are possible without increasing pain.' },
      ],
      loadAdvice: {
        fr: 'La course peut souvent continuer si la gêne reste modérée et revient à son niveau habituel le lendemain matin ; réduisez côtes et vitesse.',
        en: 'Running can often continue if discomfort stays moderate and settles by the next morning; cut back on hills and speed.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit la force : montées sur pointes lourdes et lentes, genou tendu et genou fléchi.',
        en: 'Rebuild strength: heavy, slow calf raises with straight and bent knee.',
      },
      goals: [
        { fr: 'Retrouver une force du mollet symétrique.', en: 'Regain symmetrical calf strength.' },
        { fr: 'Augmenter progressivement la charge, au moins 3 fois par semaine.', en: 'Progressively increase load, at least 3 times a week.' },
      ],
      exercises: [
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 2 },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 2 },
        {
          exerciseId: 'eccentric-heel-drop',
          priority: 3,
          startLevel: 2,
          note: {
            fr: 'Alternative possible aux montées lourdes et lentes si vous la préférez.',
            en: 'Possible alternative to heavy slow calf raises if you prefer it.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: '25 montées sur pointes sur une jambe, comparables entre les deux côtés.', en: '25 single-leg calf raises, comparable between sides.' },
        { fr: 'Marche rapide et course facile sans douleur le lendemain.', en: 'Brisk walking and easy running without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On prépare le tendon à la vitesse et aux impacts, en gardant le renforcement lourd.',
        en: 'Prepare the tendon for speed and impact while keeping heavy strengthening.',
      },
      goals: [
        { fr: 'Retrouver la capacité élastique du tendon.', en: 'Restore the tendon’s elastic capacity.' },
        { fr: 'Reprendre le volume et l’intensité de course progressivement.', en: 'Gradually resume running volume and intensity.' },
      ],
      exercises: [
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 4 },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 3 },
        {
          exerciseId: 'pogo-hops',
          priority: 2,
          startLevel: 1,
          note: {
            fr: 'Commencez par de petits rebonds sur deux pieds ; progressez seulement si le tendon n’est pas plus raide le lendemain matin.',
            en: 'Start with small two-foot bounces; progress only if the tendon is no stiffer the next morning.',
          },
        },
        { exerciseId: 'hop-stabilization', priority: 2, startLevel: 1 },
        { exerciseId: 'calf-raise-explosive', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Continuez le renforcement deux fois par semaine pendant plusieurs mois après la disparition de la douleur.',
        en: 'Keep strengthening twice a week for several months after the pain has gone.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement soudain à l’arrière de la cheville ou impossibilité de monter sur la pointe du pied.', en: 'Sudden snap at the back of the ankle or inability to rise onto the toes.' },
    { fr: 'Tendon rouge, chaud et gonflé, ou fièvre.', en: 'Red, hot, swollen tendon, or fever.' },
    { fr: 'Douleur la nuit ou au repos complet.', en: 'Pain at night or at complete rest.' },
    { fr: 'Douleur apparue après la prise d’antibiotiques de la famille des fluoroquinolones.', en: 'Pain that started after taking fluoroquinolone antibiotics.' },
    { fr: 'Pas d’amélioration après 6 à 12 semaines de renforcement bien conduit.', en: 'No improvement after 6 to 12 weeks of well-conducted strengthening.' },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'chimenti-2024',
        finding: {
          fr: 'La recommandation JOSPT 2024 fait de l’exercice de mise en charge, aussi lourd que toléré et au moins 3 fois par semaine, le traitement de première intention, et déconseille le repos complet.',
          en: 'The 2024 JOSPT guideline makes loading exercise, as heavy as tolerated and at least 3 times a week, the first-line treatment, and advises against complete rest.',
        },
      },
      {
        refId: 'silbernagel-2007',
        finding: {
          fr: 'Continuer la course et les sauts en surveillant la douleur pendant la rééducation n’a pas freiné la guérison par rapport à un arrêt de 6 semaines.',
          en: 'Continuing running and jumping with pain monitoring during rehabilitation did not slow recovery compared with 6 weeks of rest from those activities.',
        },
      },
      {
        refId: 'beyer-2015',
        finding: {
          fr: 'Charge lourde et lente ou excentrique : des résultats équivalents et durables à un an.',
          en: 'Heavy slow resistance or eccentric training: equivalent, lasting results at one year.',
        },
      },
    ],
  },
});
