# Rapport : programmes générés pour 10 profils

Généré par `npm run profiles:report` le 2026-10-24 — moteur v2, contenu 2026.10.0 (114 exercices, 25 pathologies).

Pour chaque profil, le moteur (fonction pure `generateProgram`) produit les séances types ; les **invariants** suivants sont vérifiés automatiquement (et dans `src/engine/real-content.test.ts`, avec 60 profils supplémentaires) :

- une séance type par séance hebdomadaire (1 → A … 5 → A à E) ;
- nombre d’exercices selon la durée (15 min : 3–4, 30 min : 4–6, 45 min : 4–8, 1 h : 6–12), durée estimée repos compris (entre les séries et entre les exercices) ≤ durée choisie + 10 % ;
- à partir de 4 séances : deux séances voisines dans la rotation (E précède A) ne partagent ni un exercice qui demande de la récupération, ni son groupe musculaire principal ; séances types toutes différentes ;
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

**Séance A** — 6 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut sur une jambe et réception stabilisée | 1/5 — Deux pieds vers un pied | Poids du corps | 3 × 5–6 /côté, repos 60 s (~4 min) | objectif : prévention | moderate |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 3 | Soulevé de terre jambes tendues (roumain) | 1/4 — Charnière au poids du corps | Poids du corps (bâton) | 3 × 12–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | moderate |
| 4 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |
| 5 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | objectif : prévention | moderate |
| 6 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 3 × 30 s /côté, repos 20 s (~4 min) | objectif : prévention | strong |

**Séance B** — 5 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Poids du corps | 3 × 12–15, tempo 2-0-1-2, repos 60 s (~5 min) | objectif : prévention | moderate |
| 2 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~7 min) | objectif : prévention | strong |
| 3 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 90 s (~2 min) | objectif : prévention | strong |
| 4 | Squat | 1/5 — Squat sur chaise | Poids du corps | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | strong |
| 5 | Fente (arrière, avant, marchée) | 1/4 — Fente arrière | Poids du corps | 3 × 8–12 /côté, tempo 2-0-1, repos 60 s (~5 min) | objectif : prévention | moderate |

## Marathonien, performance (force, économie de course), salle de musculation, 3 × 45 min

- **Sport** : course · **objectifs** : performance (force, économie de course)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Salle de musculation, Barre et disques, Haltères ou kettlebell · **disponibilité** : 3 × 45 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Trap bar | 4 × 5–6, repos 120 s (~7 min) | objectif : performance | strong |
| 2 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Barre libre | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 3 | Swing kettlebell | 2/5 — Swing à deux mains | Kettlebell (ou haltère) | 5 × 10, repos 60 s (~7 min) | objectif : performance | moderate |
| 4 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 3 × 12–15 /côté, tempo 2-0-2, repos 75 s (~8 min) | objectif : performance | strong |
| 5 | Soulevé de terre jambes tendues (roumain) | 2/4 — Charge légère | Barre | 3 × 10–12, tempo 3-0-1, repos 90 s (~5 min) | objectif : performance | moderate |
| 6 | Tirage isométrique mi-cuisse | 2/4 — Effort maximal | Smith machine | 3 × 5 s, repos 75 s (~3 min) | objectif : performance | low |

**Séance B** — 5 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Sauts de haies | 2/5 — Haies basses stabilisées | Poids du corps | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 2 | Montée sur pointes jambe tendue | 2/5 — Une jambe au sol | Machine à mollets debout ou presse | 3 × 12–15 /côté, tempo 3-0-3, repos 90 s (~11 min) | objectif : performance | strong |
| 3 | Squat | 2/5 — Squat au poids du corps | Squat à la barre | 3 × 15–20, tempo 3-1-1, repos 60 s (~6 min) | objectif : performance | strong |
| 4 | Presse à cuisses | 2/5 — Une jambe | Presse à cuisses (machine) | 3 × 10–12 /côté, tempo 3-0-2, repos 90 s (~9 min) | objectif : performance | moderate |
| 5 | Leg curl (flexion de genou) | 2/4 — Deux montent, une descend | Machine assise ou couchée | 3 × 8–10 /côté, tempo 4-0-1, repos 90 s (~8 min) | objectif : performance | low |

