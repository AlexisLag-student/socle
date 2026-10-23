/**
 * Aide à l'écriture d'une animation : position des points de contact, de la racine et de la tête
 * à chaque pose clé, pour régler les angles (pied qui doit toucher le sol, main sous le genou…).
 *
 * npm run anim:probe -- <exerciseId> [niveau] [variante]
 */
import { buildTimeline, contactWorld, createFrame, resolve, sample, segPoint, timeOfKeyframe } from '../src/animation/engine';
import { animationLoaders } from '../src/animation/loaders';
import { CH, SEG_INDEX, type ContactPoint } from '../src/animation/skeleton';

const [id, levelArg, variant] = process.argv.slice(2);
const load = id ? animationLoaders[id] : undefined;
if (!id || !load) {
  console.error(`Usage : npm run anim:probe -- <exerciseId> [niveau] [variante]\nAnimations : ${Object.keys(animationLoaders).join(', ')}`);
  process.exit(1);
}
const r = resolve((await load()).default, { level: levelArg ? Number(levelArg) : undefined, variant });
const tl = buildTimeline(r);
const f = createFrame();
const points: ContactPoint[] = ['heelN', 'toeN', 'midN', 'heelF', 'toeF', 'midF', 'kneeN', 'kneeF', 'handN', 'handF', 'elbowN', 'shoulder', 'seat'];
const fmt = (p: { x: number; y: number }) => `(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`;

console.log(`${id} · ${r.view} · cycle ${tl.total.toFixed(2)} s · cadre ${JSON.stringify(Object.fromEntries(Object.entries(tl.bounds).map(([k, v]) => [k, Math.round(v)])))}`);
r.keyframes.forEach((k, i) => {
  sample(tl, timeOfKeyframe(tl, i) + 1e-6, f);
  console.log(`\npose ${i} (${k.phase}) racine (${f.pose[CH.x]!.toFixed(1)}, ${f.pose[CH.y]!.toFixed(1)}) inclinaison ${f.pose[CH.tilt]!.toFixed(1)}° tête ${fmt(segPoint(f, SEG_INDEX.head, 0.065 * 180, 0))}`);
  console.log('  ' + points.map((p) => `${p} ${fmt(contactWorld(f, r.view, p))}`).join('  '));
});
