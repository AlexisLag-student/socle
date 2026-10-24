/**
 * Génère PROFILES_REPORT.md : le programme produit par le moteur pour 10 profils variés,
 * avec la vérification des invariants. Usage : npm run profiles:report
 */
import { writeFileSync } from 'node:fs';
import { content, CONTENT_VERSION, exerciseById, pathologyById } from '../src/content/index';
import { ENGINE_VERSION, generateProgram } from '../src/engine/generate';
import { checkInvariants } from '../src/engine/invariants';
import { exerciseWorkSeconds } from '../src/engine/duration';
import { TEST_PROFILES } from '../src/engine/profiles';
import type { Dosage } from '../src/domain/schema';
import type { ItemReason } from '../src/domain/user';

const EQUIP: Record<string, string> = Object.fromEntries(content.equipment.map((e) => [e.id, e.name.fr]));
const PHASE: Record<string, string> = { irritable: 'irritable', rebuild: 'reconstruction', 'return-to-sport': 'retour au sport' };
const SPORT: Record<string, string> = { run: 'course', bike: 'vélo' };
const OBJ: Record<string, string> = { prevention: 'prévention', performance: 'performance', return: 'reprise', pain: 'douleur actuelle', strength: 'force', power: 'puissance', 'running-economy': 'économie de course', 'sprint-fv': 'sprint / force-vélocité' };

const dose = (d: Dosage) =>
  `${d.sets} × ${d.holdSec ? `${d.holdSec} s` : d.reps ? (d.reps[0] === d.reps[1] ? d.reps[0] : `${d.reps[0]}–${d.reps[1]}`) : ''}${d.perSide ? ' /côté' : ''}${d.tempo ? `, tempo ${d.tempo}` : ''}, repos ${d.restSec} s`;
const reason = (r: ItemReason) =>
  r.kind === 'pathology' ? `pathologie : ${pathologyById.get(r.ref)?.name.fr ?? r.ref}` : r.kind === 'objective' ? `objectif : ${OBJ[r.ref] ?? r.ref}` : r.kind === 'prevention' ? `prévention (${r.ref.split('+').map((s) => SPORT[s]).join(', ')})` : r.kind;

const lines: string[] = [
  '# Rapport : programmes générés pour 10 profils',
  '',
  `Généré par \`npm run profiles:report\` le ${new Date().toISOString().slice(0, 10)} — moteur v${ENGINE_VERSION}, contenu ${CONTENT_VERSION} (${content.exercises.length} exercices, ${content.pathologies.length} pathologies).`,
  '',
  'Pour chaque profil, le moteur (fonction pure `generateProgram`) produit les séances types ; les **invariants** suivants sont vérifiés automatiquement (et dans `src/engine/real-content.test.ts`, avec 60 profils supplémentaires) :',
  '',
  '- une séance type par séance hebdomadaire (1 → A … 5 → A à E) ;',
  '- nombre d’exercices selon la durée (15 min : 3–4, 30 min : 4–6, 45 min : 4–8, 1 h : 6–12), durée estimée repos compris (entre les séries et entre les exercices) ≤ durée choisie + 10 % ;',
  '- à partir de 4 séances : deux séances voisines dans la rotation (E précède A) ne partagent ni un exercice qui demande de la récupération, ni son groupe musculaire principal ; séances types toutes différentes ;',
  '- matériel respecté (variante et niveau accessibles), sport respecté ;',
  '- pas deux exercices de la même famille dans une séance, pas trois de suite sur le même groupe musculaire ;',
  '- exercices « à éviter » de la phase exclus, plafond de niveau de la phase respecté ;',
  '- exercices essentiels (priorité 1) des pathologies présents (ou leur équivalent de même famille).',
  '',
];

let allOk = true;
for (const { label, profile } of TEST_PROFILES) {
  const r = generateProgram(profile, content);
  const inv = checkInvariants(profile, r, content);
  allOk &&= inv.ok;
  lines.push(`## ${label}`, '');
  lines.push(
    `- **Sport** : ${profile.sports.map((s) => SPORT[s]).join(' + ')} · **objectifs** : ${profile.objectives.map((o) => OBJ[o]).join(', ')}${profile.perfGoals.length ? ` (${profile.perfGoals.map((g) => OBJ[g]).join(', ')})` : ''}`,
    `- **Douleurs** : ${r.pathologies.length ? r.pathologies.map((p) => `${pathologyById.get(p.id)?.name.fr} — phase ${PHASE[p.phase]}`).join(' ; ') : 'aucune'}`,
    `- **Matériel** : ${['bodyweight', ...profile.equipment].map((e) => EQUIP[e]).join(', ')} · **disponibilité** : ${profile.sessionsPerWeek} × ${profile.minutes} min`,
    `- **Avertissements du moteur** : ${r.warnings.length ? r.warnings.map((w) => `${w.kind}${w.ref ? ` (${w.ref})` : ''}`).join(', ') : 'aucun'}`,
    `- **Invariants** : ${inv.ok ? '✅ tous respectés' : `❌ ${inv.issues.join(' ; ')}`}`,
    '',
  );
  for (const s of r.sessions) {
    lines.push(`**Séance ${s.key}** — ${s.items.length} exercices, ~${Math.round(s.estimatedSec / 60)} min`, '');
    lines.push('| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |', '|---|---|---|---|---|---|---|');
    s.items.forEach((it, i) => {
      const ex = exerciseById.get(it.exerciseId)!;
      const lvl = ex.levels.find((l) => l.level === it.level)!;
      const v = ex.variants.find((x) => x.id === it.variantId)!;
      lines.push(
        `| ${i + 1} | ${ex.name.fr} | ${it.level}/${ex.levels.length} — ${lvl.name.fr} | ${v.name.fr} | ${dose(it.dosage)} (~${Math.round(exerciseWorkSeconds(it.dosage) / 60)} min) | ${reason(it.reason)} | ${ex.evidence.level} |`,
      );
    });
    lines.push('');
  }
}

lines.push('## Bilan', '', allOk ? '✅ Les 10 profils produisent des programmes qui respectent tous les invariants.' : '❌ Au moins un profil ne respecte pas les invariants (voir ci-dessus).', '');
writeFileSync('PROFILES_REPORT.md', lines.join('\n'));
console.log(allOk ? '✅ PROFILES_REPORT.md écrit — invariants respectés' : '❌ PROFILES_REPORT.md écrit — invariants NON respectés');
if (!allOk) process.exitCode = 1;
