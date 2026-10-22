// Liste les clés i18n utilisées dans le code (t('...')) et absentes de fr.json. Les clés dynamiques (`...${x}`) sont signalées à part.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const fr = JSON.parse(readFileSync('src/i18n/locales/fr.json', 'utf8'));
const has = (k) => k.split('.').reduce((o, p) => (o && typeof o === 'object' ? o[p] : undefined), fr) !== undefined;
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(p) && !p.includes('.test.') && files.push(p); });
walk('src');
const missing = new Set(), dynamic = new Set();
for (const f of files) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\bt\(\s*(['`])([^'`]+)\1/g)) {
    const key = m[2];
    if (key.includes('${')) dynamic.add(`${key}   (${f})`);
    else if (!has(key) && !has(key + '_one')) missing.add(key);
  }
}
console.log('MISSING:\n' + [...missing].sort().join('\n'));
console.log('\nDYNAMIC:\n' + [...dynamic].sort().join('\n'));