**Séance C** — 7 exercices, ~45 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Bondissements | 2/4 — Bonds alternés courts | Poids du corps | 4 × 6–8, repos 120 s (~7 min) | objectif : performance | moderate |
| 2 | Sauts de cheville (pogo) | 2/5 — Deux pieds, plus haut et plus vite | Haltères légers | 3 × 20–30, tempo X-0-X, repos 90 s (~5 min) | objectif : performance | moderate |
| 3 | Poussée de traîneau | 2/4 — Traîneau léger | Traîneau ou prowler | 6 × 5 s, repos 90 s (~8 min) | objectif : performance | moderate |
| 4 | Soulevé de terre | 2/5 — Kettlebell ou haltères | Trap bar (barre hexagonale) | 3 × 8–10, tempo 2-0-1, repos 90 s (~4 min) | objectif : performance | moderate |
| 5 | Fente statique et squat bulgare | 2/5 — Fente statique complète | Barre sur le dos | 3 × 10–15 /côté, tempo 3-0-1, repos 60 s (~7 min) | objectif : performance | moderate |
| 6 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~2 min) | prévention (course) | strong |
| 7 | Gamme de cheville (ankling) | 2/4 — En avançant | Poids du corps | 3 × 20 s, repos 45 s (~3 min) | objectif : performance | expert |

## Cycliste sur route, performance (force, sprint / force-vélocité), salle + barre, 4 × 45 min

- **Sport** : vélo · **objectifs** : performance (force, sprint / force-vélocité)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Salle de musculation, Barre et disques · **disponibilité** : 4 × 45 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 7 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Trap bar | 4 × 5–6, repos 120 s (~7 min) | objectif : performance | strong |
| 2 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Barre libre | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 3 | Soulevé de terre | 2/5 — Kettlebell ou haltères | Trap bar (barre hexagonale) | 3 × 8–10, tempo 2-0-1, repos 90 s (~4 min) | objectif : performance | moderate |
| 4 | Presse à cuisses | 2/5 — Une jambe | Presse à cuisses (machine) | 3 × 10–12 /côté, tempo 3-0-2, repos 90 s (~9 min) | objectif : performance | moderate |
| 5 | Isométries cervicales (4 directions) | 1/4 — Main, effort léger | Résistance avec la main | 3 × 10 s, repos 20 s (~1 min) | prévention (vélo) | moderate |
| 6 | Haussement d’épaules (trapèzes supérieurs) | 1/3 — Sans charge, tenue en haut | Barre | 2 × 12–15, tempo 2-3-2, repos 45 s (~4 min) | prévention (vélo) | moderate |
| 7 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 3 × 30 s /côté, repos 20 s (~4 min) | prévention (vélo) | strong |

**Séance B** — 7 exercices, ~43 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 3 × 12–15 /côté, tempo 2-0-2, repos 75 s (~8 min) | objectif : performance | strong |
| 2 | Nordic hamstring (ischios nordiques) | 2/4 — Descente complète, réception sur les mains | Banc à Nordic | 3 × 5–6, tempo 4-0-X, repos 120 s (~5 min) | objectif : performance | strong |
| 3 | Soulevé de terre jambes tendues (roumain) | 2/4 — Charge légère | Barre | 3 × 10–12, tempo 3-0-1, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Rentré de menton (fléchisseurs profonds du cou) | 1/4 — Assis ou debout, dos au mur | Poids du corps | 10 × 10 s, repos 10 s (~3 min) | prévention (vélo) | moderate |
| 5 | Extension du dos (lombaires) | 1/5 — Petite amplitude au sol | Banc à lombaires ou machine | 3 × 10–12, tempo 2-1-2, repos 45 s (~4 min) | prévention (vélo) | low |
| 6 | Extension cervicale à quatre pattes | 1/4 — Quatre pattes, flexion-extension | Au sol | 3 × 8–10, tempo 3-1-3, repos 30 s (~4 min) | prévention (vélo) | moderate |
| 7 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Poids du corps | 2 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~5 min) | prévention (vélo) | low |

