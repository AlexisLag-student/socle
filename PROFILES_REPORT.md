# Rapport : programmes générés pour 10 profils

Généré par `npm run profiles:report` le 2026-10-23 — moteur v1, contenu 2026.10.0 (114 exercices, 25 pathologies).

Pour chaque profil, le moteur (fonction pure `generateProgram`) produit les séances types ; les **invariants** suivants sont vérifiés automatiquement (et dans `src/engine/real-content.test.ts`, avec 45 profils supplémentaires) :

- nombre de séances types conforme (1 → A, 2 → A/B, 3–4 → A/B/C) ;
- 4 à 8 exercices par séance, durée estimée ≤ durée choisie + 10 % ;
- matériel respecté (variante et niveau accessibles), sport respecté ;
- pas deux exercices de la même famille dans une séance, pas trois de suite sur le même groupe musculaire ;
- exercices « à éviter » de la phase exclus, plafond de niveau de la phase respecté ;
- exercices essentiels (priorité 1) des pathologies présents (ou leur équivalent de même famille).

## Coureuse débutante, prévention, poids du corps seul, 2 × 30 min

- **Sport** : course · **objectifs** : prévention
- **Douleurs** : aucune
- **Matériel** : Poids du corps · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 7 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut sur une jambe et réception stabilisée | 1/5 — Deux pieds vers un pied | Poids du corps | 3 × 5–6 /côté, repos 60 s (~4 min) | objectif : prévention | moderate |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 3 | Soulevé de terre jambes tendues (roumain) | 1/4 — Charnière au poids du corps | Poids du corps (bâton) | 3 × 12–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | moderate |
| 4 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |
| 5 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | objectif : prévention | moderate |
| 6 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 3 × 30 s /côté, repos 20 s (~4 min) | objectif : prévention | strong |
| 7 | Pied court (short foot) | 1/4 — Assis | Pieds nus | 3 × 5 s /côté, repos 30 s (~2 min) | objectif : prévention | moderate |

**Séance B** — 6 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Poids du corps | 3 × 12–15, tempo 2-0-1-2, repos 60 s (~6 min) | objectif : prévention | moderate |
| 2 | Sauts de cheville (pogo) | 1/5 — Deux pieds, petite amplitude | Poids du corps | 2 × 15–20, tempo X-0-X, repos 45 s (~2 min) | objectif : prévention | moderate |
| 3 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~8 min) | objectif : prévention | strong |
| 4 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 90 s (~3 min) | objectif : prévention | strong |
| 5 | Squat | 1/5 — Squat sur chaise | Poids du corps | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | strong |
| 6 | Fente (arrière, avant, marchée) | 1/4 — Fente arrière | Poids du corps | 3 × 8–12 /côté, tempo 2-0-1, repos 60 s (~6 min) | objectif : prévention | moderate |

## Marathonien, performance (force, économie de course), salle de musculation, 3 × 45 min

- **Sport** : course · **objectifs** : performance (force, économie de course)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Salle de musculation, Barre et disques, Haltères ou kettlebell · **disponibilité** : 3 × 45 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Trap bar | 4 × 5–6, repos 120 s (~8 min) | objectif : performance | strong |
| 2 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Barre libre | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 3 | Swing kettlebell | 2/5 — Swing à deux mains | Kettlebell (ou haltère) | 5 × 10, repos 60 s (~7 min) | objectif : performance | moderate |
| 4 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 3 × 12–15 /côté, tempo 2-0-2, repos 75 s (~8 min) | objectif : performance | strong |
| 5 | Soulevé de terre jambes tendues (roumain) | 2/4 — Charge légère | Barre | 3 × 10–12, tempo 3-0-1, repos 90 s (~6 min) | objectif : performance | moderate |
| 6 | Fente statique et squat bulgare | 2/5 — Fente statique complète | Barre sur le dos | 3 × 10–15 /côté, tempo 3-0-1, repos 60 s (~8 min) | objectif : performance | moderate |

