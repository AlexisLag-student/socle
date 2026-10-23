# Socle

**Le renforcement musculaire des coureurs et des cyclistes, fondé sur les preuves.**

En ligne : https://socle-rcvo.vercel.app

Socle est une Progressive Web App (PWA) hors ligne, sans compte ni serveur :

- **Mode sportif** : l'utilisateur indique son sport, ses objectifs, ses douleurs (carte du corps cliquable ou liste), sa phase, son matériel et sa disponibilité. Un moteur de recommandation génère un programme personnalisé (séances A/B/C).
- **Mode praticien** : un kiné ou un préparateur compose un programme depuis la bibliothèque, ajuste les dosages, ajoute des notes et le partage par un **lien** (ou un QR code). Le patient ouvre le lien et le programme s'enregistre sur son appareil.
- **Séance guidée** : minuteur lisible de loin, indicateur de tempo visuel et sonore, suivi des séries et des charges, retour facile / correct / trop dur, puis **propositions de progression** que l'utilisateur accepte ou refuse.
- **Contenu** : 114 exercices et 25 pathologies, avec **172 références scientifiques vérifiées** sur PubMed/Crossref et un badge de niveau de preuve. Chaque exercice a un schéma musculaire SVG original (silhouette, zoom et légende).
- Historique, graphiques, rappels (notifications + export calendrier `.ics`), impression/PDF, FR/EN, thème clair/sombre, sauvegarde JSON.

> ⚠️ Socle propose des exercices à titre informatif. L'app ne pose pas de diagnostic et ne remplace pas l'avis d'un médecin ou d'un kinésithérapeute.

---

## Démarrer

Prérequis : Node.js ≥ 22.

```bash
npm ci
```

```bash
npm run dev
```

