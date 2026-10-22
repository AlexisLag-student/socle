/** Fracture de fatigue (lésion osseuse de stress) de la jambe ou du pied : reprise après feu vert médical. */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'bone-stress-injury',
  region: 'foot-ankle',
  bodyAreas: ['shin-medial', 'forefoot'],
  sports: ['run', 'bike'],
  name: { fr: 'Fracture de fatigue (reprise)', en: 'Stress fracture (return to sport)' },
  aka: [{ fr: 'Lésion osseuse de stress', en: 'Bone stress injury' }],
  description: {
    fr: 'L’os n’a pas eu le temps de réparer les micro-lésions créées par des impacts répétés. La lésion va de la simple réaction de l’os jusqu’à la fracture, le plus souvent au tibia ou aux métatarsiens chez le coureur.',
    en: 'The bone has not had time to repair the micro-damage caused by repeated impacts. The injury ranges from a bone stress reaction to a fracture, most often in the shin or the metatarsals in runners.',
  },
  recognize: {
    fr: 'Cette fiche concerne la reprise après une fracture de fatigue déjà confirmée et autorisée par un médecin. Elle n’aide pas à reconnaître la lésion.',
    en: 'This page covers returning after a stress fracture that has been confirmed and cleared by a doctor. It does not help identify the injury.',
  },
  symptoms: [
    { fr: 'Douleur osseuse localisée, sensible sur un point précis.', en: 'Localised bone pain, tender over a precise spot.' },
    { fr: 'Douleur qui s’aggrave à l’effort et peut persister au repos.', en: 'Pain that worsens with activity and may persist at rest.' },
    { fr: 'Parfois gonflement local.', en: 'Sometimes local swelling.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide de la charge d’entraînement.', en: 'Rapid increase in training load.' },
    { fr: 'Apport énergétique insuffisant, règles absentes ou irrégulières.', en: 'Insufficient energy intake, absent or irregular periods.' },
    { fr: 'Antécédent de fracture de fatigue.', en: 'Previous stress fracture.' },
    { fr: 'Faible densité osseuse (fréquente chez les cyclistes qui pratiquent peu d’activités avec impacts).', en: 'Low bone density (common in cyclists who do little impact activity).' },
  ],
  caveat: {
    fr: 'Une fracture de fatigue se confirme par un médecin, souvent avec une imagerie. Ne reprenez ces exercices qu’après son feu vert, et selon le délai qu’il a fixé : certaines localisations (col du fémur, scaphoïde, base du 5e métatarsien…) demandent une prise en charge spécifique.',
    en: 'A stress fracture is confirmed by a doctor, often with imaging. Only resume these exercises after their clearance and within the timeline they set: some sites (femoral neck, navicular, base of the fifth metatarsal…) need specific management.',
  },
  medicalClearanceRequired: true,
  phases: [
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'Après le feu vert médical, on reconstruit la force du mollet et du pied, puis on réintroduit les impacts très progressivement.',
        en: 'After medical clearance, rebuild calf and foot strength, then reintroduce impact very gradually.',
      },
      goals: [
        { fr: 'Retrouver la force des muscles qui amortissent les impacts.', en: 'Regain strength in the muscles that absorb impact.' },
        { fr: 'Réhabituer l’os aux impacts sans récidive.', en: 'Get the bone used to impact again without recurrence.' },
      ],
      exercises: [
        {
          exerciseId: 'calf-raise-straight-knee',
          priority: 1,
          startLevel: 1,
          dosage: { sets: 3, reps: [15, 20], tempo: '3-0-3', restSec: 60, perSide: false, intensity: symptomGuided(), frequency: freq.everyOtherDay },
        },
        { exerciseId: 'calf-raise-bent-knee', priority: 1, startLevel: 1 },
        { exerciseId: 'short-foot', priority: 2, startLevel: 2, note: { fr: 'Particulièrement utile après une fracture de fatigue d’un métatarsien.', en: 'Especially useful after a metatarsal stress fracture.' } },
        { exerciseId: 'single-leg-balance', priority: 2, startLevel: 1 },
        { exerciseId: 'squat', priority: 3, startLevel: 1 },
        {
          exerciseId: 'pogo-hops',
          priority: 3,
          startLevel: 1,
          note: { fr: 'Seulement quand la marche rapide et la course facile sont indolores, et avec l’accord du soignant.', en: 'Only once brisk walking and easy running are pain-free, and with your clinician’s agreement.' },
        },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Reprenez par la marche puis par une alternance marche-course sur sol régulier, un jour sur deux, en augmentant par petits paliers. Toute douleur osseuse qui revient impose de revenir au palier précédent et d’en parler au médecin.',
        en: 'Start with walking, then walk-run intervals on even ground every other day, increasing in small steps. Any returning bone pain means dropping back a step and talking to your doctor.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Retour d’une douleur osseuse précise pendant ou après l’effort.', en: 'Return of precise bone pain during or after activity.' },
    { fr: 'Douleur au repos ou la nuit.', en: 'Pain at rest or at night.' },
    { fr: 'Douleur dans l’aine ou au pli de la hanche en courant (localisation à risque).', en: 'Pain in the groin or hip crease when running (high-risk site).' },
    { fr: 'Règles absentes ou irrégulières, perte de poids, fatigue persistante ou fractures à répétition.', en: 'Absent or irregular periods, weight loss, persistent fatigue or repeated fractures.' },
  ],
  complementaryAdvice: [
    { fr: 'Mangez suffisamment pour couvrir vos dépenses d’entraînement ; un bilan nutritionnel peut être utile.', en: 'Eat enough to cover your training demands; a nutrition review may help.' },
    { fr: 'Une fréquence de pas un peu plus élevée réduit les contraintes à chaque impact.', en: 'A slightly higher step rate reduces stress at each impact.' },
    { fr: 'Cyclistes : des sauts et du renforcement réguliers sollicitent les os, ce que le vélo fait peu.', en: 'Cyclists: regular hops and strength work load the bones, which cycling does little.' },
  ],
  evidence: {
    level: 'expert',
    citations: [
      {
        refId: 'warden-2014',
        finding: {
          fr: 'Cette revue explique que la plupart des fractures de fatigue guérissent avec une modification de charge et une reprise progressive, et propose de renforcer le mollet (tibia) et les muscles du pied (métatarsiens) pour limiter les récidives.',
          en: 'This review explains that most stress fractures heal with modified loading and a progressive return, and suggests strengthening the calf (tibia) and foot muscles (metatarsals) to limit recurrence.',
        },
      },
    ],
  },
});