**Séance B** — 6 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Sauts de haies | 2/5 — Haies basses stabilisées | Poids du corps | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 2 | Montée sur pointes jambe tendue | 2/5 — Une jambe au sol | Machine à mollets debout ou presse | 3 × 12–15 /côté, tempo 3-0-3, repos 90 s (~12 min) | objectif : performance | strong |
| 3 | Squat | 2/5 — Squat au poids du corps | Squat à la barre | 3 × 15–20, tempo 3-1-1, repos 60 s (~7 min) | objectif : performance | strong |
| 4 | Presse à cuisses | 2/5 — Une jambe | Presse à cuisses (machine) | 3 × 10–12 /côté, tempo 3-0-2, repos 90 s (~9 min) | objectif : performance | moderate |
| 5 | Leg curl (flexion de genou) | 2/4 — Deux montent, une descend | Machine assise ou couchée | 3 × 8–10 /côté, tempo 4-0-1, repos 90 s (~8 min) | objectif : performance | low |
| 6 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~3 min) | prévention (course) | strong |

**Séance C** — 8 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Bondissements | 2/4 — Bonds alternés courts | Poids du corps | 4 × 6–8, repos 120 s (~8 min) | objectif : performance | moderate |
| 2 | Sauts de cheville (pogo) | 2/5 — Deux pieds, plus haut et plus vite | Haltères légers | 3 × 20–30, tempo X-0-X, repos 90 s (~5 min) | objectif : performance | moderate |
| 3 | Poussée de traîneau | 2/4 — Traîneau léger | Traîneau ou prowler | 6 × 5 s, repos 90 s (~9 min) | objectif : performance | moderate |
| 4 | Soulevé de terre | 2/5 — Kettlebell ou haltères | Trap bar (barre hexagonale) | 3 × 8–10, tempo 2-0-1, repos 90 s (~5 min) | objectif : performance | moderate |
| 5 | Tirage isométrique mi-cuisse | 2/4 — Effort maximal | Smith machine | 5 × 5 s, repos 120 s (~9 min) | objectif : performance | low |
| 6 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Banc à Nordic | 2 × 4–6, tempo 3-0-X, repos 90 s (~3 min) | prévention (course) | strong |
| 7 | Gamme de cheville (ankling) | 2/4 — En avançant | Poids du corps | 3 × 20 s, repos 45 s (~3 min) | objectif : performance | expert |
| 8 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 2 × 30 s /côté, repos 20 s (~3 min) | prévention (course) | strong |

## Cycliste sur route, performance (force, sprint / force-vélocité), salle + barre, 2 × 45 min

- **Sport** : vélo · **objectifs** : performance (force, sprint / force-vélocité)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Salle de musculation, Barre et disques · **disponibilité** : 2 × 45 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Barre libre | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 2 | Fentes sautées | 2/5 — Fente sautée sans changement | Poids du corps | 3 × 5–6 /côté, repos 90 s (~5 min) | objectif : performance | moderate |
| 3 | Soulevé de terre | 2/5 — Kettlebell ou haltères | Trap bar (barre hexagonale) | 3 × 8–10, tempo 2-0-1, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Montée sur pointes jambe tendue | 2/5 — Une jambe au sol | Machine à mollets debout ou presse | 3 × 12–15 /côté, tempo 3-0-3, repos 90 s (~12 min) | objectif : performance | strong |
| 5 | Nordic hamstring (ischios nordiques) | 2/4 — Descente complète, réception sur les mains | Banc à Nordic | 3 × 5–6, tempo 4-0-X, repos 120 s (~6 min) | objectif : performance | strong |
| 6 | Presse à cuisses | 2/5 — Une jambe | Presse à cuisses (machine) | 3 × 10–12 /côté, tempo 3-0-2, repos 90 s (~9 min) | objectif : performance | moderate |