**Séance C** — 8 exercices, ~44 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Tirage explosif depuis la suspension (hang pull) | 2/5 — Jump shrug | Barre et disques | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 2 | Swing kettlebell | 1/5 — Charnière dynamique | Sans charge | 3 × 8–10, tempo 2-0-X, repos 60 s (~3 min) | objectif : performance | moderate |
| 3 | Fentes sautées | 2/5 — Fente sautée sans changement | Poids du corps | 3 × 5–6 /côté, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Squat | 2/5 — Squat au poids du corps | Squat à la barre | 3 × 15–20, tempo 3-1-1, repos 60 s (~6 min) | objectif : performance | strong |
| 5 | Tirage horizontal (rowing) | 1/4 — Tirage facile | Poulie basse ou machine | 3 × 12–15, tempo 2-1-2, repos 60 s (~5 min) | prévention (vélo) | moderate |
| 6 | Pont ischios (levier long) | 1/5 — Maintien deux jambes | Poids du corps | 3 × 30 s, repos 45 s (~3 min) | prévention (vélo) | low |
| 7 | Écarté d’élastique | 1/4 — Élastique léger | Poulie ou machine (pec deck inversé) | 2 × 12–15, tempo 2-1-2, repos 45 s (~3 min) | prévention (vélo) | low |
| 8 | Dead bug | 1/5 — Jambes seules | Poids du corps | 3 × 8–10 /côté, tempo 2-0-2, repos 45 s (~5 min) | prévention (vélo) | low |

**Séance D** — 5 exercices, ~43 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes jambe tendue | 2/5 — Une jambe au sol | Machine à mollets debout ou presse | 3 × 12–15 /côté, tempo 3-0-3, repos 90 s (~11 min) | objectif : performance | strong |
| 2 | Leg curl (flexion de genou) | 2/4 — Deux montent, une descend | Machine assise ou couchée | 3 × 8–10 /côté, tempo 4-0-1, repos 90 s (~8 min) | objectif : performance | low |
| 3 | Extension de genou (leg extension) | 1/4 — Amplitude réduite, sans charge | Machine leg extension | 3 × 15–20 /côté, tempo 2-2-2, repos 45 s (~12 min) | prévention (vélo) | moderate |
| 4 | Pompe scapulaire (dentelé antérieur) | 1/4 — Contre un mur | Poids du corps | 3 × 12–15, tempo 2-1-2, repos 45 s (~5 min) | prévention (vélo) | moderate |
| 5 | Gainage ventral (planche) | 1/5 — Planche sur les genoux | Au sol | 3 × 30 s, repos 45 s (~3 min) | prévention (vélo) | low |

## Traileur, tendinopathie d’Achille (portion moyenne) en phase irritable, élastique, 3 × 15 min

- **Sport** : course · **objectifs** : douleur actuelle
- **Douleurs** : Tendinopathie d’Achille (portion moyenne) — phase irritable
- **Matériel** : Poids du corps, Mini-band / élastique · **disponibilité** : 3 × 15 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 3 exercices, ~16 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 10–15, tempo 3-0-3, repos 60 s (~6 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | strong |
| 2 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~2 min) | prévention (course) | strong |
| 3 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |

