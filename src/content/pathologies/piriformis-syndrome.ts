/** Syndrome du piriforme / syndrome fessier profond — diagnostic débattu (skill add-pathology). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'piriformis-syndrome',
  region: 'hip-thigh',
  bodyAreas: ['buttock'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Syndrome du piriforme (douleur profonde de la fesse)',
    en: 'Piriformis syndrome (deep buttock pain)',
  },
  aka: [
    { fr: 'Syndrome fessier profond', en: 'Deep gluteal syndrome' },
    { fr: 'Pseudo-sciatique', en: 'Pseudo-sciatica' },
  ],
  description: {
    fr: 'Le nerf sciatique passe sous le muscle piriforme, au fond de la fesse. Une irritation de ce nerf dans la fesse, sans origine lombaire, peut donner une douleur profonde qui descend parfois à l’arrière de la cuisse.',
    en: 'The sciatic nerve runs under the piriformis muscle, deep in the buttock. Irritation of the nerve in the buttock, without a lower-back cause, can produce deep pain that sometimes spreads down the back of the thigh.',
  },
  recognize: {
    fr: 'Douleur profonde au milieu de la fesse, souvent aggravée en position assise prolongée (voiture, selle de vélo) et sensible à la pression au fond de la fesse, parfois avec une douleur qui descend à l’arrière de la cuisse.',
    en: 'Deep pain in the middle of the buttock, often worse with prolonged sitting (car, bike saddle) and tender to pressure deep in the buttock, sometimes with pain spreading down the back of the thigh.',
  },
  symptoms: [
    { fr: 'Douleur profonde de la fesse, d’un seul côté.', en: 'Deep buttock pain on one side.' },
    { fr: 'Douleur aggravée en restant assis longtemps.', en: 'Pain worse with prolonged sitting.' },
    { fr: 'Sensibilité à la pression au fond de la fesse.', en: 'Tenderness to pressure deep in the buttock.' },
    { fr: 'Parfois une douleur ou une gêne qui descend à l’arrière de la cuisse.', en: 'Sometimes pain or discomfort spreading down the back of the thigh.' },
  ],
  riskFactors: [
    { fr: 'Positions assises prolongées, sur une surface dure ou une selle mal réglée.', en: 'Prolonged sitting on a hard surface or a poorly fitted saddle.' },
    { fr: 'Chute ou choc direct sur la fesse.', en: 'Fall or direct blow to the buttock.' },
    { fr: 'Augmentation rapide du volume, des côtes ou de la vitesse.', en: 'Rapid increase in volume, hills or speed.' },
  ],
  caveat: {
    fr: 'Ce diagnostic est débattu : il n’existe pas de test fiable pour le confirmer, et les spécialistes parlent de plus en plus de « syndrome fessier profond », qui regroupe plusieurs causes d’irritation du nerf sciatique dans la fesse. Une douleur de fesse vient aussi souvent du bas du dos, de l’articulation sacro-iliaque ou du tendon des ischio-jambiers : faites-la évaluer si elle persiste ou descend dans la jambe.',
    en: 'This diagnosis is debated: there is no reliable test to confirm it, and specialists increasingly speak of "deep gluteal syndrome", which groups several causes of sciatic nerve irritation in the buttock. Buttock pain also often comes from the lower back, the sacroiliac joint or the hamstring tendon: have it assessed if it persists or spreads down the leg.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On réduit ce qui comprime la fesse (position assise prolongée) et on fait travailler doucement les rotateurs et les fessiers, sans réveiller les symptômes dans la jambe.',
        en: 'Reduce what compresses the buttock (prolonged sitting) and gently work the rotators and glutes, without provoking leg symptoms.',
      },
      goals: [
        { fr: 'Diminuer la douleur en position assise.', en: 'Reduce pain when sitting.' },
        { fr: 'Garder la hanche active sans provoquer de fourmillements.', en: 'Keep the hip active without provoking pins and needles.' },
      ],
      exercises: [
        { exerciseId: 'clamshell', priority: 1, startLevel: 1 },
        {
          exerciseId: 'glute-bridge',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-2', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'seated-hip-external-rotation', priority: 2, startLevel: 1 },
        {
          exerciseId: 'hip-rotation-mobility',
          priority: 3,
          startLevel: 1,
          note: {
            fr: 'Étirement doux et court ; arrêtez s’il déclenche des fourmillements ou une douleur dans la jambe.',
            en: 'Gentle, short stretch; stop if it triggers pins and needles or pain down the leg.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Rester assis 30 minutes sans douleur croissante.', en: 'Sit for 30 minutes without increasing pain.' },
        { fr: 'Plus de symptômes dans la jambe pendant ou après les exercices.', en: 'No more leg symptoms during or after the exercises.' },
      ],
      loadAdvice: {
        fr: 'La course facile reste souvent possible si elle n’aggrave pas la douleur le lendemain. Au vélo, raccourcissez les sorties et levez-vous de la selle régulièrement.',
        en: 'Easy running is often still possible if it does not worsen pain the next day. On the bike, shorten rides and get out of the saddle regularly.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement les rotateurs et les fessiers, en appui et contre résistance.',
        en: 'Progressively strengthen the rotators and glutes, weight-bearing and against resistance.',
      },
      goals: [
        { fr: 'Retrouver la force des fessiers et des rotateurs de hanche.', en: 'Regain glute and hip rotator strength.' },
        { fr: 'Contrôler le bassin en appui sur une jambe.', en: 'Control the pelvis in single-leg stance.' },
      ],
      exercises: [
        { exerciseId: 'glute-bridge', priority: 1, startLevel: 2 },
        { exerciseId: 'seated-hip-external-rotation', priority: 1, startLevel: 2 },
        { exerciseId: 'lateral-band-walk', priority: 2, startLevel: 2 },
        { exerciseId: 'side-lying-hip-abduction', priority: 2, startLevel: 2 },
        { exerciseId: 'hip-hike', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Pont sur une jambe : 3 × 12 de chaque côté, sans douleur de fesse.', en: 'Single-leg bridge: 3 × 12 each side, without buttock pain.' },
        { fr: 'Course habituelle ou sortie vélo d’une heure sans douleur le lendemain.', en: 'Usual run or a one-hour ride without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On renforce sur une jambe et plus lourd pour reprendre le volume et l’intensité.',
        en: 'Strengthen on one leg and heavier to resume volume and intensity.',
      },
      goals: [
        { fr: 'Retrouver une force symétrique sur une jambe.', en: 'Regain symmetrical single-leg strength.' },
        { fr: 'Reprendre les séances intenses et les longues sorties assises.', en: 'Resume hard sessions and long seated rides.' },
      ],
      exercises: [
        { exerciseId: 'hip-airplane', priority: 1, startLevel: 2 },
        { exerciseId: 'single-leg-deadlift', priority: 1, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 3 },
        { exerciseId: 'step-up', priority: 2, startLevel: 1 },
        { exerciseId: 'side-plank-hip-abduction', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez la durée des sorties vélo par paliers et gardez deux séances de renforcement par semaine.',
        en: 'Increase ride duration in steps and keep two strength sessions a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Engourdissement ou perte de contact au niveau des fesses, de l’entrejambe ou des parties génitales, troubles pour uriner ou aller à la selle : urgence médicale.', en: 'Numbness or loss of feeling in the buttocks, groin or genitals, or problems passing urine or stools: medical emergency.' },
    { fr: 'Faiblesse de la jambe ou du pied (pied qui accroche, difficulté à marcher sur les talons ou les pointes), ou perte de sensibilité dans la jambe.', en: 'Weakness in the leg or foot (foot catching, difficulty walking on heels or toes), or loss of feeling in the leg.' },
    { fr: 'Douleur dans les deux jambes, ou douleur du bas du dos qui domine.', en: 'Pain in both legs, or dominant lower-back pain.' },
    { fr: 'Fièvre, douleur nocturne qui ne se calme pas, amaigrissement inexpliqué ou antécédent de cancer.', en: 'Fever, night pain that does not settle, unexplained weight loss or history of cancer.' },
    { fr: 'Douleur apparue après une chute ou une sensation de claquement à l’arrière de la cuisse.', en: 'Pain that started after a fall or a snapping sensation at the back of the thigh.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines.', en: 'No improvement after 6 to 8 weeks.' },
  ],
  complementaryAdvice: [
    { fr: 'Fractionnez les longues périodes assises ; un coussin qui soulage la zone douloureuse peut aider.', en: 'Break up long sitting periods; a cushion that offloads the painful area can help.' },
    { fr: 'Au vélo, faites vérifier la selle (largeur, hauteur, inclinaison) et évitez de rester assis sans relance pendant des heures.', en: 'On the bike, have your saddle checked (width, height, tilt) and avoid sitting for hours without standing up.' },
    { fr: 'Évitez les étirements appuyés et prolongés de la fesse s’ils déclenchent des symptômes dans la jambe.', en: 'Avoid strong, prolonged buttock stretches if they trigger leg symptoms.' },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'hopayian-2018',
        finding: {
          fr: 'Cette revue retient quatre signes fréquents (douleur de fesse, aggravée assis, sensibilité près de l’échancrure sciatique, douleur à la mise en tension du piriforme) mais conclut que leur fiabilité diagnostique reste inconnue.',
          en: 'This review identifies four common features (buttock pain, worse when sitting, tenderness near the sciatic notch, pain when the piriformis is tensioned) but concludes their diagnostic accuracy remains unknown.',
        },
      },
      {
        refId: 'kizaki-2020',
        finding: {
          fr: 'Le syndrome fessier profond se définit comme une atteinte du nerf sciatique coincé dans la fesse, sans origine discale ; l’imagerie du rachis et du bassin fait partie du bilan habituel.',
          en: 'Deep gluteal syndrome is defined as a non-discogenic sciatic nerve disorder with entrapment in the buttock; spine and pelvic imaging are part of the usual work-up.',
        },
      },
      {
        refId: 'hernando-2015',
        finding: {
          fr: 'Ces auteurs considèrent le « syndrome du piriforme » comme un fourre-tout et décrivent de nombreuses autres causes de compression du nerf sciatique dans la fesse.',
          en: 'These authors regard "piriformis syndrome" as a catch-all term and describe many other causes of sciatic nerve entrapment in the buttock.',
        },
      },
    ],
  },
});
