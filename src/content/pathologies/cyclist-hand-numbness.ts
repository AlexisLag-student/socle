/**
 * Fourmillements des mains du cycliste (compression du nerf ulnaire au canal de Guyon, ou du nerf médian
 * au canal carpien). Les exercices viennent EN COMPLÉMENT : l'essentiel repose sur les réglages et la
 * répartition des appuis. Preuves faibles : revue systématique d'études surtout observationnelles.
 */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'cyclist-hand-numbness',
  region: 'trunk-upper',
  bodyAreas: ['hands-wrists'],
  sports: ['bike'],
  name: { fr: 'Fourmillements des mains du cycliste', en: 'Cyclist’s hand numbness' },
  aka: [
    { fr: 'Paralysie du cycliste, compression du nerf ulnaire (canal de Guyon)', en: 'Cyclist’s palsy, ulnar nerve compression (Guyon’s canal)' },
    { fr: 'Compression du nerf médian (canal carpien)', en: 'Median nerve compression (carpal tunnel)' },
  ],
  description: {
    fr: 'L’appui prolongé de la paume sur le cintre, souvent poignet cassé en arrière, comprime les nerfs qui passent au poignet. Le nerf ulnaire, côté petit doigt, est le plus souvent touché ; le nerf médian, côté pouce, peut l’être aussi.',
    en: 'Prolonged pressure of the palm on the bar, often with the wrist bent back, compresses the nerves that cross the wrist. The ulnar nerve, on the little-finger side, is most often involved; the median nerve, on the thumb side, can be too.',
  },
  recognize: {
    fr: 'Fourmillements ou engourdissement dans l’annulaire et le petit doigt (parfois le pouce, l’index et le majeur), qui apparaissent pendant la sortie et disparaissent en général peu après. Ces exercices complètent les réglages du vélo, ils ne les remplacent pas.',
    en: 'Tingling or numbness in the ring and little fingers (sometimes the thumb, index and middle fingers), coming on during the ride and usually fading soon after. These exercises complement bike adjustments; they do not replace them.',
  },
  symptoms: [
    { fr: 'Fourmillements ou « mains endormies » pendant la sortie.', en: 'Tingling or “hands falling asleep” during the ride.' },
    { fr: 'Engourdissement de l’annulaire et du petit doigt, ou du pouce et de l’index.', en: 'Numbness of the ring and little fingers, or of the thumb and index finger.' },
    { fr: 'Main moins habile après une longue sortie (changer de vitesse, boutonner).', en: 'Less dexterous hand after a long ride (shifting gears, buttoning).' },
  ],
  riskFactors: [
    { fr: 'Sorties longues ou de plusieurs jours.', en: 'Long or multi-day rides.' },
    { fr: 'Beaucoup de poids sur les mains : cintre bas ou loin, selle trop inclinée vers l’avant.', en: 'Lots of weight on the hands: low or distant bar, saddle tilted too far forwards.' },
    { fr: 'Poignet cassé en arrière, prise en bas du cintre prolongée.', en: 'Wrist bent back, long periods in the drops.' },
    { fr: 'Pas de gants rembourrés, vibrations (tout-terrain), prise peu variée.', en: 'No padded gloves, vibration (off-road), little variation in grip.' },
  ],
  caveat: {
    fr: 'Les fourmillements des mains peuvent aussi venir du cou ou d’autres causes médicales. Les exercices proposés viennent en complément des réglages ; ils ne traitent pas une compression installée.',
    en: 'Hand tingling can also come from the neck or other medical causes. The exercises complement bike adjustments; they do not treat an established compression.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On soulage d’abord les nerfs (réglages, gants, pauses) et on ajoute des glissements neuraux doux, sans étirement ni appui prolongé sur les mains.',
        en: 'First relieve the nerves (adjustments, gloves, breaks) and add gentle nerve glides, without stretching or prolonged weight on the hands.',
      },
      goals: [
        { fr: 'Faire disparaître les fourmillements hors du vélo.', en: 'Make the tingling disappear off the bike.' },
        { fr: 'Garder les nerfs mobiles sans les irriter.', en: 'Keep the nerves mobile without irritating them.' },
      ],
      exercises: [
        { exerciseId: 'ulnar-nerve-glide', priority: 1, startLevel: 1 },
        { exerciseId: 'median-nerve-glide', priority: 1, startLevel: 1 },
        {
          exerciseId: 'wrist-extension',
          priority: 3,
          startLevel: 1,
          dosage: { sets: 3, holdSec: 20, restSec: 30, perSide: true, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
      ],
      avoid: [
        {
          exerciseId: 'push-up',
          reason: {
            fr: 'L’appui prolongé sur la paume, poignet en extension, reproduit la compression.',
            en: 'Prolonged weight on the palm with the wrist bent back reproduces the compression.',
          },
        },
      ],
      nextPhaseCriteria: [
        { fr: 'Plus aucun fourmillement hors du vélo ni la nuit.', en: 'No more tingling off the bike or at night.' },
        { fr: 'Les glissements neuraux se font sans réveiller les symptômes.', en: 'Nerve glides can be done without bringing symptoms on.' },
      ],
      loadAdvice: {
        fr: 'Réduisez la durée des sorties, changez de prise toutes les quelques minutes, secouez les mains régulièrement et faites des pauses.',
        en: 'Shorten rides, change hand position every few minutes, shake the hands out regularly and take breaks.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce les avant-bras, la main et le tronc pour tenir le cintre sans serrer et sans s’y appuyer de tout son poids.',
        en: 'Strengthen the forearms, hand and trunk to hold the bar without squeezing and without leaning your full weight on it.',
      },
      goals: [
        { fr: 'Des avant-bras et des mains endurants.', en: 'Forearms and hands with good endurance.' },
        { fr: 'Un tronc qui porte le buste pour alléger les mains.', en: 'A trunk that supports the upper body to unload the hands.' },
      ],
      exercises: [
        { exerciseId: 'grip-strength', priority: 1, startLevel: 1 },
        { exerciseId: 'wrist-extension', priority: 1, startLevel: 2 },
        { exerciseId: 'ulnar-nerve-glide', priority: 2, startLevel: 2 },
        {
          exerciseId: 'front-plank',
          priority: 2,
          note: {
            fr: 'Sur les avant-bras, pour ne pas charger les poignets.',
            en: 'On the forearms, to avoid loading the wrists.',
          },
        },
        { exerciseId: 'row', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Les exercices de préhension se font sans fourmillements.', en: 'Grip exercises can be done without tingling.' },
        { fr: 'Les sorties habituelles se terminent sans fourmillements, ou avec des fourmillements qui disparaissent en quelques minutes.', en: 'Usual rides end without tingling, or with tingling that clears within minutes.' },
      ],
      loadAdvice: {
        fr: 'Rallongez les sorties progressivement en gardant les changements de prise réguliers.',
        en: 'Lengthen rides gradually while keeping regular changes of hand position.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On entretient la force des mains, des avant-bras et du tronc pour les sorties longues et le tout-terrain.',
        en: 'Maintain hand, forearm and trunk strength for long rides and off-road riding.',
      },
      goals: [
        { fr: 'Rouler longtemps sans fourmillements.', en: 'Ride for long periods without tingling.' },
        { fr: 'Garder une séance d’entretien par semaine au minimum.', en: 'Keep at least one maintenance session a week.' },
      ],
      exercises: [
        { exerciseId: 'grip-strength', priority: 1, startLevel: 3 },
        { exerciseId: 'wrist-extension', priority: 2, startLevel: 3 },
        { exerciseId: 'row', priority: 2, startLevel: 2 },
        { exerciseId: 'front-plank', priority: 2 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Avant un événement long (plusieurs jours), testez d’abord vos réglages et vos gants sur des sorties de durée croissante.',
        en: 'Before a long (multi-day) event, test your set-up and gloves on rides of increasing length.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Faiblesse de la main : difficulté à écarter ou serrer les doigts, à tenir un objet, objets qui tombent.', en: 'Hand weakness: difficulty spreading or squeezing the fingers, holding things, dropping objects.' },
    { fr: 'Fonte musculaire visible : creux entre le pouce et l’index, ou à la base du pouce ou du petit doigt.', en: 'Visible muscle wasting: a hollow between thumb and index finger, or at the base of the thumb or little finger.' },
    { fr: 'Fourmillements qui persistent hors du vélo, qui réveillent la nuit ou qui durent plus de quelques jours après une sortie.', en: 'Tingling that persists off the bike, wakes you at night or lasts more than a few days after a ride.' },
    { fr: 'Fourmillements qui remontent dans le bras, avec douleur de nuque, ou touchant les deux mains et les pieds.', en: 'Tingling spreading up the arm with neck pain, or affecting both hands and the feet.' },
    { fr: 'Douleur du poignet après une chute sur la main.', en: 'Wrist pain after a fall on the hand.' },
  ],
  complementaryAdvice: [
    { fr: 'Portez des gants de vélo rembourrés : ils réduisent la pression sur la zone du nerf ulnaire.', en: 'Wear padded cycling gloves: they reduce pressure over the ulnar nerve area.' },
    { fr: 'Changez souvent de position de mains (haut du cintre, cocottes, bas du cintre) et évitez de rester longtemps poignet cassé en arrière.', en: 'Change hand position often (tops, hoods, drops) and avoid staying long with the wrist bent back.' },
    { fr: 'Vérifiez l’inclinaison de la selle : un bec trop incliné vers l’avant vous fait glisser et charge les mains. Une selle horizontale est un bon point de départ.', en: 'Check saddle tilt: a nose tilted too far down makes you slide forwards and loads the hands. A level saddle is a good starting point.' },
    { fr: 'Faites vérifier la hauteur et la portée du cintre : trop bas ou trop loin, il met plus de poids sur les mains.', en: 'Have bar height and reach checked: too low or too far puts more weight on the hands.' },
    { fr: 'Poignées ergonomiques ou guidoline plus épaisse, leviers de frein faciles à atteindre ; en tout-terrain, adaptez suspension et pression des pneus.', en: 'Ergonomic grips or thicker bar tape, easy-to-reach brake levers; off-road, adjust suspension and tyre pressure.' },
    { fr: 'Tenez le cintre sans serrer, coudes souples, et secouez les mains pendant les pauses.', en: 'Hold the bar without squeezing, elbows soft, and shake the hands out during breaks.' },
    { fr: 'En cas de fourmillements nocturnes, une attelle de repos du poignet en position neutre la nuit peut être proposée par un professionnel de santé.', en: 'For night-time tingling, a resting wrist splint in a neutral position at night may be suggested by a health professional.' },
  ],
  evidence: {
    level: 'low',
    citations: [
      {
        refId: 'chiaramonte-2022',
        finding: {
          fr: 'Cette revue systématique de 20 études sur les neuropathies des mains du cycliste ne trouve pas de protocole commun ; prévention, repos dès les premiers symptômes, renforcement musculaire et attelle nocturne viennent en premier, la chirurgie seulement si les symptômes persistent.',
          en: 'This systematic review of 20 studies on cyclists’ hand neuropathies finds no common protocol; prevention, rest from symptom onset, muscle strengthening and night orthoses come first, with surgery only if symptoms persist.',
        },
      },
      {
        refId: 'patterson-2003',
        finding: {
          fr: 'Chez 25 cyclistes suivis sur 600 km, 23 ont eu des symptômes moteurs ou sensitifs aux mains ; les auteurs conseillent gants, bon réglage du vélo et changements fréquents de prise.',
          en: 'Of 25 cyclists followed over 600 km, 23 developed motor or sensory hand symptoms; the authors advise gloves, proper bike fit and frequent changes of hand position.',
        },
      },
      {
        refId: 'akuthota-2005',
        finding: {
          fr: 'Après 6 jours de vélo (environ 670 km), la conduction de la branche profonde du nerf ulnaire était ralentie, et des symptômes de canal carpien sont apparus ou se sont aggravés dans quelques mains.',
          en: 'After 6 days of cycling (about 670 km), conduction in the deep branch of the ulnar nerve was slowed, and carpal tunnel symptoms appeared or worsened in a few hands.',
        },
      },
      {
        refId: 'slane-2011',
        finding: {
          fr: 'Chez 36 cyclistes, la prise en bas du cintre donnait la plus forte pression sur la zone du nerf ulnaire, et des gants rembourrés la réduisaient de 10 à 28 %.',
          en: 'In 36 cyclists, the drops position produced the highest pressure over the ulnar nerve area, and padded gloves reduced it by 10 to 28%.',
        },
      },
      {
        refId: 'oliveira-2025',
        finding: {
          fr: 'Chez 1 505 cyclistes vus en étude posturale, l’engourdissement des mains ou des doigts représentait 21,5 % des plaintes, juste après les douleurs lombaires.',
          en: 'Among 1,505 cyclists seen for bike fitting, hand or finger numbness made up 21.5% of complaints, second only to low back pain.',
        },
      },
      {
        refId: 'basson-2017',
        finding: {
          fr: 'Les glissements neuraux n’amélioraient pas la plupart des critères cliniques dans le syndrome du canal carpien, et leur effet reste incertain pour le nerf ulnaire : ils restent un complément.',
          en: 'Nerve glides did not improve most clinical outcomes in carpal tunnel syndrome, and their effect remains uncertain for the ulnar nerve: they are only an adjunct.',
        },
      },
    ],
  },
});