**Séance B** — 3 exercices, ~15 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Isométrie du soléaire assis | 1/4 — Poussée modérée | Sous une table | 3 × 30 s /côté, repos 45 s (~5 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |
| 2 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Chaise, canapé ou partenaire | 2 × 20 s /côté, repos 45 s (~2 min) | prévention (course) | strong |
| 3 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |

**Séance C** — 3 exercices, ~15 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | prévention (course) | strong |
| 2 | Maintien isométrique sur pointes | 1/3 — Deux pieds | Poids du corps | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie d’Achille (portion moyenne) | expert |
| 3 | Pied court (short foot) | 1/4 — Assis | Pieds nus | 2 × 5 s /côté, repos 30 s (~1 min) | prévention (course) | moderate |

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
| 3 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Lesté (haltère) | 2 × 4–6, tempo 3-0-X, repos 75 s (~2 min) | objectif : prévention | strong |
| 4 | Descente de marche contrôlée | 1/4 — Descente latérale, marche basse | Haltères | 3 × 10–12 /côté, tempo 3-0-1, repos 60 s (~6 min) | pathologie : Syndrome fémoro-patellaire | moderate |
| 5 | Marche latérale avec élastique | 1/4 — Pas chassés sans élastique | Poids du corps | 3 × 12–15 /côté, repos 45 s (~6 min) | pathologie : Syndrome fémoro-patellaire | low |

**Séance B** — 5 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Squat | 1/5 — Squat sur chaise | Squat gobelet (haltère ou kettlebell) | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | pathologie : Syndrome fémoro-patellaire | strong |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Haltères sur les genoux | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 3 | Descente de marche contrôlée | 1/4 — Descente latérale, marche basse | Haltères | 3 × 10–12 /côté, tempo 3-0-1, repos 60 s (~6 min) | pathologie : Syndrome fémoro-patellaire | moderate |
| 4 | Marche latérale avec élastique | 1/4 — Pas chassés sans élastique | Poids du corps | 3 × 12–15 /côté, repos 45 s (~6 min) | pathologie : Syndrome fémoro-patellaire | low |
| 5 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Banc | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |

## Cycliste, genou du cycliste + lombalgie en phase irritable, poids du corps + swiss ball, 2 × 30 min

- **Sport** : vélo · **objectifs** : douleur actuelle
- **Douleurs** : Genou du cycliste — phase irritable ; Lombalgie du coureur et du cycliste — phase irritable
- **Matériel** : Poids du corps, Swiss ball · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 5 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Abduction de hanche couché sur le côté | 1/4 — Genou fléchi | Poids du corps | 3 × 12–15 /côté, tempo 2-0-1-1, repos 45 s (~7 min) | pathologie : Genou du cycliste | low |
| 2 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Ventre sur swiss ball | 3 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~8 min) | pathologie : Lombalgie du coureur et du cycliste | low |
| 3 | Chaise contre le mur | 1/4 — Chaise haute | Swiss ball dans le dos | 5 × 30 s, repos 60 s (~7 min) | pathologie : Genou du cycliste | expert |
| 4 | Chat-vache (mobilité lombaire) | 1/3 — Amplitude confortable | Assis sur swiss ball | 2 × 8–10, tempo 3-0-3, repos 20 s (~2 min) | pathologie : Lombalgie du coureur et du cycliste | expert |
| 5 | Curl-up de McGill | 1/4 — Coudes au sol | Poids du corps | 2 × 5–6, tempo 1-0-1-8, repos 30 s (~2 min) | pathologie : Lombalgie du coureur et du cycliste | low |

**Séance B** — 5 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Abduction de hanche couché sur le côté | 1/4 — Genou fléchi | Poids du corps | 3 × 12–15 /côté, tempo 2-0-1-1, repos 45 s (~7 min) | pathologie : Genou du cycliste | low |
| 2 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Ventre sur swiss ball | 3 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~8 min) | pathologie : Lombalgie du coureur et du cycliste | low |
| 3 | Chaise contre le mur | 1/4 — Chaise haute | Swiss ball dans le dos | 5 × 30 s, repos 60 s (~7 min) | pathologie : Genou du cycliste | expert |
| 4 | Chat-vache (mobilité lombaire) | 1/3 — Amplitude confortable | Assis sur swiss ball | 2 × 8–10, tempo 3-0-3, repos 20 s (~2 min) | pathologie : Lombalgie du coureur et du cycliste | expert |
| 5 | Gainage latéral | 1/4 — Sur les genoux | Avant-bras sur swiss ball | 3 × 15 s /côté, repos 30 s (~3 min) | pathologie : Lombalgie du coureur et du cycliste | low |

## Triathlète (course + vélo), prévention + puissance, haltères + élastique + TRX, 5 × 1 h

