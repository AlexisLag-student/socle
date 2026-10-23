/**
 * Exercices — hanche : fessiers, rotateurs, fléchisseurs (skill add-exercise).
 * Les ischio-jambiers et les adducteurs appartiennent à la zone « cuisse ».
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

/** Consigne récurrente : douleur sur le côté de la hanche (tendons fessiers sensibles à la compression). */
const lateralHipCaution = {
  fr: 'Douleur sur le côté de la hanche : évitez de vous allonger sur le côté douloureux et de laisser la cuisse passer devant l’autre (jambes croisées), positions qui compriment les tendons fessiers.',
  en: 'Pain on the side of the hip: avoid lying on the painful side and letting the thigh cross in front of the other (legs crossed), positions that compress the gluteal tendons.',
};

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'glute-bridge',
    family: 'hip-thrust',
    name: { fr: 'Pont fessier et hip thrust', en: 'Glute bridge and hip thrust' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-max'],
      secondary: ['biceps-femoris', 'semitendinosus', 'glute-med', 'erector-spinae'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'power', 'endurance'],
    objectives: ['prevention', 'performance', 'return', 'pain'],
    perfGoals: ['strength', 'power'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Le grand fessier étend la hanche : il propulse le corps en course, surtout en côte et au sprint, et appuie sur la pédale au vélo. Le pont puis le hip thrust le chargent directement, avec peu de contrainte pour le dos et les genoux.',
      en: 'The gluteus maximus extends the hip: it drives the body forward when running, especially uphill and when sprinting, and pushes the pedal down on the bike. The bridge and then the hip thrust load it directly, with little stress on the back and knees.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le dos (ou le haut du dos appuyé sur un banc pour le hip thrust), genoux fléchis, pieds à plat à la largeur du bassin, talons à environ une main des fesses.',
        en: 'Lie on your back (or rest your upper back on a bench for the hip thrust), knees bent, feet flat and hip-width apart, heels about a hand’s width from your buttocks.',
      },
      movement: {
        fr: 'Poussez dans les talons pour monter le bassin jusqu’à aligner épaules, hanches et genoux. Tenez une seconde en serrant les fessiers, puis redescendez lentement sans relâcher.',
        en: 'Push through your heels to lift your hips until shoulders, hips and knees are in line. Hold for one second while squeezing your glutes, then lower slowly without letting go.',
      },
      cues: [
        { fr: 'Rentrez légèrement le menton et les côtes : le mouvement vient des hanches, pas du bas du dos.', en: 'Tuck your chin and ribs slightly: the movement comes from the hips, not the lower back.' },
        { fr: 'En haut, les tibias sont verticaux.', en: 'At the top, your shins are vertical.' },
        { fr: 'Les genoux restent dans l’axe des pieds.', en: 'Keep your knees in line with your feet.' },
      ],
      breathing: {
        fr: 'Expirez en montant, inspirez en descendant.',
        en: 'Breathe out on the way up, in on the way down.',
      },
    },
    mistakes: [
      { fr: 'Cambrer le bas du dos en haut au lieu de finir l’extension avec les fessiers.', en: 'Arching the lower back at the top instead of finishing the movement with the glutes.' },
      { fr: 'Pieds trop loin : les ischio-jambiers prennent le relais et peuvent faire une crampe.', en: 'Feet too far away: the hamstrings take over and may cramp.' },
      { fr: 'Bassin qui penche d’un côté en version sur une jambe.', en: 'Pelvis dropping to one side in the single-leg version.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Pont sur deux pieds', en: 'Two-leg bridge' },
        description: { fr: 'Allongé au sol, montée du bassin sur les deux pieds.', en: 'Lying on the floor, lift the hips with both feet down.' },
        mastery: { fr: '3 × 15 répétitions avec le bassin bien aligné en haut, sans crampe des ischio-jambiers ni gêne lombaire.', en: '3 × 15 reps with the hips fully aligned at the top, no hamstring cramp or lower-back discomfort.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-2', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Pont sur une jambe', en: 'Single-leg bridge' },
        description: { fr: 'Même mouvement en poussant sur une seule jambe, l’autre genou ramené vers la poitrine ou la jambe tendue.', en: 'Same movement pushing through one leg, the other knee pulled towards the chest or the leg held straight.' },
        mastery: { fr: '3 × 12 par jambe, bassin horizontal, nombre de répétitions comparable entre les deux côtés.', en: '3 × 12 per leg, pelvis level, similar rep count on both sides.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Hip thrust sur une jambe', en: 'Single-leg hip thrust' },
        description: { fr: 'Haut du dos appuyé sur un banc ou un canapé, poussée sur une jambe : l’amplitude est plus grande qu’au sol.', en: 'Upper back on a bench or sofa, pushing through one leg: the range of motion is larger than on the floor.' },
        mastery: { fr: '3 × 12 par jambe en extension complète de hanche, sans perte d’alignement du bassin.', en: '3 × 12 per leg reaching full hip extension, without losing pelvic alignment.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1-2', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Hip thrust chargé', en: 'Loaded hip thrust' },
        description: { fr: 'Sur deux jambes, haut du dos sur un banc, charge posée sur les hanches (barre avec manchon, haltère ou machine).', en: 'Both legs, upper back on a bench, load resting on the hips (padded barbell, dumbbell or machine).' },
        mastery: { fr: '4 × 8 avec une charge au moins égale à la moitié du poids du corps, verrouillage complet de la hanche à chaque répétition.', en: '4 × 8 with a load of at least half your body weight, full hip lockout on every rep.' },
        dosage: { sets: 4, reps: [6, 10], tempo: '2-0-1-1', restSec: 120, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Hip thrust lourd ou explosif', en: 'Heavy or explosive hip thrust' },
        description: { fr: 'Charge lourde (3 à 6 répétitions) pour la force, ou charge modérée montée le plus vite possible pour la puissance. Alternez selon le cycle d’entraînement.', en: 'Heavy load (3 to 6 reps) for strength, or a moderate load lifted as fast as possible for power. Alternate according to your training block.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 6 deviennent faciles avec une montée rapide.', en: 'Maintenance level: add load once 4 × 6 feels easy with a fast lift.' },
        dosage: { sets: 4, reps: [3, 6], tempo: '2-0-X-1', restSec: 180, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol, puis le haut du dos sur un canapé ou un banc stable pour le hip thrust.', en: 'On the floor, then with your upper back on a sofa or stable bench for the hip thrust.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Élastique au-dessus des genoux', en: 'Band above the knees' },
        instructions: { fr: 'Une mini-bande juste au-dessus des genoux oblige à garder les genoux écartés et fait aussi travailler le moyen fessier.', en: 'A mini band just above the knees forces you to keep the knees apart and also works the gluteus medius.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell', en: 'Dumbbell or kettlebell' },
        instructions: { fr: 'Posez la charge sur le pli de la hanche et tenez-la des deux mains.', en: 'Rest the weight in the crease of the hips and hold it with both hands.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à hip thrust ou cadre guidé', en: 'Hip thrust machine or Smith machine' },
        instructions: { fr: 'Machine dédiée ou barre guidée : réglez le banc à hauteur des omoplates.', en: 'Dedicated machine or Smith bar: set the bench at shoulder-blade height.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 4,
        name: { fr: 'Barre libre', en: 'Barbell' },
        instructions: { fr: 'Barre roulée au-dessus des hanches avec un manchon de protection, haut du dos sur un banc stable calé contre un mur.', en: 'Roll the barbell over the hips with a protective pad, upper back on a stable bench braced against a wall.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Protégez l’avant du bassin avec un manchon ou une serviette pliée sous la barre.', en: 'Protect the front of the pelvis with a pad or folded towel under the bar.' },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'contreras-2017',
          finding: {
            fr: 'Chez de jeunes athlètes masculins, 6 semaines de hip thrust ont probablement mieux amélioré les temps sur 10 et 20 m que le squat avant, qui a davantage amélioré la détente verticale.',
            en: 'In adolescent male athletes, 6 weeks of hip thrusts likely improved 10 and 20 m sprint times more than front squats, which improved vertical jump height more.',
          },
        },
        {
          refId: 'neto-2019',
          finding: {
            fr: 'Le hip thrust à la barre active davantage les extenseurs de hanche (grand fessier, biceps fémoral) que le squat ; son effet à long terme sur le sprint reste à confirmer.',
            en: 'The barbell hip thrust activates the hip extensors (gluteus maximus, biceps femoris) more than the squat; its long-term effect on sprinting still needs confirmation.',
          },
        },
        {
          refId: 'selkowitz-2013',
          finding: {
            fr: 'Le pont sur une jambe fait partie des exercices qui sollicitent le plus les fessiers par rapport au tenseur du fascia lata.',
            en: 'The single-leg bridge is among the exercises that recruit the glutes most relative to the tensor fasciae latae.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'side-lying-hip-abduction',
    family: 'hip-abduction',
    name: { fr: 'Abduction de hanche couché sur le côté', en: 'Side-lying hip abduction' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'glute-min'],
      secondary: ['tensor-fasciae-latae', 'glute-max'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'endurance', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Le moyen et le petit fessier gardent le bassin horizontal à chaque appui de course et aident à garder le genou dans l’axe. Au vélo, ils stabilisent le bassin sur la selle pendant le pédalage.',
      en: 'The gluteus medius and minimus keep the pelvis level at every running step and help keep the knee in line. On the bike, they stabilise the pelvis on the saddle while pedalling.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le côté, dos et talons près d’un mur pour guider le mouvement, jambe du dessous fléchie, bassin légèrement basculé vers l’avant.',
        en: 'Lie on your side with your back and heels close to a wall to guide the movement, bottom leg bent, pelvis tipped slightly forwards.',
      },
      movement: {
        fr: 'Montez la jambe du dessus d’environ 30 à 40°, légèrement en arrière de l’axe du corps, talon en tête. Tenez une seconde puis redescendez lentement sans poser la jambe.',
        en: 'Lift the top leg about 30 to 40°, slightly behind the line of the body, heel leading. Hold for one second, then lower slowly without resting the leg.',
      },
      cues: [
        { fr: 'Le talon monte en premier, les orteils regardent devant ou légèrement vers le sol.', en: 'Lead with the heel, toes pointing forwards or slightly down.' },
        { fr: 'Le bassin ne roule pas vers l’arrière.', en: 'Do not let the pelvis roll backwards.' },
        { fr: 'Mieux vaut monter moins haut que compenser avec le tronc.', en: 'Better to lift less high than to compensate with the trunk.' },
      ],
    },
    mistakes: [
      { fr: 'Monter trop haut en inclinant le bassin.', en: 'Lifting too high by tilting the pelvis.' },
      { fr: 'Jambe qui part vers l’avant : les fléchisseurs de hanche et le tenseur du fascia lata prennent le relais.', en: 'Leg drifting forwards: the hip flexors and tensor fasciae latae take over.' },
      { fr: 'Pointe du pied tournée vers le plafond.', en: 'Toes turned up towards the ceiling.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Genou fléchi', en: 'Bent knee' },
        description: { fr: 'Jambe du dessus fléchie à 90° : le bras de levier est court, l’effort plus léger.', en: 'Top leg bent at 90°: the lever is short, the effort lighter.' },
        mastery: { fr: '3 × 15 par côté avec un bassin stable.', en: '3 × 15 per side with a stable pelvis.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Jambe tendue', en: 'Straight leg' },
        description: { fr: 'Jambe du dessus tendue, légèrement en arrière.', en: 'Top leg straight, slightly behind the body.' },
        mastery: { fr: '3 × 20 par côté sans que la jambe dérive vers l’avant.', en: '3 × 20 per side without the leg drifting forwards.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Jambe tendue, pause en haut', en: 'Straight leg with top hold' },
        description: { fr: 'Même mouvement avec 3 secondes de maintien en haut à chaque répétition.', en: 'Same movement with a 3-second hold at the top of each rep.' },
        mastery: { fr: '3 × 12 par côté avec le maintien complet, symétriques entre les deux côtés.', en: '3 × 12 per side with the full hold, symmetrical between sides.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-3', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Avec résistance', en: 'With resistance' },
        description: { fr: 'Élastique autour des chevilles, ou abduction debout à la poulie basse avec une sangle de cheville.', en: 'Band around the ankles, or standing abduction on a low cable with an ankle strap.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la résistance quand 3 × 15 deviennent faciles.', en: 'Maintenance level: increase resistance once 3 × 15 feels easy.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol, le dos près d’un mur pour garder la jambe dans le bon axe.', en: 'On the floor, back near a wall to keep the leg on the right path.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique aux chevilles', en: 'Band around the ankles' },
        instructions: { fr: 'Mini-bande autour des chevilles ; passez à une bande plus forte pour progresser.', en: 'Mini band around the ankles; move to a stronger band to progress.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Abduction debout à la poulie', en: 'Standing cable abduction' },
        instructions: { fr: 'Debout de profil à la poulie basse, sangle à la cheville extérieure, une main sur le montant : écartez la jambe sans pencher le buste.', en: 'Stand side-on to a low cable, strap on the outside ankle, one hand on the frame: move the leg out without leaning the trunk.' },
      },
    ],
    precautions: [caution.painFlare, lateralHipCaution],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'distefano-2009',
          finding: {
            fr: 'Chez 21 sujets actifs, l’abduction couchée sur le côté a le plus sollicité le moyen fessier (environ 81 % de la contraction maximale), davantage que le coquillage ou les fentes.',
            en: 'In 21 active people, side-lying hip abduction recruited the gluteus medius the most (about 81% of maximal contraction), more than the clam or lunges.',
          },
        },
        {
          refId: 'bolgla-2005',
          finding: {
            fr: 'L’abduction couchée sur le côté sollicite le moyen fessier autant que les exercices en appui, et plus que l’abduction debout sans appui.',
            en: 'Side-lying abduction recruits the gluteus medius as much as weight-bearing exercises, and more than standing non-weight-bearing abduction.',
          },
        },
        {
          refId: 'landauer-2026',
          finding: {
            fr: 'Chez 48 coureurs entraînés, 10 semaines de renforcement des abducteurs et rotateurs externes ont augmenté la force d’abduction de 11 à 17 % sans modifier la mécanique de course dans le plan frontal.',
            en: 'In 48 trained runners, 10 weeks of hip abductor and external rotator strengthening increased abduction strength by 11–17% without changing frontal-plane running mechanics.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'clamshell',
    family: 'hip-external-rotation',
    name: { fr: 'Coquillage (clamshell)', en: 'Clamshell' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'deep-hip-rotators'],
      secondary: ['glute-max', 'piriformis', 'glute-min'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'endurance', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'Les rotateurs externes et le moyen fessier empêchent la cuisse de tourner vers l’intérieur à la réception de chaque foulée. Le coquillage les fait travailler en sollicitant peu le tenseur du fascia lata.',
      en: 'The external rotators and gluteus medius stop the thigh from rotating inwards each time the foot lands. The clamshell works them while involving the tensor fasciae latae very little.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le côté, hanches fléchies à environ 45°, genoux fléchis à 90°, talons alignés avec les fesses, tête posée sur le bras.',
        en: 'Lie on your side, hips bent about 45°, knees bent at 90°, heels in line with your buttocks, head resting on your arm.',
      },
      movement: {
        fr: 'Gardez les pieds collés et ouvrez le genou du dessus comme une coquille, sans faire rouler le bassin. Tenez une seconde puis refermez lentement.',
        en: 'Keep your feet together and open the top knee like a shell, without rolling the pelvis. Hold for one second, then close slowly.',
      },
      cues: [
        { fr: 'Posez la main sur la hanche du dessus pour sentir qu’elle ne recule pas.', en: 'Place a hand on the top hip to check it does not roll back.' },
        { fr: 'Ouvrez seulement jusqu’où le bassin reste immobile.', en: 'Open only as far as the pelvis stays still.' },
      ],
    },
    mistakes: [
      { fr: 'Rouler le bassin vers l’arrière pour ouvrir plus grand.', en: 'Rolling the pelvis back to open wider.' },
      { fr: 'Aller vite et laisser retomber le genou.', en: 'Going fast and letting the knee drop.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Coquillage sans résistance', en: 'Clamshell, no resistance' },
        description: { fr: 'Mouvement de base, sans élastique.', en: 'Basic movement, without a band.' },
        mastery: { fr: '3 × 20 par côté sans bascule du bassin.', en: '3 × 20 per side without pelvic roll.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-0-1-1', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Avec élastique', en: 'With a band' },
        description: { fr: 'Mini-bande au-dessus des genoux.', en: 'Mini band above the knees.' },
        mastery: { fr: '3 × 15 par côté avec une bande moyenne, avec 1 seconde de maintien en haut.', en: '3 × 15 per side with a medium band, holding 1 second at the top.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Pieds décollés', en: 'Feet lifted' },
        description: { fr: 'Pieds décollés du sol pendant toute la série, puis ouverture du genou : la hanche travaille sans repos.', en: 'Feet lifted off the floor for the whole set while opening the knee: the hip works without rest.' },
        mastery: { fr: '3 × 12 par côté sans que les pieds retombent.', en: '3 × 12 per side without the feet dropping.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-2', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Coquillage en gainage latéral', en: 'Side-plank clamshell' },
        description: { fr: 'En appui sur l’avant-bras et le genou du dessous, bassin décollé, ouverture du genou du dessus (avec ou sans élastique).', en: 'Supported on the forearm and bottom knee with hips lifted, open the top knee (with or without a band).' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 par côté en gardant le bassin haut.', en: 'Maintenance level: 3 × 10 per side keeping the hips up.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol, sur un tapis.', en: 'On the floor, on a mat.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Mini-bande', en: 'Mini band' },
        instructions: { fr: 'Bande juste au-dessus des genoux ; progressez en prenant une bande plus forte.', en: 'Band just above the knees; progress with a stronger band.' },
      },
    ],
    precautions: [caution.painFlare, lateralHipCaution],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'selkowitz-2013',
          finding: {
            fr: 'En EMG intramusculaire, le coquillage est l’exercice qui sollicitait le plus les fessiers par rapport au tenseur du fascia lata parmi 11 exercices.',
            en: 'With fine-wire EMG, the clam was the exercise with the highest gluteal-to-tensor fasciae latae activation among 11 exercises.',
          },
        },
        {
          refId: 'distefano-2009',
          finding: {
            fr: 'Le coquillage simple sollicite modérément le moyen fessier (environ 40 % de la contraction maximale), moins que l’abduction couchée sur le côté.',
            en: 'The basic clam moderately recruits the gluteus medius (about 40% of maximal contraction), less than side-lying abduction.',
          },
        },
        {
          refId: 'boren-2011',
          finding: {
            fr: 'Une progression avancée du coquillage faisait partie des cinq exercices dépassant 70 % de la contraction maximale du moyen fessier.',
            en: 'An advanced clamshell progression was among the five exercises exceeding 70% of maximal gluteus medius contraction.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'lateral-band-walk',
    family: 'lateral-walk',
    name: { fr: 'Marche latérale avec élastique', en: 'Lateral band walk' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-med'],
      secondary: ['glute-max', 'glute-min', 'tensor-fasciae-latae'],
    },
    zoom: 'pelvis-back',
    qualities: ['endurance', 'control', 'strength'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run'],
    why: {
      fr: 'En course, chaque appui se fait sur une jambe : le moyen fessier doit tenir le bassin pendant que l’autre jambe bouge. La marche latérale le fait travailler debout, en appui, comme dans le geste.',
      en: 'Running is a series of single-leg stances: the gluteus medius must hold the pelvis while the other leg moves. The lateral walk trains it standing and weight-bearing, as in the real movement.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds à la largeur du bassin, genoux et hanches légèrement fléchis (quart de squat), élastique autour des jambes.',
        en: 'Stand with feet hip-width apart, knees and hips slightly bent (quarter squat), band around the legs.',
      },
      movement: {
        fr: 'Faites un pas de côté d’une demi-largeur d’épaules, puis ramenez l’autre pied sans que les pieds se touchent. Faites tous les pas d’un côté, puis revenez dans l’autre sens.',
        en: 'Step sideways about half a shoulder-width, then bring the other foot in without the feet touching. Take all the steps one way, then come back the other way.',
      },
      cues: [
        { fr: 'Gardez la hauteur constante : pas de rebond.', en: 'Keep your height constant: no bouncing.' },
        { fr: 'Les genoux restent dans l’axe des pieds, sans rentrer.', en: 'Knees stay in line with the feet, without caving in.' },
        { fr: 'Buste droit, sans balancer d’un côté à l’autre.', en: 'Upright trunk, no swaying side to side.' },
      ],
    },
    mistakes: [
      { fr: 'Pencher le buste pour avancer.', en: 'Leaning the trunk to move along.' },
      { fr: 'Laisser l’élastique ramener les pieds ensemble.', en: 'Letting the band pull the feet together.' },
      { fr: 'Pas trop grands, qui font perdre la posture.', en: 'Steps too long, so posture is lost.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Pas chassés sans élastique', en: 'Side steps, no band' },
        description: { fr: 'En quart de squat, pas latéraux lents sans résistance pour apprendre la posture.', en: 'In a quarter squat, slow side steps without resistance to learn the posture.' },
        mastery: { fr: '3 × 15 pas de chaque côté en gardant la hauteur et l’alignement des genoux.', en: '3 × 15 steps each way keeping height and knee alignment.' },
        dosage: { sets: 3, reps: [12, 15], restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Élastique au-dessus des genoux', en: 'Band above the knees' },
        description: { fr: 'Mini-bande juste au-dessus des genoux.', en: 'Mini band just above the knees.' },
        mastery: { fr: '3 × 15 pas de chaque côté sans que les genoux rentrent.', en: '3 × 15 steps each way without the knees caving in.' },
        dosage: { sets: 3, reps: [12, 15], restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Élastique aux chevilles', en: 'Band at the ankles' },
        description: { fr: 'Bande autour des chevilles : le bras de levier est plus long, l’effort plus important.', en: 'Band around the ankles: the lever is longer, the effort greater.' },
        mastery: { fr: '3 × 15 pas de chaque côté avec une bande moyenne.', en: '3 × 15 steps each way with a medium band.' },
        dosage: { sets: 3, reps: [12, 15], restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 4,
        name: { fr: 'Élastique aux pieds, squat plus bas', en: 'Band at the feet, lower squat' },
        description: { fr: 'Bande autour de l’avant-pied, demi-squat, avec des pas en diagonale vers l’avant et l’arrière (« monster walk »).', en: 'Band around the forefoot, half squat, with diagonal steps forwards and backwards ("monster walk").' },
        mastery: { fr: 'Niveau d’entretien : passez à une bande plus forte quand 3 × 20 pas deviennent faciles.', en: 'Maintenance level: move to a stronger band once 3 × 20 steps feels easy.' },
        dosage: { sets: 3, reps: [15, 20], restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        requires: ['band'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Pas chassés lents en quart de squat, dans un couloir.', en: 'Slow side steps in a quarter squat, along a corridor.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Mini-bande', en: 'Mini band' },
        instructions: { fr: 'Plus la bande est basse (genoux, chevilles, pieds), plus l’exercice est difficile.', en: 'The lower the band (knees, ankles, feet), the harder the exercise.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'selkowitz-2013',
          finding: {
            fr: 'Lors des pas latéraux avec élastique, le moyen fessier et le haut du grand fessier travaillaient nettement plus que le tenseur du fascia lata.',
            en: 'During banded side steps, the gluteus medius and upper gluteus maximus were clearly more active than the tensor fasciae latae.',
          },
        },
        {
          refId: 'distefano-2009',
          finding: {
            fr: 'La marche latérale avec élastique sollicite moins le grand fessier (environ 27 % de la contraction maximale) que le squat ou le soulevé de terre sur une jambe (environ 59 %).',
            en: 'The lateral band walk recruits the gluteus maximus less (about 27% of maximal contraction) than the single-leg squat or single-leg deadlift (about 59%).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-hike',
    family: 'pelvic-drop',
    name: { fr: 'Élévation du bassin sur une marche (hip hike)', en: 'Hip hike' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'glute-min'],
      secondary: ['tensor-fasciae-latae', 'quadratus-lumborum'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'À chaque appui de course, le moyen fessier de la jambe au sol empêche le bassin de tomber du côté opposé. Cet exercice reproduit exactement ce rôle, en appui sur une jambe. À vélo, ces mêmes muscles stabilisent le bassin sur la selle et aident à garder le genou dans l’axe quand vous poussez fort ou pédalez en danseuse.',
      en: 'At every running step, the gluteus medius of the stance leg stops the pelvis dropping on the opposite side. This exercise reproduces exactly that role, standing on one leg. On the bike, the same muscles steady the pelvis on the saddle and help keep the knee in line when you push hard or ride out of the saddle.',
    },
    how: {
      setup: {
        fr: 'Debout de profil sur une marche, sur une jambe, l’autre jambe dans le vide, une main contre le mur ou la rampe.',
        en: 'Stand side-on on a step, on one leg, the other leg hanging free, one hand on the wall or rail.',
      },
      movement: {
        fr: 'Laissez descendre le bassin du côté de la jambe libre de quelques centimètres, genou d’appui tendu sans le verrouiller, puis remontez le bassin un peu au-dessus de l’horizontale en poussant avec la hanche d’appui.',
        en: 'Let the pelvis drop a few centimetres on the free-leg side, stance knee straight but not locked, then lift the pelvis slightly above level by pushing from the stance hip.',
      },
      cues: [
        { fr: 'Le mouvement vient de la hanche d’appui, pas de la taille.', en: 'The movement comes from the stance hip, not the waist.' },
        { fr: 'Le buste reste vertical, sans pencher sur le côté.', en: 'Keep the trunk upright, without leaning sideways.' },
      ],
    },
    mistakes: [
      { fr: 'Plier le genou de la jambe d’appui pour descendre.', en: 'Bending the stance knee to go down.' },
      { fr: 'Pencher le buste au lieu de bouger le bassin.', en: 'Leaning the trunk instead of moving the pelvis.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Au sol', en: 'On flat ground' },
        description: { fr: 'Debout sur une jambe au sol, genou libre légèrement plié : petite amplitude, sans marche.', en: 'Standing on one leg on the floor, free knee slightly bent: small range, no step.' },
        mastery: { fr: '3 × 15 par côté avec le buste immobile.', en: '3 × 15 per side with a still trunk.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Sur une marche', en: 'On a step' },
        description: { fr: 'Sur une marche, la jambe libre dans le vide : amplitude complète.', en: 'On a step with the free leg hanging: full range.' },
        mastery: { fr: '3 × 15 par côté en pleine amplitude, symétriques.', en: '3 × 15 per side through full range, symmetrical.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Sur une marche, maintien en haut', en: 'On a step, top hold' },
        description: { fr: 'Même mouvement avec 3 secondes de maintien, bassin au-dessus de l’horizontale.', en: 'Same movement with a 3-second hold, pelvis above level.' },
        mastery: { fr: '3 × 12 par côté avec le maintien, sans aide de la main.', en: '3 × 12 per side with the hold, without using the hand.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-3', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Sur une marche, lesté', en: 'On a step, weighted' },
        description: { fr: 'Haltère tenu dans la main du côté de la jambe libre.', en: 'Dumbbell held in the hand on the free-leg side.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 12 deviennent faciles.', en: 'Maintenance level: add load once 3 × 12 feels easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1-2', restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        requires: ['step'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol, puis sur la première marche d’un escalier, main sur la rampe.', en: 'On the floor, then on the bottom stair, hand on the rail.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Tenez l’haltère du côté de la jambe libre, l’autre main au mur.', en: 'Hold the dumbbell on the free-leg side, other hand on the wall.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'bolgla-2005',
          finding: {
            fr: 'Chez 16 sujets sains, l’élévation du bassin en appui sur une jambe sollicitait davantage le moyen fessier que les abductions debout sans appui.',
            en: 'In 16 healthy people, the single-leg pelvic drop exercise recruited the gluteus medius more than standing non-weight-bearing abduction.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-flexor-march',
    family: 'hip-flexion',
    name: { fr: 'Montée de genou (fléchisseurs de hanche)', en: 'Hip flexor march' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['iliopsoas', 'rectus-femoris'],
      secondary: ['tensor-fasciae-latae', 'sartorius', 'rectus-abdominis'],
    },
    zoom: 'pelvis-front',
    qualities: ['strength', 'control', 'power'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les fléchisseurs de hanche ramènent la jambe vers l’avant à chaque foulée, d’autant plus que la vitesse augmente. Au vélo, ils remontent la jambe en haut du coup de pédale.',
      en: 'The hip flexors swing the leg forwards at every stride, more so as speed increases. On the bike, they lift the leg over the top of the pedal stroke.',
    },
    how: {
      setup: {
        fr: 'Debout, droit, une main contre un mur si besoin, ou allongé sur le dos selon le niveau.',
        en: 'Stand tall, one hand on a wall if needed, or lie on your back depending on the level.',
      },
      movement: {
        fr: 'Montez un genou au-dessus de la hauteur de la hanche sans pencher le buste en arrière, tenez puis redescendez lentement. Alternez les jambes.',
        en: 'Lift one knee above hip height without leaning the trunk back, hold, then lower slowly. Alternate legs.',
      },
      cues: [
        { fr: 'Grandissez-vous : le buste ne recule pas quand le genou monte.', en: 'Stand tall: the trunk does not lean back as the knee rises.' },
        { fr: 'Pied relevé (pointe vers le tibia).', en: 'Foot pulled up (toes towards the shin).' },
        { fr: 'Le bassin reste horizontal sur la jambe d’appui.', en: 'Keep the pelvis level over the stance leg.' },
      ],
    },
    mistakes: [
      { fr: 'Basculer le buste en arrière pour monter le genou.', en: 'Leaning back to lift the knee.' },
      { fr: 'Cambrer le bas du dos en version allongée.', en: 'Arching the lower back in the lying version.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Marche lente debout', en: 'Slow standing march' },
        description: { fr: 'Montée du genou au-dessus de la hanche avec 2 secondes de maintien, sans résistance.', en: 'Lift the knee above hip height with a 2-second hold, no resistance.' },
        mastery: { fr: '3 × 10 par côté sans pencher le buste.', en: '3 × 10 per side without leaning the trunk.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-2', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Allongé avec élastique', en: 'Lying with a band' },
        description: { fr: 'Sur le dos, élastique autour des deux pieds : une jambe reste tendue au sol, l’autre genou monte vers la poitrine.', en: 'On your back with a band around both feet: one leg stays straight on the floor, the other knee comes up towards the chest.' },
        mastery: { fr: '3 × 12 par côté sans cambrer le dos.', en: '3 × 12 per side without arching the back.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Debout avec élastique, maintien haut', en: 'Standing with a band, top hold' },
        description: { fr: 'Élastique sous le pied d’appui et sur l’autre pied : montée du genou et 3 secondes de maintien au-dessus de la hanche.', en: 'Band under the stance foot and over the other foot: lift the knee and hold 3 seconds above hip height.' },
        mastery: { fr: '3 × 10 par côté avec le maintien, bassin stable.', en: '3 × 10 per side with the hold, stable pelvis.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-3', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 4,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        description: { fr: 'Dos à la poulie basse, sangle à la cheville : montée du genou contre une charge réglable.', en: 'Back to a low cable, strap on the ankle: knee drive against an adjustable load.' },
        mastery: { fr: '3 × 10 par côté avec une charge qui laisse 2 répétitions en réserve.', en: '3 × 10 per side with a load leaving 2 reps in reserve.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Montée de genou explosive', en: 'Explosive knee drive' },
        description: { fr: 'Avec élastique ou poulie, montée du genou la plus rapide possible puis retour contrôlé, comme une impulsion de sprint.', en: 'With a band or cable, drive the knee up as fast as possible, then return under control, like a sprint drive.' },
        mastery: { fr: 'Niveau d’entretien : gardez une vitesse élevée sur toutes les répétitions.', en: 'Maintenance level: keep high speed on every rep.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-X-0', restSec: 90, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        requires: ['band'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Debout, une main contre le mur pour l’équilibre.', en: 'Standing, one hand on the wall for balance.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique en boucle autour des pieds ; prenez un élastique plus fort pour progresser.', en: 'Loop band around the feet; use a stronger band to progress.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Sangle de cheville à la poulie basse, une main sur le montant.', en: 'Ankle strap on the low cable, one hand on the frame.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Pincement ou blocage profond dans le pli de l’aine en montant le genou : réduisez la hauteur et parlez-en à un professionnel si cela persiste.', en: 'Pinching or deep catching in the groin crease as the knee rises: reduce the height and see a professional if it persists.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-abduction-isometric',
    family: 'hip-abduction-isometric',
    name: { fr: 'Abduction de hanche isométrique', en: 'Isometric hip abduction' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'glute-min'],
      secondary: ['glute-max', 'tensor-fasciae-latae'],
    },
    zoom: 'pelvis-back',
    qualities: ['isometric', 'strength'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Contracter les abducteurs sans bouger charge les tendons fessiers en gardant la hanche dans une position neutre, sans les comprimer. C’est un moyen de garder de la force quand le côté de la hanche est sensible.',
      en: 'Contracting the abductors without moving loads the gluteal tendons while the hip stays in a neutral position, without compressing them. It is a way to keep strength when the side of the hip is sensitive.',
    },
    how: {
      setup: {
        fr: 'Selon le niveau : allongé sur le dos, genoux fléchis, ceinture ou élastique autour des cuisses ; ou debout de profil contre un mur.',
        en: 'Depending on the level: lying on your back, knees bent, belt or band around the thighs; or standing side-on to a wall.',
      },
      movement: {
        fr: 'Poussez les cuisses vers l’extérieur contre la résistance (ceinture, élastique ou mur) sans bouger, en gardant le bassin horizontal, puis relâchez doucement.',
        en: 'Push the thighs outwards against the resistance (belt, band or wall) without moving, keeping the pelvis level, then release gently.',
      },
      cues: [
        { fr: 'Effort progressif et soutenu, jamais brutal.', en: 'Gradual, sustained effort, never sudden.' },
        { fr: 'Debout, le bassin reste horizontal et le genou d’appui dans l’axe.', en: 'Standing, keep the pelvis level and the stance knee in line.' },
      ],
      breathing: { fr: 'Respirez normalement pendant le maintien.', en: 'Breathe normally during the hold.' },
    },
    mistakes: [
      { fr: 'Laisser la hanche d’appui partir vers l’extérieur (hanche « sortie »).', en: 'Letting the stance hip shift outwards (hip "hitched out").' },
      { fr: 'Pousser si fort que la douleur augmente pendant le maintien.', en: 'Pushing so hard that pain rises during the hold.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Allongé, ceinture autour des cuisses', en: 'Lying, belt around the thighs' },
        description: { fr: 'Sur le dos, genoux fléchis, ceinture ou élastique au-dessus des genoux : poussez vers l’extérieur sans bouger.', en: 'On your back, knees bent, belt or band above the knees: push outwards without moving.' },
        mastery: { fr: '5 × 45 s tenus avec une gêne stable ou en baisse.', en: '5 × 45 s held with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Debout, jambe libre contre le mur', en: 'Standing, free leg against the wall' },
        description: { fr: 'Debout de profil, genou côté mur fléchi à 90° et appuyé contre le mur : poussez le genou dans le mur.', en: 'Standing side-on, the knee nearest the wall bent to 90° and resting on the wall: push the knee into the wall.' },
        mastery: { fr: '5 × 45 s par côté sans augmentation de la douleur le lendemain.', en: '5 × 45 s per side without more pain the next day.' },
        dosage: { sets: 5, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Debout, appui sur la jambe travaillée', en: 'Standing on the working leg' },
        description: { fr: 'Même position, mais on travaille la jambe d’appui (loin du mur) : elle garde le bassin horizontal pendant que l’autre genou pousse dans le mur.', en: 'Same position, but the stance leg (away from the wall) is the one working: it keeps the pelvis level while the other knee pushes into the wall.' },
        mastery: { fr: '5 × 45 s par côté, bassin horizontal, sans douleur croissante.', en: '5 × 45 s per side, pelvis level, without increasing pain.' },
        dosage: { sets: 5, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Debout, genou d’appui fléchi', en: 'Standing, stance knee bent' },
        description: { fr: 'Même exercice en quart de squat sur la jambe d’appui : les fessiers travaillent davantage.', en: 'Same exercise in a quarter squat on the stance leg: the glutes work harder.' },
        mastery: { fr: 'Passer aux exercices dynamiques (pont, marche latérale, élévation du bassin) quand ce niveau est bien toléré.', en: 'Move on to dynamic exercises (bridge, lateral walk, hip hike) once this level is well tolerated.' },
        dosage: { sets: 4, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Mur ou ceinture', en: 'Wall or belt' },
        instructions: { fr: 'Une ceinture bouclée autour des cuisses ou un mur suffisent.', en: 'A buckled belt around the thighs or a wall is enough.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Mini-bande', en: 'Mini band' },
        instructions: { fr: 'Mini-bande au-dessus des genoux pour la version allongée.', en: 'Mini band above the knees for the lying version.' },
      },
    ],
    precautions: [
      caution.painFlare,
      lateralHipCaution,
      { fr: 'L’effet antidouleur immédiat de l’isométrie varie d’une personne à l’autre : son intérêt principal est de maintenir une charge tolérable.', en: 'The immediate pain-relieving effect of isometrics varies between people: their main value is to maintain a tolerable load.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'grimaldi-2015',
          finding: {
            fr: 'Cette revue décrit la compression des tendons fessiers en adduction de hanche comme un facteur clé et propose de gérer leur charge par l’exercice et l’éducation.',
            en: 'This review describes compression of the gluteal tendons in hip adduction as a key factor and proposes managing their load through exercise and education.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'side-plank-hip-abduction',
    family: 'plank-side',
    name: { fr: 'Gainage latéral avec abduction de hanche', en: 'Side plank with hip abduction' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes', 'trunk'],
    half: 'lower',
    muscles: {
      primary: ['glute-med', 'glute-min'],
      secondary: ['glute-max', 'tensor-fasciae-latae', 'external-oblique', 'quadratus-lumborum'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'control', 'isometric'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les fessiers des deux hanches travaillent ensemble : celle du dessous tient le bassin en l’air, celle du dessus écarte la jambe. C’est l’un des exercices au poids du corps qui sollicitent le plus le moyen fessier.',
      en: 'The glutes of both hips work together: the bottom hip holds the pelvis up while the top hip lifts the leg. It is one of the bodyweight exercises that recruit the gluteus medius the most.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le côté, coude sous l’épaule, genoux fléchis ou jambes tendues selon le niveau, corps aligné de la tête aux pieds.',
        en: 'Lie on your side, elbow under the shoulder, knees bent or legs straight depending on the level, body aligned from head to feet.',
      },
      movement: {
        fr: 'Décollez le bassin pour former une ligne droite, puis montez la jambe du dessus de 20 à 30 cm et redescendez-la lentement, sans laisser tomber le bassin.',
        en: 'Lift the hips to form a straight line, then raise the top leg 20 to 30 cm and lower it slowly, without letting the hips sag.',
      },
      cues: [
        { fr: 'Poussez le sol avec l’avant-bras, épaule loin de l’oreille.', en: 'Push the floor away with the forearm, shoulder away from the ear.' },
        { fr: 'Bassin haut et légèrement en avant, jamais cassé vers l’arrière.', en: 'Hips high and slightly forwards, never folded back.' },
      ],
      breathing: { fr: 'Respirez calmement, sans bloquer.', en: 'Breathe calmly, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Laisser le bassin descendre pendant que la jambe monte.', en: 'Letting the hips sag as the leg rises.' },
      { fr: 'Jambe du dessus qui part vers l’avant.', en: 'Top leg drifting forwards.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sur les genoux', en: 'On the knees' },
        description: { fr: 'Gainage latéral sur l’avant-bras et le genou du dessous, jambe du dessus tendue qui monte et descend.', en: 'Side plank on the forearm and bottom knee, top leg straight, lifting and lowering.' },
        mastery: { fr: '3 × 10 par côté sans que le bassin descende.', en: '3 × 10 per side without the hips sagging.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Jambes tendues, abductions courtes', en: 'Straight legs, short abductions' },
        description: { fr: 'Gainage latéral sur les pieds, quelques abductions de petite amplitude.', en: 'Side plank on the feet, a few small-range abductions.' },
        mastery: { fr: '3 × 8 par côté en gardant l’alignement.', en: '3 × 8 per side keeping alignment.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Jambes tendues, pleine amplitude', en: 'Straight legs, full range' },
        description: { fr: 'Gainage latéral sur les pieds, abduction complète avec une seconde de maintien en haut.', en: 'Side plank on the feet, full abduction with a one-second hold at the top.' },
        mastery: { fr: '3 × 12 par côté, symétriques entre les deux côtés.', en: '3 × 12 per side, symmetrical between sides.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Avec élastique', en: 'With a band' },
        description: { fr: 'Mini-bande autour des chevilles : la jambe du dessus travaille contre la bande, celle du dessous la retient.', en: 'Mini band around the ankles: the top leg works against the band, the bottom leg resists it.' },
        mastery: { fr: 'Niveau d’entretien : passez à une bande plus forte quand 3 × 12 deviennent faciles.', en: 'Maintenance level: move to a stronger band once 3 × 12 feels easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1-1', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        requires: ['band'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis, avant-bras posé à plat.', en: 'On a mat, forearm flat on the floor.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Mini-bande', en: 'Mini band' },
        instructions: { fr: 'Bande autour des chevilles ou juste au-dessus des genoux.', en: 'Band around the ankles or just above the knees.' },
      },
    ],
    precautions: [
      caution.painFlare,
      lateralHipCaution,
      { fr: 'Épaule douloureuse : gardez le coude exactement sous l’épaule, ou revenez à la version sur les genoux.', en: 'Painful shoulder: keep the elbow directly under the shoulder, or go back to the kneeling version.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'boren-2011',
          finding: {
            fr: 'Chez 24 sujets sains, le gainage latéral avec abduction était l’exercice qui sollicitait le plus le moyen fessier (89 à 103 % de la contraction maximale) parmi 18 exercices.',
            en: 'In 24 healthy people, the side plank with abduction was the exercise recruiting the gluteus medius the most (89 to 103% of maximal contraction) among 18 exercises.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'seated-hip-external-rotation',
    family: 'hip-external-rotation',
    name: { fr: 'Rotation externe de hanche assis contre élastique', en: 'Seated banded hip external rotation' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['deep-hip-rotators'],
      secondary: ['glute-max', 'glute-med'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    why: {
      fr: 'Les rotateurs profonds de hanche centrent la tête du fémur et contrôlent la rotation de la cuisse quand le pied se pose. Ils sont rarement travaillés de façon isolée, alors qu’ils se renforcent facilement.',
      en: 'The deep hip rotators centre the femoral head and control thigh rotation as the foot lands. They are rarely trained on their own, although they strengthen easily.',
    },
    how: {
      setup: {
        fr: 'Assis au bord d’une chaise haute ou d’un banc, cuisses horizontales, genoux à 90°. Élastique attaché à la cheville et fixé du côté extérieur de la jambe travaillée.',
        en: 'Sit on the edge of a high chair or bench, thighs level, knees at 90°. Band tied around the ankle and anchored on the outside of the working leg.',
      },
      movement: {
        fr: 'Sans bouger la cuisse ni le genou, amenez le pied vers l’intérieur (vers l’autre jambe) : la cuisse tourne sur elle-même. Revenez lentement.',
        en: 'Without moving the thigh or knee, bring the foot inwards (towards the other leg): the thigh rotates on itself. Return slowly.',
      },
      cues: [
        { fr: 'Le genou reste immobile, comme planté.', en: 'The knee stays still, as if pinned.' },
        { fr: 'Gardez les deux fesses posées sur l’assise.', en: 'Keep both buttocks on the seat.' },
      ],
    },
    mistakes: [
      { fr: 'Soulever la fesse ou pencher le buste pour gagner de l’amplitude.', en: 'Lifting a buttock or leaning the trunk to gain range.' },
      { fr: 'Déplacer le genou vers l’extérieur au lieu de tourner la cuisse.', en: 'Moving the knee outwards instead of rotating the thigh.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie contre la main', en: 'Isometric against the hand' },
        description: { fr: 'Assis, la main posée contre l’intérieur de la cheville : poussez le pied vers l’intérieur contre la main, sans bouger.', en: 'Seated, hand against the inside of the ankle: push the foot inwards into the hand without moving.' },
        mastery: { fr: '5 × 30 s par côté sans gêne croissante.', en: '5 × 30 s per side without increasing discomfort.' },
        dosage: { sets: 5, holdSec: 20, restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Élastique léger', en: 'Light band' },
        description: { fr: 'Rotation dynamique contre un élastique léger, amplitude confortable.', en: 'Dynamic rotation against a light band, comfortable range.' },
        mastery: { fr: '3 × 15 par côté, genou immobile.', en: '3 × 15 per side, knee still.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 45, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Élastique fort, retour lent', en: 'Strong band, slow return' },
        description: { fr: 'Élastique plus fort, retour freiné en 3 secondes.', en: 'Stronger band, return controlled over 3 seconds.' },
        mastery: { fr: '3 × 12 par côté avec le retour lent, symétriques.', en: '3 × 12 per side with the slow return, symmetrical.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-1-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 4,
        name: { fr: 'Poulie', en: 'Cable' },
        description: { fr: 'Même mouvement à la poulie basse, sangle à la cheville, charge réglable.', en: 'Same movement on a low cable with an ankle strap, adjustable load.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 12 deviennent faciles.', en: 'Maintenance level: add load once 3 × 12 feels easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-1-1', restSec: 60, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Résistance de la main', en: 'Hand resistance' },
        instructions: { fr: 'Assis sur une chaise, la main sert de résistance.', en: 'Seated on a chair, the hand provides the resistance.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique noué à un pied de table lourd ou à un montant, à hauteur de cheville.', en: 'Band tied to a heavy table leg or frame, at ankle height.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Banc placé de profil à la poulie basse, sangle à la cheville.', en: 'Bench placed side-on to the low cable, strap on the ankle.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Douleur dans le pli de l’aine en fin de rotation : limitez l’amplitude.', en: 'Pain in the groin crease at end of rotation: limit the range.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-airplane',
    family: 'hip-airplane',
    name: { fr: 'Avion de hanche (hip airplane)', en: 'Hip airplane' },
    sports: ['run'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-max', 'glute-med', 'deep-hip-rotators'],
      secondary: ['glute-min', 'biceps-femoris', 'semitendinosus'],
    },
    zoom: 'pelvis-back',
    qualities: ['control', 'strength'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'En course, le bassin tourne au-dessus de la jambe d’appui à chaque foulée. L’avion de hanche entraîne les fessiers et les rotateurs à contrôler cette rotation en équilibre sur une jambe.',
      en: 'When running, the pelvis rotates over the stance leg at every stride. The hip airplane trains the glutes and rotators to control that rotation while balancing on one leg.',
    },
    how: {
      setup: {
        fr: 'Debout sur une jambe, genou légèrement fléchi, buste penché en avant et jambe libre tendue derrière, comme pour un soulevé de terre sur une jambe.',
        en: 'Stand on one leg, knee slightly bent, trunk tipped forwards and free leg straight behind, as in a single-leg deadlift.',
      },
      movement: {
        fr: 'Ouvrez le bassin vers le côté de la jambe libre (le buste tourne vers l’extérieur), puis refermez-le vers le sol, en gardant le genou d’appui au-dessus du pied.',
        en: 'Open the pelvis towards the free-leg side (the trunk turns outwards), then close it back towards the floor, keeping the stance knee over the foot.',
      },
      cues: [
        { fr: 'Le mouvement vient de la hanche d’appui, pas des épaules.', en: 'The movement comes from the stance hip, not the shoulders.' },
        { fr: 'Le genou d’appui ne bouge pas.', en: 'The stance knee does not move.' },
        { fr: 'Lentement : 2 secondes dans chaque sens.', en: 'Slowly: 2 seconds each way.' },
      ],
    },
    mistakes: [
      { fr: 'Tourner seulement les épaules et les bras.', en: 'Turning only the shoulders and arms.' },
      { fr: 'Laisser le genou d’appui rentrer vers l’intérieur.', en: 'Letting the stance knee cave inwards.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Avion assisté', en: 'Assisted airplane' },
        description: { fr: 'Mains sur le dossier d’une chaise, buste à 45°, petite amplitude.', en: 'Hands on the back of a chair, trunk at 45°, small range.' },
        mastery: { fr: '3 × 8 par côté sans perte d’équilibre.', en: '3 × 8 per side without losing balance.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-0', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Avion libre, amplitude partielle', en: 'Free airplane, partial range' },
        description: { fr: 'Sans appui, bras écartés, buste à 45°.', en: 'No support, arms out, trunk at 45°.' },
        mastery: { fr: '3 × 8 par côté sans poser le pied.', en: '3 × 8 per side without putting the foot down.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-0', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Avion complet', en: 'Full airplane' },
        description: { fr: 'Buste à l’horizontale, pleine amplitude d’ouverture et de fermeture, 2 secondes d’arrêt à chaque extrémité.', en: 'Trunk horizontal, full opening and closing range, 2-second pause at each end.' },
        mastery: { fr: '3 × 10 par côté, symétriques.', en: '3 × 10 per side, symmetrical.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-2-2-2', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Avion lesté', en: 'Weighted airplane' },
        description: { fr: 'Haltère léger tenu dans la main du côté de la jambe d’appui.', en: 'Light dumbbell held in the hand on the stance-leg side.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge par petits paliers.', en: 'Maintenance level: add load in small steps.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-1-2-1', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Près d’un mur ou d’une chaise pour se rattraper.', en: 'Near a wall or chair to catch yourself.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère léger', en: 'Light dumbbell' },
        instructions: { fr: 'Tenez l’haltère du côté de la jambe d’appui, bras tendu vers le sol.', en: 'Hold the dumbbell on the stance-leg side, arm hanging towards the floor.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'glute-kickback',
    family: 'hip-extension-kickback',
    name: { fr: 'Extension de hanche à quatre pattes (kickback)', en: 'Quadruped hip extension (kickback)' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['glute-max'],
      secondary: ['glute-med', 'biceps-femoris', 'semitendinosus', 'erector-spinae'],
    },
    zoom: 'pelvis-back',
    qualities: ['strength', 'endurance', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Le grand fessier termine l’extension de hanche en fin d’appui de course et à la poussée sur la pédale. Cet exercice l’isole sur une jambe, en apprenant à étendre la hanche sans cambrer le dos.',
      en: 'The gluteus maximus completes hip extension at the end of the running stance and when pushing the pedal. This exercise isolates it on one leg, teaching you to extend the hip without arching the back.',
    },
    how: {
      setup: {
        fr: 'À quatre pattes, mains sous les épaules, genoux sous les hanches, dos plat.',
        en: 'On all fours, hands under the shoulders, knees under the hips, flat back.',
      },
      movement: {
        fr: 'Genou fléchi à 90°, poussez le talon vers le plafond jusqu’à ce que la cuisse soit dans le prolongement du dos. Tenez une seconde puis redescendez lentement.',
        en: 'With the knee bent at 90°, push the heel towards the ceiling until the thigh is in line with the back. Hold for one second, then lower slowly.',
      },
      cues: [
        { fr: 'Le dos ne se creuse pas : la cuisse s’arrête à l’horizontale.', en: 'The back does not arch: the thigh stops at horizontal.' },
        { fr: 'Le bassin reste parallèle au sol, sans tourner.', en: 'The pelvis stays parallel to the floor, without rotating.' },
      ],
    },
    mistakes: [
      { fr: 'Monter trop haut en cambrant les lombaires.', en: 'Lifting too high by arching the lower back.' },
      { fr: 'Faire basculer le bassin du côté de la jambe qui monte.', en: 'Tilting the pelvis towards the working leg.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'À quatre pattes', en: 'On all fours' },
        description: { fr: 'Extension de hanche genou fléchi, sans résistance.', en: 'Bent-knee hip extension without resistance.' },
        mastery: { fr: '3 × 15 par côté sans cambrer.', en: '3 × 15 per side without arching.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'À quatre pattes avec élastique', en: 'On all fours with a band' },
        description: { fr: 'Élastique passé sous le pied et tenu sous les mains.', en: 'Band looped under the foot and held under the hands.' },
        mastery: { fr: '3 × 15 par côté avec une bande moyenne.', en: '3 × 15 per side with a medium band.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-1-1', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.threePerWeek },
        requires: ['band'],
      },
      {
        level: 3,
        name: { fr: 'Planche avec extension de hanche', en: 'Plank with hip extension' },
        description: { fr: 'En planche sur les avant-bras, montée alternée d’une jambe tendue de quelques centimètres, sans bouger le bassin.', en: 'In a forearm plank, lift one straight leg a few centimetres at a time, without moving the pelvis.' },
        mastery: { fr: '3 × 10 par côté en gardant le bassin immobile.', en: '3 × 10 per side keeping the pelvis still.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-1-1-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Poulie ou machine', en: 'Cable or machine' },
        description: { fr: 'Debout, buste légèrement penché, sangle à la cheville sur la poulie basse (ou machine à fessiers) : extension de hanche chargée.', en: 'Standing with the trunk slightly forward, ankle strap on a low cable (or glute machine): loaded hip extension.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 12 deviennent faciles.', en: 'Maintenance level: add load once 3 × 12 feels easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1-1', restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis, genoux protégés.', en: 'On a mat, knees padded.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique en boucle sous le pied, extrémités maintenues sous les mains.', en: 'Loop band under the foot, ends held under the hands.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse ou machine à fessiers', en: 'Low cable or glute machine' },
        instructions: { fr: 'Sangle de cheville à la poulie basse, mains sur le montant.', en: 'Ankle strap on the low cable, hands on the frame.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Douleur lombaire : réduisez l’amplitude et contractez légèrement les abdominaux.', en: 'Lower-back pain: reduce the range and lightly brace the abdominals.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'selkowitz-2013',
          finding: {
            fr: 'L’extension de hanche à quatre pattes genou fléchi sollicitait nettement plus les fessiers que le tenseur du fascia lata.',
            en: 'Quadruped hip extension with the knee bent recruited the glutes clearly more than the tensor fasciae latae.',
          },
        },
        {
          refId: 'boren-2011',
          finding: {
            fr: 'La planche avec extension de hanche, un exercice voisin du kickback mais en appui sur les avant-bras, était l’exercice qui sollicitait le plus le grand fessier (106 % de la contraction maximale) parmi 18 exercices.',
            en: 'The front plank with hip extension, a close relative of the kickback performed on the forearms, was the exercise recruiting the gluteus maximus the most (106% of maximal contraction) among 18 exercises.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-flexor-isometric',
    family: 'hip-flexion',
    name: { fr: 'Maintien isométrique genou haut (psoas)', en: 'High-knee isometric hold (psoas)' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['iliopsoas'],
      secondary: ['rectus-femoris', 'tensor-fasciae-latae', 'rectus-abdominis'],
    },
    zoom: 'pelvis-front',
    qualities: ['isometric', 'strength'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Le psoas est le seul fléchisseur de hanche capable de monter le genou au-dessus de l’horizontale. Le maintenir dans cette position haute le renforce sans mouvement, une option souvent bien tolérée quand l’avant de la hanche est sensible.',
      en: 'The psoas is the main hip flexor able to lift the knee above horizontal. Holding that high position strengthens it without movement, an option often well tolerated when the front of the hip is sensitive.',
    },
    how: {
      setup: {
        fr: 'Assis au bord d’une chaise, dos droit sans s’appuyer au dossier, pieds à plat.',
        en: 'Sit on the edge of a chair, back straight without leaning on the backrest, feet flat.',
      },
      movement: {
        fr: 'Décollez un genou de quelques centimètres, cuisse au-dessus de l’horizontale, et tenez la position sans pencher le buste en arrière. Reposez doucement.',
        en: 'Lift one knee a few centimetres, thigh above horizontal, and hold without leaning the trunk back. Lower gently.',
      },
      cues: [
        { fr: 'Le buste reste droit, sans reculer.', en: 'Keep the trunk upright, without leaning back.' },
        { fr: 'Effort régulier, sans à-coups.', en: 'Steady effort, no jerking.' },
      ],
      breathing: { fr: 'Respirez normalement pendant le maintien.', en: 'Breathe normally during the hold.' },
    },
    mistakes: [
      { fr: 'Se pencher en arrière pour monter le genou.', en: 'Leaning back to lift the knee.' },
      { fr: 'Bloquer la respiration.', en: 'Holding the breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Assis, genou décollé', en: 'Seated, knee lifted' },
        description: { fr: 'Assis, maintien du genou décollé de quelques centimètres.', en: 'Seated, hold the knee a few centimetres off the seat.' },
        mastery: { fr: '5 × 30 s par côté avec une gêne stable ou en baisse.', en: '5 × 30 s per side with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 20, restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Assis, contre la main', en: 'Seated, against the hand' },
        description: { fr: 'Même position, la main appuie sur le genou vers le bas pendant que la cuisse résiste.', en: 'Same position, the hand pushes the knee down while the thigh resists.' },
        mastery: { fr: '5 × 30 s par côté sans augmentation de la douleur le lendemain.', en: '5 × 30 s per side without more pain the next day.' },
        dosage: { sets: 5, holdSec: 30, restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Debout, genou au-dessus de la hanche', en: 'Standing, knee above the hip' },
        description: { fr: 'Debout sur une jambe, l’autre genou tenu au-dessus de la hauteur de la hanche, main au mur si besoin.', en: 'Standing on one leg, the other knee held above hip height, hand on the wall if needed.' },
        mastery: { fr: '4 × 45 s par côté, buste droit.', en: '4 × 45 s per side, trunk upright.' },
        dosage: { sets: 4, holdSec: 30, restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Debout, avec résistance', en: 'Standing, with resistance' },
        description: { fr: 'Même maintien avec un élastique sous le pied d’appui et sur l’autre pied, ou une sangle de cheville à la poulie basse.', en: 'Same hold with a band under the stance foot and over the other foot, or an ankle strap on a low cable.' },
        mastery: { fr: 'Passer à la montée de genou dynamique quand 4 × 45 s sont bien tolérés.', en: 'Move on to the dynamic hip flexor march once 4 × 45 s is well tolerated.' },
        dosage: { sets: 4, holdSec: 30, restSec: 60, perSide: true, intensity: load('Résistance tenue sans compenser avec le buste', 'Resistance held without compensating with the trunk'), frequency: freq.everyOtherDay },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur une chaise, puis debout près d’un mur.', en: 'On a chair, then standing near a wall.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique en boucle autour des deux pieds.', en: 'Loop band around both feet.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie basse', en: 'Low cable' },
        instructions: { fr: 'Dos à la poulie basse, sangle à la cheville.', en: 'Back to the low cable, strap on the ankle.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Pincement ou blocage profond dans l’aine : arrêtez l’exercice et faites évaluer la hanche.', en: 'Deep pinching or catching in the groin: stop the exercise and have the hip assessed.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-flexor-stretch',
    family: 'hip-flexor-mobility',
    name: { fr: 'Étirement des fléchisseurs de hanche (fente à genou)', en: 'Kneeling hip flexor stretch' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes', 'thigh'],
    half: 'lower',
    muscles: {
      primary: ['iliopsoas', 'rectus-femoris'],
      secondary: ['tensor-fasciae-latae', 'sartorius'],
    },
    zoom: 'pelvis-front',
    qualities: ['mobility'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Au vélo comme au bureau, la hanche reste longtemps fléchie. Garder une bonne extension de hanche permet de pousser derrière soi en fin d’appui de course.',
      en: 'On the bike, as at a desk, the hip stays bent for long periods. Keeping good hip extension lets you push behind you at the end of the running stance.',
    },
    how: {
      setup: {
        fr: 'Un genou au sol sur un coussin, l’autre pied devant, genou avant à 90°, buste droit.',
        en: 'One knee on the floor on a cushion, the other foot in front, front knee at 90°, trunk upright.',
      },
      movement: {
        fr: 'Rentrez le bassin (basculez-le vers l’arrière) en contractant le fessier de la jambe arrière, puis avancez légèrement le bassin jusqu’à sentir l’étirement à l’avant de la hanche arrière. Tenez.',
        en: 'Tuck the pelvis (tilt it backwards) by squeezing the glute of the back leg, then shift the hips slightly forwards until you feel the stretch at the front of the back hip. Hold.',
      },
      cues: [
        { fr: 'C’est la bascule du bassin qui étire, pas la cambrure.', en: 'The pelvic tuck creates the stretch, not arching the back.' },
        { fr: 'Gardez les côtes basses, buste vertical.', en: 'Keep the ribs down, trunk vertical.' },
      ],
      breathing: { fr: 'Respirez lentement, relâchez un peu plus à chaque expiration.', en: 'Breathe slowly, relax a little more on each exhale.' },
    },
    mistakes: [
      { fr: 'Cambrer le bas du dos et avancer trop loin.', en: 'Arching the lower back and lunging too far forwards.' },
      { fr: 'Rechercher la douleur plutôt qu’une tension nette.', en: 'Chasing pain rather than a clear stretch.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Fente à genou', en: 'Kneeling lunge' },
        description: { fr: 'Étirement passif en fente à genou avec bascule du bassin.', en: 'Passive kneeling lunge stretch with a pelvic tuck.' },
        mastery: { fr: '3 × 30 s par côté en gardant le bas du dos neutre.', en: '3 × 30 s per side keeping the lower back neutral.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: load('Tension nette, jamais douloureuse', 'Clear stretch, never painful'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Fente à genou active', en: 'Active kneeling lunge' },
        description: { fr: 'Même position avec contraction continue du fessier arrière et bras du même côté levé au-dessus de la tête.', en: 'Same position with a constant squeeze of the back glute and the same-side arm raised overhead.' },
        mastery: { fr: '3 × 45 s par côté, amplitude comparable entre les deux côtés.', en: '3 × 45 s per side, similar range on both sides.' },
        dosage: { sets: 3, holdSec: 45, restSec: 15, perSide: true, intensity: load('Tension nette, jamais douloureuse', 'Clear stretch, never painful'), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Pied arrière surélevé', en: 'Back foot elevated' },
        description: { fr: 'Pied arrière posé sur un canapé ou un banc : le droit fémoral est aussi étiré.', en: 'Back foot resting on a sofa or bench: the rectus femoris is also stretched.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 45 s par côté après les sorties longues.', en: 'Maintenance level: 3 × 45 s per side after long sessions.' },
        dosage: { sets: 3, holdSec: 45, restSec: 15, perSide: true, intensity: load('Tension nette, jamais douloureuse', 'Clear stretch, never painful'), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Genou sur un coussin, près d’un mur ou d’une chaise pour l’équilibre.', en: 'Knee on a cushion, near a wall or chair for balance.' },
      },
    ],
    precautions: [
      { fr: 'L’étirement doit rester une tension, pas une douleur ; en cas de douleur vive dans l’aine, arrêtez.', en: 'The stretch should feel like tension, not pain; stop if you feel sharp groin pain.' },
      { fr: 'Genou douloureux au sol : utilisez un coussin épais ou faites la version debout en fente.', en: 'Knee sore on the floor: use a thick cushion or do the standing lunge version.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'winters-2004',
          finding: {
            fr: 'Chez 33 patients avec une extension de hanche limitée, l’étirement actif et l’étirement passif des fléchisseurs de hanche ont autant amélioré l’amplitude en 6 semaines.',
            en: 'In 33 patients with limited hip extension, active and passive hip flexor stretching improved range of motion equally over 6 weeks.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'hip-rotation-mobility',
    family: 'hip-rotation-mobility',
    name: { fr: 'Mobilité de hanche en rotation (figure 4 et 90/90)', en: 'Hip rotation mobility (figure 4 and 90/90)' },
    sports: ['run', 'bike'],
    zones: ['hip-glutes'],
    half: 'lower',
    muscles: {
      primary: ['deep-hip-rotators', 'piriformis', 'glute-max'],
      secondary: ['glute-med', 'glute-min'],
    },
    zoom: 'pelvis-back',
    qualities: ['mobility', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'La course et le vélo se font presque uniquement vers l’avant : la hanche tourne peu et finit par perdre de l’amplitude en rotation. Entretenir cette mobilité garde la hanche libre dans toutes les directions.',
      en: 'Running and cycling happen almost entirely in a forward direction: the hip rotates little and tends to lose rotation range. Maintaining this mobility keeps the hip free in every direction.',
    },
    how: {
      setup: {
        fr: 'Selon le niveau : allongé sur le dos (figure 4) ou assis au sol, une jambe devant et une derrière, genoux fléchis à 90° (position 90/90).',
        en: 'Depending on the level: lying on your back (figure 4) or sitting on the floor with one leg in front and one behind, both knees at 90° (90/90 position).',
      },
      movement: {
        fr: 'Figure 4 : cheville posée sur le genou opposé, rapprochez doucement la cuisse d’appui de la poitrine. 90/90 : passez lentement les deux genoux d’un côté à l’autre, buste droit.',
        en: 'Figure 4: ankle resting on the opposite knee, gently draw the supporting thigh towards your chest. 90/90: slowly switch both knees from one side to the other, trunk upright.',
      },
      cues: [
        { fr: 'Mouvement lent, sans forcer en fin d’amplitude.', en: 'Slow movement, no forcing at end of range.' },
        { fr: 'Gardez le dos long plutôt que d’arrondir pour aller plus loin.', en: 'Keep the back long rather than rounding to go further.' },
      ],
      breathing: { fr: 'Respirez lentement pendant les maintiens.', en: 'Breathe slowly during the holds.' },
    },
    mistakes: [
      { fr: 'Forcer sur le genou avec les mains.', en: 'Forcing the knee down with the hands.' },
      { fr: 'Arrondir le dos pour compenser le manque d’amplitude.', en: 'Rounding the back to make up for missing range.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Figure 4 allongé', en: 'Lying figure 4' },
        description: { fr: 'Sur le dos, cheville sur le genou opposé, cuisse d’appui ramenée doucement vers la poitrine.', en: 'On your back, ankle on the opposite knee, supporting thigh gently drawn towards the chest.' },
        mastery: { fr: '3 × 30 s par côté sans tension désagréable.', en: '3 × 30 s per side without unpleasant tension.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: load('Tension douce, jamais de fourmillements', 'Gentle tension, never pins and needles'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: '90/90 avec les mains', en: '90/90 with hands' },
        description: { fr: 'Assis au sol en 90/90, mains posées derrière, transitions lentes d’un côté à l’autre.', en: 'Sitting on the floor in 90/90, hands behind you, slow transitions from side to side.' },
        mastery: { fr: '3 × 8 transitions fluides sans douleur.', en: '3 × 8 smooth transitions without pain.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-1-3-1', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: '90/90 sans les mains', en: '90/90 hands-free' },
        description: { fr: 'Mêmes transitions, bras croisés devant la poitrine, buste droit.', en: 'Same transitions, arms crossed over the chest, trunk upright.' },
        mastery: { fr: '3 × 8 transitions sans poser les mains.', en: '3 × 8 transitions without using the hands.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-1-3-1', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: '90/90 avec levée de genou', en: '90/90 with knee lift' },
        description: { fr: 'En 90/90, décollez le genou de la jambe arrière du sol et tenez 3 secondes (rotation interne active).', en: 'In 90/90, lift the back-leg knee off the floor and hold 3 seconds (active internal rotation).' },
        mastery: { fr: 'Niveau d’entretien : 3 × 8 par côté.', en: 'Maintenance level: 3 × 8 per side.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '1-3-1-0', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis ; un coussin sous les fesses facilite la position 90/90.', en: 'On a mat; a cushion under the buttocks makes the 90/90 position easier.' },
      },
    ],
    precautions: [
      { fr: 'Fourmillements, engourdissement ou décharge dans la jambe : relâchez aussitôt, la position comprime peut-être le nerf sciatique.', en: 'Pins and needles, numbness or shooting pain down the leg: release at once, the position may be compressing the sciatic nerve.' },
      lateralHipCaution,
    ],
    evidence: { level: 'expert', citations: [] },
  }),
] satisfies ReturnType<typeof defineExercise>[];