L'app est servie sur http://localhost:5173. Le service worker n'est actif que sur le build de production (`npm run build`, puis `npm run preview` sur http://localhost:4173).

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Valide le contenu, vérifie les types, construit `dist/` (PWA comprise) |
| `npm run preview` | Sert le build de production |
| `npm test` | Tests unitaires (Vitest) : moteur, progression, liens de partage, contenu, .ics… |
| `npm run e2e` | Tests de bout en bout (Playwright, Chromium mobile + WebKit). Lancer `npx playwright install --with-deps chromium webkit` la première fois |
| `E2E_BASE_URL=https://socle-rcvo.vercel.app npm run e2e` | Mêmes tests e2e sur le site déployé |
| `npm run screens` | Captures de contrôle visuel (mobile clair/sombre, EN, tablette, ordinateur, impression) dans `design/rendus/` |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run validate:content` | Valide tout le contenu (schémas Zod + contrôles croisés) |
| `npm run refs:check` | Vérifie toutes les références sur PubMed/Crossref et régénère `REFERENCES_CHECK.md` |
| `npm run profiles:report` | Génère `PROFILES_REPORT.md` (programmes obtenus pour 10 profils + invariants) |

## Architecture

```
src/
  domain/      ids.ts (identifiants), schema.ts (Zod du contenu), user.ts (données locales)
  content/     muscles, matériel, références, exercices, pathologies — organisés par zone (zones/*.ts)
  engine/      moteur de recommandation (fonction pure), progression, invariants, profils de test
  share/       codec des liens de partage (versionné, liens figés en tests)
  db/          IndexedDB (Dexie) : profil, programmes, séances, progression, sauvegarde
  components/  ui (composants de base), anatomy (silhouettes SVG, MuscleMap, carte du corps)
  features/    écrans : accueil, parcours, fiche programme, séance, historique, bibliothèque,
               pathologies, bibliographie, praticien, import, réglages
  i18n/        i18next, fichiers fr.json / en.json
scripts/       validation du contenu, vérification des références, rapport des profils, icônes
e2e/           tests Playwright
.claude/skills add-exercise, add-pathology, verify-reference
```

Identité visuelle : « cahier d'entraînement » (papier Seyès, encre bleue, stylo rouge, annotations manuscrites, tampons de preuve). Référence dans `design/` (maquettes HTML et captures) ; toutes les couleurs sont des variables de `src/styles/tokens.css`, contrastes vérifiés par `src/styles/contrast.test.ts`.

Choix techniques : Vite + React 19 + TypeScript strict, vite-plugin-pwa (Workbox), Zod, Dexie, i18next, lz-string, uPlot, Vitest, Playwright. Le détail et la justification des choix sont dans [`DECISIONS.md`](DECISIONS.md).

## Contenu scientifique

- Le contenu est écrit en TypeScript dans `src/content/` : `exercises/*.ts`, `pathologies/*.ts` et `references/*.ts`, regroupés par zone dans `zones/*.ts`. Il est validé par Zod et par des **contrôles croisés**. Le build échoue si :
  - un exercice est incomplet ou mal traduit ;
  - un muscle n'existe pas ou n'est pas dessiné dans le zoom de l'exercice ;
  - une référence est inconnue, sans DOI/PMID/URL, ou le niveau de preuve est incohérent avec les études citées.
- **Aucune référence n'est inventée.** Les métadonnées viennent de PubMed/Crossref (`npm run refs:check -- --lookup-pmid …`), et chaque phrase « ce que l'étude a montré » a été relue sur le résumé. Le statut de chaque source est dans [`REFERENCES_CHECK.md`](REFERENCES_CHECK.md). La relecture indépendante est documentée dans [`docs/REVIEW_NOTES.md`](docs/REVIEW_NOTES.md).
- Guide de rédaction : [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

### Ajouter un exercice

Suivre le skill [`.claude/skills/add-exercise/SKILL.md`](.claude/skills/add-exercise/SKILL.md) (gabarit : `template.ts`). En résumé :

1. Vérifier qu'il n'existe pas déjà (`grep -rn "id: '" src/content/exercises`).
2. Ajouter un `defineExercise({...})` dans le fichier `src/content/exercises/<groupe>.ts` de la bonne zone. Un nouveau fichier doit être importé dans `src/content/zones/<zone>.ts`.
3. Renseigner tous les champs, en FR et EN :
   - muscles (ids de `src/domain/ids.ts`) ;
   - 3 à 5 niveaux avec dosage et critère de maîtrise ;
   - variantes de matériel ;
   - précautions ;
   - références vérifiées (skill `verify-reference`) et niveau de preuve.
4. Le rendre atteignable par le moteur : phase de pathologie, `preventionFor`, ou `objectives: ['performance']` + `perfGoals`.
5. Lancer `npm run validate:content`, `npm test` et `npm run refs:check -- --id <ref>`.

### Ajouter une pathologie

Suivre le skill [`.claude/skills/add-pathology/SKILL.md`](.claude/skills/add-pathology/SKILL.md). Créer `src/content/pathologies/<id>.ts` avec `definePathology({...})`, puis l'importer dans `src/content/zones/<zone>.ts`. La fiche doit :

- utiliser un langage **non diagnostique** ;
- lister ses zones de la carte du corps (`bodyAreas`) ;
- avoir des phases dans l'ordre (irritable → reconstruction → retour), chacune avec au moins 2 exercices et des critères de passage ;
- inclure une section « Quand consulter » et des références vérifiées.

Une pathologie qui exige un feu vert médical a `medicalClearanceRequired: true` et seulement la phase de retour.

### Vérifier une référence

Suivre le skill [`.claude/skills/verify-reference/SKILL.md`](.claude/skills/verify-reference/SKILL.md) :

```bash
npm run refs:check -- --search "heavy slow resistance achilles"
```

```bash
npm run refs:check -- --lookup-pmid 26018970
```

```bash
npm run refs:check -- --abstract 26018970
```

## Données et confidentialité

- Toutes les données (profil, programmes, séances, progression) restent sur l'appareil, dans IndexedDB. Les préférences légères (langue, thème) sont dans localStorage. Il n'y a aucun appel réseau vers un service tiers, et la police est auto-hébergée.
- Les données s'exportent et s'importent en JSON depuis les Réglages.
- **Lien de partage** : `https://<site>/#share=<version>.<programme compressé lz-string>`. Le fragment `#` n'est jamais envoyé au serveur. Chaque version du format a son décodeur ; des liens v1 figés dans les tests garantissent qu'un ancien lien reste lisible. Pour renommer un exercice publié, ajouter l'ancien id dans `src/content/aliases.ts`.
- **Rappels** : sans serveur, une notification n'est possible que si l'app est ouverte ou installée (sur iPhone, seulement une fois ajoutée à l'écran d'accueil). L'export `.ics` est la solution fiable.

## Déployer (Vercel)

Le déploiement est fait par la GitHub Action [`.github/workflows/ci-deploy.yml`](.github/workflows/ci-deploy.yml). À chaque push sur `main`, elle enchaîne typecheck → lint → validation du contenu → Vitest → build → Playwright → `vercel deploy --prebuilt --prod`. Le déploiement Git automatique de Vercel est désactivé (`vercel.json`), pour que seul du code testé parte en production.

Mise en place, une seule fois :

1. Créer un dépôt GitHub et y pousser le projet.
2. Sur vercel.com : *Add New → Project* → importer le dépôt (framework Vite détecté, sortie `dist`).
3. Créer un jeton sur https://vercel.com/account/tokens.
4. Dans GitHub, aller dans *Settings → Secrets and variables → Actions* et ajouter :
   - `VERCEL_TOKEN` (le jeton) ;
   - `VERCEL_ORG_ID` (identifiant d'équipe/compte, dans les réglages Vercel) ;
   - `VERCEL_PROJECT_ID` (*Project Settings → General*).
5. Pousser sur `main` : la CI teste puis déploie.

`vercel.json` gère la réécriture SPA (routes React) et les en-têtes de cache. `sw.js` et `index.html` ne sont jamais mis en cache, ce qui garantit les mises à jour de la PWA.
