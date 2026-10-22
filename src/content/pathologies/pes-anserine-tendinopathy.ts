/**
 * Tendinopathie (ou bursite) de la patte d'oie, face interne du genou.
 */
import { definePathology } from '@/domain/schema';

export default definePathology({
  id: 'pes-anserine-tendinopathy',
  region: 'knee',
  bodyAreas: ['knee-medial'],
  sports: ['run', 'bike'],
  name: {
    fr: 'Tendinopathie de la patte d’oie',
    en: 'Pes anserine tendinopathy',
  },
  aka: [{ fr: 'Bursite de la patte d’oie', en: 'Pes anserine bursitis' }],
  description: {
    fr: 'La patte d’oie est la zone où trois tendons (sartorius, gracile et semi-tendineux) se fixent ensemble sur la face interne du tibia, juste sous le genou. Elle devient sensible quand la répétition des flexions du genou dépasse sa tolérance du moment.',
    en: 'The pes anserine is where three tendons (sartorius, gracilis and semitendinosus) attach together on the inner tibia, just below the knee. It becomes sensitive when repeated knee bending exceeds its current tolerance.',
  },
  recognize: {
    fr: 'Douleur sur la face interne du tibia, quelques centimètres sous l’interligne du genou, sensible à la pression, qui augmente en montant les escaliers, en se relevant d’une chaise ou en fin de sortie, et parfois la nuit en dormant genoux serrés.',
    en: 'Pain on the inner tibia a few centimetres below the knee joint line, tender to pressure, that increases when climbing stairs, getting up from a chair or towards the end of a session, and sometimes at night when sleeping with the knees together.',
  },
  symptoms: [
    { fr: 'Douleur localisée sous la face interne du genou.', en: 'Localised pain below the inner knee.' },
    { fr: 'Gêne en montant les escaliers ou en se relevant.', en: 'Discomfort climbing stairs or standing up.' },
    { fr: 'Parfois un léger gonflement local.', en: 'Sometimes slight local swelling.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume, des côtes ou du travail en force.', en: 'Rapid increase in volume, hills or strength-focused efforts.' },
    { fr: 'Arthrose du genou, surpoids, diabète de type 2 (contexte fréquent hors sport).', en: 'Knee osteoarthritis, overweight, type 2 diabetes (common context outside sport).' },
    { fr: 'À vélo : cales qui orientent le genou vers l’intérieur, selle mal réglée.', en: 'On the bike: cleats that steer the knee inwards, poorly set saddle.' },
  ],
  caveat: {
    fr: 'Beaucoup de douleurs de l’intérieur du genou ont d’autres causes (ménisque, ligament interne, arthrose). Si la douleur est sur l’interligne articulaire, après une torsion, ou s’accompagne d’un gonflement du genou entier, un avis médical est préférable.',
    en: 'Many inner-knee pains have other causes (meniscus, medial ligament, osteoarthritis). If pain is on the joint line, follows a twist, or comes with swelling of the whole knee, medical advice is preferable.',
  },
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme la zone en réduisant ce qui l’irrite et on garde une charge douce : isométrie et renforcement de la hanche.',
        en: 'Settle the area by reducing what irritates it while keeping gentle loading: isometrics and hip strengthening.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité à la pression et dans les escaliers.', en: 'Reduce tenderness and stair pain.' },
        { fr: 'Maintenir une activité tolérée.', en: 'Maintain tolerated activity.' },
      ],
      exercises: [
        { exerciseId: 'adductor-squeeze', priority: 1, startLevel: 1 },
        { exerciseId: 'wall-sit', priority: 1, startLevel: 1 },
        { exerciseId: 'glute-bridge', priority: 2, startLevel: 1 },
        { exerciseId: 'side-lying-hip-abduction', priority: 2, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Escaliers sans douleur gênante.', en: 'Stairs without bothersome pain.' },
        { fr: '3 × 15 squats sur chaise sans gêne le lendemain.', en: '3 × 15 box squats without next-day discomfort.' },
      ],
      loadAdvice: {
        fr: 'Réduisez volume et côtes ; à vélo, roulez souple avec de petits braquets.',
        en: 'Cut volume and hills; on the bike, spin easy in small gears.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'On renforce progressivement la cuisse, les adducteurs et la hanche.',
        en: 'Progressively strengthen the thigh, adductors and hip.',
      },
      goals: [
        { fr: 'Renforcer quadriceps, ischio-jambiers internes et adducteurs.', en: 'Strengthen quads, inner hamstrings and adductors.' },
        { fr: 'Contrôler le genou dans l’axe sur une jambe.', en: 'Control knee alignment on one leg.' },
      ],
      exercises: [
        { exerciseId: 'squat', priority: 1, startLevel: 2 },
        { exerciseId: 'step-down', priority: 1, startLevel: 1 },
        { exerciseId: 'single-leg-deadlift', priority: 2, startLevel: 1 },
        { exerciseId: 'copenhagen-adductor', priority: 2, startLevel: 1 },
        { exerciseId: 'lateral-lunge', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: 'Pression sur la patte d’oie peu ou pas sensible.', en: 'Little or no tenderness on pressure.' },
        { fr: '30 minutes de course ou 1 h 30 de vélo sans douleur le lendemain.', en: '30 minutes of running or 1 h 30 of cycling without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On reprend volume et intensité en gardant le renforcement.',
        en: 'Return to volume and intensity while keeping up strengthening.',
      },
      goals: [{ fr: 'Retrouver l’entraînement habituel sans récidive.', en: 'Return to usual training without recurrence.' }],
      exercises: [
        { exerciseId: 'single-leg-squat', priority: 1, startLevel: 2 },
        { exerciseId: 'lunge', priority: 1, startLevel: 2 },
        { exerciseId: 'lateral-band-walk', priority: 2, startLevel: 2 },
        { exerciseId: 'step-up', priority: 2, startLevel: 2 },
      ],
      nextPhaseCriteria: [],
    },
  ],
  whenToConsult: [
    { fr: 'Genou entier gonflé, chaud ou rouge, ou fièvre.', en: 'Whole knee swollen, hot or red, or fever.' },
    { fr: 'Blocage ou dérobement du genou, ou douleur après une torsion ou un choc.', en: 'Knee locking or giving way, or pain after a twist or knock.' },
    { fr: 'Douleur sur l’interligne articulaire plutôt que sous le genou.', en: 'Pain on the joint line rather than below the knee.' },
    { fr: 'Masse dure ou grossissante, douleur nocturne persistante.', en: 'A hard or growing lump, persistent night pain.' },
    { fr: 'Pas d’amélioration après 6 à 8 semaines.', en: 'No improvement after 6 to 8 weeks.' },
  ],
  complementaryAdvice: [
    {
      fr: 'À vélo, faites vérifier l’orientation des cales et l’alignement du genou au-dessus de la pédale.',
      en: 'On the bike, have cleat angle and knee-over-pedal alignment checked.',
    },
    {
      fr: 'La nuit, un coussin entre les genoux peut éviter la pression directe sur la zone.',
      en: 'At night, a pillow between the knees can avoid direct pressure on the area.',
    },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'tani-2026',
        finding: {
          fr: 'Cette revue souligne l’absence d’outil diagnostique validé et décrit une prise en charge d’abord conservatrice (repos relatif, kinésithérapie), la chirurgie n’étant envisagée qu’en dernier recours.',
          en: 'This review highlights the lack of a validated diagnostic tool and describes conservative care first (relative rest, physical therapy), with surgery only as a last resort.',
        },
      },
    ],
  },
});