- **Sport** : course + vélo · **objectifs** : prévention, performance (puissance)
- **Douleurs** : aucune
- **Matériel** : Poids du corps, Haltères ou kettlebell, Mini-band / élastique, TRX / sangles de suspension · **disponibilité** : 5 × 60 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 10 exercices, ~60 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut vertical avec contre-mouvement (CMJ) | 2/5 — Sauts enchaînés | Haltères ou gilet lesté | 4 × 5–6, repos 120 s (~7 min) | objectif : performance | strong |
| 2 | Squat | 1/5 — Squat sur chaise | Squat gobelet (haltère ou kettlebell) | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | strong |
| 3 | Soulevé de terre jambes tendues (roumain) | 1/4 — Charnière au poids du corps | Haltères ou kettlebell | 3 × 12–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | moderate |
| 4 | Rotation externe d’épaule | 1/5 — Isométrie contre un cadre de porte | Élastique | 5 × 20 s /côté, repos 30 s (~5 min) | objectif : prévention | low |
| 5 | Pont ischios (levier long) | 1/5 — Maintien deux jambes | Haltère sur le bassin | 5 × 30 s, repos 60 s (~7 min) | objectif : prévention | low |
| 6 | Relevé de pointe (tibial antérieur) | 1/4 — Deux pieds, talons proches du mur | Haltère | 3 × 15–20, tempo 2-0-1, repos 45 s (~4 min) | objectif : prévention | low |
| 7 | Fente latérale et squat cosaque | 1/4 — Fente latérale partielle | Haltère ou kettlebell (gobelet) | 3 × 8–10 /côté, tempo 2-0-1, repos 60 s (~5 min) | objectif : prévention | expert |
| 8 | Extension du dos (lombaires) | 1/5 — Petite amplitude au sol | Au sol | 3 × 10–12, tempo 2-1-2, repos 45 s (~4 min) | objectif : prévention | low |
| 9 | Mobilité de hanche en rotation (figure 4 et 90/90) | 1/4 — Figure 4 allongé | Poids du corps | 3 × 30 s /côté, repos 15 s (~4 min) | objectif : prévention | expert |
| 10 | Rotation thoracique (livre ouvert) | 1/3 — Livre ouvert couché | Au sol | 2 × 8–10 /côté, tempo 3-2-3, repos 20 s (~5 min) | objectif : prévention | expert |

**Séance B** — 10 exercices, ~59 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Bondissements | 2/4 — Bonds alternés courts | Poids du corps | 4 × 6–8, repos 120 s (~7 min) | objectif : performance | moderate |
| 2 | Pont fessier et hip thrust | 2/5 — Pont sur une jambe | Élastique au-dessus des genoux | 3 × 10–12 /côté, tempo 2-0-1-2, repos 60 s (~8 min) | objectif : performance | moderate |
| 3 | Sauts de cheville (pogo) | 2/5 — Deux pieds, plus haut et plus vite | Haltères légers | 3 × 20–30, tempo X-0-X, repos 90 s (~5 min) | objectif : performance | moderate |
| 4 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Haltères sur les genoux | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | objectif : prévention | strong |
| 5 | Tirage horizontal (rowing) | 1/4 — Tirage facile | Haltère à un bras | 3 × 12–15, tempo 2-1-2, repos 60 s (~5 min) | objectif : prévention | moderate |
| 6 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | objectif : prévention | moderate |
| 7 | Écarté d’élastique | 1/4 — Élastique léger | Élastique | 2 × 12–15, tempo 2-1-2, repos 45 s (~3 min) | objectif : prévention | low |
| 8 | Relevé de bassin contrôlé (crunch inversé) | 1/4 — Bascule du bassin | Pieds dans les sangles (TRX) | 3 × 12–15, tempo 2-1-2, repos 30 s (~4 min) | objectif : prévention | low |
| 9 | Gainage latéral | 1/4 — Sur les genoux | Pieds dans les sangles (TRX) | 3 × 20 s /côté, repos 30 s (~3 min) | objectif : prévention | low |
| 10 | Étirement des fléchisseurs de hanche (fente à genou) | 1/3 — Fente à genou | Poids du corps | 3 × 30 s /côté, repos 15 s (~4 min) | objectif : prévention | low |

