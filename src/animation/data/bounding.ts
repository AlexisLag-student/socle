import { defineAnimation, type Keyframe, type Pose } from '../schema';

/**
 * Bondissements — « Poussez fort sur une jambe pour bondir loin vers l’avant, genou opposé haut et bras amples.
 * Réceptionnez-vous sur l’autre pied, sous le bassin, et enchaînez immédiatement le bond suivant. » Exercice qui se
 * déplace sur 20 à 30 m : montré sur place, bassin fixe à l'horizontale (comme sur un tapis de course), le pied d'appui
 * repousse le sol vers l'arrière ; le vol = décalage vertical. Niveau 1 : pas sautés (power skip) ; niveau 4 : deux
 * bonds sur la même jambe puis changement.
 */
type Side = 'N' | 'F';
const other = (s: Side): Side => (s === 'N' ? 'F' : 'N');
/** Pose écrite pour l'appui `s` (s = jambe d'appui, o = l'autre), traduite en canaux N / F. */
const sided = (s: Side, p: Record<string, number>): Pose => {
  const o = other(s);
  return Object.fromEntries(Object.entries(p).map(([k, v]) => [k.replace(/_s$/, s).replace(/_o$/, o), v])) as Pose;
};

/** Pose du pied à l'attaque du sol, sous le bassin ; amplitude a (0 à 1). */
const touch = (s: Side, a: number) => sided(s, { tilt: 8, hip_s: 22, knee_s: 12, ankle_s: -2, hip_o: -10 - 10 * a, knee_o: 60 + 20 * a, ankle_o: -20, shoulder_s: -35 * a - 10, shoulder_o: 35 * a + 10, elbow: 80 });
const mid = (s: Side) => sided(s, { tilt: 8, hip_s: 8, knee_s: 25, ankle_s: 25, hip_o: 35, knee_o: 105, ankle_o: 0, shoulder_s: 10, shoulder_o: -5 });
/** Poussée : jambe d'appui tendue derrière, genou opposé haut, bras opposés amples. */
const push = (s: Side, a: number) => sided(s, { tilt: 12, hip_s: -20, knee_s: 5, ankle_s: -35, hip_o: 60 + 30 * a, knee_o: 90, ankle_o: 10, shoulder_s: 30 + 40 * a, shoulder_o: -20 - 30 * a, elbow: 70 });
/** Vol : jambe d'appui qui revient, jambe avant qui s'allonge pour la réception. */
const fly = (s: Side, a: number) => sided(s, { tilt: 10, hip_s: -10, knee_s: 50, ankle_s: -10, hip_o: 55 + 10 * a, knee_o: 40, ankle_o: 0 });

/** Saut sur la même jambe : la jambe d'appui revient sous le bassin, l'autre reste devant, genou haut. */
const hopFly = (s: Side) => sided(s, { tilt: 8, hip_s: 25, knee_s: 50, ankle_s: 0, hip_o: 80, knee_o: 90, ankle_o: 10 });
const hopLand = (s: Side, a: number) => sided(s, { tilt: 8, hip_s: 22, knee_s: 12, ankle_s: -2, hip_o: 60 + 20 * a, knee_o: 90, ankle_o: 10, shoulder_s: 20, shoulder_o: -10 });

/** Hauteur du bassin (décalage vertical) qui pose le pied d'appui au sol, par pose. */
const Y = { touch: 2.4, mid: -0.4, push: 2.7, hopLand: 2.4 };
const k = (pose: Pose, dur: number, say: Keyframe['say'], phase: Keyframe['phase'] = 'concentrique'): Keyframe => ({ pose, dur, phase, say, anchor: 'seat' });

/** Bonds alternés : appui proche, vol, appui éloigné, vol. */
const alternate = (a: number, fl: number): Keyframe[] =>
  (['N', 'F'] as Side[]).flatMap((s) => [
    k({ ...touch(s, a), y: Y.touch }, 0.1, 'land', 'excentrique'),
    k({ ...mid(s), y: Y.mid }, 0.12, 'push'),
    k({ ...push(s, a), y: Y.push }, 0.2, 'jump', 'retour'),
    k({ ...fly(s, a), y: Y.push + fl }, 0.2, 'land', 'retour'),
  ]);

/** Pas sautés (niveau 1) ou bonds combinés (niveau 4) : deux appuis sur la même jambe, puis changement. */
const doubled = (a: number, fl: number, bound: boolean): Keyframe[] =>
  (['N', 'F'] as Side[]).flatMap((s) => [
    k({ ...touch(s, a), y: Y.touch }, 0.1, bound ? 'land' : 'step', 'excentrique'),
    k({ ...mid(s), y: Y.mid }, 0.12, 'push'),
    k({ ...push(s, a), y: Y.push }, 0.2, 'jump', 'retour'),
    k({ ...hopFly(s), y: Y.push + fl }, 0.2, 'land', 'retour'),
    ...(bound
      ? [
          k({ ...hopLand(s, a), y: Y.hopLand }, 0.1, 'land', 'excentrique'),
          k({ ...mid(s), y: Y.mid }, 0.12, 'push'),
          k({ ...push(s, a), y: Y.push }, 0.2, 'jump', 'retour'),
          k({ ...fly(s, a), y: Y.push + fl }, 0.2, 'land', 'retour'),
        ]
      : [k({ ...hopLand(s, a), y: Y.hopLand }, 0.25, 'step', 'excentrique')]),
  ]);

export default defineAnimation({
  exerciseId: 'bounding',
  view: 'profile',
  loop: 'cycle',
  side: 'bilateral',
  anchor: { point: 'seat', y: 95 },
  still: 2,
  // Niveau 1 : pas sautés.
  keyframes: doubled(0.3, 8, false),
  contacts: [],
  overrides: [
    { levels: [2], still: 2, keyframes: alternate(0.5, 15) },
    { levels: [3], still: 2, keyframes: alternate(1, 22) },
    { levels: [4], still: 2, keyframes: doubled(0.8, 20, true) },
  ],
});
