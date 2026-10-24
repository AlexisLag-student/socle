# Journal des versions — Changelog

Toutes les évolutions de Socle, de la plus récente à la plus ancienne. Versionnage sémantique : correctif = bug corrigé, mineur = fonctionnalité ou contenu ajouté sans rien casser, majeur = changement qui casse l’existant (par exemple les liens de partage).

Ce fichier est affiché dans l’app (Réglages › Nouveautés) : garder le format `## [x.y.z] — AAAA-MM-JJ`, puis `### Français` et `### English`, chacun avec une liste à puces.

Les évolutions s’ajoutent au fur et à mesure dans la section « À venir », jamais affichée dans l’app. Une version n’est publiée que sur demande : `npm run release -- <patch|minor|major>` transforme cette section en entrée datée (voir README, section Déployer).

## [À venir]

### Français

### English

## [0.7.0] — 2026-10-24

### Français

- Jusqu’à 5 séances par semaine, en mode sportif comme en mode praticien. À partir de 4 séances, le programme alterne les zones travaillées d’une séance à l’autre et laisse un jour de récupération aux exercices qui en ont besoin.
- Nouvelle durée de séance : 1 h. La durée estimée compte désormais les repos entre les séries et entre les exercices ; une séance de 15 min peut donc comporter un exercice de moins.
- Repos guidé entre les exercices : un minuteur, l’aperçu de l’exercice suivant, « +15 s » et « Passer le repos ». Un signal discret (son ou vibration, selon vos réglages) annonce la fin du repos.
- Avec le rythme affiché, le compteur s’arrête au nombre de répétitions prévu, puis la série se valide seule et le repos démarre. Vous pouvez toujours terminer une série plus tôt.
- Mode praticien : indiquez une durée visée et voyez la durée estimée de chaque séance, repos compris.
- Les liens de partage existants s’ouvrent comme avant. Un lien de 5 séances ou avec une durée visée demande de mettre l’app à jour s’il est ouvert avec une ancienne version.

### English

- Up to 5 sessions per week, in both athlete and practitioner modes. From 4 sessions on, the program alternates the areas worked from one session to the next and gives a recovery day to the exercises that need one.
- New session length: 1 hour. The estimated length now includes rest between sets and between exercises, so a 15-minute session may have one exercise fewer.
- Guided rest between exercises: a timer, a preview of the next exercise, “+15 s” and “Skip rest”. A discreet signal (sound or vibration, depending on your settings) marks the end of the rest.
- With the rhythm shown, the counter stops at the planned number of reps, then the set is ticked off and the rest starts. You can still end a set early.
- Practitioner mode: set a target length and see the estimated length of each session, rest included.
- Existing share links open as before. A link with 5 sessions or a target length asks to update the app if opened in an older version.

## [0.6.0] — 2026-10-24

### Français

- Sur la fiche d’un exercice, choisissez le niveau et le matériel sous l’animation pour voir chaque version du mouvement. Le dosage affiché suit le niveau choisi ; votre progression et votre programme ne changent pas.
- Dans la liste des niveaux, le bouton « Voir l’animation » montre directement ce niveau.
- Dans la bibliothèque, le bouton « Niveaux » ouvre un aperçu de l’exercice avec le même choix de niveau et de matériel, sans quitter la liste.
- Un niveau qui n’a pas d’animation l’indique clairement : suivez alors sa description et le schéma des muscles.

### English

- On an exercise page, pick the level and equipment under the animation to see every version of the movement. The dosage shown follows the chosen level; your progress and your program don’t change.
- In the list of levels, the “Show the animation” button jumps straight to that level.
- In the library, the “Levels” button opens a preview of the exercise with the same level and equipment choice, without leaving the list.
- A level without an animation says so clearly: follow its description and the muscle diagram.

## [0.5.0] — 2026-10-24

### Français

- Presque tous les exercices sont maintenant animés : 103 sur 114 montrent leur mouvement, dans la fiche, la séance guidée, la bibliothèque et l’éditeur praticien, avec le même personnage que les premiers exercices.
- Chaque niveau et chaque variante de matériel a son animation : banc, chaise, mur, marche, box, haltères, kettlebell, barre ou élastique sont dessinés quand l’exercice les utilise.
- Les sauts qui avancent (saut en longueur, box jump, drop jump, haies) reviennent à leur point de départ en marchant ; les exercices qui se déplacent (marches, gammes, bondissements) sont montrés sur place.
- Les exercices tenus qui bougent (marche sur les talons, porté de valise…) s’animent pendant le minuteur de la tenue.
- Quelques exercices ou niveaux dont le mouvement ne se dessine pas bien (orteils, doigts, omoplates, rotations) gardent le schéma musculaire seul.

### English

- Almost every exercise is now animated: 103 out of 114 show their movement in the exercise page, the guided session, the library and the practitioner editor, with the same figure as the first exercises.
- Every level and equipment variant has its own animation: bench, chair, wall, step, box, dumbbells, kettlebell, barbell or band are drawn when the exercise uses them.
- Jumps that travel (broad jump, box jump, drop jump, hurdles) walk back to their starting point; exercises that move around (walks, drills, bounding) are shown on the spot.
- Held exercises that move (heel walk, suitcase carry…) play during the hold timer.
- A few exercises or levels whose movement can’t be drawn well (toes, fingers, shoulder blades, rotations) keep the muscle diagram only.