**Séance B** — 8 exercices, ~45 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Trap bar | 4 × 5–6, repos 120 s (~8 min) | objectif : performance | strong |
| 2 | Tirage explosif depuis la suspension (hang pull) | 2/5 — Jump shrug | Barre et disques | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 3 | Swing kettlebell | 1/5 — Charnière dynamique | Sans charge | 3 × 8–10, tempo 2-0-X, repos 60 s (~4 min) | objectif : performance | moderate |
| 4 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 3 × 12–15 /côté, tempo 2-0-2, repos 75 s (~8 min) | objectif : performance | strong |
| 5 | Squat | 2/5 — Squat au poids du corps | Squat à la barre | 3 × 15–20, tempo 3-1-1, repos 60 s (~7 min) | objectif : performance | strong |
| 6 | Soulevé de terre jambes tendues (roumain) | 2/4 — Charge légère | Barre | 3 × 10–12, tempo 3-0-1, repos 90 s (~6 min) | objectif : performance | moderate |
| 7 | Leg curl (flexion de genou) | 2/4 — Deux montent, une descend | Machine assise ou couchée | 2 × 8–10 /côté, tempo 4-0-1, repos 75 s (~5 min) | objectif : performance | low |
| 8 | Rentré de menton (fléchisseurs profonds du cou) | 1/4 — Assis ou debout, dos au mur | Poids du corps | 4 × 10 s, repos 10 s (~2 min) | prévention (vélo) | moderate |

## Traileur, tendinopathie d’Achille (portion moyenne) en phase irritable, élastique, 3 × 15 min

- **Sport** : course · **objectifs** : douleur actuelle
- **Douleurs** : Tendinopathie d’Achille (portion moyenne) — phase irritable
- **Matériel** : Poids du corps, Mini-band / élastique · **disponibilité** : 3 × 15 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 4 exercices, ~14 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 2 × 10–15, tempo 3-0-3, repos 45 s (~4 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | strong |
| 2 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 45 s (~2 min) | prévention (course) | strong |
| 3 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 2 × 20 s, repos 30 s (~2 min) | prévention (course) | moderate |
| 4 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |

**Séance B** — 4 exercices, ~16 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Isométrie du soléaire assis | 1/4 — Poussée modérée | Sous une table | 3 × 30 s /côté, repos 45 s (~5 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |
| 2 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 45 s (~2 min) | prévention (course) | strong |
| 3 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~3 min) | prévention (course) | strong |
| 4 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |

**Séance C** — 4 exercices, ~15 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 2 × 15–20, tempo 2-0-2, repos 45 s (~4 min) | prévention (course) | strong |
| 2 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 45 s (~2 min) | prévention (course) | strong |
| 3 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~3 min) | prévention (course) | strong |
| 4 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |

## Coureuse, syndrome fémoro-patellaire en reconstruction, haltères + marche, 2 × 30 min

- **Sport** : course · **objectifs** : douleur actuelle, prévention
- **Douleurs** : Syndrome fémoro-patellaire — phase reconstruction
- **Matériel** : Poids du corps, Haltères ou kettlebell, Marche, step ou banc · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 5 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Haltère ou kettlebell | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | pathologie : Syndrome fémoro-patellaire | moderate |
| 2 | Squat | 1/5 — Squat sur chaise | Squat gobelet (haltère ou kettlebell) | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | pathologie : Syndrome fémoro-patellaire | strong |
| 3 | Descente de marche contrôlée | 1/4 — Descente latérale, marche basse | Haltères | 3 × 10–12 /côté, tempo 3-0-1, repos 60 s (~7 min) | pathologie : Syndrome fémoro-patellaire | moderate |
| 4 | Marche latérale avec élastique | 1/4 — Pas chassés sans élastique | Poids du corps | 3 × 12–15 /côté, repos 45 s (~6 min) | pathologie : Syndrome fémoro-patellaire | low |
| 5 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Banc | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |

