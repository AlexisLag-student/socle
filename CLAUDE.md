# Socle — consignes pour Claude

Socle est une PWA de renforcement musculaire pour coureurs et cyclistes : hors ligne, sans compte ni serveur, tout est stocké sur l'appareil. Présentation et commandes : [README.md](README.md) ; choix techniques justifiés : [DECISIONS.md](DECISIONS.md) ; rédaction du contenu : [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Règle permanente : version et journal

À chaque évolution : mets à jour la version dans package.json selon le versionnage sémantique (correctif = bug corrigé, mineur = fonctionnalité ou contenu ajouté sans rien casser, majeur = changement qui casse l'existant, par exemple les liens de partage) et ajoute une entrée datée dans CHANGELOG.md, en français et en anglais.

- `npm version <patch|minor|major> --no-git-tag-version` (package-lock suit), puis tag git `vX.Y.Z` sur le commit.
- Entrée en tête de [CHANGELOG.md](CHANGELOG.md), format lu par l'app (Réglages › Nouveautés) : `## [x.y.z] — AAAA-MM-JJ`, puis `### Français` et `### English`, chacun avec des puces `- …` écrites pour l'utilisateur (pas de jargon technique). `src/lib/changelog.test.ts` échoue si la première entrée ne correspond pas à `package.json`.
- Le contenu (exercices, pathologies, références) a en plus son propre `CONTENT_VERSION` (`AAAA.MM.n`) dans `src/content/index.ts`.
- La version est injectée au build (`__APP_VERSION__`, `define` dans `vite.config.ts`) : ne jamais l'écrire en dur.
- Un push sur `main` déploie en production (Vercel) : ne jamais pousser soi-même, donner à l'utilisateur la commande à lancer (ex. `git push origin main vX.Y.Z`).
- La CI tourne dans l'image `mcr.microsoft.com/playwright:v<version>-noble` : toute mise à jour de `@playwright/test` doit changer cette image dans `.github/workflows/ci-deploy.yml`.

## Architecture

```
src/
  app/         coquille (Layout, routes dans App.tsx), préférences (prefs.ts), hooks Dexie (hooks.ts),
               mise à jour PWA (PwaUpdate.tsx), signal « séance en cours » (sessionActivity.ts)
  features/    un dossier par écran (accueil, parcours, programme, séance guidée, historique, bibliothèque,
               pathologies, bibliographie, praticien, import, réglages + Nouveautés)
  content/     exercices, pathologies, références, organisés par zone (zones/*.ts), validés par Zod
  domain/      identifiants (ids.ts), schémas du contenu (schema.ts), données utilisateur (user.ts)
  engine/      moteur de recommandation (fonctions pures), progression, invariants
  animation/   animations des exercices : squelette, schéma Zod, moteur pur, zones musculaires, validation,
               chargeurs (loaders.ts) et une animation par exercice (data/<id>.ts)
  share/       codec des liens de partage (versionné ; les liens publiés doivent rester lisibles)
  db/          IndexedDB via Dexie (profil, programmes, séances, progression, kv) ; schéma : nouvelle version(), jamais modifier une version publiée
  components/  ui/ (composants de base), anatomy/ (silhouettes SVG, MuscleMap, carte du corps),
               animation/ (ExerciseAnimation, vignette, personnage SVG, lecteur)
  i18n/        i18next, locales/fr.json et locales/en.json
  lib/         utilitaires (rappels, .ics, appareil, minuteur, changelog)
scripts/       validation du contenu (+ animations), vérification des références, rapport des profils, sonde d'animation
e2e/           Playwright (mobile Chromium + WebKit) ; visual.spec.ts = captures (`npm run screens`)
.claude/skills add-exercise, add-pathology, verify-reference
```

PWA : vite-plugin-pwa (Workbox, `generateSW`) en `registerType: 'prompt'`. Une nouvelle version affiche le bandeau « Nouvelle version disponible » (Recharger / Plus tard), jamais pendant une séance guidée, et l'app vérifie les mises à jour au retour au premier plan.

## Animations des exercices

Chaque exercice animé montre son mouvement : personnage au trait (squelette 2D en cinématique directe), interpolé entre quelques poses clés à la fréquence d'affichage. Choix justifiés : `DECISIONS.md` n° 51 à 65.

- **Données** : `src/animation/data/<exerciseId>.ts` (`defineAnimation`, schéma `src/animation/schema.ts`), inscrite dans `src/animation/loaders.ts` (chargement paresseux, un fichier par exercice, précaché). Le schéma des exercices ne change pas.
- **Pose** : objet partiel, hérité de la pose précédente (la première part de la pose neutre debout). Canaux : `tilt` (inclinaison du bassin, + = vers l'avant), `trunk`, `neck`, `head`, et par côté `shoulder`, `elbow`, `wrist`, `hip`, `knee`, `ankle` avec le suffixe `N` (côté proche, celui qui travaille) ou `F` (éloigné) ; sans suffixe = les deux côtés. Profil, personnage tourné vers la droite : flexion positive (cheville + = flexion dorsale). Face : abduction positive, raccourci `fs_<segment>` (0,05 à 1) pour un membre pointé vers l'observateur. `x`, `y` = décalage de la racine (envol d'un saut).
- **Bornes** (`JOINT_BOUNDS`, `src/animation/skeleton.ts`) : genou et coude 0–150°, hanche −30–140°, cheville −50–30°… Hors bornes = build en échec. Le plus court chemin est utilisé entre deux poses : au-delà de 180° d'écart, ajouter une pose intermédiaire.
- **Poses clés** : `dur` (secondes vers la pose suivante), `phase` (`excentrique`, `pause`, `concentrique`, `isométrique`, `retour`), `ease`, `say` (annotation : `lower`, `brake`, `hold`, `push`, `rise`, `return`, `land`, `jump`, `step`, `lift`), `anchor` (appui qui place la racine pendant ce passage). Si un niveau a un tempo, n'utiliser que excentrique / pause / concentrique (les durées sont recalées sur le tempo).
- **Appuis** : `anchor` (point fixe, `y` = hauteur de la surface), `ik` (jambe ou bras recalé pour garder un pied/une main fixe, `flat: true` pour un pied à plat), `contacts` (points vérifiés au sol, fenêtre `from`/`to` qui peut faire le tour du cycle). Pied à plat sans IK : cheville = genou − hanche + inclinaison.
- **Matériel et niveaux** : `props` (haltère, kettlebell, barre, bâton attachés à un segment ; élastique entre deux points ; marche, banc, chaise, mur, box, tapis, cale, ballon dans le décor) ; `overrides` par `levels` / `variants` : matériel ajouté, retouche de pose, ou nouvelles poses clés **seulement si le mouvement change**.
- **Muscles** : repris de l'exercice (rôles compris), jamais ajoutés ; `muscles` ne sert qu'à en retirer. Zones par vue : `src/animation/zones.ts`.
- **Ajouter l'animation d'un exercice** : 1) lire « Mise en place », « Mouvement », « Consignes », « Erreurs », niveaux et variantes ; 2) écrire les poses (amplitude et alignements exactement comme le texte ; en cas de doute, version prudente notée dans `DECISIONS.md`) ; 3) inscrire le chargeur ; 4) `npm run anim:probe -- <id> [niveau] [variante]` pour régler les appuis, puis `/dev/animations?id=<id>` (lecture, curseur image par image, angles, poses superposées, appuis qui décollent) ; 5) `npm run validate:content` et `npx vitest run src/animation`.
- **Intégrations** : `<ExerciseAnimation>` (fiche, séance guidée synchronisée sur `TempoClock`, aperçu praticien), `<AnimationThumb>` (bibliothèque, compositeur). Sans animation, l'écran reste inchangé. Mouvements réduits : bande de poses clés, jamais de lecture automatique.
- **Performance** : aucune mise à jour React par image (transformations SVG modifiées directement), un seul lecteur actif, pause hors écran ou onglet caché.