**Séance C** — 10 exercices, ~59 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Fentes sautées | 2/5 — Fente sautée sans changement | Haltères légers | 3 × 5–6 /côté, repos 90 s (~5 min) | objectif : performance | moderate |
| 2 | Extension du poignet | 1/4 — Isométrie | Haltère | 5 × 30 s /côté, repos 30 s (~7 min) | objectif : prévention | expert |
| 3 | Presse à cuisses | 1/5 — Deux jambes, charge modérée | Presse à l’élastique, allongé | 3 × 12–15, tempo 3-0-2, repos 90 s (~6 min) | objectif : prévention | moderate |
| 4 | Pompe scapulaire (dentelé antérieur) | 1/4 — Contre un mur | Élastique dans le dos | 3 × 12–15, tempo 2-1-2, repos 45 s (~5 min) | objectif : prévention | moderate |
| 5 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Sangles de suspension | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |
| 6 | Adduction debout (élastique ou poulie) | 1/3 — Résistance légère | Élastique | 3 × 12–15 /côté, tempo 3-0-1, repos 45 s (~7 min) | objectif : prévention | low |
| 7 | Rentré de menton (fléchisseurs profonds du cou) | 1/4 — Assis ou debout, dos au mur | Contre un élastique léger | 10 × 10 s, repos 10 s (~3 min) | objectif : prévention | moderate |
| 8 | Bird dog (quadrupédie bras-jambe opposés) | 1/5 — Jambe seule | Élastique main-pied | 3 × 6–8 /côté, tempo 2-0-2-5, repos 45 s (~8 min) | objectif : prévention | low |
| 9 | Glissé au mur (wall slide) | 1/4 — Glissé, amplitude confortable | Élastique autour des avant-bras | 2 × 10–12, tempo 2-1-2, repos 45 s (~3 min) | objectif : prévention | low |
| 10 | Mobilité du haut du dos (extension thoracique) | 1/3 — Sur une chaise | Chaise et tapis | 2 × 8–10, tempo 2-2-2, repos 30 s (~2 min) | objectif : prévention | expert |

**Séance D** — 11 exercices, ~59 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Saut en longueur sans élan | 2/5 — Saut maximal collé | Poids du corps | 4 × 4, repos 120 s (~7 min) | objectif : performance | moderate |
| 2 | Tirage explosif depuis la suspension (hang pull) | 2/5 — Jump shrug | Haltères ou kettlebell | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 3 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Lesté (haltère) | 2 × 4–6, tempo 3-0-X, repos 90 s (~2 min) | objectif : prévention | strong |
| 4 | Extension de genou (leg extension) | 1/4 — Amplitude réduite, sans charge | Élastique | 3 × 15–20 /côté, tempo 2-2-2, repos 45 s (~12 min) | objectif : prévention | moderate |
| 5 | Leg curl (flexion de genou) | 1/4 — Deux jambes, charge légère | Élastique | 3 × 12–15, tempo 3-0-1, repos 60 s (~5 min) | objectif : prévention | low |
| 6 | Isométries cervicales (4 directions) | 1/4 — Main, effort léger | Élastique | 3 × 10 s, repos 20 s (~1 min) | objectif : prévention | moderate |
| 7 | Y-T-W allongé sur le ventre | 1/4 — W et T, sans charge | Haltères légers | 2 × 8–10, tempo 2-2-2, repos 45 s (~3 min) | objectif : prévention | low |
| 8 | Renforcement de la préhension | 1/4 — Serrage de balle ou de serviette | Haltères ou kettlebells | 2 × 10 /côté, repos 30 s (~3 min) | objectif : prévention | expert |
| 9 | Pied court (short foot) | 1/4 — Assis | Pieds nus | 3 × 5 s /côté, repos 30 s (~2 min) | objectif : prévention | moderate |
| 10 | Dead bug | 1/5 — Jambes seules | Élastique fixé derrière la tête | 3 × 8–10 /côté, tempo 2-0-2, repos 45 s (~5 min) | objectif : prévention | low |
| 11 | Atteintes en étoile (Y-balance) | 1/4 — Trois directions, amplitude modérée | Haltère | 3 × 5 /côté, repos 45 s (~3 min) | objectif : prévention | low |

