/** Tendinopathie du tibial postérieur. */
import { definePathology } from '@/domain/schema';
import { freq, symptomGuided } from '../helpers';

export default definePathology({
  id: 'tibialis-posterior-tendinopathy',
  region: 'foot-ankle',
  bodyAreas: ['ankle-medial'],
  sports: ['run', 'bike'],
  name: { fr: 'Tendinopathie du tibial postérieur', en: 'Tibialis posterior tendinopathy' },
  aka: [{ fr: 'Dysfonction du tendon tibial postérieur', en: 'Posterior tibial tendon dysfunction' }],
  description: {
    fr: 'Le tendon du tibial postérieur, qui passe derrière la malléole interne et soutient l’arche du pied, réagit à une charge trop importante. Il se renforce avec une charge progressive.',
    en: 'The tibialis posterior tendon, which runs behind the inner ankle bone and supports the arch, reacts to excessive load. It gets stronger with progressive loading.',
  },
  recognize: {
    fr: 'Douleur derrière et sous la cheville côté intérieur, le long du trajet du tendon vers l’arche, qui augmente en marchant longtemps, en courant ou en montant sur la pointe des pieds.',
    en: 'Pain behind and below the inner ankle, along the tendon towards the arch, that increases with long walks, running or rising onto the toes.',
  },
  symptoms: [
    { fr: 'Douleur et parfois gonflement sur l’intérieur de la cheville.', en: 'Pain and sometimes swelling on the inner side of the ankle.' },
    { fr: 'Montée sur la pointe d’un pied difficile ou douloureuse.', en: 'Rising onto the toes of one foot is difficult or painful.' },
    { fr: 'Fatigue de l’arche en fin de course.', en: 'Arch fatigue at the end of a run.' },
  ],
  riskFactors: [
    { fr: 'Augmentation rapide du volume de course ou de marche.', en: 'Rapid increase in running or walking volume.' },
    { fr: 'Pied qui s’affaisse beaucoup à l’appui.', en: 'Foot that rolls in a lot on landing.' },
    { fr: 'Âge plus avancé et surpoids.', en: 'Older age and excess body weight.' },
  ],
  phases: [
    {
      phase: 'irritable',
      summary: {
        fr: 'On charge le tendon en isométrie et sans impact, en soulageant l’arche si besoin.',
        en: 'Load the tendon isometrically and without impact, supporting the arch if needed.',
      },
      goals: [
        { fr: 'Diminuer la sensibilité du tendon.', en: 'Reduce tendon sensitivity.' },
        { fr: 'Garder le tendon actif tous les jours.', en: 'Keep the tendon active every day.' },
      ],
      exercises: [
        { exerciseId: 'band-ankle-inversion', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-isometric-hold', priority: 2, startLevel: 1 },
        { exerciseId: 'short-foot', priority: 2, startLevel: 1 },
      ],
      avoid: [
        { exerciseId: 'pogo-hops', reason: { fr: 'Les impacts sont à reporter tant que le tendon est irritable.', en: 'Impact is postponed while the tendon is irritable.' } },
        { exerciseId: 'line-hops', reason: { fr: 'Sauts latéraux trop exigeants pour un tendon irritable.', en: 'Lateral hops are too demanding for an irritable tendon.' } },
        { exerciseId: 'jump-rope', reason: { fr: 'Impacts répétés à éviter à ce stade.', en: 'Repeated impact to avoid at this stage.' } },
      ],
      nextPhaseCriteria: [
        { fr: 'Marche de 30 minutes sans douleur.', en: '30 minutes of walking without pain.' },
        { fr: '10 montées sur pointes sur une jambe sans douleur croissante.', en: '10 single-leg calf raises without increasing pain.' },
      ],
      loadAdvice: {
        fr: 'Réduisez la course, évitez les terrains en dévers ; des semelles de soutien de l’arche peuvent soulager.',
        en: 'Cut back on running and avoid cambered surfaces; arch-support insoles may help.',
      },
    },
    {
      phase: 'rebuild',
      summary: {
        fr: 'Renforcement progressif du tibial postérieur et du mollet, avec une phase de freinage lente.',
        en: 'Progressive strengthening of the tibialis posterior and calf, with a slow lowering phase.',
      },
      goals: [
        { fr: 'Retrouver la force en inversion et au mollet.', en: 'Regain inversion and calf strength.' },
        { fr: 'Reprendre la course facile.', en: 'Resume easy running.' },
      ],
      exercises: [
        {
          exerciseId: 'band-ankle-inversion',
          priority: 1,
          startLevel: 3,
          dosage: { sets: 3, reps: [15, 15], tempo: '4-0-1', restSec: 60, perSide: true, intensity: symptomGuided(), frequency: freq.daily },
        },
        { exerciseId: 'ball-squeeze-heel-raise', priority: 1, startLevel: 1 },
        { exerciseId: 'calf-raise-bent-knee', priority: 2, startLevel: 2 },
        { exerciseId: 'single-leg-balance', priority: 3, startLevel: 2 },
        { exerciseId: 'side-lying-hip-abduction', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [
        { fr: '20 montées sur pointes sur une jambe, arche bien tenue, des deux côtés.', en: '20 single-leg calf raises with a well-held arch, on both sides.' },
        { fr: '30 minutes de course facile sans douleur le lendemain.', en: '30 minutes of easy running without next-day pain.' },
      ],
    },
    {
      phase: 'return-to-sport',
      summary: {
        fr: 'On réintroduit les impacts et on garde un entretien de force.',
        en: 'Reintroduce impact and keep maintenance strength work.',
      },
      goals: [
        { fr: 'Tolérer sauts et volume habituel.', en: 'Tolerate hops and usual volume.' },
      ],
      exercises: [
        { exerciseId: 'ball-squeeze-heel-raise', priority: 1, startLevel: 3 },
        { exerciseId: 'hop-stabilization', priority: 1, startLevel: 1 },
        { exerciseId: 'pogo-hops', priority: 2, startLevel: 1 },
        { exerciseId: 'toe-walk-carry', priority: 3, startLevel: 1 },
      ],
      nextPhaseCriteria: [],
      loadAdvice: {
        fr: 'Augmentez le volume par paliers et gardez le renforcement deux fois par semaine.',
        en: 'Increase volume in steps and keep strengthening twice a week.',
      },
    },
  ],
  whenToConsult: [
    { fr: 'Arche du pied qui s’affaisse nettement en quelques semaines ou impossibilité de monter sur la pointe d’un pied.', en: 'Arch flattening noticeably within weeks, or inability to rise onto the toes of one foot.' },
    { fr: 'Gonflement important, chaleur ou rougeur à l’intérieur de la cheville.', en: 'Marked swelling, warmth or redness on the inner ankle.' },
    { fr: 'Fourmillements ou brûlures sous le pied.', en: 'Tingling or burning under the foot.' },
    { fr: 'Pas d’amélioration après 3 mois de renforcement bien suivi.', en: 'No improvement after 3 months of well-followed strengthening.' },
  ],
  complementaryAdvice: [
    { fr: 'Des semelles de soutien de l’arche, posées par un professionnel, complètent souvent le renforcement.', en: 'Arch-support insoles fitted by a professional often complement strengthening.' },
    { fr: 'Cyclistes : des chaussures rigides et des semelles adaptées soutiennent l’arche pendant le pédalage.', en: 'Cyclists: stiff shoes and suitable insoles support the arch while pedalling.' },
  ],
  evidence: {
    level: 'moderate',
    citations: [
      {
        refId: 'kulig-2009',
        finding: {
          fr: 'Chez 36 adultes en stade précoce, semelles et étirements ont amélioré la douleur et la fonction en 12 semaines ; les exercices progressifs contre résistance, en particulier excentriques, ont donné le plus d’amélioration.',
          en: 'In 36 adults at an early stage, orthoses and stretching improved pain and function over 12 weeks; progressive resistance exercise, especially eccentric, gave the greatest improvement.',
        },
      },
    ],
  },
});
