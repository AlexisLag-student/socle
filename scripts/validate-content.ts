/**
 * Valide tout le contenu (schémas Zod + contrôles croisés). Lancé avant chaque build :
 * le build échoue si un exercice est incomplet, si un muscle n'existe pas dans les schémas,
 * ou si une référence n'a ni DOI ni lien.
 */
import { content } from '../src/content/index';
import { contentStats, validateContent } from '../src/content/validate';
import { drawnMuscles } from '../src/components/anatomy/drawings/registry';

const { errors, warnings } = validateContent(content, drawnMuscles());
const strict = process.argv.includes('--strict');

for (const w of warnings) console.warn(`⚠️  ${w}`);
for (const e of errors) console.error(`❌ ${e}`);
console.log('\nContenu :', JSON.stringify(contentStats(content)));
if (errors.length || (strict && warnings.length)) {
  console.error(`\n${errors.length} erreur(s), ${warnings.length} avertissement(s). Validation échouée.`);
  process.exit(1);
}
console.log(`✅ Contenu valide (${warnings.length} avertissement(s)).`);
