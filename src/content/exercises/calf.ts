/**
 * Exercices — mollets et tendon d'Achille.
 * Ce fichier sert d'exemple de référence pour le skill add-exercise.
 */
import { defineExercise } from '@/domain/schema';
import { bodyweight, caution, freq, load, rir, rpe, symptomGuided } from '../helpers';

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

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'windlass-heel-raise',
    family: 'calf-raise-straight',
    name: { fr: 'Montée sur pointes, serviette sous les orteils (Rathleff)', en: 'Heel raise with a towel under the toes (Rathleff)' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['plantar-fascia', 'flexor-digitorum-brevis'],
      secondary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon', 'flexor-hallucis-longus'],
    },
    zoom: 'foot-sole',
    qualities: ['strength', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Orteils relevés, le fascia plantaire se tend comme un treuil : la montée sur pointes le charge en même temps que le mollet. Un pied et un mollet forts encaissent mieux les milliers d’appuis d’une sortie.',
      en: 'With the toes lifted, the plantar fascia tightens like a windlass, so the heel raise loads it together with the calf. A strong foot and calf better absorb the thousands of foot strikes of a run.',
    },
    how: {
      setup: {
        fr: 'Debout, une serviette roulée sous les orteils pour les relever, avant-pied au sol ou sur une marche, une main contre un mur.',
        en: 'Standing with a rolled towel under your toes to lift them, forefoot on the floor or a step, one hand on a wall.',
      },
      movement: {
        fr: 'Montez sur la pointe du pied en 3 secondes, tenez 2 secondes en haut, puis redescendez en 3 secondes.',
        en: 'Rise onto the ball of the foot over 3 seconds, hold 2 seconds at the top, then lower over 3 seconds.',
      },
      cues: [
        { fr: 'Les orteils restent relevés sur la serviette.', en: 'Keep the toes lifted on the towel.' },
        { fr: 'Montez le plus haut possible, sans rebond.', en: 'Rise as high as possible, no bouncing.' },
        { fr: 'Le poids reste sur le gros orteil et le 2e orteil.', en: 'Keep the weight over the big and second toes.' },
      ],
      breathing: { fr: 'Expirez en montant.', en: 'Breathe out on the way up.' },
    },
    mistakes: [
      { fr: 'Laisser glisser la serviette ou recroqueviller les orteils.', en: 'Letting the towel slip or curling the toes.' },
      { fr: 'Aller trop vite et supprimer la pause en haut.', en: 'Going too fast and skipping the pause at the top.' },
      { fr: 'Basculer vers les petits orteils.', en: 'Rolling onto the little toes.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds au sol', en: 'Both feet on the floor' },
        description: { fr: 'Serviette sous les orteils des deux pieds, montée lente.', en: 'Towel under the toes of both feet, slow rise.' },
        mastery: { fr: '3 × 15 répétitions lentes sans augmentation de la douleur le lendemain.', en: '3 × 15 slow reps without increased pain the next day.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-3-2', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Une jambe au sol', en: 'Single leg on the floor' },
        description: { fr: 'Même mouvement sur une jambe, l’autre pied décollé.', en: 'Same movement on one leg, the other foot off the floor.' },
        mastery: { fr: '3 × 12 répétitions par jambe avec la pause de 2 s en haut.', en: '3 × 12 reps per leg with the 2-second pause at the top.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-3-2', restSec: 90, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Une jambe sur marche', en: 'Single leg on a step' },
        description: { fr: 'Avant-pied sur une marche, serviette sous les orteils, talon qui descend sous le niveau de la marche.', en: 'Forefoot on a step with the towel under the toes, heel lowering below step level.' },
        mastery: { fr: '3 × 12 répétitions par jambe en pleine amplitude.', en: '3 × 12 reps per leg through full range.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-3-2', restSec: 90, perSide: true, intensity: rir('2-3'), frequency: freq.everyOtherDay },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Lesté', en: 'Weighted' },
        description: { fr: 'Sur une jambe avec un sac à dos lesté ou un haltère : charge permettant environ 10 répétitions.', en: 'Single leg with a weighted backpack or dumbbell: a load that allows about 10 reps.' },
        mastery: { fr: '4 × 10 par jambe ; augmentez la charge quand c’est facile.', en: '4 × 10 per leg; add load when it feels easy.' },
        dosage: { sets: 4, reps: [8, 10], tempo: '3-0-3-2', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.everyOtherDay },
        loaded: true,
      },
      {
        level: 5,
        name: { fr: 'Lourd', en: 'Heavy' },
        description: { fr: 'Charge lourde (environ 8 répétitions possibles), sur marche, serviette sous les orteils.', en: 'Heavy load (about 8 reps possible), on a step with the towel under the toes.' },
        mastery: { fr: 'Niveau d’entretien : 2 séances par semaine une fois la douleur disparue.', en: 'Maintenance level: twice a week once the pain has gone.' },
        dosage: { sets: 5, reps: [6, 8], tempo: '3-0-3-2', restSec: 150, perSide: true, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Serviette roulée sous les orteils, au sol ou sur une marche d’escalier.', en: 'Rolled towel under the toes, on the floor or a stair.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère ou sac lesté', en: 'Dumbbell or weighted backpack' },
        instructions: { fr: 'Haltère du côté de la jambe qui travaille, ou sac à dos rempli de livres.', en: 'Dumbbell on the working-leg side, or a backpack filled with books.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets debout', en: 'Standing calf machine' },
        instructions: { fr: 'Serviette roulée posée sur la plateforme, sous les orteils.', en: 'Rolled towel on the platform, under the toes.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'rathleff-2015',
          finding: {
            fr: 'Chez 48 patients atteints de fasciite plantaire (tous équipés de semelles), des montées sur pointes unilatérales lourdes, serviette sous les orteils, un jour sur deux, ont donné une meilleure fonction du pied à 3 mois que les étirements ; les deux groupes étaient équivalents à 6 et 12 mois.',
            en: 'In 48 patients with plantar fasciitis (all given shoe inserts), heavy single-leg heel raises with a towel under the toes every second day gave better foot function at 3 months than stretching; both groups were similar at 6 and 12 months.',
          },
        },
        {
          refId: 'koc-2023',
          finding: {
            fr: 'La recommandation JOSPT 2023 sur la talalgie préconise le renforcement des muscles du pied et de la cheville (grade B).',
            en: 'The 2023 JOSPT heel pain guideline recommends resistance training of the foot and ankle muscles (grade B).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'ball-squeeze-heel-raise',
    family: 'calf-raise-straight',
    name: { fr: 'Montée sur pointes, balle serrée entre les talons', en: 'Heel raise with a ball squeezed between the heels' },
    sports: ['run', 'bike'],
    zones: ['foot-ankle', 'calf'],
    half: 'lower',
    muscles: {
      primary: ['tibialis-posterior', 'gastrocnemius-medial', 'soleus'],
      secondary: ['gastrocnemius-lateral', 'flexor-digitorum-longus', 'flexor-hallucis-longus', 'achilles-tendon'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'control'],
    objectives: ['pain', 'return', 'prevention'],
    why: {
      fr: 'Le tibial postérieur soutient l’arche interne et verrouille le pied au moment de la poussée. Serrer une balle entre les talons l’oblige à travailler avec le mollet et empêche la cheville de partir vers l’extérieur.',
      en: 'The tibialis posterior supports the inner arch and locks the foot at push-off. Squeezing a ball between the heels makes it work with the calf and stops the ankle rolling outwards.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds parallèles, une petite balle (ou un coussin roulé) coincée entre les talons, mains contre un mur.',
        en: 'Standing with feet parallel, a small ball (or rolled cushion) held between the heels, hands on a wall.',
      },
      movement: {
        fr: 'Serrez la balle, montez sur la pointe des pieds en la gardant serrée, puis redescendez lentement.',
        en: 'Squeeze the ball, rise onto your toes while keeping it squeezed, then lower slowly.',
      },
      cues: [
        { fr: 'La balle ne doit pas tomber : les talons restent rapprochés.', en: 'Don’t drop the ball: keep the heels together.' },
        { fr: 'Le poids reste sur le gros orteil.', en: 'Keep the weight over the big toe.' },
        { fr: 'Descente lente, en 3 secondes.', en: 'Slow lowering, over 3 seconds.' },
      ],
    },
    mistakes: [
      { fr: 'Relâcher la balle en haut du mouvement.', en: 'Releasing the ball at the top.' },
      { fr: 'Laisser les genoux se rapprocher pour compenser.', en: 'Letting the knees cave in to compensate.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Au sol', en: 'On the floor' },
        description: { fr: 'Deux pieds au sol, balle serrée, montée lente.', en: 'Both feet on the floor, ball squeezed, slow rise.' },
        mastery: { fr: '3 × 15 répétitions sans laisser tomber la balle.', en: '3 × 15 reps without dropping the ball.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-2-1', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.everyOtherDay },
      },
      {
        level: 2,
        name: { fr: 'Sur une marche', en: 'On a step' },
        description: { fr: 'Avant-pieds sur une marche, talons qui descendent sous le niveau de la marche.', en: 'Forefeet on a step, heels lowering below step level.' },
        mastery: { fr: '3 × 15 en pleine amplitude, balle tenue du début à la fin.', en: '3 × 15 through full range, ball held throughout.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-2-1', restSec: 75, perSide: false, intensity: rir('2-3'), frequency: freq.everyOtherDay },
        requires: ['step'],
      },
      {
        level: 3,
        name: { fr: 'Lesté', en: 'Weighted' },
        description: { fr: 'Même mouvement avec des haltères ou un sac lesté.', en: 'Same movement holding dumbbells or a weighted backpack.' },
        mastery: { fr: '3 × 12 avec environ un quart du poids du corps ajouté.', en: '3 × 12 with about a quarter of body weight added.' },
        dosage: { sets: 3, reps: [10, 12], tempo: '3-0-2-1', restSec: 90, perSide: false, intensity: rir('2'), frequency: freq.threePerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Lourd', en: 'Heavy' },
        description: { fr: 'Machine à mollets ou charge lourde, balle serrée, lent et contrôlé.', en: 'Calf machine or heavy load, ball squeezed, slow and controlled.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 4 × 8 deviennent faciles.', en: 'Maintenance level: add load once 4 × 8 feels easy.' },
        dosage: { sets: 4, reps: [6, 8], tempo: '3-0-2-1', restSec: 120, perSide: false, intensity: rir('1-2'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Balle de tennis, petit ballon ou serviette roulée entre les talons.', en: 'Tennis ball, small ball or rolled towel between the heels.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères', en: 'Dumbbells' },
        instructions: { fr: 'Un haltère dans chaque main, bras le long du corps.', en: 'One dumbbell in each hand, arms by your sides.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets ou presse', en: 'Calf machine or leg press' },
        instructions: { fr: 'Machine à mollets debout ou presse, balle coincée entre les talons.', en: 'Standing calf machine or leg press, ball held between the heels.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: {
      level: 'expert',
      citations: [
        {
          refId: 'kulig-2009',
          finding: {
            fr: 'Chez 36 adultes atteints de tendinopathie du tibial postérieur, ajouter des exercices contre résistance progressifs aux semelles et aux étirements a davantage réduit la douleur et amélioré la fonction ressentie (cet exercice précis n’a pas été testé).',
            en: 'In 36 adults with tibialis posterior tendinopathy, adding progressive resistance exercise to orthoses and stretching further reduced pain and improved perceived function (this specific exercise was not tested).',
          },
        },
      ],
    },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'seated-soleus-isometric',
    family: 'calf-isometric',
    name: { fr: 'Isométrie du soléaire assis', en: 'Seated soleus isometric' },
    sports: ['run', 'bike'],
    zones: ['calf'],
    half: 'lower',
    muscles: {
      primary: ['soleus', 'achilles-tendon'],
      secondary: ['gastrocnemius-medial', 'flexor-hallucis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['isometric', 'strength', 'tendon-stiffness'],
    objectives: ['pain', 'return'],
    why: {
      fr: 'Le soléaire porte la plus grande part de la charge de la jambe en course. Genou fléchi et sans mouvement, on peut le charger fort tout en ménageant un tendon ou un mollet sensible.',
      en: 'The soleus carries the largest share of lower-leg load in running. With the knee bent and no movement, it can be loaded hard while sparing a sensitive tendon or calf.',
    },
    how: {
      setup: {
        fr: 'Assis, genou plié à 90°, avant-pied sur un livre épais, le haut de la cuisse calé sous une table solide (ou sous le boudin d’une machine à mollets assis bloquée).',
        en: 'Seated, knee bent at 90°, forefoot on a thick book, the top of the thigh wedged under a sturdy table (or under the pad of a locked seated calf machine).',
      },
      movement: {
        fr: 'Poussez l’avant-pied dans le sol comme pour monter le talon, contre le blocage, et maintenez la poussée sans bouger.',
        en: 'Push the forefoot into the floor as if to lift the heel, against the block, and hold the push without moving.',
      },
      cues: [
        { fr: 'Montez progressivement en force sur 2 à 3 secondes.', en: 'Build up force gradually over 2 to 3 seconds.' },
        { fr: 'Gardez le genou à 90°.', en: 'Keep the knee at 90°.' },
      ],
      breathing: { fr: 'Respirez normalement pendant le maintien.', en: 'Breathe normally during the hold.' },
    },
    mistakes: [
      { fr: 'Pousser d’un coup, en à-coups.', en: 'Pushing in sudden jerks.' },
      { fr: 'Bloquer la respiration.', en: 'Holding your breath.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Poussée modérée', en: 'Moderate push' },
        description: { fr: 'Poussée d’environ la moitié de votre force, contre la table ou un sac posé sur le genou.', en: 'Push at about half your strength, against the table or a bag on the knee.' },
        mastery: { fr: '5 × 30 s par jambe, gêne stable ou en baisse.', en: '5 × 30 s per leg, discomfort stable or decreasing.' },
        dosage: { sets: 5, holdSec: 30, restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Poussée forte', en: 'Strong push' },
        description: { fr: 'Poussée forte et soutenue contre le blocage.', en: 'Strong, sustained push against the block.' },
        mastery: { fr: '5 × 45 s par jambe sans douleur accrue le lendemain.', en: '5 × 45 s per leg without increased pain the next day.' },
        dosage: { sets: 5, holdSec: 45, restSec: 90, perSide: true, intensity: rpe('7-8'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Chargé, deux jambes', en: 'Loaded, both legs' },
        description: { fr: 'Machine à mollets assis ou barre guidée sur les cuisses, talons maintenus à mi-hauteur.', en: 'Seated calf machine or Smith bar on the thighs, heels held at mid-height.' },
        mastery: { fr: '4 × 30 s avec une charge proche du poids du corps.', en: '4 × 30 s with a load close to body weight.' },
        dosage: { sets: 4, holdSec: 30, restSec: 120, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Chargé, une jambe', en: 'Loaded, single leg' },
        description: { fr: 'Même maintien sur une jambe, charge lourde.', en: 'Same hold on one leg, heavy load.' },
        mastery: { fr: 'Niveau d’entretien : augmenter la charge quand 4 × 30 s deviennent faciles.', en: 'Maintenance level: add load when 4 × 30 s feels easy.' },
        dosage: { sets: 4, holdSec: 30, restSec: 120, perSide: true, intensity: rpe('8-9'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Sous une table', en: 'Under a table' },
        instructions: { fr: 'Cuisse calée sous une table lourde ou un bureau solide ; vérifiez qu’il ne peut pas basculer.', en: 'Thigh wedged under a heavy table or sturdy desk; make sure it cannot tip.' },
      },
      {
        id: 'dumbbells-on-knee', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères sur le genou', en: 'Dumbbells on the knee' },
        instructions: { fr: 'Haltères posés sur la cuisse près du genou, talon maintenu à mi-hauteur.', en: 'Dumbbells resting on the thigh near the knee, heel held at mid-height.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets assis ou barre guidée', en: 'Seated calf machine or Smith machine' },
        instructions: { fr: 'Boudin juste au-dessus des genoux, maintien à mi-hauteur.', en: 'Pad just above the knees, hold at mid-height.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'band-plantar-flexion',
    family: 'calf-band',
    name: { fr: 'Flexion plantaire contre élastique', en: 'Banded plantar flexion' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus'],
      secondary: ['flexor-hallucis-longus', 'flexor-digitorum-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['strength', 'endurance'],
    objectives: ['return', 'pain'],
    why: {
      fr: 'Le mollet pousse la pédale en bas de la rotation et propulse le coureur. Assis, sans porter le poids du corps, on peut le remettre en route en douceur après une blessure.',
      en: 'The calf pushes the pedal at the bottom of the stroke and propels the runner. Seated, without bearing body weight, it can be restarted gently after an injury.',
    },
    how: {
      setup: {
        fr: 'Assis au sol, jambe tendue, un élastique passé sous l’avant-pied et tenu à deux mains.',
        en: 'Sitting on the floor with the leg straight, a band looped around the forefoot and held in both hands.',
      },
      movement: {
        fr: 'Poussez la pointe du pied vers l’avant contre l’élastique, comme sur une pédale, puis revenez lentement.',
        en: 'Push the ball of the foot forward against the band, like on a pedal, then return slowly.',
      },
      cues: [
        { fr: 'Poussez par le gros orteil, sans tourner le pied.', en: 'Push through the big toe without twisting the foot.' },
        { fr: 'Retour lent, en 3 secondes.', en: 'Slow return, over 3 seconds.' },
      ],
    },
    mistakes: [
      { fr: 'Recroqueviller les orteils au lieu de pousser avec la cheville.', en: 'Curling the toes instead of pushing with the ankle.' },
      { fr: 'Laisser l’élastique ramener le pied d’un coup.', en: 'Letting the band snap the foot back.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Élastique léger', en: 'Light band' },
        description: { fr: 'Jambe tendue, élastique léger, amplitude confortable.', en: 'Straight leg, light band, comfortable range.' },
        mastery: { fr: '3 × 20 répétitions sans gêne.', en: '3 × 20 reps without discomfort.' },
        dosage: { sets: 3, reps: [15, 20], tempo: '3-0-1', restSec: 45, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
      },
      {
        level: 2,
        name: { fr: 'Élastique moyen, genou tendu et fléchi', en: 'Medium band, straight and bent knee' },
        description: { fr: 'Une série genou tendu, une série genou fléchi (soléaire), élastique plus résistant.', en: 'Alternate sets with the knee straight and bent (soleus), with a stronger band.' },
        mastery: { fr: '3 × 15 dans chaque position, pleine amplitude.', en: '3 × 15 in each position, full range.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('3'), frequency: freq.everyOtherDay },
      },
      {
        level: 3,
        name: { fr: 'Élastique fort', en: 'Strong band' },
        description: { fr: 'Élastique fort ou doublé, poussée complète. Étape suivante : les montées sur pointes debout.', en: 'Strong or doubled band, full push. Next step: standing calf raises.' },
        mastery: { fr: '3 × 15 avec l’élastique le plus fort : passez aux montées sur pointes.', en: '3 × 15 with the strongest band: move on to standing calf raises.' },
        dosage: { sets: 3, reps: [12, 15], tempo: '3-0-1', restSec: 60, perSide: true, intensity: rir('2'), frequency: freq.everyOtherDay },
      },
    ],
    variants: [
      {
        id: 'towel', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Serviette', en: 'Towel' },
        instructions: { fr: 'Serviette autour de l’avant-pied : vos bras freinent la poussée en dosant la résistance.', en: 'Towel around the forefoot: your arms resist the push, adjusting the effort.' },
      },
      {
        id: 'band', equipment: ['band'], loadable: true, rank: 2,
        name: { fr: 'Élastique', en: 'Resistance band' },
        instructions: { fr: 'Changez d’élastique ou doublez-le pour progresser.', en: 'Switch to a stronger band or double it to progress.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'toe-walk-carry',
    family: 'tiptoe-walk',
    name: { fr: 'Marche sur la pointe des pieds', en: 'Tiptoe walk' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus'],
      secondary: ['flexor-hallucis-longus', 'fibularis-longus', 'tibialis-posterior', 'achilles-tendon'],
    },
    zoom: 'leg-back',
    qualities: ['endurance', 'control', 'strength'],
    objectives: ['return', 'prevention'],
    why: {
      fr: 'Tenir sur l’avant-pied en marchant entraîne l’endurance du mollet et le contrôle de la cheville, comme dans la phase d’appui de la course. Chargée, la marche devient un vrai travail de force.',
      en: 'Staying on the forefoot while walking trains calf endurance and ankle control, as in the stance phase of running. With load, the walk becomes real strength work.',
    },
    how: {
      setup: {
        fr: 'Debout, montez sur la pointe des pieds, talons hauts, buste droit.',
        en: 'Standing, rise onto your toes with the heels high and the trunk upright.',
      },
      movement: {
        fr: 'Marchez à petits pas en gardant les talons hauts pendant toute la durée.',
        en: 'Walk with small steps, keeping the heels high for the whole duration.',
      },
      cues: [
        { fr: 'Les talons ne redescendent pas.', en: 'The heels never drop.' },
        { fr: 'Chevilles droites, sans rouler vers l’extérieur.', en: 'Ankles straight, not rolling outwards.' },
      ],
    },
    mistakes: [
      { fr: 'Laisser les talons descendre en fin de série.', en: 'Letting the heels sink at the end of the set.' },
      { fr: 'Se pencher en avant.', en: 'Leaning forward.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        description: { fr: 'Marche sur la pointe des pieds, genoux tendus.', en: 'Tiptoe walk with straight knees.' },
        mastery: { fr: '3 × 40 s sans que les talons descendent.', en: '3 × 40 s without the heels dropping.' },
        dosage: { sets: 3, holdSec: 30, restSec: 45, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 2,
        name: { fr: 'Genoux légèrement fléchis', en: 'Knees slightly bent' },
        description: { fr: 'Même marche, genoux fléchis (davantage de soléaire).', en: 'Same walk with the knees bent (more soleus).' },
        mastery: { fr: '3 × 40 s talons hauts, genoux fléchis.', en: '3 × 40 s heels high, knees bent.' },
        dosage: { sets: 3, holdSec: 40, restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.threePerWeek },
      },
      {
        level: 3,
        name: { fr: 'Chargée', en: 'Loaded' },
        description: { fr: 'Un haltère ou kettlebell dans chaque main.', en: 'A dumbbell or kettlebell in each hand.' },
        mastery: { fr: '3 × 40 s avec environ un tiers du poids du corps au total.', en: '3 × 40 s with about a third of body weight in total.' },
        dosage: { sets: 3, holdSec: 40, restSec: 90, perSide: false, intensity: rpe('7-8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
      {
        level: 4,
        name: { fr: 'Chargée lourde', en: 'Heavy loaded' },
        description: { fr: 'Charge lourde (jusqu’à la moitié du poids du corps), ou charge d’un seul côté pour défier la stabilité.', en: 'Heavy load (up to half of body weight), or load on one side only to challenge stability.' },
        mastery: { fr: 'Niveau d’entretien.', en: 'Maintenance level.' },
        dosage: { sets: 4, holdSec: 30, restSec: 120, perSide: false, intensity: rpe('8'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Dans un couloir ou en allers-retours de quelques mètres.', en: 'Along a hallway or back and forth over a few metres.' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères ou kettlebells', en: 'Dumbbells or kettlebells' },
        instructions: { fr: 'Une charge dans chaque main, épaules basses.', en: 'One weight in each hand, shoulders down.' },
      },
    ],
    precautions: [caution.painFlare],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'calf-raise-explosive',
    family: 'calf-raise-fast',
    name: { fr: 'Montée sur pointes explosive', en: 'Explosive calf raise' },
    sports: ['run', 'bike'],
    zones: ['calf'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon'],
      secondary: ['flexor-hallucis-longus', 'fibularis-longus'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance', 'return'],
    perfGoals: ['power'],
    why: {
      fr: 'En course, le mollet produit sa force en quelques dixièmes de seconde. Monter vite sur la pointe entraîne cette force rapide, un pont entre le renforcement lent et les sauts.',
      en: 'In running, the calf produces force within a few tenths of a second. Rising quickly onto the toes trains this fast force, a bridge between slow strengthening and jumps.',
    },
    how: {
      setup: {
        fr: 'Debout, avant-pied au sol ou sur une marche, une main contre un mur.',
        en: 'Standing with the forefoot on the floor or a step, one hand on a wall.',
      },
      movement: {
        fr: 'Redescendez en 2 secondes, puis montez le plus vite possible sur la pointe du pied, sans quitter le sol.',
        en: 'Lower over 2 seconds, then rise onto the toes as fast as possible without leaving the ground.',
      },
      cues: [
        { fr: 'Montée explosive, descente contrôlée.', en: 'Explosive rise, controlled lowering.' },
        { fr: 'Arrêtez la série dès que la vitesse baisse.', en: 'Stop the set as soon as speed drops.' },
      ],
    },
    mistakes: [
      { fr: 'Faire trop de répétitions : la vitesse prime sur le nombre.', en: 'Doing too many reps: speed matters more than volume.' },
      { fr: 'Plier les genoux pour aller plus vite.', en: 'Bending the knees to go faster.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds', en: 'Both feet' },
        description: { fr: 'Montée rapide sur les deux pieds, au sol.', en: 'Fast rise on both feet, on the floor.' },
        mastery: { fr: '3 × 10 montées rapides, sans gêne.', en: '3 × 10 fast rises without discomfort.' },
        dosage: { sets: 3, reps: [8, 10], tempo: '2-0-X', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Une jambe', en: 'Single leg' },
        description: { fr: 'Montée rapide sur une jambe.', en: 'Fast rise on one leg.' },
        mastery: { fr: '3 × 8 par jambe, vitesse identique des deux côtés.', en: '3 × 8 per leg, same speed on both sides.' },
        dosage: { sets: 3, reps: [6, 8], tempo: '2-0-X', restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Une jambe sur marche', en: 'Single leg on a step' },
        description: { fr: 'Depuis le talon sous le niveau de la marche, montée explosive.', en: 'From the heel below step level, explosive rise.' },
        mastery: { fr: '4 × 6 par jambe sans perte de vitesse.', en: '4 × 6 per leg without losing speed.' },
        dosage: { sets: 4, reps: [5, 6], tempo: '2-0-X', restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
        requires: ['step'],
      },
      {
        level: 4,
        name: { fr: 'Lestée', en: 'Weighted' },
        description: { fr: 'Charge modérée (haltère, machine), montée la plus rapide possible.', en: 'Moderate load (dumbbell, machine), rising as fast as possible.' },
        mastery: { fr: 'Niveau d’entretien en période de compétition.', en: 'Maintenance level during the racing season.' },
        dosage: { sets: 4, reps: [4, 6], tempo: '2-0-X', restSec: 120, perSide: true, intensity: load('Charge modérée, vitesse maximale', 'Moderate load, maximal speed'), frequency: freq.twoPerWeek },
        loaded: true,
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Au sol ou sur une marche, une main au mur.', en: 'On the floor or a step, one hand on the wall.' },
      },
      {
        id: 'dumbbell', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltère', en: 'Dumbbell' },
        instructions: { fr: 'Haltère du côté de la jambe qui travaille.', en: 'Dumbbell on the working-leg side.' },
      },
      {
        id: 'machine', equipment: ['gym'], loadable: true, rank: 3,
        name: { fr: 'Machine à mollets ou presse', en: 'Calf machine or leg press' },
        instructions: { fr: 'Charge modérée, poussée explosive avec l’avant-pied.', en: 'Moderate load, explosive push through the forefoot.' },
      },
    ],
    precautions: [caution.painFlare, caution.balanceSupport],
    evidence: { level: 'expert', citations: [] },
  }),

  // ---------------------------------------------------------------------------
  defineExercise({
    id: 'pogo-hops',
    family: 'ankle-hop-vertical',
    name: { fr: 'Sauts de cheville (pogo)', en: 'Pogo hops' },
    sports: ['run', 'bike'],
    zones: ['calf', 'foot-ankle'],
    half: 'lower',
    muscles: {
      primary: ['gastrocnemius-medial', 'gastrocnemius-lateral', 'soleus', 'achilles-tendon'],
      secondary: ['fibularis-longus', 'flexor-hallucis-longus', 'tibialis-posterior'],
    },
    zoom: 'leg-back',
    qualities: ['power', 'tendon-stiffness'],
    objectives: ['performance', 'prevention', 'return'],
    perfGoals: ['power', 'running-economy'],
    preventionFor: ['run'],
    why: {
      fr: 'Le tendon d’Achille fonctionne comme un ressort : il stocke l’énergie à l’appui et la restitue à la poussée. De petits rebonds rapides entraînent ce ressort et préparent le mollet aux impacts de la course.',
      en: 'The Achilles tendon works like a spring: it stores energy on landing and returns it at push-off. Small, quick bounces train this spring and prepare the calf for the impacts of running.',
    },
    how: {
      setup: {
        fr: 'Debout, pieds à largeur de hanches, genoux presque tendus, bras détendus.',
        en: 'Standing with feet hip-width apart, knees almost straight, arms relaxed.',
      },
      movement: {
        fr: 'Rebondissez sur l’avant-pied en enchaînant de petits sauts rapides, comme sur un trampoline, sans que les talons touchent le sol.',
        en: 'Bounce on the balls of your feet with small, quick hops, as if on a trampoline, without the heels touching the ground.',
      },
      cues: [
        { fr: 'Contacts au sol courts et légers.', en: 'Short, light ground contacts.' },
        { fr: 'Le mouvement vient des chevilles, pas des genoux.', en: 'The movement comes from the ankles, not the knees.' },
        { fr: 'Arrêtez dès que les contacts deviennent lourds ou bruyants.', en: 'Stop as soon as the contacts become heavy or noisy.' },
      ],
      breathing: { fr: 'Respirez librement, sans bloquer.', en: 'Breathe freely, do not hold your breath.' },
    },
    mistakes: [
      { fr: 'Plier les genoux à chaque réception (on fait alors des squats sautés).', en: 'Bending the knees on each landing (it becomes squat jumps).' },
      { fr: 'Laisser les talons s’écraser au sol.', en: 'Letting the heels crash into the ground.' },
      { fr: 'Commencer trop tôt après une blessure du tendon ou de l’os.', en: 'Starting too soon after a tendon or bone injury.' },
    ],
    levels: [
      {
        level: 1,
        name: { fr: 'Deux pieds, petite amplitude', en: 'Both feet, small hops' },
        description: { fr: 'Petits rebonds sur place, à rythme régulier.', en: 'Small bounces on the spot at a steady rhythm.' },
        mastery: { fr: '3 × 20 contacts légers, sans douleur le lendemain.', en: '3 × 20 light contacts, without pain the next day.' },
        dosage: { sets: 3, reps: [15, 20], tempo: 'X-0-X', restSec: 60, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 2,
        name: { fr: 'Deux pieds, plus haut et plus vite', en: 'Both feet, higher and faster' },
        description: { fr: 'Rebonds plus hauts, contacts les plus courts possibles.', en: 'Higher bounces with the shortest possible contacts.' },
        mastery: { fr: '3 × 30 contacts rapides et réguliers.', en: '3 × 30 quick, even contacts.' },
        dosage: { sets: 3, reps: [20, 30], tempo: 'X-0-X', restSec: 90, perSide: false, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 3,
        name: { fr: 'Une jambe, sur place', en: 'Single leg, on the spot' },
        description: { fr: 'Rebonds sur une seule jambe, sur place.', en: 'Bounces on one leg, on the spot.' },
        mastery: { fr: '3 × 15 par jambe, hauteur et rythme symétriques.', en: '3 × 15 per leg, symmetrical height and rhythm.' },
        dosage: { sets: 3, reps: [10, 15], tempo: 'X-0-X', restSec: 90, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 4,
        name: { fr: 'Une jambe, en déplacement', en: 'Single leg, moving' },
        description: { fr: 'Rebonds sur une jambe vers l’avant, l’arrière et les côtés.', en: 'Single-leg bounces forwards, backwards and sideways.' },
        mastery: { fr: '3 × 15 par jambe dans chaque direction sans perte de contrôle.', en: '3 × 15 per leg in each direction without losing control.' },
        dosage: { sets: 3, reps: [12, 15], tempo: 'X-0-X', restSec: 120, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
      {
        level: 5,
        name: { fr: 'Une jambe, séries longues', en: 'Single leg, long sets' },
        description: { fr: 'Rebonds continus sur une jambe pendant 20 secondes.', en: 'Continuous single-leg bounces for 20 seconds.' },
        mastery: { fr: 'Niveau d’entretien, 1 à 2 fois par semaine.', en: 'Maintenance level, once or twice a week.' },
        dosage: { sets: 4, holdSec: 20, restSec: 120, perSide: true, intensity: bodyweight(), frequency: freq.twoPerWeek },
      },
    ],
    variants: [
      {
        id: 'bodyweight', equipment: [], loadable: false, rank: 1,
        name: { fr: 'Poids du corps', en: 'Bodyweight' },
        instructions: { fr: 'Sur un sol ferme mais pas trop dur (parquet, piste, herbe rase).', en: 'On firm but not too hard ground (wooden floor, track, short grass).' },
      },
      {
        id: 'dumbbells', equipment: ['dumbbells'], loadable: true, rank: 2,
        name: { fr: 'Haltères légers', en: 'Light dumbbells' },
        instructions: { fr: 'Pour les athlètes avancés : haltères légers tenus le long du corps, uniquement sur les niveaux à deux pieds.', en: 'For advanced athletes: light dumbbells held by your sides, on two-foot levels only.' },
      },
    ],
    precautions: [caution.noPainJump, caution.painFlare],
    contraindications: [
      { fr: 'Fracture de fatigue non consolidée ou tendon d’Achille très irritable : pas de sauts sans avis médical.', en: 'Unhealed stress fracture or highly irritable Achilles tendon: no hopping without medical advice.' },
    ],
    evidence: {
      level: 'moderate',
      citations: [
        {
          refId: 'ramirez-campillo-2021',
          finding: {
            fr: 'Dans une méta-analyse de 21 études (511 coureurs d’endurance), l’entraînement par sauts a amélioré la performance sur 2 à 5 km, la force réactive et l’économie de course (cet exercice précis n’a pas été isolé).',
            en: 'In a meta-analysis of 21 studies (511 endurance runners), jump training improved 2–5 km time-trial performance, reactive strength and running economy (this specific exercise was not isolated).',
          },
        },
      ],
    },
  }),
];
