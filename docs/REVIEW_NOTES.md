# Relecture scientifique indépendante du contenu

Relecture du 22-23 octobre 2026 : 172 références, 114 exercices, 25 pathologies (7 zones).

## Méthode

1. **Métadonnées.** J'ai lancé `npm run refs:check`, qui compare les 172 références à PubMed (via le PMID) et à Crossref (via le DOI). Au départ, toutes étaient ✅. J'ai quand même repéré une erreur que le contrôle automatique ne voit pas : les noms d'auteurs inversés de `frans-jozef-2026` (voir plus bas).
2. **Rétractations.** J'ai récupéré les types de publication PubMed des 172 PMID (esummary), puis les mentions « Retraction in », « Expression of concern », « Erratum in » et « Comment in » des notices. Résultat : **aucune publication rétractée ni « expression of concern »**. Des errata existent (par exemple Bourne 2017), mais aucun ne change les données citées.
3. **Fidélité des citations.** J'ai relu tous les résumés (`--abstract`, en lots de 20 PMID). Pour chaque citation `{ refId, finding }` des exercices et des pathologies, j'ai comparé la phrase FR/EN au résumé : population, intervention, résultat et chiffres. Il y a 0 citation sans résumé.
4. **Recommandations dont le résumé ne détaille pas les préconisations.** Je les ai vérifiées sur des sources secondaires fiables ou sur le texte intégral :
   - JOSPT Achille 2024 : charge « as high as tolerated » en première intention (A), au moins 3 fois par semaine, pas de repos complet, isométrie incluse parmi les modes de charge. ✔
   - Talalgie 2023 : étirements du fascia et des mollets (A), renforcement du pied et de la cheville (B), strapping (A). ✔
   - Entorse latérale 2021 : équilibre, proprioception et orthèses en prévention secondaire (A). ✔
   - Lombalgie 2021 : renforcement et endurance du tronc (A), mobilité du tronc (B). ✔
   - Cervicalgie 2017 : endurance du cou et de la ceinture scapulaire en subaigu (B), exercice mixte en chronique (B). Vérifié sur le texte intégral. ✔
   - Consensus ESSKA-AFAS sur les tendons fibulaires 2018 : vérifié sur le texte intégral (PMC6154028).
   - Syndrome fémoro-patellaire 2019 : la recommandation préconise des exercices ciblant la hanche et le genou, **sans désigner d'exercice précis**. Une synthèse AAFP le confirme. Les phrases qui disaient le contraire ont été corrigées.
5. **Types d'étude et niveaux de preuve.** J'ai comparé le plan réel de chaque étude au `type` déclaré. J'ai jugé les niveaux selon la règle du skill : « fort » seulement si une recommandation, une méta-analyse ou une revue systématique soutient **cette** intervention, ou si au moins 2 ECR concordants la soutiennent. En cas de doute, j'ai baissé d'un cran.

## Corrections des phrases « ce que l'étude a montré » (29)