**Séance E** — 11 exercices, ~59 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Sauts de haies | 2/5 — Haies basses stabilisées | Poids du corps | 4 × 5, repos 90 s (~6 min) | objectif : performance | moderate |
| 2 | Montée sur pointes explosive | 2/4 — Une jambe | Haltère | 3 × 6–8 /côté, tempo 2-0-X, repos 90 s (~5 min) | objectif : performance | expert |
| 3 | Montée de genou (fléchisseurs de hanche) | 1/5 — Marche lente debout | Élastique | 2 × 8–10 /côté, tempo 2-0-1-2, repos 45 s (~4 min) | objectif : prévention | expert |
| 4 | Haussement d’épaules (trapèzes supérieurs) | 1/3 — Sans charge, tenue en haut | Haltères | 3 × 12–15, tempo 2-3-2, repos 45 s (~6 min) | objectif : prévention | moderate |
| 5 | Pompes | 1/5 — Pompes inclinées | Élastique dans le dos | 3 × 10–15, tempo 2-0-1, repos 60 s (~4 min) | objectif : prévention | low |
| 6 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Élastique | 3 × 30 s /côté, repos 20 s (~4 min) | objectif : prévention | strong |
| 7 | Extension cervicale à quatre pattes | 1/4 — Quatre pattes, flexion-extension | Au sol | 3 × 8–10, tempo 3-1-3, repos 30 s (~4 min) | objectif : prévention | moderate |
| 8 | Gainage ventral (planche) | 1/5 — Planche sur les genoux | Pieds dans les sangles (TRX) | 3 × 30 s, repos 45 s (~3 min) | objectif : prévention | low |
| 9 | Rollout (roulé vers l’avant) | 1/4 — À genoux, petite amplitude | Sangles de suspension (fallout) | 3 × 8–10, tempo 3-1-2, repos 60 s (~5 min) | objectif : prévention | low |
| 10 | Marche avec charge d’un côté (suitcase carry) | 1/4 — Charge légère | Haltère ou kettlebell | 3 × 30 s /côté, repos 45 s (~5 min) | objectif : prévention | low |
| 11 | Étirement du petit pectoral (cadre de porte) | 1/3 — Coude à hauteur d’épaule | Cadre de porte | 3 × 30 s /côté, repos 15 s (~4 min) | objectif : prévention | low |

## Coureur en reprise après fracture de fatigue (feu vert médical), poids du corps + marche, 2 × 30 min

- **Sport** : course · **objectifs** : reprise
- **Douleurs** : Fracture de fatigue (reprise) — phase retour au sport
- **Matériel** : Poids du corps, Marche, step ou banc · **disponibilité** : 2 × 30 min
- **Avertissements du moteur** : medical-clearance (bone-stress-injury)
- **Invariants** : ✅ tous respectés

