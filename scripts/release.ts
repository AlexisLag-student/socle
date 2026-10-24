/**
 * Publie une version, sur demande seulement : npm run release -- <patch|minor|major> [--message "résumé"] [--dry-run]
 *
 * La section « À venir » de CHANGELOG.md devient l'entrée `## [x.y.z] — AAAA-MM-JJ`, package.json et
 * package-lock.json passent à x.y.z, puis le script crée le commit « Version x.y.z : résumé » et le tag vX.Y.Z.
 * Rien n'est poussé : la mise en production part du push du tag (.github/workflows/ci-deploy.yml).
 * Refuse un dépôt avec des changements non validés, une section « À venir » vide ou un tag déjà pris.
 */
import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { releaseChangelog, unreleasedNotes } from '../src/lib/changelog';

const LEVELS = ['patch', 'minor', 'major'] as const;
type Level = (typeof LEVELS)[number];

const args = process.argv.slice(2);
const level = args[0] as Level;
const dryRun = args.includes('--dry-run');
const mi = args.indexOf('--message');
const summary = mi > 0 ? args[mi + 1]?.trim() : undefined;

function fail(message: string): never {
  console.error(`❌ ${message}`);
  process.exit(1);
}

const git = (...a: string[]) => execFileSync('git', a, { encoding: 'utf8' }).trim();

function bump(version: string, l: Level): string {
  const [major, minor, patch] = version.split('.').map(Number) as [number, number, number];
  if (l === 'major') return `${major + 1}.0.0`;
  if (l === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

if (!LEVELS.includes(level)) fail('Niveau attendu : npm run release -- <patch|minor|major> [--message "résumé"] [--dry-run]');
if (mi > 0 && !summary) fail('--message attend un résumé.');
if (!dryRun && git('status', '--porcelain')) fail('Le dépôt a des changements non validés : faites-en un commit avant de publier.');

const md = readFileSync('CHANGELOG.md', 'utf8');
const notes = unreleasedNotes(md);
if (!notes?.fr.length || !notes.en.length) fail('La section « À venir » de CHANGELOG.md doit avoir des puces en français et en anglais.');

const current = (JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }).version;
const version = bump(current, level);
const tag = `v${version}`;
if (git('tag', '--list', tag)) fail(`Le tag ${tag} existe déjà.`);

// Date locale de l'utilisateur, au format AAAA-MM-JJ.
const date = new Date().toLocaleDateString('sv-SE');
const released = releaseChangelog(md, version, date);

console.log(`${current} → ${version} (${level}), ${date}`);
for (const n of notes.fr) console.log(`  - ${n}`);
if (dryRun) {
  console.log('\n(--dry-run : rien n’a été modifié)');
  process.exit(0);
}

// npm met aussi package-lock.json à jour ; execSync passe par le shell (npm.cmd sous Windows).
execSync(`npm version ${level} --no-git-tag-version`, { stdio: 'ignore' });
const written = (JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }).version;
if (written !== version) fail(`npm version a écrit ${written}, ${version} était attendu.`);
writeFileSync('CHANGELOG.md', released);

git('add', 'package.json', 'package-lock.json', 'CHANGELOG.md');
git('commit', '-m', summary ? `Version ${version} : ${summary}` : `Version ${version}`);
git('tag', tag);

const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
console.log(`\n✅ Commit et tag ${tag} créés. Pour mettre en production :`);
if (branch !== 'main') console.log(`   (branche ${branch} : fusionnez-la d’abord dans main)`);
console.log(`   git push origin main ${tag}`);
