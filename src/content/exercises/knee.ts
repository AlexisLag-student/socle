/**
 * Exercices — genou (quadriceps, tendon rotulien, contrôle du genou).
 * Rédigés selon le skill add-exercise ; références vérifiées dans src/content/references/knee.ts.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

/** Consigne récurrente : alignement du genou. */
const kneeTracking = {
  fr: 'Gardez le genou dans l’axe du pied : il ne doit pas rentrer vers l’intérieur.',
  en: 'Keep the knee in line with the foot: it should not cave inwards.',
};

/** Précaution récurrente pour les douleurs de l’avant du genou. */
const anteriorKneeRange = {
  fr: 'Si l’avant du genou est sensible, limitez la profondeur à une amplitude confortable et augmentez-la au fil des semaines.',
  en: 'If the front of the knee is sensitive, limit depth to a comfortable range and increase it over the weeks.',
};

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'squat',
    family: 'squat',
    name: { fr: 'Squat', en: 'Squat' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'adductor-magnus', 'rectus-femoris', 'soleus', 'erector-spinae'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les quadriceps et les fessiers amortissent chaque foulée et produisent l’essentiel de la poussée sur la pédale. Le squat est l’exercice de base pour les rendre plus forts, ce qui améliore aussi l’économie de course et de pédalage.',
      en: 'The quads and glutes absorb every stride and produce most of the push on the pedal. The squat is the foundation exercise to make them stronger, which also helps running and pedalling economy.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds écartés de la largeur des épaules, pointes légèrement ouvertes, poids réparti sur tout le pied.',
        en: 'Stand with feet shoulder-width apart, toes slightly turned out, weight spread over the whole foot.',
      },
      movement: {
        fr: 'Descendez en poussant les hanches vers l’arrière et en pliant les genoux, jusqu’à ce que les cuisses soient proches de l’horizontale (ou jusqu’à la chaise). Remontez en poussant le sol avec tout le pied.',
        en: 'Lower by pushing the hips back and bending the knees until the thighs are close to horizontal (or down to the chair). Stand up by pushing the floor away with the whole foot.',
      },
      cues: [
        kneeTracking,
        { fr: 'Dos long, poitrine ouverte, regard devant.', en: 'Long back, open chest, eyes forward.' },
        { fr: 'Les talons restent au sol.', en: 'Heels stay on the floor.' },
      ],
      breathing: {
        fr: 'Inspirez en descendant, expirez en remontant. Avec une charge lourde, gainez-vous en bloquant brièvement l’air en bas.',
        en: 'Breathe in on the way down, out on the way up. With heavy loads, brace by briefly holding your breath at the bottom.',
      },
    },
    mistakes: [
      { fr: 'Genoux qui rentrent vers l’intérieur en remontant.', en: 'Knees caving inwards on the way up.' },
      { fr: 'Talons qui décollent, poids sur l’avant-pied.', en: 'Heels lifting, weight shifting onto the forefoot.' },
      { fr: 'Dos qui s’arrondit en bas du mouvement avec une charge.', en: 'Back rounding at the bottom under load.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Squat sur chaise', en: 'Box squat to a chair' },
        description: { fr: 'Descente contrôlée jusqu’à effleurer une chaise, puis remontée sans élan.', en: 'Controlled descent until you touch a chair, then stand up without momentum.' },
        mastery: { fr: '3 × 15 répétitions lentes, genoux bien alignés, sans gêne le lendemain.', en: '3 × 15 slow reps, knees well aligned, no discomfort the next day.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '3-0-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Squat au poids du corps', en: 'Bodyweight squat' },
        description: { fr: 'Squat complet sans chaise, avec une pause d’une seconde en bas.', en: 'Full squat without a chair, with a one-second pause at the bottom.' },
        mastery: { fr: '3 × 20 répétitions avec une technique constante.', en: '3 × 20 reps with consistent technique.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '3-1-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Squat gobelet', en: 'Goblet squat' },
        description: { fr: 'Haltère ou kettlebell tenu contre la poitrine.', en: 'Dumbbell or kettlebell held against the chest.' },
        mastery: { fr: '3 × 10 avec environ 25 % du poids du corps, sans perte d’alignement.', en: '3 × 10 with about 25% of body weight, without losing alignment.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 90, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Squat chargé, force', en: 'Loaded squat, strength' },
        description: { fr: 'Barre sur le dos, à la cage ou à la Smith machine : charges lourdes, peu de répétitions.', en: 'Barbell on the back, in a rack or Smith machine: heavy loads, few reps.' },
        mastery: { fr: '4 × 6 avec une charge proche du poids du corps, technique stable.', en: '4 × 6 with a load close to body weight, stable technique.' },
        dosage: { sets: 4, reps: [5, 6], tempo: '2-0-X', restSec: 180, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Squat lourd, force maximale', en: 'Heavy squat, maximal strength' },
        description: { fr: 'Charges lourdes, remontée la plus rapide possible, récupération complète.', en: 'Heavy loads, stand up as fast as possible, full recovery.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 4 restent faciles avec 2 répétitions en réserve.', en: 'Maintenance level: add load when 4 × 4 stays easy with 2 reps in reserve.' },
        dosage: { sets: 4, reps: [3, 5], tempo: '2-0-X', restSec: 180, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Bras tendus devant vous pour l’équilibre, une chaise derrière vous au début.', en: 'Arms out in front for balance, a chair behind you at first.' },
      },
      {
        id: 'goblet', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Squat gobelet (haltère ou kettlebell)', en: 'Goblet squat (dumbbell or kettlebell)' },
        instructions: { fr: 'Tenez la charge contre le sternum, coudes vers le bas.', en: 'Hold the weight against the breastbone, elbows pointing down.' },
      },
      {
        id: 'smith', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Smith machine ou hack squat', en: 'Smith machine or hack squat' },
        instructions: { fr: 'Pieds légèrement en avant de la barre guidée, butées de sécurité réglées juste sous la position basse.', en: 'Feet slightly ahead of the guided bar, safety stops set just below the bottom position.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 4,
        name: { fr: 'Squat à la barre', en: 'Barbell back squat' },
        instructions: { fr: 'Barre posée sur le haut du dos, dans une cage avec barres de sécurité. Apprenez le mouvement avec une charge légère.', en: 'Bar resting on the upper back, in a rack with safety bars. Learn the movement with a light load.' },
      },
    ],
    precautions: [caution.painFlare, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 sur le syndrome fémoro-patellaire préconise un programme d’exercices ciblant à la fois la hanche et le genou ; le squat fait partie des exercices de renforcement du genou en charge proposés.',
            en: 'The 2019 JOSPT patellofemoral pain guideline recommends exercise targeting both hip and knee; the squat is among the weight-bearing knee strengthening exercises it covers.',
          },
        },
        {
          refId: 'nascimento-2018',
          finding: {
            fr: 'Sur 14 essais (673 participants), le renforcement de la hanche et du genou a réduit la douleur et amélioré l’activité, mieux que le renforcement du genou seul.',
            en: 'Across 14 trials (673 participants), hip and knee strengthening reduced pain and improved activity, more than knee strengthening alone.',
          },
        },
        {
          refId: 'ronnestad-2014',
          finding: {
            fr: 'Associer la musculation lourde à l’entraînement d’endurance améliore l’économie de course et de pédalage ; pour le vélo, c’est la force lourde qui a les preuves les plus solides.',
            en: 'Adding heavy strength training to endurance training improves running and cycling economy; for cycling, heavy strength training has the most compelling evidence.',
          },
        },
        {
          refId: 'blagrove-2018',
          finding: {
            fr: 'Sur 24 études chez des coureurs de demi-fond et de fond, le renforcement a généralement amélioré l’économie de course (2 à 8 %) et la performance en contre-la-montre, sans effet négatif sur la composition corporelle.',
            en: 'Across 24 studies in middle- and long-distance runners, strength training generally improved running economy (2–8%) and time-trial performance, with no negative effect on body composition.',
          },
        },
        {
          refId: 'storen-2008',
          finding: {
            fr: 'Chez 17 coureurs entraînés, 8 semaines de demi-squats lourds (4 × 4 répétitions maximum, 3 fois par semaine) ont amélioré l’économie de course de 5 % sans prise de poids.',
            en: 'In 17 trained runners, 8 weeks of heavy half-squats (4 × 4 repetition maximum, 3 times a week) improved running economy by 5% without weight gain.',
          },
        },
        {
          refId: 'sunde-2010',
          finding: {
            fr: 'Chez des cyclistes sur route, 8 semaines de demi-squats lourds (4 × 4 répétitions maximum) ont amélioré l’économie de pédalage de 4,8 % et l’endurance à puissance maximale aérobie.',
            en: 'In road cyclists, 8 weeks of heavy half-squats (4 × 4 repetition maximum) improved cycling economy by 4.8% and endurance at maximal aerobic power.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'split-squat',
    family: 'split-squat',
    name: { fr: 'Fente statique et squat bulgare', en: 'Split squat and Bulgarian split squat' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'glute-med', 'adductor-magnus', 'rectus-femoris'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Courir et pédaler se font une jambe à la fois. Travailler chaque jambe séparément renforce quadriceps et fessiers tout en exigeant la stabilité du bassin et du genou.',
      en: 'Running and pedalling happen one leg at a time. Training each leg separately strengthens the quads and glutes while demanding pelvic and knee stability.',
    },
    how: {
      setup: {
        fr: 'Un grand pas d’écart entre les pieds, pied arrière sur la pointe (ou posé sur une chaise ou un banc pour la version bulgare), buste droit.',
        en: 'Feet a long stride apart, back foot on its toes (or resting on a chair or bench for the Bulgarian version), torso upright.',
      },
      movement: {
        fr: 'Descendez verticalement en pliant les deux genoux jusqu’à ce que le genou arrière frôle le sol, puis remontez en poussant avec le pied avant. Faites toutes les répétitions d’un côté avant de changer.',
        en: 'Lower straight down by bending both knees until the back knee nearly touches the floor, then drive back up through the front foot. Complete all reps on one side before switching.',
      },
      cues: [
        kneeTracking,
        { fr: 'Le poids reste sur le pied avant, talon bien au sol.', en: 'Weight stays on the front foot, heel down.' },
        { fr: 'Bassin de face, sans basculer.', en: 'Pelvis square, without tilting.' },
      ],
      breathing: { fr: 'Inspirez en descendant, expirez en remontant.', en: 'Breathe in on the way down, out on the way up.' },
    },
    mistakes: [
      { fr: 'Pas trop court : le genou avant part loin devant et le talon décolle.', en: 'Stride too short: the front knee travels far forward and the heel lifts.' },
      { fr: 'Pousser avec la jambe arrière plutôt qu’avec la jambe avant.', en: 'Pushing with the back leg instead of the front leg.' },
      { fr: 'Bassin qui tourne ou s’affaisse d’un côté.', en: 'Pelvis rotating or dropping on one side.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Fente statique assistée', en: 'Assisted split squat' },
        description: { fr: 'Une main sur un mur ou une chaise, amplitude partielle.', en: 'One hand on a wall or chair, partial range.' },
        mastery: { fr: '3 × 12 par jambe, sans perte d’équilibre et sans gêne le lendemain.', en: '3 × 12 per leg without losing balance and without next-day discomfort.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Fente statique complète', en: 'Full split squat' },
        description: { fr: 'Sans appui, genou arrière jusqu’au sol.', en: 'No support, back knee down to the floor.' },
        mastery: { fr: '3 × 15 par jambe, symétrique entre les deux côtés.', en: '3 × 15 per leg, symmetrical between sides.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Squat bulgare', en: 'Bulgarian split squat' },
        description: { fr: 'Pied arrière posé sur une chaise ou un banc d’environ 40 cm.', en: 'Back foot resting on a chair or bench about 40 cm high.' },
        mastery: { fr: '3 × 12 par jambe au poids du corps, genou stable.', en: '3 × 12 per leg with body weight, stable knee.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Squat bulgare chargé', en: 'Loaded Bulgarian split squat' },
        description: { fr: 'Haltères en mains ou barre sur le dos.', en: 'Dumbbells in hand or barbell on the back.' },
        mastery: { fr: '3 × 8 par jambe avec environ 30 % du poids du corps au total.', en: '3 × 8 per leg with about 30% of body weight in total.' },
        dosage: { sets: 3, reps: [6, 10], tempo: '3-0-1', restSec: 120, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Squat bulgare lourd', en: 'Heavy Bulgarian split squat' },
        description: { fr: 'Charge lourde, remontée dynamique, récupération complète.', en: 'Heavy load, dynamic drive up, full recovery.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 6 restent faciles.', en: 'Maintenance level: add load when 4 × 6 stays easy.' },
        dosage: { sets: 4, reps: [5, 6], tempo: '2-0-X', restSec: 150, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Pied arrière au sol, puis sur une chaise stable pour la version bulgare.', en: 'Back foot on the floor, then on a stable chair for the Bulgarian version.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Pied arrière dans la sangle', en: 'Rear foot in the strap' },
        instructions: { fr: 'Pied arrière glissé dans la sangle de suspension réglée à hauteur de genou : plus d’équilibre demandé.', en: 'Back foot in the suspension strap set at knee height: more balance required.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, bras le long du corps.', en: 'One dumbbell in each hand, arms by your sides.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 4,
        name: { fr: 'Barre sur le dos', en: 'Barbell on the back' },
        instructions: { fr: 'Barre sur le haut du dos, idéalement dans une cage ; réservez-la aux charges lourdes.', en: 'Bar on the upper back, ideally in a rack; keep it for heavy loads.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise le renforcement combiné de la hanche et du genou ; les fentes font partie des exercices en charge proposés.',
            en: 'The 2019 JOSPT guideline recommends combined hip and knee strengthening; lunge-type exercises are among the weight-bearing options covered.',
          },
        },
        {
          refId: 'lack-2015',
          finding: {
            fr: 'Cette méta-analyse retrouve des preuves fortes qu’associer renforcement des muscles de la hanche et du quadriceps réduit la douleur et améliore la fonction à court terme.',
            en: 'This meta-analysis found strong evidence that combining hip and quadriceps strengthening reduces pain and improves function in the short term.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'lunge',
    family: 'lunge',
    name: { fr: 'Fente (arrière, avant, marchée)', en: 'Lunge (reverse, forward, walking)' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'glute-med', 'adductor-magnus', 'soleus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'La fente reproduit le freinage d’une jambe à l’atterrissage, comme à chaque foulée ou en descente. Elle entraîne le quadriceps à amortir et le bassin à rester stable.',
      en: 'The lunge reproduces single-leg braking on landing, as in every stride or when running downhill. It trains the quads to absorb load and the pelvis to stay stable.',
    },
    how: {
      setup: { fr: 'Debout, pieds écartés de la largeur des hanches, mains sur les hanches.', en: 'Stand with feet hip-width apart, hands on hips.' },
      movement: {
        fr: 'Faites un grand pas (vers l’arrière pour commencer), descendez jusqu’à ce que le genou arrière frôle le sol, puis revenez à la position de départ en poussant avec la jambe avant.',
        en: 'Take a long step (backwards to start with), lower until the back knee nearly touches the floor, then return to standing by pushing through the front leg.',
      },
      cues: [
        kneeTracking,
        { fr: 'Posez le pied avant doucement et contrôlez la descente.', en: 'Land the front foot softly and control the descent.' },
        { fr: 'Buste droit, bassin de face.', en: 'Upright torso, pelvis square.' },
      ],
    },
    mistakes: [
      { fr: 'Retomber lourdement sur le pied avant.', en: 'Landing heavily on the front foot.' },
      { fr: 'Genou avant qui rentre vers l’intérieur.', en: 'Front knee caving inwards.' },
      { fr: 'Pas trop étroit, comme sur une corde : perte d’équilibre.', en: 'Feet in a tightrope line: loss of balance.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Fente arrière', en: 'Reverse lunge' },
        description: { fr: 'Pas vers l’arrière : la plus facile à contrôler pour le genou avant.', en: 'Step backwards: the easiest to control for the front knee.' },
        mastery: { fr: '3 × 12 par jambe, contrôlées et sans douleur le lendemain.', en: '3 × 12 per leg, controlled and pain-free the next day.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Fente avant', en: 'Forward lunge' },
        description: { fr: 'Pas vers l’avant : le quadriceps freine davantage.', en: 'Step forwards: the quads brake more.' },
        mastery: { fr: '3 × 12 par jambe, atterrissage silencieux.', en: '3 × 12 per leg with quiet landings.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Fente marchée', en: 'Walking lunge' },
        description: { fr: 'Fentes enchaînées en avançant, sans pause entre les pas.', en: 'Continuous lunges while moving forwards, without pausing between steps.' },
        mastery: { fr: '3 × 20 pas au total, trajectoire du genou stable jusqu’au bout.', en: '3 × 20 total steps, stable knee path to the end.' },
        dosage: { sets: 3, reps: [16, 20], tempo: '2-0-1', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Fente marchée chargée', en: 'Loaded walking lunge' },
        description: { fr: 'Haltères en mains ou barre sur le dos.', en: 'Dumbbells in hand or barbell on the back.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 16 pas restent faciles.', en: 'Maintenance level: add load when 3 × 16 steps stays easy.' },
        dosage: { sets: 3, reps: [12, 16], tempo: '2-0-1', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Dans un couloir ou une pièce dégagée.', en: 'In a hallway or clear room.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, épaules basses.', en: 'One dumbbell in each hand, shoulders down.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre sur le dos', en: 'Barbell on the back' },
        instructions: { fr: 'Pour des fentes arrière sur place, avec une charge maîtrisée.', en: 'For stationary reverse lunges, with a controlled load.' },
      },
    ],
    precautions: [caution.painFlare, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise des exercices ciblant hanche et genou ; les fentes font partie des exercices en charge cités, aussi efficaces que les exercices sans mise en charge.',
            en: 'The 2019 JOSPT guideline recommends hip- and knee-targeted exercise; lunges are among the weight-bearing exercises cited, which work as well as non-weight-bearing ones.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'step-up',
    family: 'step-up',
    name: { fr: 'Montée sur marche', en: 'Step-up' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'glute-med', 'rectus-femoris', 'soleus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'performance', 'return'],
    perfGoals: ['strength'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Monter sur une marche reproduit la poussée d’une jambe, comme en côte à pied ou sur la pédale en danseuse. C’est un exercice de force simple qui demande aussi le contrôle du bassin.',
      en: 'Stepping up reproduces single-leg drive, as when running uphill or pedalling out of the saddle. It is a simple strength exercise that also demands pelvic control.',
    },
    how: {
      setup: { fr: 'Face à une marche ou un banc stable, un pied posé entièrement dessus.', en: 'Facing a stable step or bench, one whole foot placed on it.' },
      movement: {
        fr: 'Montez en poussant uniquement avec la jambe posée sur la marche, sans prendre d’élan avec la jambe du bas. Redescendez lentement, en contrôlant.',
        en: 'Step up by pushing only through the leg on the step, without pushing off the bottom leg. Lower slowly, under control.',
      },
      cues: [
        kneeTracking,
        { fr: 'Le pied du bas ne sert qu’à se reposer.', en: 'The bottom foot is only for resting.' },
        { fr: 'Tendez complètement la hanche en haut.', en: 'Fully extend the hip at the top.' },
      ],
    },
    mistakes: [
      { fr: 'Prendre appel avec la jambe du bas.', en: 'Pushing off the bottom leg.' },
      { fr: 'Pencher le buste très en avant pour monter.', en: 'Leaning the torso far forward to get up.' },
      { fr: 'Marche trop haute pour garder le contrôle du genou.', en: 'Step too high to keep control of the knee.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Marche basse', en: 'Low step' },
        description: { fr: 'Marche d’environ 20 cm, une main sur la rampe si besoin.', en: 'Step about 20 cm high, one hand on the rail if needed.' },
        mastery: { fr: '3 × 15 par jambe sans élan, genou aligné.', en: '3 × 15 per leg without momentum, knee aligned.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '2-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 2,
        name: { fr: 'Marche à hauteur de genou', en: 'Knee-height step' },
        description: { fr: 'Banc ou box d’environ 40 cm (cuisse proche de l’horizontale au départ).', en: 'Bench or box about 40 cm high (thigh near horizontal at the start).' },
        mastery: { fr: '3 × 12 par jambe, symétriques entre les deux côtés.', en: '3 × 12 per leg, symmetrical between sides.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1', restSec: 75, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Montée chargée', en: 'Loaded step-up' },
        description: { fr: 'Marche à hauteur de genou, haltères en mains.', en: 'Knee-height step, dumbbells in hand.' },
        mastery: { fr: '3 × 10 par jambe avec environ 25 % du poids du corps.', en: '3 × 10 per leg with about 25% of body weight.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        requires: ['step'],
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Montée lourde', en: 'Heavy step-up' },
        description: { fr: 'Charge lourde (haltères ou barre), montée dynamique, descente contrôlée.', en: 'Heavy load (dumbbells or barbell), dynamic step up, controlled descent.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 6 restent faciles.', en: 'Maintenance level: add load when 4 × 6 stays easy.' },
        dosage: { sets: 4, reps: [5, 6], tempo: '2-0-X', restSec: 150, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        requires: ['step'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur une marche d’escalier, puis une chaise stable ou un banc.', en: 'On a stair step, then a stable chair or bench.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, bras relâchés.', en: 'One dumbbell in each hand, arms relaxed.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre sur le dos', en: 'Barbell on the back' },
        instructions: { fr: 'Uniquement sur un box très stable et avec une charge maîtrisée.', en: 'Only on a very stable box and with a well-controlled load.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise des exercices de renforcement ciblant la hanche et le genou, en charge ou non, sans privilégier un exercice précis.',
            en: 'The 2019 JOSPT guideline recommends strengthening targeting the hip and knee, weight-bearing or not, without favouring one specific exercise.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'step-down',
    family: 'step-down',
    name: { fr: 'Descente de marche contrôlée', en: 'Controlled step-down' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['vastus-medialis', 'vastus-lateralis', 'vastus-intermedius'],
      secondary: ['glute-med', 'glute-max', 'soleus'],
    },
    zoom: 'leg-front',
    qualities: ['control', 'strength'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'Descendre une marche sur une jambe oblige le quadriceps à freiner et la hanche à garder le genou dans l’axe, comme à chaque réception de foulée. C’est un exercice clé du contrôle du genou.',
      en: 'Stepping down on one leg forces the quads to brake and the hip to keep the knee aligned, as at every running foot strike. It is a key knee-control exercise.',
    },
    how: {
      setup: { fr: 'Debout sur une marche, sur une jambe, l’autre pied dans le vide sur le côté ou devant.', en: 'Stand on a step on one leg, the other foot hanging off the side or front.' },
      movement: {
        fr: 'Pliez lentement la jambe d’appui pour venir effleurer le sol du talon de l’autre pied, sans vous y poser, puis remontez.',
        en: 'Slowly bend the standing leg until the heel of the other foot lightly touches the floor, without putting weight on it, then straighten back up.',
      },
      cues: [
        kneeTracking,
        { fr: 'Le bassin reste horizontal, sans s’affaisser côté libre.', en: 'The pelvis stays level, without dropping on the free side.' },
        { fr: 'Descente lente, 3 secondes.', en: 'Slow descent, 3 seconds.' },
      ],
    },
    mistakes: [
      { fr: 'Se laisser tomber et se poser sur le talon.', en: 'Dropping down and resting on the heel.' },
      { fr: 'Genou qui rentre et bassin qui bascule.', en: 'Knee caving in and pelvis dropping.' },
      { fr: 'Marche trop haute dès le départ.', en: 'Starting with a step that is too high.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Descente latérale, marche basse', en: 'Lateral step-down, low step' },
        description: { fr: 'Marche de 10 à 15 cm, pied libre sur le côté, main sur un appui.', en: '10–15 cm step, free foot to the side, hand on a support.' },
        mastery: { fr: '3 × 12 par jambe, genou dans l’axe sur toutes les répétitions.', en: '3 × 12 per leg, knee aligned on every rep.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 2,
        name: { fr: 'Descente latérale, marche haute', en: 'Lateral step-down, high step' },
        description: { fr: 'Marche d’environ 20 cm, sans appui.', en: 'Step about 20 cm high, no support.' },
        mastery: { fr: '3 × 15 par jambe, bassin horizontal.', en: '3 × 15 per leg, level pelvis.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Descente avant', en: 'Forward step-down' },
        description: { fr: 'Pied libre devant : le genou d’appui avance davantage, plus exigeant.', en: 'Free foot in front: the standing knee travels further forward, more demanding.' },
        mastery: { fr: '3 × 12 par jambe sur une marche de 20 cm, symétriques.', en: '3 × 12 per leg on a 20 cm step, symmetrical.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Descente avant chargée', en: 'Loaded forward step-down' },
        description: { fr: 'Haltères en mains, marche de 20 à 30 cm.', en: 'Dumbbells in hand, 20–30 cm step.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 10 restent contrôlées.', en: 'Maintenance level: add load when 3 × 10 stays controlled.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        requires: ['step'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur la dernière marche d’un escalier, une main près de la rampe.', en: 'On the bottom stair, one hand near the rail.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, ou un seul du côté opposé à la jambe d’appui.', en: 'One dumbbell in each hand, or a single one on the side opposite the standing leg.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise le renforcement combiné de la hanche et du genou ; la descente de marche fait partie des exercices en charge cités.',
            en: 'The 2019 JOSPT guideline recommends combined hip and knee strengthening; the step-down is among the weight-bearing exercises cited.',
          },
        },
        {
          refId: 'nascimento-2018',
          finding: {
            fr: 'Associer renforcement de la hanche et du genou réduit davantage la douleur et améliore davantage l’activité que le genou seul, avec des effets maintenus après la fin du programme.',
            en: 'Combining hip and knee strengthening reduces pain and improves activity more than knee work alone, with effects maintained after the programme ends.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'single-leg-squat',
    family: 'single-leg-squat',
    name: { fr: 'Squat unipodal', en: 'Single-leg squat' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-med', 'glute-max', 'adductor-magnus', 'soleus'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'En course, tout le poids du corps repose sur une jambe à chaque appui. Le squat unipodal développe la force du quadriceps et le contrôle de la hanche dans cette situation.',
      en: 'When running, your whole body weight rests on one leg at every step. The single-leg squat builds quad strength and hip control in that situation.',
    },
    how: {
      setup: { fr: 'Debout sur une jambe devant une chaise ou un banc, l’autre jambe tendue devant ou légèrement fléchie.', en: 'Stand on one leg in front of a chair or bench, the other leg straight in front or slightly bent.' },
      movement: {
        fr: 'Descendez lentement sur une jambe jusqu’à effleurer le siège, puis remontez sans élan ni appui de l’autre pied.',
        en: 'Lower slowly on one leg until you lightly touch the seat, then stand back up without momentum or help from the other foot.',
      },
      cues: [
        kneeTracking,
        { fr: 'Bassin horizontal, buste légèrement penché en avant.', en: 'Level pelvis, torso slightly leaning forward.' },
        { fr: 'Tout le pied reste au sol.', en: 'The whole foot stays on the floor.' },
      ],
    },
    mistakes: [
      { fr: 'Se laisser tomber sur le siège.', en: 'Dropping onto the seat.' },
      { fr: 'Genou qui part vers l’intérieur et bassin qui s’affaisse.', en: 'Knee drifting inwards and pelvis dropping.' },
      { fr: 'Balancer les bras ou le buste pour se relever.', en: 'Swinging the arms or torso to stand up.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Assis-debout unipodal, siège haut', en: 'Single-leg sit-to-stand, high seat' },
        description: { fr: 'Siège haut (ou coussin ajouté), une main sur un appui.', en: 'High seat (or add a cushion), one hand on a support.' },
        mastery: { fr: '3 × 8 par jambe sans appui de l’autre pied.', en: '3 × 8 per leg without help from the other foot.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-0-1', restSec: 75, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Squat unipodal sur chaise', en: 'Single-leg box squat to a chair' },
        description: { fr: 'Chaise standard (environ 45 cm), sans appui des mains.', en: 'Standard chair (about 45 cm), no hand support.' },
        mastery: { fr: '3 × 10 par jambe, genou dans l’axe, bassin stable.', en: '3 × 10 per leg, knee aligned, pelvis stable.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Squat unipodal sur support bas', en: 'Single-leg squat to a low box' },
        description: { fr: 'Support plus bas (environ 35 cm) ou descente plus profonde.', en: 'Lower box (about 35 cm) or a deeper descent.' },
        mastery: { fr: '3 × 8 par jambe, symétriques entre les deux côtés.', en: '3 × 8 per leg, symmetrical between sides.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Squat unipodal chargé', en: 'Loaded single-leg squat' },
        description: { fr: 'Même exercice avec un haltère tenu contre la poitrine.', en: 'Same exercise holding a dumbbell against the chest.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 8 restent contrôlées.', en: 'Maintenance level: add load when 3 × 8 stays controlled.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-0-1', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Devant une chaise stable, un mur ou un meuble à portée de main.', en: 'In front of a stable chair, with a wall or furniture within reach.' },
      },
      {
        id: 'suspension-assisted', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Assisté avec sangles (TRX)', en: 'Suspension-assisted (TRX)' },
        instructions: { fr: 'Tenez les sangles bras tendus pour vous aider à descendre plus bas en gardant l’alignement ; tirez de moins en moins avec les bras.', en: 'Hold the straps with straight arms to go deeper while keeping alignment; pull less and less with the arms.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Haltère tenu contre la poitrine, qui sert aussi de contrepoids.', en: 'Dumbbell held against the chest, which also acts as a counterweight.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise des exercices ciblant hanche et genou ; le squat unipodal fait partie des exercices en charge cités.',
            en: 'The 2019 JOSPT guideline recommends hip- and knee-targeted exercise; the single-leg squat is among the weight-bearing exercises cited.',
          },
        },
        {
          refId: 'willy-2011',
          finding: {
            fr: 'Chez 20 coureuses, 6 semaines de renforcement de la hanche avec apprentissage du squat unipodal ont amélioré le contrôle de la hanche et du bassin pendant ce squat, mais pas la mécanique de course.',
            en: 'In 20 female runners, 6 weeks of hip strengthening with single-leg squat training improved hip and pelvic control during that squat, but not running mechanics.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'leg-press',
    family: 'leg-press',
    name: { fr: 'Presse à cuisses', en: 'Leg press' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'adductor-magnus', 'rectus-femoris'],
    },
    zoom: 'leg-front',
    qualities: ['strength'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength'],
    preventionFor: ['bike', 'run'],
    why: {
      fr: 'La presse permet de charger lourdement les quadriceps et les fessiers sans contrainte d’équilibre ni charge sur le dos. Elle reproduit la poussée du pédalage et sert de base au travail de force lourde.',
      en: 'The leg press lets you load the quads and glutes heavily without balance demands or load on the back. It mirrors the pedal stroke and is a staple of heavy strength work.',
    },
    how: {
      setup: {
        fr: 'Assis dans la machine, dos et bassin collés au dossier, pieds à largeur de hanches au milieu de la plateforme.',
        en: 'Seated in the machine, back and pelvis against the backrest, feet hip-width apart in the middle of the platform.',
      },
      movement: {
        fr: 'Déverrouillez, laissez fléchir les genoux jusqu’à environ 90°, puis poussez la plateforme sans verrouiller les genoux en fin de mouvement.',
        en: 'Release the safety, let the knees bend to about 90°, then push the platform away without locking the knees at the end.',
      },
      cues: [
        kneeTracking,
        { fr: 'Le bas du dos reste en contact avec le dossier.', en: 'The lower back stays in contact with the backrest.' },
        { fr: 'Poussez avec tout le pied, talons compris.', en: 'Push with the whole foot, heels included.' },
      ],
      breathing: { fr: 'Expirez en poussant, inspirez en revenant.', en: 'Breathe out as you push, in as you return.' },
    },
    mistakes: [
      { fr: 'Descendre si bas que le bassin décolle du siège.', en: 'Going so deep that the pelvis lifts off the seat.' },
      { fr: 'Verrouiller brutalement les genoux en haut.', en: 'Snapping the knees straight at the top.' },
      { fr: 'Charge trop lourde au détriment de l’amplitude et du contrôle.', en: 'Load too heavy at the expense of range and control.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux jambes, charge modérée', en: 'Both legs, moderate load' },
        description: { fr: 'Charge permettant 15 répétitions avec de la marge, amplitude confortable.', en: 'Load allowing 15 reps with some margin, comfortable range.' },
        mastery: { fr: '3 × 15 sans gêne pendant ni le lendemain.', en: '3 × 15 without discomfort during or the next day.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-2', restSec: 90, perSide: false, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: { fr: 'Une jambe à la fois, au centre de la plateforme.', en: 'One leg at a time, centred on the platform.' },
        mastery: { fr: '3 × 12 par jambe avec la même charge des deux côtés.', en: '3 × 12 per leg with the same load on both sides.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-2', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Lourd et lent', en: 'Heavy slow resistance' },
        description: { fr: 'Charge progressivement augmentée, de 15 à 6 répétitions maximum au fil des semaines, 3 s à la descente et 3 s à la montée.', en: 'Load progressively increased from 15 down to 6 maximum reps over the weeks, 3 s down and 3 s up.' },
        mastery: { fr: '4 × 8 lents avec une charge lourde, sans douleur croissante le lendemain.', en: '4 × 8 slow reps with a heavy load, without increasing next-day pain.' },
        dosage: { sets: 4, reps: [6, 15], tempo: '3-0-3', restSec: 150, perSide: false, intensity: load('Charge permettant tout juste les répétitions prévues', 'Load that just allows the planned reps'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Force lourde', en: 'Heavy strength' },
        description: { fr: 'Charges lourdes, poussée rapide, récupération complète.', en: 'Heavy loads, fast push, full recovery.' },
        mastery: { fr: '4 × 5 avec environ 1,5 fois le poids du corps, technique stable.', en: '4 × 5 with about 1.5 times body weight, stable technique.' },
        dosage: { sets: 4, reps: [4, 6], tempo: '2-0-X', restSec: 180, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Force lourde, une jambe', en: 'Heavy strength, single leg' },
        description: { fr: 'Presse unilatérale lourde, poussée rapide : très proche de l’effort sur la pédale.', en: 'Heavy single-leg press, fast push: very close to the effort on the pedal.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 5 par jambe restent faciles.', en: 'Maintenance level: add load when 4 × 5 per leg stays easy.' },
        dosage: { sets: 4, reps: [4, 6], tempo: '2-0-X', restSec: 150, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 1,
        name: { fr: 'Presse à l’élastique, allongé', en: 'Lying band leg press' },
        instructions: { fr: 'Sur le dos, élastique long passé sous le pied et tenu dans les mains : poussez le pied vers le plafond en tendant la jambe.', en: 'Lying on your back, long band under the foot and held in the hands: push the foot towards the ceiling by straightening the leg.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Presse à cuisses (machine)', en: 'Leg press machine' },
        instructions: { fr: 'Presse inclinée ou horizontale ; réglez le dossier pour que le bassin reste au contact du siège.', en: 'Incline or horizontal press; set the backrest so the pelvis stays on the seat.' },
      },
    ],
    precautions: [caution.painFlare, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise le renforcement de la hanche et du genou, les exercices en charge et sans mise en charge étant d’efficacité comparable.',
            en: 'The 2019 JOSPT guideline recommends hip and knee strengthening, with weight-bearing and non-weight-bearing exercises being similarly effective.',
          },
        },
        {
          refId: 'kongsgaard-2009',
          finding: {
            fr: 'Chez 39 hommes atteints de tendinopathie rotulienne, 12 semaines de renforcement lourd et lent ont amélioré fonction et douleur, avec des résultats maintenus à 6 mois et la meilleure satisfaction.',
            en: 'In 39 men with patellar tendinopathy, 12 weeks of heavy slow resistance training improved function and pain, with results maintained at 6 months and the highest satisfaction.',
          },
        },
        {
          refId: 'ronnestad-2014',
          finding: {
            fr: 'Chez les cyclistes, l’ajout de musculation lourde à l’entraînement d’endurance a l’effet le plus net sur l’économie de pédalage et la performance.',
            en: 'In cyclists, adding heavy strength training to endurance training has the clearest effect on cycling economy and performance.',
          },
        },
        {
          refId: 'ronnestad-2010',
          finding: {
            fr: 'Chez 20 cyclistes entraînés, 12 semaines de musculation lourde des membres inférieurs (3 × 4 à 10 répétitions maximum, 2 fois par semaine) ont amélioré la puissance sur 40 minutes sans prise de poids.',
            en: 'In 20 well-trained cyclists, 12 weeks of heavy lower-body strength training (3 × 4–10 repetition maximum, twice a week) improved 40-minute power output without weight gain.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'leg-extension',
    family: 'knee-extension',
    name: { fr: 'Extension de genou (leg extension)', en: 'Knee extension (leg extension)' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['patellar-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'tendon-stiffness'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['bike'],
    why: {
      fr: 'L’extension de genou isole le quadriceps, le principal muscle du coup de pédale et de l’amorti en course. Elle permet de doser précisément la charge et l’amplitude quand le genou est sensible.',
      en: 'Knee extension isolates the quads, the main muscle of the pedal stroke and of shock absorption in running. It allows precise control of load and range when the knee is sensitive.',
    },
    how: {
      setup: { fr: 'Assis, dos contre le dossier, genoux au bord du siège, boudin ou élastique juste au-dessus de la cheville.', en: 'Seated, back against the backrest, knees at the edge of the seat, pad or band just above the ankle.' },
      movement: {
        fr: 'Tendez la jambe jusqu’à l’horizontale, marquez un temps d’arrêt, puis redescendez lentement.',
        en: 'Straighten the leg to horizontal, pause briefly, then lower slowly.',
      },
      cues: [
        { fr: 'Mouvement lent, sans élan.', en: 'Slow movement, no momentum.' },
        { fr: 'Contractez fort la cuisse en haut.', en: 'Squeeze the thigh hard at the top.' },
        { fr: 'Restez dans une amplitude confortable pour l’avant du genou.', en: 'Stay within a range that is comfortable for the front of the knee.' },
      ],
    },
    mistakes: [
      { fr: 'Lancer la charge et la laisser retomber.', en: 'Swinging the weight up and letting it drop.' },
      { fr: 'Décoller les fesses du siège.', en: 'Lifting the hips off the seat.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Amplitude réduite, sans charge', en: 'Reduced range, no load' },
        description: { fr: 'Assis sur une chaise, extension de 90° à environ 45° de flexion, maintien 2 s.', en: 'Seated on a chair, extend from 90° to about 45° of bend, hold 2 s.' },
        mastery: { fr: '3 × 20 par jambe sans gêne le lendemain.', en: '3 × 20 per leg without next-day discomfort.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-2-2', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Amplitude complète, résistance légère', en: 'Full range, light resistance' },
        description: { fr: 'Élastique ou machine légère, de la flexion à l’extension complète.', en: 'Band or light machine, from bent to fully straight.' },
        mastery: { fr: '3 × 15 par jambe sur toute l’amplitude.', en: '3 × 15 per leg through full range.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-1-2', restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Machine, charge modérée', en: 'Machine, moderate load' },
        description: { fr: 'Leg extension à la machine, deux jambes ou une jambe.', en: 'Leg extension machine, both legs or one leg.' },
        mastery: { fr: '3 × 12 avec une charge en hausse d’une semaine à l’autre.', en: '3 × 12 with load increasing week to week.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-2', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Lourd et lent', en: 'Heavy slow resistance' },
        description: { fr: 'Charge lourde, 3 s à la montée et 3 s à la descente.', en: 'Heavy load, 3 s up and 3 s down.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 8 lents restent faciles.', en: 'Maintenance level: add load when 4 × 8 slow reps stays easy.' },
        dosage: { sets: 4, reps: [6, 8], tempo: '3-0-3', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.threePerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Assis sur une chaise', en: 'Seated on a chair' },
        instructions: { fr: 'Sans charge, au poids de la jambe, avec un maintien en haut.', en: 'No load, using the weight of the leg, with a hold at the top.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique attaché au pied de la chaise et passé autour de la cheville ; changez d’élastique pour progresser.', en: 'Band tied to the chair leg and looped around the ankle; switch to a stronger band to progress.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine leg extension', en: 'Leg extension machine' },
        instructions: { fr: 'Alignez le genou avec l’axe de la machine ; une butée peut limiter l’amplitude au début.', en: 'Align the knee with the machine pivot; a range limiter can restrict the range at first.' },
      },
    ],
    precautions: [caution.painFlare, anteriorKneeRange],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'willy-2019',
          finding: {
            fr: 'La recommandation JOSPT 2019 préconise le renforcement du genou associé à celui de la hanche, les exercices sans mise en charge comme l’extension de genou étant aussi efficaces que les exercices en charge.',
            en: 'The 2019 JOSPT guideline recommends knee strengthening combined with hip work, with non-weight-bearing exercises such as knee extension being as effective as weight-bearing ones.',
          },
        },
        {
          refId: 'lack-2015',
          finding: {
            fr: 'Associer la rééducation de la hanche à celle du quadriceps a mieux réduit la douleur à un an que le quadriceps seul (preuve limitée) ; à court terme, l’association est soutenue par des preuves fortes.',
            en: 'Combining hip and quadriceps rehabilitation reduced pain at one year more than quadriceps work alone (limited evidence); in the short term the combination is supported by strong evidence.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'isometric-knee-extension',
    family: 'knee-extension',
    name: { fr: 'Extension de genou isométrique', en: 'Isometric knee extension' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['patellar-tendon', 'rectus-femoris', 'vastus-lateralis', 'vastus-medialis'],
      secondary: ['vastus-intermedius'],
    },
    zoom: 'leg-front',
    qualities: ['isometric', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Contracter le quadriceps sans bouger permet de charger le tendon rotulien et la cuisse de façon très contrôlée. C’est souvent bien toléré quand le genou est irritable, pour continuer à le solliciter.',
      en: 'Contracting the quads without moving loads the patellar tendon and thigh in a very controlled way. It is often well tolerated when the knee is irritable, so it can keep being loaded.',
    },
    how: {
      setup: { fr: 'Assis, genou fléchi d’environ 60° (un peu plus qu’à mi-chemin entre plié et tendu), cheville bloquée par un appui fixe, un élastique ou le boudin de la machine.', en: 'Seated, knee bent about 60° (a bit more than halfway between bent and straight), ankle blocked by a fixed support, a band or the machine pad.' },
      movement: {
        fr: 'Poussez la cheville vers l’avant comme pour tendre la jambe, sans que le genou bouge, et maintenez la contraction pendant la durée indiquée.',
        en: 'Push the ankle forwards as if straightening the leg, without the knee moving, and hold the contraction for the set time.',
      },
      cues: [
        { fr: 'Montez progressivement en intensité sur 2 à 3 secondes.', en: 'Build up the effort gradually over 2 to 3 seconds.' },
        { fr: 'Effort fort mais tenable jusqu’au bout du maintien.', en: 'Strong effort, but sustainable to the end of the hold.' },
      ],
      breathing: { fr: 'Respirez calmement pendant tout le maintien.', en: 'Breathe calmly throughout the hold.' },
    },
    mistakes: [
      { fr: 'Bloquer la respiration.', en: 'Holding the breath.' },
      { fr: 'Effort trop faible pour solliciter réellement le tendon.', en: 'Effort too low to really load the tendon.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie modérée', en: 'Moderate isometric' },
        description: { fr: 'Poussée contre un appui fixe (pied de table, élastique tendu), effort modéré.', en: 'Push against a fixed support (table leg, taut band), moderate effort.' },
        mastery: { fr: '5 × 30 s par jambe avec une gêne stable ou en baisse.', en: '5 × 30 s per leg with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Isométrie longue', en: 'Long isometric' },
        description: { fr: 'Maintiens de 45 s avec un effort plus élevé.', en: '45 s holds with a higher effort.' },
        mastery: { fr: '5 × 45 s par jambe sans augmentation de la douleur le lendemain.', en: '5 × 45 s per leg without increased pain the next day.' },
        dosage: { sets: 5, holdSec: 45, restSec: 90, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Isométrie lourde à la machine', en: 'Heavy machine isometric' },
        description: { fr: 'Machine leg extension bloquée à 60°, charge élevée tenue 45 s.', en: 'Leg extension machine held at 60°, heavy load held for 45 s.' },
        mastery: { fr: 'Passez aux exercices dynamiques lourds et lents quand ce niveau est bien toléré.', en: 'Move on to heavy slow dynamic work when this level is well tolerated.' },
        dosage: { sets: 5, holdSec: 45, restSec: 120, perSide: true, intensity: load('Charge élevée, tenue sans douleur croissante', 'Heavy load, held without increasing pain'), frequency: freq.daily },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un appui fixe', en: 'Against a fixed support' },
        instructions: { fr: 'Assis sur une chaise, cheville placée derrière le pied d’un meuble lourd ou d’un lit.', en: 'Seated on a chair, ankle placed behind the leg of a heavy piece of furniture or a bed.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Élastique fixé', en: 'Anchored band' },
        instructions: { fr: 'Élastique solide attaché derrière la chaise, tendu au maximum à 60° de flexion.', en: 'Strong band anchored behind the chair, fully stretched at 60° of knee bend.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine leg extension', en: 'Leg extension machine' },
        instructions: { fr: 'Montez la charge avec les deux jambes, puis maintenez sur une seule à 60° de flexion.', en: 'Lift the weight with both legs, then hold with one leg at 60° of knee bend.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'L’effet antidouleur immédiat de l’isométrie varie d’une personne à l’autre : son intérêt principal est de garder une charge tolérable.', en: 'The immediate pain-relieving effect of isometrics varies between people: their main value is to keep a tolerable load.' },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'rio-2015',
          finding: {
            fr: 'Chez 6 volleyeurs avec tendinopathie rotulienne, une séance de contractions isométriques a réduit la douleur pendant au moins 45 minutes, davantage que des contractions dynamiques, et augmenté la force du quadriceps.',
            en: 'In 6 volleyball players with patellar tendinopathy, one session of isometric contractions reduced pain for at least 45 minutes, more than dynamic contractions, and increased quadriceps strength.',
          },
        },
        {
          refId: 'van-ark-2016',
          finding: {
            fr: 'Chez 29 sportifs en pleine saison, 4 semaines d’exercices isométriques ou dynamiques ont toutes deux réduit la douleur du tendon rotulien, sans différence entre les deux.',
            en: 'In 29 in-season athletes, 4 weeks of isometric or dynamic exercise both reduced patellar tendon pain, with no difference between them.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'wall-sit',
    family: 'isometric-squat',
    name: { fr: 'Chaise contre le mur', en: 'Wall sit' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['glute-max', 'rectus-femoris', 'patellar-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['isometric', 'endurance'],
    objectives: ['pain', 'return', 'prevention'],
    why: {
      fr: 'Tenir la position assise contre un mur fait travailler les quadriceps sans mouvement ni impact. C’est une façon simple de charger le genou quand il est sensible, et d’entretenir l’endurance des cuisses.',
      en: 'Holding a seated position against a wall works the quads without movement or impact. It is a simple way to load a sensitive knee and to build thigh endurance.',
    },
    how: {
      setup: { fr: 'Dos plaqué contre un mur, pieds à environ 40 cm du mur, écartés de la largeur des hanches.', en: 'Back flat against a wall, feet about 40 cm from the wall, hip-width apart.' },
      movement: {
        fr: 'Glissez le long du mur jusqu’à l’angle de genou indiqué et tenez la position, puis remontez en glissant.',
        en: 'Slide down the wall to the indicated knee angle and hold, then slide back up.',
      },
      cues: [
        { fr: 'Genoux au-dessus des chevilles, pas au-delà des orteils.', en: 'Knees above the ankles, not past the toes.' },
        { fr: 'Poids sur les talons, dos collé au mur.', en: 'Weight on the heels, back against the wall.' },
      ],
      breathing: { fr: 'Respirez normalement, sans bloquer.', en: 'Breathe normally, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Pieds trop près du mur : genoux loin devant.', en: 'Feet too close to the wall: knees far forward.' },
      { fr: 'Mains appuyées sur les cuisses pour se soulager.', en: 'Hands pushing on the thighs for relief.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Chaise haute', en: 'High wall sit' },
        description: { fr: 'Genoux fléchis d’environ 45°, peu profond.', en: 'Knees bent about 45°, shallow.' },
        mastery: { fr: '5 × 45 s avec une gêne stable ou en baisse.', en: '5 × 45 s with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Chaise à 90°', en: 'Wall sit at 90°' },
        description: { fr: 'Cuisses à l’horizontale.', en: 'Thighs horizontal.' },
        mastery: { fr: '4 × 60 s sans douleur le lendemain.', en: '4 × 60 s without next-day pain.' },
        dosage: { sets: 4, holdSec: 45, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Chaise sur une jambe dominante', en: 'Single-leg biased wall sit' },
        description: { fr: 'Une jambe avancée, l’autre ne fait que toucher le sol : la jambe d’appui porte presque tout.', en: 'One leg forward, the other barely touching the floor: the standing leg carries almost everything.' },
        mastery: { fr: '4 × 40 s par jambe, symétriques.', en: '4 × 40 s per leg, symmetrical.' },
        dosage: { sets: 4, holdSec: 30, restSec: 60, perSide: true, intensity: rpe('7'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Chaise chargée', en: 'Loaded wall sit' },
        description: { fr: 'Haltères posés sur les cuisses, près des genoux.', en: 'Dumbbells resting on the thighs, near the knees.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 45 s restent faciles.', en: 'Maintenance level: add load when 4 × 45 s stays easy.' },
        dosage: { sets: 4, holdSec: 45, restSec: 90, perSide: false, intensity: rpe('7-8'), frequency: freq.threePerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Sur un mur lisse, chaussures antidérapantes.', en: 'On a smooth wall, wearing non-slip shoes.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Swiss ball dans le dos', en: 'Swiss ball behind the back' },
        instructions: { fr: 'Ballon coincé entre le bas du dos et le mur : la position est plus confortable et se règle facilement.', en: 'Ball wedged between the lower back and the wall: more comfortable and easy to adjust.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltères sur les cuisses', en: 'Dumbbells on the thighs' },
        instructions: { fr: 'Posez les haltères une fois en position, retirez-les avant de remonter.', en: 'Place the dumbbells once in position, remove them before standing up.' },
      },
    ],
    precautions: [caution.painFlare, anteriorKneeRange],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'rio-2015',
          finding: {
            fr: 'Dans cet essai sur la tendinopathie rotulienne, des contractions isométriques ont réduit la douleur pendant au moins 45 minutes ; la chaise contre le mur applique ce principe, sans avoir été étudiée directement.',
            en: 'In this patellar tendinopathy trial, isometric contractions reduced pain for at least 45 minutes; the wall sit applies this principle but has not been studied directly.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'spanish-squat',
    family: 'isometric-squat',
    name: { fr: 'Squat espagnol', en: 'Spanish squat' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['patellar-tendon', 'vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['rectus-femoris', 'glute-max'],
    },
    zoom: 'leg-front',
    qualities: ['isometric', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Une sangle derrière les genoux permet de s’asseoir en arrière avec les tibias verticaux : le quadriceps et le tendon rotulien travaillent fort, sans contrainte sur les chevilles. C’est un classique de la prise en charge du tendon rotulien.',
      en: 'A strap behind the knees lets you sit back with vertical shins: the quads and patellar tendon work hard without stressing the ankles. It is a staple of patellar tendon care.',
    },
    how: {
      setup: {
        fr: 'Élastique épais, sangle ou ceinture solide attaché à un poteau robuste et passé derrière les deux genoux. Reculez pour le tendre, pieds à largeur de hanches.',
        en: 'Thick band, strap or strong belt anchored to a sturdy post and placed behind both knees. Step back to tension it, feet hip-width apart.',
      },
      movement: {
        fr: 'Asseyez-vous en arrière en gardant les tibias verticaux, jusqu’à environ 60 à 90° de flexion de genou, et tenez la position.',
        en: 'Sit back while keeping the shins vertical, to about 60–90° of knee bend, and hold the position.',
      },
      cues: [
        { fr: 'Tibias verticaux, la sangle retient les genoux.', en: 'Vertical shins, the strap holds the knees.' },
        { fr: 'Buste droit, poids sur les talons.', en: 'Upright torso, weight on the heels.' },
      ],
      breathing: { fr: 'Respirez calmement pendant le maintien.', en: 'Breathe calmly during the hold.' },
    },
    mistakes: [
      { fr: 'Sangle insuffisamment tendue : les genoux avancent.', en: 'Strap not tight enough: the knees drift forward.' },
      { fr: 'Point d’ancrage instable.', en: 'Unstable anchor point.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Squat espagnol peu profond', en: 'Shallow Spanish squat' },
        description: { fr: 'Flexion de genou d’environ 45 à 60°.', en: 'Knee bend of about 45–60°.' },
        mastery: { fr: '5 × 45 s avec une gêne stable ou en baisse.', en: '5 × 45 s with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Squat espagnol profond', en: 'Deep Spanish squat' },
        description: { fr: 'Flexion de genou d’environ 90°.', en: 'Knee bend of about 90°.' },
        mastery: { fr: '5 × 45 s sans augmentation de la douleur le lendemain.', en: '5 × 45 s without increased pain the next day.' },
        dosage: { sets: 5, holdSec: 45, restSec: 90, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Squat espagnol chargé ou dynamique', en: 'Loaded or dynamic Spanish squat' },
        description: { fr: 'Haltère tenu contre la poitrine, ou lentes montées-descentes entre 45 et 90°.', en: 'Dumbbell held against the chest, or slow up-and-down reps between 45 and 90°.' },
        mastery: { fr: 'Passez aux exercices lourds et lents quand ce niveau est bien toléré.', en: 'Move on to heavy slow resistance when this level is well tolerated.' },
        dosage: { sets: 4, holdSec: 45, restSec: 90, perSide: false, intensity: load('Charge élevée, tenue sans douleur croissante', 'Heavy load, held without increasing pain'), frequency: freq.everyOtherDay },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'belt', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Ceinture ou sangle solide', en: 'Strong belt or strap' },
        instructions: { fr: 'Sangle non élastique bouclée autour d’un poteau ou d’un pied de table très lourd.', en: 'Non-stretch strap looped around a post or a very heavy table leg.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Élastique épais', en: 'Heavy band' },
        instructions: { fr: 'Élastique très résistant doublé si besoin, attaché à hauteur de genou.', en: 'Very strong band, doubled if needed, anchored at knee height.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 3,
        name: { fr: 'Sangles de suspension', en: 'Suspension straps' },
        instructions: { fr: 'Les deux poignées réunies derrière les genoux, sangles raccourcies au maximum.', en: 'Both handles joined behind the knees, straps shortened as much as possible.' },
      },
      {
        id: 'dumbbell', equipment: ['band', 'dumbbells'], loadable: true, rank: 4,
        name: { fr: 'Élastique et haltère', en: 'Band and dumbbell' },
        instructions: { fr: 'Haltère tenu contre la poitrine pour charger davantage.', en: 'Dumbbell held against the chest for more load.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Vérifiez la solidité du point d’ancrage avant chaque série.', en: 'Check the anchor point is secure before every set.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'malliaras-2015',
          finding: {
            fr: 'Cette synthèse recommande de développer progressivement la tolérance du tendon rotulien et de toute la chaîne musculaire à la charge ; le squat espagnol est un moyen courant d’y parvenir, sans étude directe.',
            en: 'This review recommends progressively building the load tolerance of the patellar tendon and the whole kinetic chain; the Spanish squat is a common way to do so, without direct study.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'decline-squat',
    family: 'decline-squat',
    name: { fr: 'Squat sur plan incliné', en: 'Decline squat' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['patellar-tendon', 'vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['rectus-femoris', 'glute-max'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Talons surélevés sur une planche inclinée, le squat sollicite davantage le quadriceps et le tendon rotulien. C’est le protocole excentrique de référence de la tendinopathie rotulienne.',
      en: 'With the heels raised on a slanted board, the squat loads the quads and patellar tendon more. It is the reference eccentric protocol for patellar tendinopathy.',
    },
    how: {
      setup: { fr: 'Debout sur une planche inclinée d’environ 25°, talons en haut de la pente, une main sur un appui.', en: 'Stand on a board slanted at about 25°, heels at the top of the slope, one hand on a support.' },
      movement: {
        fr: 'Descendez lentement (3 s) sur une jambe jusqu’à environ 60 à 90° de flexion de genou, puis remontez à l’aide des deux jambes.',
        en: 'Lower slowly (3 s) on one leg to about 60–90° of knee bend, then come back up using both legs.',
      },
      cues: [
        { fr: 'Buste droit, genou au-dessus des orteils.', en: 'Upright torso, knee over the toes.' },
        { fr: 'Descente lente sur la jambe à travailler, remontée sur les deux.', en: 'Slow lowering on the working leg, rise on both.' },
      ],
    },
    mistakes: [
      { fr: 'Remonter uniquement sur la jambe douloureuse au début.', en: 'Rising on the painful leg only at first.' },
      { fr: 'Descendre trop vite ou trop bas.', en: 'Lowering too fast or too deep.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux jambes, plan incliné', en: 'Both legs, decline board' },
        description: { fr: 'Squat lent sur les deux jambes, jusqu’à 60° de flexion.', en: 'Slow two-leg squat, down to 60° of knee bend.' },
        mastery: { fr: '3 × 15 lents avec une gêne stable.', en: '3 × 15 slow reps with stable discomfort.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-2', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Excentrique sur une jambe', en: 'Single-leg eccentric' },
        description: { fr: 'Descente sur une jambe, remontée sur deux : 3 × 15, deux fois par jour dans le protocole d’origine.', en: 'Lower on one leg, rise on two: 3 × 15, twice a day in the original protocol.' },
        mastery: { fr: 'Exercice réalisable sans douleur croissante : ajoutez de la charge.', en: 'Exercise feasible without increasing pain: add load.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 3,
        name: { fr: 'Excentrique lesté', en: 'Weighted eccentric' },
        description: { fr: 'Même protocole avec un sac à dos lesté ou un haltère, charge augmentée par paliers de 5 kg.', en: 'Same protocol with a weighted backpack or dumbbell, adding load in 5 kg steps.' },
        mastery: { fr: 'Niveau d’entretien : passez aux exercices lourds et lents et à la reprise progressive.', en: 'Maintenance level: move to heavy slow resistance and gradual return.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: load('Charge ajoutée par paliers de 5 kg quand c’est facile', 'Add load in 5 kg steps once it becomes easy'), frequency: freq.daily },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Planche inclinée maison', en: 'Home-made decline board' },
        instructions: { fr: 'Planche solide calée sur un livre épais ou une marche pour obtenir environ 25° de pente, posée contre un mur.', en: 'Sturdy board propped on a thick book or step to get about a 25° slope, against a wall.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou sac lesté', en: 'Dumbbell or weighted pack' },
        instructions: { fr: 'Ajoutez la charge quand la version au poids du corps est tolérée.', en: 'Add load when the bodyweight version is tolerated.' },
      },
      {
        id: 'gym', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Plan incliné en salle', en: 'Gym slant board' },
        instructions: { fr: 'Plan incliné de salle, avec haltères ou gilet lesté.', en: 'Gym slant board, with dumbbells or a weighted vest.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Le protocole d’origine tolère une douleur modérée pendant l’exercice ; elle ne doit pas s’aggraver d’une semaine à l’autre.', en: 'The original protocol tolerates moderate pain during exercise; it should not worsen from week to week.' },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'young-2005',
          finding: {
            fr: 'Chez 17 volleyeurs de haut niveau, le squat excentrique sur plan incliné à 25° a donné plus de chances d’amélioration fonctionnelle nette à 12 mois que le squat sur marche.',
            en: 'In 17 elite volleyball players, eccentric single-leg squats on a 25° decline board gave a greater likelihood of clear functional improvement at 12 months than squats on a step.',
          },
        },
        {
          refId: 'kongsgaard-2009',
          finding: {
            fr: 'Le squat excentrique sur plan incliné a amélioré fonction et douleur à 12 semaines, avec des résultats maintenus à 6 mois, comme le renforcement lourd et lent.',
            en: 'Eccentric decline squat training improved function and pain at 12 weeks, with results maintained at 6 months, as did heavy slow resistance training.',
          },
        },
        {
          refId: 'breda-2021',
          finding: {
            fr: 'Chez 76 patients, un programme de charge progressive (isométrie, force, puis exercices de détente et spécifiques) a donné de meilleurs résultats à 24 semaines que l’excentrique seul.',
            en: 'In 76 patients, a progressive tendon-loading programme (isometrics, strength, then energy-storage and sport-specific work) gave better 24-week results than eccentric training alone.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'terminal-knee-extension',
    family: 'terminal-knee-extension',
    name: { fr: 'Extension terminale du genou à l’élastique', en: 'Banded terminal knee extension' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['vastus-medialis', 'vastus-lateralis'],
      secondary: ['vastus-intermedius', 'rectus-femoris', 'patellar-tendon'],
    },
    zoom: 'leg-front',
    qualities: ['control', 'endurance'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Les derniers degrés d’extension du genou sont sollicités à chaque appui de course et en fin de poussée sur la pédale. Cet exercice réveille le quadriceps dans cette zone, avec très peu de contrainte sur la rotule.',
      en: 'The last degrees of knee extension are used at every running step and at the end of the pedal stroke. This exercise wakes up the quads in that range, with very little stress on the kneecap.',
    },
    how: {
      setup: { fr: 'Debout, élastique attaché bas devant vous et passé derrière le genou, genou légèrement fléchi.', en: 'Standing, band anchored low in front of you and looped behind the knee, knee slightly bent.' },
      movement: {
        fr: 'Tendez complètement le genou contre la résistance de l’élastique, tenez 2 secondes en contractant la cuisse, puis relâchez lentement.',
        en: 'Fully straighten the knee against the band, hold 2 seconds while squeezing the thigh, then release slowly.',
      },
      cues: [
        { fr: 'Le pied reste à plat, seul le genou bouge.', en: 'The foot stays flat, only the knee moves.' },
        { fr: 'Contractez fort la cuisse en extension.', en: 'Squeeze the thigh hard when straight.' },
      ],
    },
    mistakes: [
      { fr: 'Verrouiller brutalement le genou en arrière.', en: 'Snapping the knee back into lock.' },
      { fr: 'Élastique trop faible pour sentir le quadriceps travailler.', en: 'Band too light to feel the quads working.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Contraction du quadriceps assis', en: 'Seated quad set' },
        description: { fr: 'Assis jambes tendues, serviette roulée sous le genou : écrasez la serviette en contractant la cuisse, 5 s.', en: 'Sitting with legs straight, rolled towel under the knee: press the towel down by tightening the thigh, 5 s.' },
        mastery: { fr: '3 × 15 contractions de 5 s, cuisse bien ferme.', en: '3 × 15 contractions of 5 s, thigh firm.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '1-5-1', restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Debout, élastique léger', en: 'Standing, light band' },
        description: { fr: 'Extension terminale debout avec un élastique léger.', en: 'Standing terminal extension with a light band.' },
        mastery: { fr: '3 × 20 par jambe sans gêne.', en: '3 × 20 per leg without discomfort.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-2-1', restSec: 45, perSide: true, intensity: rir('3'), frequency: freq.daily },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Debout, élastique fort', en: 'Standing, strong band' },
        description: { fr: 'Élastique plus résistant, maintien de 3 s en extension.', en: 'Stronger band, 3 s hold when straight.' },
        mastery: { fr: '3 × 15 par jambe avec un élastique fort.', en: '3 × 15 per leg with a strong band.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-3-1', restSec: 45, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 4,
        name: { fr: 'Sur une jambe, élastique fort', en: 'Single-leg stance, strong band' },
        description: { fr: 'Même exercice en appui sur la seule jambe travaillée.', en: 'Same exercise standing on the working leg only.' },
        mastery: { fr: 'Niveau d’entretien : poursuivez en complément des exercices de force.', en: 'Maintenance level: continue alongside strength exercises.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-3-1', restSec: 45, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Serviette sous le genou', en: 'Towel under the knee' },
        instructions: { fr: 'Contraction du quadriceps assis ou allongé, genou sur une serviette roulée.', en: 'Quad set sitting or lying, knee on a rolled towel.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique attaché au pied d’un meuble lourd ou coincé dans une porte, à hauteur de genou.', en: 'Band tied to a heavy piece of furniture or shut in a door, at knee height.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Sangle de cheville de la poulie passée derrière le genou.', en: 'Cable ankle strap placed behind the knee.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'straight-leg-raise',
    family: 'straight-leg-raise',
    name: { fr: 'Élévation de jambe tendue', en: 'Straight-leg raise' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-medialis'],
      secondary: ['iliopsoas', 'vastus-lateralis', 'vastus-intermedius'],
    },
    zoom: 'leg-front',
    qualities: ['control', 'endurance'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Lever la jambe tendue fait travailler le quadriceps sans plier le genou, donc sans compression de la rotule. C’est un point de départ quand presque tout mouvement de flexion est gênant.',
      en: 'Raising the straight leg works the quads without bending the knee, so without compressing the kneecap. It is a starting point when almost any bending is uncomfortable.',
    },
    how: {
      setup: { fr: 'Allongé sur le dos, la jambe à travailler tendue, l’autre pliée pied au sol.', en: 'Lying on your back, the working leg straight, the other bent with the foot on the floor.' },
      movement: {
        fr: 'Contractez la cuisse pour verrouiller le genou, levez la jambe tendue jusqu’à la hauteur de l’autre genou, tenez 2 s, puis redescendez lentement.',
        en: 'Tighten the thigh to lock the knee, raise the straight leg to the height of the other knee, hold 2 s, then lower slowly.',
      },
      cues: [
        { fr: 'Le genou reste parfaitement tendu.', en: 'The knee stays perfectly straight.' },
        { fr: 'Le bas du dos reste au sol.', en: 'The lower back stays on the floor.' },
      ],
    },
    mistakes: [
      { fr: 'Laisser le genou se plier en montant.', en: 'Letting the knee bend on the way up.' },
      { fr: 'Lancer la jambe et la laisser retomber.', en: 'Swinging the leg up and dropping it.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Élévation simple', en: 'Basic raise' },
        description: { fr: 'Contraction du quadriceps puis élévation, au poids de la jambe.', en: 'Quad squeeze then raise, using the weight of the leg.' },
        mastery: { fr: '3 × 15 par jambe sans fléchir le genou.', en: '3 × 15 per leg without the knee bending.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '2-2-2', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Élévation avec maintien', en: 'Raise with hold' },
        description: { fr: 'Maintien de 5 s en haut à chaque répétition.', en: '5 s hold at the top of each rep.' },
        mastery: { fr: '3 × 12 par jambe avec 5 s de maintien.', en: '3 × 12 per leg with a 5 s hold.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-5-2', restSec: 45, perSide: true, intensity: rir('3'), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Élévation contre résistance', en: 'Resisted raise' },
        description: { fr: 'Élastique à la cheville ou poulie basse.', en: 'Band at the ankle or low cable.' },
        mastery: { fr: 'Passez aux exercices en charge (squat, descente de marche) quand ce niveau est facile.', en: 'Move on to weight-bearing exercises (squat, step-down) when this level is easy.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '2-2-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Sur un tapis, tête posée.', en: 'On a mat, head resting.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique à la cheville', en: 'Band at the ankle' },
        instructions: { fr: 'Boucle élastique autour des deux chevilles, ou élastique attaché au pied d’un meuble.', en: 'Loop band around both ankles, or band tied to a furniture leg.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Allongé, sangle de cheville reliée à la poulie basse.', en: 'Lying down, ankle strap attached to the low cable.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'En cas de douleur lombaire, gardez l’autre genou plié et le bas du dos plaqué au sol.', en: 'If your lower back hurts, keep the other knee bent and the lower back flat on the floor.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'reverse-nordic',
    family: 'reverse-nordic',
    name: { fr: 'Reverse nordic', en: 'Reverse Nordic' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis', 'vastus-intermedius'],
      secondary: ['patellar-tendon', 'rectus-abdominis'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'mobility'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'À genoux, se pencher en arrière en freinant fait travailler le quadriceps en position allongée, comme lors de la descente en course. Il améliore aussi la souplesse du droit fémoral, souvent raide chez les cyclistes.',
      en: 'Kneeling and leaning back under control works the quads in a lengthened position, as in downhill running. It also improves rectus femoris flexibility, often tight in cyclists.',
    },
    how: {
      setup: { fr: 'À genoux sur un tapis, genoux écartés de la largeur des hanches, buste droit, hanches tendues.', en: 'Kneeling on a mat, knees hip-width apart, torso upright, hips straight.' },
      movement: {
        fr: 'Penchez-vous lentement en arrière d’un bloc, des genoux à la tête, aussi loin que vous contrôlez, puis revenez en contractant les cuisses.',
        en: 'Lean back slowly in one piece, from knees to head, as far as you can control, then return by tightening the thighs.',
      },
      cues: [
        { fr: 'Hanches tendues : ne vous asseyez pas sur les talons.', en: 'Hips straight: do not sit back on the heels.' },
        { fr: 'Abdominaux serrés, dos neutre.', en: 'Abs braced, neutral back.' },
      ],
    },
    mistakes: [
      { fr: 'Plier les hanches et s’asseoir vers les talons.', en: 'Bending at the hips and sitting towards the heels.' },
      { fr: 'Cambrer le bas du dos.', en: 'Arching the lower back.' },
      { fr: 'Amplitude trop grande trop tôt.', en: 'Too much range too soon.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Amplitude courte', en: 'Short range' },
        description: { fr: 'Inclinaison en arrière d’environ 20 à 30° seulement.', en: 'Lean back only about 20–30°.' },
        mastery: { fr: '3 × 10 contrôlées, sans gêne au genou le lendemain.', en: '3 × 10 controlled reps, no knee discomfort the next day.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Amplitude moyenne', en: 'Medium range' },
        description: { fr: 'Inclinaison jusqu’à environ 45°.', en: 'Lean back to about 45°.' },
        mastery: { fr: '3 × 10 à 45°, retour fluide.', en: '3 × 10 at 45°, smooth return.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Grande amplitude', en: 'Full range' },
        description: { fr: 'Aussi loin que contrôlé, jusqu’à presque toucher le sol de la tête.', en: 'As far as controlled, almost touching the floor with the head.' },
        mastery: { fr: '3 × 8 en grande amplitude.', en: '3 × 8 through full range.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '4-0-2', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Lesté', en: 'Weighted' },
        description: { fr: 'Disque ou haltère tenu contre la poitrine.', en: 'Plate or dumbbell held against the chest.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 8 restent contrôlées.', en: 'Maintenance level: add load when 3 × 8 stays controlled.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '4-0-2', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis épais ou un coussin sous les genoux.', en: 'On a thick mat or cushion under the knees.' },
      },
      {
        id: 'band-assisted', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Assisté à l’élastique', en: 'Band-assisted' },
        instructions: { fr: 'Élastique attaché devant vous en hauteur et tenu contre la poitrine : il aide au retour. Réduisez l’aide au fil des séances.', en: 'Band anchored high in front of you and held against the chest: it helps you come back up. Reduce the assistance over sessions.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Lesté', en: 'Weighted' },
        instructions: { fr: 'Haltère ou disque contre la poitrine pour les niveaux avancés.', en: 'Dumbbell or plate against the chest for advanced levels.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Exercice exigeant pour l’avant du genou : à éviter tant que la douleur rotulienne ou tendineuse est vive.', en: 'Demanding for the front of the knee: avoid while kneecap or tendon pain is high.' },
    ],
    contraindications: [
      { fr: 'Appui sur les genoux douloureux (bursite, choc récent sur le genou).', en: 'Painful kneeling (bursitis, recent knock to the knee).' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'backward-sled-drag',
    family: 'backward-walk',
    name: { fr: 'Marche arrière tractée (traîneau ou élastique)', en: 'Backward sled drag' },
    sports: ['run', 'bike'],
    zones: ['knee', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['vastus-medialis', 'vastus-lateralis', 'vastus-intermedius', 'rectus-femoris'],
      secondary: ['patellar-tendon', 'soleus', 'tibialis-anterior'],
    },
    zoom: 'leg-front',
    qualities: ['endurance', 'strength'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['bike'],
    why: {
      fr: 'En marchant à reculons, le quadriceps travaille en continu, genou fléchi, sans phase de freinage ni impact. C’est un bon moyen de faire beaucoup de volume pour la cuisse quand le genou supporte mal les squats ou la course.',
      en: 'Walking backwards keeps the quads working continuously with a bent knee, without braking or impact. It is a good way to build a lot of thigh volume when the knee tolerates squats or running poorly.',
    },
    how: {
      setup: {
        fr: 'Face au traîneau ou au point d’ancrage, sangle ou poignées en mains, buste légèrement penché en arrière, genoux fléchis.',
        en: 'Facing the sled or anchor point, strap or handles in hand, torso slightly leaning back, knees bent.',
      },
      movement: {
        fr: 'Reculez à petits pas en posant d’abord l’avant-pied et en poussant le sol devant vous, genoux toujours fléchis, à rythme régulier.',
        en: 'Step backwards with short steps, landing on the forefoot first and pushing the ground away in front of you, knees always bent, at a steady pace.',
      },
      cues: [
        { fr: 'Petits pas rapides, genoux au-dessus ou devant les orteils.', en: 'Short, quick steps, knees over or ahead of the toes.' },
        { fr: 'Sentez la cuisse travailler à chaque poussée.', en: 'Feel the thigh working with every push.' },
        { fr: 'Regardez derrière vous ou dégagez le passage avant de commencer.', en: 'Look behind you or clear the path before starting.' },
      ],
    },
    mistakes: [
      { fr: 'Tendre les genoux et tirer avec le dos.', en: 'Straightening the knees and pulling with the back.' },
      { fr: 'Charge trop lourde : les pas deviennent saccadés.', en: 'Load too heavy: the steps become jerky.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Marche arrière à plat', en: 'Backward walking on the flat' },
        description: { fr: 'Marche à reculons sur terrain plat, genoux fléchis en permanence.', en: 'Walking backwards on flat ground, knees bent throughout.' },
        mastery: { fr: '4 × 60 s sans gêne au genou le lendemain.', en: '4 × 60 s without next-day knee discomfort.' },
        dosage: { sets: 4, holdSec: 45, restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Marche arrière en montée', en: 'Backward walking uphill' },
        description: { fr: 'À reculons dans une côte douce ou sur un tapis incliné.', en: 'Backwards up a gentle hill or on an inclined treadmill.' },
        mastery: { fr: '5 × 60 s en côte, rythme régulier.', en: '5 × 60 s uphill at a steady pace.' },
        dosage: { sets: 5, holdSec: 60, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Traction légère', en: 'Light drag' },
        description: { fr: 'Traîneau peu chargé ou élastique fort attaché devant vous.', en: 'Lightly loaded sled or strong band anchored in front of you.' },
        mastery: { fr: '6 × 20 m (ou 30 s) avec un pas fluide.', en: '6 × 20 m (or 30 s) with smooth steps.' },
        dosage: { sets: 6, holdSec: 30, restSec: 60, perSide: false, intensity: rpe('7'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Traction lourde', en: 'Heavy drag' },
        description: { fr: 'Traîneau chargé, cuisses brûlantes en fin de série.', en: 'Loaded sled, thighs burning by the end of the set.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 6 × 20 m restent fluides.', en: 'Maintenance level: add load when 6 × 20 m stays smooth.' },
        dosage: { sets: 6, holdSec: 30, restSec: 90, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Marche arrière', en: 'Backward walking' },
        instructions: { fr: 'Dans un couloir dégagé, une allée ou une côte douce sans obstacle.', en: 'In a clear hallway, path or gentle hill without obstacles.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique ancré', en: 'Anchored band' },
        instructions: { fr: 'Élastique long attaché à un poteau, passé autour de la taille ou tenu en mains : reculez jusqu’à forte tension, puis faites de petits pas sur place.', en: 'Long band tied to a post, around the waist or held in the hands: walk back until it is very taut, then take small steps in place.' },
      },
      {
        id: 'sled', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Traîneau', en: 'Sled' },
        instructions: { fr: 'Traîneau de salle avec sangle ou poignées, sur une piste dégagée.', en: 'Gym sled with a strap or handles, on a clear track.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Vérifiez que l’espace derrière vous est libre : risque de chute en marche arrière.', en: 'Make sure the space behind you is clear: walking backwards carries a fall risk.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),
] satisfies ReturnType<typeof defineExercise>[];
