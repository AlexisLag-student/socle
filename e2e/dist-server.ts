/**
 * Petit serveur statique propre aux tests de mise à jour : sert le build `dist/` (comme `npm run preview`)
 * et peut « publier une nouvelle version » en changeant les octets de `sw.js`.
 * Playwright ne peut pas intercepter le téléchargement du script du service worker, d'où ce serveur.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import type { AddressInfo } from 'node:net';

const DIST = join(process.cwd(), 'dist');
const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

export interface DistServer {
  url: string;
  /** Les prochains téléchargements de `sw.js` renvoient un script différent (nouvelle version). */
  publishNewVersion(): void;
  close(): Promise<void>;
}

export async function serveDist(): Promise<DistServer> {
  let release = 0;
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
    let file = normalize(join(DIST, path));
    if (!file.startsWith(DIST + sep) && file !== DIST) {
      res.writeHead(403).end();
      return;
    }
    let body: Buffer;
    try {
      body = await readFile(file);
    } catch {
      // Application monopage : toute route inconnue sert index.html.
      file = join(DIST, 'index.html');
      body = await readFile(file);
    }
    if (path === '/sw.js' && release > 0) body = Buffer.concat([body, Buffer.from(`\n// nouvelle version ${release}\n`)]);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(body);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    publishNewVersion: () => void release++,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  };
}