**Séance A** — 6 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 2 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~7 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 3 | Squat | 1/5 — Squat sur chaise | Poids du corps | 3 × 10–15, tempo 3-0-1, repos 60 s (~5 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 4 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Partenaire ou meuble | 2 × 4–6, tempo 3-0-X, repos 90 s (~2 min) | prévention (course) | strong |
| 5 | Équilibre sur une jambe | 1/5 — Sol, yeux ouverts | Poids du corps | 3 × 30 s /côté, repos 20 s (~4 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 6 | Pied court (short foot) | 2/4 — Debout, deux pieds | Pieds nus | 2 × 5 s /côté, repos 30 s (~1 min) | pathologie : Fracture de fatigue (reprise) | moderate |

**Séance B** — 6 exercices, ~29 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Poids du corps | 2 × 12–15, tempo 2-0-1-2, repos 45 s (~3 min) | prévention (course) | moderate |
| 2 | Montée sur pointes genou fléchi | 1/4 — Deux jambes, genoux fléchis | Poids du corps sur une jambe | 3 × 15–20, tempo 2-0-2, repos 60 s (~6 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 3 | Montée sur pointes jambe tendue | 1/5 — Deux pieds au sol | Poids du corps | 3 × 15–20, tempo 3-0-3, repos 60 s (~7 min) | pathologie : Fracture de fatigue (reprise) | strong |
| 4 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Banc | 3 × 20 s /côté, repos 45 s (~4 min) | prévention (course) | strong |
| 5 | Serrage des adducteurs (isométrie) | 1/4 — Genoux fléchis, effort modéré | Ballon, coussin ou poings | 5 × 20 s, repos 30 s (~4 min) | prévention (course) | moderate |
| 6 | Pied court (short foot) | 2/4 — Debout, deux pieds | Pieds nus | 3 × 5 s /côté, repos 30 s (~2 min) | pathologie : Fracture de fatigue (reprise) | moderate |

## Cycliste, cervicalgie + fourmillements des mains en reconstruction, élastique + haltères, 1 × 15 min

- **Sport** : vélo · **objectifs** : douleur actuelle
- **Douleurs** : Douleur de nuque du cycliste — phase reconstruction ; Fourmillements des mains du cycliste — phase reconstruction
- **Matériel** : Poids du corps, Mini-band / élastique, Haltères ou kettlebell · **disponibilité** : 1 × 15 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 4 exercices, ~17 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Extension du poignet | 2/4 — Charge légère | Haltère | 2 × 12–15 /côté, tempo 3-0-1, repos 45 s (~4 min) | pathologie : Fourmillements des mains du cycliste | expert |
| 2 | Renforcement de la préhension | 1/4 — Serrage de balle ou de serviette | Haltères ou kettlebells | 2 × 10 /côté, repos 30 s (~3 min) | pathologie : Fourmillements des mains du cycliste | expert |
| 3 | Rentré de menton (fléchisseurs profonds du cou) | 3/4 — Tête décollée, menton rentré | Contre un élastique léger | 4 × 15 s, repos 30 s (~3 min) | pathologie : Douleur de nuque du cycliste | moderate |
| 4 | Extension cervicale à quatre pattes | 1/4 — Quatre pattes, flexion-extension | Au sol | 3 × 8–10, tempo 3-1-3, repos 30 s (~4 min) | pathologie : Douleur de nuque du cycliste | moderate |

## Coureuse, tendinopathie glutéale (irritable) + talalgie plantaire (reconstruction), salle, 3 × 30 min

- **Sport** : course · **objectifs** : douleur actuelle, prévention
- **Douleurs** : Tendinopathie glutéale (douleur latérale de hanche) — phase irritable ; Talalgie plantaire (fasciite plantaire) — phase reconstruction
- **Matériel** : Poids du corps, Salle de musculation, Haltères ou kettlebell, Mini-band / élastique, Marche, step ou banc · **disponibilité** : 3 × 30 min
- **Avertissements du moteur** : aucun
- **Invariants** : ✅ tous respectés

**Séance A** — 4 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 2 | Montée sur pointes genou fléchi | 2/4 — Une jambe, genou fléchi | Machine à mollets assis | 2 × 12–15 /côté, tempo 2-0-2, repos 60 s (~5 min) | pathologie : Talalgie plantaire (fasciite plantaire) | strong |
| 3 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |
| 4 | Maintien isométrique genou haut (psoas) | 1/4 — Assis, genou décollé | Poulie basse | 2 × 20 s /côté, repos 45 s (~2 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |

**Séance B** — 4 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Pont fessier et hip thrust | 1/5 — Pont sur deux pieds | Machine à hip thrust ou cadre guidé | 3 × 10–12, tempo 2-0-1-2, repos 60 s (~5 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | moderate |
| 2 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 3 | Nordic hamstring (ischios nordiques) | 1/4 — Descente partielle assistée | Banc à Nordic | 2 × 4–6, tempo 3-0-X, repos 75 s (~2 min) | objectif : prévention | strong |
| 4 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |

**Séance C** — 4 exercices, ~30 min

| # | Exercice | Niveau | Variante | Dosage | Raison | Preuve |
|---|---|---|---|---|---|---|
| 1 | Montée sur pointes, serviette sous les orteils (Rathleff) | 3/5 — Une jambe sur marche | Machine à mollets debout | 3 × 10–12 /côté, tempo 3-0-3-2, repos 120 s (~13 min) | pathologie : Talalgie plantaire (fasciite plantaire) | moderate |
| 2 | Abduction de hanche isométrique | 1/4 — Allongé, ceinture autour des cuisses | Mini-bande | 5 × 30 s, repos 60 s (~7 min) | pathologie : Tendinopathie glutéale (douleur latérale de hanche) | expert |
| 3 | Renforcement des orteils (toe yoga, pression des orteils) | 2/4 — Pression des orteils assis | Élastique | 5 × 10 s /côté, repos 20 s (~3 min) | pathologie : Talalgie plantaire (fasciite plantaire) | low |
| 4 | Copenhagen (gainage latéral adducteurs) | 1/4 — Levier court, maintien | Banc | 3 × 20 s /côté, repos 45 s (~4 min) | objectif : prévention | strong |

## Bilan

✅ Les 10 profils produisent des programmes qui respectent tous les invariants.