## [0.4.1] — 2026-10-23

### Français

- Corrigé : montée sur pointes et fente, les deux bras bougent maintenant de la même façon (mains posées au mur).
- Corrigé : squat sur chaise, la chaise est placée derrière vous et n’est plus traversée pendant le mouvement.
- Corrigé : soulevé de terre jambes tendues, le bâton dans le dos est retiré ; les deux bras pendent devant les cuisses et l’animation rappelle de garder le dos droit.
- Corrigé : la montée sur pointes sur une marche et le squat bulgare n’empiètent plus sur la marche ou le banc.

### English

- Fixed: calf raise and split squat, both arms now move the same way (hands on the wall).
- Fixed: chair squat, the chair now sits behind you and is no longer crossed during the movement.
- Fixed: Romanian deadlift, the stick along the back is gone; both arms hang in front of the thighs and the animation reminds you to keep your back flat.
- Fixed: the calf raise on a step and the Bulgarian split squat no longer overlap the step or the bench.

## [0.4.0] — 2026-10-23

### Français

- Ajouté : les exercices s’animent désormais (10 premiers exercices) dans la fiche, la séance guidée (au rythme des répétitions), la bibliothèque et le mode praticien ; affichage des poses clés si les animations sont réduites sur l’appareil.
- Dans la bibliothèque, une vignette montre la pose de chaque exercice animé : touchez-la (ou survolez-la à la souris) pour voir le mouvement.
- En séance guidée, l’animation suit le rythme affiché et se met en pause avec lui ; chaque nouvel exercice s’affiche depuis le haut de l’écran.
- Corrigé : dans la bibliothèque, une recherche tapée rapidement n’est plus remplacée par la précédente.

### English

- Added: exercises are now animated (first 10 exercises) in the exercise page, guided session (in time with each rep), library and practitioner mode; key poses shown when reduced motion is enabled.
- In the library, a thumbnail shows the pose of each animated exercise: tap it (or hover with a mouse) to see the movement.
- In a guided session, the animation follows the displayed tempo and pauses with it; each new exercise opens at the top of the screen.
- Fixed: in the library, a search typed quickly is no longer replaced by the previous one.

## [0.3.0] — 2026-10-23

### Français

- Le numéro de version est affiché en bas des Réglages, avec un lien **Nouveautés** qui ouvre ce journal dans l’app.
- Quand une nouvelle version de Socle est publiée, un bandeau **Nouvelle version disponible** propose de **Recharger** ou de le faire **Plus tard**. Vos données (profil, programmes, historique) restent sur l’appareil.
- Le bandeau n’apparaît jamais pendant une séance guidée : il attend la fin de la séance.
- L’app vérifie les mises à jour quand vous la rouvrez ou revenez dessus.

### English

- The version number is shown at the bottom of Settings, with a **What’s new** link that opens this changelog in the app.
- When a new version of Socle is published, a **New version available** banner lets you **Reload** now or **Later**. Your data (profile, programs, history) stays on your device.
- The banner never shows during a guided session: it waits until the session is over.
- The app checks for updates whenever you open it or come back to it.

## [0.2.0] — 2026-10-23

### Français

- **Mode sportif** : sport, objectifs, douleurs (carte du corps ou liste), phase, matériel et disponibilité ; un moteur de recommandation génère un programme personnalisé en séances A/B/C.
- **Mode praticien** : composer un programme depuis la bibliothèque, ajuster les dosages, ajouter des notes et le partager par lien ou QR code.
- **Séance guidée** : minuteur lisible de loin, tempo visuel et sonore, suivi des séries et des charges, ressenti facile / correct / trop dur, puis propositions de progression.
- **Contenu** : 114 exercices et 25 pathologies, avec 172 références scientifiques vérifiées et un niveau de preuve ; un schéma musculaire pour chaque exercice.
- Historique et graphiques, rappels (notifications et export calendrier), impression et PDF, sauvegarde et restauration.
- Fonctionne hors ligne, sans compte : tout reste sur l’appareil. Français et anglais, thème clair et sombre.
- Nouvelle identité visuelle « cahier d’entraînement » : papier Seyès, encre bleue, stylo rouge, notes manuscrites.

### English

- **Athlete mode**: sport, goals, pain (body map or list), phase, equipment and availability; a recommendation engine builds a personal program in A/B/C sessions.
- **Practitioner mode**: build a program from the library, adjust dosages, add notes and share it with a link or QR code.
- **Guided session**: timer readable from a distance, visual and audio tempo, set and load tracking, easy / right / too hard feedback, then progression suggestions.
- **Content**: 114 exercises and 25 conditions, with 172 verified scientific references and a level of evidence; a muscle diagram for every exercise.
- History and charts, reminders (notifications and calendar export), printing and PDF, backup and restore.
- Works offline, no account: everything stays on your device. French and English, light and dark themes.
- New “training notebook” look: Seyès paper, blue ink, red pen, handwritten notes.
