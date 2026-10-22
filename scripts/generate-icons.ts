/**
 * Génère les icônes PNG de la PWA à partir de public/favicon.svg.
 * Utilise Playwright (déjà présent pour les tests e2e) comme moteur de rendu : aucune dépendance native.
 * Usage : npx tsx scripts/generate-icons.ts
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg', 'utf8');
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

// Version « maskable » : fond plein bord à bord, pictogramme réduit dans la zone de sécurité (80 %).
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0f5f5a"/>
  <g transform="translate(76.8 76.8) scale(0.7)">${inner.replace(/<rect width="512"[^>]*\/>/, '')}</g>
</svg>`;

const targets: { file: string; size: number; svg: string }[] = [
  { file: 'public/pwa-192.png', size: 192, svg },
  { file: 'public/pwa-512.png', size: 512, svg },
  { file: 'public/pwa-maskable-512.png', size: 512, svg: maskable },
  { file: 'public/apple-touch-icon.png', size: 180, svg: maskable },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const t of targets) {
  await page.setViewportSize({ width: t.size, height: t.size });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${t.svg.replace('<svg ', `<svg width="${t.size}" height="${t.size}" `)}</body></html>`,
  );
  writeFileSync(t.file, await page.screenshot({ omitBackground: true }));
  console.log('✓', t.file);
}
await browser.close();
