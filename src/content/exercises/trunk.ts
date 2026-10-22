/**
 * Exercices — tronc (skill add-exercise).
 * Gainages (ventral, latéral, anti-rotation), contrôle moteur (dead bug, bird dog, curl-up),
 * extenseurs du dos, portés, flexion contrôlée, rotation en diagonale, mobilité lombaire et thoracique.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

/** Consigne commune aux exercices de gainage. */
const neutralSpine = {
  fr: 'Gardez le dos dans sa position naturelle : ni creusé, ni arrondi.',
  en: 'Keep your back in its natural position: neither arched nor rounded.',
};
const noBreathHold = {
  fr: 'Respirez calmement pendant tout l’effort, sans bloquer.',
  en: 'Breathe calmly throughout, without holding your breath.',
};

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'front-plank',
    family: 'plank-front',
    name: { fr: 'Gainage ventral (planche)', en: 'Front plank' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['rectus-abdominis', 'transversus-abdominis', 'external-oblique'],
      secondary: ['internal-oblique', 'serratus-anterior', 'glute-max', 'rectus-femoris'],
    },
    zoom: 'trunk-front',
    qualities: ['isometric', 'endurance', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les abdominaux empêchent le bassin et le bas du dos de se creuser quand les jambes poussent. En course comme sur le vélo, un tronc endurant garde une position stable jusqu’à la fin de la sortie.',
      en: 'The abdominals stop the pelvis and lower back from arching while the legs push. In running and cycling alike, an enduring trunk keeps your position stable until the end of the session.',
    },
    how: {
      setup: {
        fr: 'À plat ventre, avant-bras au sol, coudes sous les épaules, pointes de pieds (ou genoux) au sol.',
        en: 'Lying face down, forearms on the floor, elbows under the shoulders, toes (or knees) on the floor.',
      },
      movement: {
        fr: 'Décollez le bassin pour aligner épaules, hanches et genoux (ou chevilles), puis tenez la position sans bouger pendant la durée indiquée.',
        en: 'Lift your hips so shoulders, hips and knees (or ankles) line up, then hold still for the set time.',
      },
      cues: [
        neutralSpine,
        { fr: 'Serrez légèrement les fessiers et rentrez un peu le ventre, comme pour encaisser un petit coup.', en: 'Lightly squeeze your glutes and brace your belly, as if to absorb a light punch.' },
        { fr: 'Repoussez le sol avec les avant-bras, sans laisser les épaules s’affaisser.', en: 'Push the floor away with your forearms, without letting the shoulders sag.' },
      ],
      breathing: noBreathHold,
    },
    mistakes: [
      { fr: 'Laisser le bassin s’affaisser et creuser le bas du dos.', en: 'Letting the hips sag and the lower back arch.' },
      { fr: 'Monter les fesses trop haut pour soulager les abdominaux.', en: 'Piking the hips too high to offload the abs.' },
      { fr: 'Tenir longtemps avec une mauvaise position plutôt que court et bien aligné.', en: 'Holding long with poor alignment instead of shorter and well aligned.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Planche sur les genoux', en: 'Kneeling plank' },
        description: { fr: 'Appui sur les avant-bras et les genoux, corps aligné des épaules aux genoux.', en: 'On forearms and knees, body aligned from shoulders to knees.' },
        mastery: { fr: '3 × 40 s sans que le bas du dos se creuse.', en: '3 × 40 s without the lower back arching.' },
        dosage: { sets: 3, holdSec: 30, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Planche classique', en: 'Standard plank' },
        description: { fr: 'Appui sur les avant-bras et les pointes de pieds.', en: 'On forearms and toes.' },
        mastery: { fr: '3 × 45 s avec un bassin stable jusqu’à la dernière seconde.', en: '3 × 45 s with stable hips until the last second.' },
        dosage: { sets: 3, holdSec: 40, restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Planche avec appui alterné', en: 'Plank with alternating lifts' },
        description: { fr: 'En planche, décollez un pied quelques centimètres pendant 2 à 3 secondes, puis l’autre, sans que le bassin bascule.', en: 'In a plank, lift one foot a few centimetres for 2 to 3 seconds, then the other, without the pelvis tilting.' },
        mastery: { fr: '3 × 45 s en alternant pieds puis bras, bassin immobile.', en: '3 × 45 s alternating feet then arms, pelvis still.' },
        dosage: { sets: 3, holdSec: 40, restSec: 60, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Planche longue et contractée', en: 'Long-lever plank' },
        description: { fr: 'Coudes avancés de 10 à 15 cm devant les épaules, fessiers et abdominaux contractés fort : plus court mais beaucoup plus intense.', en: 'Elbows 10 to 15 cm in front of the shoulders, glutes and abs squeezed hard: shorter but much more intense.' },
        mastery: { fr: '4 × 20 s en gardant une contraction maximale et le dos neutre.', en: '4 × 20 s keeping a maximal squeeze and a neutral back.' },
        dosage: { sets: 4, holdSec: 15, restSec: 60, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Stir-the-pot sur swiss ball', en: 'Stir-the-pot on a Swiss ball' },
        description: { fr: 'Avant-bras sur un ballon, en planche : dessinez de petits cercles avec les coudes, sans laisser bouger le bassin.', en: 'Forearms on a ball in a plank: draw small circles with your elbows without letting the pelvis move.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 cercles dans chaque sens avec un bassin immobile.', en: 'Maintenance level: 3 × 10 circles each way with a still pelvis.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '1-0-1', restSec: 75, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        requires: ['swiss-ball'],
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Sur un tapis, avant-bras au sol.', en: 'On a mat, forearms on the floor.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Avant-bras sur swiss ball', en: 'Forearms on a Swiss ball' },
        instructions: { fr: 'Avant-bras posés sur le ballon, pieds au sol : l’instabilité augmente le travail des abdominaux à intensité égale.', en: 'Forearms on the ball, feet on the floor: the instability increases abdominal work at the same intensity.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Pieds dans les sangles (TRX)', en: 'Feet in the straps (TRX)' },
        instructions: { fr: 'Pieds dans les sangles à 20–30 cm du sol, avant-bras ou mains au sol. Plus difficile : écartez et rapprochez une jambe sans bouger le bassin.', en: 'Feet in the straps 20–30 cm off the floor, forearms or hands on the floor. Harder: move one leg out and back without moving the pelvis.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Arrêtez la série dès que le bas du dos se creuse : la qualité de la position compte plus que la durée.', en: 'Stop the set as soon as your lower back starts to arch: position quality matters more than duration.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'ekstrom-2007',
          finding: {
            fr: 'Chez 30 sujets sains, la planche sur les coudes et les pieds a activé les muscles du tronc à moins de 45 % de leur maximum : elle convient plutôt au travail d’endurance et de stabilisation.',
            en: 'In 30 healthy subjects, the elbows-and-toes plank activated trunk muscles below 45% of maximum, making it better suited to endurance and stabilisation work.',
          },
        },
        {
          refId: 'mok-2015',
          finding: {
            fr: 'Parmi quatre exercices en suspension, la planche avec écarté de hanche a produit la plus forte activation de la plupart des abdominaux, plus élevée que sur support stable ou instable dans les études antérieures.',
            en: 'Among four suspension exercises, the plank with hip abduction produced the highest activation of most abdominal muscles, higher than previously reported on stable or unstable surfaces.',
          },
        },
        {
          refId: 'behm-2010',
          finding: {
            fr: 'Selon la Société canadienne de physiologie de l’exercice, une surface instable augmente l’activation du tronc à charge égale : utile en rééducation et en complément, mais pas comme mode principal de préparation athlétique.',
            en: 'According to the Canadian Society for Exercise Physiology, an unstable surface increases trunk activation at the same load: useful in rehabilitation and as a complement, but not as the main mode of athletic conditioning.',
          },
        },
        {
          refId: 'sato-2009',
          finding: {
            fr: 'Chez 20 coureurs ayant terminé l’étude, 6 semaines de renforcement du tronc ont amélioré le temps sur 5000 m, sans modifier les forces d’impact ni la stabilité de la jambe.',
            en: 'In 20 runners who completed the study, 6 weeks of core strength training improved 5000 m time without changing impact forces or lower-limb stability.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'side-plank',
    family: 'plank-side',
    name: { fr: 'Gainage latéral', en: 'Side plank' },
    sports: ['run', 'bike'],
    zones: ['trunk', 'hip-glutes'],
    half: 'trunk',
    muscles: {
      primary: ['external-oblique', 'quadratus-lumborum', 'glute-med'],
      secondary: ['internal-oblique', 'transversus-abdominis', 'glute-min', 'adductor-longus'],
    },
    zoom: 'trunk-back',
    qualities: ['isometric', 'endurance', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les obliques, le carré des lombes et le moyen fessier empêchent le bassin de tomber sur le côté à chaque appui de course. Sur le vélo, ils limitent le balancement du bassin sur la selle quand on appuie fort.',
      en: 'The obliques, quadratus lumborum and gluteus medius stop the pelvis dropping sideways at each running stride. On the bike, they limit pelvic rocking on the saddle when you push hard.',
    },
    how: {
      setup: {
        fr: 'Couché sur le côté, avant-bras au sol, coude sous l’épaule, jambes l’une sur l’autre (ou genoux fléchis).',
        en: 'Lying on your side, forearm on the floor, elbow under the shoulder, legs stacked (or knees bent).',
      },
      movement: {
        fr: 'Décollez le bassin pour aligner tête, bassin et pieds (ou genoux), puis tenez. Changez de côté.',
        en: 'Lift your hips to line up head, pelvis and feet (or knees), then hold. Switch sides.',
      },
      cues: [
        { fr: 'Poussez le bassin vers l’avant : il ne doit pas partir en arrière.', en: 'Push the hips forward: they should not drift back.' },
        { fr: 'Repoussez le sol avec l’avant-bras, épaule loin de l’oreille.', en: 'Push the floor away with your forearm, shoulder away from your ear.' },
        neutralSpine,
      ],
      breathing: noBreathHold,
    },
    mistakes: [
      { fr: 'Laisser le bassin s’affaisser vers le sol.', en: 'Letting the hips sink towards the floor.' },
      { fr: 'Tourner le buste vers le sol ou vers le plafond.', en: 'Rotating the chest towards the floor or ceiling.' },
      { fr: 'Ne travailler que le côté le plus facile.', en: 'Only training the easier side.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Sur les genoux', en: 'From the knees' },
        description: { fr: 'Genoux fléchis à 90°, appui sur l’avant-bras et le genou du dessous.', en: 'Knees bent at 90°, resting on the forearm and lower knee.' },
        mastery: { fr: '3 × 30 s de chaque côté, avec moins de 10 s d’écart entre les côtés.', en: '3 × 30 s per side, with less than 10 s difference between sides.' },
        dosage: { sets: 3, holdSec: 20, restSec: 30, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Jambes tendues', en: 'Straight legs' },
        description: { fr: 'Appui sur l’avant-bras et le bord externe du pied du dessous, pieds l’un sur l’autre ou l’un devant l’autre.', en: 'On the forearm and the outer edge of the lower foot, feet stacked or staggered.' },
        mastery: { fr: '3 × 45 s de chaque côté, alignement conservé jusqu’au bout.', en: '3 × 45 s per side, alignment kept to the end.' },
        dosage: { sets: 3, holdSec: 30, restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Avec jambe levée', en: 'With top leg raised' },
        description: { fr: 'En gainage latéral jambes tendues, levez la jambe du dessus d’environ 30 cm et tenez.', en: 'In a straight-leg side plank, raise the top leg about 30 cm and hold.' },
        mastery: { fr: '3 × 30 s de chaque côté sans que le bassin descende.', en: '3 × 30 s per side without the hips dropping.' },
        dosage: { sets: 3, holdSec: 25, restSec: 45, perSide: true, intensity: rpe('7'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Dynamique avec rotation', en: 'Dynamic with rotation' },
        description: { fr: 'En gainage latéral, passez le bras du dessus sous le buste puis ouvrez vers le plafond, lentement, sans laisser tomber le bassin.', en: 'In a side plank, thread the top arm under your chest then open towards the ceiling, slowly, without letting the hips drop.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 10 rotations contrôlées de chaque côté.', en: 'Maintenance level: 3 × 10 controlled rotations per side.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-2', restSec: 60, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Sur un tapis, avant-bras au sol.', en: 'On a mat, forearm on the floor.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 2,
        name: { fr: 'Pieds dans les sangles (TRX)', en: 'Feet in the straps (TRX)' },
        instructions: { fr: 'Pieds dans les sangles, l’un devant l’autre, avant-bras au sol : les sangles instables demandent plus de contrôle du bassin.', en: 'Feet in the straps, one in front of the other, forearm on the floor: the unstable straps demand more pelvic control.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Avant-bras sur swiss ball', en: 'Forearm on a Swiss ball' },
        instructions: { fr: 'Avant-bras posé sur le ballon, à genoux (niveau 1) ou jambes tendues : gardez le ballon immobile.', en: 'Forearm on the ball, from the knees (level 1) or with straight legs: keep the ball still.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'En cas de douleur d’épaule, restez sur les genoux ou réduisez la durée.', en: 'If your shoulder hurts, stay on your knees or shorten the hold.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'ekstrom-2007',
          finding: {
            fr: 'Le gainage latéral a activé le moyen fessier et l’oblique externe à un niveau compatible avec un travail de renforcement, chez 30 sujets sains.',
            en: 'The side bridge activated the gluteus medius and external oblique at a level compatible with strengthening, in 30 healthy subjects.',
          },
        },
        {
          refId: 'mcgill-1999',
          finding: {
            fr: 'Chez 75 jeunes adultes sains, les temps de maintien en gainage latéral étaient très reproductibles et fournissent des valeurs repères pour évaluer et entraîner l’endurance du tronc.',
            en: 'In 75 healthy young adults, side bridge holding times were highly reliable and provide reference values to assess and train trunk endurance.',
          },
        },
        {
          refId: 'abt-2007',
          finding: {
            fr: 'Chez 15 cyclistes de compétition, la fatigue des muscles du tronc a augmenté les mouvements du genou pendant le pédalage, sans changer les forces sur les pédales.',
            en: 'In 15 competitive cyclists, trunk muscle fatigue increased knee motion during pedalling without changing pedal forces.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'dead-bug',
    family: 'dead-bug',
    name: { fr: 'Dead bug', en: 'Dead bug' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['transversus-abdominis', 'rectus-abdominis', 'external-oblique', 'internal-oblique'],
      secondary: ['iliopsoas', 'rectus-femoris'],
    },
    zoom: 'trunk-front',
    qualities: ['control', 'endurance'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Le dead bug apprend à garder le bassin et le bas du dos stables pendant que bras et jambes bougent, comme lors de la foulée ou du pédalage. C’est un exercice doux, bien toléré quand le dos est sensible.',
      en: 'The dead bug teaches you to keep the pelvis and lower back steady while arms and legs move, as in running or pedalling. It is a gentle exercise, well tolerated when the back is sensitive.',
    },
    how: {
      setup: {
        fr: 'Sur le dos, hanches et genoux pliés à 90°, tibias parallèles au sol, bras tendus vers le plafond.',
        en: 'On your back, hips and knees bent at 90°, shins parallel to the floor, arms reaching to the ceiling.',
      },
      movement: {
        fr: 'Éloignez lentement un bras derrière la tête et la jambe opposée vers le sol, sans que le bas du dos décolle. Revenez, puis changez de côté.',
        en: 'Slowly lower one arm behind your head and the opposite leg towards the floor, without your lower back lifting. Return, then switch sides.',
      },
      cues: [
        { fr: 'Le bas du dos reste en contact léger avec le sol.', en: 'Your lower back stays lightly in contact with the floor.' },
        { fr: 'Bougez lentement : 2 à 3 secondes pour aller, autant pour revenir.', en: 'Move slowly: 2 to 3 seconds out, the same back.' },
        { fr: 'N’allez que jusqu’où le dos reste immobile.', en: 'Only go as far as your back stays still.' },
      ],
      breathing: { fr: 'Expirez en éloignant le bras et la jambe.', en: 'Breathe out as you extend the arm and leg.' },
    },
    mistakes: [
      { fr: 'Laisser le bas du dos se creuser en fin de mouvement.', en: 'Letting the lower back arch at the end of the movement.' },
      { fr: 'Aller vite en se servant de l’élan.', en: 'Moving fast and using momentum.' },
      { fr: 'Bloquer la respiration.', en: 'Holding your breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Jambes seules', en: 'Legs only' },
        description: { fr: 'Bras au sol. Descendez un pied, genou toujours plié, jusqu’à effleurer le sol avec le talon, puis l’autre.', en: 'Arms on the floor. Lower one foot, knee still bent, until the heel brushes the floor, then the other.' },
        mastery: { fr: '3 × 10 par côté, le bas du dos immobile.', en: '3 × 10 per side with the lower back still.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-2', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Bras et jambe opposés, genou plié', en: 'Opposite arm and leg, knee bent' },
        description: { fr: 'Bras et jambe opposés bougent ensemble, le genou reste plié.', en: 'Opposite arm and leg move together, the knee stays bent.' },
        mastery: { fr: '3 × 10 par côté, lent et sans compensation.', en: '3 × 10 per side, slow and without compensation.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-3', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Jambe tendue', en: 'Straight leg' },
        description: { fr: 'Même mouvement en tendant complètement la jambe, talon à quelques centimètres du sol.', en: 'Same movement with the leg fully straightened, heel a few centimetres off the floor.' },
        mastery: { fr: '3 × 10 par côté, jambe tendue, dos immobile.', en: '3 × 10 per side, leg straight, back still.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-3', restSec: 60, perSide: true, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Jambe tendue avec pause', en: 'Straight leg with a pause' },
        description: { fr: 'Jambe et bras tendus, tenez 3 secondes en position basse avant de revenir.', en: 'Arm and leg extended, hold 3 seconds in the low position before returning.' },
        mastery: { fr: '3 × 8 par côté avec la pause, sans que le dos décolle.', en: '3 × 8 per side with the pause, without the back lifting.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-3-2', restSec: 60, perSide: true, intensity: rpe('7'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Dead bug résisté', en: 'Resisted dead bug' },
        description: { fr: 'Même exercice avec une résistance : élastique tiré au-dessus de la tête ou petite charge tenue bras tendus.', en: 'Same exercise with resistance: band pulled overhead or a light weight held at arm’s length.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la résistance quand 3 × 10 par côté deviennent faciles.', en: 'Maintenance level: increase resistance when 3 × 10 per side becomes easy.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis, tête posée au sol.', en: 'On a mat, head resting on the floor.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Swiss ball entre mains et genoux', en: 'Swiss ball between hands and knees' },
        instructions: { fr: 'Coincez le ballon entre les mains et les genoux et poussez dessus ; le bras et la jambe libres s’éloignent pendant que l’autre côté maintient le ballon.', en: 'Hold the ball between your hands and knees and press into it; the free arm and leg extend while the other side keeps the ball in place.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique fixé derrière la tête', en: 'Band anchored behind the head' },
        instructions: { fr: 'Élastique fixé bas derrière la tête, tenu bras tendus au-dessus de la poitrine : gardez les bras immobiles pendant que les jambes bougent.', en: 'Band anchored low behind your head, held with straight arms above the chest: keep the arms still while the legs move.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell tenu', en: 'Dumbbell or kettlebell held' },
        instructions: { fr: 'Tenez une charge légère à deux mains au-dessus de la poitrine ; seules les jambes bougent.', en: 'Hold a light weight with both hands above the chest; only the legs move.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'kim-2016',
          finding: {
            fr: 'Chez 10 hommes sains, l’activité des muscles stabilisateurs du tronc augmentait avec le niveau de difficulté du dead bug et des autres exercices de stabilisation gradués en 5 niveaux.',
            en: 'In 10 healthy men, trunk stabiliser activity increased with the difficulty level of the dead bug and other stabilisation exercises graded in 5 levels.',
          },
        },
        {
          refId: 'smith-2014',
          finding: {
            fr: 'Dans la lombalgie, les exercices de stabilisation ont un léger bénéfice à long terme, mais ne font pas mieux que les autres formes d’exercice actif (29 études).',
            en: 'For low back pain, stabilisation exercises have a small long-term benefit but do no better than other forms of active exercise (29 studies).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'bird-dog',
    family: 'bird-dog',
    name: { fr: 'Bird dog (quadrupédie bras-jambe opposés)', en: 'Bird dog' },
    sports: ['run', 'bike'],
    zones: ['trunk', 'hip-glutes'],
    half: 'trunk',
    muscles: {
      primary: ['multifidus', 'erector-spinae'],
      secondary: ['glute-max', 'glute-med', 'external-oblique', 'trapezius-lower'],
    },
    zoom: 'trunk-back',
    qualities: ['control', 'endurance'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Les muscles profonds du dos et les fessiers stabilisent la colonne quand une jambe pousse et que le bras opposé avance, comme dans la course. Le bird dog les fait travailler avec une faible charge sur le dos.',
      en: 'The deep back muscles and glutes steady the spine when one leg pushes and the opposite arm swings forward, as in running. The bird dog trains them with little load on the back.',
    },
    how: {
      setup: {
        fr: 'À quatre pattes, mains sous les épaules, genoux sous les hanches, dos dans sa position naturelle.',
        en: 'On all fours, hands under the shoulders, knees under the hips, back in its natural position.',
      },
      movement: {
        fr: 'Tendez lentement un bras devant vous et la jambe opposée derrière, à l’horizontale. Tenez quelques secondes, revenez, puis changez de côté.',
        en: 'Slowly reach one arm forward and the opposite leg back, level with the floor. Hold a few seconds, return, then switch sides.',
      },
      cues: [
        { fr: 'Imaginez un verre d’eau posé sur le bas du dos : il ne doit pas se renverser.', en: 'Imagine a glass of water on your lower back: it must not spill.' },
        { fr: 'Poussez le talon vers l’arrière plutôt que de monter la jambe.', en: 'Push the heel back rather than lifting the leg high.' },
        { fr: 'Le bassin reste parallèle au sol.', en: 'The pelvis stays parallel to the floor.' },
      ],
      breathing: noBreathHold,
    },
    mistakes: [
      { fr: 'Monter la jambe trop haut et creuser le bas du dos.', en: 'Lifting the leg too high and arching the lower back.' },
      { fr: 'Laisser le bassin tourner du côté de la jambe levée.', en: 'Letting the pelvis rotate towards the lifted leg.' },
      { fr: 'Enchaîner trop vite, sans temps de maintien.', en: 'Rushing through without a hold.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Jambe seule', en: 'Leg only' },
        description: { fr: 'Mains au sol, glissez une jambe vers l’arrière puis levez-la à l’horizontale, tenez 5 secondes.', en: 'Hands on the floor, slide one leg back then lift it level, hold 5 seconds.' },
        mastery: { fr: '3 × 8 par côté avec 5 s de maintien, bassin stable.', en: '3 × 8 per side with a 5 s hold, pelvis steady.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-5', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Bras et jambe opposés', en: 'Opposite arm and leg' },
        description: { fr: 'Bras et jambe opposés tendus ensemble, maintien de 8 à 10 secondes.', en: 'Opposite arm and leg extended together, 8 to 10 second hold.' },
        mastery: { fr: '3 × 8 par côté avec 8 s de maintien, sans bascule du bassin.', en: '3 × 8 per side with an 8 s hold, without pelvic tilt.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-8', restSec: 45, perSide: true, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Avec carrés', en: 'With squares' },
        description: { fr: 'En position tendue, dessinez de petits carrés avec la main et le pied, sans que le dos bouge.', en: 'In the extended position, draw small squares with the hand and foot without the back moving.' },
        mastery: { fr: '3 × 6 carrés par côté avec un tronc immobile.', en: '3 × 6 squares per side with a still trunk.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '1-0-1', restSec: 45, perSide: true, intensity: rpe('6'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Genoux décollés', en: 'Knees hovering' },
        description: { fr: 'Genoux décollés de 2 cm du sol (appui mains et pointes de pieds), puis levez bras et jambe opposés.', en: 'Knees hovering 2 cm off the floor (on hands and toes), then lift the opposite arm and leg.' },
        mastery: { fr: '3 × 6 par côté avec 5 s de maintien, genoux qui ne touchent pas le sol.', en: '3 × 6 per side with a 5 s hold, knees never touching the floor.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '2-0-2-5', restSec: 60, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Bird dog résisté', en: 'Resisted bird dog' },
        description: { fr: 'Version bras-jambe opposés avec un élastique ou une petite charge à la main et à la cheville.', en: 'Opposite arm-and-leg version with a band or a light weight at the hand and ankle.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la résistance quand 3 × 8 par côté deviennent faciles.', en: 'Maintenance level: increase resistance when 3 × 8 per side becomes easy.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-5', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis, genoux protégés par un coussin si besoin.', en: 'On a mat, knees cushioned if needed.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique main-pied', en: 'Band from hand to foot' },
        instructions: { fr: 'Élastique passé sous la main d’appui et autour du pied qui se tend : il résiste à l’extension de la hanche.', en: 'Band under the supporting hand and around the extending foot: it resists hip extension.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Petite charge', en: 'Light weight' },
        instructions: { fr: 'Petit haltère dans la main qui avance (et lest de cheville si vous en avez).', en: 'Light dumbbell in the reaching hand (and an ankle weight if you have one).' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Ventre sur swiss ball', en: 'Prone over a Swiss ball' },
        instructions: { fr: 'Ventre posé sur le ballon, mains et pointes de pieds au sol : levez bras et jambe opposés en gardant le ballon immobile.', en: 'Belly on the ball, hands and toes on the floor: lift the opposite arm and leg while keeping the ball still.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'callaghan-1998',
          finding: {
            fr: 'Chez 13 hommes, tendre une jambe à quatre pattes chargeait peu la colonne lombaire et convenait pour débuter ; ajouter le bras opposé augmentait le travail des extenseurs.',
            en: 'In 13 men, extending one leg on all fours placed little load on the lumbar spine and suited initial training; adding the opposite arm increased extensor demand.',
          },
        },
        {
          refId: 'kim-2016',
          finding: {
            fr: 'L’activité du multifide et des érecteurs du rachis augmentait avec le niveau de difficulté du bird dog.',
            en: 'Multifidus and erector spinae activity increased with bird dog difficulty level.',
          },
        },
        {
          refId: 'ekstrom-2007',
          finding: {
            fr: 'Le bird dog (bras et jambe opposés levés) pourrait aider à renforcer le grand fessier chez des sujets sains.',
            en: 'The quadruped opposite arm and leg lift may help strengthen the gluteus maximus in healthy subjects.',
          },
        },
        {
          refId: 'saragiotto-2016',
          finding: {
            fr: 'Les exercices de contrôle moteur réduisent la douleur lombaire chronique par rapport à une intervention minimale, sans être supérieurs aux autres exercices (29 essais).',
            en: 'Motor control exercises reduce chronic low back pain compared with minimal intervention, without being superior to other exercises (29 trials).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'pallof-press',
    family: 'anti-rotation',
    name: { fr: 'Pallof press (anti-rotation)', en: 'Pallof press (anti-rotation)' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['external-oblique', 'internal-oblique', 'transversus-abdominis'],
      secondary: ['rectus-abdominis', 'glute-med', 'quadratus-lumborum', 'serratus-anterior'],
    },
    zoom: 'trunk-front',
    qualities: ['isometric', 'control', 'strength'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'En course, le balancement des bras et des jambes fait tourner le tronc à chaque foulée ; en danseuse ou au sprint, le guidon tire d’un côté puis de l’autre. Les obliques freinent ces rotations pour garder le bassin stable.',
      en: 'In running, arm and leg swing twists the trunk at every stride; out of the saddle or sprinting, the bars pull one way then the other. The obliques brake these rotations to keep the pelvis steady.',
    },
    how: {
      setup: {
        fr: 'De profil par rapport au point d’ancrage (élastique, poulie ou sangles) à hauteur de poitrine, mains jointes contre le sternum, pieds largeur de hanches.',
        en: 'Side-on to the anchor (band, cable or straps) at chest height, hands together against the breastbone, feet hip-width apart.',
      },
      movement: {
        fr: 'Poussez les mains droit devant vous jusqu’à tendre les bras sans laisser le tronc tourner vers l’ancrage, tenez 2 secondes, puis ramenez. Changez de côté.',
        en: 'Press your hands straight out until the arms are straight, without letting the trunk rotate towards the anchor, hold 2 seconds, then bring them back. Switch sides.',
      },
      cues: [
        { fr: 'Les mains restent dans l’axe du sternum.', en: 'Hands stay in line with your breastbone.' },
        { fr: 'Le bassin et les épaules restent face à l’avant.', en: 'Hips and shoulders keep facing forward.' },
        { fr: 'Genoux légèrement fléchis, fessiers serrés.', en: 'Knees slightly bent, glutes engaged.' },
      ],
      breathing: { fr: 'Expirez en poussant les mains.', en: 'Breathe out as you press.' },
    },
    mistakes: [
      { fr: 'Laisser les bras partir vers l’ancrage.', en: 'Letting the arms drift towards the anchor.' },
      { fr: 'Pencher le buste pour compenser la traction.', en: 'Leaning the torso to counter the pull.' },
      { fr: 'Choisir une résistance si forte que le bassin tourne.', en: 'Using so much resistance that the pelvis rotates.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Maintien bras tendus', en: 'Straight-arm hold' },
        description: { fr: 'Debout, bras tendus devant la poitrine, tenez la position contre la traction.', en: 'Standing, arms straight in front of the chest, hold against the pull.' },
        mastery: { fr: '3 × 30 s de chaque côté sans rotation du tronc.', en: '3 × 30 s per side without trunk rotation.' },
        dosage: { sets: 3, holdSec: 20, restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Pallof press debout', en: 'Standing Pallof press' },
        description: { fr: 'Debout, poussez et ramenez les mains lentement, 2 s de maintien bras tendus.', en: 'Standing, press out and back slowly, 2 s hold with arms straight.' },
        mastery: { fr: '3 × 12 de chaque côté avec un bassin immobile.', en: '3 × 12 per side with a still pelvis.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-2-2', restSec: 45, perSide: true, intensity: rir('3'), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Demi-agenouillé', en: 'Half-kneeling' },
        description: { fr: 'Un genou au sol, l’autre pied devant (genou côté ancrage au sol) : la base étroite demande plus de contrôle.', en: 'One knee down, other foot forward (knee nearest the anchor down): the narrow base demands more control.' },
        mastery: { fr: '3 × 10 de chaque côté sans perte d’équilibre.', en: '3 × 10 per side without losing balance.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-2-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Pallof press avec élévation', en: 'Pallof press with overhead raise' },
        description: { fr: 'Debout, poussez les mains devant, puis montez-les au-dessus de la tête sans creuser le dos, redescendez et ramenez.', en: 'Standing, press the hands out, then raise them overhead without arching the back, lower and bring them back.' },
        mastery: { fr: '3 × 8 de chaque côté, côtes basses et bassin fixe.', en: '3 × 8 per side, ribs down and pelvis fixed.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Pallof en pas chassés', en: 'Pallof walkout' },
        description: { fr: 'Bras tendus devant, faites 3 à 4 pas chassés pour vous éloigner de l’ancrage puis revenez, sans laisser les mains bouger.', en: 'Arms straight out, take 3 to 4 side steps away from the anchor and back, without letting the hands move.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la résistance quand 3 × 4 allers-retours deviennent faciles.', en: 'Maintenance level: increase resistance when 3 × 4 round trips become easy.' },
        dosage: { sets: 3, reps: [3, 4], restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique fixé à un poteau ou une porte à hauteur de poitrine ; éloignez-vous pour augmenter la tension.', en: 'Band anchored to a post or door at chest height; step away to increase tension.' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Poulie', en: 'Cable machine' },
        instructions: { fr: 'Poulie réglée à hauteur de poitrine, poignée unique tenue à deux mains.', en: 'Cable set at chest height, single handle held with both hands.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: true, rank: 2,
        name: { fr: 'Sangles de suspension (TRX)', en: 'Suspension straps (TRX)' },
        instructions: { fr: 'Les deux poignées réunies dans les mains, de profil par rapport à l’ancrage, corps incliné : plus vous êtes incliné, plus c’est difficile.', en: 'Both handles held together, side-on to the anchor, body leaning: the more you lean, the harder it gets.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Vérifiez la solidité du point d’ancrage avant de tirer dessus.', en: 'Check the anchor point is secure before pulling on it.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'george-2021',
          finding: {
            fr: 'La recommandation JOSPT 2021 préconise le renforcement et l’endurance des muscles du tronc dans la lombalgie chronique (grade A), sans privilégier un exercice précis.',
            en: 'The 2021 JOSPT guideline recommends trunk muscle strengthening and endurance training for chronic low back pain (grade A), without favouring a specific exercise.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'back-extension',
    family: 'back-extension',
    name: { fr: 'Extension du dos (lombaires)', en: 'Back extension' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['erector-spinae', 'multifidus'],
      secondary: ['glute-max', 'biceps-femoris', 'semitendinosus', 'quadratus-lumborum'],
    },
    zoom: 'trunk-back',
    qualities: ['endurance', 'strength', 'isometric'],
    objectives: ['prevention', 'return', 'pain'],
    preventionFor: ['bike', 'run'],
    why: {
      fr: 'Les extenseurs du dos maintiennent le buste penché pendant des heures sur le vélo et redressent le tronc en fin de course quand on fatigue. Leur endurance aide à garder une position stable sans s’affaisser.',
      en: 'The back extensors hold the torso leaning forward for hours on the bike and keep you upright late in a run as fatigue sets in. Their endurance helps keep a stable position without slumping.',
    },
    how: {
      setup: {
        fr: 'À plat ventre au sol, sur un ballon ou sur un banc à lombaires, pieds calés, mains aux tempes ou croisées sur la poitrine.',
        en: 'Face down on the floor, a ball or a back-extension bench, feet anchored, hands at your temples or crossed on your chest.',
      },
      movement: {
        fr: 'Redressez le buste lentement jusqu’à aligner épaules, hanches et genoux, sans aller au-delà. Marquez une pause, puis redescendez en contrôlant.',
        en: 'Slowly raise your torso until shoulders, hips and knees line up, no further. Pause, then lower with control.',
      },
      cues: [
        { fr: 'Montez jusqu’à l’alignement, pas plus haut : inutile de cambrer.', en: 'Rise to a straight line, no higher: no need to arch.' },
        { fr: 'Serrez les fessiers en montant.', en: 'Squeeze your glutes as you rise.' },
        { fr: 'Regardez le sol pour garder la nuque dans l’axe.', en: 'Look at the floor to keep your neck in line.' },
      ],
      breathing: { fr: 'Expirez en montant, inspirez en descendant.', en: 'Breathe out on the way up, in on the way down.' },
    },
    mistakes: [
      { fr: 'Cambrer fortement en fin de mouvement.', en: 'Arching hard at the top of the movement.' },
      { fr: 'Utiliser l’élan pour remonter.', en: 'Using momentum to come up.' },
      { fr: 'Ajouter de la charge avant de tenir l’endurance au poids du corps.', en: 'Adding load before mastering bodyweight endurance.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Petite amplitude au sol', en: 'Small range on the floor' },
        description: { fr: 'À plat ventre, mains sous le front, décollez la poitrine de quelques centimètres et redescendez.', en: 'Face down, hands under your forehead, lift your chest a few centimetres and lower.' },
        mastery: { fr: '3 × 12 lentes sans gêne le lendemain.', en: '3 × 12 slow reps without discomfort the next day.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-1-2', restSec: 45, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Extension complète', en: 'Full extension' },
        description: { fr: 'Sur ballon ou banc (ou au sol, mains aux tempes), redressez-vous jusqu’à l’alignement avec 2 s de pause.', en: 'On a ball or bench (or on the floor, hands at temples), rise to a straight line with a 2 s pause.' },
        mastery: { fr: '3 × 15 avec la pause, sans compensation.', en: '3 × 15 with the pause, without compensation.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-2-2', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Maintien horizontal', en: 'Horizontal hold' },
        description: { fr: 'Tenez le buste aligné avec les jambes (sur banc ou ballon), ou poitrine et bras décollés au sol.', en: 'Hold the torso in line with the legs (on a bench or ball), or chest and arms lifted on the floor.' },
        mastery: { fr: '3 × 60 s en gardant l’alignement.', en: '3 × 60 s keeping the alignment.' },
        dosage: { sets: 3, holdSec: 45, restSec: 60, perSide: false, intensity: rpe('7'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Extension lestée', en: 'Weighted extension' },
        description: { fr: 'Extension complète avec un disque ou un haltère contre la poitrine.', en: 'Full extension holding a plate or dumbbell against the chest.' },
        mastery: { fr: '3 × 12 avec environ 10 % du poids du corps.', en: '3 × 12 with about 10% of body weight.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '2-0-2-1', restSec: 90, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Charge lourde et lente', en: 'Heavy and slow' },
        description: { fr: 'Banc à lombaires lesté ou machine d’extension lombaire, mouvement lent jusqu’à proche de l’échec.', en: 'Weighted back-extension bench or lumbar extension machine, slow movement taken close to failure.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 3 × 10 deviennent faciles.', en: 'Maintenance level: increase the load when 3 × 10 becomes easy.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2-1', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'À plat ventre sur un tapis, pieds calés sous un meuble si besoin.', en: 'Face down on a mat, feet tucked under furniture if needed.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Sur swiss ball', en: 'On a Swiss ball' },
        instructions: { fr: 'Bassin et ventre sur le ballon, pieds écartés calés contre un mur ; l’amplitude est plus grande qu’au sol.', en: 'Hips and belly on the ball, feet apart braced against a wall; the range is greater than on the floor.' },
      },
      {
        id: 'swiss-ball-weighted', equipment: ['swiss-ball', 'dumbbells'], loadable: true, rank: 3,
        name: { fr: 'Swiss ball et haltère', en: 'Swiss ball with a dumbbell' },
        instructions: { fr: 'Sur le ballon, haltère tenu contre la poitrine.', en: 'On the ball, dumbbell held against the chest.' },
      },
      {
        id: 'bench', equipment: ['gym'], loadable: true, rank: 4,
        name: { fr: 'Banc à lombaires ou machine', en: 'Back-extension bench or machine' },
        instructions: { fr: 'Banc à 45° ou horizontal, bord du coussin juste sous les hanches ; ajoutez un disque contre la poitrine pour charger. Machine d’extension lombaire possible.', en: '45° or horizontal bench, pad edge just below the hips; add a plate against the chest to load. A lumbar extension machine is also an option.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Si l’extension réveille une douleur qui descend dans la jambe, arrêtez et demandez un avis.', en: 'If extension brings on pain travelling down the leg, stop and seek advice.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'callaghan-1998',
          finding: {
            fr: 'Les exercices d’extension active du tronc produisaient les charges sur la colonne et l’activité des extenseurs les plus élevées : ils viennent après les exercices plus doux.',
            en: 'Active trunk extension exercises produced the highest spinal loads and extensor activity: they come after gentler exercises.',
          },
        },
        {
          refId: 'streisfeld-2017',
          finding: {
            fr: 'Les cyclistes souffrant de lombalgie présentaient un déficit d’endurance des extenseurs du dos et davantage de flexion lombaire en roulant (8 études).',
            en: 'Cyclists with low back pain showed back extensor endurance deficits and more lumbar flexion while riding (8 studies).',
          },
        },
        {
          refId: 'steele-2015',
          finding: {
            fr: 'Le renforcement isolé des extenseurs lombaires sur machine améliore la douleur et l’incapacité dans la lombalgie chronique, sans preuve claire de supériorité sur d’autres exercices.',
            en: 'Isolated lumbar extension training on a machine improves pain and disability in chronic low back pain, without clear evidence of superiority over other exercises.',
          },
        },
        {
          refId: 'mcgill-1999',
          finding: {
            fr: 'Le maintien en extension du tronc fait partie des quatre tests d’endurance fiables proposés comme repères d’évaluation et d’entraînement.',
            en: 'The trunk extension hold is one of four reliable endurance tests proposed as benchmarks for assessment and training.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'suitcase-carry',
    family: 'loaded-carry',
    name: { fr: 'Marche avec charge d’un côté (suitcase carry)', en: 'Suitcase carry' },
    sports: ['run', 'bike'],
    zones: ['trunk', 'hip-glutes'],
    half: 'trunk',
    muscles: {
      primary: ['quadratus-lumborum', 'external-oblique', 'glute-med'],
      secondary: ['internal-oblique', 'erector-spinae', 'glute-min', 'forearm-flexors', 'trapezius-upper'],
    },
    zoom: 'trunk-back',
    qualities: ['strength', 'endurance', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Porter une charge d’un seul côté oblige le tronc à résister à l’inclinaison latérale en marchant, comme en appui unipodal pendant la course. C’est un renforcement global, simple et très proche des gestes du quotidien.',
      en: 'Carrying a load on one side forces the trunk to resist side-bending while walking, as in single-leg stance when running. It is simple, whole-body strengthening, very close to everyday tasks.',
    },
    how: {
      setup: {
        fr: 'Debout, une charge dans une main, bras le long du corps, épaules de niveau.',
        en: 'Standing, a weight in one hand, arm by your side, shoulders level.',
      },
      movement: {
        fr: 'Marchez à pas normaux pendant la durée indiquée en restant parfaitement droit, posez la charge, changez de main et repartez.',
        en: 'Walk at a normal pace for the set time while staying perfectly upright, put the weight down, switch hands and go again.',
      },
      cues: [
        { fr: 'Restez droit comme si un fil vous tirait vers le haut.', en: 'Stand tall as if a string were pulling you up.' },
        { fr: 'Ne penchez ni vers la charge, ni à l’opposé.', en: 'Do not lean towards the weight or away from it.' },
        { fr: 'Pas courts et contrôlés, bassin de niveau.', en: 'Short, controlled steps, pelvis level.' },
      ],
      breathing: noBreathHold,
    },
    mistakes: [
      { fr: 'Se pencher du côté de la charge.', en: 'Leaning towards the weight.' },
      { fr: 'Hausser l’épaule qui porte.', en: 'Shrugging the carrying shoulder.' },
      { fr: 'Choisir une charge si lourde que la posture se dégrade.', en: 'Choosing a weight so heavy that posture breaks down.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Charge légère', en: 'Light load' },
        description: { fr: 'Charge d’environ 10 % du poids du corps, marche sur terrain plat.', en: 'Load of about 10% of body weight, walking on flat ground.' },
        mastery: { fr: '3 × 30 s par côté en restant parfaitement droit.', en: '3 × 30 s per side staying perfectly upright.' },
        dosage: { sets: 3, holdSec: 30, restSec: 45, perSide: true, intensity: load('Environ 10 % du poids du corps', 'About 10% of body weight'), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Charge modérée', en: 'Moderate load' },
        description: { fr: 'Charge d’environ 20 à 25 % du poids du corps.', en: 'Load of about 20 to 25% of body weight.' },
        mastery: { fr: '3 × 40 s par côté sans inclinaison.', en: '3 × 40 s per side without leaning.' },
        dosage: { sets: 3, holdSec: 40, restSec: 60, perSide: true, intensity: load('Environ 20 à 25 % du poids du corps', 'About 20 to 25% of body weight'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Charge lourde', en: 'Heavy load' },
        description: { fr: 'Charge d’environ un tiers du poids du corps.', en: 'Load of about one third of body weight.' },
        mastery: { fr: '3 × 30 s par côté, posture intacte.', en: '3 × 30 s per side, posture intact.' },
        dosage: { sets: 3, holdSec: 30, restSec: 90, perSide: true, intensity: load('Environ un tiers du poids du corps', 'About one third of body weight'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Lourde avec arrêts sur une jambe', en: 'Heavy with single-leg pauses' },
        description: { fr: 'Marche lente avec la charge lourde ; tous les 3 pas, arrêtez-vous 2 secondes sur une jambe, genou opposé levé.', en: 'Slow walk with a heavy load; every 3 steps, pause 2 seconds on one leg with the other knee raised.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 3 × 30 s par côté restent parfaitement droits.', en: 'Maintenance level: increase the load when 3 × 30 s per side stays perfectly upright.' },
        dosage: { sets: 3, holdSec: 30, restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bag', equipment: [], loadable: true, rank: 1,
        name: { fr: 'Sac ou cabas rempli', en: 'Filled bag' },
        instructions: { fr: 'Sac à anses rempli de bouteilles d’eau ou de livres : ajoutez des bouteilles pour progresser.', en: 'Bag with handles filled with water bottles or books: add bottles to progress.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell', en: 'Dumbbell or kettlebell' },
        instructions: { fr: 'Haltère ou kettlebell tenu poignée parallèle au corps.', en: 'Dumbbell or kettlebell held with the handle parallel to the body.' },
      },
      {
        id: 'gym', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Trap bar ou poignée de farmer', en: 'Trap bar or farmer’s handle' },
        instructions: { fr: 'Poignée de farmer ou gros haltère de salle, d’un seul côté.', en: 'Farmer’s handle or heavy gym dumbbell, on one side only.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Ramassez et reposez la charge en pliant les hanches et les genoux, dos droit.', en: 'Pick up and put down the weight by bending hips and knees, back straight.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'mcgill-2009',
          finding: {
            fr: 'Dans cette analyse de plusieurs épreuves de strongman, dont la marche avec charge d’un côté, les portés sollicitaient le tronc différemment des soulevés, ce qui suggère de les ajouter aux programmes de force.',
            en: 'In this analysis of several strongman events, including the suitcase carry, carries challenged the trunk differently from lifts, suggesting they should be added to strength programmes.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'mcgill-curl-up',
    family: 'curl-up',
    name: { fr: 'Curl-up de McGill', en: 'McGill curl-up' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['rectus-abdominis', 'external-oblique', 'internal-oblique'],
      secondary: ['transversus-abdominis'],
    },
    zoom: 'trunk-front',
    qualities: ['isometric', 'endurance', 'control'],
    objectives: ['prevention', 'return', 'pain'],
    why: {
      fr: 'Le curl-up fait travailler les abdominaux en ne décollant que la tête et les épaules, avec peu de mouvement du bas du dos. C’est une façon douce de les renforcer quand le dos est sensible.',
      en: 'The curl-up trains the abdominals by lifting only the head and shoulders, with little lower-back movement. It is a gentle way to strengthen them when the back is sensitive.',
    },
    how: {
      setup: {
        fr: 'Sur le dos, une jambe tendue, l’autre genou plié pied au sol, mains à plat sous le creux des reins pour garder sa courbure.',
        en: 'On your back, one leg straight, the other knee bent with the foot flat, hands flat under the small of your back to keep its curve.',
      },
      movement: {
        fr: 'Décollez la tête et le haut des épaules de quelques centimètres, d’un bloc, sans plier la nuque. Tenez 8 à 10 secondes, reposez. Changez de jambe pliée à mi-série.',
        en: 'Lift your head and upper shoulders a few centimetres as one unit, without bending your neck. Hold 8 to 10 seconds, lower. Switch the bent leg halfway through the set.',
      },
      cues: [
        { fr: 'Tête et nuque restent dans l’axe, comme posées sur un plateau.', en: 'Head and neck stay in line, as if resting on a tray.' },
        { fr: 'Le bas du dos garde sa courbure sur vos mains.', en: 'Your lower back keeps its curve over your hands.' },
        { fr: 'Le mouvement est minuscule : c’est la tension qui compte.', en: 'The movement is tiny: tension is what counts.' },
      ],
      breathing: { fr: 'Respirez calmement pendant le maintien.', en: 'Breathe calmly during the hold.' },
    },
    mistakes: [
      { fr: 'Rentrer le menton et tirer sur la nuque.', en: 'Tucking the chin and straining the neck.' },
      { fr: 'Monter trop haut, comme un crunch classique.', en: 'Coming up too high, like a regular crunch.' },
      { fr: 'Plaquer le bas du dos au sol.', en: 'Flattening the lower back into the floor.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Coudes au sol', en: 'Elbows down' },
        description: { fr: 'Coudes posés au sol, maintien de 8 secondes.', en: 'Elbows resting on the floor, 8 second hold.' },
        mastery: { fr: '3 × 6 maintiens de 8 s sans gêne de la nuque.', en: '3 × 6 holds of 8 s without neck discomfort.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '1-0-1-8', restSec: 30, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Coudes décollés', en: 'Elbows lifted' },
        description: { fr: 'Coudes décollés du sol pendant le maintien : le levier augmente.', en: 'Elbows lifted off the floor during the hold: the lever increases.' },
        mastery: { fr: '3 × 6 maintiens de 10 s, nuque détendue.', en: '3 × 6 holds of 10 s, neck relaxed.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '1-0-1-9', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Avec respirations profondes', en: 'With deep breaths' },
        description: { fr: 'Coudes décollés, prenez 2 respirations profondes pendant le maintien sans relâcher la tension.', en: 'Elbows lifted, take 2 deep breaths during the hold without releasing tension.' },
        mastery: { fr: '3 × 6 maintiens avec 2 respirations complètes chacun.', en: '3 × 6 holds with 2 full breaths each.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '1-0-1-9', restSec: 45, perSide: false, intensity: rpe('6-7'), frequency: freq.threePerWeek },
      },
      {
        level: 4,
        name: { fr: 'Lesté', en: 'Weighted' },
        description: { fr: 'Petit disque ou haltère posé sur la poitrine, maintien de 10 secondes.', en: 'Small plate or dumbbell resting on the chest, 10 second hold.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 3 × 6 maintiens deviennent faciles.', en: 'Maintenance level: increase the load when 3 × 6 holds become easy.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '1-0-1-9', restSec: 45, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un tapis, mains sous le creux des reins.', en: 'On a mat, hands under the small of your back.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Charge sur la poitrine', en: 'Weight on the chest' },
        instructions: { fr: 'Haltère léger ou disque tenu à plat sur le sternum.', en: 'Light dumbbell or plate held flat on the breastbone.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'axler-1997',
          finding: {
            fr: 'Sur 12 exercices abdominaux étudiés chez 9 volontaires, les curl-ups partiels offraient en général le meilleur rapport entre travail des abdominaux et compression de la colonne.',
            en: 'Among 12 abdominal exercises tested in 9 volunteers, partial curl-ups generally gave the best ratio of abdominal challenge to spinal compression.',
          },
        },
        {
          refId: 'kim-2016',
          finding: {
            fr: 'L’activité du grand droit et de l’oblique externe augmentait avec le niveau de difficulté du curl-up.',
            en: 'Rectus abdominis and external oblique activity increased with curl-up difficulty level.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'rollout',
    family: 'rollout',
    name: { fr: 'Rollout (roulé vers l’avant)', en: 'Rollout' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['rectus-abdominis', 'external-oblique', 'internal-oblique'],
      secondary: ['transversus-abdominis', 'latissimus-dorsi', 'serratus-anterior', 'triceps-brachii'],
    },
    zoom: 'trunk-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Le rollout demande aux abdominaux de freiner l’extension du dos quand les bras s’éloignent : c’est un gainage dynamique exigeant. Il prépare le tronc aux efforts intenses, sprints et relances.',
      en: 'The rollout makes the abdominals brake back extension as the arms reach away: it is a demanding dynamic plank. It prepares the trunk for hard efforts, sprints and surges.',
    },
    how: {
      setup: {
        fr: 'À genoux, mains ou avant-bras sur l’outil (serviette, ballon, roue ou sangles), bras sous les épaules, dos neutre.',
        en: 'Kneeling, hands or forearms on the tool (towel, ball, wheel or straps), arms under the shoulders, back neutral.',
      },
      movement: {
        fr: 'Avancez lentement les bras en laissant les hanches suivre, jusqu’où vous pouvez garder le dos neutre, puis revenez en contractant les abdominaux.',
        en: 'Slowly reach your arms forward, letting the hips follow, as far as you can keep your back neutral, then come back by contracting your abs.',
      },
      cues: [
        { fr: 'Côtes basses et fessiers serrés pendant tout le mouvement.', en: 'Ribs down and glutes squeezed throughout.' },
        { fr: 'Arrêtez-vous avant que le bas du dos ne se creuse.', en: 'Stop before your lower back starts to arch.' },
        { fr: 'Revenez en tirant avec les bras tendus, pas en reculant les fesses.', en: 'Return by pulling with straight arms, not by pushing the hips back.' },
      ],
      breathing: { fr: 'Inspirez en avançant, expirez en revenant.', en: 'Breathe in as you reach out, out as you come back.' },
    },
    mistakes: [
      { fr: 'Aller trop loin et laisser le dos se creuser.', en: 'Going too far and letting the back arch.' },
      { fr: 'Plier les hanches pour revenir au lieu d’utiliser les abdominaux.', en: 'Bending at the hips to return instead of using the abs.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'À genoux, petite amplitude', en: 'Kneeling, short range' },
        description: { fr: 'À genoux, avancez les bras d’environ 20 à 30 cm puis revenez.', en: 'Kneeling, reach your arms out about 20 to 30 cm and come back.' },
        mastery: { fr: '3 × 10 avec un dos immobile.', en: '3 × 10 with a still back.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-1-2', restSec: 60, perSide: false, intensity: rpe('6'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'À genoux, grande amplitude', en: 'Kneeling, full range' },
        description: { fr: 'À genoux, avancez jusqu’à ce que le corps soit presque aligné, puis revenez.', en: 'Kneeling, reach until the body is almost in a straight line, then come back.' },
        mastery: { fr: '3 × 10 en pleine amplitude sans creuser.', en: '3 × 10 through full range without arching.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-1-2', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Depuis la planche', en: 'From a plank' },
        description: { fr: 'En planche sur les pieds, faites glisser les bras vers l’avant et revenez (body saw).', en: 'In a plank on your toes, slide the arms forward and back (body saw).' },
        mastery: { fr: '3 × 8 contrôlées, bassin stable.', en: '3 × 8 controlled reps, pelvis stable.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '3-1-2', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Debout ou grand levier', en: 'Standing or long lever' },
        description: { fr: 'Rollout depuis la position debout (roue) ou corps très incliné (sangles), amplitude partielle puis complète.', en: 'Rollout from standing (wheel) or with a steep body lean (straps), partial then full range.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 6 sans perte de contrôle.', en: 'Maintenance level: 3 × 6 without losing control.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '3-1-2', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'towel', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Serviette sur sol lisse', en: 'Towel on a smooth floor' },
        instructions: { fr: 'Mains sur une serviette ou des patins glissants, sur parquet ou carrelage. Au niveau 4, allongez simplement l’amplitude.', en: 'Hands on a towel or sliders on a wooden or tiled floor. At level 4, simply lengthen the range.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Swiss ball', en: 'Swiss ball' },
        instructions: { fr: 'Avant-bras sur le ballon, faites-le rouler vers l’avant. Au niveau 3, sur les pieds ; au niveau 4, petit ballon et grande amplitude.', en: 'Forearms on the ball, roll it forward. At level 3, on your toes; at level 4, smaller ball and longer range.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 3,
        name: { fr: 'Sangles de suspension (fallout)', en: 'Suspension straps (fallout)' },
        instructions: { fr: 'Debout ou à genoux face à l’ancrage, mains dans les poignées : laissez les bras monter devant vous en penchant le corps. Plus vous êtes incliné, plus c’est dur.', en: 'Standing or kneeling facing the anchor, hands in the handles: let the arms rise in front as you lean. The steeper the lean, the harder it is.' },
      },
      {
        id: 'ab-wheel', equipment: ['gym'], loadable: false, rank: 3,
        name: { fr: 'Roue abdominale', en: 'Ab wheel' },
        instructions: { fr: 'Roue tenue à deux mains, depuis les genoux puis depuis les pieds.', en: 'Wheel held with both hands, from the knees then from the feet.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Exercice exigeant : à réserver aux périodes où les gainages ventral et latéral sont bien tolérés.', en: 'Demanding exercise: keep it for when front and side planks are well tolerated.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'escamilla-2006',
          finding: {
            fr: 'Chez 21 adultes sains, le rollout à la roue faisait partie des exercices qui activaient le plus le grand droit, les obliques et le grand dorsal.',
            en: 'In 21 healthy adults, the ab-wheel rollout was among the exercises with the highest rectus abdominis, oblique and latissimus dorsi activity.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'reverse-crunch',
    family: 'reverse-crunch',
    name: { fr: 'Relevé de bassin contrôlé (crunch inversé)', en: 'Controlled reverse crunch' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['rectus-abdominis', 'external-oblique'],
      secondary: ['internal-oblique', 'transversus-abdominis', 'iliopsoas'],
    },
    zoom: 'trunk-front',
    qualities: ['strength', 'control'],
    objectives: ['prevention'],
    preventionFor: ['run', 'bike'],
    why: {
      fr: 'Enrouler le bassin vers les côtes fait travailler le bas des abdominaux et apprend à contrôler la bascule du bassin. Ce contrôle sert à garder un bassin stable en course et une position sans cambrure sur le vélo.',
      en: 'Curling the pelvis towards the ribs works the lower abdominals and teaches control of pelvic tilt. This control helps keep a steady pelvis when running and a position without excessive arching on the bike.',
    },
    how: {
      setup: {
        fr: 'Sur le dos, bras le long du corps ou mains tenant un support derrière la tête, hanches et genoux pliés.',
        en: 'On your back, arms by your sides or hands holding a support behind your head, hips and knees bent.',
      },
      movement: {
        fr: 'Enroulez lentement le bassin pour décoller le bas des fesses du sol, en rapprochant les genoux de la poitrine, puis redéroulez vertèbre par vertèbre.',
        en: 'Slowly curl the pelvis to lift the bottom of your buttocks off the floor, bringing the knees towards the chest, then roll down one vertebra at a time.',
      },
      cues: [
        { fr: 'C’est le bassin qui s’enroule, pas les jambes qui balancent.', en: 'The pelvis curls; the legs do not swing.' },
        { fr: 'Redescendez plus lentement que vous ne montez.', en: 'Lower more slowly than you lift.' },
      ],
      breathing: { fr: 'Expirez en enroulant le bassin.', en: 'Breathe out as you curl the pelvis.' },
    },
    mistakes: [
      { fr: 'Prendre de l’élan avec les jambes.', en: 'Swinging the legs for momentum.' },
      { fr: 'Laisser retomber le bassin sans contrôle.', en: 'Letting the pelvis drop without control.' },
      { fr: 'Tirer avec les bras.', en: 'Pulling with the arms.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Bascule du bassin', en: 'Pelvic tilt' },
        description: { fr: 'Pieds au sol, basculez doucement le bassin pour plaquer le bas du dos, puis relâchez.', en: 'Feet on the floor, gently tilt the pelvis to flatten the lower back, then release.' },
        mastery: { fr: '3 × 15 bascules lentes et précises.', en: '3 × 15 slow, precise tilts.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-1-2', restSec: 30, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Relevé de bassin au sol', en: 'Floor reverse crunch' },
        description: { fr: 'Genoux au-dessus des hanches, enroulez le bassin pour décoller les fesses de quelques centimètres.', en: 'Knees above the hips, curl the pelvis to lift the buttocks a few centimetres.' },
        mastery: { fr: '3 × 12 sans élan, descente en 3 s.', en: '3 × 12 without momentum, 3 s lowering.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-2', restSec: 45, perSide: false, intensity: rir('3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Genoux à la poitrine en appui', en: 'Knee tuck from a plank' },
        description: { fr: 'En appui sur les mains, pieds sur l’outil (serviette, ballon ou sangles), ramenez les genoux vers la poitrine en enroulant le bassin.', en: 'On your hands, feet on the tool (towel, ball or straps), draw the knees to the chest by curling the pelvis.' },
        mastery: { fr: '3 × 10 avec retour contrôlé en planche.', en: '3 × 10 with a controlled return to the plank.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-2', restSec: 60, perSide: false, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Pike en appui', en: 'Pike from a plank' },
        description: { fr: 'Même position, jambes tendues : montez les hanches vers le plafond en enroulant le bassin, puis revenez en planche.', en: 'Same position, legs straight: raise the hips towards the ceiling by curling the pelvis, then return to the plank.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 8 contrôlées.', en: 'Maintenance level: 3 × 8 controlled reps.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-2', restSec: 75, perSide: false, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol, serviette aux niveaux 3 et 4', en: 'Floor, towel for levels 3 and 4' },
        instructions: { fr: 'Niveaux 1 et 2 sur un tapis ; niveaux 3 et 4 pieds sur une serviette ou des patins, sur sol lisse.', en: 'Levels 1 and 2 on a mat; levels 3 and 4 with feet on a towel or sliders, on a smooth floor.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Pieds sur swiss ball', en: 'Feet on a Swiss ball' },
        instructions: { fr: 'Niveaux 3 et 4 : tibias ou pieds posés sur le ballon, que vous faites rouler vers vous.', en: 'Levels 3 and 4: shins or feet on the ball, which you roll towards you.' },
      },
      {
        id: 'suspension', equipment: ['suspension'], loadable: false, rank: 3,
        name: { fr: 'Pieds dans les sangles (TRX)', en: 'Feet in the straps (TRX)' },
        instructions: { fr: 'Niveaux 3 et 4 : pieds dans les sangles à 30 cm du sol, mains au sol sous les épaules.', en: 'Levels 3 and 4: feet in the straps 30 cm off the floor, hands under the shoulders.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Les relevés de jambes sollicitent aussi les fléchisseurs de hanche : si cela tire dans le bas du dos, restez aux niveaux 1 et 2.', en: 'Leg-raising exercises also work the hip flexors: if it pulls on your lower back, stay at levels 1 and 2.' },
    ],
    evidence: {
      level: 'low',
      citations: [
        {
          refId: 'escamilla-2006',
          finding: {
            fr: 'Le crunch inversé sur plan incliné à 30° activait fortement les abdominaux, mais aussi le droit fémoral, ce que les auteurs jugent potentiellement gênant chez certaines personnes souffrant du dos.',
            en: 'The reverse crunch on a 30° incline strongly activated the abdominals but also the rectus femoris, which the authors consider potentially problematic for some people with back problems.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'cat-cow',
    family: 'spinal-mobility',
    name: { fr: 'Chat-vache (mobilité lombaire)', en: 'Cat-cow (spinal mobility)' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['erector-spinae', 'multifidus'],
      secondary: ['rectus-abdominis', 'external-oblique', 'quadratus-lumborum'],
    },
    zoom: 'trunk-back',
    qualities: ['mobility', 'control'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Faire bouger la colonne dans toute son amplitude, sans charge, entretient sa mobilité et rassure quand le dos est raide. C’est utile après une longue sortie penché sur le vélo.',
      en: 'Moving the spine through its full range, without load, maintains mobility and is reassuring when the back is stiff. It is useful after a long ride bent over the bike.',
    },
    how: {
      setup: {
        fr: 'À quatre pattes, mains sous les épaules, genoux sous les hanches.',
        en: 'On all fours, hands under the shoulders, knees under the hips.',
      },
      movement: {
        fr: 'Arrondissez lentement le dos en rentrant le bassin et le menton (chat), puis creusez doucement en ouvrant la poitrine et en basculant le bassin (vache). Alternez sans forcer.',
        en: 'Slowly round your back, tucking the pelvis and chin (cat), then gently arch, opening the chest and tilting the pelvis (cow). Alternate without forcing.',
      },
      cues: [
        { fr: 'Le mouvement part du bassin et remonte vers la tête.', en: 'The movement starts at the pelvis and travels up to the head.' },
        { fr: 'Restez dans une amplitude confortable.', en: 'Stay within a comfortable range.' },
      ],
      breathing: { fr: 'Expirez en arrondissant, inspirez en creusant.', en: 'Breathe out as you round, in as you arch.' },
    },
    mistakes: [
      { fr: 'Forcer en fin d’amplitude.', en: 'Forcing at end range.' },
      { fr: 'Ne bouger que la tête et les épaules.', en: 'Only moving the head and shoulders.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Amplitude confortable', en: 'Comfortable range' },
        description: { fr: 'Petits mouvements lents, dans la zone sans douleur.', en: 'Small, slow movements within the pain-free zone.' },
        mastery: { fr: '2 × 10 allers-retours fluides.', en: '2 × 10 smooth cycles.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '3-0-3', restSec: 20, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Segment par segment', en: 'Segment by segment' },
        description: { fr: 'Déroulez la colonne vertèbre par vertèbre, du bassin vers la tête, plus lentement.', en: 'Roll the spine through one vertebra at a time, from pelvis to head, more slowly.' },
        mastery: { fr: '2 × 10 en sentant chaque région bouger.', en: '2 × 10 feeling each region move.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '4-0-4', restSec: 20, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Avec recul vers les talons', en: 'With a rock back to the heels' },
        description: { fr: 'Enchaînez chat, vache, puis reculez les fesses vers les talons en gardant les bras tendus (posture de l’enfant) avant de revenir.', en: 'Flow through cat and cow, then rock your hips back towards your heels with arms outstretched (child’s pose) before returning.' },
        mastery: { fr: 'Niveau d’entretien : 2 × 8 enchaînements fluides.', en: 'Maintenance level: 2 × 8 smooth sequences.' },
        dosage: { sets: 2, reps: [6, 8], tempo: '3-1-3', restSec: 20, perSide: false, intensity: bodyweight(), frequency: freq.daily },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'À quatre pattes', en: 'On all fours' },
        instructions: { fr: 'Sur un tapis, genoux protégés si besoin.', en: 'On a mat, knees cushioned if needed.' },
      },
      {
        id: 'swiss-ball', equipment: ['swiss-ball'], loadable: false, rank: 2,
        name: { fr: 'Assis sur swiss ball', en: 'Seated on a Swiss ball' },
        instructions: { fr: 'Assis sur le ballon, pieds au sol : faites rouler le bassin en avant et en arrière en arrondissant puis en redressant le dos. Utile si la position à quatre pattes est inconfortable.', en: 'Seated on the ball, feet on the floor: roll the pelvis forward and back while rounding then straightening the back. Useful if all fours is uncomfortable.' },
      },
    ],
    precautions: [
      { fr: 'Restez dans l’amplitude sans douleur ; si un sens du mouvement (arrondir ou creuser) aggrave nettement la douleur, limitez-le.', en: 'Stay within the pain-free range; if one direction (rounding or arching) clearly worsens pain, limit it.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'george-2021',
          finding: {
            fr: 'La recommandation JOSPT 2021 indique que des exercices de mobilité du tronc peuvent être proposés dans la lombalgie chronique (grade B).',
            en: 'The 2021 JOSPT guideline states that trunk mobility exercises may be provided for chronic low back pain (grade B).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'thoracic-rotation',
    family: 'thoracic-mobility',
    name: { fr: 'Rotation thoracique (livre ouvert)', en: 'Thoracic rotation (open book)' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['external-oblique', 'internal-oblique', 'pectoralis-major'],
      secondary: ['serratus-anterior', 'latissimus-dorsi', 'erector-spinae'],
    },
    zoom: 'trunk-front',
    qualities: ['mobility'],
    objectives: ['prevention', 'return'],
    preventionFor: ['bike'],
    why: {
      fr: 'Le haut du dos est fait pour tourner ; quand il se raidit, le bas du dos compense. En course, cette rotation accompagne le balancement des bras ; sur le vélo, la position penchée prolongée la limite.',
      en: 'The upper back is built to rotate; when it stiffens, the lower back compensates. In running this rotation goes with the arm swing; on the bike, the prolonged forward lean restricts it.',
    },
    how: {
      setup: {
        fr: 'Couché sur le côté, hanches et genoux pliés à 90°, bras tendus devant vous l’un sur l’autre, un coussin sous la tête.',
        en: 'Lying on your side, hips and knees bent at 90°, arms straight out in front, one on top of the other, a cushion under your head.',
      },
      movement: {
        fr: 'Ouvrez le bras du dessus en arc de cercle vers l’autre côté en suivant la main du regard, laissez la poitrine tourner, puis revenez. Les genoux restent l’un sur l’autre.',
        en: 'Open the top arm in an arc to the other side, following your hand with your eyes, let the chest rotate, then return. Knees stay stacked.',
      },
      cues: [
        { fr: 'Les genoux ne bougent pas : la rotation vient du haut du dos.', en: 'The knees do not move: the rotation comes from the upper back.' },
        { fr: 'Expirez en ouvrant et laissez le bras se relâcher vers le sol.', en: 'Breathe out as you open and let the arm relax towards the floor.' },
      ],
      breathing: { fr: 'Une longue expiration à chaque ouverture.', en: 'One long breath out with each opening.' },
    },
    mistakes: [
      { fr: 'Laisser les genoux se séparer et le bassin tourner.', en: 'Letting the knees split and the pelvis rotate.' },
      { fr: 'Forcer pour que la main touche le sol.', en: 'Forcing the hand to reach the floor.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Livre ouvert couché', en: 'Side-lying open book' },
        description: { fr: 'Couché sur le côté, ouverture lente du bras, 2 à 3 secondes de pause en fin d’amplitude.', en: 'Side-lying, slow arm opening, 2 to 3 second pause at end range.' },
        mastery: { fr: '2 × 10 par côté, amplitude comparable des deux côtés.', en: '2 × 10 per side, similar range on both sides.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '3-2-3', restSec: 20, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'À quatre pattes, main derrière la tête', en: 'On all fours, hand behind the head' },
        description: { fr: 'À quatre pattes, fesses reculées vers les talons, une main derrière la tête : tournez le coude vers le plafond puis vers le bras d’appui.', en: 'On all fours with hips back towards the heels, one hand behind the head: rotate the elbow up to the ceiling then down towards the support arm.' },
        mastery: { fr: '2 × 10 par côté sans que le bassin bouge.', en: '2 × 10 per side without the pelvis moving.' },
        dosage: { sets: 2, reps: [8, 10], tempo: '2-1-2', restSec: 20, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'En fente basse', en: 'In a low lunge' },
        description: { fr: 'En fente avant, main opposée au sol, ouvrez l’autre bras vers le plafond en tournant la poitrine.', en: 'In a forward lunge, opposite hand on the floor, open the other arm to the ceiling, rotating the chest.' },
        mastery: { fr: 'Niveau d’entretien : 2 × 6 par côté, fluide.', en: 'Maintenance level: 2 × 6 per side, smoothly.' },
        dosage: { sets: 2, reps: [5, 6], tempo: '2-2-2', restSec: 20, perSide: true, intensity: bodyweight(), frequency: freq.daily },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        instructions: { fr: 'Sur un tapis, un coussin sous la tête en position couchée.', en: 'On a mat, a cushion under your head when lying down.' },
      },
    ],
    precautions: [
      { fr: 'Exercice de mobilité : il ne doit pas être douloureux. Réduisez l’amplitude si besoin.', en: 'Mobility exercise: it should not be painful. Reduce the range if needed.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'woodchop',
    family: 'rotation-chop',
    name: { fr: 'Bûcheron en diagonale (chop)', en: 'Woodchop' },
    sports: ['run', 'bike'],
    zones: ['trunk'],
    half: 'trunk',
    muscles: {
      primary: ['external-oblique', 'internal-oblique'],
      secondary: ['rectus-abdominis', 'transversus-abdominis', 'glute-max', 'latissimus-dorsi', 'deltoid-anterior'],
    },
    zoom: 'trunk-front',
    qualities: ['control', 'strength', 'power'],
    objectives: ['prevention', 'return'],
    preventionFor: ['run'],
    why: {
      fr: 'Le bûcheron apprend à transmettre une force en diagonale, de la hanche à l’épaule opposée, en faisant tourner hanches et tronc ensemble. C’est le schéma croisé de la foulée, bras et jambe opposés, et des relances en danseuse.',
      en: 'The woodchop teaches you to transfer force diagonally, from hip to opposite shoulder, turning hips and trunk together. It is the cross pattern of the running stride, opposite arm and leg, and of out-of-the-saddle surges.',
    },
    how: {
      setup: {
        fr: 'De profil par rapport à l’ancrage placé en hauteur (chop) ou en bas (lift), poignée tenue à deux mains, pieds plus larges que les hanches ou en position demi-agenouillée.',
        en: 'Side-on to an anchor set high (chop) or low (lift), handle held with both hands, feet wider than hips or in a half-kneeling position.',
      },
      movement: {
        fr: 'Tirez la poignée en diagonale, de l’épaule côté ancrage vers la hanche opposée (ou l’inverse pour le lift), bras presque tendus, puis revenez lentement. Changez de côté.',
        en: 'Pull the handle diagonally from the shoulder nearest the anchor to the opposite hip (or the reverse for the lift), arms nearly straight, then return slowly. Switch sides.',
      },
      cues: [
        { fr: 'Hanches, buste et bras tournent ensemble, d’un bloc.', en: 'Hips, torso and arms turn together, as one unit.' },
        { fr: 'En position debout, laissez pivoter le pied arrière.', en: 'When standing, let the back foot pivot.' },
        { fr: 'Retour plus lent que l’aller.', en: 'Return more slowly than you pull.' },
      ],
      breathing: { fr: 'Expirez pendant la diagonale.', en: 'Breathe out through the diagonal.' },
    },
    mistakes: [
      { fr: 'Tirer avec les bras seuls, sans engager le tronc.', en: 'Pulling with the arms only, without engaging the trunk.' },
      { fr: 'Tourner le bas du dos en gardant le bassin bloqué.', en: 'Twisting the lower back while keeping the pelvis locked.' },
      { fr: 'Choisir une résistance qui fait perdre l’équilibre.', en: 'Using a resistance that throws you off balance.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Demi-agenouillé, amplitude courte', en: 'Half-kneeling, short range' },
        description: { fr: 'Un genou au sol, diagonale haute vers basse limitée au niveau du nombril.', en: 'One knee down, high-to-low diagonal stopping at navel height.' },
        mastery: { fr: '3 × 10 par côté sans perte d’équilibre.', en: '3 × 10 per side without losing balance.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2', restSec: 45, perSide: true, intensity: rir('3-4'), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Demi-agenouillé, chop et lift complets', en: 'Half-kneeling, full chop and lift' },
        description: { fr: 'Diagonale complète, de haut en bas puis de bas en haut, buste droit.', en: 'Full diagonal, high to low then low to high, torso upright.' },
        mastery: { fr: '3 × 10 par côté dans chaque sens, tronc stable.', en: '3 × 10 per side in each direction, trunk stable.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-2', restSec: 60, perSide: true, intensity: rir('2-3'), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Debout avec pivot', en: 'Standing with pivot' },
        description: { fr: 'Debout, la diagonale part des jambes : transfert du poids et pivot du pied arrière.', en: 'Standing, the diagonal starts from the legs: weight shift and back-foot pivot.' },
        mastery: { fr: '3 × 10 par côté, fluide et symétrique.', en: '3 × 10 per side, smooth and symmetrical.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Debout, rapide', en: 'Standing, fast' },
        description: { fr: 'Diagonale tirée vite et fort, retour lent et contrôlé.', en: 'Diagonal pulled fast and hard, slow controlled return.' },
        mastery: { fr: 'Niveau d’entretien : 3 × 6 par côté sans perte de posture.', en: 'Maintenance level: 3 × 6 per side without losing posture.' },
        dosage: { sets: 3, reps: [5, 6], tempo: '3-0-X', restSec: 90, perSide: true, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bag', equipment: [], loadable: true, rank: 1,
        name: { fr: 'Sac ou bouteille d’eau', en: 'Bag or water bottle' },
        instructions: { fr: 'Debout ou à genoux, tenez à deux mains un sac lesté ou une grosse bouteille : la diagonale va de la hanche vers l’épaule opposée (lift) et inversement, en freinant la descente.', en: 'Standing or kneeling, hold a weighted bag or large bottle with both hands: the diagonal runs from hip to opposite shoulder (lift) and back, braking the way down.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell', en: 'Dumbbell or kettlebell' },
        instructions: { fr: 'Haltère tenu à deux mains par les extrémités, même diagonale que ci-dessus.', en: 'Dumbbell held at both ends with both hands, same diagonal as above.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 3,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Élastique fixé en haut d’une porte (chop) ou au pied d’un poteau (lift).', en: 'Band anchored at the top of a door (chop) or the base of a post (lift).' },
      },
      {
        id: 'cable', equipment: ['gym'], loadable: true, rank: 4,
        name: { fr: 'Poulie', en: 'Cable machine' },
        instructions: { fr: 'Poulie réglée en position haute (chop) ou basse (lift), poignée corde ou barre courte.', en: 'Cable set high (chop) or low (lift), rope or short bar handle.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Si la rotation réveille la douleur du dos, restez demi-agenouillé avec une faible résistance ou revenez au Pallof press.', en: 'If rotation brings on back pain, stay half-kneeling with light resistance or go back to the Pallof press.' },
    ],
    evidence: { level: 'expert', citations: [] },
  }),
] satisfies ReturnType<typeof defineExercise>[];
