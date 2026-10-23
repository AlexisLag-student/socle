/**
 * Exercices — vélo et haut du corps (cou, omoplates, épaules, avant-bras, mains).
 * Skill add-exercise. Références : src/content/references/cycling.ts.
 *
 * Note anatomique : le zoom « trunk-front » inclut le cou ; les fléchisseurs profonds du cou
 * (`deep-neck-flexors`) y sont visibles et sont le muscle principal du rentré de menton.
 * Les nerfs (médian, ulnaire) ne sont pas dessinés : les glissements neuraux affichent les muscles
 * de l'avant-bras et de la main traversés par ces nerfs.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

const neckCaution = {
  fr: 'Arrêtez et consultez si l’exercice déclenche des vertiges, des troubles de la vue, des fourmillements dans les bras ou un mal de tête inhabituel.',
  en: 'Stop and seek advice if the exercise brings on dizziness, visual disturbance, pins and needles in the arms or an unusual headache.',
};

const nerveCaution = {
  fr: 'Mouvement doux, sans forcer : des fourmillements légers qui disparaissent en quelques secondes sont acceptables, pas une douleur ni des fourmillements qui persistent.',
  en: 'Gentle movement, never forced: mild tingling that fades within seconds is acceptable, pain or lingering tingling is not.',
};

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'chin-tuck',
    family: 'neck-flexor-endurance',
    name: { fr: 'Rentré de menton (fléchisseurs profonds du cou)', en: 'Chin tuck (deep neck flexors)' },
    sports: ['bike', 'run'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['deep-neck-flexors'],
      secondary: ['sternocleidomastoid'],
    },
    zoom: 'trunk-front',
    qualities: ['endurance', 'control', 'isometric'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Les fléchisseurs profonds du cou maintiennent la tête alignée quand vous la relevez pour regarder la route en position basse. Plus endurants, ils laissent moins de travail aux muscles superficiels de la nuque, qui se crispent.',
      en: 'The deep neck flexors keep the head aligned when you lift it to watch the road in a low riding position. With more endurance, they leave less work to the superficial neck muscles, which tend to tense up.',
    },
    how: {
      setup: {
        fr: 'Assis bien droit ou allongé sur le dos, tête dans l’alignement du tronc, regard droit devant (ou vers le plafond).',
        en: 'Sit tall or lie on your back, head in line with the trunk, eyes straight ahead (or at the ceiling).',
      },
      movement: {
        fr: 'Faites un petit « oui » de la tête : le menton recule et descend légèrement, l’arrière du cou s’allonge. Tenez la position, puis relâchez doucement.',
        en: 'Make a small “yes” nod: the chin moves back and slightly down and the back of the neck lengthens. Hold, then release gently.',
      },
      cues: [
        { fr: 'Mouvement petit et lent, sans pousser la tête vers l’arrière avec force.', en: 'Small, slow movement, without forcing the head backwards.' },
        { fr: 'Les muscles de l’avant du cou restent souples sous les doigts.', en: 'The muscles at the front of the neck stay soft under your fingers.' },
        { fr: 'Épaules relâchées, mâchoire détendue.', en: 'Shoulders relaxed, jaw loose.' },
      ],
      breathing: { fr: 'Respirez normalement pendant la tenue.', en: 'Breathe normally during the hold.' },
    },
    mistakes: [
      { fr: 'Baisser la tête vers la poitrine au lieu de rentrer le menton.', en: 'Dropping the head to the chest instead of tucking the chin.' },
      { fr: 'Contracter fort les muscles de l’avant du cou (ils doivent rester discrets).', en: 'Strongly tensing the front neck muscles (they should stay quiet).' },
      { fr: 'Bloquer la respiration.', en: 'Holding your breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Assis ou debout, dos au mur', en: 'Seated or standing, back to the wall' },
        description: { fr: 'Rentré de menton dans une position confortable, arrière de la tête proche du mur.', en: 'Chin tuck in a comfortable position, back of the head near the wall.' },
        mastery: { fr: '10 tenues de 10 secondes sans douleur et sans crispation de l’avant du cou.', en: '10 holds of 10 seconds without pain or tension at the front of the neck.' },
        dosage: { sets: 10, holdSec: 10, restSec: 10, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Allongé, hochement de tête', en: 'Lying, head nod' },
        description: { fr: 'Allongé sur le dos, tête posée : petit hochement « oui » tenu, la tête reste en contact avec le sol.', en: 'Lying on your back, head resting: small “yes” nod held, the head stays on the floor.' },
        mastery: { fr: '10 tenues de 10 secondes, contrôle identique de la première à la dernière.', en: '10 holds of 10 seconds, same control from first to last.' },
        dosage: { sets: 10, holdSec: 10, restSec: 10, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Tête décollée, menton rentré', en: 'Head lifted, chin tucked' },
        description: { fr: 'Allongé, rentrez le menton puis décollez la tête d’environ 2 cm et tenez.', en: 'Lying down, tuck the chin, then lift the head about 2 cm and hold.' },
        mastery: { fr: '3 tenues de 30 secondes sans que le menton ne remonte ni que la tête ne tremble.', en: '3 holds of 30 seconds without the chin poking up or the head shaking.' },
        dosage: { sets: 4, holdSec: 15, restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Relevés de tête lents', en: 'Slow head lifts' },
        description: { fr: 'Allongé, menton rentré, relevez la tête jusqu’à regarder vos pieds puis reposez-la lentement.', en: 'Lying down with the chin tucked, lift the head until you see your feet, then lower it slowly.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 15 relevés lents en gardant le menton rentré.', en: 'Maintenance level: 3 × 15 slow lifts keeping the chin tucked.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '3-1-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Assis contre un mur ou allongé sur un tapis, une serviette pliée sous la tête si besoin.', en: 'Seated against a wall or lying on a mat, with a folded towel under the head if needed.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: false, rank: 2,
        name: { fr: 'Contre un élastique léger', en: 'Against a light band' },
        instructions: { fr: 'Assis, élastique fixé devant vous et passé derrière la tête : rentrez le menton contre une légère résistance.', en: 'Seated, band anchored in front of you and looped behind the head: tuck the chin against light resistance.' },
      },
    ],
    precautions: [caution.painFlare, neckCaution],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'jull-2002',
          finding: {
            fr: 'Chez 200 personnes souffrant de céphalée d’origine cervicale, un programme d’exercices à faible charge centré sur les fléchisseurs profonds du cou a réduit la fréquence et l’intensité des maux de tête, avec un effet maintenu à 12 mois.',
            en: 'In 200 people with cervicogenic headache, a low-load exercise programme focused on the deep neck flexors reduced headache frequency and intensity, with effects maintained at 12 months.',
          },
        },
        {
          refId: 'falla-2006',
          finding: {
            fr: 'Chez 58 femmes avec cervicalgie chronique, 6 semaines d’entraînement des fléchisseurs du cou (force-endurance ou faible charge) ont diminué la douleur et l’incapacité.',
            en: 'In 58 women with chronic neck pain, 6 weeks of neck flexor training (strength-endurance or low load) reduced pain and disability.',
          },
        },
        {
          refId: 'gross-2015',
          finding: {
            fr: 'La revue Cochrane trouve des preuves de qualité modérée en faveur des exercices de renforcement et d’endurance du cou et des omoplates dans la céphalée cervicale chronique, sans preuve de haute qualité.',
            en: 'The Cochrane review finds moderate-quality evidence for neck and shoulder-blade strengthening and endurance exercise in chronic cervicogenic headache, with no high-quality evidence.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'neck-isometric',
    family: 'neck-isometric',
    name: { fr: 'Isométries cervicales (4 directions)', en: 'Neck isometrics (4 directions)' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['neck-extensors', 'levator-scapulae', 'trapezius-upper'],
      secondary: ['sternocleidomastoid', 'deep-neck-flexors'],
    },
    zoom: 'shoulders-neck',
    qualities: ['isometric', 'strength', 'endurance'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Sur le vélo, les muscles du cou portent la tête pendant des heures, souvent relevée, et encaissent les vibrations de la route. Des muscles du cou plus forts tolèrent mieux ces longues positions.',
      en: 'On the bike, the neck muscles hold the head up for hours, often in extension, and absorb road vibration. Stronger neck muscles cope better with these long positions.',
    },
    how: {
      setup: {
        fr: 'Assis ou debout, dos droit, tête neutre, menton légèrement rentré. Une main posée sur le front, l’arrière ou le côté de la tête.',
        en: 'Seated or standing, back straight, head neutral, chin slightly tucked. One hand on the forehead, the back or the side of the head.',
      },
      movement: {
        fr: 'Poussez la tête contre la main sans qu’elle ne bouge, tenez, relâchez. Faites les quatre directions : vers l’avant, vers l’arrière, vers la droite, vers la gauche.',
        en: 'Push the head into the hand without letting it move, hold, release. Work all four directions: forwards, backwards, right and left.',
      },
      cues: [
        { fr: 'La tête ne bouge pas : c’est la main qui résiste.', en: 'The head does not move: the hand provides the resistance.' },
        { fr: 'Montez l’effort progressivement en 2 secondes, sans à-coup.', en: 'Build the effort gradually over 2 seconds, with no jerking.' },
        { fr: 'Épaules basses et relâchées.', en: 'Shoulders low and relaxed.' },
      ],
      breathing: { fr: 'Expirez doucement pendant la poussée, ne bloquez pas la respiration.', en: 'Breathe out gently while pushing; do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Pousser d’un coup, trop fort, dès le début.', en: 'Pushing suddenly and too hard from the start.' },
      { fr: 'Laisser la tête bouger ou pencher.', en: 'Letting the head move or tilt.' },
      { fr: 'Hausser les épaules pendant l’effort.', en: 'Shrugging the shoulders during the effort.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Main, effort léger', en: 'Hand, light effort' },
        description: { fr: 'Résistance avec la main, environ un tiers de votre force, dans les quatre directions.', en: 'Hand resistance at about one third of your strength, in all four directions.' },
        mastery: { fr: '3 tenues de 10 secondes par direction sans douleur pendant ni après.', en: '3 holds of 10 seconds per direction without pain during or afterwards.' },
        dosage: { sets: 3, holdSec: 10, restSec: 20, perSide: false, intensity: load('Environ un tiers de votre force, dans chaque direction', 'About one third of your strength, in each direction'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Main, effort moyen', en: 'Hand, moderate effort' },
        description: { fr: 'Même exercice à environ la moitié de votre force, tenues plus longues.', en: 'Same exercise at about half your strength, with longer holds.' },
        mastery: { fr: '3 tenues de 20 secondes par direction, symétriques entre droite et gauche.', en: '3 holds of 20 seconds per direction, symmetrical between right and left.' },
        dosage: { sets: 3, holdSec: 20, restSec: 30, perSide: false, intensity: load('Environ la moitié de votre force, dans chaque direction', 'About half your strength, in each direction'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Élastique, tête stabilisée', en: 'Band, head stabilised' },
        description: { fr: 'Élastique passé autour de la tête et fixé à hauteur du visage : éloignez-vous jusqu’à sentir la tension et gardez la tête immobile, dans les quatre directions.', en: 'Band looped around the head and anchored at face height: step away until you feel the tension and keep the head still, in all four directions.' },
        mastery: { fr: '3 tenues de 30 secondes par direction avec un élastique moyen.', en: '3 holds of 30 seconds per direction with a medium band.' },
        dosage: { sets: 3, holdSec: 30, restSec: 45, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Élastique fort, pas latéraux', en: 'Strong band, side steps' },
        description: { fr: 'Élastique plus résistant : gardez la tête immobile pendant que vous faites de petits pas latéraux qui augmentent la tension.', en: 'Stronger band: keep the head still while taking small side steps that increase the tension.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 30 secondes par direction à effort soutenu, sans douleur le lendemain.', en: 'Maintenance level: 3 × 30 seconds per direction at a solid effort, without next-day pain.' },
        dosage: { sets: 3, holdSec: 30, restSec: 60, perSide: false, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'hand', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Résistance avec la main', en: 'Hand resistance' },
        instructions: { fr: 'La main (ou les deux mains croisées derrière la tête) sert de résistance.', en: 'Your hand (or both hands clasped behind the head) provides the resistance.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique fixé à une porte ou un poteau, passé autour de la tête sur une serviette pliée.', en: 'Band anchored to a door or post, looped around the head over a folded towel.' },
      },
    ],
    precautions: [caution.painFlare, neckCaution],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'ylinen-2003',
          finding: {
            fr: 'Chez 180 femmes avec cervicalgie chronique, 12 mois de renforcement isométrique intensif du cou avec un élastique ont réduit la douleur et l’incapacité et plus que doublé la force de flexion du cou.',
            en: 'In 180 women with chronic neck pain, 12 months of intensive isometric neck strengthening with an elastic band reduced pain and disability and more than doubled neck flexion strength.',
          },
        },
        {
          refId: 'blanpied-2017',
          finding: {
            fr: 'La recommandation JOSPT 2017 préconise des exercices d’endurance du cou et de la ceinture scapulaire, puis un programme mixte de renforcement, d’endurance et de contrôle quand la cervicalgie devient chronique.',
            en: 'The 2017 JOSPT guideline recommends neck and shoulder-girdle endurance exercise, then a mixed programme of strengthening, endurance and control when neck pain becomes chronic.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'quadruped-neck-extension',
    family: 'neck-extension',
    name: { fr: 'Extension cervicale à quatre pattes', en: 'Quadruped neck extension' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['neck-extensors'],
      secondary: ['deep-neck-flexors', 'trapezius-middle', 'trapezius-lower'],
    },
    zoom: 'shoulders-neck',
    qualities: ['endurance', 'control'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'En position basse sur le vélo, les extenseurs de la nuque tiennent la tête relevée pendant toute la sortie. C’est un travail d’endurance : on les entraîne dans une position proche, buste penché vers l’avant.',
      en: 'In a low riding position, the neck extensors hold the head up for the whole ride. It is endurance work, so they are trained in a similar position, with the trunk leaning forwards.',
    },
    how: {
      setup: {
        fr: 'À quatre pattes, mains sous les épaules, genoux sous les hanches, dos plat. Rentrez légèrement le menton, regard vers le sol.',
        en: 'On all fours, hands under shoulders, knees under hips, back flat. Tuck the chin slightly, eyes on the floor.',
      },
      movement: {
        fr: 'Gardez le menton rentré et relevez lentement la tête pour regarder un peu devant vous, puis revenez regarder le sol. Le mouvement vient du cou, pas du dos.',
        en: 'Keep the chin tucked and slowly lift the head to look slightly ahead, then return to looking at the floor. The movement comes from the neck, not the back.',
      },
      cues: [
        { fr: 'Le menton reste rentré : on regarde devant, sans « avancer le menton ».', en: 'The chin stays tucked: look ahead without poking the chin forwards.' },
        { fr: 'Omoplates stables, le dos ne se creuse pas.', en: 'Shoulder blades steady, the back does not sag.' },
        { fr: 'Lent et contrôlé dans les deux sens.', en: 'Slow and controlled both ways.' },
      ],
    },
    mistakes: [
      { fr: 'Rejeter la tête en arrière en avançant le menton.', en: 'Throwing the head back by poking the chin forwards.' },
      { fr: 'Laisser le dos se creuser ou les épaules s’affaisser.', en: 'Letting the back sag or the shoulders collapse.' },
      { fr: 'Aller vite, en balançant la tête.', en: 'Moving fast and swinging the head.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Quatre pattes, flexion-extension', en: 'All fours, nodding' },
        description: { fr: 'Relevez la tête pour regarder devant puis revenez, menton rentré, en petite amplitude.', en: 'Lift the head to look ahead and return, chin tucked, in a small range.' },
        mastery: { fr: '3 × 10 répétitions lentes sans douleur ni avancée du menton.', en: '3 × 10 slow reps without pain or chin poking.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-1-3', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Quatre pattes, avec rotation', en: 'All fours, with rotation' },
        description: { fr: 'Même position : ajoutez une rotation lente de la tête à droite puis à gauche (« non »), menton rentré.', en: 'Same position: add a slow head rotation to the right then left (“no”), chin tucked.' },
        mastery: { fr: '3 × 10 répétitions dans chaque mouvement, symétriques.', en: '3 × 10 reps of each movement, symmetrical.' },
        dosage: { sets: 3, reps: [10, 10], tempo: '2-1-2', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'À plat ventre, tête décollée', en: 'Prone head lift' },
        description: { fr: 'Allongé sur le ventre, front sur une serviette : rentrez le menton et décollez la tête de quelques centimètres, tenez.', en: 'Lying face down, forehead on a towel: tuck the chin and lift the head a few centimetres, hold.' },
        mastery: { fr: '3 tenues de 30 secondes en gardant le menton rentré.', en: '3 holds of 30 seconds keeping the chin tucked.' },
        dosage: { sets: 3, holdSec: 20, restSec: 45, perSide: false, intensity: rpe('5-6'), frequency: freq.everyOtherDay },
      },
      {
        level: 4,
        name: { fr: 'Penché en avant, longue tenue', en: 'Leaning forwards, long hold' },
        description: { fr: 'Buste penché comme sur le vélo (au sol ou sur un ballon) : tenez la tête relevée, menton rentré, plus longtemps.', en: 'Trunk leaning forwards as on the bike (on the floor or a ball): hold the head up, chin tucked, for longer.' },
        mastery: { fr: 'Niveau d’entretien : 3 tenues de 45 à 60 secondes sans douleur le lendemain.', en: 'Maintenance level: 3 holds of 45 to 60 seconds without next-day pain.' },
        dosage: { sets: 3, holdSec: 45, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Sur un tapis, une serviette pliée sous le front pour les tenues à plat ventre.', en: 'On a mat, with a folded towel under the forehead for the prone holds.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Sur ballon de gymnastique', en: 'On a Swiss ball' },
        instructions: { fr: 'Ventre sur le ballon, mains ou pieds au sol : position proche du vélo, tête libre.', en: 'Stomach on the ball, hands or feet on the floor: a position close to the bike, head free.' },
      },
    ],
    precautions: [caution.painFlare, neckCaution],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'ylinen-2003',
          finding: {
            fr: 'Un programme d’endurance comprenant des relevés de tête à plat ventre et sur le dos a réduit la douleur et l’incapacité à 12 mois chez des femmes avec cervicalgie chronique, comparé au groupe contrôle.',
            en: 'An endurance programme including head lifts lying face down and on the back reduced pain and disability at 12 months in women with chronic neck pain, compared with controls.',
          },
        },
        {
          refId: 'gross-2015',
          finding: {
            fr: 'Dans la cervicalgie chronique, le renforcement et l’endurance du cou et des omoplates sont soutenus par des preuves de qualité modérée, contrairement aux étirements seuls.',
            en: 'In chronic neck pain, neck and shoulder-blade strengthening and endurance are supported by moderate-quality evidence, unlike stretching alone.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'prone-ytw',
    family: 'scapular-prone-raise',
    name: { fr: 'Y-T-W allongé sur le ventre', en: 'Prone Y-T-W' },
    sports: ['bike', 'run'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['trapezius-lower', 'trapezius-middle', 'rhomboids'],
      secondary: ['rotator-cuff', 'deltoid-posterior', 'erector-spinae'],
    },
    zoom: 'shoulders-neck',
    qualities: ['endurance', 'control', 'strength'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Les trapèzes moyen et inférieur tiennent les omoplates en place quand le buste est penché vers le guidon. Quand ils fatiguent, le haut des trapèzes compense et se crispe.',
      en: 'The middle and lower trapezius hold the shoulder blades in place when the trunk leans towards the handlebar. When they tire, the upper trapezius compensates and tightens.',
    },
    how: {
      setup: {
        fr: 'Allongé sur le ventre (au sol, sur un banc incliné ou un ballon), front sur une serviette, menton légèrement rentré.',
        en: 'Lying face down (on the floor, an incline bench or a ball), forehead on a towel, chin slightly tucked.',
      },
      movement: {
        fr: 'Levez les bras en formant successivement un Y (bras en diagonale vers l’avant, pouces vers le haut), un T (bras sur les côtés) puis un W (coudes pliés tirés vers les côtes). Tenez 2 secondes en haut à chaque lettre.',
        en: 'Lift the arms to form a Y (arms diagonally forwards, thumbs up), then a T (arms out to the sides), then a W (elbows bent and pulled towards the ribs). Hold 2 seconds at the top of each letter.',
      },
      cues: [
        { fr: 'Pensez « omoplates vers les poches arrière » avant de lever les bras.', en: 'Think “shoulder blades into your back pockets” before lifting the arms.' },
        { fr: 'Épaules loin des oreilles.', en: 'Shoulders away from the ears.' },
        { fr: 'Petite amplitude bien faite plutôt que grande amplitude en haussant les épaules.', en: 'A small, clean range beats a big range with shrugged shoulders.' },
      ],
      breathing: { fr: 'Expirez en levant les bras.', en: 'Breathe out as you lift the arms.' },
    },
    mistakes: [
      { fr: 'Hausser les épaules vers les oreilles.', en: 'Shrugging the shoulders towards the ears.' },
      { fr: 'Cambrer le bas du dos pour monter plus haut.', en: 'Arching the lower back to lift higher.' },
      { fr: 'Relever la tête et avancer le menton.', en: 'Lifting the head and poking the chin.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'W et T, sans charge', en: 'W and T, unloaded' },
        description: { fr: 'Seulement le W puis le T, amplitude réduite, sans charge.', en: 'Only the W and the T, reduced range, no load.' },
        mastery: { fr: '2 × 10 de chaque lettre avec 2 secondes de tenue, sans hausser les épaules.', en: '2 × 10 of each letter with a 2-second hold, without shrugging.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '2-2-2', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Y-T-W complet', en: 'Full Y-T-W' },
        description: { fr: 'Les trois lettres enchaînées, pleine amplitude, sans charge.', en: 'All three letters in sequence, full range, no load.' },
        mastery: { fr: '3 × 10 de chaque lettre, la dernière répétition aussi propre que la première.', en: '3 × 10 of each letter, the last rep as clean as the first.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-2-2', restSec: 60, perSide: false, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Charge légère', en: 'Light load' },
        description: { fr: 'Haltères très légers (0,5 à 2 kg) ou petites bouteilles, sur banc incliné ou au sol.', en: 'Very light dumbbells (0.5 to 2 kg) or small bottles, on an incline bench or the floor.' },
        mastery: { fr: '3 × 12 de chaque lettre avec la même charge, sans compensation.', en: '3 × 12 of each letter with the same load, without compensation.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-2-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Charge progressive', en: 'Progressive load' },
        description: { fr: 'Augmentez la charge par petits paliers en gardant les tenues de 2 secondes.', en: 'Increase the load in small steps while keeping the 2-second holds.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 par lettre en fin de série difficile mais propre.', en: 'Maintenance level: 3 × 10 per letter, hard but clean at the end of the set.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-2-2', restSec: 75, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Allongé sur un tapis, front sur une serviette roulée.', en: 'Lying on a mat, forehead on a rolled towel.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Sur ballon de gymnastique', en: 'On a Swiss ball' },
        instructions: { fr: 'Ventre sur le ballon, pieds calés contre un mur : les bras pendent librement, amplitude plus grande.', en: 'Stomach on the ball, feet braced against a wall: the arms hang freely for a bigger range.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltères légers', en: 'Light dumbbells' },
        instructions: { fr: 'Sur un banc incliné à 30-45° ou au sol, haltères très légers.', en: 'On a bench inclined at 30–45° or on the floor, very light dumbbells.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'cools-2007',
          finding: {
            fr: 'Chez 45 personnes, l’élévation horizontale en rotation externe et l’extension des bras à plat ventre faisaient partie des exercices offrant le meilleur rapport entre trapèzes moyen et inférieur et trapèze supérieur (peu de trapèze supérieur).',
            en: 'In 45 people, prone horizontal abduction with external rotation and prone arm extension were among the exercises with the best balance between middle/lower and upper trapezius (little upper trapezius).',
          },
        },
        {
          refId: 'gross-2015',
          finding: {
            fr: 'Le renforcement du cou, des omoplates et des membres supérieurs améliore la douleur de la cervicalgie chronique à court terme (preuves de qualité modérée).',
            en: 'Neck, shoulder-blade and upper-limb strengthening improves chronic neck pain in the short term (moderate-quality evidence).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'band-pull-apart',
    family: 'horizontal-abduction',
    name: { fr: 'Écarté d’élastique', en: 'Band pull-apart' },
    sports: ['bike', 'run'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['trapezius-middle', 'rhomboids', 'deltoid-posterior'],
      secondary: ['trapezius-lower', 'rotator-cuff'],
    },
    zoom: 'shoulders-neck',
    qualities: ['endurance', 'strength', 'control'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Le buste penché et les bras tendus vers le guidon enroulent les épaules vers l’avant. Les muscles entre les omoplates et l’arrière de l’épaule équilibrent cette posture.',
      en: 'Leaning forwards with the arms reaching for the handlebar rounds the shoulders forwards. The muscles between the shoulder blades and at the back of the shoulder balance this posture.',
    },
    how: {
      setup: {
        fr: 'Debout, élastique tenu à deux mains devant vous à hauteur des épaules, bras tendus, mains écartées de la largeur des épaules.',
        en: 'Standing, band held in both hands in front of you at shoulder height, arms straight, hands shoulder-width apart.',
      },
      movement: {
        fr: 'Écartez les bras sur les côtés jusqu’à ce que l’élastique touche la poitrine en serrant les omoplates, tenez 1 seconde, puis revenez lentement.',
        en: 'Spread the arms out to the sides until the band touches your chest, squeezing the shoulder blades, hold 1 second, then return slowly.',
      },
      cues: [
        { fr: 'Épaules basses, cou long.', en: 'Shoulders down, neck long.' },
        { fr: 'Bras presque tendus, coudes souples.', en: 'Arms nearly straight, elbows soft.' },
        { fr: 'Le retour est aussi lent que l’aller.', en: 'The return is as slow as the pull.' },
      ],
      breathing: { fr: 'Expirez en écartant.', en: 'Breathe out as you pull apart.' },
    },
    mistakes: [
      { fr: 'Hausser les épaules ou avancer la tête.', en: 'Shrugging the shoulders or poking the head forwards.' },
      { fr: 'Cambrer le bas du dos pour finir le mouvement.', en: 'Arching the lower back to finish the movement.' },
      { fr: 'Laisser l’élastique ramener les bras d’un coup.', en: 'Letting the band snap the arms back.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Élastique léger', en: 'Light band' },
        description: { fr: 'Élastique très souple ou mains plus écartées, amplitude confortable.', en: 'Very light band or hands wider apart, comfortable range.' },
        mastery: { fr: '2 × 15 sans hausser les épaules, tenue de 1 seconde à chaque répétition.', en: '2 × 15 without shrugging, with a 1-second hold every rep.' },
        dosage: { sets: 2, reps: [12, 15], tempo: '2-1-2', restSec: 45, perSide: false, intensity: rir('4'), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Pleine amplitude', en: 'Full range' },
        description: { fr: 'Élastique moyen, mains à la largeur des épaules, jusqu’au contact de la poitrine.', en: 'Medium band, hands shoulder-width apart, all the way to the chest.' },
        mastery: { fr: '3 × 15 avec 2 secondes de tenue, sans perte d’amplitude.', en: '3 × 15 with a 2-second hold, without losing range.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-2-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Variantes de prise', en: 'Grip variations' },
        description: { fr: 'Alternez paumes vers le haut (plus de rotation externe) et diagonales (une main monte, l’autre descend).', en: 'Alternate palms up (more external rotation) and diagonals (one hand up, the other down).' },
        mastery: { fr: '3 × 12 de chaque variante avec un élastique moyen à fort.', en: '3 × 12 of each variation with a medium to strong band.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Résistance forte', en: 'Heavy resistance' },
        description: { fr: 'Élastique fort, poulie ou haltères (oiseau buste penché), 8 à 12 répétitions exigeantes.', en: 'Strong band, cable or dumbbells (bent-over reverse fly), 8 to 12 demanding reps.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la résistance quand 3 × 12 deviennent faciles.', en: 'Maintenance level: increase the resistance when 3 × 12 becomes easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-1-2', restSec: 75, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'wall-retraction', equipment: [], loadable: false, rank: 0,
        name: { fr: 'Sans matériel : serrage contre le mur', en: 'No equipment: wall squeeze' },
        instructions: { fr: 'Dos au mur, coudes pliés à 90° à hauteur des épaules : poussez les coudes vers le mur en serrant les omoplates, tenez 5 secondes.', en: 'Back to the wall, elbows bent at 90° at shoulder height: press the elbows into the wall by squeezing the shoulder blades, hold 5 seconds.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique plat ou tube ; rapprochez les mains pour augmenter la résistance.', en: 'Flat band or tube; bring the hands closer together to increase resistance.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Oiseau aux haltères', en: 'Dumbbell reverse fly' },
        instructions: { fr: 'Buste penché à 45°, dos plat, ouvrez les bras sur les côtés avec des haltères légers.', en: 'Trunk tilted to 45°, back flat, raise the arms out to the sides with light dumbbells.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie ou machine (pec deck inversé)', en: 'Cable or reverse pec deck' },
        instructions: { fr: 'Deux poulies croisées à hauteur des épaules, ou machine pec deck en position inversée.', en: 'Two crossed cables at shoulder height, or a pec deck machine used in reverse.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'andersen-2008-b',
          finding: {
            fr: 'Chez 12 femmes avec myalgie du trapèze, la plupart des exercices d’un programme comprenant l’oiseau (écarté arrière) activaient fortement (plus de 60 % du maximum) les muscles du cou et des épaules.',
            en: 'In 12 women with trapezius myalgia, most exercises in a programme including the reverse fly strongly activated (over 60% of maximum) the neck and shoulder muscles.',
          },
        },
        {
          refId: 'andersen-2010',
          finding: {
            fr: 'À effort maximal, les exercices d’épaule à l’élastique activaient les muscles autant qu’avec des haltères.',
            en: 'At maximal effort, shoulder exercises with elastic tubing activated the muscles as much as with dumbbells.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'row',
    family: 'horizontal-row',
    name: { fr: 'Tirage horizontal (rowing)', en: 'Row' },
    sports: ['bike', 'run'],
    zones: ['neck-shoulders', 'trunk'],
    half: 'upper',
    muscles: {
      primary: ['latissimus-dorsi', 'trapezius-middle', 'rhomboids'],
      secondary: ['deltoid-posterior', 'biceps-brachii', 'trapezius-lower', 'erector-spinae'],
    },
    zoom: 'trunk-back',
    qualities: ['strength', 'endurance'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike', 'run'],
    why: {
      fr: 'Les muscles du dos tirent sur le guidon dans les relances et les montées, et tiennent les épaules en place sur les longues sorties. En course, ils accompagnent le balancier des bras.',
      en: 'The back muscles pull on the handlebar when accelerating and climbing, and hold the shoulders in place on long rides. In running, they drive the arm swing.',
    },
    how: {
      setup: {
        fr: 'Selon la variante : buste penché avec un appui, assis face à une poulie, ou suspendu sous des sangles. Dos plat, épaules basses.',
        en: 'Depending on the variant: trunk tilted with a support, seated at a cable, or hanging under straps. Back flat, shoulders down.',
      },
      movement: {
        fr: 'Tirez le coude vers la hanche en rapprochant l’omoplate de la colonne, tenez 1 seconde, puis allongez le bras lentement.',
        en: 'Pull the elbow towards the hip, drawing the shoulder blade towards the spine, hold 1 second, then lengthen the arm slowly.',
      },
      cues: [
        { fr: 'L’omoplate bouge en premier, le bras suit.', en: 'The shoulder blade moves first, the arm follows.' },
        { fr: 'Épaule loin de l’oreille, cou long.', en: 'Shoulder away from the ear, neck long.' },
        { fr: 'Le buste ne tourne pas et ne se redresse pas pour aider.', en: 'The trunk does not twist or rise to help.' },
      ],
      breathing: { fr: 'Expirez en tirant, inspirez en relâchant.', en: 'Breathe out as you pull, in as you release.' },
    },
    mistakes: [
      { fr: 'Tirer avec les bras en haussant l’épaule.', en: 'Pulling with the arm while shrugging the shoulder.' },
      { fr: 'Arrondir le dos ou donner un élan avec le buste.', en: 'Rounding the back or using trunk momentum.' },
      { fr: 'Laisser la charge retomber sans contrôle.', en: 'Letting the weight drop without control.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Tirage facile', en: 'Easy row' },
        description: { fr: 'Sangles avec le corps presque vertical, ou élastique léger, ou rowing inversé sous une table solide genoux pliés.', en: 'Straps with the body nearly upright, a light band, or an inverted row under a sturdy table with knees bent.' },
        mastery: { fr: '3 × 15 répétitions avec 1 seconde de tenue, sans hausser les épaules.', en: '3 × 15 reps with a 1-second hold, without shrugging.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('3-4'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Tirage intermédiaire', en: 'Intermediate row' },
        description: { fr: 'Corps plus incliné sous les sangles ou la table, ou élastique plus fort.', en: 'Body more inclined under the straps or table, or a stronger band.' },
        mastery: { fr: '3 × 12 répétitions propres avec 2 à 3 répétitions en réserve.', en: '3 × 12 clean reps with 2 to 3 reps in reserve.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Rowing à un bras, chargé', en: 'Loaded one-arm row' },
        description: { fr: 'Rowing à un bras avec haltère, genou et main sur un banc, ou tirage à la poulie.', en: 'One-arm dumbbell row with knee and hand on a bench, or a cable row.' },
        mastery: { fr: '3 × 10 par bras avec une charge stable, symétrique entre les deux côtés.', en: '3 × 10 per arm with a steady load, symmetrical between sides.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-1-2', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Rowing lourd', en: 'Heavy row' },
        description: { fr: 'Charge lourde, 6 à 8 répétitions lentes et contrôlées.', en: 'Heavy load, 6 to 8 slow, controlled reps.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 4 × 8 deviennent faciles.', en: 'Maintenance level: add load when 4 × 8 becomes easy.' },
        dosage: { sets: 4, reps: [6, 8], tempo: '2-1-2', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'table-row', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Rowing inversé sous une table', en: 'Inverted row under a table' },
        instructions: { fr: 'Allongé sous une table très stable, mains au bord du plateau : tirez la poitrine vers la table. Plus les pieds sont loin, plus c’est dur.', en: 'Lying under a very stable table, hands on its edge: pull your chest to the table. The further your feet, the harder it is.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Sangles de suspension', en: 'Suspension straps' },
        instructions: { fr: 'Marchez vers le point d’ancrage pour incliner davantage le corps et augmenter la difficulté.', en: 'Walk towards the anchor to lean back further and increase the difficulty.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique fixé à hauteur de poitrine, debout ou assis, tirage à un ou deux bras.', en: 'Band anchored at chest height, standing or seated, one- or two-arm row.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère à un bras', en: 'One-arm dumbbell' },
        instructions: { fr: 'Main et genou opposés sur un banc ou une chaise, dos plat.', en: 'Opposite hand and knee on a bench or chair, back flat.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 4,
        name: { fr: 'Poulie basse ou machine', en: 'Seated cable or machine' },
        instructions: { fr: 'Tirage horizontal assis à la poulie, buste droit, sans balancer.', en: 'Seated cable row, trunk upright, without swinging.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'andersen-2008',
          finding: {
            fr: 'Chez 48 femmes avec myalgie du trapèze, 10 semaines de renforcement spécifique du cou et des épaules ont nettement et durablement réduit la douleur, contrairement au vélo d’appartement.',
            en: 'In 48 women with trapezius myalgia, 10 weeks of specific neck and shoulder strengthening markedly and lastingly reduced pain, unlike stationary cycling.',
          },
        },
        {
          refId: 'andersen-2008-b',
          finding: {
            fr: 'Dans un programme comprenant le rowing à un bras, la plupart des exercices activaient fortement (plus de 60 % du maximum) les muscles du cou et des épaules.',
            en: 'In a programme including the one-arm row, most exercises strongly activated (over 60% of maximum) the neck and shoulder muscles.',
          },
        },
        {
          refId: 'gross-2015',
          finding: {
            fr: 'Le renforcement du cou, des omoplates et des membres supérieurs réduit la douleur de la cervicalgie chronique de façon modérée à importante juste après le programme (preuves de qualité modérée).',
            en: 'Neck, shoulder-blade and upper-limb strengthening reduces chronic neck pain by a moderate to large amount right after the programme (moderate-quality evidence).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'scapular-push-up',
    family: 'scapular-protraction',
    name: { fr: 'Pompe scapulaire (dentelé antérieur)', en: 'Scapular push-up (serratus anterior)' },
    sports: ['bike'],
    zones: ['neck-shoulders', 'trunk'],
    half: 'upper',
    muscles: {
      primary: ['serratus-anterior'],
      secondary: ['pectoralis-major', 'trapezius-lower', 'rectus-abdominis'],
    },
    zoom: 'trunk-front',
    qualities: ['control', 'endurance', 'strength'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Le dentelé antérieur plaque l’omoplate contre le thorax quand vous prenez appui sur le guidon. Bien actif, il soulage le haut des trapèzes.',
      en: 'The serratus anterior holds the shoulder blade against the ribcage when you lean on the handlebar. When it works well, it takes load off the upper trapezius.',
    },
    how: {
      setup: {
        fr: 'En appui sur les mains (contre un mur, sur les genoux ou en planche), bras tendus, mains sous les épaules, corps aligné.',
        en: 'Supported on your hands (against a wall, on the knees or in a plank), arms straight, hands under the shoulders, body aligned.',
      },
      movement: {
        fr: 'Sans plier les coudes, laissez la poitrine descendre entre les omoplates qui se rapprochent, puis poussez le sol pour écarter les omoplates et arrondir légèrement le haut du dos.',
        en: 'Without bending the elbows, let the chest sink as the shoulder blades come together, then push the floor away to spread the shoulder blades and slightly round the upper back.',
      },
      cues: [
        { fr: 'Les coudes restent tendus pendant tout le mouvement.', en: 'The elbows stay straight throughout.' },
        { fr: 'Poussez « le sol loin de vous » en fin de mouvement.', en: 'Push “the floor away” at the end of the movement.' },
        { fr: 'Le bassin et la tête restent alignés.', en: 'The pelvis and head stay in line.' },
      ],
      breathing: { fr: 'Expirez en poussant.', en: 'Breathe out as you push.' },
    },
    mistakes: [
      { fr: 'Plier les coudes (cela devient une pompe classique).', en: 'Bending the elbows (it turns into a regular push-up).' },
      { fr: 'Laisser le bassin s’affaisser.', en: 'Letting the hips sag.' },
      { fr: 'Rentrer la tête dans les épaules.', en: 'Sinking the head into the shoulders.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        description: { fr: 'Debout face à un mur, mains à hauteur des épaules.', en: 'Standing facing a wall, hands at shoulder height.' },
        mastery: { fr: '3 × 15 répétitions lentes sans hausser les épaules.', en: '3 × 15 slow reps without shrugging.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Sur les genoux', en: 'On the knees' },
        description: { fr: 'En planche sur les genoux, ou mains sur un banc.', en: 'In a plank on the knees, or hands on a bench.' },
        mastery: { fr: '3 × 15 répétitions avec 1 seconde de tenue en fin de poussée.', en: '3 × 15 reps with a 1-second hold at the end of the push.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'En planche', en: 'Full plank' },
        description: { fr: 'En planche sur les pieds, bras tendus.', en: 'In a full plank on the feet, arms straight.' },
        mastery: { fr: '3 × 12 répétitions sans affaissement du bassin.', en: '3 × 12 reps without the hips sagging.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Pompe « plus »', en: 'Push-up plus' },
        description: { fr: 'Une pompe complète suivie de la poussée scapulaire en haut (le « plus »).', en: 'A full push-up followed by the shoulder-blade push at the top (the “plus”).' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 pompes « plus » propres ; ajoutez un élastique dans le dos pour progresser.', en: 'Maintenance level: 3 × 10 clean push-up pluses; add a band across the back to progress.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-1-1', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Contre un mur, sur les genoux ou en planche selon le niveau.', en: 'Against a wall, on the knees or in a plank depending on the level.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique dans le dos', en: 'Band across the back' },
        instructions: { fr: 'Élastique passé dans le dos et tenu sous les mains pour ajouter de la résistance.', en: 'Band across the upper back and held under the hands to add resistance.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Sangles de suspension', en: 'Suspension straps' },
        instructions: { fr: 'Mains dans les poignées, corps incliné : l’instabilité demande plus de contrôle de l’omoplate.', en: 'Hands in the handles, body inclined: the instability demands more shoulder-blade control.' },
      },
    ],
    precautions: [caution.painFlare, {
      fr: 'Si l’appui sur les mains réveille des fourmillements ou une douleur au poignet, faites-le sur les poings ou sur des poignées pour garder le poignet droit.',
      en: 'If weight-bearing on the hands brings on tingling or wrist pain, use your fists or push-up handles to keep the wrist straight.',
    }],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'andersen-2014',
          finding: {
            fr: 'Chez 47 employés de bureau avec douleur chronique du cou et des épaules, 10 semaines d’entraînement du dentelé antérieur et du trapèze inférieur, en limitant le travail du haut des trapèzes, ont réduit la douleur de façon cliniquement pertinente.',
            en: 'In 47 office workers with chronic neck and shoulder pain, 10 weeks of serratus anterior and lower trapezius training, minimising upper trapezius work, reduced pain by a clinically relevant amount.',
          },
        },
        {
          refId: 'ludewig-2004',
          finding: {
            fr: 'La pompe « plus » classique activait le plus le dentelé antérieur avec le moins de trapèze supérieur ; les versions au mur ou sur les genoux forment une progression.',
            en: 'The standard push-up plus produced the highest serratus anterior activation with the least upper trapezius; wall and knee versions form a progression.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'push-up',
    family: 'horizontal-push',
    name: { fr: 'Pompes', en: 'Push-up' },
    sports: ['bike', 'run'],
    zones: ['neck-shoulders', 'trunk'],
    half: 'upper',
    muscles: {
      primary: ['pectoralis-major', 'triceps-brachii', 'deltoid-anterior'],
      secondary: ['serratus-anterior', 'rectus-abdominis', 'transversus-abdominis'],
    },
    zoom: 'trunk-front',
    qualities: ['strength', 'endurance'],
    objectives: ['prevention', 'return'],
    preventionFor: ['bike', 'run'],
    why: {
      fr: 'Les bras et la poitrine portent une partie du poids du buste sur le guidon, surtout en danseuse et en tout-terrain. La pompe les renforce tout en faisant travailler le gainage.',
      en: 'The arms and chest carry part of the upper-body weight on the handlebar, especially out of the saddle and off-road. Push-ups strengthen them while also training the core.',
    },
    how: {
      setup: {
        fr: 'Mains un peu plus larges que les épaules, corps aligné de la tête aux talons (ou aux genoux), abdominaux serrés.',
        en: 'Hands slightly wider than the shoulders, body in a straight line from head to heels (or knees), abs braced.',
      },
      movement: {
        fr: 'Descendez la poitrine vers le sol en gardant les coudes à environ 45° du corps, puis poussez pour remonter jusqu’aux bras tendus.',
        en: 'Lower the chest towards the floor with the elbows at about 45° from the body, then push back up to straight arms.',
      },
      cues: [
        { fr: 'Le corps reste une planche du début à la fin.', en: 'The body stays a plank from start to finish.' },
        { fr: 'Coudes vers l’arrière, pas sur les côtés.', en: 'Elbows back, not flared out.' },
        { fr: 'En haut, poussez le sol pour écarter les omoplates.', en: 'At the top, push the floor away to spread the shoulder blades.' },
      ],
      breathing: { fr: 'Inspirez en descendant, expirez en poussant.', en: 'Breathe in on the way down, out as you push.' },
    },
    mistakes: [
      { fr: 'Bassin qui s’affaisse ou fesses trop hautes.', en: 'Hips sagging or bottom too high.' },
      { fr: 'Coudes écartés à 90° du corps.', en: 'Elbows flared at 90° from the body.' },
      { fr: 'Amplitude partielle, tête qui plonge vers le sol.', en: 'Partial range with the head dropping to the floor.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Pompes inclinées', en: 'Incline push-up' },
        description: { fr: 'Mains contre un mur ou sur une table : plus les mains sont hautes, plus c’est facile.', en: 'Hands on a wall or table: the higher the hands, the easier.' },
        mastery: { fr: '3 × 15 répétitions en pleine amplitude, corps aligné.', en: '3 × 15 full-range reps with the body aligned.' },
        dosage: { sets: 3, reps: [10, 15], tempo: '2-0-1', restSec: 60, perSide: false, intensity: rir('3'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Sur les genoux ou sur un banc', en: 'Knees or bench' },
        description: { fr: 'Pompes sur les genoux, ou mains sur un banc bas.', en: 'Push-ups on the knees, or hands on a low bench.' },
        mastery: { fr: '3 × 12 répétitions propres.', en: '3 × 12 clean reps.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Pompes complètes', en: 'Full push-up' },
        description: { fr: 'Pompes classiques sur les pieds.', en: 'Standard push-ups on the feet.' },
        mastery: { fr: '3 × 12 à 15 répétitions avec 2 répétitions en réserve.', en: '3 × 12 to 15 reps with 2 reps in reserve.' },
        dosage: { sets: 3, reps: [8, 15], tempo: '2-0-1', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Pieds surélevés ou instables', en: 'Feet elevated or unstable' },
        description: { fr: 'Pieds sur un banc, ou mains ou pieds dans des sangles de suspension.', en: 'Feet on a bench, or hands or feet in suspension straps.' },
        mastery: { fr: '3 × 12 répétitions sans perte d’alignement.', en: '3 × 12 reps without losing alignment.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-0-1', restSec: 90, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Pompes lestées', en: 'Loaded push-up' },
        description: { fr: 'Élastique tendu dans le dos sous les mains ou sac lesté, 6 à 10 répétitions exigeantes.', en: 'Band across the back under the hands or a weighted pack, 6 to 10 demanding reps.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la résistance quand 4 × 10 deviennent faciles.', en: 'Maintenance level: increase the resistance when 4 × 10 becomes easy.' },
        dosage: { sets: 4, reps: [6, 10], tempo: '2-0-1', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Contre un mur, une table, sur les genoux ou sur les pieds selon le niveau.', en: 'Against a wall, a table, on the knees or on the feet depending on the level.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique dans le dos', en: 'Band across the back' },
        instructions: { fr: 'Élastique passé dans le haut du dos, extrémités tenues sous les mains.', en: 'Band across the upper back, ends held under the hands.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Sangles de suspension', en: 'Suspension straps' },
        instructions: { fr: 'Mains dans les poignées : plus le corps est incliné, plus c’est dur et instable.', en: 'Hands in the handles: the more inclined the body, the harder and less stable.' },
      },
    ],
    precautions: [caution.painFlare, {
      fr: 'En cas de gêne au poignet, faites les pompes sur les poings ou sur des poignées, poignet droit.',
      en: 'If your wrists complain, do push-ups on your fists or on handles, with a straight wrist.',
    }],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'ludewig-2004',
          finding: {
            fr: 'Chez 30 personnes, la pompe complète avec poussée scapulaire en haut activait davantage le dentelé antérieur que les versions au mur, sur les coudes ou sur les genoux.',
            en: 'In 30 people, the full push-up with a shoulder-blade push at the top activated the serratus anterior more than wall, elbow or knee versions.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'shoulder-external-rotation',
    family: 'shoulder-external-rotation',
    name: { fr: 'Rotation externe d’épaule', en: 'Shoulder external rotation' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['rotator-cuff'],
      secondary: ['deltoid-posterior', 'trapezius-middle', 'trapezius-lower'],
    },
    zoom: 'shoulders-neck',
    qualities: ['strength', 'endurance', 'control'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Les muscles de la coiffe des rotateurs centrent la tête de l’humérus dans l’épaule. Sur le vélo, ils stabilisent l’épaule en appui sur le guidon et lors des chocs en tout-terrain.',
      en: 'The rotator cuff muscles keep the head of the upper-arm bone centred in the shoulder. On the bike, they stabilise the shoulder when leaning on the handlebar and absorbing off-road impacts.',
    },
    how: {
      setup: {
        fr: 'Coude plié à 90°, collé au corps (une serviette roulée entre le coude et les côtes), avant-bras devant le ventre.',
        en: 'Elbow bent at 90°, tucked to your side (a rolled towel between elbow and ribs), forearm across your stomach.',
      },
      movement: {
        fr: 'Faites pivoter l’avant-bras vers l’extérieur sans décoller le coude, tenez 1 seconde, puis revenez lentement.',
        en: 'Rotate the forearm outwards without lifting the elbow, hold 1 second, then return slowly.',
      },
      cues: [
        { fr: 'Le coude reste contre la serviette.', en: 'The elbow stays on the towel.' },
        { fr: 'Épaule basse, omoplate légèrement serrée.', en: 'Shoulder down, shoulder blade gently set back.' },
        { fr: 'Poignet droit, mouvement lent.', en: 'Wrist straight, slow movement.' },
      ],
    },
    mistakes: [
      { fr: 'Écarter le coude du corps pour aller plus loin.', en: 'Moving the elbow away from the body to go further.' },
      { fr: 'Tourner le buste au lieu de l’épaule.', en: 'Twisting the trunk instead of the shoulder.' },
      { fr: 'Charge trop lourde, mouvement saccadé.', en: 'Load too heavy, jerky movement.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie contre un cadre de porte', en: 'Isometric against a door frame' },
        description: { fr: 'Dos de la main contre un cadre de porte, coude au corps : poussez vers l’extérieur sans bouger.', en: 'Back of the hand against a door frame, elbow at your side: push outwards without moving.' },
        mastery: { fr: '5 tenues de 20 secondes sans douleur.', en: '5 holds of 20 seconds without pain.' },
        dosage: { sets: 5, holdSec: 20, restSec: 30, perSide: true, intensity: load('Effort moyen, sans douleur', 'Moderate effort, pain-free'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Couché sur le côté, sans charge', en: 'Side-lying, unloaded' },
        description: { fr: 'Couché sur le côté opposé, coude sur la serviette : rotation externe avec le seul poids de l’avant-bras.', en: 'Lying on the opposite side, elbow on the towel: external rotation with just the forearm’s weight.' },
        mastery: { fr: '3 × 20 répétitions lentes en pleine amplitude.', en: '3 × 20 slow, full-range reps.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-1-2', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Chargé, coude au corps', en: 'Loaded, elbow at side' },
        description: { fr: 'Élastique fixé à hauteur du coude, haltère léger couché sur le côté, ou poulie.', en: 'Band anchored at elbow height, a light dumbbell lying on your side, or a cable.' },
        mastery: { fr: '3 × 15 répétitions avec la même résistance, sans compensation.', en: '3 × 15 reps with the same resistance, without compensation.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Chargé, plus lourd', en: 'Loaded, heavier' },
        description: { fr: 'Même mouvement avec une résistance qui permet 8 à 12 répétitions.', en: 'Same movement with a resistance allowing 8 to 12 reps.' },
        mastery: { fr: '3 × 10 répétitions, force comparable entre les deux épaules.', en: '3 × 10 reps, with comparable strength between shoulders.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-1-2', restSec: 75, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Bras à 90° d’abduction', en: 'Arm at 90° abduction' },
        description: { fr: 'Bras levé sur le côté à hauteur d’épaule, coude plié à 90° : rotation vers le haut contre l’élastique ou la poulie.', en: 'Arm raised to the side at shoulder height, elbow bent at 90°: rotate up against the band or cable.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 12 sans douleur ni haussement d’épaule.', en: 'Maintenance level: 3 × 12 without pain or shrugging.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans matériel', en: 'No equipment' },
        instructions: { fr: 'Isométrie contre un cadre de porte, puis rotation couché sur le côté avec le poids de l’avant-bras.', en: 'Isometric against a door frame, then side-lying rotation with the forearm’s weight.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique fixé à une poignée de porte, à hauteur du coude, du côté opposé au bras qui travaille.', en: 'Band tied to a door handle at elbow height, on the side opposite the working arm.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère couché sur le côté', en: 'Side-lying dumbbell' },
        instructions: { fr: 'Couché sur le côté opposé, haltère léger (0,5 à 3 kg) dans la main du dessus.', en: 'Lying on the opposite side, a light dumbbell (0.5 to 3 kg) in the top hand.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie', en: 'Cable' },
        instructions: { fr: 'Poulie réglée à hauteur du coude, debout de profil.', en: 'Cable set at elbow height, standing side-on.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'reinold-2004',
          finding: {
            fr: 'Parmi 7 exercices de rotation externe, la version couchée sur le côté activait le plus l’infra-épineux et le petit rond (environ 60 % de la force maximale).',
            en: 'Of 7 external rotation exercises, the side-lying version produced the highest infraspinatus and teres minor activity (around 60% of maximum).',
          },
        },
        {
          refId: 'cools-2007',
          finding: {
            fr: 'La rotation externe couché sur le côté fait partie des exercices qui sollicitent les trapèzes moyen et inférieur avec peu de trapèze supérieur.',
            en: 'Side-lying external rotation is among the exercises that recruit the middle and lower trapezius with little upper trapezius.',
          },
        },
        {
          refId: 'andersen-2010',
          finding: {
            fr: 'Pour la rotation externe d’épaule, l’élastique et les haltères produisaient une activation musculaire comparable à effort maximal.',
            en: 'For shoulder external rotation, elastic tubing and dumbbells produced comparable muscle activation at maximal effort.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'wall-slide',
    family: 'overhead-scapular',
    name: { fr: 'Glissé au mur (wall slide)', en: 'Wall slide' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['serratus-anterior'],
      secondary: ['trapezius-lower', 'rotator-cuff', 'deltoid-anterior'],
    },
    zoom: 'trunk-front',
    qualities: ['control', 'mobility', 'endurance'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Lever les bras demande que l’omoplate tourne et se plaque contre le thorax, grâce au dentelé antérieur et au trapèze inférieur. Après des heures bras tendus vers le guidon, ce mouvement entretient leur contrôle.',
      en: 'Raising the arms requires the shoulder blade to rotate and stay flat on the ribcage, thanks to the serratus anterior and lower trapezius. After hours reaching for the handlebar, this movement maintains their control.',
    },
    how: {
      setup: {
        fr: 'Face au mur, avant-bras posés contre le mur à hauteur d’épaules, coudes à la largeur des épaules, un pied en avant.',
        en: 'Facing the wall, forearms on the wall at shoulder height, elbows shoulder-width apart, one foot forwards.',
      },
      movement: {
        fr: 'Faites glisser les avant-bras vers le haut le long du mur en poussant légèrement le mur, puis redescendez lentement.',
        en: 'Slide the forearms up the wall while gently pressing into it, then lower slowly.',
      },
      cues: [
        { fr: 'Poussez légèrement le mur pendant toute la montée.', en: 'Keep pressing gently into the wall all the way up.' },
        { fr: 'Épaules loin des oreilles.', en: 'Shoulders away from the ears.' },
        { fr: 'Le bas du dos ne se creuse pas.', en: 'The lower back does not arch.' },
      ],
      breathing: { fr: 'Expirez en montant.', en: 'Breathe out on the way up.' },
    },
    mistakes: [
      { fr: 'Hausser les épaules en haut du mouvement.', en: 'Shrugging at the top.' },
      { fr: 'Cambrer le dos pour monter les bras plus haut.', en: 'Arching the back to raise the arms higher.' },
      { fr: 'Ne plus appuyer sur le mur.', en: 'Stopping pressing into the wall.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Glissé, amplitude confortable', en: 'Slide, comfortable range' },
        description: { fr: 'Montée jusqu’à une hauteur confortable, sans douleur.', en: 'Slide up to a comfortable height, pain-free.' },
        mastery: { fr: '2 × 12 répétitions lentes sans hausser les épaules.', en: '2 × 12 slow reps without shrugging.' },
        dosage: { sets: 2, reps: [10, 12], tempo: '2-1-2', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Pleine amplitude et décollé', en: 'Full range and lift-off' },
        description: { fr: 'Montez le plus haut possible puis décollez les bras du mur de quelques centimètres pendant 2 secondes.', en: 'Slide as high as possible, then lift the arms a few centimetres off the wall for 2 seconds.' },
        mastery: { fr: '3 × 12 répétitions avec décollé de 2 secondes.', en: '3 × 12 reps with a 2-second lift-off.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-2-2', restSec: 60, perSide: false, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Avec élastique', en: 'With a band' },
        description: { fr: 'Élastique autour des avant-bras : gardez-le tendu en écartant légèrement pendant la montée.', en: 'Band around the forearms: keep it taut by pressing slightly outwards as you slide up.' },
        mastery: { fr: '3 × 12 répétitions sans perte de tension de l’élastique.', en: '3 × 12 reps without losing band tension.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Élastique fort et décollé', en: 'Strong band and lift-off' },
        description: { fr: 'Élastique plus fort, avec décollé du mur en haut.', en: 'Stronger band, with a lift-off at the top.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 12 propres avec tenue de 3 secondes en haut.', en: 'Maintenance level: 3 × 12 clean reps with a 3-second hold at the top.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-3-2', restSec: 75, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Contre un mur', en: 'Against a wall' },
        instructions: { fr: 'Avant-bras sur le mur ; une serviette sous les avant-bras aide à glisser.', en: 'Forearms on the wall; a towel under the forearms helps them slide.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique autour des avant-bras', en: 'Band around the forearms' },
        instructions: { fr: 'Petite boucle élastique autour des avant-bras, juste sous les coudes.', en: 'Small loop band around the forearms, just below the elbows.' },
      },
    ],
    precautions: [caution.painFlare, {
      fr: 'Si lever le bras au-dessus de la tête est douloureux, restez sous la zone douloureuse.',
      en: 'If raising the arm overhead is painful, stay below the painful range.',
    }],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'hardwick-2006',
          finding: {
            fr: 'Chez 20 personnes, le glissé au mur activait le dentelé antérieur autant que la pompe « plus » à 90° de levée du bras, et davantage à mesure que le bras montait.',
            en: 'In 20 people, the wall slide activated the serratus anterior as much as the push-up plus at 90° of arm elevation, and more as the arm went higher.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'shoulder-shrug',
    family: 'shrug',
    name: { fr: 'Haussement d’épaules (trapèzes supérieurs)', en: 'Shoulder shrug (upper trapezius)' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['trapezius-upper', 'levator-scapulae'],
      secondary: ['trapezius-middle', 'rhomboids'],
    },
    zoom: 'shoulders-neck',
    qualities: ['strength', 'endurance'],
    objectives: ['pain', 'return', 'prevention'],
    preventionFor: ['bike'],
    why: {
      fr: 'Le haut des trapèzes soutient les épaules et la tête et se crispe souvent sur les longues sorties. Le renforcer directement le rend plus tolérant à cette charge prolongée.',
      en: 'The upper trapezius supports the shoulders and head and often tightens on long rides. Strengthening it directly makes it more tolerant of that sustained load.',
    },
    how: {
      setup: {
        fr: 'Debout, une charge dans chaque main (ou pieds sur un élastique), bras le long du corps, cou long, regard droit devant.',
        en: 'Standing with a weight in each hand (or feet on a band), arms by your sides, neck long, eyes forward.',
      },
      movement: {
        fr: 'Montez les épaules droit vers les oreilles, tenez 1 à 2 secondes, puis redescendez lentement jusqu’en bas.',
        en: 'Lift the shoulders straight up towards the ears, hold 1 to 2 seconds, then lower slowly all the way down.',
      },
      cues: [
        { fr: 'Montez verticalement, sans rouler les épaules.', en: 'Lift straight up, without rolling the shoulders.' },
        { fr: 'La tête ne s’avance pas.', en: 'The head does not move forwards.' },
        { fr: 'La descente est lente et complète.', en: 'The lowering is slow and complete.' },
      ],
      breathing: { fr: 'Expirez en montant.', en: 'Breathe out on the way up.' },
    },
    mistakes: [
      { fr: 'Rouler les épaules en cercle.', en: 'Rolling the shoulders in circles.' },
      { fr: 'Avancer la tête ou plier les coudes.', en: 'Poking the head forwards or bending the elbows.' },
      { fr: 'Laisser retomber la charge.', en: 'Letting the weight drop.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sans charge, tenue en haut', en: 'Unloaded, hold at the top' },
        description: { fr: 'Haussements lents sans charge avec 3 secondes de tenue en haut.', en: 'Slow unloaded shrugs with a 3-second hold at the top.' },
        mastery: { fr: '3 × 15 sans douleur ni crispation qui persiste après.', en: '3 × 15 without pain or lingering tension afterwards.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-3-2', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Charge légère à moyenne', en: 'Light to moderate load' },
        description: { fr: 'Haltères, élastique ou poulie, 12 à 15 répétitions.', en: 'Dumbbells, band or cable, 12 to 15 reps.' },
        mastery: { fr: '3 × 15 répétitions contrôlées avec la même charge.', en: '3 × 15 controlled reps with the same load.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 60, perSide: false, intensity: rir('3'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Charge lourde', en: 'Heavy load' },
        description: { fr: 'Charge permettant 8 à 12 répétitions, montée contrôlée et descente lente.', en: 'A load allowing 8 to 12 reps, controlled lift and slow lowering.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 12 deviennent faciles.', en: 'Maintenance level: add load when 3 × 12 becomes easy.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '2-1-3', restSec: 90, perSide: false, intensity: rir('1-2'), frequency: freq.threePerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans charge', en: 'Unloaded' },
        instructions: { fr: 'Haussements lents avec tenue ; utile en début de programme ou en échauffement.', en: 'Slow shrugs with a hold; useful at the start of a programme or as a warm-up.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Pieds sur le milieu de l’élastique, extrémités dans les mains.', en: 'Feet on the middle of the band, ends in your hands.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, paumes face au corps.', en: 'One dumbbell in each hand, palms facing the body.' },
      },
      {
        id: 'barbell', equipment: ['barbell'], loadable: true, rank: 3,
        name: { fr: 'Barre', en: 'Barbell' },
        instructions: { fr: 'Barre tenue devant les cuisses, mains à la largeur des épaules.', en: 'Bar held in front of the thighs, hands shoulder-width apart.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie ou machine', en: 'Cable or machine' },
        instructions: { fr: 'Poulies basses de chaque côté ou machine guidée.', en: 'Low cables on each side or a guided machine.' },
      },
    ],
    precautions: [caution.painFlare, neckCaution],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'andersen-2008',
          finding: {
            fr: 'Chez 48 femmes avec myalgie du trapèze, 10 semaines de renforcement ciblant directement les muscles douloureux ont réduit la pire douleur d’environ 79 %, contre un effet faible et passager pour le vélo d’appartement.',
            en: 'In 48 women with trapezius myalgia, 10 weeks of strengthening directly targeting the painful muscles reduced worst pain by about 79%, versus a small, transient effect for stationary cycling.',
          },
        },
        {
          refId: 'andersen-2008-b',
          finding: {
            fr: 'Le haussement d’épaules était l’exercice qui activait le plus le trapèze dans ce programme (environ 100 % de la contraction maximale).',
            en: 'The shrug was the exercise that activated the trapezius most in this programme (about 100% of maximal contraction).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'thoracic-extension',
    family: 'thoracic-mobility',
    name: { fr: 'Mobilité du haut du dos (extension thoracique)', en: 'Thoracic extension mobility' },
    sports: ['bike'],
    zones: ['trunk', 'neck-shoulders'],
    half: 'upper',
    muscles: {
      primary: ['erector-spinae'],
      secondary: ['trapezius-middle', 'trapezius-lower', 'rhomboids'],
    },
    zoom: 'trunk-back',
    qualities: ['mobility', 'control'],
    objectives: ['prevention', 'pain'],
    preventionFor: ['bike'],
    why: {
      fr: 'Sur le vélo, le haut du dos reste arrondi pendant des heures et c’est le cou qui se cambre pour regarder la route. Entretenir l’extension du haut du dos répartit mieux ce mouvement.',
      en: 'On the bike, the upper back stays rounded for hours and the neck arches to look at the road. Keeping upper-back extension shares that movement out better.',
    },
    how: {
      setup: {
        fr: 'Assis sur une chaise à dossier bas, mains croisées derrière la tête, coudes vers l’avant.',
        en: 'Seated on a chair with a low backrest, hands clasped behind the head, elbows forwards.',
      },
      movement: {
        fr: 'Penchez le haut du dos en arrière au-dessus du dossier en ouvrant les coudes, sans creuser le bas du dos, puis revenez.',
        en: 'Lean the upper back over the backrest while opening the elbows, without arching the lower back, then return.',
      },
      cues: [
        { fr: 'Le mouvement vient du haut du dos, pas des lombaires.', en: 'The movement comes from the upper back, not the lower back.' },
        { fr: 'Gardez les côtes basses.', en: 'Keep the ribs down.' },
        { fr: 'Amplitude progressive, jamais forcée.', en: 'Gradual range, never forced.' },
      ],
      breathing: { fr: 'Expirez en vous penchant en arrière.', en: 'Breathe out as you lean back.' },
    },
    mistakes: [
      { fr: 'Cambrer le bas du dos.', en: 'Arching the lower back.' },
      { fr: 'Tirer sur la nuque avec les mains.', en: 'Pulling on the neck with the hands.' },
      { fr: 'Rebondir en fin d’amplitude.', en: 'Bouncing at end range.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sur une chaise', en: 'On a chair' },
        description: { fr: 'Extension du haut du dos par-dessus le dossier, mains derrière la tête.', en: 'Upper-back extension over the backrest, hands behind the head.' },
        mastery: { fr: '2 × 10 répétitions confortables, amplitude qui augmente au fil de la série.', en: '2 × 10 comfortable reps, with range increasing through the set.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '2-2-2', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'À genoux, coudes sur une chaise', en: 'Kneeling, elbows on a chair' },
        description: { fr: 'À genoux face à une chaise, coudes posés sur l’assise, mains derrière la tête : reculez les fesses vers les talons et laissez la poitrine descendre vers le sol.', en: 'Kneeling facing a chair, elbows on the seat, hands behind the head: sit the hips back towards the heels and let the chest sink towards the floor.' },
        mastery: { fr: '3 tenues de 20 secondes confortables, sans creuser le bas du dos.', en: '3 comfortable 20-second holds without arching the lower back.' },
        dosage: { sets: 3, holdSec: 20, restSec: 20, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Extension active à plat ventre', en: 'Prone active extension' },
        description: { fr: 'Allongé sur le ventre, mains près des épaules, menton rentré : décollez le haut de la poitrine du sol avec les muscles du dos, sans pousser fort sur les mains.', en: 'Lying face down, hands near the shoulders, chin tucked: lift the upper chest off the floor with the back muscles, without pushing hard through the hands.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 avec 3 secondes de tenue en haut.', en: 'Maintenance level: 3 × 10 with a 3-second hold at the top.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-3-2', restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Chaise et tapis', en: 'Chair and mat' },
        instructions: { fr: 'Une chaise stable à dossier bas et un tapis suffisent.', en: 'A stable chair with a low backrest and a mat are enough.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Sur ballon de gymnastique', en: 'Over a Swiss ball' },
        instructions: { fr: 'Dos sur le ballon, pieds au sol, bras ouverts : laissez le haut du dos s’allonger sur le ballon, tête soutenue.', en: 'Back on the ball, feet on the floor, arms open: let the upper back drape over the ball, head supported.' },
      },
    ],
    precautions: [caution.painFlare, {
      fr: 'Mouvement de mobilité : il doit rester confortable. Aucune douleur qui irradie dans les bras.',
      en: 'This is a mobility movement: it should stay comfortable. No pain spreading into the arms.',
    }],
    evidence: {
      level: 'expert',
      citations: [],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'pec-minor-stretch',
    family: 'pec-stretch',
    name: { fr: 'Étirement du petit pectoral (cadre de porte)', en: 'Pec minor doorway stretch' },
    sports: ['bike'],
    zones: ['neck-shoulders'],
    half: 'upper',
    muscles: {
      // Le petit pectoral n'existe pas dans MUSCLE_IDS : le grand pectoral, qui le recouvre, est affiché.
      primary: ['pectoralis-major'],
      secondary: ['deltoid-anterior', 'biceps-brachii'],
    },
    zoom: 'trunk-front',
    qualities: ['mobility'],
    objectives: ['prevention', 'pain'],
    preventionFor: ['bike'],
    why: {
      fr: 'Le petit pectoral, sous le grand pectoral, tire l’omoplate vers l’avant quand il est raccourci, ce qui accentue les épaules enroulées de la position sur le vélo.',
      en: 'The pec minor, under the pec major, pulls the shoulder blade forwards when it is short, adding to the rounded-shoulder riding position.',
    },
    how: {
      setup: {
        fr: 'Dans l’encadrement d’une porte, avant-bras posé contre le montant, coude un peu au-dessus de l’épaule.',
        en: 'In a doorway, forearm against the frame, elbow slightly above shoulder height.',
      },
      movement: {
        fr: 'Avancez d’un pas et tournez doucement le buste à l’opposé du bras jusqu’à sentir un étirement à l’avant de l’épaule, sous la clavicule. Tenez.',
        en: 'Step forwards and gently turn the trunk away from the arm until you feel a stretch at the front of the shoulder, below the collarbone. Hold.',
      },
      cues: [
        { fr: 'Omoplate tirée vers l’arrière et vers le bas.', en: 'Shoulder blade drawn back and down.' },
        { fr: 'Étirement net mais confortable.', en: 'A clear but comfortable stretch.' },
        { fr: 'Pas de fourmillements dans la main.', en: 'No tingling in the hand.' },
      ],
      breathing: { fr: 'Respirez lentement, relâchez à l’expiration.', en: 'Breathe slowly and relax as you breathe out.' },
    },
    mistakes: [
      { fr: 'Forcer jusqu’à la douleur ou aux fourmillements.', en: 'Forcing into pain or tingling.' },
      { fr: 'Laisser l’épaule remonter vers l’oreille.', en: 'Letting the shoulder ride up to the ear.' },
      { fr: 'Cambrer le bas du dos au lieu de tourner le buste.', en: 'Arching the lower back instead of turning the trunk.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Coude à hauteur d’épaule', en: 'Elbow at shoulder height' },
        description: { fr: 'Avant-bras sur le montant, coude à 90°, rotation légère du buste.', en: 'Forearm on the frame, elbow at 90°, gentle trunk turn.' },
        mastery: { fr: '3 tenues de 30 secondes de chaque côté, confortables.', en: '3 comfortable holds of 30 seconds per side.' },
        dosage: { sets: 3, holdSec: 30, restSec: 15, perSide: true, intensity: load('Étirement net mais confortable', 'Clear but comfortable stretch'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Coude plus haut', en: 'Elbow higher' },
        description: { fr: 'Coude placé plus haut sur le montant (bras en diagonale vers le haut).', en: 'Elbow placed higher on the frame (arm angled upwards).' },
        mastery: { fr: '3 tenues de 45 secondes de chaque côté sans gêne après.', en: '3 holds of 45 seconds per side with no discomfort afterwards.' },
        dosage: { sets: 3, holdSec: 45, restSec: 15, perSide: true, intensity: load('Étirement net mais confortable', 'Clear but comfortable stretch'), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Étirement actif', en: 'Active stretch' },
        description: { fr: 'Dans la position étirée, serrez l’omoplate vers l’arrière 5 secondes, relâchez puis gagnez un peu d’amplitude.', en: 'In the stretched position, squeeze the shoulder blade back for 5 seconds, relax, then ease a little further.' },
        mastery: { fr: 'Niveau d’entretien : 2 à 3 tenues de 60 secondes par côté.', en: 'Maintenance level: 2 to 3 holds of 60 seconds per side.' },
        dosage: { sets: 2, holdSec: 60, restSec: 15, perSide: true, intensity: load('Étirement net mais confortable', 'Clear but comfortable stretch'), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'doorway', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Cadre de porte', en: 'Doorway' },
        instructions: { fr: 'Un cadre de porte ou l’angle d’un mur.', en: 'A door frame or the corner of a wall.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 0,
        name: { fr: 'Allongé sur un ballon', en: 'Lying over a ball' },
        instructions: { fr: 'Dos sur le ballon, bras ouverts en diagonale vers le haut, paumes vers le plafond.', en: 'Back on the ball, arms open diagonally upwards, palms to the ceiling.' },
      },
    ],
    precautions: [nerveCaution],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'borstad-2006',
          finding: {
            fr: 'Chez 50 personnes, l’auto-étirement debout d’un seul côté allongeait davantage le petit pectoral (environ 2,2 cm) que deux étirements réalisés par un thérapeute.',
            en: 'In 50 people, the standing one-sided self-stretch lengthened the pec minor more (about 2.2 cm) than two therapist-applied stretches.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'wrist-extension',
    family: 'wrist-extension',
    name: { fr: 'Extension du poignet', en: 'Wrist extension' },
    sports: ['bike'],
    zones: ['arms-hands'],
    half: 'upper',
    muscles: {
      primary: ['forearm-extensors'],
      secondary: ['forearm-flexors', 'hand-intrinsics'],
    },
    zoom: 'forearm-hand',
    qualities: ['strength', 'endurance', 'tendon-stiffness'],
    objectives: ['prevention', 'pain', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Les extenseurs du poignet stabilisent la main sur le cintre et encaissent les vibrations, surtout en tout-terrain. Des avant-bras endurants gardent un poignet plus neutre en fin de sortie.',
      en: 'The wrist extensors steady the hand on the bar and absorb vibration, especially off-road. Forearms with good endurance keep the wrist more neutral late in a ride.',
    },
    how: {
      setup: {
        fr: 'Assis, avant-bras posé sur la cuisse ou une table, paume vers le sol, main dans le vide.',
        en: 'Seated, forearm resting on the thigh or a table, palm down, hand over the edge.',
      },
      movement: {
        fr: 'Relevez le dos de la main vers le plafond, puis redescendez lentement en 3 secondes.',
        en: 'Lift the back of the hand towards the ceiling, then lower slowly over 3 seconds.',
      },
      cues: [
        { fr: 'L’avant-bras ne bouge pas.', en: 'The forearm stays still.' },
        { fr: 'Descente lente et contrôlée.', en: 'Slow, controlled lowering.' },
      ],
    },
    mistakes: [
      { fr: 'Soulever l’avant-bras pour aider.', en: 'Lifting the forearm to help.' },
      { fr: 'Laisser tomber la charge.', en: 'Dropping the weight.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Isométrie', en: 'Isometric' },
        description: { fr: 'Poignet droit, l’autre main appuie sur le dos de la main : résistez sans bouger.', en: 'Wrist straight, the other hand pushes on the back of the hand: resist without moving.' },
        mastery: { fr: '5 tenues de 30 secondes sans douleur.', en: '5 holds of 30 seconds without pain.' },
        dosage: { sets: 5, holdSec: 30, restSec: 30, perSide: true, intensity: load('Effort moyen, sans douleur', 'Moderate effort, pain-free'), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Charge légère', en: 'Light load' },
        description: { fr: 'Bouteille d’eau, élastique léger ou petit haltère.', en: 'Water bottle, light band or small dumbbell.' },
        mastery: { fr: '3 × 15 répétitions lentes par côté.', en: '3 × 15 slow reps per side.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.everyOtherDay },
        loaded: true,
      },
      {
        level: 3,
        name: { fr: 'Charge moyenne, lent', en: 'Moderate load, slow' },
        description: { fr: 'Charge permettant 10 à 12 répétitions, montée et descente lentes.', en: 'A load allowing 10 to 12 reps, slow lift and lowering.' },
        mastery: { fr: '3 × 12 avec une charge comparable des deux côtés.', en: '3 × 12 with a similar load on both sides.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-3', restSec: 75, perSide: true, intensity: rir('2'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Charge lourde', en: 'Heavy load' },
        description: { fr: 'Charge permettant 8 à 10 répétitions lentes.', en: 'A load allowing 8 to 10 slow reps.' },
        mastery: { fr: 'Niveau d’entretien : augmentez la charge quand 3 × 10 deviennent faciles.', en: 'Maintenance level: add load when 3 × 10 becomes easy.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-3', restSec: 90, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Résistance de l’autre main', en: 'Other-hand resistance' },
        instructions: { fr: 'L’autre main fournit la résistance (isométrie) ; une bouteille d’eau peut servir de charge légère.', en: 'The other hand provides resistance (isometric); a water bottle can serve as a light load.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique tenu dans la main et bloqué sous le pied.', en: 'Band held in the hand and anchored under the foot.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Petit haltère, avant-bras posé sur la cuisse ou un banc.', en: 'Small dumbbell, forearm resting on the thigh or a bench.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'andersen-2010',
          finding: {
            fr: 'Pour l’extension du poignet, l’élastique et les haltères produisaient une activation musculaire comparable à effort maximal.',
            en: 'For wrist extension, elastic tubing and dumbbells produced comparable muscle activation at maximal effort.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'grip-strength',
    family: 'grip',
    name: { fr: 'Renforcement de la préhension', en: 'Grip strengthening' },
    sports: ['bike'],
    zones: ['arms-hands'],
    half: 'upper',
    muscles: {
      primary: ['forearm-flexors', 'hand-intrinsics'],
      secondary: ['forearm-extensors'],
    },
    zoom: 'forearm-hand',
    qualities: ['strength', 'endurance', 'isometric'],
    objectives: ['prevention', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'La prise du cintre et le freinage, surtout en descente et en tout-terrain, sollicitent les fléchisseurs des doigts et les petits muscles de la main. Une main endurante peut tenir le guidon sans serrer en permanence.',
      en: 'Holding the bar and braking, especially on descents and off-road, work the finger flexors and small hand muscles. A hand with good endurance can hold the bar without gripping hard all the time.',
    },
    how: {
      setup: {
        fr: 'Assis ou debout, épaules relâchées, poignet droit.',
        en: 'Seated or standing, shoulders relaxed, wrist straight.',
      },
      movement: {
        fr: 'Serrez l’objet (serviette, balle, poignée de charge) avec toute la main, tenez, puis relâchez complètement.',
        en: 'Squeeze the object (towel, ball, weight handle) with the whole hand, hold, then fully relax.',
      },
      cues: [
        { fr: 'Poignet droit, pas plié vers l’avant ou l’arrière.', en: 'Wrist straight, not bent forwards or back.' },
        { fr: 'Relâchez complètement entre les efforts.', en: 'Fully relax between efforts.' },
      ],
    },
    mistakes: [
      { fr: 'Hausser l’épaule en serrant.', en: 'Shrugging while squeezing.' },
      { fr: 'Plier le poignet.', en: 'Bending the wrist.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Serrage de balle ou de serviette', en: 'Ball or towel squeeze' },
        description: { fr: 'Serrez une balle souple ou une serviette roulée.', en: 'Squeeze a soft ball or a rolled towel.' },
        mastery: { fr: '3 × 10 serrages de 5 secondes par main sans fourmillements.', en: '3 × 10 five-second squeezes per hand without tingling.' },
        dosage: { sets: 3, reps: [10, 10], restSec: 30, perSide: true, intensity: load('Serrage ferme tenu 5 secondes', 'Firm squeeze held 5 seconds'), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Essorage de serviette', en: 'Towel wringing' },
        description: { fr: 'Tordez une serviette mouillée ou roulée dans un sens puis dans l’autre.', en: 'Wring a wet or rolled towel one way, then the other.' },
        mastery: { fr: '3 × 10 torsions dans chaque sens, sans douleur au poignet.', en: '3 × 10 twists each way without wrist pain.' },
        dosage: { sets: 3, reps: [8, 10], restSec: 45, perSide: false, intensity: rir('2-3'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Maintien de charges', en: 'Loaded holds' },
        description: { fr: 'Debout, tenez des haltères ou kettlebells lourds immobiles le long du corps.', en: 'Standing, hold heavy dumbbells or kettlebells still by your sides.' },
        mastery: { fr: '3 tenues de 45 secondes avec la même charge.', en: '3 holds of 45 seconds with the same load.' },
        dosage: { sets: 3, holdSec: 30, restSec: 60, perSide: false, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Maintien lourd ou suspension', en: 'Heavy hold or hang' },
        description: { fr: 'Charge plus lourde, prise plus épaisse (serviette autour de la poignée) ou suspension à une barre.', en: 'Heavier load, thicker grip (towel around the handle) or hanging from a bar.' },
        mastery: { fr: 'Niveau d’entretien : 3 tenues de 30 à 45 secondes exigeantes.', en: 'Maintenance level: 3 demanding holds of 30 to 45 seconds.' },
        dosage: { sets: 3, holdSec: 30, restSec: 90, perSide: false, intensity: rpe('8-9'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Balle ou serviette', en: 'Ball or towel' },
        instructions: { fr: 'Balle de tennis, balle souple ou serviette roulée.', en: 'Tennis ball, soft ball or rolled towel.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères ou kettlebells', en: 'Dumbbells or kettlebells' },
        instructions: { fr: 'Tenues statiques debout, charge lourde.', en: 'Static standing holds, heavy load.' },
      },
      {
        id: 'gym', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Salle : barre, poulie ou barre de traction', en: 'Gym: bar, cable or pull-up bar' },
        instructions: { fr: 'Tenues à la barre ou suspension à la barre de traction, pieds proches du sol.', en: 'Bar holds or hanging from a pull-up bar, feet close to the floor.' },
      },
    ],
    precautions: [caution.painFlare, {
      fr: 'En cas de fourmillements dans les doigts, ne serrez pas longtemps : privilégiez d’abord les glissements neuraux et consultez si cela persiste.',
      en: 'If your fingers tingle, avoid long squeezes: favour nerve glides first and seek advice if it persists.',
    }],
    evidence: {
      level: 'expert',
      citations: [],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'median-nerve-glide',
    family: 'neural-glide-median',
    name: { fr: 'Glissement du nerf médian', en: 'Median nerve glide' },
    sports: ['bike'],
    zones: ['arms-hands'],
    half: 'upper',
    muscles: {
      // Les nerfs ne sont pas dessinés : on affiche les muscles de l'avant-bras que traverse le nerf médian.
      primary: ['forearm-flexors'],
      secondary: ['hand-intrinsics'],
    },
    zoom: 'forearm-hand',
    qualities: ['mobility'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Le nerf médian passe dans le canal carpien, au milieu du poignet. Poignet en extension et appui prolongé sur le cintre peuvent l’irriter ; des mouvements doux l’aident à coulisser.',
      en: 'The median nerve runs through the carpal tunnel, in the middle of the wrist. Prolonged wrist extension and pressure on the bar can irritate it; gentle movement helps it glide.',
    },
    how: {
      setup: {
        fr: 'Debout ou assis, épaule basse, bras le long du corps, coude plié, paume vers vous.',
        en: 'Standing or seated, shoulder down, arm by your side, elbow bent, palm facing you.',
      },
      movement: {
        fr: 'Glissement « en va-et-vient » : quand vous tendez le coude et ramenez le poignet et les doigts vers l’arrière, penchez la tête du même côté ; quand vous pliez le coude et le poignet, penchez la tête de l’autre côté. Le nerf coulisse sans être étiré.',
        en: 'A back-and-forth “slider”: as you straighten the elbow and bend the wrist and fingers back, tilt the head towards that side; as you bend the elbow and wrist, tilt the head away. The nerve glides without being stretched.',
      },
      cues: [
        { fr: 'Ce n’est pas un étirement : jamais de tension forte.', en: 'This is not a stretch: never strong tension.' },
        { fr: 'Mouvement fluide et lent, sans tenir les positions extrêmes.', en: 'Smooth, slow movement, without holding the end positions.' },
        { fr: 'Arrêtez avant que les fourmillements n’apparaissent.', en: 'Stop before tingling starts.' },
      ],
      breathing: { fr: 'Respiration calme et régulière.', en: 'Calm, steady breathing.' },
    },
    mistakes: [
      { fr: 'Tirer fort comme un étirement musculaire.', en: 'Pulling hard as in a muscle stretch.' },
      { fr: 'Tenir longtemps la position en tension.', en: 'Holding the tensioned position for a long time.' },
      { fr: 'Hausser l’épaule.', en: 'Shrugging the shoulder.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Glissements des tendons de la main', en: 'Hand tendon glides' },
        description: { fr: 'Poignet droit, enchaînez lentement : main ouverte, poing « crochet », poing fermé, doigts tendus pliés à la base, retour main ouverte.', en: 'Wrist straight, slowly sequence: open hand, hook fist, full fist, straight fingers bent at the base, back to open hand.' },
        mastery: { fr: '2 séries de 10 enchaînements fluides sans fourmillements.', en: '2 sets of 10 smooth sequences without tingling.' },
        dosage: { sets: 2, reps: [5, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 2,
        name: { fr: 'Glissement, petite amplitude', en: 'Slider, small range' },
        description: { fr: 'Le va-et-vient décrit, bras le long du corps, petite amplitude du coude et du poignet.', en: 'The slider described, arm by the side, small elbow and wrist range.' },
        mastery: { fr: '2 séries de 10 sans réveil des symptômes dans l’heure qui suit.', en: '2 sets of 10 without symptoms flaring within the following hour.' },
        dosage: { sets: 2, reps: [8, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Glissement, bras écarté', en: 'Slider, arm out to the side' },
        description: { fr: 'Même va-et-vient avec le bras écarté à environ 90° sur le côté, paume vers le haut.', en: 'Same slider with the arm out to the side at about 90°, palm up.' },
        mastery: { fr: 'Niveau d’entretien : 2 × 10 sans symptômes, à faire avant et après les sorties longues si utile.', en: 'Maintenance level: 2 × 10 without symptoms, before and after long rides if helpful.' },
        dosage: { sets: 2, reps: [8, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans matériel', en: 'No equipment' },
        instructions: { fr: 'Debout près d’un mur ou assis, sans aucune charge.', en: 'Standing near a wall or seated, with no load at all.' },
      },
    ],
    precautions: [nerveCaution, {
      fr: 'Faiblesse de la main, fonte musculaire ou fourmillements permanents : consultez avant de poursuivre.',
      en: 'Hand weakness, muscle wasting or constant tingling: seek advice before continuing.',
    }],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'basson-2017',
          finding: {
            fr: 'Cette méta-analyse de 40 essais montre un bénéfice de la mobilisation neurale sur la douleur cou-bras chronique ; dans le syndrome du canal carpien, elle n’améliorait pas la plupart des critères cliniques, malgré quelques effets physiologiques sur le nerf.',
            en: 'This meta-analysis of 40 trials shows a benefit of neural mobilisation for chronic neck-arm pain; in carpal tunnel syndrome it did not improve most clinical outcomes, despite some physiological effects on the nerve.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'ulnar-nerve-glide',
    family: 'neural-glide-ulnar',
    name: { fr: 'Glissement du nerf ulnaire', en: 'Ulnar nerve glide' },
    sports: ['bike'],
    zones: ['arms-hands'],
    half: 'upper',
    muscles: {
      // Les nerfs ne sont pas dessinés : on affiche les petits muscles de la main innervés par le nerf ulnaire.
      primary: ['hand-intrinsics'],
      secondary: ['forearm-flexors'],
    },
    zoom: 'forearm-hand',
    qualities: ['mobility'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Le nerf ulnaire passe au coude puis dans le canal de Guyon, côté petit doigt de la paume, là où l’on s’appuie sur le cintre. Des mouvements doux l’aident à coulisser dans ces passages.',
      en: 'The ulnar nerve passes the elbow and then Guyon’s canal, on the little-finger side of the palm, right where you lean on the bar. Gentle movement helps it glide through these passages.',
    },
    how: {
      setup: {
        fr: 'Debout ou assis, épaule basse, bras écarté sur le côté, coude tendu, paume vers le sol.',
        en: 'Standing or seated, shoulder down, arm out to the side, elbow straight, palm down.',
      },
      movement: {
        fr: 'Glissement « en va-et-vient » : pliez le coude et ramenez la paume vers l’oreille (doigts vers l’arrière) en penchant la tête de l’autre côté, puis tendez le coude en ramenant la tête au centre. Le nerf coulisse sans être étiré.',
        en: 'A back-and-forth “slider”: bend the elbow and bring the palm towards your ear (fingers pointing back) while tilting the head away, then straighten the elbow as the head returns to the centre. The nerve glides without being stretched.',
      },
      cues: [
        { fr: 'Ce n’est pas un étirement : jamais de tension forte.', en: 'This is not a stretch: never strong tension.' },
        { fr: 'Mouvement lent et fluide, sans rester en fin d’amplitude.', en: 'Slow, smooth movement, without staying at end range.' },
        { fr: 'Arrêtez avant les fourmillements dans l’annulaire et l’auriculaire.', en: 'Stop before tingling in the ring and little fingers.' },
      ],
    },
    mistakes: [
      { fr: 'Forcer la position « masque » comme un étirement.', en: 'Forcing the “mask” position like a stretch.' },
      { fr: 'Laisser l’épaule monter vers l’oreille.', en: 'Letting the shoulder ride up to the ear.' },
      { fr: 'Aller vite ou à-coups.', en: 'Moving fast or jerkily.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Doigts et poignet', en: 'Fingers and wrist' },
        description: { fr: 'Coude tendu le long du corps : écartez et resserrez les doigts, puis pliez et tendez doucement le poignet.', en: 'Elbow straight by your side: spread and close the fingers, then gently bend and extend the wrist.' },
        mastery: { fr: '2 séries de 10 mouvements fluides sans fourmillements.', en: '2 sets of 10 smooth movements without tingling.' },
        dosage: { sets: 2, reps: [8, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
      },
      {
        level: 2,
        name: { fr: 'Glissement, petite amplitude', en: 'Slider, small range' },
        description: { fr: 'Le va-et-vient décrit avec le bras peu écarté et une petite flexion du coude.', en: 'The slider described with the arm slightly out and a small elbow bend.' },
        mastery: { fr: '2 séries de 10 sans réveil des symptômes dans l’heure qui suit.', en: '2 sets of 10 without symptoms flaring within the following hour.' },
        dosage: { sets: 2, reps: [8, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Glissement, amplitude complète', en: 'Slider, full range' },
        description: { fr: 'Bras écarté à 90°, coude qui se plie jusqu’à approcher la main de l’oreille (« masque »), toujours en va-et-vient.', en: 'Arm out at 90°, elbow bending until the hand nears the ear (“mask”), always as a slider.' },
        mastery: { fr: 'Niveau d’entretien : 2 × 10 sans symptômes.', en: 'Maintenance level: 2 × 10 without symptoms.' },
        dosage: { sets: 2, reps: [8, 10], restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sans matériel', en: 'No equipment' },
        instructions: { fr: 'Debout ou assis, sans aucune charge.', en: 'Standing or seated, with no load at all.' },
      },
    ],
    precautions: [nerveCaution, {
      fr: 'Faiblesse pour écarter les doigts, maladresse ou creux entre le pouce et l’index : consultez avant de poursuivre.',
      en: 'Weakness spreading the fingers, clumsiness or a hollow between thumb and index finger: seek advice before continuing.',
    }],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'basson-2017',
          finding: {
            fr: 'Faute d’études suffisantes, l’effet de la mobilisation neurale reste incertain pour la compression du nerf ulnaire au coude ; la compression au poignet (canal de Guyon), typique du cycliste, n’est pas évaluée dans ce résumé.',
            en: 'Owing to too few studies, the effect of neural mobilisation remains uncertain for ulnar nerve compression at the elbow; compression at the wrist (Guyon’s canal), typical of cyclists, is not assessed in this summary.',
          },
        },
      ],
    },
  }),
] satisfies ReturnType<typeof defineExercise>[];
