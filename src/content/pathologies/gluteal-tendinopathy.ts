/** Tendinopathie glutéale / douleur latérale de hanche (skill add-pathology). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'gluteal-tendinopathy',
  region: 'hip-thigh',
  bodyAreas: ['hip-lateral'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie glutéale (douleur latérale de hanche)',
    en: 'Gluteal tendinopathy (lateral hip pain)',
  },
  aka: [
    { fr: 'Syndrome douloureux du grand trochanter', en: 'Greater trochanteric pain syndrome' },
    { fr: 'Bursite trochantérienne', en: 'Trochanteric bursitis' },
  ],
  description: {
    fr: 'Les tendons du moyen et du petit fessier deviennent sensibles là où ils s’attachent sur l’os du côté de la hanche. Ils tolèrent mal d’être comprimés contre cet os, en particulier quand la cuisse passe vers l’intérieur.',
    en: 'The gluteus medius and minimus tendons become sensitive where they attach on the bone at the side of the hip. They tolerate being compressed against that bone poorly, especially when the thigh moves inwards.',
  },
  recognize: {
    fr: 'Douleur sur le côté de la hanche, sur la bosse osseuse, parfois étendue vers l’extérieur de la cuisse. Elle est souvent gênante la nuit allongé sur ce côté, en montant les escaliers, debout sur une jambe ou après être resté assis jambes croisées.',
    en: 'Pain on the side of the hip, over the bony point, sometimes spreading down the outside of the thigh. It is often troublesome at night lying on that side, climbing stairs, standing on one leg or after sitting with legs crossed.',
  },
  symptoms: [
    { fr: 'Douleur au toucher sur la bosse osseuse du côté de la hanche.', en: 'Tenderness over the bony point at the side of the hip.' },
    { fr: 'Douleur la nuit couché sur le côté douloureux (ou sur l’autre côté, la jambe du dessus tombant vers l’intérieur).', en: 'Night pain lying on the painful side (or on the other side, with the top leg dropping inwards).' },
    { fr: 'Gêne en montée d’escaliers, en côte ou en appui prolongé sur une jambe.', en: 'Discomfort climbing stairs, running uphill or standing on one leg for long.' },
    { fr: 'Raideur ou douleur en se levant après une position assise prolongée.', en: 'Stiffness or pain when getting up after sitting for a long time.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume, des côtes ou des descentes.', en: 'Rapid increase in volume, hills or downhills.' },
    { fr: 'Positions répétées de hanche vers l’intérieur : jambes croisées, appui sur une hanche debout, dormir sur le côté genou replié devant.', en: 'Repeated hip-inward positions: crossed legs, hanging on one hip when standing, sleeping on your side with the top knee dropped forwards.' },
    { fr: 'Faiblesse des muscles fessiers.', en: 'Weak gluteal muscles.' },
    { fr: 'Plus fréquent chez les femmes, surtout après 40 ans et autour de la ménopause.', en: 'More common in women, especially after 40 and around menopause.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On réduit les positions qui compriment le tendon et on le charge sans mouvement (isométrie), tous les jours.',
        en: 'Reduce the positions that compress the tendon and load it without movement (isometrics), every day.',
      },
      goals: [
        { fr: 'Apaiser la douleur de nuit et au repos en évitant la compression.', en: 'Settle night and resting pain by avoiding compression.' },
        { fr: 'Maintenir une charge tolérée sur les fessiers.', en: 'Keep a tolerated load on the glutes.' },
      ],
      exercises: [
        { exerciseId: 'hip-abduction-isometric', priority: 1, startLevel: 1 },
        {
          exerciseId: 'glute-bridge',
          priority: 2,
          startLevel: 1,
          dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-2', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
          note: {
            fr: 'Pieds à la largeur du bassin, genoux qui ne se rapprochent pas.',
            en: 'Feet hip-width apart, knees not drifting together.',
          },
        },
        { exerciseId: 'hip-flexor-isometric', priority: 3, startLevel: 1 },
      ],
      avoid: [
        {
          exerciseId: 'side-lying-hip-abduction',
          reason: {
            fr: 'Très exigeante pour les tendons fessiers et réalisée allongé sur le côté : à reporter tant que la hanche est irritable.',
            en: 'Very demanding on the gluteal tendons and done lying on the side: postpone while the hip is irritable.',
          },
        },
        {
          exerciseId: 'side-plank-hip-abduction',
          reason: {
            fr: 'Charge élevée sur les tendons fessiers et appui sur la hanche du dessous.',
            en: 'High load on the gluteal tendons and pressure on the bottom hip.',
          },
        },
        {
          exerciseId: 'hip-rotation-mobility',
          reason: {
            fr: 'Certaines positions d’étirement fessier ramènent la cuisse vers l’intérieur et compriment les tendons.',
            en: 'Some gluteal stretching positions bring the thigh inwards and compress the tendons.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Les nuits sont nettement moins perturbées par la douleur.', en: 'Nights are clearly less disturbed by pain.' },
        { fr: 'Tenir debout 30 secondes sur la jambe douloureuse, bassin horizontal, sans douleur croissante.', en: 'Stand on the painful leg for 30 seconds, pelvis level, without increasing pain.' },
        { fr: 'Isométries debout (niveau 3) tolérées sans aggravation le lendemain.', en: 'Standing isometrics (level 3) tolerated without next-day flare.' },
      ],
      loadAdvice: {
        fr: 'Réduisez côtes, descentes et sorties longues ; courez sur terrain plat si la gêne reste modérée et revient à son niveau habituel le lendemain. Au vélo, évitez les genoux qui rentrent vers le cadre.',
        en: 'Cut back on hills, downhills and long runs; run on flat ground if discomfort stays moderate and settles by the next day. On the bike, avoid letting the knees drift in towards the frame.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement les fessiers en appui, sans laisser la hanche partir vers l’intérieur.',
        en: 'Progressively strengthen the glutes in weight-bearing, without letting the hip drift inwards.',
      },
      goals: [
        { fr: 'Retrouver la force des abducteurs et des extenseurs de hanche.', en: 'Regain hip abductor and extensor strength.' },
        { fr: 'Contrôler le bassin en appui sur une jambe.', en: 'Control the pelvis in single-leg stance.' },
      ],
      exercises: [
        { exerciseId: 'glute-bridge', priority: 1, startLevel: 2 },
        { exerciseId: 'hip-hike', priority: 1, startLevel: 1 },
        { exerciseId: 'lateral-band-walk', priority: 2, startLevel: 1 },
        { exerciseId: 'squat', priority: 2, startLevel: 1 },
        { exerciseId: 'step-up', priority: 2, startLevel: 1 },
        { exerciseId: 'hip-abduction-isometric', priority: 3, startLevel: 3 },
      ],
      avoid: [
        {
          exerciseId: 'side-lying-hip-abduction',
          reason: {
            fr: 'Préférez les exercices en appui tant que la douleur latérale n’a pas disparu.',
            en: 'Prefer weight-bearing exercises until lateral hip pain has gone.',
          },
        },
        {
          exerciseId: 'hip-rotation-mobility',
          reason: {
            fr: 'Évitez les étirements qui ramènent la cuisse vers l’intérieur.',
            en: 'Avoid stretches that bring the thigh inwards.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Montée d’escaliers et marche rapide sans douleur.', en: 'Stair climbing and brisk walking without pain.' },
        { fr: 'Pont sur une jambe : 3 × 12 de chaque côté, comparables.', en: 'Single-leg bridge: 3 × 12 each side, comparable.' },
        { fr: 'Élévation du bassin sur une marche sans douleur le lendemain.', en: 'Hip hike on a step without next-day pain.' },
      ],
      loadAdvice: {
        fr: 'Augmentez le volume de course ou de vélo par petits paliers, une seule variable à la fois (durée, puis dénivelé, puis vitesse).',
        en: 'Increase running or cycling volume in small steps, one variable at a time (duration, then elevation, then speed).',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On charge plus lourd et sur une jambe, en préparant les côtes, les descentes et la vitesse.',
        en: 'Load heavier and on one leg, preparing for hills, downhills and speed.',
      },
      goals: [
        { fr: 'Retrouver une force symétrique sur une jambe.', en: 'Regain symmetrical single-leg strength.' },
        { fr: 'Reprendre le volume et le dénivelé habituels.', en: 'Return to usual volume and elevation.' },
      ],
      exercises: [
        { exerciseId: 'glute-bridge', priority: 1, startLevel: 3 },
        { exerciseId: 'single-leg-deadlift', priority: 1, startLevel: 1 },
        { exerciseId: 'split-squat', priority: 2, startLevel: 1 },
        { exerciseId: 'hip-hike', priority: 2, startLevel: 3 },
        { exerciseId: 'side-plank-hip-abduction', priority: 3, startLevel: 1 },
        { exerciseId: 'hip-airplane', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez deux séances de renforcement par semaine pendant plusieurs mois et continuez d’éviter les positions de compression au quotidien.',
        en: 'Keep two strength sessions a week for several months and keep avoiding compressive positions in daily life.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur apparue après une chute, ou impossibilité de prendre appui sur la jambe.', en: 'Pain that started after a fall, or inability to bear weight on the leg.' },
    { fr: 'Douleur profonde dans le pli de l’aine, boiterie ou raideur qui limite l’enfilage des chaussettes : l’articulation de la hanche peut être en cause.', en: 'Deep pain in the groin crease, limping or stiffness that makes putting on socks difficult: the hip joint itself may be involved.' },
    { fr: 'Douleur la nuit indépendante de la position, fièvre, amaigrissement inexpliqué ou antécédent de cancer.', en: 'Night pain regardless of position, fever, unexplained weight loss or history of cancer.' },
    { fr: 'Engourdissement, fourmillements ou faiblesse dans la jambe, ou douleur du bas du dos qui descend.', en: 'Numbness, pins and needles or weakness in the leg, or lower-back pain spreading down.' },
    { fr: 'Pas d’amélioration après 8 à 12 semaines de renforcement bien conduit.', en: 'No improvement after 8 to 12 weeks of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    { fr: 'Ne croisez pas les jambes, assis comme debout, et évitez de vous tenir « en appui sur une hanche ».', en: 'Do not cross your legs, sitting or standing, and avoid hanging on one hip when standing.' },
    { fr: 'Pour dormir sur le côté, placez un oreiller entre les genoux ; un surmatelas moelleux limite la pression sur la hanche.', en: 'When sleeping on your side, put a pillow between your knees; a soft mattress topper reduces pressure on the hip.' },
    { fr: 'Évitez les étirements de la bandelette ilio-tibiale et des fessiers qui ramènent la jambe en travers du corps : ils compriment le tendon.', en: 'Avoid iliotibial band and gluteal stretches that bring the leg across the body: they compress the tendon.' },
    { fr: 'Évitez les sièges très bas, où les hanches sont plus fléchies que les genoux.', en: 'Avoid very low seats, where the hips are bent more than the knees.' },
    { fr: 'Au vélo, vérifiez la hauteur de selle et le réglage des cales pour que le genou reste dans l’axe du pied.', en: 'On the bike, check saddle height and cleat set-up so the knee stays in line with the foot.' },
  ],
  evidence: {
    level: 'moderate',
    citations: [
      {
        refId: 'mellor-2018',
        finding: {
          fr: 'Chez 204 personnes, 8 semaines d’éducation sur la gestion de la charge et d’exercices ont donné plus d’amélioration globale qu’une infiltration ou que l’attente, à 8 semaines comme à un an.',
          en: 'In 204 people, 8 weeks of load-management education plus exercise gave more global improvement than a corticosteroid injection or wait-and-see, both at 8 weeks and at one year.',
        },
      },
      {
        refId: 'kjeldsen-2024',
        finding: {
          fr: 'Cette méta-analyse de 6 essais (733 patients) conclut que l’exercice améliore un peu la douleur et la fonction à long terme et le recommande en premier recours, sur un nombre d’études encore limité.',
          en: 'This meta-analysis of 6 trials (733 patients) concludes that exercise slightly improves long-term pain and function and recommends it as first-line treatment, based on a still limited number of studies.',
        },
      },
      {
        refId: 'ganderton-2018',
        finding: {
          fr: 'Chez 94 femmes ménopausées recevant toutes des conseils pour éviter la compression du tendon, un programme de renforcement n’a pas fait mieux qu’un exercice factice ; les deux groupes se sont améliorés.',
          en: 'In 94 postmenopausal women who all received advice on avoiding tendon compression, a strengthening programme did no better than sham exercise; both groups improved.',
        },
      },
      {
        refId: 'grimaldi-2015',
        finding: {
          fr: 'La compression des tendons fessiers, notamment en adduction de hanche, combinée à la tension, serait la plus délétère ; la prise en charge repose sur la gestion de la charge par l’exercice et l’éducation.',
          en: 'Compression of the gluteal tendons, particularly in hip adduction, combined with tensile load is thought to be most damaging; management relies on load management through exercise and education.',
        },
      },
    ],
  },
});