| Référence | Où | Avant → après | Raison |
|---|---|---|---|
| alfredson-1998 | eccentric-heel-drop | « 15 coureurs suivis » → « 15 sportifs amateurs suivis (tendinopathie d'Achille chronique) », « étude non randomisée » ajouté | Le résumé parle de « recreational athletes » et le groupe de comparaison n'était pas randomisé. |
| marques-2025 | hop-stabilization, PA medial-tibial-stress-syndrome | « méta-analyse de 12 essais (8 197 participants) : le neuromusculaire réduit… » → « 4 essais, 3 887 participants » | Les effectifs globaux de la revue étaient attribués au seul entraînement neuromusculaire. |
| lenhart-2014 | PA patellofemoral-pain | « 30 coureurs » → « 30 adultes sains courant sur tapis », force « estimée (modélisation) » | Population et nature (modèle) précisées. |
| breda-2021 | decline-squat, PA patellar-tendinopathy | Étapes du programme (isométrie, détente, gestes sportifs) retirées | Ces étapes ne figurent pas dans le résumé. |
| sanchez-alvarado-2024 | PA iliotibial-band-syndrome | « faible qualité des études » → « grande hétérogénéité (dont 6 études de cas, sans méta-analyse possible) » | **Erreur** : le résumé juge la qualité méthodologique « good ». |
| paton-2023 | PA hamstring-strain | « exiger un sprint indolore avant le retour au sport » → « progresser selon les capacités et les symptômes, le sprint devant rester indolore » | Le consensus porte sur un sprint indolore pendant la rééducation, pas sur un critère de retour au sport. |
| van-dijk-2018 | PA peroneal-tendinopathy | « dès que la douleur le permet » → « une fois l'appui indolore » | Le texte dit « when painless ». |
| distefano-2009 | lateral-band-walk | « c'est surtout un exercice du moyen fessier » retiré, comparaison chiffrée avec le squat et le soulevé de terre unipodal (≈ 59 %) | L'activité du moyen fessier pendant la marche latérale n'est pas rapportée dans le résumé. |
| boren-2011 | glute-kickback | Précision : la planche avec extension de hanche est un exercice voisin, pas le kickback | L'étude ne teste pas cet exercice tel quel. |
| bourne-2017 | romanian-deadlift | Précision : l'extension de hanche étudiée n'est pas le soulevé de terre roumain ; effectif (30) ajouté | Extrapolation implicite. |
| severini-2018 | single-leg-deadlift | La position « fin de phase aérienne » n'est plus attribuée au seul « diver » | Le résumé décrit le protocole L dans son ensemble. |
| andersen-2008-b | band-pull-apart, row | « l'oiseau / le rowing faisait partie des exercices très activateurs » → « la plupart des exercices d'un programme comprenant… (> 60 %) » | Le résumé ne donne pas de valeur pour ces deux exercices en particulier. |
| andersen-2014 | scapular-push-up | « (dont la pompe « plus ») » retiré | Absent du résumé. |
| cools-2007 | prone-ytw | « activaient fortement » → « meilleur rapport trapèzes moyen/inférieur vs supérieur » | L'étude porte sur des rapports d'activité, pas sur l'intensité absolue. |
| basson-2017 | ulnar-nerve-glide | « aucune étude ne porte sur le canal de Guyon » → « non évalué dans ce résumé » | Affirmation invérifiable. |
| paavolainen-1999 | bounding | « coureurs entraînés » → « 18 athlètes d'endurance entraînés » | Population exacte. |
| willy-2019 | squat, split-squat, lunge, step-up, step-down, single-leg-squat, leg-press, leg-extension | Les phrases « X fait partie des exercices cités » et « en charge = sans charge » sont remplacées par « préconise des exercices ciblant hanche et genou ; ne recommande pas d'exercice précis » | Non vérifiable, et contredit par la synthèse AAFP. |
| willy-2019 | PA patellofemoral-pain | « (grade A) » retiré ; options complémentaires reformulées | Grade non confirmé par une source accessible. |
| lauersen-2014 | deadlift | « le renforcement… a presque divisé par deux les blessures de surmenage » → « l'ensemble des programmes d'exercice » | Le chiffre de RR 0,53 sur les blessures de surmenage concerne tous les programmes, pas le seul renforcement. |

## Types d'étude modifiés (1)

- `doherty-2017` : `meta-analysis` → `systematic-review`. C'est une synthèse (overview) de revues systématiques, sans méta-analyse propre. Les niveaux qui la citent restent inchangés, car le type `systematic-review` est accepté pour « fort ».
- Vérifiés et conservés :
  - `bourne-2017` (`rct`) : PubMed l'indexe comme « Randomized Controlled Trial ».
  - `alfredson-1998`, `askling-2003`, `ronnestad-2010`, `paavolainen-1999`, `maeo-2021` (`cohort`) : essais non randomisés ou intra-sujet.
  - `rio-2015` (`rct`) : essai croisé randomisé.

## Niveaux de preuve modifiés (7)

| Exercice | Avant → après | Raison |
|---|---|---|
| split-squat, lunge, step-down, single-leg-squat, leg-extension | fort → modéré | Le niveau « fort » reposait sur la recommandation JOSPT 2019 et les méta-analyses sur le syndrome fémoro-patellaire, qui portent sur des programmes globaux hanche + genou et ne désignent pas ces exercices. |
| leg-press | fort → modéré | Même raison. L'ECR de Kongsgaard 2009 (charge lourde et lente, avec presse) justifie « modéré ». |
| hang-pull | fort → modéré | Les méta-analyses (Hackett 2016, Morris 2022) portent sur l'haltérophilie en général et sur la détente chez des sportifs non endurants. Le tirage depuis la suspension n'y est qu'un dérivé parmi d'autres. |

Conservés en « fort » après examen :
- squat : revue systématique de Blagrove 2018, plus 2 ECR sur le demi-squat lourd (Støren 2008, Sunde 2010).
- countermovement-jump et drop-jump : méta-analyses de pliométrie où ces sauts sont l'intervention ou le critère central, plus des ECR.
- Les montées sur pointes et l'excentrique pour l'Achille, nordic-hamstring, copenhagen-adductor, single-leg-balance, les étirements de la talalgie et les 7 pathologies classées « fort ».

## Références retirées

Aucune. Aucune rétractation, aucune métadonnée invérifiable.

## Métadonnée corrigée

- `frans-jozef-2026` → **`vandeputte-2026`**. PubMed et Crossref ont indexé les prénoms à la place des noms (erreur dans le dépôt de l'éditeur MDPI). Le dépôt institutionnel UHasselt (documentserver.uhasselt.be/handle/1942/49914) donne Frans-Jozef **Vandeputte**, Abner **Sergooris**, Stijn **Roose**, Annick **Timmermans**, Kristoff **Corten**.
  - Les auteurs sont écrits en entier, prénom puis nom. C'est exact et compatible avec le contrôle automatique du premier auteur, qui affiche ✅.
  - La citation de `iliopsoas-tendinopathy` a été mise à jour.

## Coordination demandée par les agents de zone

- `upper-body.ts` › `chin-tuck` :
  - muscle principal `deep-neck-flexors`, zoom `trunk-front` (le zoom inclut maintenant le cou) ;
  - `sternocleidomastoid` en secondaire et `neck-extensors` retiré ;
  - note provisoire en tête de fichier remplacée.
- `performance.ts` › `deadlift` : famille `hip-hinge-bilateral`, la même que `romanian-deadlift`.
- `hip.ts` › `hip-hike` : `sports` et `preventionFor` = `['run', 'bike']`, avec une phrase « pourquoi » sur la stabilité du bassin et l'axe du genou à vélo.
- `achilles-insertional.ts` : des plafonds `maxLevel` ont été ajoutés après vérification des niveaux de `calf.ts`.
  - Phase irritable : `calf-raise-straight-knee` limité au niveau 2. Le niveau 3 descend le talon sous la marche.
  - Phase de reconstruction :
    - `calf-raise-straight-knee` limité au niveau 2. La charge progresse avec `calf-raise-bent-knee` assis, qui reçoit une note « talon jamais sous le bord d'une marche ».
    - `eccentric-heel-drop` limité au niveau 1. Les niveaux 2 et 3 correspondent au protocole d'Alfredson sur marche.
  - Phase de retour au sport : pas de plafond (réintroduction de l'amplitude complète).
- `beattie-2014` (revue systématique, athlètes d'endurance) et `suchomel-2016` (revue narrative, force et performance) sont désormais cités dans `deadlift`, avec des phrases fidèles au résumé. Le niveau reste modéré.

## Points restant incertains (avis humain souhaitable)

1. **Willy 2019 (syndrome fémoro-patellaire)** : le texte intégral JOSPT n'était pas accessible. Le grade exact de la recommandation hanche + genou n'est pas confirmé, il a donc été retiré.
2. **Beyer 2015 / calf-raise-bent-knee** : la phrase « le protocole lourd et lent comprenait des montées sur pointes assis » vient du texte intégral (protocole connu), pas du résumé. Je l'ai conservée car elle est exacte, mais elle sort de la règle « résumé seulement ».
3. **Jull 2002 / chin-tuck** : même situation. Le ciblage des fléchisseurs profonds (flexion cranio-cervicale) est décrit dans le texte intégral, pas dans le résumé.
4. **Niveaux « fort » des sauts pliométriques** (countermovement-jump, drop-jump) : ils sont défendables, mais les méta-analyses portent sur la pliométrie en général. Un relecteur pourrait les juger « modérés », comme pogo-hops, hurdle-hops et broad-jump.
5. **isometric-knee-extension (modéré)** : il repose sur un essai croisé de 6 sportifs (Rio 2015) et un ECR de 29 sportifs sans groupe contrôle passif (van Ark 2016). La limite entre « modéré » et « faible » est discutable.
6. **calf-raise-bent-knee** dans `achilles-insertional` (phase de reconstruction) : la variante debout suggère « sur une marche si possible ». La note de phase l'interdit, mais le moteur ne peut pas l'imposer, car aucun niveau ne sépare « au sol » et « sur marche ».
7. Un test du moteur (`real-content.test.ts`, invariant « exercice essentiel absent » pour `seated-soleus-isometric`) a échoué une fois pendant la relecture, puis est passé à toutes les exécutions suivantes, sans changement de ma part. C'est peut-être lié à des modifications faites en parallèle par d'autres agents. À surveiller : `calf-isometric-hold` et `seated-soleus-isometric` partagent la famille `calf-isometric` et ne peuvent donc jamais figurer dans la même séance, alors que les deux sont « essentiels » en phase irritable d'Achille insertionnelle.

## Contrôles finaux

- `npm run validate:content` : 0 erreur. Il reste 2 avertissements préexistants (« aucune variante au poids du corps » pour leg-press et pallof-press).
- `npx vitest run src/content src/engine` : tout vert.
- `npm run refs:check` : 172/172 ✅, `REFERENCES_CHECK.md` régénéré.
