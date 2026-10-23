---
name: add-exercise
description: Ajoute un exercice de renforcement complet (FR/EN, muscles, dosage, 3 à 5 niveaux de progression, variantes de matériel, références vérifiées) au contenu de Socle et le rend atteignable par le moteur de recommandation. À utiliser pour toute création ou refonte d'exercice dans src/content/exercises.
---

# Ajouter un exercice

Exemple de référence à imiter : `src/content/exercises/calf.ts` (montées sur pointes, isométrie, excentrique).
Gabarit commenté : `.claude/skills/add-exercise/template.ts`.
Schéma (source de vérité) : `src/domain/schema.ts` → `ExerciseSchema`.

## 1. Avant d'écrire

- **Doublon ?** `grep -rn "family: '" src/content/exercises` et `grep -rni "<nom>" src/content/exercises`. Si une variante de matériel ou un niveau de progression d'un exercice existant suffit, **modifiez l'existant** au lieu de créer un exercice.
- **Fichier** : `src/content/exercises/<groupe>.ts`. Fichiers existants : `calf`, `foot-ankle`, `knee`, `hip`, `hamstrings-adductors`, `trunk`, `upper-body`, `performance`. Un nouveau fichier doit être importé dans le fichier de zone `src/content/zones/<zone>.ts`.
- **Id** (kebab-case, anglais, **définitif** : les liens de partage en dépendent) : `split-squat`, `copenhagen-adductor`… Pour renommer un exercice publié, ajoutez l'ancien id dans `src/content/aliases.ts`.
- **family** : le geste de base. Deux exercices de même famille ne se retrouvent jamais dans la même séance (ex. `calf-raise-straight`).

## 2. Champs et règles de rédaction

| Champ | Règle |
|---|---|
| `name` | FR et EN, nom usuel en salle ou en cabinet. |
| `sports` | `run`, `bike` ou les deux. |
| `zones` | Filtre de la bibliothèque (`BODY_ZONES` dans `src/domain/ids.ts`). |
| `half` | `lower` / `upper` / `trunk` : sert à alterner dans la séance. |
| `muscles.primary/secondary` | Ids de `MUSCLE_IDS` (`src/domain/ids.ts`), registre `src/content/muscles.ts`. Un muscle ne peut pas être à la fois principal et secondaire. Les principaux doivent être dessinés dans le zoom choisi. |
| `zoom` | Région agrandie : `leg-front`, `leg-back`, `foot-sole`, `pelvis-front`, `pelvis-back`, `trunk-front`, `trunk-back`, `shoulders-neck`, `forearm-hand`. |
| `qualities` | Ce que l'exercice développe : `strength`, `endurance`, `control`, `power`, `mobility`, `tendon-stiffness`, `isometric`. |
| `objectives` | `prevention`, `performance`, `return`, `pain`. Si `performance` est présent, `perfGoals` est obligatoire (`strength`, `power`, `running-economy`, `sprint-fv`). |
| `preventionFor` | Sports pour lesquels c'est un exercice de prévention générale (3e niveau de priorité du moteur). |
| `why` | Rôle **général** du muscle dans la course ou le vélo, en langage clair. Jamais « pour votre douleur ». 2 phrases maximum. |
| `how.setup / movement / cues / breathing` | Position de départ, mouvement, 2 à 4 consignes clés courtes, respiration si utile. Tutoiement interdit : on vouvoie. |
| `mistakes` | 2 à 4 erreurs fréquentes. |
| `levels` | **3 à 5 niveaux**, numérotés 1..n, du plus facile au plus difficile. Chacun a un `name`, une `description`, une `mastery` (critère objectif pour passer au suivant : répétitions, durée, symétrie, absence de douleur le lendemain) et un `dosage`. |
| `levels[].requires` | Matériel indispensable à ce niveau (ex. `['step']` pour une marche). |
| `levels[].loaded` | `true` si le niveau exige une charge : seulement accessible avec une variante `loadable`. |
| `variants` | Au moins une. `equipment: []` = poids du corps (fortement recommandé, sinon avertissement). `rank` plus élevé = préféré quand le matériel est disponible (machine > haltères > poids du corps en général). `loadable: true` si la charge peut augmenter progressivement. |
| `precautions` | Au moins une. Helpers dans `src/content/helpers.ts` (`caution.painFlare`…). |
| `contraindications` | Optionnel. |
| `evidence` | Voir § 4. |

