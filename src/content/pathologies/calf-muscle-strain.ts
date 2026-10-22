/** Lésion musculaire du mollet : reprise. */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'calf-muscle-strain',
  region: 'foot-ankle',
  bodyAreas: ['calf'],
  sports: ['run', 'bike'],
  name: { fr: 'Lésion du mollet (reprise)', en: 'Calf muscle strain (return)' },
  aka: [
    { fr: 'Déchirure du mollet', en: 'Calf tear' },
    { fr: 'Claquage du mollet', en: 'Pulled calf' },
  ],
  description: {
    fr: 'Une partie des fibres du mollet (gastrocnémien ou soléaire) a été lésée lors d’un effort. Après les premiers jours, le muscle cicatrise mieux avec une remise en charge progressive.',
    en: 'Some fibres of the calf (gastrocnemius or soleus) were damaged during exertion. After the first few days, the muscle heals better with progressive reloading.',
  },
  recognize: {
    fr: 'Douleur apparue brutalement dans le mollet pendant l’effort (sensation de coup ou de pincement), ou progressivement en course pour le soléaire. Cette fiche concerne la reprise, une fois la marche normale retrouvée.',
    en: 'Pain that came on suddenly in the calf during exercise (like being hit or pinched), or gradually while running for the soleus. This page covers the return phase, once normal walking is back.',
  },
  symptoms: [
    { fr: 'Douleur localisée dans le mollet à la montée sur pointes.', en: 'Localised calf pain when rising onto the toes.' },
    { fr: 'Raideur ou gêne en début de course.', en: 'Stiffness or discomfort at the start of a run.' },
    { fr: 'Force du mollet diminuée par rapport à l’autre côté.', en: 'Calf strength reduced compared with the other side.' },
  ],
  riskFactors: [
    { fr: 'Lésion du mollet antérieure.', en: 'Previous calf strain.' },
    { fr: 'Âge plus avancé (surtout après 30-35 ans).', en: 'Older age (especially after 30–35).' },
    { fr: 'Autres blessures antérieures du membre inférieur.', en: 'Other previous lower-limb injuries.' },
  ],
  phases: [
    {
      phase: 'rebuild',
      summary: {
        fr: 'On recharge progressivement le mollet, genou tendu et genou fléchi, d’abord sans porter le poids du corps puis debout.',
        en: 'Progressively reload the calf, knee straight and knee bent, first without body weight and then standing.',
      },
      goals: [
        { fr: 'Retrouver la force du mollet, en particulier du soléaire.', en: 'Regain calf strength, especially the soleus.' },
        { fr: 'Marcher vite et monter les escaliers sans douleur.', en: 'Walk briskly and climb stairs without pain.' },
      ],
      exercises: [
        { exerciseId: 'band-plantar-flexion', priority: 1, startLevel: 1 },
        { exerciseId: 'seated-soleus-isometric', priority: 1, startLevel: 1 },
        {
          exerciseId: 'calf-raise-bent-knee',
          priority: 2,
          startLevel: 1,
          dosage: { sets: 3, reps: [12, 15], tempo: '3-0-3', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'calf-raise-straight-knee', priority: 2, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Contraction rapide à éviter tant que la force n’est pas revenue.', en: 'Fast contractions to avoid until strength has returned.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Contraction rapide à éviter tant que la force n’est pas revenue.', en: 'Fast contractions to avoid until strength has returned.' } },
        { exerciseId: 'calf-raise-explosive', reason: { fr: 'Trop rapide pour cette phase.', en: 'Too fast for this phase.' } },
        { exerciseId: 'calf-wall-stretch', reason: { fr: 'Un étirement appuyé peut gêner la cicatrisation au début.', en: 'A strong stretch can disturb early healing.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Environ 25 montées sur pointes sur une jambe de chaque côté, avec un écart faible entre les côtés.', en: 'About 25 single-leg calf raises on each side, with a small difference between sides.' },
        { fr: 'Marche rapide de 30 minutes sans douleur.', en: '30 minutes of brisk walking without pain.' },
      ],
      loadAdvice: {
        fr: 'Le vélo à résistance légère est souvent possible tôt ; reprenez la course en alternance marche-course seulement à la fin de cette phase.',
        en: 'Light-resistance cycling is often possible early; resume walk-run intervals only at the end of this phase.',
      },
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On rend au mollet sa vitesse et son élasticité avant de reprendre les allures rapides et les côtes.',
        en: 'Restore calf speed and elasticity before returning to fast paces and hills.',
      },
      goals: [
        { fr: 'Tolérer les sauts et les changements d’allure.', en: 'Tolerate hops and pace changes.' },
        { fr: 'Reprendre l’entraînement complet sans récidive.', en: 'Return to full training without recurrence.' },
      ],
      exercises: [
        { exerciseId: 'calf-raise-straight-knee', priority: 1, startLevel: 3 },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 3 },
        { exerciseId: 'calf-raise-explosive', priority: 2, startLevel: 1 },
        { exerciseId: 'pogo-hops', priority: 2, startLevel: 1 },
        { exerciseId: 'toe-walk-carry', priority: 3, startLevel: 2 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Reprenez les accélérations et les côtes en dernier, et gardez le renforcement du mollet deux fois par semaine : une lésion antérieure est le principal facteur de récidive.',
        en: 'Bring back strides and hills last, and keep calf strengthening twice a week: a previous strain is the main risk factor for another one.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Claquement à l’arrière de la cheville ou impossibilité de monter sur la pointe du pied (possible rupture du tendon d’Achille).', en: 'A snap at the back of the ankle or inability to rise onto the toes (possible Achilles rupture).' },
    { fr: 'Mollet gonflé, chaud, rouge ou douloureux au repos, surtout après un long trajet ou une immobilisation (risque de phlébite).', en: 'A swollen, warm, red calf or pain at rest, especially after a long journey or immobilisation (risk of a blood clot).' },
    { fr: 'Gros hématome, impossibilité de marcher normalement après une semaine.', en: 'Large bruise, or unable to walk normally after a week.' },
    { fr: 'Douleur au mollet qui apparaît à chaque effort et disparaît au repos, avec engourdissement (à faire évaluer).', en: 'Calf pain that appears with every effort and goes at rest, with numbness (needs assessment).' },
  ],
  complementaryAdvice: [
    { fr: 'Après 30-35 ans, un entretien régulier des mollets (2 séances par semaine) aide à prévenir les récidives.', en: 'After 30–35, regular calf maintenance (2 sessions a week) helps prevent recurrence.' },
    { fr: 'Échauffez-vous progressivement avant les séances rapides.', en: 'Warm up gradually before fast sessions.' },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'green-2017',
        finding: {
          fr: 'Cette revue de 10 études (5 397 sportifs) identifie l’âge et une lésion antérieure du mollet comme les principaux facteurs de risque de nouvelle lésion.',
          en: 'This review of 10 studies (5,397 athletes) identifies age and a previous calf strain as the main risk factors for a new injury.',
        },
      },
      {
        refId: 'visser-2025',
        finding: {
          fr: 'Chez 500 adultes sans problème du tendon d’Achille, la médiane était d’environ 25 montées sur pointes sur une jambe, sans différence entre jambe dominante et non dominante.',
          en: 'In 500 adults without Achilles problems, the median was about 25 single-leg heel raises, with no difference between dominant and non-dominant legs.',
        },
      },
    ],
  },
});
