/** Talalgie plantaire / fasciite plantaire. */
import { definePathology } from '@/domain/schema';
import { freq, rir } from '../helpers';

export default definePathology({
  id: 'plantar-heel-pain',
  region: 'foot-ankle',
  bodyAreas: ['heel-plantar'],
  sports: ['run', 'bike'],
  name: { fr: 'Talalgie plantaire (fasciite plantaire)', en: 'Plantar heel pain (plantar fasciitis)' },
  aka: [
    { fr: 'Aponévrosite plantaire', en: 'Plantar fasciopathy' },
    { fr: 'Épine calcanéenne', en: 'Heel spur' },
  ],
  description: {
    fr: 'Le fascia plantaire, la bande fibreuse qui relie le talon aux orteils, devient sensible à son attache sous le talon quand la charge dépasse sa capacité. Il se renforce, comme un tendon, avec une charge adaptée.',
    en: 'The plantar fascia, the fibrous band linking the heel to the toes, becomes sensitive where it attaches under the heel when load exceeds its capacity. Like a tendon, it gets stronger with appropriate loading.',
  },
  recognize: {
    fr: 'Douleur sous le talon, plutôt côté intérieur, très marquée aux premiers pas du matin ou après être resté assis, qui s’atténue en marchant puis revient après une longue station debout.',
    en: 'Pain under the heel, towards the inner side, worst on the first steps in the morning or after sitting, easing as you walk and returning after standing for a long time.',
  },
  symptoms: [
    { fr: 'Douleur vive aux premiers pas du matin.', en: 'Sharp pain on the first steps in the morning.' },
    { fr: 'Point sensible sous le talon, côté intérieur.', en: 'Tender spot under the heel, inner side.' },
    { fr: 'Gêne après une longue station debout ou en fin de course.', en: 'Discomfort after long standing or at the end of a run.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume de course ou de marche.', en: 'Rapid increase in running or walking volume.' },
    { fr: 'Flexion de cheville limitée (mollets raides).', en: 'Limited ankle dorsiflexion (stiff calves).' },
    { fr: 'Longues heures debout, en particulier sur sol dur.', en: 'Long hours standing, especially on hard floors.' },
    { fr: 'Surpoids.', en: 'Excess body weight.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On calme le talon avec des étirements du fascia et des mollets, et on commence un renforcement doux du pied.',
        en: 'Settle the heel with plantar fascia and calf stretches, and start gentle foot strengthening.',
      },
      goals: [
        { fr: 'Réduire la douleur des premiers pas.', en: 'Reduce first-step pain.' },
        { fr: 'Maintenir une charge tolérée sur le pied.', en: 'Keep a tolerated load on the foot.' },
      ],
      exercises: [
        { exerciseId: 'plantar-fascia-stretch', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-wall-stretch', priority: 1, startLevel: 1 },
        { exerciseId: 'windlass-heel-raise', priority: 2, startLevel: 1 },
        { exerciseId: 'short-foot', priority: 3, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Impacts répétés sur le talon encore trop sensible.', en: 'Repeated impact on a still-too-sensitive heel.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Impacts répétés sur le talon encore trop sensible.', en: 'Repeated impact on a still-too-sensitive heel.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'La douleur des premiers pas du matin diminue nettement.', en: 'First-step morning pain clearly decreases.' },
        { fr: '15 montées sur pointes sur une jambe, serviette sous les orteils, sans douleur accrue le lendemain.', en: '15 single-leg heel raises with a towel under the toes, without increased pain the next day.' },
      ],
      loadAdvice: {
        fr: 'Réduisez la course et la station debout prolongée ; portez des chaussures amortissantes et évitez de marcher pieds nus sur sol dur.',
        en: 'Cut back on running and prolonged standing; wear cushioned shoes and avoid walking barefoot on hard floors.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'Renforcement lourd et progressif du pied et du mollet, un jour sur deux.',
        en: 'Heavy, progressive foot and calf strengthening every other day.',
      },
      goals: [
        { fr: 'Augmenter la tolérance du fascia à la charge.', en: 'Increase the fascia’s load tolerance.' },
        { fr: 'Reprendre la course facile.', en: 'Resume easy running.' },
      ],
      exercises: [
        {
          exerciseId: 'windlass-heel-raise',
          priority: 1,
          startLevel: 3,
          dosage: { sets: 3, reps: [10, 12], tempo: '3-0-3-2', restSec: 120, perSide: true, intensity: rir('1-2'), frequency: freq.everyOtherDay },
          note: { fr: 'Augmentez la charge (sac à dos) quand 12 répétitions deviennent faciles.', en: 'Add load (backpack) when 12 reps become easy.' },
        },
        { exerciseId: 'toe-flexor-strength', priority: 2, startLevel: 2 },
        { exerciseId: 'calf-raise-bent-knee', priority: 2, startLevel: 2 },
        { exerciseId: 'plantar-fascia-stretch', priority: 3, startLevel: 2 },
      ],
      nextPhaseCriteria: [
        { fr: 'Les premiers pas du matin sont peu ou pas douloureux.', en: 'First steps in the morning are barely or not painful.' },
        { fr: '30 minutes de course facile sans douleur le lendemain.', en: '30 minutes of easy running without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On reprend le volume et les impacts en gardant le renforcement du pied.',
        en: 'Resume volume and impact while keeping foot strengthening.',
      },
      goals: [
        { fr: 'Revenir au volume habituel sans rechute.', en: 'Return to usual volume without relapse.' },
        { fr: 'Tolérer sauts et vitesse.', en: 'Tolerate hops and speed.' },
      ],
      exercises: [
        { exerciseId: 'windlass-heel-raise', priority: 1, startLevel: 4 },
        { exerciseId: 'pogo-hops', priority: 2, startLevel: 1 },
        { exerciseId: 'toe-walk-carry', priority: 2, startLevel: 2 },
        { exerciseId: 'short-foot', priority: 3, startLevel: 4 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'La guérison prend souvent plusieurs mois : gardez deux séances de renforcement par semaine même quand la douleur a disparu.',
        en: 'Recovery often takes several months: keep two strength sessions a week even once the pain has gone.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Douleur après une chute ou un choc sur le talon, ou impossibilité d’appuyer.', en: 'Pain after a fall or impact on the heel, or inability to bear weight.' },
    { fr: 'Engourdissement, brûlures ou fourmillements sous le pied.', en: 'Numbness, burning or tingling under the foot.' },
    { fr: 'Douleur au repos, la nuit, talon gonflé, rouge ou fièvre.', en: 'Pain at rest or at night, a swollen or red heel, or fever.' },
    { fr: 'Douleur des deux talons associée à d’autres douleurs articulaires.', en: 'Pain in both heels together with other joint pains.' },
    { fr: 'Pas d’amélioration après 2 à 3 mois de prise en charge bien suivie.', en: 'No improvement after 2 to 3 months of well-followed management.' },
  ],
  complementaryAdvice: [
    { fr: 'Le strapping du pied et les semelles peuvent soulager à court terme, en complément des exercices.', en: 'Foot taping and insoles can give short-term relief alongside exercise.' },
    { fr: 'Une attelle de nuit est parfois proposée en cas de forte douleur matinale : à discuter avec un soignant.', en: 'A night splint is sometimes suggested for severe morning pain: discuss it with a clinician.' },
    { fr: 'Cyclistes : des chaussures à semelle rigide et bien ajustées répartissent mieux la pression.', en: 'Cyclists: stiff-soled, well-fitted shoes spread pressure better.' },
  ],
  evidence: {
    level: 'strong',
    citations: [
      {
        refId: 'koc-2023',
        finding: {
          fr: 'La recommandation JOSPT 2023 recommande les étirements du fascia plantaire et des mollets (grade A) et le renforcement des muscles du pied et de la cheville (grade B), en complément du strapping et des semelles.',
          en: 'The 2023 JOSPT guideline recommends plantar fascia and calf stretching (grade A) and foot and ankle resistance training (grade B), alongside taping and insoles.',
        },
      },
      {
        refId: 'rathleff-2015',
        finding: {
          fr: 'Chez 48 patients, des montées sur pointes lourdes avec serviette sous les orteils ont amélioré la fonction du pied plus vite que les étirements (à 3 mois), avec des résultats équivalents à 6 et 12 mois.',
          en: 'In 48 patients, heavy heel raises with a towel under the toes improved foot function faster than stretching (at 3 months), with similar results at 6 and 12 months.',
        },
      },
    ],
  },
});