### Dosage (`DosageSchema`)

- `sets` (1–10), `reps: [min, max]` **ou** `holdSec`, `restSec`, `perSide`.
- `tempo` : `excentrique-pause-concentrique(-pause)`, `X` = explosif. Ex. `'3-0-3'`, `'X-0-X'`.
- `intensity` : utilisez les helpers `rir('2-3')`, `rpe('7-8')`, `bodyweight()`, `load(fr, en)`, `symptomGuided()` (rééducation, sans échelle chiffrée de douleur).
- `frequency` : `freq.daily`, `freq.everyOtherDay`, `freq.threePerWeek`…
- Dosages réalistes, alignés sur la littérature quand elle existe (ex. charge lourde lente : 3–4 × 6–15, tempo 3-0-3). Pour la force maximale : 3–5 × 3–6, RIR 1–3. Pour la puissance : faible volume, récupération longue.

## 3. Rendre l'exercice atteignable

Un exercice n'est proposé automatiquement que s'il est relié :
- à une phase de pathologie (`src/content/pathologies/*.ts` → `phases[].exercises`), voir le skill **add-pathology** ;
- ou à un objectif de performance (`objectives: ['performance']` + `perfGoals`) ;
- ou à la prévention (`preventionFor`).
Sinon la validation affiche un avertissement : l'exercice reste visible dans la bibliothèque, mais le moteur ne le proposera jamais.

## 4. Références et niveau de preuve

- Chaque citation `{ refId, finding }` pointe vers une référence de `src/content/references/*.ts`, **vérifiée avec le skill verify-reference**. Jamais de référence de mémoire.
- `finding` : une phrase FR/EN fidèle au résumé, en lien avec cet exercice.
- Niveau : `strong`, `moderate`, `low` ou `expert` (règles dans verify-reference). Sans preuve directe → `expert`, avec éventuellement une recommandation citée pour le contexte.

## 5. Contrôles (obligatoires)

```bash
npm run validate:content        # 0 erreur ; traitez aussi les avertissements
npm test                        # validation + moteur
npm run refs:check -- --id <ref-id>   # pour chaque nouvelle référence
```
La validation échoue si : un champ manque, une traduction est vide, il y a moins de 3 niveaux, un muscle est inconnu ou non dessiné, une référence est inconnue ou sans DOI/PMID/URL, ou le niveau de preuve est incohérent.

## 6. Animation du mouvement

Tout exercice ajouté reçoit son animation, selon les règles de la section « Animations des exercices » de `CLAUDE.md` :
- créer `src/animation/data/<id>.ts` (`defineAnimation`) et l'inscrire dans `src/animation/loaders.ts` ;
- poses tirées **uniquement** de « Mise en place », « Mouvement », « Consignes » et « Erreurs » (amplitude, alignements) ; en cas de doute, la version la plus prudente, notée dans `DECISIONS.md` ;
- même mouvement avec un autre matériel ou à un autre niveau → `overrides` (matériel, retouche de pose) ; nouvelles poses clés seulement si le mouvement change ;
- régler les appuis avec `npm run anim:probe -- <id> [niveau] [variante]`, vérifier dans `/dev/animations?id=<id>` ;
- `npm run validate:content` et `npx vitest run src/animation` doivent passer (bornes, appuis, continuité, tempo).

## 7. Exercices partagés entre zones

`src/content/catalog.ts` réserve les identifiants des exercices que plusieurs zones citent (squat, pont fessier, gainage…), chacun avec sa zone propriétaire. Seule la zone propriétaire écrit l'exercice ; les autres peuvent le citer dans leurs pathologies. Pendant une rédaction en parallèle, utilisez `CONTENT_WIP=1 npm run validate:content` : un exercice réservé mais pas encore écrit n'est alors qu'un avertissement.
