// Petit utilitaire de dev : fusionne un objet de traductions dans fr.json et en.json.
// Usage : node scripts/i18n-add.mjs '<json fr>' '<json en>'
import { readFileSync, writeFileSync } from 'node:fs';
const merge = (a, b) => {
  for (const [k, v] of Object.entries(b)) a[k] = v && typeof v === 'object' && !Array.isArray(v) ? merge(a[k] ?? {}, v) : v;
  return a;
};
for (const [lang, arg] of [['fr', process.argv[2]], ['en', process.argv[3]]]) {
  const f = `src/i18n/locales/${lang}.json`;
  const data = merge(JSON.parse(readFileSync(f, 'utf8')), JSON.parse(arg));
  writeFileSync(f, JSON.stringify(data, null, 2) + '\n');
}
console.log('ok');
