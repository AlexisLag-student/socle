---
name: verify-reference
description: Vérifie une référence scientifique (étude, méta-analyse, recommandation) contre PubMed/Crossref avant de l'ajouter au contenu de Socle, rédige la phrase « ce que l'étude a montré » à partir du résumé et choisit le type d'étude et le niveau de preuve. À utiliser dès qu'on veut citer une source dans un exercice ou une pathologie, ou pour revérifier les références existantes.
---

# Vérifier une référence scientifique

**Règle absolue : ne jamais inventer une référence.** Toutes les métadonnées viennent de PubMed ou de Crossref, jamais de la mémoire. Si une référence ne peut pas être vérifiée, **on ne l'ajoute pas**. L'exercice ou la pathologie passe alors en `level: 'expert'` (badge « consensus d'experts »).

## Outil

Le script `scripts/verify-references.ts` interroge NCBI E-utilities (PubMed) et l'API Crossref :

```bash
npm run refs:check -- --search "heavy slow resistance achilles randomized"   # 10 résultats PubMed
npm run refs:check -- --lookup-pmid 26018970                                 # objet defineReference prêt à coller
npm run refs:check -- --lookup-doi 10.1177/0363546515584760
npm run refs:check -- --abstract 26018970 17307888                           # résumés (plusieurs PMID = un seul appel)
npm run refs:check -- --id beyer-2015                                        # revérifie une référence du contenu
npm run refs:check                                                           # tout vérifier + régénère REFERENCES_CHECK.md
```

En cas de HTTP 429 (limite de 3 requêtes/s de NCBI), le script réessaie seul. Groupez les PMID dans un seul appel.

## Procédure

1. **Trouver la source** avec `--search` : auteur, mots-clés, année. Ou bien un DOI ou PMID connu, **à confirmer** avec `--lookup-*`. Si `WebSearch` sert à repérer une étude, ses métadonnées doivent ensuite être confirmées par `--lookup-*`.
2. **Récupérer les métadonnées officielles** avec `--lookup-pmid` (ou `--lookup-doi` si l'article n'est pas sur PubMed). Copiez l'objet généré tel quel : auteurs, année, titre, revue, DOI, PMID.
3. **Choisir le `type`** d'après le plan d'étude réel (le champ PubMed `pubtype` est un indice, pas une preuve) :
   | type | quand |
   |---|---|
   | `cpg` | recommandation de pratique clinique (ex. JOSPT CPG) |
   | `consensus` | déclaration de consensus d'experts (ex. consensus international) |
   | `meta-analysis` | méta-analyse (avec ou sans revue systématique) |
   | `systematic-review` | revue systématique sans méta-analyse |
   | `rct` | essai contrôlé randomisé |
   | `cohort` | cohorte prospective ou rétrospective, essai non randomisé avec groupe de comparaison |
   | `case-series` | série de cas, étude pilote sans groupe contrôle |
   | `cross-sectional` | étude transversale, biomécanique, EMG |
   | `narrative-review` | revue narrative, article de synthèse |
4. **Lire le résumé** (`--abstract <pmid>`). Pour une recommandation dont le résumé ne détaille pas les préconisations, confirmez-les avec `WebFetch` (site de la revue, de l'association ou une synthèse fiable) **avant** d'écrire la phrase.
5. **Rédiger la phrase `finding`** en FR et EN, dans l'objet `Citation` de l'exercice ou de la pathologie :
   - une seule phrase, factuelle, fidèle au résumé (population, intervention, résultat) ;
   - aucune extrapolation : ne pas attribuer à l'étude un résultat qu'elle n'a pas mesuré ;
   - les chiffres sont les bienvenus s'ils figurent dans le résumé (ex. « 58 patients », « 12 semaines »).
6. **Remplir `verification`** : `{ status: 'verified', checkedAt: '<date du jour AAAA-MM-JJ>', via: 'pubmed' | 'crossref' | 'publisher', abstractChecked: true }`. Mettez `abstractChecked: false` seulement si le résumé n'est pas accessible (cas rare, à signaler).
7. **Ranger la référence** dans `src/content/references/<zone>.ts` (`foot-ankle`, `knee`, `hip`, `trunk`, `cycling`, `performance`), dans un `defineReference({...})`. Id en kebab-case : `<premier-auteur>-<année>` (suffixe `-b`, `-c` si collision). Vérifiez qu'elle n'existe pas déjà (même DOI ou PMID) : `grep -ri "<doi ou pmid>" src/content/references`.
8. **Contrôler** :
   ```bash
   npm run refs:check -- --id <id>      # doit afficher ✅
   npm run validate:content
   ```
   Si ⚠️ : lisez la note (souvent une abréviation de revue différente, acceptable) et corrigez si c'est une vraie erreur. Si ❌ : corrigez ou retirez la référence.
9. **En fin de lot**, régénérez le rapport : `npm run refs:check` → `REFERENCES_CHECK.md`.

## Niveau de preuve (exercice ou pathologie)

Le niveau se juge sur l'ensemble des citations. La validation fait échouer le build en cas d'incohérence :

- **`strong` (fort)** : au moins une `cpg`, `meta-analysis` ou `systematic-review` qui soutient **cette** intervention, ou au moins deux `rct` concordants ;
- **`moderate` (modéré)** : au moins un `rct` de bonne qualité (ou une revue dont la conclusion est nuancée) ;
- **`low` (faible)** : cohortes, séries de cas, petits essais ;
- **`expert` (consensus d'experts)** : pratique clinique courante sans preuve directe. Les citations sont facultatives, mais une recommandation qui mentionne la pratique peut être citée.

Soyez honnête : une revue systématique qui conclut à une preuve « faible » ou « très faible » ne justifie pas le niveau `strong`. Dans ce cas, choisissez `low` ou `moderate` selon sa conclusion.

## Ne jamais faire

- Recopier une référence trouvée dans un article de blog ou une mémoire sans `--lookup-*`.
- Citer une étude pour un résultat absent de son résumé.
- Garder une référence ❌ dans le contenu.
- Ajouter une référence sans DOI, ni PMID, ni URL (le build échoue).
