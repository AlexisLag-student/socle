/**
 * Outils géométriques pour les dessins anatomiques.
 * Les chemins sont écrits en coordonnées absolues avec les commandes M, L, C, Q, Z uniquement,
 * ce qui permet de les refléter (symétrie gauche/droite) et d'en calculer la boîte englobante.
 */

export type Box = { x: number; y: number; w: number; h: number };

const TOKEN = /([MLCQZ])|(-?\d*\.?\d+(?:e-?\d+)?)/gi;

function tokenize(d: string): (string | number)[] {
  const out: (string | number)[] = [];
  for (const m of d.matchAll(TOKEN)) {
    if (m[1]) {
      const c = m[1];
      if (c !== c.toUpperCase()) throw new Error(`Commande relative non supportée : ${c} dans « ${d} »`);
      out.push(c);
    } else out.push(Number(m[2]));
  }
  return out;
}

/** Reflète un chemin autour de l'axe vertical x = axis. */
export function mirrorPath(d: string, axis = 100): string {
  const tokens = tokenize(d);
  const out: string[] = [];
  let coordIndex = 0;
  for (const t of tokens) {
    if (typeof t === 'string') {
      out.push(t);
      coordIndex = 0;
    } else {
      const isX = coordIndex % 2 === 0;
      const v = isX ? 2 * axis - t : t;
      out.push(String(Math.round(v * 100) / 100));
      coordIndex++;
    }
  }
  return out
    .join(' ')
    .replace(/ ?([MLCQZ]) ?/g, '$1')
    .replace(/(\d)([MLCQZ])/g, '$1 $2')
    .trim();
}

/** Boîte englobante approchée (points de contrôle inclus : suffisant pour savoir si un muscle est visible dans un zoom). */
export function pathBBox(d: string): Box {
  const nums = tokenize(d).filter((t): t is number => typeof t === 'number');
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

/** Part de la boîte `a` contenue dans la boîte `b` (0..1). */
export function overlapRatio(a: Box, b: Box): number {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const area = Math.max(a.w * a.h, 1e-6);
  return (ix * iy) / area;
}