**Séance B** — 5 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Squat | 1/5 — Squat sur chaise | Squat gobelet (haltère ou kettlebell) | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | pathologie : Syndrome fémoro-patellaire | strong |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Haltères sur les genoux | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 3 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Haltère ou kettlebell | 2 × 15–20, tempo 3-0-3, repos 45 s (~5 min) | objectif : prévention | strong |
| 4 | Descente de marche contrôlée | 1/4 — Descente latérale, marche basse | Haltères | 3 × 10–12 /côté, tempo 3-0-1, repos 60 s (~7 min) | pathologie : Syndrome fémoro-patellaire | moderate |
| 5 | Marche latérale avec élastique | 1/4 — Pas chassés sans élastique | Poids du corps | 3 × 12–15 /côté, repos 45 s (~6 min) | pathologie : Syndrome fémoro-patellaire | low |

## Cycliste, genou du cycliste + lombalgie en phase irritable, poids du corps + swiss ball, 2 × 30 min

- **Sport** : vélo · **objectifs** : douleur actuelle
- **Douleurs** : Genou du cycliste — phase irritable ; Lombalgie du coureur et du cycliste — phase irritable
- **Matériel** : Poids du corps, Swiss ball · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Poids du corps | 2 × 12–15, tempo 2-0-1-2, repos 45 s (~4 min) | pathologie : Genou du cycliste | moderate |
| 2 | Abduction de hanche couché sur le côté | 1/4 — Genou fléchi | Poids du corps | 3 × 12–15 /côté, tempo 2-0-1-1, repos 45 s (~7 min) | pathologie : Genou du cycliste | low |
| 3 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Ventre sur swiss ball | 3 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~8 min) | pathologie : Lombalgie du coureur et du cycliste | low |
| 4 | Chaise contre le mur | 1/4 — Chaise haute | Swiss ball dans le dos | 5 × 30 s, repos 60 s (~7 min) | pathologie : Genou du cycliste | expert |
| 5 | Chat-vache (mobilité lombaire) | 1/3 — Amplitude confortable | Assis sur swiss ball | 2 × 8–10, tempo 3-0-3, repos 20 s (~3 min) | pathologie : Lombalgie du coureur et du cycliste | expert |
| 6 | Rentré de menton (fléchisseurs profonds du cou) | 1/4 — Assis ou debout, dos au mur | Poids du corps | 2 × 10 s, repos 10 s (~1 min) | prévention (vélo) | moderate |

**Séance B** — 6 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Abduction de hanche couché sur le côté | 1/4 — Genou fléchi | Poids du corps | 3 × 12–15 /côté, tempo 2-0-1-1, repos 45 s (~7 min) | pathologie : Genou du cycliste | low |
| 2 | Isométries cervicales (4 directions) | 1/4 — Main, effort léger | Résistance avec la main | 2 × 10 s, repos 20 s (~1 min) | prévention (vélo) | moderate |
| 3 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Ventre sur swiss ball | 3 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~8 min) | pathologie : Lombalgie du coureur et du cycliste | low |
| 4 | Chaise contre le mur | 1/4 — Chaise haute | Swiss ball dans le dos | 5 × 30 s, repos 60 s (~7 min) | pathologie : Genou du cycliste | expert |
| 5 | Chat-vache (mobilité lombaire) | 1/3 — Amplitude confortable | Assis sur swiss ball | 2 × 8–10, tempo 3-0-3, repos 20 s (~3 min) | pathologie : Lombalgie du coureur et du cycliste | expert |
| 6 | Extension de genou isométrique | 1/3 — Isométrie modérée | Contre un appui fixe | 2 × 30 s /côté, repos 45 s (~3 min) | pathologie : Genou du cycliste | moderate |

## Triathlète (course + vélo), prévention + puissance, haltères + élastique + TRX, 4 × 45 min

