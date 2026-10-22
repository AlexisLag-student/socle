/**
 * Exercices — mollets et tendon d'Achille.
 * Ce fichier sert d'exemple de référence pour le skill add-exercise.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, symptomGuided } from '../helpers';

export default [
  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'calf-raise-straight-knee',
    family: 'calf-raise-straight',
    name: { fr: 'Montée sur pointes jambe tendue', en: 'Straight-knee calf raise' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'achilles-tendon'],
      secondary: ['soleus', 'flexor-hallucis-longus', 'tibialis-posterior', 'fibularis-longus'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'tendon-stiffness', 'endurance'],
    objectives: ['prevention', 'return', 'pain', 'performance'],
    perfGoals: ['strength', 'running-economy'],
    preventionFor: ['run'],
    why: {
      fr: 'Les mollets et le tendon d’Achille absorbent puis restituent l’énergie de chaque foulée. Des mollets forts et endurants tolèrent mieux le volume de course et participent à une foulée économique.',
      en: 'The calves and Achilles tendon absorb and return energy at every stride. Strong, enduring calves tolerate running volume better and contribute to an economical stride.',
    },
    how: {
      setup: {
        fr: 'Debout, avant-pieds au bord d’une marche ou au sol, genoux tendus, une main contre un mur pour l’équilibre.',
        en: 'Stand with the balls of your feet on the edge of a step or on the floor, knees straight, one hand on a wall for balance.',
      },
      movement: {
        fr: 'Montez le plus haut possible sur la pointe des pieds en 3 secondes, puis redescendez lentement en 3 secondes jusqu’à la position de départ (ou sous le niveau de la marche).',
        en: 'Rise as high as possible onto your toes over 3 seconds, then lower slowly over 3 seconds back to the start (or below step level).',
      },
      cues: [
        { fr: 'Poussez à travers le gros orteil et le 2e orteil.', en: 'Push through the big and second toes.' },
        { fr: 'Gardez le genou tendu sans le verrouiller.', en: 'Keep the knee straight without locking it.' },
        { fr: 'Utilisez toute l’amplitude, sans rebond en bas.', en: 'Use the full range, no bouncing at the bottom.' },
      ],
      breathing: {
        fr: 'Expirez en montant, inspirez en descendant.',
        en: 'Breathe out on the way up, in on the way down.',
      },
    },
    mistakes: [
      { fr: 'Aller trop vite et perdre le contrôle de la descente.', en: 'Going too fast and losing control of the lowering phase.' },
      { fr: 'Basculer le poids sur les petits orteils (cheville qui part vers l’extérieur).', en: 'Rolling onto the little toes (ankle tipping outwards).' },
      { fr: 'Plier les genoux pour s’aider.', en: 'Bending the knees to help.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds au sol', en: 'Both feet on the floor' },
        description: { fr: 'Montée sur les deux pointes de pieds, au sol.', en: 'Rise on both feet, on flat ground.' },
        mastery: { fr: '3 × 20 répétitions lentes sans douleur gênante.', en: '3 × 20 slow reps without bothersome pain.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '3-0-3', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Une jambe au sol', en: 'Single leg on the floor' },
        description: { fr: 'Même mouvement sur une seule jambe, l’autre pied décollé.', en: 'Same movement on one leg, the other foot off the floor.' },
        mastery: { fr: '3 × 15 répétitions par jambe, symétriques entre les deux côtés.', en: '3 × 15 reps per leg, symmetrical between sides.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-3', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Une jambe sur marche', en: 'Single leg off a step' },
        description: { fr: 'Sur une jambe, avant-pied au bord d’une marche, talon descendant sous le niveau de la marche.', en: 'On one leg with the forefoot on a step edge, heel lowering below step level.' },
        mastery: { fr: '3 × 15 répétitions par jambe en pleine amplitude.', en: '3 × 15 reps per leg through full range.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-3', restSec: 90, perSide: true, intensity: rir('2'), frequency: freq.everyOtherDay },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Une jambe lestée', en: 'Weighted single leg' },
        description: { fr: 'Sur une jambe, avec une charge (haltère, sac lesté ou machine).', en: 'On one leg with added load (dumbbell, weighted pack or machine).' },
        mastery: { fr: '3 × 10 répétitions avec environ 20 % du poids du corps ajoutés.', en: '3 × 10 reps with about 20% of body weight added.' },
        dosage: { sets: 3, reps: [8, 12], tempo: '3-0-3', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Charge lourde', en: 'Heavy load' },
        description: { fr: 'Charge lourde et lente, à la machine ou avec une barre guidée.', en: 'Heavy, slow loading on a machine or guided bar.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 3 × 8 deviennent faciles.', en: 'Maintenance level: increase the load when 3 × 8 becomes easy.' },
        dosage: { sets: 4, reps: [6, 8], tempo: '3-0-3', restSec: 150, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol ou sur une marche, une main contre le mur.', en: 'On the floor or a step, one hand against the wall.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou kettlebell', en: 'Dumbbell or kettlebell' },
        instructions: { fr: 'Tenez la charge du côté de la jambe qui travaille, l’autre main au mur.', en: 'Hold the weight on the working-leg side, other hand on the wall.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets debout ou presse', en: 'Standing calf machine or leg press' },
        instructions: { fr: 'Machine à mollets debout, ou presse à cuisses en poussant avec l’avant-pied, genoux tendus.', en: 'Standing calf machine, or leg press pushing through the forefoot with straight knees.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    contraindications: [
      { fr: 'Rupture récente du tendon d’Achille non consolidée : uniquement sur avis médical.', en: 'Recent, unhealed Achilles rupture: only on medical advice.' },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'chimenti-2024',
          finding: {
            fr: 'La recommandation JOSPT 2024 place l’exercice de mise en charge du tendon, aussi lourd que toléré, en traitement de première intention de la tendinopathie d’Achille (grade A).',
            en: 'The 2024 JOSPT guideline recommends tendon-loading exercise, as heavy as tolerated, as first-line treatment for Achilles tendinopathy (grade A).',
          },
        },
        {
          refId: 'beyer-2015',
          finding: {
            fr: 'Chez 58 patients, des montées sur pointes lourdes et lentes (3 s / 3 s) ont donné des résultats aussi bons que l’excentrique à 12 et 52 semaines, avec une meilleure assiduité.',
            en: 'In 58 patients, heavy slow calf raises (3 s / 3 s) gave results as good as eccentric training at 12 and 52 weeks, with better adherence.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'calf-raise-bent-knee',
    family: 'calf-raise-bent',
    name: { fr: 'Montée sur pointes genou fléchi', en: 'Bent-knee calf raise' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['soleus', 'achilles-tendon'],
      secondary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'flexor-hallucis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'tendon-stiffness', 'endurance'],
    objectives: ['prevention', 'return', 'pain', 'performance'],
    perfGoals: ['strength', 'running-economy'],
    preventionFor: ['run'],
    why: {
      fr: 'Le soléaire, sous les gastrocnémiens, encaisse les forces les plus élevées de la jambe en course. Genou fléchi, il travaille davantage : c’est le meilleur moyen de le cibler.',
      en: 'The soleus, beneath the gastrocnemius, handles the highest lower-leg forces in running. With the knee bent it works harder: the best way to target it.',
    },
    how: {
      setup: {
        fr: 'Debout ou assis selon la variante, genoux fléchis d’environ 30 à 90°, avant-pied au sol ou sur une marche.',
        en: 'Standing or seated depending on the variant, knees bent about 30 to 90°, forefoot on the floor or a step.',
      },
      movement: {
        fr: 'Montez sur la pointe des pieds en gardant le genou fléchi à angle constant, puis redescendez lentement.',
        en: 'Rise onto your toes while keeping the knee bend constant, then lower slowly.',
      },
      cues: [
        { fr: 'Le genou reste fléchi pendant toute la série.', en: 'The knee stays bent for the whole set.' },
        { fr: 'Montez haut, descendez lentement.', en: 'Rise high, lower slowly.' },
      ],
    },
    mistakes: [
      { fr: 'Tendre le genou en montant (le travail repasse sur les gastrocnémiens).', en: 'Straightening the knee on the way up (shifts work to the gastrocnemius).' },
      { fr: 'Amplitude réduite.', en: 'Shortened range of motion.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux jambes, genoux fléchis', en: 'Both legs, knees bent' },
        description: { fr: 'Debout, dos contre un mur, genoux légèrement fléchis.', en: 'Standing with back against a wall, knees slightly bent.' },
        mastery: { fr: '3 × 20 répétitions sans gêne.', en: '3 × 20 reps without discomfort.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '2-0-2', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Une jambe, genou fléchi', en: 'Single leg, knee bent' },
        description: { fr: 'Sur une jambe, genou fléchi, une main au mur.', en: 'On one leg, knee bent, one hand on the wall.' },
        mastery: { fr: '3 × 15 par jambe sans perte d’amplitude.', en: '3 × 15 per leg without loss of range.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '2-0-2', restSec: 75, perSide: true, intensity: rir('2-3'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Assis, chargé', en: 'Seated, loaded' },
        description: { fr: 'Assis, charge posée sur les genoux (haltères ou machine à mollets assis).', en: 'Seated with load on the knees (dumbbells or seated calf machine).' },
        mastery: { fr: '3 × 12 avec une charge proche de la moitié du poids du corps.', en: '3 × 12 with a load near half body weight.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-3', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Assis, lourd', en: 'Seated, heavy' },
        description: { fr: 'Machine à mollets assis ou charge lourde sur les genoux, lent et contrôlé.', en: 'Seated calf machine or heavy load on the knees, slow and controlled.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge dès que 4 × 8 deviennent faciles.', en: 'Maintenance level: add load once 4 × 8 feels easy.' },
        dosage: { sets: 4, reps: [6, 8], tempo: '3-0-3', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps sur une jambe', en: 'Single-leg bodyweight' },
        instructions: { fr: 'Debout sur une jambe, genou fléchi, sur une marche si possible.', en: 'Standing on one leg, knee bent, on a step if possible.' },
      },
      {
        id: 'dumbbells-on-knees', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères sur les genoux', en: 'Dumbbells on the knees' },
        instructions: { fr: 'Assis sur une chaise, avant-pieds sur un livre épais, haltères posés sur les cuisses près des genoux.', en: 'Seated on a chair, forefeet on a thick book, dumbbells resting on the thighs near the knees.' },
      },
      {
        id: 'seated-machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets assis', en: 'Seated calf machine' },
        instructions: { fr: 'Réglez le boudin juste au-dessus des genoux, avant-pieds sur la plateforme.', en: 'Set the pad just above the knees, forefeet on the platform.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'chimenti-2024',
          finding: {
            fr: 'Les programmes de mise en charge validés pour la tendinopathie d’Achille associent des montées sur pointes genou tendu et genou fléchi, à charge aussi élevée que tolérée.',
            en: 'Validated loading programmes for Achilles tendinopathy combine straight- and bent-knee calf raises at loads as high as tolerated.',
          },
        },
        {
          refId: 'beyer-2015',
          finding: {
            fr: 'Le protocole lourd et lent comprenait des montées sur pointes assis à la machine (genou fléchi), avec des résultats durables à un an.',
            en: 'The heavy slow resistance protocol included seated (bent-knee) machine calf raises, with lasting results at one year.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'calf-isometric-hold',
    family: 'calf-isometric',
    name: { fr: 'Maintien isométrique sur pointes', en: 'Isometric calf hold' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['soleus', 'gastrocnemius-medial', 'gastrocnemius-lateral', 'achilles-tendon'],
      secondary: ['flexor-hallucis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['isometric', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Tenir une position sur pointes permet de charger le mollet et le tendon d’Achille sans mouvement. C’est souvent mieux toléré quand le tendon est irritable, pour continuer à le solliciter.',
      en: 'Holding a raised-heel position loads the calf and Achilles tendon without movement. It is often better tolerated when the tendon is irritable, so it can keep being loaded.',
    },
    how: {
      setup: {
        fr: 'Debout, mains contre un mur, talons légèrement décollés (mi-hauteur).',
        en: 'Standing, hands against a wall, heels slightly raised (mid-height).',
      },
      movement: {
        fr: 'Maintenez la position talons décollés sans bouger pendant la durée indiquée, puis reposez doucement.',
        en: 'Hold the heels-up position without moving for the set time, then lower gently.',
      },
      cues: [
        { fr: 'Gardez la hauteur constante.', en: 'Keep the height constant.' },
        { fr: 'Le poids reste centré sur le gros orteil et le 2e orteil.', en: 'Keep weight centred over the big and second toes.' },
      ],
      breathing: { fr: 'Respirez normalement, sans bloquer.', en: 'Breathe normally, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Laisser les talons redescendre progressivement.', en: 'Letting the heels slowly sink.' },
      { fr: 'Bloquer la respiration.', en: 'Holding the breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds', en: 'Both feet' },
        description: { fr: 'Maintien sur les deux pieds, talons à mi-hauteur.', en: 'Hold on both feet, heels at mid-height.' },
        mastery: { fr: '5 × 45 s avec une gêne stable ou en baisse.', en: '5 × 45 s with stable or decreasing discomfort.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: { fr: 'Maintien sur une jambe, l’autre pied décollé.', en: 'Single-leg hold, other foot off the floor.' },
        mastery: { fr: '5 × 45 s par jambe sans augmentation de la douleur le lendemain.', en: '5 × 45 s per leg without increased pain the next day.' },
        dosage: { sets: 5, holdSec: 45, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 3,
        name: { fr: 'Une jambe, chargé', en: 'Single leg, loaded' },
        description: { fr: 'Maintien sur une jambe avec charge (haltère, machine à mollets).', en: 'Single-leg hold with added load (dumbbell, calf machine).' },
        mastery: { fr: 'Passer aux montées sur pointes dynamiques quand ce niveau est bien toléré.', en: 'Move on to dynamic calf raises when this level is well tolerated.' },
        dosage: { sets: 5, holdSec: 45, restSec: 90, perSide: true, intensity: load('Charge élevée mais tenue sans douleur croissante', 'Heavy load, held without increasing pain'), frequency: freq.daily },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Mains contre un mur.', en: 'Hands against a wall.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Haltère dans la main du côté qui travaille.', en: 'Dumbbell in the hand on the working side.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets', en: 'Calf machine' },
        instructions: { fr: 'Machine à mollets debout ou assis, maintien en position haute intermédiaire.', en: 'Standing or seated calf machine, hold at mid-height.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'L’effet antidouleur immédiat des exercices isométriques varie d’une personne à l’autre : leur intérêt principal est de maintenir une charge tolérable.', en: 'The immediate pain-relieving effect of isometrics varies between people: their main value is to maintain a tolerable load.' },
    ],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'chimenti-2024',
          finding: {
            fr: 'La recommandation inclut l’isométrie parmi les modalités possibles de mise en charge du tendon, à adapter à la tolérance.',
            en: 'The guideline lists isometric work among the possible tendon-loading modalities, adapted to tolerance.',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'eccentric-heel-drop',
    family: 'calf-eccentric',
    name: { fr: 'Descente excentrique du talon (Alfredson)', en: 'Eccentric heel drop (Alfredson)' },
    sports: ['run'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon'],
      secondary: ['flexor-hallucis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Freiner la descente du talon charge fortement le mollet et le tendon d’Achille. C’est le protocole historique de la tendinopathie d’Achille, une alternative aux montées lourdes et lentes.',
      en: 'Braking the heel’s descent heavily loads the calf and Achilles tendon. It is the historical Achilles tendinopathy protocol and an alternative to heavy slow calf raises.',
    },
    how: {
      setup: {
        fr: 'Avant-pieds sur le bord d’une marche, une main sur la rampe.',
        en: 'Balls of the feet on the edge of a step, one hand on the rail.',
      },
      movement: {
        fr: 'Montez sur les deux pieds, transférez le poids sur la jambe à travailler, puis descendez lentement le talon sous le niveau de la marche sur cette seule jambe. Remontez avec les deux jambes. Faites la moitié des séries genou tendu, l’autre moitié genou fléchi.',
        en: 'Rise on both feet, shift your weight onto the working leg, then slowly lower the heel below step level on that leg only. Come back up using both legs. Do half the sets knee straight, half knee bent.',
      },
      cues: [
        { fr: 'Descente lente, environ 3 secondes.', en: 'Slow lowering, about 3 seconds.' },
        { fr: 'Remontée avec l’aide de l’autre jambe.', en: 'Rise with help from the other leg.' },
      ],
    },
    mistakes: [
      { fr: 'Remonter sur la jambe douloureuse seule.', en: 'Rising on the painful leg alone.' },
      { fr: 'Descendre en chute libre en fin d’amplitude.', en: 'Dropping uncontrolled at end of range.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Excentrique au sol', en: 'Eccentric on flat ground' },
        description: { fr: 'Descente lente sur une jambe jusqu’au sol, sans descendre sous l’horizontale.', en: 'Slow single-leg lowering to the floor, not below flat.' },
        mastery: { fr: '3 × 15 répétitions tolérées.', en: '3 × 15 reps tolerated.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Excentrique sur marche', en: 'Eccentric off a step' },
        description: { fr: 'Protocole d’Alfredson : 3 × 15 genou tendu et 3 × 15 genou fléchi, deux fois par jour.', en: 'Alfredson protocol: 3 × 15 straight knee and 3 × 15 bent knee, twice a day.' },
        mastery: { fr: 'Exercice réalisable sans douleur : il est temps d’ajouter de la charge.', en: 'Exercise is pain-free: time to add load.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.twiceDaily },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Excentrique lesté', en: 'Weighted eccentric' },
        description: { fr: 'Même protocole avec un sac à dos lesté ou un haltère, charge augmentée par paliers de 5 kg.', en: 'Same protocol with a weighted backpack or dumbbell, adding load in 5 kg steps.' },
        mastery: { fr: 'Retour progressif à la course sans douleur.', en: 'Gradual pain-free return to running.' },
        dosage: { sets: 3, reps: [15, 15], tempo: '3-0-0', restSec: 60, perSide: true, intensity: load('Charge ajoutée par paliers de 5 kg quand c’est facile', 'Add load in 5 kg steps once it becomes easy'), frequency: freq.twiceDaily },
        requires: ['step'],
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur une marche d’escalier, main sur la rampe.', en: 'On a stair step, hand on the rail.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou sac lesté', en: 'Dumbbell or weighted pack' },
        instructions: { fr: 'Ajoutez la charge quand la version au poids du corps est indolore.', en: 'Add load when the bodyweight version is pain-free.' },
      },
    ],
    precautions: [
      caution.painFlare,
      { fr: 'Le protocole d’origine tolère une douleur modérée pendant l’exercice ; elle ne doit pas s’aggraver d’une semaine à l’autre.', en: 'The original protocol tolerates moderate pain during exercise; it should not worsen from week to week.' },
    ],
    evidence: {
      level: 'strong',
      citations: [
        {
          refId: 'alfredson-1998',
          finding: {
            fr: 'Après 12 semaines d’excentrique lourd, les 15 coureurs suivis avaient repris la course à leur niveau antérieur, avec moins de douleur et une force du mollet rétablie.',
            en: 'After 12 weeks of heavy eccentric training, all 15 followed runners were back to pre-injury running, with less pain and restored calf strength.',
          },
        },
        {
          refId: 'beyer-2015',
          finding: {
            fr: 'L’excentrique et la charge lourde lente ont donné des améliorations équivalentes à un an ; l’assiduité était plus faible avec l’excentrique (78 % contre 92 %).',
            en: 'Eccentric and heavy slow resistance training gave equivalent improvements at one year; adherence was lower with eccentrics (78% vs 92%).',
          },
        },
        {
          refId: 'chimenti-2024',
          finding: {
            fr: 'La recommandation JOSPT 2024 cite l’excentrique parmi les modes de mise en charge de première intention (grade A).',
            en: 'The 2024 JOSPT guideline lists eccentric work among first-line loading options (grade A).',
          },
        },
      ],
    },
  }),
];
