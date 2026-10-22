/**
 * Cervicalgie du cycliste (nuque tendue en position basse ou aéro).
 * Preuves indirectes : recommandations et essais sur la cervicalgie en population générale,
 * transposées au cycliste ; épidémiologie spécifique au vélo.
 */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'cyclist-neck-pain',
  region: 'trunk-upper',
  bodyAreas: ['neck'],
  sports: ['bike'],
  name: { fr: 'Douleur de nuque du cycliste', en: 'Cyclist’s neck pain' },
  aka: [
    { fr: 'Cervicalgie du cycliste', en: 'Cycling-related neck pain' },
    { fr: 'Nuque raide sur le vélo', en: 'Stiff neck on the bike' },
  ],
  description: {
    fr: 'En position penchée, le cou reste cambré pendant des heures pour garder les yeux sur la route. Les muscles qui portent la tête finissent par fatiguer et la nuque devient tendue ou douloureuse.',
    en: 'In a forward-leaning position, the neck stays arched for hours to keep the eyes on the road. The muscles holding the head up eventually tire and the neck becomes tight or sore.',
  },
  recognize: {
    fr: 'Gêne ou douleur à l’arrière du cou, parfois jusqu’au haut des épaules, qui apparaît au fil de la sortie, surtout en position basse ou aéro, et qui diminue souvent après quelques heures hors du vélo.',
    en: 'Discomfort or pain at the back of the neck, sometimes spreading to the top of the shoulders, that builds during the ride, especially in a low or aero position, and often eases a few hours off the bike.',
  },
  symptoms: [
    { fr: 'Nuque raide ou brûlante en fin de sortie.', en: 'Stiff or burning neck late in the ride.' },
    { fr: 'Difficulté à garder la tête relevée pour regarder loin devant.', en: 'Difficulty keeping the head up to look far ahead.' },
    { fr: 'Rotation de la tête moins libre pour regarder derrière soi.', en: 'Less free head rotation when looking over the shoulder.' },
    { fr: 'Parfois un mal de tête qui part de la nuque.', en: 'Sometimes a headache that starts at the back of the neck.' },
  ],
  riskFactors: [
    { fr: 'Position très basse, cintre trop bas ou trop loin, position aéro prolongée.', en: 'Very low position, handlebar too low or too far, prolonged aero position.' },
    { fr: 'Augmentation rapide de la durée des sorties.', en: 'Rapid increase in ride duration.' },
    { fr: 'Manque d’endurance des muscles du cou et du haut du dos.', en: 'Poor endurance of the neck and upper-back muscles.' },
    { fr: 'Plus fréquent chez les cyclistes femmes dans les enquêtes.', en: 'More common among female cyclists in surveys.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme la nuque en douceur : contrôle des fléchisseurs profonds, isométries légères et mobilité du haut du dos, avec des sorties raccourcies.',
        en: 'Settle the neck gently: deep neck flexor control, light isometrics and upper-back mobility, with shorter rides.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité de la nuque.', en: 'Reduce neck sensitivity.' },
        { fr: 'Retrouver un cou mobile et un bon contrôle de la tête.', en: 'Regain a mobile neck and good head control.' },
      ],
      exercises: [
        { exerciseId: 'chin-tuck', priority: 1, startLevel: 1 },
        { exerciseId: 'neck-isometric', priority: 1, startLevel: 1 },
        { exerciseId: 'thoracic-extension', priority: 2, startLevel: 1 },
        {
          exerciseId: 'prone-ytw',
          priority: 3,
          startLevel: 1,
          dosage: { sets: 2, reps: [8, 10], tempo: '2-2-2', restSec: 45, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
      ],
      nextPhaseCriteria: [
        { fr: '10 rentrés de menton de 10 secondes sans douleur ni crispation de l’avant du cou.', en: '10 chin tucks of 10 seconds without pain or front-of-neck tension.' },
        { fr: 'Vous pouvez regarder par-dessus chaque épaule sans que la douleur augmente.', en: 'You can look over each shoulder without the pain increasing.' },
        { fr: 'Une sortie d’une heure ne réveille pas la douleur le lendemain.', en: 'A one-hour ride does not bring the pain back the next day.' },
      ],
      loadAdvice: {
        fr: 'Raccourcissez les sorties, utilisez davantage le haut du cintre, et faites une pause toutes les 20 à 30 minutes pour bouger doucement la tête et les épaules.',
        en: 'Shorten your rides, use the tops of the bar more, and take a break every 20 to 30 minutes to gently move the head and shoulders.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On reconstruit l’endurance du cou et des muscles entre les omoplates, dans des positions proches de celle du vélo.',
        en: 'Rebuild endurance of the neck and of the muscles between the shoulder blades, in positions close to riding.',
      },
      goals: [
        { fr: 'Tenir la tête relevée longtemps sans fatigue.', en: 'Hold the head up for long periods without fatigue.' },
        { fr: 'Renforcer les trapèzes moyen et inférieur.', en: 'Strengthen the middle and lower trapezius.' },
      ],
      exercises: [
        { exerciseId: 'chin-tuck', priority: 1, startLevel: 3 },
        { exerciseId: 'quadruped-neck-extension', priority: 1, startLevel: 1 },
        { exerciseId: 'neck-isometric', priority: 2, startLevel: 2 },
        { exerciseId: 'prone-ytw', priority: 2, startLevel: 2 },
        { exerciseId: 'row', priority: 2, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Tête décollée menton rentré tenue 30 secondes, 3 fois.', en: 'Head lifted with the chin tucked held for 30 seconds, 3 times.' },
        { fr: '3 × 10 extensions de cou à quatre pattes sans douleur.', en: '3 × 10 quadruped neck extensions without pain.' },
        { fr: 'Vos sorties habituelles ne réveillent plus la douleur.', en: 'Your usual rides no longer bring the pain back.' },
      ],
      loadAdvice: {
        fr: 'Rallongez les sorties par paliers d’environ 15 à 30 minutes par semaine et réintroduisez progressivement la position basse.',
        en: 'Lengthen rides in steps of about 15 to 30 minutes a week and gradually reintroduce the low position.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On renforce le cou et le haut du dos pour tolérer les longues sorties et la position aéro, et on entretient ce travail.',
        en: 'Strengthen the neck and upper back to tolerate long rides and the aero position, and keep the work going.',
      },
      goals: [
        { fr: 'Tolérer la durée et la position habituelles.', en: 'Tolerate your usual duration and position.' },
        { fr: 'Garder deux séances d’entretien par semaine.', en: 'Keep two maintenance sessions a week.' },
      ],
      exercises: [
        { exerciseId: 'neck-isometric', priority: 1, startLevel: 3 },
        { exerciseId: 'quadruped-neck-extension', priority: 1, startLevel: 3 },
        { exerciseId: 'row', priority: 2, startLevel: 2 },
        { exerciseId: 'band-pull-apart', priority: 2, startLevel: 2 },
        {
          exerciseId: 'front-plank',
          priority: 3,
          note: {
            fr: 'Un tronc solide aide à garder le buste stable sans s’appuyer de tout son poids sur les bras.',
            en: 'A strong trunk helps keep the upper body stable without leaning your full weight on the arms.',
          },
        },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez le temps en position aéro par petites périodes et gardez le renforcement du cou deux fois par semaine.',
        en: 'Increase time in the aero position in short blocks and keep neck strengthening twice a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur apparue après une chute, un choc ou un accident.', en: 'Pain that started after a crash, a blow or an accident.' },
    { fr: 'Fourmillements, engourdissement, faiblesse ou maladresse dans un bras ou une main.', en: 'Pins and needles, numbness, weakness or clumsiness in an arm or hand.' },
    { fr: 'Vertiges, troubles de la vue, difficulté à parler ou à avaler.', en: 'Dizziness, visual disturbance, difficulty speaking or swallowing.' },
    { fr: 'Mal de tête brutal, inhabituel ou qui s’aggrave.', en: 'Sudden, unusual or worsening headache.' },
    { fr: 'Fièvre, douleur nocturne qui ne se calme pas, perte de poids inexpliquée, troubles de l’équilibre ou de la marche.', en: 'Fever, night pain that does not settle, unexplained weight loss, balance or walking problems.' },
    { fr: 'Pas d’amélioration après 6 semaines malgré les exercices et les réglages.', en: 'No improvement after 6 weeks despite the exercises and bike adjustments.' },
  ],
  complementaryAdvice: [
    { fr: 'Faites vérifier votre position (étude posturale) : un cintre un peu plus haut ou plus proche, ou une potence plus courte, réduit la cambrure du cou.', en: 'Have your position checked (bike fit): a slightly higher or closer handlebar, or a shorter stem, reduces neck extension.' },
    { fr: 'Gardez les coudes légèrement fléchis et les épaules relâchées, loin des oreilles.', en: 'Keep the elbows slightly bent and the shoulders relaxed, away from the ears.' },
    { fr: 'Changez souvent de prise et de position, et bougez la tête régulièrement pendant la sortie.', en: 'Change hand position and posture often, and move your head regularly during the ride.' },
    { fr: 'Vérifiez que casque et lunettes ne vous obligent pas à relever la tête davantage pour voir.', en: 'Check that your helmet and glasses do not force you to tilt your head up further to see.' },
    { fr: 'Introduisez la position aéro progressivement, par blocs courts.', en: 'Introduce the aero position gradually, in short blocks.' },
  ],
  evidence: {
    level: 'moderate',
    citations: [
      {
        refId: 'blanpied-2017',
        finding: {
          fr: 'La recommandation JOSPT 2017 sur la cervicalgie préconise des exercices d’endurance du cou et de la ceinture scapulaire, puis un programme mixte cervical et scapulaire (renforcement, endurance, contrôle) quand la douleur dure ; elle ne porte pas spécifiquement sur les cyclistes.',
          en: 'The 2017 JOSPT neck pain guideline recommends neck and shoulder-girdle endurance exercise, then a mixed neck and shoulder-blade programme (strength, endurance, control) when pain persists; it is not specific to cyclists.',
        },
      },
      {
        refId: 'gross-2015',
        finding: {
          fr: 'La revue Cochrane (27 essais) trouve des preuves de qualité modérée en faveur du renforcement du cou, des omoplates et des membres supérieurs dans la cervicalgie chronique, et aucun bénéfice attendu des étirements seuls.',
          en: 'The Cochrane review (27 trials) finds moderate-quality evidence for neck, shoulder-blade and upper-limb strengthening in chronic neck pain, and no expected benefit from stretching alone.',
        },
      },
      {
        refId: 'ylinen-2003',
        finding: {
          fr: 'Chez 180 femmes avec cervicalgie chronique, un an de renforcement ou d’endurance des muscles du cou a réduit la douleur et l’incapacité par rapport au groupe contrôle.',
          en: 'In 180 women with chronic neck pain, a year of neck strength or endurance training reduced pain and disability compared with controls.',
        },
      },
      {
        refId: 'jull-2002',
        finding: {
          fr: 'Chez 200 personnes avec céphalée d’origine cervicale, des exercices à faible charge des fléchisseurs profonds du cou ont réduit les maux de tête, avec un effet maintenu à un an.',
          en: 'In 200 people with cervicogenic headache, low-load deep neck flexor exercises reduced headaches, with effects maintained at one year.',
        },
      },
      {
        refId: 'wilber-1995',
        finding: {
          fr: 'Dans une enquête auprès de 518 cyclistes de loisir, le cou était le site de plainte de surmenage le plus fréquent (48,8 %), et plus souvent chez les femmes.',
          en: 'In a survey of 518 recreational cyclists, the neck was the most common site of overuse complaints (48.8%), more often in women.',
        },
      },
      {
        refId: 'scoz-2021',
        finding: {
          fr: 'Chez 160 vététistes, la douleur de nuque avait diminué 30 jours après un réglage de position, dans une étude sans groupe contrôle.',
          en: 'In 160 mountain bikers, neck pain had decreased 30 days after a bike fit, in a study without a control group.',
        },
      },
    ],
  },
});
