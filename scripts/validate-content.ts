/**
 * Valide tout le contenu (schémas Zod + contrôles croisés). Lancé avant chaque build :
 * le build échoue si un exercice est incomplet, si un muscle n'existe pas dans les schémas,
 * si une référence n'a ni DOI ni lien, ou si une animation d'exercice sort des bornes articulaires,
 * décolle un appui du sol ou ne respecte pas le tempo.
 *
 * Mode rédaction : CONTENT_WIP=1 npm run validate:content
 *   → un exercice réservé (src/content/catalog.ts) cité mais pas encore écrit n'est qu'un avertissement.
 * Options : --strict (avertissements = erreurs), --only <motif> (n'affiche que les messages contenant le motif).
 */
import { content, exerciseById } from '../src/content/index';
import { contentStats, validateContent } from '../src/content/validate';
import { drawnMuscles } from '../src/components/anatomy/drawings/registry';
import { SHARED_EXERCISES } from '../src/content/catalog';
import { animationLoaders } from '../src/animation/loaders';
import { validateAnimation } from '../src/animation/validate';

const wip = process.env.CONTENT_WIP === '1';
const strict = process.argv.includes('--strict');
const oi = process.argv.indexOf('--only');
const only = oi > 0 ? process.argv[oi + 1] : undefined;

const drawn = drawnMuscles();
const { errors, warnings } = validateContent(content, drawn, {
  planned: wip ? new Set(Object.keys(SHARED_EXERCISES)) : undefined,
});

// Animations (src/animation/data) : schéma, bornes articulaires, appuis au sol, continuité, tempo.
const drawnAll = new Set([...drawn.front!, ...drawn.back!, ...drawn.sole!]);
for (const [id, load] of Object.entries(animationLoaders)) {
  if (!exerciseById.has(id)) errors.push(`animation ${id} : aucun exercice ne porte cet identifiant`);
  else errors.push(...validateAnimation((await load()).default, exerciseById, drawnAll));
}
const show = (m: string) => !only || m.includes(only);

for (const w of warnings.filter(show)) console.warn(`⚠️  ${w}`);
for (const e of errors.filter(show)) console.error(`❌ ${e}`);
console.log('\nContenu :', JSON.stringify(contentStats(content)), `· ${Object.keys(animationLoaders).length} animations`);
if (errors.length || (strict && warnings.length)) {
  console.error(`\n${errors.length} erreur(s), ${warnings.length} avertissement(s). Validation échouée.`);
  process.exit(1);
}
console.log(`✅ Contenu valide (${warnings.length} avertissement(s))${wip ? ' — mode rédaction' : ''}.`);
