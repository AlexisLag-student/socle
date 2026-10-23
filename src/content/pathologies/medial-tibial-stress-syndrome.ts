/** Syndrome de stress tibial médial (« périostite »). */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'medial-tibial-stress-syndrome',
  region: 'foot-ankle',
  bodyAreas: ['shin-medial'],
  sports: ['run'],
  name: { fr: 'Syndrome de stress tibial médial', en: 'Medial tibial stress syndrome' },
  aka: [
    { fr: 'Périostite tibiale', en: 'Shin splints' },
    { fr: 'Douleur tibiale d’effort', en: 'Load-induced medial leg pain' },
  ],
  description: {
    fr: 'Le bord interne du tibia et les muscles qui s’y attachent réagissent à une charge de course qui augmente plus vite que leur capacité d’adaptation. C’est fréquent chez les coureurs débutants ou qui reprennent.',
    en: 'The inner border of the shin bone and the muscles attached to it react to running load that rises faster than they can adapt. It is common in new runners and those returning to running.',
  },
  recognize: {
    fr: 'Douleur diffuse le long du bord interne du tibia, sur plusieurs centimètres, qui apparaît en courant, souvent au début de la sortie, et qui peut persister après l’effort.',
    en: 'Diffuse pain along the inner border of the shin, over several centimetres, that comes on when running, often early in the run, and may persist afterwards.',
  },
  symptoms: [
    { fr: 'Douleur étendue sur le tiers inférieur du bord interne du tibia.', en: 'Pain spread over the lower third of the inner shin border.' },
    { fr: 'Sensibilité à la pression sur une zone de plusieurs centimètres.', en: 'Tenderness to touch over an area several centimetres long.' },
    { fr: 'Gêne au début de la course, parfois le lendemain matin.', en: 'Discomfort at the start of a run, sometimes the next morning.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume ou de l’intensité de course.', en: 'Rapid increase in running volume or intensity.' },
    { fr: 'Indice de masse corporelle plus élevé.', en: 'Higher body mass index.' },
    { fr: 'Affaissement marqué de l’arche du pied à l’appui.', en: 'Marked dropping of the foot arch when standing.' },
    { fr: 'Grande amplitude de flexion plantaire de cheville et de rotation externe de hanche.', en: 'Large ankle plantarflexion and hip external rotation range.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On réduit les impacts sans tout arrêter et on garde le mollet et le pied actifs avec des exercices sans saut.',
        en: 'Reduce impact without stopping everything, and keep the calf and foot working with jump-free exercises.',
      },
      goals: [
        { fr: 'Faire baisser la sensibilité du tibia.', en: 'Settle shin sensitivity.' },
        { fr: 'Maintenir la force du mollet et du pied.', en: 'Maintain calf and foot strength.' },
      ],
      exercises: [
        { exerciseId: 'seated-soleus-isometric', priority: 1, startLevel: 1 },
        {
          exerciseId: 'calf-raise-straight-knee',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 3, reps: [12, 15], tempo: '3-0-3', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'short-foot', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-balance', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Les impacts répétés entretiennent la douleur tibiale à ce stade.', en: 'Repeated impacts keep the shin irritated at this stage.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Trop d’impacts pour un tibia encore sensible.', en: 'Too much impact for a still-sensitive shin.' } },
        { exerciseId: 'line-hops', reason: { fr: 'Sauts à reporter à la phase de reprise.', en: 'Hops are postponed to the return phase.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Marche rapide de 30 minutes sans douleur.', en: '30 minutes of brisk walking without pain.' },
        { fr: 'Le tibia n’est plus douloureux le matin.', en: 'The shin is no longer painful in the morning.' },
      ],
      loadAdvice: {
        fr: 'Réduisez le volume de course, évitez les surfaces très dures et les descentes ; le vélo et la natation permettent de garder la forme.',
        en: 'Cut running volume, avoid very hard surfaces and downhills; cycling and swimming help maintain fitness.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement le mollet, le pied et la hanche, et on reprend une course facile par paliers.',
        en: 'Progressively strengthen the calf, foot and hip, and resume easy running in steps.',
      },
      goals: [
        { fr: 'Retrouver une endurance de mollet symétrique.', en: 'Regain symmetrical calf endurance.' },
        { fr: 'Reprendre la course facile sans douleur le lendemain.', en: 'Resume easy running without next-day pain.' },
      ],
      exercises: [
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 2 },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 2 },
        { exerciseId: 'band-ankle-inversion', priority: 2, startLevel: 2 },
        { exerciseId: 'side-lying-hip-abduction', priority: 2, startLevel: 1 },
        { exerciseId: 'single-leg-balance', priority: 3, startLevel: 2 },
        { exerciseId: 'heel-walk', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'jump-rope', reason: { fr: 'À réintroduire seulement en phase de reprise.', en: 'Only reintroduce in the return phase.' } },
      ],
      nextPhaseCriteria: [
        { fr: '25 montées sur pointes sur une jambe de chaque côté.', en: '25 single-leg calf raises on each side.' },
        { fr: '30 minutes de course facile sans douleur pendant ni le lendemain.', en: '30 minutes of easy running without pain during or the next day.' },
      ],
      loadAdvice: {
        fr: 'Programme de course progressif, par exemple en alternant marche et course, en n’augmentant qu’une variable à la fois (durée, puis vitesse).',
        en: 'Graded running programme, for example alternating walking and running, increasing only one variable at a time (duration, then speed).',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On réhabitue la jambe aux impacts avec des sauts progressifs, en gardant le renforcement.',
        en: 'Get the leg used to impact again with progressive hops, while keeping up strength work.',
      },
      goals: [
        { fr: 'Tolérer les sauts et la course rapide.', en: 'Tolerate hops and faster running.' },
        { fr: 'Revenir au volume habituel sans rechute.', en: 'Return to usual volume without relapse.' },
      ],
      exercises: [
        { exerciseId: 'pogo-hops', priority: 1, startLevel: 1 },
        { exerciseId: 'hop-stabilization', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-raise-straight-knee', priority: 2, startLevel: 3 },
        { exerciseId: 'calf-raise-bent-knee', priority: 2, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez le volume de course progressivement et gardez deux séances de renforcement par semaine.',
        en: 'Increase running volume gradually and keep two strength sessions a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur très localisée sur un point précis du tibia, sensible au doigt (risque de fracture de fatigue).', en: 'Pain localised to one precise spot on the shin, tender to a fingertip (possible stress fracture).' },
    { fr: 'Douleur au repos, la nuit, ou qui fait boiter à la marche.', en: 'Pain at rest, at night, or that makes you limp when walking.' },
    { fr: 'Douleur sur l’avant ou l’extérieur de la jambe avec engourdissement, fourmillements ou pied qui « tape » pendant l’effort.', en: 'Pain at the front or outside of the leg with numbness, tingling or foot slapping during exercise.' },
    { fr: 'Antécédents de fractures de fatigue, règles absentes ou irrégulières, ou alimentation restreinte.', en: 'History of stress fractures, absent or irregular periods, or restricted eating.' },
    { fr: 'Pas d’amélioration après 4 à 6 semaines de réduction de charge et de renforcement.', en: 'No improvement after 4 to 6 weeks of reduced load and strengthening.' },
  ],
  complementaryAdvice: [
    { fr: 'Augmentez le volume de course par petits paliers et alternez les surfaces.', en: 'Increase running volume in small steps and vary surfaces.' },
    { fr: 'Une augmentation légère de la fréquence de pas peut réduire les contraintes à chaque impact.', en: 'A slight increase in step rate can reduce stress at each impact.' },
    { fr: 'Des semelles de soutien de l’arche peuvent aider certains coureurs : demandez conseil à un professionnel.', en: 'Arch-support insoles may help some runners: ask a professional for advice.' },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'teles-2026',
        finding: {
          fr: 'Cette revue de 3 essais (130 coureurs) ne trouve aucun traitement nettement supérieur ; ajouter des exercices n’était pas supérieur aux comparateurs.',
          en: 'This review of 3 trials (130 runners) found no clearly superior treatment; adding exercise was not superior to comparators.',
        },
      },
      {
        refId: 'moen-2012',
        finding: {
          fr: 'Chez 74 sportifs, un programme de course progressif seul ou associé à du renforcement et des étirements des mollets a permis un retour à la course dans des délais similaires.',
          en: 'In 74 athletes, a graded running programme alone or combined with calf strengthening and stretching led to a similar time to complete the return-to-running programme.',
        },
      },
      {
        refId: 'marques-2025',
        finding: {
          fr: 'Dans une méta-analyse d’essais de prévention, l’entraînement neuromusculaire réduisait le risque de syndrome de stress tibial médial (4 essais, 3 887 participants, certitude élevée) ; aucune preuve ne soutenait les étirements statiques.',
          en: 'In a meta-analysis of prevention trials, neuromuscular training reduced the risk of medial tibial stress syndrome (4 trials, 3,887 participants, high certainty); no evidence supported static stretching.',
        },
      },
      {
        refId: 'hamstra-wright-2015',
        finding: {
          fr: 'IMC plus élevé, affaissement de l’arche, grande flexion plantaire de cheville et grande rotation externe de hanche sont associés au syndrome.',
          en: 'Higher BMI, navicular drop, greater ankle plantarflexion and hip external rotation range are associated with the syndrome.',
        },
      },
    ],
  },
});
