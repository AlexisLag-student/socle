/**
 * Exercices — cuisse : ischio-jambiers et adducteurs (skill add-exercise).
 * Exercices réservés de la zone (catalog.ts) : romanian-deadlift, single-leg-deadlift,
 * nordic-hamstring, copenhagen-adductor, adductor-squeeze.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

const hamstrings = ['biceps-femoris', 'semitendinosus', 'semimembranosus'] as const;

export default [
  // ===========================================================================
  // ISCHIO-JAMBIERS — charnière de hanche
  // ===========================================================================
  defineExercise({
    id: 'romanian-deadlift',
    family: 'hip-hinge-bilateral',
    name: { fr: 'Soulevé de terre jambes tendues (roumain)', en: 'Romanian deadlift' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings, 'glute-max'],
      secondary: ['adductor-magnus', 'erector-spinae'],
    },
    zoom: 'leg-back',
    qualities: ['strength'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les ischio-jambiers et les fessiers étendent la hanche : ils propulsent le corps à chaque foulée et tirent la pédale vers l’arrière en bas du coup de pédale. Les renforcer en position allongée les prépare aux fortes tensions du sprint.',
      en: 'The hamstrings and glutes extend the hip: they drive the body forward at every stride and sweep the pedal back at the bottom of the stroke. Strengthening them at long lengths prepares them for the high tension of sprinting.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds largeur de hanches, genoux légèrement fléchis, charge tenue devant les cuisses, dos droit.',
        en: 'Stand with feet hip-width apart, knees slightly bent, load held in front of the thighs, back flat.',
      },
      movement: {
        fr: 'Poussez les fesses vers l’arrière en penchant le buste, la charge glissant le long des cuisses, jusqu’à sentir une forte tension derrière les cuisses (souvent sous les genoux). Remontez en poussant les hanches vers l’avant.',
        en: 'Push your hips back while tilting the trunk forward, sliding the load down the thighs, until you feel strong tension at the back of the thighs (often below the knees). Come back up by driving the hips forward.',
      },
      cues: [
        { fr: 'Le mouvement vient des hanches, pas du dos.', en: 'The movement comes from the hips, not the back.' },
        { fr: 'Genoux légèrement fléchis et fixes pendant toute la série.', en: 'Knees slightly bent and fixed for the whole set.' },
        { fr: 'Charge collée aux jambes.', en: 'Keep the load close to your legs.' },
        { fr: 'Descente lente, remontée franche.', en: 'Slow on the way down, firm on the way up.' },
      ],
      breathing: {
        fr: 'Inspirez et gainez avant de descendre, expirez en fin de remontée.',
        en: 'Breathe in and brace before lowering, breathe out at the top.',
      },
    },
    mistakes: [
      { fr: 'Arrondir le bas du dos pour descendre plus bas.', en: 'Rounding the lower back to go lower.' },
      { fr: 'Plier les genoux comme dans un squat.', en: 'Bending the knees as in a squat.' },
      { fr: 'Laisser la charge s’éloigner des jambes.', en: 'Letting the load drift away from the legs.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Charnière au poids du corps', en: 'Bodyweight hip hinge' },
        description: {
          fr: 'Mouvement sans charge, un bâton le long du dos (tête, haut du dos et bas du dos en contact), pour apprendre à basculer depuis les hanches.',
          en: 'Unloaded movement with a stick along the back (head, upper back and lower back in contact), to learn to hinge from the hips.',
        },
        mastery: {
          fr: '3 × 15 répétitions sans que le bâton quitte le dos.',
          en: '3 × 15 reps without the stick leaving your back.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Charge légère', en: 'Light load' },
        description: {
          fr: 'Haltères, kettlebell, barre légère ou élastique sous les pieds, en pleine amplitude contrôlée.',
          en: 'Dumbbells, kettlebell, light barbell or a band under the feet, through a controlled full range.',
        },
        mastery: {
          fr: '3 × 12 répétitions avec la même technique qu’au poids du corps et sans gêne le lendemain.',
          en: '3 × 12 reps with the same technique as bodyweight and no discomfort the next day.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 90, perSide: false, intensity: rir('3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Charge modérée', en: 'Moderate load' },
        description: {
          fr: 'Charge qui permet 8 à 10 répétitions propres, descente lente en 3 secondes.',
          en: 'Load allowing 8 to 10 clean reps, lowering over 3 seconds.',
        },
        mastery: {
          fr: '3 × 10 avec environ la moitié du poids du corps (haltères ou barre), dos neutre jusqu’à la dernière répétition.',
          en: '3 × 10 with about half your body weight (dumbbells or barbell), neutral back until the last rep.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 120, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Charge lourde, descente accentuée', en: 'Heavy load, emphasised lowering' },
        description: {
          fr: 'Charge lourde, descente lente en 4 secondes jusqu’à la tension maximale tolérée, remontée dynamique.',
          en: 'Heavy load, slow 4-second lowering to the maximum tolerated tension, dynamic return.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 4 × 6 deviennent faciles.',
          en: 'Maintenance level: increase the load when 4 × 6 feels easy.',
        },
        dosage: { sets: 4, reps: [5, 8], tempo: '4-0-1', restSec: 150, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps (bâton)', en: 'Bodyweight (stick)' },
        instructions: {
          fr: 'Un manche à balai le long du dos sert de repère. Pour progresser sans charge, passez au soulevé de terre sur une jambe.',
          en: 'A broomstick along your back acts as a guide. To progress without load, move on to the single-leg deadlift.',
        },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: {
          fr: 'Élastique sous les pieds, extrémités en mains : la résistance augmente en fin de remontée.',
          en: 'Band under your feet, ends in your hands: resistance increases near the top.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltères ou kettlebell', en: 'Dumbbells or kettlebell' },
        instructions: {
          fr: 'Une haltère dans chaque main ou une kettlebell à deux mains, devant les cuisses.',
          en: 'One dumbbell in each hand or a kettlebell in both hands, in front of the thighs.',
        },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 4,
        name: { fr: 'Barre', en: 'Barbell' },
        instructions: {
          fr: 'Partez debout barre en mains (sortie d’un rack), prise un peu plus large que les hanches.',
          en: 'Start standing with the bar in hand (taken from a rack), grip slightly wider than the hips.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'En cas de douleur du bas du dos, réduisez l’amplitude et la charge et revoyez la technique.',
        en: 'If your lower back hurts, reduce range and load and review your technique.',
      },
      {
        fr: 'Douleur à l’os de la fesse (tendon des ischios) : commencez par une amplitude réduite, la flexion de hanche importante peut l’irriter.',
        en: 'Pain at the sitting bone (hamstring tendon): start with a reduced range, as deep hip flexion can irritate it.',
      },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'crawford-2025',
          finding: {
            fr: 'Chez 32 jeunes adultes, 6 semaines de soulevé de terre roumain à descente accentuée ont allongé les faisceaux du biceps fémoral (environ 9 %) et augmenté la section des ischios autant que le Nordic.',
            en: 'In 32 young adults, 6 weeks of eccentrically biased Romanian deadlifts lengthened biceps femoris fascicles (about 9%) and increased hamstring cross-sectional area as much as the Nordic exercise.',
          },
        },
        {
          refId: 'bourne-2017',
          finding: {
            fr: 'Chez 30 sportifs, 10 semaines d’un exercice d’extension de hanche (différent du soulevé de terre roumain, mais du même type) ont allongé les faisceaux du biceps fémoral autant que le Nordic et semblaient favoriser davantage son hypertrophie.',
            en: 'In 30 athletes, 10 weeks of a hip extension exercise (not the Romanian deadlift itself, but the same movement type) lengthened biceps femoris fascicles as much as the Nordic exercise and appeared to better promote its hypertrophy.',
          },
        },
        {
          refId: 'coratella-2022',
          finding: {
            fr: 'Chez 10 culturistes, le soulevé de terre roumain sollicitait davantage le semi-tendineux que le soulevé jambes tendues, et la version sur une marche augmentait l’activité de toute la chaîne postérieure.',
            en: 'In 10 bodybuilders, the Romanian deadlift activated the semitendinosus more than the stiff-leg deadlift, and the step version increased activity across the whole posterior chain.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'single-leg-deadlift',
    family: 'hip-hinge-unilateral',
    name: { fr: 'Soulevé de terre sur une jambe', en: 'Single-leg deadlift' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings, 'glute-max'],
      secondary: ['glute-med', 'adductor-magnus', 'erector-spinae'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'La course se fait toujours sur une jambe : ischios et fessiers doivent y contrôler la hanche et le bassin. Sur le vélo, cette stabilité limite les mouvements parasites du bassin sur la selle.',
      en: 'Running always happens on one leg: hamstrings and glutes must control the hip and pelvis. On the bike, this stability limits unwanted pelvic movement on the saddle.',
    },
    how: {
      setup: {
        fr: 'Debout sur une jambe, genou d’appui légèrement fléchi, bassin de face.',
        en: 'Stand on one leg, standing knee slightly bent, pelvis square.',
      },
      movement: {
        fr: 'Penchez le buste vers l’avant en tendant la jambe libre vers l’arrière, jusqu’à ce que buste et jambe soient presque à l’horizontale. Revenez debout en serrant la fesse de la jambe d’appui.',
        en: 'Tilt your trunk forward while reaching the free leg back, until trunk and leg are almost horizontal. Return upright by squeezing the glute of the standing leg.',
      },
      cues: [
        { fr: 'Bassin de face : la hanche de la jambe libre ne s’ouvre pas.', en: 'Keep the pelvis square: the free-leg hip does not open up.' },
        { fr: 'Le genou d’appui reste dans l’axe du pied.', en: 'The standing knee stays in line with the foot.' },
        { fr: 'Dos long, de la tête au talon arrière.', en: 'Long back, from head to back heel.' },
      ],
    },
    mistakes: [
      { fr: 'Tourner le bassin vers l’extérieur.', en: 'Rotating the pelvis outwards.' },
      { fr: 'Arrondir le dos pour aller plus bas.', en: 'Rounding the back to reach lower.' },
      { fr: 'Plier fortement le genou d’appui (le mouvement devient un squat).', en: 'Bending the standing knee a lot (the movement becomes a squat).' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Pied arrière en appui léger', en: 'Kickstand' },
        description: {
          fr: 'Pointe du pied arrière posée au sol pour l’équilibre, 80 % du poids sur la jambe avant.',
          en: 'Toes of the back foot on the floor for balance, 80% of the weight on the front leg.',
        },
        mastery: {
          fr: '3 × 12 par jambe, bassin de face, sans douleur le lendemain.',
          en: '3 × 12 per leg, pelvis square, no pain the next day.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Une jambe, bras tendus (« diver »)', en: 'Single leg, arms reaching (“diver”)' },
        description: {
          fr: 'Sur une jambe, bras tendus vers l’avant pendant que la jambe libre part vers l’arrière, comme le « diver » du protocole d’Askling.',
          en: 'On one leg, arms reaching forward while the free leg reaches back, like the “diver” of the Askling protocol.',
        },
        mastery: {
          fr: '3 × 10 par jambe sans poser le pied ni perdre l’alignement du bassin.',
          en: '3 × 10 per leg without touching down or losing pelvic alignment.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Une jambe, chargé', en: 'Single leg, loaded' },
        description: {
          fr: 'Haltère ou kettlebell dans la main opposée à la jambe d’appui.',
          en: 'Dumbbell or kettlebell in the hand opposite the standing leg.',
        },
        mastery: {
          fr: '3 × 10 par jambe avec une charge d’environ 20 % du poids du corps, symétrique entre les deux côtés.',
          en: '3 × 10 per leg with a load of about 20% of body weight, symmetrical between sides.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Une jambe, lourd', en: 'Single leg, heavy' },
        description: {
          fr: 'Charge lourde (deux haltères, poulie ou landmine), descente lente.',
          en: 'Heavy load (two dumbbells, cable or landmine), slow lowering.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 4 × 6 par jambe deviennent faciles.',
          en: 'Maintenance level: increase the load when 4 × 6 per leg feels easy.',
        },
        dosage: { sets: 4, reps: [6, 8], tempo: '3-0-1', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Près d’un mur pour pouvoir vous rattraper au besoin.',
          en: 'Near a wall so you can catch yourself if needed.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell', en: 'Dumbbell or kettlebell' },
        instructions: {
          fr: 'Charge dans la main opposée, l’autre main peut toucher un support.',
          en: 'Load in the opposite hand; the other hand can touch a support.',
        },
      },
      {
        id: 'gym', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse ou landmine', en: 'Low cable or landmine' },
        instructions: {
          fr: 'Poignée de poulie basse ou extrémité d’une barre en landmine dans la main opposée : plus stable pour charger lourd.',
          en: 'Low-cable handle or the end of a landmine bar in the opposite hand: more stable for heavy loading.',
        },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'otani-2025',
          finding: {
            fr: 'Dans une équipe d’athlétisme lycéenne (77 athlètes), ajouter 3 × 3 soulevés de terre sur une jambe à l’échauffement a réduit le risque de lésion légère à modérée des ischios, sans effet démontré sur les lésions graves.',
            en: 'In a high-school track team (77 athletes), adding 3 × 3 single-leg deadlifts to the warm-up reduced the risk of mild-to-moderate hamstring strains, with no shown effect on severe injuries.',
          },
        },
        {
          refId: 'severini-2018',
          finding: {
            fr: 'Le « diver », proche de ce mouvement, fait partie du protocole L d’Askling, dont les exercices sollicitent les ischios dans une position proche de la phase aérienne de la course.',
            en: 'The “diver”, close to this movement, is part of the Askling L-protocol, whose exercises load the hamstrings in a position similar to the swing phase of running.',
          },
        },
      ],
    },
  }),

  // ===========================================================================
  // ISCHIO-JAMBIERS — flexion du genou
  // ===========================================================================
  defineExercise({
    id: 'nordic-hamstring',
    family: 'knee-flexion-eccentric',
    name: { fr: 'Nordic hamstring (ischios nordiques)', en: 'Nordic hamstring exercise' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'glute-max'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'performance', 'return'],
    perfGoals: ['sprint-fv'],
    preventionFor: ['run'],
    why: {
      fr: 'En fin de phase aérienne, les ischio-jambiers freinent la jambe qui se tend vers l’avant : c’est là qu’ils se blessent en sprint. Le Nordic renforce ce freinage (travail excentrique) et c’est l’exercice de prévention le mieux étudié.',
      en: 'At the end of the swing phase, the hamstrings brake the leg as it extends forward: this is where they get injured when sprinting. The Nordic strengthens this braking action (eccentric work) and is the best-studied prevention exercise.',
    },
    how: {
      setup: {
        fr: 'À genoux sur un coussin, chevilles bloquées (partenaire, meuble lourd ou banc spécifique), corps droit des genoux à la tête.',
        en: 'Kneel on a cushion with ankles anchored (partner, heavy furniture or a dedicated bench), body straight from knees to head.',
      },
      movement: {
        fr: 'Basculez lentement vers l’avant en freinant le plus longtemps possible avec l’arrière des cuisses, hanches tendues. Réceptionnez-vous sur les mains, puis repoussez le sol pour revenir.',
        en: 'Slowly fall forward, braking as long as possible with the back of your thighs, hips straight. Catch yourself on your hands, then push off the floor to come back up.',
      },
      cues: [
        { fr: 'Gardez les hanches tendues : ne cassez pas au niveau du bassin.', en: 'Keep the hips extended: do not bend at the waist.' },
        { fr: 'Freinez jusqu’au bout, même si vous tombez à la fin.', en: 'Keep braking to the end, even if you drop at the finish.' },
        { fr: 'Remontez avec l’aide des mains.', en: 'Use your hands to come back up.' },
      ],
    },
    mistakes: [
      { fr: 'Plier les hanches et pousser les fesses vers l’arrière.', en: 'Bending at the hips and pushing the buttocks back.' },
      { fr: 'Se laisser tomber dès le début de la descente.', en: 'Dropping at the start of the descent.' },
      { fr: 'Commencer avec trop de volume : courbatures très importantes.', en: 'Starting with too much volume: severe muscle soreness.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Descente partielle assistée', en: 'Assisted partial descent' },
        description: {
          fr: 'Descendez seulement sur la partie contrôlée (environ 30 à 45°), avec un élastique fixé en hauteur sur la poitrine ou les mains prêtes à pousser.',
          en: 'Lower only through the controlled range (about 30 to 45°), with a band anchored high around the chest or hands ready to push.',
        },
        mastery: {
          fr: '2 × 6 lentes sans courbatures persistantes au-delà de 48 h.',
          en: '2 × 6 slow reps without soreness lasting beyond 48 h.',
        },
        dosage: { sets: 2, reps: [4, 6], tempo: '3-0-X', restSec: 90, perSide: false, intensity: rpe('7'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Descente complète, réception sur les mains', en: 'Full descent, catch on the hands' },
        description: {
          fr: 'Descente aussi lente que possible jusqu’au sol, réception sur les mains, remontée en poussant fort avec les bras.',
          en: 'Lower as slowly as possible to the floor, catch on your hands, return with a strong arm push.',
        },
        mastery: {
          fr: '3 × 6 en freinant au moins jusqu’à mi-chemin du sol.',
          en: '3 × 6 while braking at least halfway to the floor.',
        },
        dosage: { sets: 3, reps: [5, 6], tempo: '4-0-X', restSec: 120, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Freinage presque jusqu’au sol', en: 'Braking almost to the floor' },
        description: {
          fr: 'Freinage contrôlé jusqu’à quelques centimètres du sol, remontée avec une poussée minimale des mains.',
          en: 'Controlled braking to a few centimetres from the floor, return with minimal hand push.',
        },
        mastery: {
          fr: '3 × 8 avec un freinage régulier sur toute l’amplitude.',
          en: '3 × 8 with steady braking through the whole range.',
        },
        dosage: { sets: 3, reps: [6, 8], tempo: '4-0-X', restSec: 120, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Nordic complet ou lesté', en: 'Full or weighted Nordic' },
        description: {
          fr: 'Descente complète contrôlée, éventuellement avec un disque ou une haltère contre la poitrine.',
          en: 'Fully controlled descent, optionally holding a plate or dumbbell against the chest.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 1 séance par semaine de 2 à 3 × 5 suffit pendant la saison.',
          en: 'Maintenance level: one weekly session of 2 to 3 × 5 is enough during the season.',
        },
        dosage: { sets: 3, reps: [4, 6], tempo: '5-0-X', restSec: 150, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Partenaire ou meuble', en: 'Partner or furniture' },
        instructions: {
          fr: 'Un partenaire tient vos chevilles, ou glissez les talons sous un canapé ou un lit lourd. Coussin sous les genoux.',
          en: 'A partner holds your ankles, or hook your heels under a heavy sofa or bed. Cushion under the knees.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Lesté (haltère)', en: 'Weighted (dumbbell)' },
        instructions: {
          fr: 'Haltère ou disque tenu contre la poitrine, seulement quand le Nordic complet est maîtrisé.',
          en: 'Dumbbell or plate held against the chest, only once the full Nordic is mastered.',
        },
      },
      {
        id: 'gym', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Banc à Nordic', en: 'Nordic bench' },
        instructions: {
          fr: 'Banc à ischios ou appareil dédié avec rouleaux de maintien des chevilles.',
          en: 'Glute-ham or dedicated Nordic bench with ankle rollers.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Les premières séances donnent souvent de fortes courbatures : commencez par un faible volume et augmentez progressivement.',
        en: 'The first sessions often cause marked soreness: start with low volume and build up gradually.',
      },
      {
        fr: 'Évitez les séances de Nordic dans les 48 h qui précèdent une séance de vitesse ou une compétition au début du programme.',
        en: 'Early in the programme, avoid Nordic sessions in the 48 h before a speed session or race.',
      },
    ],
    contraindications: [
      {
        fr: 'Lésion récente des ischios encore douloureuse à la marche : pas de Nordic avant la phase de reprise.',
        en: 'Recent hamstring strain still painful when walking: no Nordics until the return-to-sport phase.',
      },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'van-dyk-2019',
          finding: {
            fr: 'Méta-analyse de 15 études (8 459 athlètes) : les programmes qui incluent le Nordic réduisent les lésions des ischios jusqu’à 51 %.',
            en: 'Meta-analysis of 15 studies (8,459 athletes): programmes including the Nordic reduce hamstring injuries by up to 51%.',
          },
        },
        {
          refId: 'petersen-2011',
          finding: {
            fr: 'Chez 942 footballeurs, 10 semaines de Nordic progressif puis une séance hebdomadaire ont réduit les lésions aiguës des ischios (3,8 contre 13,1 pour 100 joueurs-saisons), surtout les récidives.',
            en: 'In 942 football players, 10 weeks of progressive Nordics followed by a weekly session reduced acute hamstring injuries (3.8 vs 13.1 per 100 player-seasons), especially recurrences.',
          },
        },
        {
          refId: 'van-der-horst-2015',
          finding: {
            fr: 'Chez 579 footballeurs amateurs, 25 séances de Nordic en 13 semaines ont réduit l’incidence des lésions des ischios, sans en réduire la gravité.',
            en: 'In 579 amateur football players, 25 Nordic sessions over 13 weeks reduced hamstring injury incidence, but not injury severity.',
          },
        },
        {
          refId: 'cuthbert-2020',
          finding: {
            fr: 'Un faible volume de Nordic (sur au moins 6 semaines) améliore la force excentrique et la longueur des faisceaux autant qu’un volume élevé.',
            en: 'A low Nordic volume (over at least 6 weeks) improves eccentric strength and fascicle length as much as a high volume.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'leg-curl',
    family: 'knee-flexion-curl',
    name: { fr: 'Leg curl (flexion de genou)', en: 'Leg curl' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['gastrocnemius-medial', 'gastrocnemius-lateral'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'endurance'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les ischio-jambiers fléchissent le genou : en course, ils ramènent la jambe sous le corps ; sur le vélo, ils tirent la pédale vers l’arrière et vers le haut. Le leg curl les cible directement, avec une charge facile à doser.',
      en: 'The hamstrings bend the knee: in running they bring the leg back under the body; on the bike they pull the pedal back and up. The leg curl targets them directly with an easily adjusted load.',
    },
    how: {
      setup: {
        fr: 'Assis ou allongé sur le ventre selon la variante, l’axe du genou aligné avec l’axe de la machine ou l’élastique fixé bas.',
        en: 'Seated or lying face down depending on the variant, knee joint aligned with the machine axis or band anchored low.',
      },
      movement: {
        fr: 'Fléchissez le genou en ramenant le talon vers la fesse, puis revenez lentement, sans laisser la charge retomber.',
        en: 'Bend the knee, bringing the heel towards the buttock, then return slowly without letting the load drop.',
      },
      cues: [
        { fr: 'Retour lent, en 3 secondes.', en: 'Slow return, over 3 seconds.' },
        { fr: 'Bassin plaqué contre le support.', en: 'Pelvis pressed against the pad.' },
        { fr: 'Pieds en position neutre (orteils vers vous).', en: 'Feet in a neutral position (toes towards you).' },
      ],
    },
    mistakes: [
      { fr: 'Soulever les fesses ou cambrer pour finir le mouvement.', en: 'Lifting the hips or arching to finish the movement.' },
      { fr: 'Laisser retomber la charge.', en: 'Letting the load drop.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux jambes, charge légère', en: 'Both legs, light load' },
        description: {
          fr: 'Deux jambes ensemble, charge ou élastique léger, amplitude complète.',
          en: 'Both legs together, light load or band, full range.',
        },
        mastery: {
          fr: '3 × 15 sans gêne pendant ni le lendemain.',
          en: '3 × 15 without discomfort during or the next day.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: false, intensity: rir('3-4'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Deux montent, une descend', en: 'Two up, one down' },
        description: {
          fr: 'Montée avec les deux jambes, retour lent sur une seule jambe (accent excentrique).',
          en: 'Lift with both legs, lower slowly on one leg only (eccentric emphasis).',
        },
        mastery: {
          fr: '3 × 10 par jambe avec un retour de 4 secondes.',
          en: '3 × 10 per leg with a 4-second lowering.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '4-0-1', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: {
          fr: 'Une seule jambe sur tout le mouvement, charge modérée.',
          en: 'One leg through the whole movement, moderate load.',
        },
        mastery: {
          fr: '3 × 10 par jambe, charge comparable entre les deux côtés.',
          en: '3 × 10 per leg, similar load on both sides.',
        },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Lourd, de préférence assis', en: 'Heavy, preferably seated' },
        description: {
          fr: 'Charge lourde à la machine assise (ischios en position allongée), deux jambes ou une jambe.',
          en: 'Heavy load on the seated machine (hamstrings at long length), both legs or one.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 4 × 8 deviennent faciles.',
          en: 'Maintenance level: increase the load when 4 × 8 feels easy.',
        },
        dosage: { sets: 4, reps: [6, 10], tempo: '3-0-1', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Auto-résistance', en: 'Self-resistance' },
        instructions: {
          fr: 'Allongé sur le ventre, chevilles croisées : la jambe du dessus freine la jambe qui fléchit, à l’aller comme au retour.',
          en: 'Lying face down with ankles crossed: the top leg resists the bending leg, both up and down.',
        },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: {
          fr: 'Élastique fixé bas (pied de table, porte) autour de la cheville, allongé sur le ventre ou debout. Reculez pour augmenter la tension.',
          en: 'Band anchored low (table leg, door) around the ankle, lying face down or standing. Step back to increase tension.',
        },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine assise ou couchée', en: 'Seated or lying machine' },
        instructions: {
          fr: 'La version assise travaille les ischios plus allongés et favorise davantage leur volume ; la version couchée garde la hanche tendue.',
          en: 'The seated version works the hamstrings at longer length and promotes more growth; the lying version keeps the hip extended.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Crampes en fin d’amplitude : réduisez l’amplitude ou la charge, elles disparaissent souvent en quelques séances.',
        en: 'Cramps at end range: reduce range or load; they often settle within a few sessions.',
      },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'maeo-2021',
          finding: {
            fr: 'Chez 20 adultes, 12 semaines de leg curl assis ont davantage augmenté le volume des ischios que le leg curl couché (+14 % contre +9 %), avec une protection similaire contre les lésions musculaires d’effort.',
            en: 'In 20 adults, 12 weeks of seated leg curls increased hamstring volume more than lying leg curls (+14% vs +9%), with similar protection against exercise-induced muscle damage.',
          },
        },
        {
          refId: 'askling-2003',
          finding: {
            fr: 'Chez 30 footballeurs d’élite, 10 semaines de flexions de genou avec surcharge excentrique avant la saison ont été suivies de moins de lésions des ischios (3 sur 15 contre 10 sur 15), avec un gain de force et de vitesse.',
            en: 'In 30 elite football players, 10 weeks of preseason knee-flexion training with eccentric overload were followed by fewer hamstring strains (3 of 15 vs 10 of 15), with gains in strength and speed.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hamstring-slider-curl',
    family: 'hamstring-slide-curl',
    name: { fr: 'Leg curl glissé (serviette, swiss ball, sangles)', en: 'Hamstring slider curl' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['glute-max', 'gastrocnemius-medial', 'gastrocnemius-lateral'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Cet exercice fait travailler les ischios aux deux articulations à la fois : ils tendent la hanche et fléchissent le genou, comme en fin de foulée ou en bas du coup de pédale. Il se fait partout, sans machine.',
      en: 'This exercise works the hamstrings at both joints at once: they extend the hip and bend the knee, as at the end of the stride or at the bottom of the pedal stroke. It can be done anywhere, without a machine.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le dos, talons sur une serviette (sol lisse), un swiss ball ou dans les sangles de suspension, bras le long du corps.',
        en: 'Lying on your back, heels on a towel (smooth floor), a Swiss ball or in suspension straps, arms by your sides.',
      },
      movement: {
        fr: 'Montez le bassin en pont, puis glissez les talons vers les fesses en gardant le bassin haut. Repoussez lentement les talons jusqu’à jambes presque tendues, bassin toujours décollé.',
        en: 'Lift the pelvis into a bridge, then slide the heels towards the buttocks while keeping the hips high. Slowly push the heels away until the legs are almost straight, hips still off the floor.',
      },
      cues: [
        { fr: 'Le bassin reste haut pendant toute la série.', en: 'The hips stay high for the whole set.' },
        { fr: 'Retour lent : c’est la partie la plus utile.', en: 'Slow return: it is the most useful part.' },
      ],
    },
    mistakes: [
      { fr: 'Laisser le bassin s’affaisser au retour.', en: 'Letting the hips sag on the way out.' },
      { fr: 'Cambrer le bas du dos au lieu de serrer les fesses.', en: 'Arching the lower back instead of squeezing the glutes.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux jambes, retour seulement', en: 'Both legs, lowering only' },
        description: {
          fr: 'Partez talons près des fesses, bassin haut, et repoussez lentement les talons. Reposez le bassin pour revenir.',
          en: 'Start with heels near the buttocks, hips high, and slowly push the heels away. Lower the hips to reset.',
        },
        mastery: {
          fr: '3 × 8 retours de 4 secondes, bassin haut jusqu’au bout.',
          en: '3 × 8 four-second lowerings, hips high to the end.',
        },
        dosage: { sets: 3, reps: [6, 8], tempo: '4-0-1', restSec: 75, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Deux jambes, aller-retour', en: 'Both legs, full curl' },
        description: {
          fr: 'Aller et retour complets sans reposer le bassin.',
          en: 'Full curl in and out without lowering the hips.',
        },
        mastery: {
          fr: '3 × 12 sans reposer le bassin.',
          en: '3 × 12 without lowering the hips.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Deux tirent, une repousse', en: 'Two in, one out' },
        description: {
          fr: 'Ramenez avec les deux jambes, repoussez lentement avec une seule.',
          en: 'Curl in with both legs, push out slowly with one.',
        },
        mastery: {
          fr: '3 × 8 par jambe, bassin de niveau.',
          en: '3 × 8 per leg, pelvis level.',
        },
        dosage: { sets: 3, reps: [6, 8], tempo: '4-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: {
          fr: 'Aller-retour complet sur une seule jambe, l’autre tendue en l’air.',
          en: 'Full curl on one leg, the other held straight in the air.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 3 × 8 à 10 par jambe, symétriques.',
          en: 'Maintenance level: 3 × 8 to 10 per leg, symmetrical.',
        },
        dosage: { sets: 3, reps: [6, 10], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Serviette ou chaussettes', en: 'Towel or socks' },
        instructions: {
          fr: 'Talons sur une serviette ou en chaussettes sur un parquet ou un carrelage.',
          en: 'Heels on a towel, or in socks, on a wooden or tiled floor.',
        },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Swiss ball', en: 'Swiss ball' },
        instructions: {
          fr: 'Talons sur le ballon : l’instabilité demande plus de contrôle du bassin.',
          en: 'Heels on the ball: the instability demands more pelvic control.',
        },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 3,
        name: { fr: 'Sangles de suspension', en: 'Suspension trainer' },
        instructions: {
          fr: 'Talons dans les poignées, sangles réglées à mi-tibia au-dessus du sol.',
          en: 'Heels in the foot cradles, straps set mid-shin above the floor.',
        },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ===========================================================================
  // ISCHIO-JAMBIERS — pont et isométrie
  // ===========================================================================
  defineExercise({
    id: 'hamstring-bridge',
    family: 'hamstring-bridge',
    name: { fr: 'Pont ischios (levier long)', en: 'Hamstring bridge (long lever)' },
    sports: ['run', 'bike'],
    zones: ['thigh', 'hip-glutes'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings, 'glute-max'],
      secondary: ['adductor-magnus', 'gastrocnemius-medial'],
    },
    zoom: 'leg-back',
    qualities: ['isometric', 'strength', 'endurance'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Talons loin des fesses, le pont sollicite surtout les ischio-jambiers en extension de hanche, sans les comprimer contre l’os de la fesse. Leur endurance compte en fin de course ou de sortie longue, quand la fatigue s’installe.',
      en: 'With the heels far from the buttocks, the bridge mainly loads the hamstrings in hip extension, without compressing them against the sitting bone. Their endurance matters late in a run or a long ride, when fatigue sets in.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le dos, talons posés au sol ou sur une marche, genoux peu fléchis (environ 20 à 30°), bras le long du corps.',
        en: 'Lying on your back, heels on the floor or on a step, knees slightly bent (about 20 to 30°), arms by your sides.',
      },
      movement: {
        fr: 'Poussez dans les talons pour décoller le bassin jusqu’à aligner épaules, hanches et genoux. Tenez la position ou redescendez lentement selon le niveau.',
        en: 'Push through the heels to lift the pelvis until shoulders, hips and knees are aligned. Hold or lower slowly depending on the level.',
      },
      cues: [
        { fr: 'Poussez dans les talons, pas dans les orteils.', en: 'Push through the heels, not the toes.' },
        { fr: 'Bassin de niveau, sans cambrer.', en: 'Pelvis level, no arching.' },
        { fr: 'Plus les talons sont loin, plus les ischios travaillent.', en: 'The further the heels, the more the hamstrings work.' },
      ],
      breathing: { fr: 'Respirez normalement pendant les maintiens.', en: 'Breathe normally during holds.' },
    },
    mistakes: [
      { fr: 'Rapprocher les talons des fesses (le travail repasse sur les fessiers et les quadriceps).', en: 'Bringing the heels close to the buttocks (work shifts to the glutes and quads).' },
      { fr: 'Cambrer le bas du dos en haut du mouvement.', en: 'Arching the lower back at the top.' },
      { fr: 'Laisser le bassin pencher d’un côté sur une jambe.', en: 'Letting the pelvis drop to one side on one leg.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Maintien deux jambes', en: 'Two-leg hold' },
        description: {
          fr: 'Pont isométrique sur les deux talons, genoux peu fléchis.',
          en: 'Isometric bridge on both heels, knees slightly bent.',
        },
        mastery: {
          fr: '5 × 45 s sans crampe ni douleur croissante le lendemain.',
          en: '5 × 45 s without cramping or increased pain the next day.',
        },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Maintien une jambe', en: 'Single-leg hold' },
        description: {
          fr: 'Même position sur un seul talon, l’autre jambe tendue en l’air ou genou plié vers la poitrine.',
          en: 'Same position on one heel, the other leg straight in the air or knee bent towards the chest.',
        },
        mastery: {
          fr: '4 × 30 s par jambe, bassin de niveau, durées égales des deux côtés.',
          en: '4 × 30 s per leg, pelvis level, equal times on both sides.',
        },
        dosage: { sets: 4, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Pont une jambe, talon surélevé', en: 'Single-leg bridge, heel raised' },
        description: {
          fr: 'Talon sur une marche, une chaise ou un canapé (environ 50 cm), répétitions dynamiques sur une jambe.',
          en: 'Heel on a step, chair or sofa (about 50 cm high), dynamic reps on one leg.',
        },
        mastery: {
          fr: '3 × 15 par jambe, avec un écart de moins de 2 à 3 répétitions entre les deux côtés.',
          en: '3 × 15 per leg, with less than 2 to 3 reps difference between sides.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1', restSec: 75, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Endurance une jambe', en: 'Single-leg endurance' },
        description: {
          fr: 'Talon surélevé, répétitions régulières jusqu’à la fatigue, en gardant la hauteur du bassin.',
          en: 'Heel raised, steady reps to fatigue while keeping hip height.',
        },
        mastery: {
          fr: 'Plus de 25 répétitions par jambe, symétriques.',
          en: 'More than 25 reps per leg, symmetrical.',
        },
        dosage: { sets: 2, reps: [20, 30], tempo: '1-0-1', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Une jambe, lesté', en: 'Single leg, weighted' },
        description: {
          fr: 'Talon surélevé, haltère ou disque posé sur le bassin.',
          en: 'Heel raised, dumbbell or plate resting on the pelvis.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 3 × 10 par jambe deviennent faciles.',
          en: 'Maintenance level: increase the load when 3 × 10 per leg feels easy.',
        },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-1-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Au sol, puis talon sur une chaise, un canapé ou un lit pour les niveaux surélevés.',
          en: 'On the floor, then heel on a chair, sofa or bed for the raised levels.',
        },
      },
      {
        id: 'step', equipment: ['step'], loadable: false, rank: 2,
        name: { fr: 'Marche ou banc', en: 'Step or bench' },
        instructions: {
          fr: 'Talon sur une marche ou un banc stable d’environ 50 cm.',
          en: 'Heel on a stable step or bench about 50 cm high.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère sur le bassin', en: 'Dumbbell on the pelvis' },
        instructions: {
          fr: 'Haltère ou disque tenu sur le bassin, sur une serviette pliée pour le confort.',
          en: 'Dumbbell or plate held on the pelvis, on a folded towel for comfort.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Une crampe derrière la cuisse est fréquente au début : rapprochez un peu les talons et étirez doucement entre les séries.',
        en: 'Cramping at the back of the thigh is common at first: bring the heels slightly closer and gently stretch between sets.',
      },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'freckleton-2014',
          finding: {
            fr: 'Chez 482 footballeurs australiens, ceux qui se sont blessé l’ischio droit avaient un score plus faible à ce test de pont unipodal en présaison, mais les auteurs appellent à confirmer ce lien.',
            en: 'In 482 Australian football players, those who later injured the right hamstring had lower preseason scores on this single-leg bridge test, although the authors call for confirmation.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hamstring-isometric-hold',
    family: 'hamstring-isometric',
    name: { fr: 'Isométrie des ischio-jambiers (talon en appui)', en: 'Isometric hamstring hold (heel press)' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['glute-max', 'gastrocnemius-medial'],
    },
    zoom: 'leg-back',
    qualities: ['isometric', 'strength'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Contracter les ischios sans mouvement permet de les charger tôt après une douleur ou une lésion, avec une intensité facile à doser. On augmente ensuite la flexion de hanche pour se rapprocher des positions de la course.',
      en: 'Contracting the hamstrings without movement lets you load them early after pain or injury, at an easily adjusted intensity. Hip flexion is then increased to approach running positions.',
    },
    how: {
      setup: {
        fr: 'Position selon le niveau : à plat ventre, sur le dos talon au sol, ou talon posé sur une chaise.',
        en: 'Position depends on the level: lying face down, on your back with the heel on the floor, or with the heel on a chair.',
      },
      movement: {
        fr: 'Poussez le talon contre la résistance (sol, chaise, élastique ou main d’un partenaire) comme pour fléchir le genou, sans bouger, et tenez la durée indiquée.',
        en: 'Press the heel into the resistance (floor, chair, band or a partner’s hand) as if bending the knee, without moving, and hold for the set time.',
      },
      cues: [
        { fr: 'Montez la pression progressivement en 2 à 3 secondes.', en: 'Build up the pressure gradually over 2 to 3 seconds.' },
        { fr: 'Effort franc mais sans douleur vive.', en: 'Firm effort but no sharp pain.' },
      ],
      breathing: { fr: 'Respirez normalement, sans bloquer.', en: 'Breathe normally, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Pousser d’un coup, à fond, dès la première seconde.', en: 'Pushing all-out from the first second.' },
      { fr: 'Décoller le bassin ou cambrer pour compenser.', en: 'Lifting the hips or arching to compensate.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'À plat ventre, hanche tendue', en: 'Face down, hip extended' },
        description: {
          fr: 'Allongé sur le ventre, genou fléchi d’environ 30°, talon qui pousse vers le haut contre un élastique, un meuble ou la main d’un partenaire.',
          en: 'Lying face down, knee bent about 30°, heel pushing up against a band, furniture or a partner’s hand.',
        },
        mastery: {
          fr: '5 × 45 s avec un effort franc, sans douleur croissante le lendemain.',
          en: '5 × 45 s with a firm effort, no increased pain the next day.',
        },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Sur le dos, talon au sol', en: 'On your back, heel on the floor' },
        description: {
          fr: 'Allongé sur le dos, genou fléchi à environ 90°, enfoncez le talon dans le sol et tirez-le vers vous sans le déplacer.',
          en: 'Lying on your back, knee bent to about 90°, dig the heel into the floor and pull it towards you without moving it.',
        },
        mastery: {
          fr: '5 × 45 s par jambe, tolérées sans gêne le lendemain.',
          en: '5 × 45 s per leg, tolerated without next-day discomfort.',
        },
        dosage: { sets: 5, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Position 90/90', en: '90/90 position' },
        description: {
          fr: 'Allongé sur le dos, talon posé sur une chaise, hanche et genou à 90° : poussez le talon vers le bas et vers vous.',
          en: 'Lying on your back, heel on a chair, hip and knee at 90°: push the heel down and towards you.',
        },
        mastery: {
          fr: '5 × 30 s à effort fort, durée et sensation comparables des deux côtés.',
          en: '5 × 30 s at a strong effort, similar time and feel on both sides.',
        },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: true, intensity: load('Effort fort, sans douleur vive', 'Strong effort, no sharp pain'), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Charnière sur une jambe, maintien', en: 'Single-leg hinge hold' },
        description: {
          fr: 'Debout sur une jambe, buste penché à mi-course comme dans un soulevé de terre sur une jambe, maintien immobile (haltère possible).',
          en: 'Standing on one leg, trunk tilted halfway as in a single-leg deadlift, held still (dumbbell optional).',
        },
        mastery: {
          fr: 'Passez aux exercices dynamiques (soulevé de terre, leg curl) quand 4 × 30 s par jambe sont faciles.',
          en: 'Move on to dynamic exercises (deadlifts, leg curls) when 4 × 30 s per leg is easy.',
        },
        dosage: { sets: 4, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sol, chaise ou partenaire', en: 'Floor, chair or partner' },
        instructions: {
          fr: 'Le sol, une chaise ou la main d’un partenaire servent de résistance fixe.',
          en: 'The floor, a chair or a partner’s hand provides a fixed resistance.',
        },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: {
          fr: 'Élastique fixé devant vous autour de la cheville : reculez pour augmenter la tension.',
          en: 'Band anchored in front of you around the ankle: move away to increase tension.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Douleur à l’os de la fesse : restez aux niveaux 1 et 2 (hanche peu fléchie) tant que la position assise est douloureuse.',
        en: 'Pain at the sitting bone: stay at levels 1 and 2 (little hip flexion) as long as sitting is painful.',
      },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'rich-2026',
          finding: {
            fr: 'Chez 20 personnes avec une tendinopathie proximale des ischios, une séance d’isométrie et une séance d’exercice dynamique ont eu des effets similaires sur la douleur, la force et la gêne en position assise.',
            en: 'In 20 people with proximal hamstring tendinopathy, one isometric session and one dynamic session had similar effects on pain, strength and sitting symptoms.',
          },
        },
        {
          refId: 'hickey-2020',
          finding: {
            fr: 'Après une lésion des ischios, une rééducation progressée jusqu’au seuil de douleur a mieux restauré la force isométrique mesurée à 90/90 qu’une rééducation strictement indolore, sans retarder la reprise.',
            en: 'After a hamstring strain, rehabilitation progressed up to the pain threshold restored isometric strength measured at 90/90 better than strictly pain-free rehabilitation, without delaying return.',
          },
        },
      ],
    },
  }),

  // ===========================================================================
  // ISCHIO-JAMBIERS — protocole L d'Askling
  // ===========================================================================
  defineExercise({
    id: 'askling-extender',
    family: 'hamstring-active-lengthening',
    name: { fr: 'Extender (protocole d’Askling)', en: 'Extender (Askling protocol)' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['rectus-femoris', 'iliopsoas'],
    },
    zoom: 'leg-back',
    qualities: ['mobility', 'control'],
    objectives: ['return'],
    why: {
      fr: 'Après une lésion, les ischios doivent retrouver leur longueur de travail sous contrôle actif. L’extender les allonge en tendant le genou, hanche fléchie, comme en fin de phase aérienne de la course.',
      en: 'After an injury, the hamstrings need to regain their working length under active control. The extender lengthens them by straightening the knee with the hip flexed, as in the late swing phase of running.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le dos, tenez la cuisse de la jambe à travailler à deux mains, hanche fléchie à environ 90°. L’autre jambe reste tendue au sol.',
        en: 'Lying on your back, hold the thigh of the working leg with both hands, hip flexed to about 90°. The other leg stays straight on the floor.',
      },
      movement: {
        fr: 'Tendez le genou aussi loin que possible juste avant la gêne, sans lâcher la cuisse, puis repliez-le.',
        en: 'Straighten the knee as far as possible to just short of discomfort, without letting go of the thigh, then bend it back.',
      },
      cues: [
        { fr: 'La cuisse reste immobile contre vos mains.', en: 'The thigh stays still against your hands.' },
        { fr: 'Arrêtez juste avant la douleur.', en: 'Stop just short of pain.' },
      ],
    },
    mistakes: [
      { fr: 'Lancer la jambe en fin d’amplitude.', en: 'Flicking the leg at end range.' },
      { fr: 'Laisser la cuisse s’éloigner de la poitrine pour tendre plus facilement.', en: 'Letting the thigh drift away from the chest to straighten more easily.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Lent, amplitude partielle', en: 'Slow, partial range' },
        description: {
          fr: 'Extension lente du genou, arrêtée bien avant la tension désagréable.',
          en: 'Slow knee straightening, stopped well before uncomfortable tension.',
        },
        mastery: {
          fr: '3 × 12 sans douleur pendant ni après.',
          en: '3 × 12 without pain during or after.',
        },
        dosage: { sets: 3, reps: [12, 12], tempo: '2-0-2', restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 2,
        name: { fr: 'Lent, amplitude complète', en: 'Slow, full range' },
        description: {
          fr: 'Extension lente jusqu’à l’amplitude maximale confortable.',
          en: 'Slow straightening up to the maximum comfortable range.',
        },
        mastery: {
          fr: 'Amplitude comparable à l’autre jambe, sans appréhension.',
          en: 'Range comparable to the other leg, without apprehension.',
        },
        dosage: { sets: 3, reps: [12, 12], tempo: '2-0-2', restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 3,
        name: { fr: 'Rythme rapide', en: 'Faster tempo' },
        description: {
          fr: 'Même mouvement à un rythme plus rapide, toujours contrôlé en fin d’amplitude.',
          en: 'Same movement at a faster tempo, still controlled at end range.',
        },
        mastery: {
          fr: 'Niveau d’entretien jusqu’à la reprise complète.',
          en: 'Maintenance level until full return.',
        },
        dosage: { sets: 3, reps: [12, 12], tempo: '1-0-1', restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: {
          fr: 'Sur un tapis, mains croisées derrière la cuisse.',
          en: 'On a mat, hands clasped behind the thigh.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Ce n’est pas un étirement forcé : aucune douleur ne doit apparaître.',
        en: 'This is not a forced stretch: no pain should appear.',
      },
    ],
    contraindications: [
      {
        fr: 'Douleur à l’os de la fesse (tendinopathie proximale) : cette position comprime le tendon, à éviter dans les premières phases.',
        en: 'Pain at the sitting bone (proximal tendinopathy): this position compresses the tendon; avoid it in the early phases.',
      },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'askling-2013',
          finding: {
            fr: 'Chez 75 footballeurs d’élite blessés aux ischios, le protocole d’exercices d’allongement (L) a permis un retour à l’entraînement collectif en 28 jours en moyenne, contre 51 jours avec des exercices classiques.',
            en: 'In 75 elite football players with hamstring strains, the lengthening (L) protocol led to return to full team training in 28 days on average, versus 51 days with conventional exercises.',
          },
        },
        {
          refId: 'askling-2014',
          finding: {
            fr: 'Chez 56 sprinteurs et sauteurs d’élite, le même protocole L a raccourci le retour à l’entraînement complet (49 contre 86 jours).',
            en: 'In 56 elite sprinters and jumpers, the same L-protocol shortened the return to full training (49 vs 86 days).',
          },
        },
        {
          refId: 'severini-2018',
          finding: {
            fr: 'Pendant l’extender, les ischios sont étirés avec une activation musculaire faible : c’est l’exercice le plus doux du protocole.',
            en: 'During the extender, the hamstrings are stretched with low muscle activation: it is the gentlest exercise of the protocol.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'askling-glider',
    family: 'hamstring-glider',
    name: { fr: 'Glider (protocole d’Askling)', en: 'Glider (Askling protocol)' },
    sports: ['run', 'bike'],
    zones: ['thigh'],
    half: 'lower',
    muscles: {
      primary: [...hamstrings],
      secondary: ['glute-max', 'glute-med', 'adductor-magnus'],
    },
    zoom: 'leg-back',
    qualities: ['control', 'strength'],
    objectives: ['return'],
    why: {
      fr: 'Le glider fait travailler les ischios de la jambe avant en allongement actif, avec une charge que vous dosez par l’appui des mains. Il prépare aux grandes amplitudes de la foulée rapide.',
      en: 'The glider works the front-leg hamstrings in active lengthening, with a load you control through hand support. It prepares for the large ranges of fast running.',
    },
    how: {
      setup: {
        fr: 'Debout, jambe à travailler devant, genou légèrement fléchi ; l’autre pied sur une serviette (sol lisse). Mains sur un support stable (dossier de chaise, barre).',
        en: 'Standing with the working leg in front, knee slightly bent; the other foot on a towel (smooth floor). Hands on a stable support (chair back, rail).',
      },
      movement: {
        fr: 'Faites glisser lentement le pied arrière vers l’arrière en gardant le poids sur la jambe avant, buste légèrement penché. Revenez en vous aidant des bras, pas de la jambe avant.',
        en: 'Slowly slide the back foot backwards while keeping your weight on the front leg, trunk slightly tilted. Come back using your arms, not the front leg.',
      },
      cues: [
        { fr: 'Le genou avant reste légèrement fléchi et fixe.', en: 'The front knee stays slightly bent and fixed.' },
        { fr: 'Retour à la force des bras.', en: 'Return using arm strength.' },
      ],
    },
    mistakes: [
      { fr: 'Glisser trop loin dès les premières répétitions.', en: 'Sliding too far from the first reps.' },
      { fr: 'Revenir en tirant avec la jambe avant.', en: 'Pulling back with the front leg.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Petite amplitude', en: 'Small range' },
        description: {
          fr: 'Glissement court, appui franc des mains.',
          en: 'Short slide, firm hand support.',
        },
        mastery: {
          fr: '3 × 4 lents sans douleur ni appréhension.',
          en: '3 × 4 slow reps without pain or apprehension.',
        },
        dosage: { sets: 3, reps: [4, 4], tempo: '3-0-3', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Amplitude moyenne', en: 'Medium range' },
        description: {
          fr: 'Glissement plus long, appui des mains plus léger.',
          en: 'Longer slide, lighter hand support.',
        },
        mastery: {
          fr: '3 × 6 en amplitude moyenne sans douleur le lendemain.',
          en: '3 × 6 at medium range without next-day pain.',
        },
        dosage: { sets: 3, reps: [4, 6], tempo: '3-0-3', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Grande amplitude, plus vite', en: 'Large range, faster' },
        description: {
          fr: 'Glissement ample à un rythme plus rapide, toujours contrôlé.',
          en: 'Large slide at a faster tempo, still controlled.',
        },
        mastery: {
          fr: 'Niveau d’entretien jusqu’à la reprise des sprints.',
          en: 'Maintenance level until sprinting resumes.',
        },
        dosage: { sets: 3, reps: [4, 6], tempo: '2-0-2', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Serviette sur sol lisse', en: 'Towel on a smooth floor' },
        instructions: {
          fr: 'Serviette ou chaussette sous le pied arrière, mains sur un dossier de chaise ou un plan de travail.',
          en: 'Towel or sock under the back foot, hands on a chair back or kitchen counter.',
        },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Sangles de suspension', en: 'Suspension trainer' },
        instructions: {
          fr: 'Poignées en mains pour doser l’appui et revenir plus facilement.',
          en: 'Handles in your hands to control support and return more easily.',
        },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'askling-2013',
          finding: {
            fr: 'Le protocole d’exercices d’allongement (L), dont le glider fait partie, a presque divisé par deux le temps de retour à l’entraînement chez 75 footballeurs d’élite.',
            en: 'The lengthening (L) protocol, which includes the glider, almost halved the time to return to training in 75 elite football players.',
          },
        },
        {
          refId: 'askling-2014',
          finding: {
            fr: 'Résultat confirmé chez 56 sprinteurs et sauteurs d’élite : retour en 49 jours contre 86 avec des exercices classiques.',
            en: 'Result confirmed in 56 elite sprinters and jumpers: return in 49 days versus 86 with conventional exercises.',
          },
        },
        {
          refId: 'severini-2018',
          finding: {
            fr: 'Le glider sollicite les ischios jusqu’à environ 60 % de leur contraction maximale, dans une position proche de la phase aérienne de la course.',
            en: 'The glider activates the hamstrings up to about 60% of maximal contraction, in a position close to the swing phase of running.',
          },
        },
      ],
    },
  }),

  // ===========================================================================
  // ADDUCTEURS
  // ===========================================================================
  defineExercise({
    id: 'copenhagen-adductor',
    family: 'adductor-copenhagen',
    name: { fr: 'Copenhagen (gainage latéral adducteurs)', en: 'Copenhagen adductor exercise' },
    sports: ['run', 'bike'],
    zones: ['adductors', 'trunk'],
    half: 'lower',
    muscles: {
      primary: ['adductor-longus', 'gracilis'],
      secondary: ['adductor-magnus', 'internal-oblique', 'external-oblique', 'glute-med'],
    },
    zoom: 'pelvis-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'Les adducteurs stabilisent le bassin et la cuisse à chaque appui, surtout dans les changements de direction, les descentes et les terrains irréguliers. Des adducteurs forts sont associés à moins de douleurs de l’aine.',
      en: 'The adductors stabilise the pelvis and thigh at every foot strike, especially when changing direction, running downhill or on uneven ground. Strong adductors are linked to fewer groin problems.',
    },
    how: {
      setup: {
        fr: 'Gainage sur le côté, appui sur l’avant-bras. La jambe du dessus est posée sur un banc, une chaise ou tenue par un partenaire (au genou ou à la cheville selon le niveau).',
        en: 'Side plank on your forearm. The top leg rests on a bench, chair or is held by a partner (at the knee or ankle depending on the level).',
      },
      movement: {
        fr: 'Serrez la jambe du dessus contre le support pour décoller le bassin jusqu’à aligner le corps. Tenez ou montez-descendez lentement selon le niveau ; la jambe du dessous peut monter rejoindre le banc.',
        en: 'Squeeze the top leg into the support to lift the pelvis until the body is aligned. Hold or move up and down slowly depending on the level; the bottom leg can rise to meet the bench.',
      },
      cues: [
        { fr: 'Corps aligné de la tête aux pieds.', en: 'Body aligned from head to feet.' },
        { fr: 'Le bassin ne bascule ni vers l’avant ni vers l’arrière.', en: 'The pelvis does not tip forwards or backwards.' },
        { fr: 'Descente lente, en 2 à 3 secondes.', en: 'Slow lowering, over 2 to 3 seconds.' },
      ],
      breathing: { fr: 'Respirez normalement.', en: 'Breathe normally.' },
    },
    mistakes: [
      { fr: 'Passer directement au levier long (appui à la cheville).', en: 'Jumping straight to the long lever (ankle support).' },
      { fr: 'Laisser les hanches s’affaisser ou partir en arrière.', en: 'Letting the hips sag or drift backwards.' },
      { fr: 'Ignorer une douleur dans l’aine pendant l’exercice.', en: 'Ignoring groin pain during the exercise.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Levier court, maintien', en: 'Short lever, hold' },
        description: {
          fr: 'Genou du dessus posé sur le support (levier court), maintien immobile.',
          en: 'Top knee resting on the support (short lever), held still.',
        },
        mastery: {
          fr: '3 × 30 s de chaque côté, corps aligné, sans douleur dans l’aine.',
          en: '3 × 30 s per side, body aligned, no groin pain.',
        },
        dosage: { sets: 3, holdSec: 20, restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Levier court, dynamique', en: 'Short lever, dynamic' },
        description: {
          fr: 'Genou sur le support, montées et descentes lentes du bassin.',
          en: 'Knee on the support, slow lifts and lowers of the pelvis.',
        },
        mastery: {
          fr: '3 × 12 de chaque côté sans douleur le lendemain.',
          en: '3 × 12 per side without next-day pain.',
        },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Levier long, maintien', en: 'Long lever, hold' },
        description: {
          fr: 'Cheville du dessus sur le support, jambe tendue, maintien immobile.',
          en: 'Top ankle on the support, leg straight, held still.',
        },
        mastery: {
          fr: '3 × 30 s de chaque côté, symétriques.',
          en: '3 × 30 s per side, symmetrical.',
        },
        dosage: { sets: 3, holdSec: 20, restSec: 60, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Levier long, dynamique', en: 'Long lever, dynamic' },
        description: {
          fr: 'Cheville sur le support, la jambe du dessous monte toucher le banc à chaque répétition.',
          en: 'Ankle on the support, the bottom leg rises to touch the bench on each rep.',
        },
        mastery: {
          fr: 'Niveau d’entretien : 2 à 3 × 8 à 12 par côté, une à deux fois par semaine en saison.',
          en: 'Maintenance level: 2 to 3 × 8 to 12 per side, once or twice a week in season.',
        },
        dosage: { sets: 3, reps: [6, 12], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Chaise, canapé ou partenaire', en: 'Chair, sofa or partner' },
        instructions: {
          fr: 'Jambe du dessus posée sur une chaise stable, un canapé ou tenue par un partenaire à hauteur de hanche.',
          en: 'Top leg on a stable chair or sofa, or held by a partner at hip height.',
        },
      },
      {
        id: 'step', equipment: ['step'], loadable: false, rank: 2,
        name: { fr: 'Banc', en: 'Bench' },
        instructions: {
          fr: 'Banc de musculation ou box, hauteur proche de celle de la hanche au sol.',
          en: 'Gym bench or box, about hip height when lying on the floor.',
        },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 3,
        name: { fr: 'Sangles de suspension', en: 'Suspension trainer' },
        instructions: {
          fr: 'Jambe du dessus dans la sangle : l’instabilité augmente la difficulté, à réserver aux niveaux 3 et 4.',
          en: 'Top leg in the strap: the instability makes it harder, keep it for levels 3 and 4.',
        },
      },
    ],
    precautions: [
      caution.painFlare,
      {
        fr: 'Des courbatures dans l’aine sont fréquentes les premières semaines : progressez par paliers d’une à deux semaines.',
        en: 'Groin soreness is common in the first weeks: progress in steps of one to two weeks.',
      },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'haroy-2019',
          finding: {
            fr: 'Chez 652 footballeurs semi-professionnels, un programme fondé sur le seul Copenhagen (3 niveaux, 3 fois par semaine en présaison puis 1 fois en saison) a réduit de 41 % le risque de douleurs de l’aine.',
            en: 'In 652 semi-professional football players, a programme based on the Copenhagen exercise alone (3 levels, 3 times a week preseason then once a week in season) cut the risk of groin problems by 41%.',
          },
        },
        {
          refId: 'ishoi-2016',
          finding: {
            fr: 'Chez de jeunes footballeurs, 8 semaines de Copenhagen progressif ont augmenté la force excentrique des adducteurs de 35,7 %, avec peu de courbatures.',
            en: 'In young football players, 8 weeks of progressive Copenhagen training increased eccentric adductor strength by 35.7%, with little soreness.',
          },
        },
        {
          refId: 'serner-2014',
          finding: {
            fr: 'Chez 40 footballeurs d’élite, le Copenhagen faisait partie des exercices d’adduction dynamiques les plus intenses mesurés en électromyographie.',
            en: 'In 40 elite football players, the Copenhagen was among the most intense dynamic adduction exercises measured with electromyography.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'adductor-squeeze',
    family: 'adductor-isometric',
    name: { fr: 'Serrage des adducteurs (isométrie)', en: 'Adductor squeeze (isometric)' },
    sports: ['run', 'bike'],
    zones: ['adductors'],
    half: 'lower',
    muscles: {
      primary: ['adductor-longus', 'gracilis'],
      secondary: ['adductor-magnus', 'rectus-abdominis'],
    },
    zoom: 'pelvis-front',
    qualities: ['isometric', 'strength'],
    objectives: ['pain', 'return', 'prevention'],
    preventionFor: ['run'],
    why: {
      fr: 'Serrer un ballon entre les genoux charge les adducteurs sans mouvement, avec une intensité que vous contrôlez. C’est souvent le premier exercice toléré quand l’aine est sensible, et il entretient la force des adducteurs.',
      en: 'Squeezing a ball between the knees loads the adductors without movement, at an intensity you control. It is often the first exercise tolerated when the groin is sensitive, and it maintains adductor strength.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le dos, genoux fléchis, pieds au sol, un ballon, un coussin roulé ou vos poings entre les genoux.',
        en: 'Lying on your back, knees bent, feet on the floor, a ball, rolled cushion or your fists between the knees.',
      },
      movement: {
        fr: 'Serrez progressivement l’objet entre vos genoux, tenez la durée indiquée, puis relâchez doucement.',
        en: 'Gradually squeeze the object between your knees, hold for the set time, then release gently.',
      },
      cues: [
        { fr: 'Montez la pression en 2 à 3 secondes.', en: 'Build the pressure over 2 to 3 seconds.' },
        { fr: 'Bas du dos posé, ventre engagé.', en: 'Lower back down, abdominals engaged.' },
      ],
      breathing: { fr: 'Respirez normalement, sans bloquer.', en: 'Breathe normally, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Serrer à fond d’emblée alors que l’aine est sensible.', en: 'Squeezing all-out straight away when the groin is sensitive.' },
      { fr: 'Bloquer la respiration.', en: 'Holding your breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Genoux fléchis, effort modéré', en: 'Knees bent, moderate effort' },
        description: {
          fr: 'Serrage modéré entre les genoux, genoux fléchis à environ 45°.',
          en: 'Moderate squeeze between the knees, knees bent to about 45°.',
        },
        mastery: {
          fr: '5 × 30 s sans douleur pendant ni le lendemain.',
          en: '5 × 30 s without pain during or the next day.',
        },
        dosage: { sets: 5, holdSec: 20, restSec: 30, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Genoux fléchis, effort fort', en: 'Knees bent, strong effort' },
        description: {
          fr: 'Même position, serrage fort et soutenu.',
          en: 'Same position, strong sustained squeeze.',
        },
        mastery: {
          fr: '5 × 30 s à effort fort, sans douleur dans l’aine.',
          en: '5 × 30 s at a strong effort, without groin pain.',
        },
        dosage: { sets: 5, holdSec: 30, restSec: 45, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Jambes tendues', en: 'Straight legs' },
        description: {
          fr: 'Jambes tendues, ballon entre les chevilles ou les genoux : le levier est plus long et plus exigeant.',
          en: 'Legs straight, ball between the ankles or knees: the lever is longer and more demanding.',
        },
        mastery: {
          fr: '5 × 30 s à effort fort, sans douleur.',
          en: '5 × 30 s at a strong effort, pain-free.',
        },
        dosage: { sets: 5, holdSec: 30, restSec: 45, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Effort maximal, entretien', en: 'Maximal effort, maintenance' },
        description: {
          fr: 'Serrages courts et maximaux, genoux fléchis ou jambes tendues, ou maintien à la machine à adducteurs.',
          en: 'Short maximal squeezes, knees bent or legs straight, or holds on the adductor machine.',
        },
        mastery: {
          fr: 'Niveau d’entretien : passez au Copenhagen pour un travail dynamique.',
          en: 'Maintenance level: move on to the Copenhagen for dynamic work.',
        },
        dosage: { sets: 3, holdSec: 10, restSec: 60, perSide: false, intensity: load('Effort maximal, sans douleur', 'Maximal effort, pain-free'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Ballon, coussin ou poings', en: 'Ball, cushion or fists' },
        instructions: {
          fr: 'Un ballon de foot dégonflé, un coussin roulé ou vos deux poings superposés entre les genoux.',
          en: 'A partly deflated football, a rolled cushion or your two stacked fists between the knees.',
        },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 2,
        name: { fr: 'Machine à adducteurs', en: 'Adductor machine' },
        instructions: {
          fr: 'Maintien isométrique en position intermédiaire, charge augmentée progressivement.',
          en: 'Isometric hold at mid-range, load increased gradually.',
        },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'pippas-2025',
          finding: {
            fr: 'Chez 57 jeunes footballeurs, 8 semaines de serrage isométrique des adducteurs ont donné des gains de force comparables au Copenhagen, avec moins de courbatures.',
            en: 'In 57 young football players, 8 weeks of isometric adductor squeezes gave strength gains comparable to the Copenhagen, with less soreness.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'side-lying-hip-adduction',
    family: 'adductor-side-lying',
    name: { fr: 'Adduction couché sur le côté', en: 'Side-lying hip adduction' },
    sports: ['run', 'bike'],
    zones: ['adductors'],
    half: 'lower',
    muscles: {
      primary: ['adductor-longus', 'gracilis'],
      secondary: ['adductor-magnus'],
    },
    zoom: 'pelvis-front',
    qualities: ['strength', 'endurance'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Couché sur le côté, on soulève la jambe du dessous : un travail simple et facile à doser des adducteurs, utile pour reprendre en douceur après une douleur de l’aine.',
      en: 'Lying on your side, you lift the bottom leg: a simple, easily adjusted adductor exercise, useful for a gentle restart after groin pain.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le côté, tête sur le bras, jambe du dessus fléchie avec le pied posé devant le genou du dessous (ou genou sur un coussin).',
        en: 'Lying on your side, head on your arm, top leg bent with the foot in front of the bottom knee (or knee on a cushion).',
      },
      movement: {
        fr: 'Levez la jambe du dessous tendue de quelques centimètres à une vingtaine de centimètres, marquez un temps, puis redescendez lentement.',
        en: 'Lift the straight bottom leg a few to about twenty centimetres, pause, then lower slowly.',
      },
      cues: [
        { fr: 'Pointe de pied vers l’avant, pas vers le plafond.', en: 'Toes pointing forward, not up to the ceiling.' },
        { fr: 'Bassin immobile.', en: 'Pelvis still.' },
      ],
    },
    mistakes: [
      { fr: 'Rouler le bassin vers l’arrière.', en: 'Rolling the pelvis backwards.' },
      { fr: 'Monter trop vite et retomber.', en: 'Lifting too fast and dropping.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Poids de la jambe', en: 'Leg weight only' },
        description: { fr: 'Jambe seule, petite amplitude.', en: 'Leg weight only, small range.' },
        mastery: {
          fr: '3 × 15 de chaque côté sans douleur.',
          en: '3 × 15 per side without pain.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Pause en haut', en: 'Pause at the top' },
        description: {
          fr: 'Maintien de 3 secondes en haut à chaque répétition.',
          en: '3-second hold at the top of each rep.',
        },
        mastery: {
          fr: '3 × 15 avec pause, symétriques.',
          en: '3 × 15 with pause, symmetrical.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-3-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Lesté', en: 'Weighted' },
        description: {
          fr: 'Élastique ou charge légère à la cheville.',
          en: 'Band or light weight at the ankle.',
        },
        mastery: {
          fr: 'Passez au Copenhagen quand 3 × 12 lestés sont faciles.',
          en: 'Move on to the Copenhagen when 3 × 12 weighted is easy.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis.', en: 'On a mat.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: {
          fr: 'Mini-bande autour des chevilles : la jambe du dessus reste au sol devant vous et sert d’ancrage.',
          en: 'Mini band around the ankles: the top leg stays on the floor in front and acts as the anchor.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Lest de cheville ou haltère légère', en: 'Ankle weight or light dumbbell' },
        instructions: {
          fr: 'Lest de cheville, ou haltère légère posée sur l’intérieur de la cheville et tenue par la main.',
          en: 'Ankle weight, or a light dumbbell resting on the inner ankle and steadied by hand.',
        },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'serner-2014',
          finding: {
            fr: 'L’activité du long adducteur variait de 14 % à 108 % selon les exercices d’adduction : on peut ainsi les graduer de la rééducation à la prévention.',
            en: 'Adductor longus activity ranged from 14% to 108% across adduction exercises, so they can be graded from rehabilitation to prevention.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'standing-hip-adduction',
    family: 'adductor-standing',
    name: { fr: 'Adduction debout (élastique ou poulie)', en: 'Standing hip adduction (band or cable)' },
    sports: ['run', 'bike'],
    zones: ['adductors'],
    half: 'lower',
    muscles: {
      primary: ['adductor-longus', 'gracilis'],
      secondary: ['adductor-magnus', 'glute-med'],
    },
    zoom: 'pelvis-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'Debout, la jambe d’appui stabilise le bassin pendant que l’autre ramène la cuisse vers l’axe du corps : les deux côtés travaillent, comme pendant la course.',
      en: 'Standing, the support leg stabilises the pelvis while the other pulls the thigh towards the midline: both sides work, as they do when running.',
    },
    how: {
      setup: {
        fr: 'Debout de profil à côté du point d’ancrage, élastique ou câble autour de la cheville la plus proche, main sur un support.',
        en: 'Stand side-on to the anchor, band or cable around the nearest ankle, hand on a support.',
      },
      movement: {
        fr: 'Ramenez la jambe tendue devant la jambe d’appui en croisant légèrement, puis laissez-la revenir lentement sur le côté.',
        en: 'Sweep the straight leg across in front of the standing leg, then let it return slowly to the side.',
      },
      cues: [
        { fr: 'Buste droit, sans pencher.', en: 'Upright trunk, no leaning.' },
        { fr: 'Retour lent en 3 secondes.', en: 'Slow return over 3 seconds.' },
      ],
    },
    mistakes: [
      { fr: 'Tourner le bassin pour aller plus loin.', en: 'Rotating the pelvis to go further.' },
      { fr: 'Laisser l’élastique ramener la jambe d’un coup.', en: 'Letting the band snap the leg back.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Résistance légère', en: 'Light resistance' },
        description: {
          fr: 'Élastique léger ou glissement du pied sur une serviette, amplitude confortable.',
          en: 'Light band or foot sliding on a towel, comfortable range.',
        },
        mastery: {
          fr: '3 × 15 de chaque côté sans douleur.',
          en: '3 × 15 per side without pain.',
        },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Résistance moyenne, retour lent', en: 'Medium resistance, slow return' },
        description: {
          fr: 'Résistance plus forte, retour freiné en 3 à 4 secondes.',
          en: 'Stronger resistance, braked return over 3 to 4 seconds.',
        },
        mastery: {
          fr: '3 × 12 par côté, symétriques.',
          en: '3 × 12 per side, symmetrical.',
        },
        dosage: { sets: 3, reps: [10, 12], tempo: '4-0-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Lourd, poulie', en: 'Heavy, cable' },
        description: {
          fr: 'Poulie basse ou élastique fort, montée dynamique et retour contrôlé.',
          en: 'Low cable or strong band, dynamic pull and controlled return.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la résistance quand 3 × 8 deviennent faciles.',
          en: 'Maintenance level: increase resistance when 3 × 8 feels easy.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-X', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Glissement sur serviette', en: 'Towel slide' },
        instructions: {
          fr: 'Pied sur une serviette (sol lisse) : écartez la jambe sur le côté puis ramenez-la en serrant l’intérieur de cuisse.',
          en: 'Foot on a towel (smooth floor): slide the leg out to the side, then pull it back in by squeezing the inner thigh.',
        },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: {
          fr: 'Élastique fixé bas (pied de table, porte) : éloignez-vous pour augmenter la tension.',
          en: 'Band anchored low (table leg, door): step away to increase tension.',
        },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: {
          fr: 'Sangle de cheville sur la poulie basse, main sur la colonne de la machine.',
          en: 'Ankle strap on the low cable, hand on the machine frame.',
        },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'serner-2014',
          finding: {
            fr: 'L’adduction avec élastique fait partie, avec le Copenhagen, des exercices dynamiques les plus intenses pour le long adducteur, et se pratique facilement partout.',
            en: 'Elastic-band adduction is, with the Copenhagen, among the most intense dynamic exercises for the adductor longus, and can easily be done anywhere.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'lateral-lunge',
    family: 'lateral-lunge',
    name: { fr: 'Fente latérale et squat cosaque', en: 'Lateral lunge and Cossack squat' },
    sports: ['run'],
    zones: ['adductors', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['adductor-longus', 'gracilis', 'vastus-medialis'],
      secondary: ['adductor-magnus', 'glute-max', 'vastus-lateralis', 'rectus-femoris'],
    },
    zoom: 'leg-front',
    qualities: ['strength', 'mobility', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'En trail, sur sentier ou lors d’un écart, la jambe part sur le côté : les adducteurs doivent alors freiner en position allongée. La fente latérale les entraîne dans ce plan, rarement travaillé par la course en ligne droite.',
      en: 'On trails, uneven paths or when sidestepping, the leg moves out to the side: the adductors must then brake at long length. The lateral lunge trains them in this plane, rarely used in straight-line running.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds largement écartés (environ deux largeurs d’épaules), pointes de pied vers l’avant.',
        en: 'Stand with feet wide apart (about twice shoulder width), toes pointing forward.',
      },
      movement: {
        fr: 'Fléchissez une jambe en poussant les fesses vers l’arrière, l’autre jambe restant tendue, jusqu’à sentir l’étirement à l’intérieur de la cuisse tendue. Repoussez pour revenir au centre.',
        en: 'Bend one leg while pushing your hips back, keeping the other leg straight, until you feel a stretch on the inner straight thigh. Push back to the centre.',
      },
      cues: [
        { fr: 'Talon de la jambe fléchie au sol.', en: 'Heel of the bent leg stays down.' },
        { fr: 'Genou fléchi dans l’axe du pied.', en: 'Bent knee in line with the foot.' },
        { fr: 'Poitrine ouverte, dos long.', en: 'Chest open, long back.' },
      ],
    },
    mistakes: [
      { fr: 'Laisser le genou fléchi rentrer vers l’intérieur.', en: 'Letting the bent knee cave in.' },
      { fr: 'Forcer l’amplitude au point de ressentir une douleur dans l’aine.', en: 'Forcing range to the point of groin pain.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Fente latérale partielle', en: 'Partial lateral lunge' },
        description: {
          fr: 'Descente à mi-hauteur, une main sur un support si besoin.',
          en: 'Lower halfway, one hand on a support if needed.',
        },
        mastery: {
          fr: '3 × 10 par côté, genou aligné, sans douleur.',
          en: '3 × 10 per side, knee aligned, pain-free.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Fente latérale complète', en: 'Full lateral lunge' },
        description: {
          fr: 'Descente jusqu’à la cuisse parallèle au sol.',
          en: 'Lower until the thigh is parallel to the floor.',
        },
        mastery: {
          fr: '3 × 10 par côté, contrôle identique des deux côtés.',
          en: '3 × 10 per side, same control on both sides.',
        },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Squat cosaque', en: 'Cossack squat' },
        description: {
          fr: 'Descente profonde sur une jambe, l’autre tendue pointe vers le haut, passage d’un côté à l’autre sans se relever complètement.',
          en: 'Deep descent on one leg with the other straight, toes up, shifting side to side without fully standing.',
        },
        mastery: {
          fr: '3 × 8 par côté en amplitude complète, sans appui des mains.',
          en: '3 × 8 per side through full range, without hand support.',
        },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-0-1', restSec: 75, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Fente latérale chargée', en: 'Loaded lateral lunge' },
        description: {
          fr: 'Fente latérale complète avec une haltère ou une kettlebell tenue contre la poitrine.',
          en: 'Full lateral lunge with a dumbbell or kettlebell held at the chest.',
        },
        mastery: {
          fr: 'Niveau d’entretien : augmentez la charge quand 3 × 8 par côté deviennent faciles.',
          en: 'Maintenance level: increase the load when 3 × 8 per side feels easy.',
        },
        dosage: { sets: 3, reps: [6, 10], tempo: '3-0-1', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: {
          fr: 'Mains jointes devant la poitrine pour l’équilibre.',
          en: 'Hands together in front of the chest for balance.',
        },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Assisté aux sangles', en: 'Strap-assisted' },
        instructions: {
          fr: 'Poignées en mains pour vous aider à descendre plus bas en gardant le dos droit.',
          en: 'Handles in your hands to help you go deeper while keeping the back straight.',
        },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère ou kettlebell (gobelet)', en: 'Dumbbell or kettlebell (goblet)' },
        instructions: {
          fr: 'Charge tenue verticalement contre la poitrine.',
          en: 'Load held upright against the chest.',
        },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),
] satisfies ReturnType<typeof defineExercise>[];