- **Sport** : course + vélo · **objectifs** : prévention, performance (puissance)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Haltères ou kettlebell, Mini-band / élastique, TRX / sangles de suspension · **disponibilité** : 4 × 45 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 8 exercices, ~43 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Haltères ou gilet lesté | 4 × 5–6, repos 120 s (~8 min) | objectif : performance | strong |
| 2 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Élastique au-dessus des genoux | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 3 | Swing kettlebell | 2/5 — Swing à deux mains | Kettlebell (ou haltère) | 5 × 10, repos 60 s (~7 min) | objectif : performance | moderate |
| 4 | Montée sur pointes explosive | 2/4 — Une jambe | Haltère | 3 × 6–8 /côté, tempo 2-0-X, repos 90 s (~5 min) | objectif : performance | expert |
| 5 | Saut sur une jambe et réception stabilisée | 1/5 — Deux pieds vers un pied | Poids du corps | 3 × 5–6 /côté, repos 60 s (~4 min) | objectif : prévention | moderate |
| 6 | Squat | 1/5 — Squat sur chaise | Squat gobelet (haltère ou kettlebell) | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | strong |
| 7 | Isométries cervicales (4 directions) | 1/4 — Main, effort léger | Élastique | 3 × 10 s, repos 20 s (~2 min) | objectif : prévention | moderate |
| 8 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Sangles de suspension | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |

**Séance B** — 7 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Bondissements | 2/4 — Bonds alternés courts | Poids du corps | 4 × 6–8, repos 120 s (~8 min) | objectif : performance | moderate |
| 2 | Tirage explosif depuis la suspension (hang pull) | 2/5 — Jump shrug | Haltères ou kettlebell | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 3 | Sauts de cheville (pogo) | 2/5 — Deux pieds, plus haut et plus vite | Haltères légers | 3 × 20–30, tempo X-0-X, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Haltères sur les genoux | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 5 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Lesté (haltère) | 2 × 4–6, tempo 3-0-X, repos 90 s (~3 min) | objectif : prévention | strong |
| 6 | Extension de genou (leg extension) | 1/4 — Amplitude réduite, sans charge | Élastique | 3 × 15–20 /côté, tempo 2-2-2, repos 45 s (~13 min) | objectif : prévention | moderate |
| 7 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | objectif : prévention | moderate |

**Séance C** — 8 exercices, ~43 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut en longueur sans élan | 2/5 — Saut maximal collé | Poids du corps | 4 × 4, repos 120 s (~7 min) | objectif : performance | moderate |
| 2 | Sauts de haies | 2/5 — Haies basses stabilisées | Poids du corps | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 3 | Fentes sautées | 2/5 — Fente sautée sans changement | Haltères légers | 3 × 5–6 /côté, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Bonds latéraux (patineur) | 2/4 — Bond latéral long stabilisé | Poids du corps | 3 × 5–6 /côté, repos 90 s (~5 min) | objectif : performance | low |
| 5 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Haltère ou kettlebell | 3 × 15–20, tempo 3-0-3, repos 60 s (~8 min) | objectif : prévention | strong |
| 6 | Presse à cuisses | 1/5 — Deux jambes, charge modérée | Presse à l’élastique, allongé | 2 × 12–15, tempo 3-0-2, repos 75 s (~4 min) | objectif : prévention | moderate |
| 7 | Rentré de menton (fléchisseurs profonds du cou) | 1/4 — Assis ou debout, dos au mur | Contre un élastique léger | 10 × 10 s, repos 10 s (~4 min) | objectif : prévention | moderate |
| 8 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Élastique | 3 × 30 s /côté, repos 20 s (~4 min) | objectif : prévention | strong |

## Coureur en reprise après fracture de fatigue (feu vert médical), poids du corps + marche, 2 × 30 min

- **Sport** : course · **objectifs** : reprise
- **Douleurs** : Fracture de fatigue (reprise) — phase retour au sport
- **Matériel** : Poids du corps, Marche, step ou banc · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : medical-clearance (bone-stress-injury)
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Poids du corps | 2 × 12–15, tempo 2-0-1-2, repos 45 s (~4 min) | prévention (course) | moderate |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 3 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~8 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 4 | Squat | 1/5 — Squat sur chaise | Poids du corps | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 5 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 90 s (~3 min) | prévention (course) | strong |
| 6 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 3 × 30 s /côté, repos 20 s (~4 min) | pathologie : Fracture de fatigue (reprise) | strong |

