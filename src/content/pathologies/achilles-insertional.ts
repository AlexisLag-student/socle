/** Tendinopathie d'Achille insertionnelle. */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'achilles-insertional',
  region: 'foot-ankle',
  bodyAreas: ['achilles', 'heel-plantar'],
  sports: ['run', 'bike'],
  name: { fr: 'Tendinopathie d’Achille insertionnelle', en: 'Insertional Achilles tendinopathy' },
  aka: [{ fr: 'Douleur à l’insertion du tendon d’Achille', en: 'Achilles insertion pain' }],
  description: {
    fr: 'La partie basse du tendon d’Achille, là où il s’attache sur le talon, réagit à une charge trop importante. Quand la cheville plie fortement vers le haut, le tendon est en plus comprimé contre l’os, ce qui l’irrite.',
    en: 'The lowest part of the Achilles tendon, where it attaches to the heel, reacts to excessive load. When the ankle bends strongly upwards, the tendon is also compressed against the bone, which irritates it.',
  },
  recognize: {
    fr: 'Douleur à l’arrière du talon, au point d’attache du tendon (moins de 2 cm au-dessus du talon), souvent raide le matin, gênée par les côtes, les chaussures à contrefort rigide ou les étirements du mollet.',
    en: 'Pain at the back of the heel where the tendon attaches (less than 2 cm above the heel), often stiff in the morning, worse with hills, stiff heel counters or calf stretches.',
  },
  symptoms: [
    { fr: 'Douleur à l’arrière du talon lors des premiers pas.', en: 'Pain at the back of the heel on the first steps.' },
    { fr: 'Gêne en montée, en marchant pieds nus ou avec un contrefort qui appuie.', en: 'Discomfort going uphill, walking barefoot or with a heel counter that presses.' },
    { fr: 'Parfois une bosse sensible à l’arrière du talon.', en: 'Sometimes a tender bump at the back of the heel.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide des côtes, des fractionnés ou du volume.', en: 'Rapid increase in hills, intervals or volume.' },
    { fr: 'Passage brutal à des chaussures à faible drop ou à la course pieds nus.', en: 'Sudden switch to low-drop shoes or barefoot running.' },
    { fr: 'Âge plus avancé et manque de force des mollets.', en: 'Older age and lack of calf strength.' },
    { fr: 'Au vélo : selle trop haute ou cales trop avancées qui font travailler la cheville en grande amplitude.', en: 'On the bike: saddle too high or cleats too far forward, making the ankle work through a large range.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On charge le tendon sans le comprimer : isométrie et montées sur pointes au sol, jamais de talon sous le niveau du sol.',
        en: 'Load the tendon without compressing it: isometrics and floor-level calf raises, never letting the heel drop below the floor.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité du talon.', en: 'Reduce heel sensitivity.' },
        { fr: 'Garder une charge quotidienne tolérée, sans flexion de cheville au-delà de l’horizontale.', en: 'Keep a tolerated daily load without bending the ankle past flat.' },
      ],
      exercises: [
        { exerciseId: 'calf-isometric-hold', priority: 1, startLevel: 1 },
        { exerciseId: 'seated-soleus-isometric', priority: 1, startLevel: 1 },
        {
          exerciseId: 'calf-raise-straight-knee',
          priority: 2,
          startLevel: 1,
          dosage: { sets: 3, reps: [10, 15], tempo: '3-0-3', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
          note: { fr: 'Au sol uniquement : le talon s’arrête au sol.', en: 'On the floor only: the heel stops at floor level.' },
        },
      ],
      avoid: [
        { exerciseId: 'eccentric-heel-drop', reason: { fr: 'Descendre le talon sous le niveau d’une marche comprime le tendon contre l’os.', en: 'Lowering the heel below step level compresses the tendon against the bone.' } },
        { exerciseId: 'calf-wall-stretch', reason: { fr: 'L’étirement en flexion de cheville comprime l’insertion du tendon.', en: 'Stretching into ankle dorsiflexion compresses the tendon insertion.' } },
        { exerciseId: 'knee-to-wall-mobility', reason: { fr: 'Flexion de cheville en fin d’amplitude, à éviter tant que le talon est sensible.', en: 'End-range ankle dorsiflexion, to avoid while the heel is sensitive.' } },
        { exerciseId: 'pogo-hops', reason: { fr: 'Trop de charge rapide pour un tendon irritable.', en: 'Too much fast loading for an irritable tendon.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Trop de charge rapide pour un tendon irritable.', en: 'Too much fast loading for an irritable tendon.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'La raideur matinale diminue d’une semaine à l’autre.', en: 'Morning stiffness decreases week after week.' },
        { fr: '15 montées sur pointes au sol sur une jambe sans douleur croissante.', en: '15 single-leg floor calf raises without increasing pain.' },
      ],
      loadAdvice: {
        fr: 'Limitez les côtes et les fractionnés ; une talonnette ou des chaussures au drop un peu plus élevé peuvent soulager temporairement.',
        en: 'Limit hills and intervals; a heel lift or slightly higher-drop shoes may give temporary relief.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On augmente la charge des mollets, toujours sans descendre le talon sous l’horizontale.',
        en: 'Increase calf loading, still without lowering the heel below flat.',
      },
      goals: [
        { fr: 'Retrouver une force du mollet symétrique.', en: 'Regain symmetrical calf strength.' },
        { fr: 'Charger au moins 3 fois par semaine, de plus en plus lourd.', en: 'Load at least 3 times a week, progressively heavier.' },
      ],
      exercises: [
        {
          exerciseId: 'calf-raise-straight-knee',
          priority: 1,
          startLevel: 2,
          note: { fr: 'Ajoutez de la charge plutôt que de l’amplitude : talon arrêté au sol.', en: 'Add load rather than range: heel stops at floor level.' },
        },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 2 },
        {
          exerciseId: 'eccentric-heel-drop',
          priority: 3,
          startLevel: 1,
          dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
          note: { fr: 'Version au sol uniquement (niveau 1), sans descendre sous l’horizontale.', en: 'Floor version only (level 1), without going below flat.' },
        },
        { exerciseId: 'toe-walk-carry', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'calf-wall-stretch', reason: { fr: 'L’étirement comprime l’insertion du tendon.', en: 'Stretching compresses the tendon insertion.' } },
      ],
      nextPhaseCriteria: [
        { fr: '25 montées sur pointes sur une jambe, comparables des deux côtés.', en: '25 single-leg calf raises, comparable on both sides.' },
        { fr: 'Course facile sur le plat sans douleur le lendemain.', en: 'Easy flat running without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On réintroduit progressivement l’amplitude complète, les sauts et les côtes.',
        en: 'Gradually reintroduce full range, hops and hills.',
      },
      goals: [
        { fr: 'Tolérer la pleine amplitude et les impacts.', en: 'Tolerate full range and impact.' },
        { fr: 'Reprendre côtes et vitesse sans rechute.', en: 'Return to hills and speed without relapse.' },
      ],
      exercises: [
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 4 },
        { exerciseId: 'pogo-hops', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-raise-explosive', priority: 2, startLevel: 1 },
        { exerciseId: 'calf-raise-bent-knee', priority: 2, startLevel: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Réintroduisez la descente du talon sous le niveau de la marche, puis les côtes, une étape à la fois, en surveillant la réaction du lendemain.',
        en: 'Reintroduce lowering the heel below step level, then hills, one step at a time, watching the next-day response.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement soudain à l’arrière de la cheville ou impossibilité de monter sur la pointe du pied.', en: 'Sudden snap at the back of the ankle or inability to rise onto the toes.' },
    { fr: 'Talon rouge, chaud, gonflé, ou fièvre.', en: 'Red, hot, swollen heel, or fever.' },
    { fr: 'Douleurs dans plusieurs tendons ou articulations, ou raideur matinale du dos (possible maladie inflammatoire).', en: 'Pain in several tendons or joints, or morning back stiffness (possible inflammatory disease).' },
    { fr: 'Douleur apparue après la prise d’antibiotiques de la famille des fluoroquinolones.', en: 'Pain that started after taking fluoroquinolone antibiotics.' },
    { fr: 'Pas d’amélioration après 3 mois de renforcement bien conduit.', en: 'No improvement after 3 months of well-conducted strengthening.' },
  ],
  complementaryAdvice: [
    { fr: 'Évitez les contreforts de chaussure qui appuient sur la zone douloureuse.', en: 'Avoid shoe heel counters that press on the painful area.' },
    { fr: 'Au vélo, vérifiez la hauteur de selle et la position des cales pour limiter l’amplitude de cheville.', en: 'On the bike, check saddle height and cleat position to limit ankle range.' },
    { fr: 'Les ondes de choc sont une option à discuter avec un soignant si l’exercice seul ne suffit pas.', en: 'Shockwave therapy is an option to discuss with a clinician if exercise alone is not enough.' },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'jonsson-2008',
        finding: {
          fr: 'Chez 27 patients avec une tendinopathie d’Achille insertionnelle, un excentrique sans descendre en flexion de cheville (3 × 15, deux fois par jour, 12 semaines) a permis à 67 % d’entre eux de reprendre leurs activités, avec une nette baisse de la douleur.',
          en: 'In 27 patients with insertional Achilles tendinopathy, eccentric training without loading into dorsiflexion (3 × 15, twice a day, 12 weeks) allowed 67% to return to their activities, with a clear drop in pain.',
        },
      },
      {
        refId: 'ko-2023',
        finding: {
          fr: 'Cette méta-analyse en réseau de 9 essais classe l’excentrique associé à un traitement des tissus mous en tête pour la douleur à court terme, mais la confiance dans les résultats est très faible.',
          en: 'This network meta-analysis of 9 trials ranks eccentric exercise plus soft-tissue treatment first for short-term pain, but confidence in the results is very low.',
        },
      },
    ],
  },
});
