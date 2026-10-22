# Journal des décisions

Décisions non structurantes prises pendant le développement, avec leur justification.
Les décisions structurantes (nom, hébergement) ont été validées par le porteur du projet.

| # | Date | Décision | Justification |
|---|---|---|---|
| 1 | 2026-10-22 | Nom **Socle**, hébergement **Vercel** | Validés par le porteur du projet. |
| 2 | 2026-10-22 | Déploiement par la GitHub Action (`vercel deploy --prebuilt --prod`), déploiement Git automatique de Vercel désactivé (`vercel.json > git.deploymentEnabled=false`) | Garantit que seul du code testé (typecheck, lint, contenu, Vitest, Playwright) part en production. |
| 3 | 2026-10-22 | Icônes PWA générées depuis `public/favicon.svg` via Playwright (`scripts/generate-icons.ts`) | Évite une dépendance native (sharp) ; Playwright est déjà requis pour les tests e2e. |
| 4 | 2026-10-22 | Police Inter auto-hébergée (`@fontsource-variable/inter`), sous-ensembles cyrillique/grec/vietnamien exclus du précache | Aucun appel à un service tiers ; précache allégé (FR/EN n'utilisent que latin et latin-ext). |
| 5 | 2026-10-22 | Liens de partage à la racine (`/#share=…`) avec BrowserRouter et réécriture SPA Vercel | URL propres pour l'app, et le lien de partage ne dépend d'aucune route serveur. |
| 6 | 2026-10-22 | TypeScript 6, Vite 8, React 19, Vitest 5, ESLint 10 (dernières versions stables) | Projet neuf : on part sur les versions courantes. |