**Séance B** — 6 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 2 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~8 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 3 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Banc | 3 × 20 s /côté, repos 45 s (~4 min) | prévention (course) | strong |
| 4 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | prévention (course) | moderate |
| 5 | Fente (arrière, avant, marchée) | 1/4 — Fente arrière | Poids du corps | 3 × 8–12 /côté, tempo 2-0-1, repos 60 s (~6 min) | prévention (course) | moderate |
| 6 | Pied court (short foot) | 2/4 — Debout, deux pieds | Pieds nus | 3 × 5 s /côté, repos 30 s (~2 min) | pathologie : Fracture de fatigue (reprise) | moderate |

## Cycliste, cervicalgie + fourmillements des mains en reconstruction, élastique + haltères, 1 × 15 min

- **Sport** : vélo · **objectifs** : douleur actuelle
- **Douleurs** : Douleur de nuque du cycliste — phase reconstruction ; Fourmillements des mains du cycliste — phase reconstruction
- **Matériel** : Poids du corps, Mini-band / élastique, Haltères ou kettlebell · **disponibilité** : 1 × 15 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 4 exercices, ~16 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Extension du poignet | 2/4 — Charge légère | Haltère | 2 × 12–15 /côté, tempo 3-0-1, repos 45 s (~5 min) | pathologie : Fourmillements des mains du cycliste | expert |
| 2 | Renforcement de la préhension | 1/4 — Serrage de balle ou de serviette | Haltères ou kettlebells | 2 × 10 /côté, repos 30 s (~3 min) | pathologie : Fourmillements des mains du cycliste | expert |
| 3 | Rentré de menton (fléchisseurs profonds du cou) | 3/4 — Tête décollée, menton rentré | Contre un élastique léger | 4 × 15 s, repos 30 s (~3 min) | pathologie : Douleur de nuque du cycliste | moderate |
| 4 | Extension cervicale à quatre pattes | 1/4 — Quatre pattes, flexion-extension | Au sol | 3 × 8–10, tempo 3-1-3, repos 30 s (~5 min) | pathologie : Douleur de nuque du cycliste | moderate |

## Coureuse, tendinopathie glutéale (irritable) + talalgie plantaire (reconstruction), salle, 3 × 30 min

- **Sport** : course · **objectifs** : douleur actuelle, prévention
- **Douleurs** : Tendinopathie glutéale (douleur latérale de hanche) — phase irritable ; Talalgie plantaire (fasciite plantaire) — phase reconstruction
- **Matériel** : Poids du corps, Salle de musculation, Haltères ou kettlebell, Mini-band / élastique, Marche, step ou banc · **disponibilité** : 3 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 4 exercices, ~31 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 2 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 3 × 12–15 /côté, tempo 2-0-2, repos 75 s (~8 min) | pathologie : Talalgie plantaire (fasciite plantaire) | strong |
| 3 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |
| 4 | Maintien isométrique genou haut (psoas) | 1/4 — Assis, genou décollé | Poulie basse | 2 × 20 s /côté, repos 45 s (~3 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |

**Séance B** — 4 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Machine à hip thrust ou cadre guidé | 3 × 10–12, tempo 2-0-1-2, repos 60 s (~5 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | moderate |
| 2 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 3 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |
| 4 | Étirement du fascia plantaire | 2/3 — Debout contre un mur | Sans matériel | 3 × 30 s /côté, repos 15 s (~4 min) | pathologie : Talalgie plantaire (fasciite plantaire) | strong |

**Séance C** — 4 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 2 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |
| 3 | Renforcement des orteils (toe yoga, pression des orteils) | 2/4 — Pression des orteils assis | Élastique | 5 × 10 s /côté, repos 20 s (~4 min) | pathologie : Talalgie plantaire (fasciite plantaire) | low |
| 4 | Maintien isométrique genou haut (psoas) | 1/4 — Assis, genou décollé | Poulie basse | 4 × 20 s /côté, repos 45 s (~5 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |

## Bilan

✅ Les 10 profils produisent des programmes qui respectent tous les invariants.
