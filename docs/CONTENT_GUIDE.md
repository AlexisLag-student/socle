# Guide de rédaction du contenu

Ce guide complète les skills `.claude/skills/add-exercise`, `add-pathology` et `verify-reference` (à lire en premier). Il fixe les exigences de qualité communes et l'organisation du travail par zone.

## Organisation par zone

| Zone | Fichier de zone | Exercices | Références | Pathologies |
|---|---|---|---|---|
| Pied, cheville, jambe | `zones/foot-ankle.ts` | `exercises/calf.ts`, `exercises/foot-ankle.ts` (à créer) | `references/foot-ankle.ts` | MTSS, fracture de fatigue, Achille (portion moyenne, à enrichir), Achille insertionnelle, talalgie/fasciite plantaire, instabilité chronique de cheville, tibial postérieur, fibulaires, métatarsalgie/Morton, lésion du mollet |
| Genou | `zones/knee.ts` | `exercises/knee.ts` | `references/knee.ts` | syndrome fémoro-patellaire (course et vélo), bandelette ilio-tibiale, tendinopathie rotulienne, patte d'oie, genou du cycliste (antérieur/médial/latéral) |
| Hanche | `zones/hip.ts` | `exercises/hip.ts` | `references/hip.ts` | tendinopathie glutéale/douleur latérale de hanche, psoas/douleur antérieure de hanche, syndrome du piriforme (diagnostic débattu) |
| Cuisse | `zones/thigh.ts` | `exercises/hamstrings-adductors.ts` | `references/thigh.ts` | tendinopathie proximale des ischios, lésion des ischios (reprise), douleur de l'aine / pubalgie (adducteurs) |
| Tronc | `zones/trunk.ts` | `exercises/trunk.ts` | `references/trunk.ts` | lombalgie du coureur et du cycliste |
| Vélo, haut du corps | `zones/cycling.ts` | `exercises/upper-body.ts` | `references/cycling.ts` | cervicalgie du cycliste, épaules/trapèzes sur le vélo, fourmillements des mains |
| Performance | `zones/performance.ts` | `exercises/performance.ts` | `references/performance.ts` | — (objectifs de performance et prévention générale) |

Tous les chemins sont relatifs à `src/content/`.

**Règle d'or : une zone ne modifie que ses propres fichiers** (fichiers ci-dessus + `pathologies/<id>.ts` de ses pathologies). Ne jamais modifier `src/domain/*`, `src/content/muscles.ts`, `catalog.ts`, `validate.ts`, `helpers.ts`, `index.ts`, ni les fichiers d'une autre zone. Si un besoin sort de ce cadre (muscle manquant, helper utile…), le signaler dans le rapport final au lieu de le faire.

## Exercices partagés

`src/content/catalog.ts` liste les exercices réservés, avec leur zone propriétaire. Une zone peut citer n'importe quel exercice réservé dans ses pathologies, mais seule la zone propriétaire l'écrit. Elle doit écrire **tous** les exercices réservés qui lui appartiennent, avec exactement ces identifiants.

Pour un exercice qui n'est pas dans le catalogue, une zone ne peut citer que ses propres exercices.

Avant de créer un exercice, vérifier qu'il n'existe pas déjà dans une autre zone (`grep -rn "id: '" src/content/exercises`). Pour un exercice proche d'un exercice réservé d'une autre zone, citer l'exercice réservé plutôt que d'en créer un doublon.

## Exigences de qualité

- **Fiabilité avant quantité.** Chaque affirmation chiffrée ou attribuée à une étude doit venir du résumé vérifié. En cas de doute → consensus d'experts.
- **Références** : uniquement via `npm run refs:check -- --search / --lookup-pmid / --abstract` (PubMed/Crossref), puis `--id <ref>` doit afficher ✅. Avant d'ajouter une référence, vérifier qu'elle n'existe pas déjà dans une autre zone (`grep -rn "<PMID>" src/content/references`) : si elle existe, la citer par son id sans la recopier.
- **Pistes à vérifier** (si pertinentes pour la zone) : Alfredson 1998, Beyer 2015 (déjà présents), Rathleff 2015 (fasciite plantaire), Mellor 2018 BMJ (LEAP, tendinopathie glutéale), Kongsgaard 2009 (rotulien), Petersen 2011 et van der Horst 2015 (Nordic), Harøy 2019 (Copenhagen), Willy 2019 (CPG fémoro-patellaire JOSPT) et ses travaux hanche + genou, Lauersen 2014 (prévention), Blagrove 2018 (économie de course), Rønnestad & Mujika 2014 (force chez le cycliste). Privilégier les recommandations de pratique clinique (JOSPT CPG), les consensus internationaux, les méta-analyses et revues systématiques, puis les essais randomisés.
- **Langue** : français naturel et vouvoiement ; anglais naturel (pas de traduction mot à mot). Phrases courtes, vocabulaire grand public.
- **Pathologies** : aucun diagnostic (« vous avez… » interdit), pas d'échelle de douleur chiffrée, section « Quand consulter » systématique avec de vrais drapeaux rouges.
- **Exercices** : tous les champs du skill add-exercise, 3 à 5 niveaux avec critères de maîtrise objectifs, dosages réalistes et différents selon les niveaux, variantes de matériel crédibles (poids du corps quasi systématique ; `gym`, `swiss-ball`, `suspension`, `band`, `dumbbells`, `barbell`, `step` quand c'est pertinent).
- **Moteur** : chaque exercice doit être atteignable, via une phase de pathologie, `preventionFor` ou `objectives: ['performance']` + `perfGoals`. Les exercices de prévention générale doivent couvrir les deux sports quand c'est pertinent (les cyclistes aussi ont besoin de prévention). Équilibrer les variantes de matériel pour qu'un programme soit possible avec chaque matériel, y compris le poids du corps seul.
- **Muscles** : uniquement les ids de `src/domain/ids.ts` (`MUSCLE_IDS`). Les muscles principaux doivent être visibles dans le zoom choisi (la validation le vérifie). Si un muscle est absent, prendre le plus proche et le signaler.

## Contrôles avant de rendre la main

```bash
CONTENT_WIP=1 npm run validate:content -- --only "<id de pathologie ou d'exercice>"   # 0 erreur dans votre zone
CONTENT_WIP=1 npm run validate:content                                             # 0 erreur au total, si possible
npm run typecheck
npm run refs:check -- --id <id1> <id2> ...                                          # toutes vos références ✅
```
D'autres agents travaillent en parallèle : une erreur dans une autre zone n'est pas de votre ressort, mais **la vôtre doit être à zéro**. Ne lancez **aucune commande git**.
