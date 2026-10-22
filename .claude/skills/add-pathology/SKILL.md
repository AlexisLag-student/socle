---
name: add-pathology
description: Ajoute une pathologie ou douleur du coureur/cycliste au contenu de Socle (description non diagnostique, symptômes, facteurs favorisants, phases avec exercices et critères de passage, « Quand consulter », références vérifiées) et la relie à la carte du corps. À utiliser pour toute création ou refonte de fiche dans src/content/pathologies.
---

# Ajouter une pathologie

Exemple de référence à imiter : `src/content/pathologies/achilles-midportion.ts`.
Gabarit : `.claude/skills/add-pathology/template.ts`.
Schéma : `src/domain/schema.ts` → `PathologySchema`.

## 1. Avant d'écrire

- Vérifier qu'elle n'existe pas : `ls src/content/pathologies`.
- Un fichier par pathologie : `src/content/pathologies/<id>.ts`, `export default definePathology({...})`, puis **import dans le fichier de zone `src/content/zones/<zone>.ts`** (tableau `pathologies`).
- Id kebab-case anglais, définitif (ex. `patellofemoral-pain`, `gluteal-tendinopathy`).

## 2. Langage : informer sans diagnostiquer

L'app **ne pose jamais de diagnostic**. Concrètement :
- `recognize` aide l'utilisateur à **se reconnaître** (« douleur située… souvent… qui peut… »). Jamais « vous avez… » ni « si vous avez X, c'est Y ».
- Pas d'échelle chiffrée de douleur, pas de questionnaire de dépistage. Pour l'intensité, utilisez `symptomGuided()` (gêne modérée qui revient à la normale le lendemain).
- Vouvoiement, phrases courtes, vocabulaire grand public. Le terme médical peut figurer dans `name` et `aka`.
- `caveat` pour les mises en garde : diagnostic débattu (syndrome du piriforme), avis médical indispensable (fracture de fatigue), etc.
- Fracture de fatigue ou toute situation qui exige un feu vert médical : `medicalClearanceRequired: true` et **uniquement** la phase `return-to-sport` (contrôlé par la validation).

## 3. Champs

| Champ | Règle |
|---|---|
| `region` | `foot-ankle`, `knee`, `hip-thigh`, `trunk-upper` (organisation de la liste). |
| `bodyAreas` | Zones de la carte du corps (`BODY_AREAS` dans `src/domain/ids.ts`, libellés dans `src/content/equipment.ts`). Un toucher sur la zone propose cette pathologie. |
| `sports` | Sports concernés. |
| `description` | 1 à 2 phrases simples sur le mécanisme. |
| `symptoms` | 2 à 5 symptômes typiques. |
| `riskFactors` | Facteurs favorisants **connus** (soutenus par la littérature ou consensuels). |
| `phases` | Une à trois phases, **dans l'ordre** `irritable` → `rebuild` → `return-to-sport`. Il n'est pas obligatoire de les avoir toutes (ex. lésion du mollet en reprise : `rebuild` + `return-to-sport`). |
| `phases[].summary` | Une phrase : ce qu'on fait dans cette phase. |
| `phases[].goals` | 1 à 3 objectifs. |
| `phases[].exercises` | **Au moins 2** exercices existants (`exerciseId`), avec `priority` 1 (essentiel) / 2 (recommandé) / 3 (complémentaire), `startLevel` (niveau de départ conseillé), `dosage` spécifique si la phase suit un protocole publié, `note` éventuelle. |
| `phases[].avoid` | Exercices à éviter dans la phase, avec la raison (le moteur les exclut). |
| `phases[].nextPhaseCriteria` | Critères **observables** pour passer à la phase suivante (vide autorisé pour la dernière). |
| `phases[].loadAdvice` | Gestion de la course ou du vélo pendant la phase (optionnel mais recommandé). |
| `whenToConsult` | Signes qui doivent pousser à consulter : drapeaux rouges (fièvre, douleur nocturne, traumatisme, perte de force brutale, engourdissement…), absence d'amélioration après une durée raisonnable. **Obligatoire.** |
| `complementaryAdvice` | Ce qui dépasse le renforcement : réglages de position sur le vélo, chaussures, gestion du volume. |
| `evidence` | Niveau de preuve **de la prise en charge par l'exercice** de cette pathologie, avec citations vérifiées (skill **verify-reference**). |

## 4. Exercices des phases

- Les exercices doivent exister : sinon, créez-les d'abord avec le skill **add-exercise**.
- La phase `irritable` privilégie l'isométrie, l'amplitude réduite et les charges modérées. `rebuild` correspond à la force progressive (charge lourde lente). `return-to-sport` ajoute la pliométrie, la vitesse et les gestes spécifiques.
- Prévoir des exercices couvrant plusieurs niveaux de matériel (au moins un poids du corps par phase), car le moteur filtre sur le matériel de l'utilisateur.
- `startLevel` ne doit pas dépasser le nombre de niveaux de l'exercice.

## 5. Contrôles (obligatoires)

```bash
npm run validate:content
npm test
npm run refs:check -- --id <ref-id>    # pour chaque nouvelle référence
```
Vérifier aussi que la pathologie apparaît dans la liste et sur la carte du corps (zones `bodyAreas`) du parcours sportif.
