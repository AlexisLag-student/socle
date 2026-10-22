/**
 * Aperçu des dessins anatomiques (outil de développement) :
 *   npx tsx --tsconfig tsconfig.node.json scripts/preview-anatomy.ts [--dark] [--muscle soleus,glute-med]
 * Produit preview-anatomy.png (ignoré par git) avec toutes les vues et tous les zooms.
 */
import { chromium } from '@playwright/test';
import { buildFigure, type FigureShape } from '../src/components/anatomy/figure';
import { zooms } from '../src/components/anatomy/drawings/registry';
import { MUSCLE_IDS, type MuscleId } from '../src/domain/ids';

const dark = process.argv.includes('--dark');
const mi = process.argv.indexOf('--muscle');
const primary = (mi > 0 ? process.argv[mi + 1]!.split(',') : []) as MuscleId[];
const showAll = primary.length === 0;

const colors = dark
  ? { bg: '#0f171d', base: '#26313b', neutral: '#3a4653', primary: '#ff6b5e', secondary: '#d98c99', stroke: '#0f171d', detail: '#5c6b79' }
  : { bg: '#ffffff', base: '#eef1f4', neutral: '#d5dbe1', primary: '#d92d20', secondary: '#f4a3b0', stroke: '#ffffff', detail: '#9aa6b2' };

// En mode « tout voir », chaque muscle reçoit une teinte pour vérifier les formes.
const hue = (id: string) => (MUSCLE_IDS.indexOf(id as MuscleId) * 47) % 360;

function shapeSvg(s: FigureShape): string {
  if (s.kind === 'base') return `<path d="${s.d}" fill="${colors.base}"/>`;
  if (s.kind === 'detail') return `<path d="${s.d}" fill="none" stroke="${colors.detail}" stroke-width="0.6"/>`;
  const fill = showAll
    ? `hsl(${hue(s.muscle!)} 60% 62%)`
    : s.role === 'primary' ? colors.primary : s.role === 'secondary' ? colors.secondary : colors.neutral;
  const deep = s.deep ? ` stroke-dasharray="2 1.5" stroke="${s.role === 'primary' ? colors.primary : '#444'}" fill-opacity="0.55"` : ` stroke="${colors.stroke}"`;
  return `<path d="${s.d}" fill="${fill}" stroke-width="0.6"${deep}><title>${s.muscle}</title></path>`;
}

function svg(fig: ReturnType<typeof buildFigure>, label: string, w: number) {
  return `<figure style="margin:8px;display:inline-block;text-align:center;font:12px sans-serif;color:${dark ? '#ccc' : '#333'}">
    <svg viewBox="${fig.viewBox}" width="${w}" style="background:${colors.bg};border:1px solid #8884">${fig.shapes.map(shapeSvg).join('')}</svg>
    <figcaption>${label}</figcaption></figure>`;
}

const opts = { primary, showAllDeep: showAll };
const parts = [
  svg(buildFigure('front', opts), 'front', 300),
  svg(buildFigure('back', opts), 'back', 300),
  svg(buildFigure('sole', opts), 'sole', 150),
  ...Object.entries(zooms).map(([z, def]) => svg(buildFigure(def.drawing, { ...opts, box: def.box }), z, 200)),
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 1.5 });
await page.setContent(`<body style="margin:0;background:${colors.bg}">${parts.join('')}</body>`);
await page.screenshot({ path: 'preview-anatomy.png', fullPage: true });
await browser.close();
console.log('preview-anatomy.png');
