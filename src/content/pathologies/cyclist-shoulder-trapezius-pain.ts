/**
 * Douleurs d'épaules et de trapèzes en position sur le vélo.
 * Preuves indirectes : essais sur la douleur chronique du cou et des épaules (trapèzes) chez des
 * employés de bureau, transposés au cycliste.
 */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'cyclist-shoulder-trapezius-pain',
  region: 'trunk-upper',
  bodyAreas: ['shoulders-trapezius', 'neck'],
  sports: ['bike'],
  name: { fr: 'Douleurs d’épaules et de trapèzes sur le vélo', en: 'Shoulder and trapezius pain on the bike' },
  aka: [
    { fr: 'Trapèzes tendus, myalgie du trapèze', en: 'Tight traps, trapezius myalgia' },
  ],
  description: {
    fr: 'Bras tendus vers le guidon et épaules qui remontent, le haut des trapèzes travaille sans relâche pendant toute la sortie. Quand les muscles qui stabilisent les omoplates fatiguent, cette tension augmente et devient douloureuse.',
    en: 'With the arms reaching for the bar and the shoulders creeping up, the upper trapezius works non-stop throughout the ride. When the muscles that stabilise the shoulder blades tire, that tension builds and becomes painful.',
  },
  recognize: {
    fr: 'Tension ou brûlure entre le cou et la pointe de l’épaule, parfois entre les omoplates, qui augmente avec la durée de la sortie et l’appui sur le cintre, sans douleur nette lors des mouvements du bras au quotidien.',
    en: 'Tightness or burning between the neck and the point of the shoulder, sometimes between the shoulder blades, that grows with ride duration and leaning on the bar, without clear pain on everyday arm movements.',
  },
  symptoms: [
    { fr: 'Haut des épaules dur et sensible au toucher après la sortie.', en: 'Top of the shoulders hard and tender to touch after the ride.' },
    { fr: 'Envie de hausser ou de rouler les épaules en roulant.', en: 'Urge to shrug or roll the shoulders while riding.' },
    { fr: 'Gêne entre les omoplates en fin de sortie.', en: 'Discomfort between the shoulder blades late in the ride.' },
  ],
  riskFactors: [
    { fr: 'Cintre trop loin, trop bas ou trop large, bras verrouillés.', en: 'Handlebar too far, too low or too wide, locked elbows.' },
    { fr: 'Longues sorties ou augmentation rapide du volume.', en: 'Long rides or a rapid increase in volume.' },
    { fr: 'Faible endurance des muscles qui stabilisent les omoplates.', en: 'Poor endurance of the shoulder-blade stabilisers.' },
    { fr: 'Plus fréquent chez les cyclistes femmes dans les enquêtes.', en: 'More common among female cyclists in surveys.' },
    { fr: 'Travail prolongé sur écran en plus du vélo.', en: 'Long hours of screen work on top of cycling.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On relance les muscles des omoplates à faible charge et on redonne de l’aisance aux épaules, sans surcharger le haut des trapèzes.',
        en: 'Re-engage the shoulder-blade muscles at low load and restore shoulder ease, without overloading the upper trapezius.',
      },
      goals: [
        { fr: 'Diminuer la tension du haut des épaules.', en: 'Reduce tension at the top of the shoulders.' },
        { fr: 'Réapprendre à stabiliser l’omoplate sans hausser l’épaule.', en: 'Relearn to stabilise the shoulder blade without shrugging.' },
      ],
      exercises: [
        { exerciseId: 'prone-ytw', priority: 1, startLevel: 1 },
        { exerciseId: 'shoulder-external-rotation', priority: 1, startLevel: 1 },
        { exerciseId: 'pec-minor-stretch', priority: 2, startLevel: 1 },
        { exerciseId: 'chin-tuck', priority: 2, startLevel: 1 },
        {
          exerciseId: 'shoulder-shrug',
          priority: 3,
          startLevel: 1,
          dosage: { sets: 2, reps: [10, 15], tempo: '2-3-2', restSec: 45, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
      ],
      nextPhaseCriteria: [
        { fr: '3 × 10 Y-T-W sans hausser les épaules ni réveiller la douleur.', en: '3 × 10 Y-T-W without shrugging or bringing the pain back.' },
        { fr: 'Vos sorties courtes se terminent sans tension marquée des trapèzes.', en: 'Your short rides end without marked trapezius tension.' },
      ],
      loadAdvice: {
        fr: 'Raccourcissez les sorties, variez les prises et relâchez volontairement les épaules toutes les quelques minutes.',
        en: 'Shorten rides, vary your hand positions and consciously drop the shoulders every few minutes.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement les trapèzes, les muscles entre les omoplates et le dentelé antérieur, jusqu’à des charges réelles.',
        en: 'Progressively strengthen the trapezius, the muscles between the shoulder blades and the serratus anterior, up to real loads.',
      },
      goals: [
        { fr: 'Rendre les trapèzes plus forts et plus endurants.', en: 'Make the trapezius stronger and more enduring.' },
        { fr: 'Améliorer le contrôle de l’omoplate en appui.', en: 'Improve shoulder-blade control when weight-bearing.' },
      ],
      exercises: [
        { exerciseId: 'shoulder-shrug', priority: 1, startLevel: 2 },
        { exerciseId: 'row', priority: 1, startLevel: 1 },
        { exerciseId: 'scapular-push-up', priority: 1, startLevel: 2 },
        { exerciseId: 'band-pull-apart', priority: 2, startLevel: 2 },
        { exerciseId: 'wall-slide', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: '3 × 12 rowings chargés et 3 × 15 haussements chargés sans douleur le lendemain.', en: '3 × 12 loaded rows and 3 × 15 loaded shrugs without next-day pain.' },
        { fr: 'Vos sorties habituelles ne réveillent plus la douleur.', en: 'Your usual rides no longer bring the pain back.' },
      ],
      loadAdvice: {
        fr: 'Reprenez la durée habituelle par paliers et réintroduisez la position basse progressivement.',
        en: 'Return to your usual duration in steps and reintroduce the low position gradually.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On consolide la force du haut du corps et du tronc pour tolérer les longues sorties, les montées en danseuse et le tout-terrain.',
        en: 'Consolidate upper-body and trunk strength to tolerate long rides, out-of-the-saddle climbs and off-road riding.',
      },
      goals: [
        { fr: 'Tolérer les sorties longues et intenses.', en: 'Tolerate long, hard rides.' },
        { fr: 'Garder deux séances d’entretien par semaine.', en: 'Keep two maintenance sessions a week.' },
      ],
      exercises: [
        { exerciseId: 'row', priority: 1, startLevel: 3 },
        { exerciseId: 'push-up', priority: 1, startLevel: 2 },
        { exerciseId: 'shoulder-shrug', priority: 2, startLevel: 3 },
        { exerciseId: 'shoulder-external-rotation', priority: 2, startLevel: 4 },
        { exerciseId: 'side-plank', priority: 3 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Gardez le renforcement des épaules deux fois par semaine, surtout pendant les périodes de gros volume.',
        en: 'Keep shoulder strengthening twice a week, especially during high-volume periods.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur apparue après une chute sur l’épaule, déformation ou bosse sur la clavicule.', en: 'Pain after a fall on the shoulder, or a deformity or lump on the collarbone.' },
    { fr: 'Impossibilité de lever le bras ou perte de force brutale.', en: 'Inability to raise the arm or sudden loss of strength.' },
    { fr: 'Douleur de poitrine, d’épaule gauche ou de mâchoire à l’effort, essoufflement inhabituel : appelez les secours.', en: 'Chest, left-shoulder or jaw pain on exertion, unusual breathlessness: call emergency services.' },
    { fr: 'Fourmillements, engourdissement ou faiblesse dans le bras ou la main.', en: 'Pins and needles, numbness or weakness in the arm or hand.' },
    { fr: 'Douleur nocturne qui réveille, fièvre, épaule gonflée ou rouge.', en: 'Night pain that wakes you, fever, swollen or red shoulder.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines d’exercices et de réglages.', en: 'No improvement after 6 to 8 weeks of exercise and bike adjustments.' },
  ],
  complementaryAdvice: [
    { fr: 'Vérifiez la portée et la hauteur du cintre : vous devez pouvoir garder les coudes fléchis et les épaules basses.', en: 'Check bar reach and height: you should be able to keep the elbows bent and the shoulders low.' },
    { fr: 'Un cintre à la largeur de vos épaules évite d’ouvrir ou de fermer les bras en permanence.', en: 'A bar matching your shoulder width avoids constantly spreading or narrowing the arms.' },
    { fr: 'Changez souvent de prise et relâchez volontairement les épaules toutes les quelques minutes.', en: 'Change hand position often and consciously drop the shoulders every few minutes.' },
    { fr: 'Pensez aussi aux postures prolongées hors du vélo (écran, téléphone) : faites des pauses actives.', en: 'Also consider long postures off the bike (screen, phone): take active breaks.' },
  ],
  evidence: {
    level: 'moderate',
    citations: [
      {
        refId: 'andersen-2008',
        finding: {
          fr: 'Chez 48 femmes avec myalgie du trapèze, 10 semaines de renforcement spécifique des muscles douloureux ont réduit la pire douleur d’environ 79 %, alors que le pédalage d’entretien n’a eu qu’un effet faible et passager.',
          en: 'In 48 women with trapezius myalgia, 10 weeks of specific strengthening of the painful muscles cut worst pain by about 79%, whereas leg cycling for fitness had only a small, transient effect.',
        },
      },
      {
        refId: 'andersen-2012',
        finding: {
          fr: 'Chez 447 employés de bureau, une heure par semaine de renforcement spécifique du cou et des épaules, quelle que soit sa répartition, a réduit la douleur du cou et des épaules en 20 semaines.',
          en: 'In 447 office workers, one hour a week of specific neck and shoulder strengthening, however it was split, reduced neck and shoulder pain over 20 weeks.',
        },
      },
      {
        refId: 'andersen-2014',
        finding: {
          fr: 'Chez 47 employés de bureau, 10 semaines d’entraînement du trapèze inférieur et du dentelé antérieur, sans travailler directement le haut des trapèzes, ont réduit la douleur du cou et des épaules.',
          en: 'In 47 office workers, 10 weeks of lower trapezius and serratus anterior training, without directly working the upper trapezius, reduced neck and shoulder pain.',
        },
      },
      {
        refId: 'gross-2015',
        finding: {
          fr: 'Dans la douleur chronique du cou, le renforcement du cou, des omoplates et des épaules est soutenu par des preuves de qualité modérée.',
          en: 'In chronic neck pain, neck, shoulder-blade and shoulder strengthening is supported by moderate-quality evidence.',
        },
      },
      {
        refId: 'wilber-1995',
        finding: {
          fr: 'Dans cette enquête auprès de 518 cyclistes de loisir, les femmes avaient environ 2 fois plus de risque de plaintes aux épaules que les hommes.',
          en: 'In this survey of 518 recreational cyclists, women had about twice the odds of shoulder complaints compared with men.',
        },
      },
      {
        refId: 'dettori-2006',
        finding: {
          fr: 'Cette revue place le cou et les épaules parmi les sites de douleur non traumatique les plus fréquents chez le cycliste, et note que les stratégies de prévention proposées n’ont pas été testées.',
          en: 'This review lists the neck and shoulders among the most common sites of non-traumatic pain in cyclists, and notes that proposed prevention strategies remain untested.',
        },
      },
    ],
  },
});