## Conventions

- TypeScript strict, React 19, CSS Modules (`*.module.css`), alias `@/` → `src/`.
- Aucun texte en dur dans l'interface : toujours une clé dans `fr.json` **et** `en.json` (vouvoiement en français, anglais naturel). Apostrophe typographique `’` dans les textes affichés.
- Commentaires et messages de commit en français.
- Données personnelles uniquement en local (IndexedDB, localStorage) ; aucune requête vers un serveur tiers.
- Avant de rendre la main : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run e2e` (Chromium + WebKit, sur le build de preview). Captures de contrôle : `npm run screens` → `design/rendus/`.

## Design « cahier d'entraînement »

Toutes les valeurs sont des variables de [src/styles/tokens.css](src/styles/tokens.css) : n'utiliser que ces tokens (contrastes vérifiés par `src/styles/contrast.test.ts`). Maquettes de référence dans `design/maquettes/`.

- **Couleurs** : `--paper` (fond papier), `--surface`, `--ink` (encre bleue : texte fort, traits, boutons), `--text`, `--text-2`, `--text-muted`, `--red` (stylo rouge : accent, état actif), `--red-soft`, `--red-faint`, `--line-main` / `--line-sub` (lignes Seyès), `--margin-line` (marge rouge, décor), `--stamp-strong` / `--stamp-low` (tampons de preuve), `--on-ink`. `--disabled` et `--margin-line` sont décoratifs, jamais pour du texte.
- **Thème sombre** « papier carbone » : mêmes noms de tokens, redéfinis selon `prefers-color-scheme` (sauf choix « clair ») ou `data-theme="dark"`. Ne jamais coder une couleur en dur.
- **Typographie** : `--font-title` Zilla Slab (titres, chiffres), `--font-body` Atkinson Hyperlegible (texte), `--font-hand` Caveat (annotations seulement : dates, charges, ressentis, légendes ; jamais sous 20 px, jamais pour une consigne de sécurité).
- **Formes** : `--stroke` 2 px, `--radius` 4 px, ombres pleines décalées `--shadow-ink` / `--shadow-red` (une seule ombre pleine par écran, sauf la séance guidée), focus `--focus`.
- **Grille Seyès** : `--line` 32 px, `--subline` 8 px, marge rouge à `--margin-x`, gouttières `--gutter-left` / `--gutter-right`, colonne `--column`. Option « Papier uni » → `data-paper="plain"`.
- **Espacements** : `--space-1` à `--space-7` (4 → 48 px), cible tactile `--tap` 48 px.
- **Composants** (`src/components/ui`) : Button / ButtonLink (primary, secondary, ghost, danger), Card, PageHeader, Section, Notice, Toast, Dialog, Segmented, ToggleChip, EvidenceBadge (tampons), HandNote, CheckBox, DosageBlock, Icon. Réutiliser avant de créer.

## Références scientifiques

- **Aucune référence inventée.** Toute source est vérifiée sur PubMed/Crossref avec le skill `verify-reference` (`npm run refs:check -- --search / --lookup-pmid / --abstract`), puis `npm run refs:check -- --id <ref>` doit afficher ✅.
- La phrase « ce que l'étude a montré » est rédigée à partir du résumé vérifié, jamais de mémoire ; en cas de doute, niveau « consensus d'experts ».
- Type d'étude et niveau de preuve obligatoires et cohérents avec les études citées (la validation du contenu le contrôle).
- Avant d'ajouter une référence, vérifier qu'elle n'existe pas déjà (`grep -rn "<PMID>" src/content/references`) ; la citer par son id.
- Exercices et pathologies : skills `add-exercise` et `add-pathology`. Pathologies sans diagnostic (« vous avez… » interdit), toujours une section « Quand consulter ».
- Après toute modification du contenu : `npm run validate:content` et augmenter `CONTENT_VERSION`.
