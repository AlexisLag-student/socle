# Refonte visuelle de Socle : direction « cahier d'entraînement »

## Ta mission

Applique une nouvelle identité visuelle à toute l'application Socle, **sans changer ses fonctionnalités, son contenu ni sa logique**. C'est une refonte de l'interface : couleurs, typographie, composants, mise en page et schémas musculaires.

Le dossier `design/` à la racine du projet contient la référence :

- `design/captures/` : les 4 écrans mobiles de référence (accueil, programme, fiche exercice, séance guidée) et une planche de style ;
- `design/maquettes/` : le code HTML de ces mêmes écrans. **C'est la source de vérité pour les valeurs exactes** (couleurs, tailles, espacements, épaisseurs de trait). Les captures servent à voir l'intention, le HTML à mesurer.

Commence par ouvrir toutes les captures et lire tous les fichiers HTML. Puis passe en mode plan : liste les composants et écrans existants de l'app, explique comment tu vas leur appliquer le style, et attends ma validation avant de coder.

---

## Le concept

L'app devient un **cahier d'écolier français à grands carreaux (Seyès)** :

- un papier clair rayé de lignes bleues, avec la marge rouge à gauche ;
- une encre bleu stylo-plume pour l'interface ;
- un stylo rouge pour les muscles, les éléments actifs et les annotations importantes ;
- une écriture manuscrite pour ce que l'utilisateur ou le coach « note » (charges, ressentis, conseils de progression) ;
- des tampons pour les niveaux de preuve.

Le concept doit rester **une signature discrète, pas un déguisement** : la lisibilité en pleine séance passe toujours avant l'effet cahier.

---

## Design tokens

Centralise tout dans des variables CSS (ou le thème Tailwind si le projet l'utilise). Aucune couleur en dur dans les composants.

### Couleurs, mode clair (par défaut)

| Rôle | Valeur |
|---|---|
| Papier (fond) | `#FBFAF6` |
| Carte / surface | `#FFFFFF` |
| Encre (texte fort, traits, boutons) | `#1F2A5C` |
| Texte courant | `#22252B` |
| Texte secondaire | `#3A3F4B` |
| Texte discret | `#5A6070` |
| Désactivé / à venir | `#8A90A0` |
| Stylo rouge (muscles, actif, accent) | `#B22A33` |
| Rouge clair (tendons, progression restante) | `#E8C4C7` / `#F1D5D7` |
| Ligne Seyès principale (tous les 32 px) | `#BCCDE6` |
| Ligne Seyès secondaire (tous les 8 px) | `#E6ECF6` |
| Séparateurs de liste | `#C7D3E6` |
| Marge rouge (décor uniquement, jamais pour du texte) | `#E0565B` |
| Tampon « preuve forte » | `#2F7A4F` |
| Tampon « preuve faible » | `#8A5A00` |

### Couleurs, mode sombre (« papier carbone »)

Papier `#161B2E`, encre craie `#E9ECF5`, lignes bleu nuit `#2A3354` (secondaires plus discrètes), rouge éclairci `#FF6B73`. Dérive les autres valeurs pour garder les mêmes rôles et **vérifie tous les contrastes**. Le mode sombre suit le réglage du système et reste modifiable dans les réglages, comme aujourd'hui.

### Typographie

- **Zilla Slab** (500, 600, 700) : titres, chiffres clés (dosages, minuteur), surtitres en petites capitales espacées (`letter-spacing: 0.08em`, en majuscules, 13 px, rouge).
- **Atkinson Hyperlegible** (400, 700) : tout le texte courant et l'interface.
- **Caveat** (500, 700) : uniquement les annotations manuscrites (charges notées, ressentis, conseils, légendes de figure). Jamais pour un contenu indispensable à la compréhension, jamais en dessous de 20 px.

Héberge les polices **localement** (par exemple avec les paquets `@fontsource`), pas via Google Fonts : l'app doit rester utilisable hors ligne. Ajoute-les au cache du service worker.

### Formes

- Coins arrondis à **4 px** (6 px pour les tampons), cercles pour les jours de la semaine et le bouton lecture.
- Traits de **2 px** à l'encre pour les cartes, les boutons et les cases ; 1 à 1,5 px pour les séparateurs.
- **Ombre pleine décalée de 4 px** (`4px 4px 0`), sans flou : à l'encre pour la carte mise en avant, au rouge pour le bouton d'action principale. Une seule par écran.
- Pas de dégradés décoratifs, pas d'ombres floues, pas d'émojis.

### Le fond Seyès

- Lignes horizontales : une ligne principale tous les 32 px, une ligne secondaire tous les 8 px, et la marge rouge verticale (2 px) à 43 px du bord gauche sur mobile. Les dégradés CSS de la classe `.paper` dans les maquettes donnent le rendu exact.
- Le contenu commence à droite de la marge (environ 60 px à gauche, 22 px à droite sur mobile).
- Aligne autant que possible le texte sur la grille de 32 px (hauteurs de ligne de 24 ou 32 px).
- Sur grand écran, garde une colonne de contenu centrée (environ 720 px) ; la marge suit le bord gauche de cette colonne.
- **Ajoute dans les réglages une option « Lignes du cahier »** (activée par défaut) pour passer à un papier uni, pour ceux que les lignes gênent.

---

## Composants

Reprends chaque composant tel qu'il apparaît dans les maquettes :

1. **En-tête** : logo (les trois barres empilées : rouge en haut, contour à l'encre au milieu, encre pleine en bas) et nom en Zilla Slab ; date du jour en Caveat à droite.
2. **Navigation basse** : 5 onglets en grille, séparés par des traits fins, trait supérieur de 2 px à l'encre. L'onglet actif a un fond blanc et passe en rouge gras. Renomme « Bibliothèque » en « Exercices » et « Historique » en « Carnet » si les libellés tiennent dans les deux langues ; sinon garde les noms actuels.
3. **Carte mise en avant** (séance du jour, minuteur) : fond blanc, trait 2 px, ombre pleine à l'encre.
4. **Listes d'exercices** : case à cocher carrée dessinée ; une fois cochée, une coche rouge apparaît et le nom est barré en gris. L'exercice en cours est encadré à l'encre sur fond blanc, avec un bouton lecture rond rouge. Les charges et ressentis notés s'affichent à droite en Caveat.
5. **Bande de la semaine** : les jours en cercles, pleins à l'encre pour les séances faites, en pointillés rouges pour la séance du jour.
6. **Tampons de niveau de preuve**, à la place des pastilles actuelles : bordure épaisse, petites capitales Zilla Slab, légère rotation (entre -8° et +5°, variée mais **stable** pour un même exercice).
   - Forte : vert `#2F7A4F` ;
   - Modérée : encre ;
   - Faible : ocre `#8A5A00` ;
   - Consensus d'experts : gris, bordure en pointillés.
7. **Bloc de dosage** : trois colonnes (séries, tempo ou descente, fréquence), chiffres en Zilla Slab 24 px.
8. **Titres de section** (Pourquoi, Comment, etc.) : Zilla Slab, rouge.
9. **Références** : appels de note en exposant rouge dans le texte, sources en bas de fiche sous un trait, comme des notes de bas de page.
10. **Conseils de progression** : en Caveat rouge, précédés d'une petite icône de crayon.
11. **Boutons** : principal en encre pleine avec ombre rouge, secondaire en blanc avec trait à l'encre. Hauteur minimale de 48 px.
12. **Séance guidée** : minuteur géant en Zilla Slab, barre de tempo en trois segments (monter, tenir, descendre) avec la phase en cours en rouge, séries en grosses tuiles (faite / en cours / à venir en pointillés), boutons Facile / Correct / Trop dur.

---

## Schémas musculaires

Restyle le composant de schéma, sans changer son fonctionnement ni les identifiants des muscles :

- Silhouette en **trait d'encre sur papier**, comme une figure dessinée à la main.
- **Muscle principal** : aplat rouge `#B22A33`.
- **Muscle secondaire** : **hachures rouges à 45°** (motif SVG), à la place du rose actuel. La différence ne repose ainsi plus seulement sur la couleur.
- **Muscle profond** : contour en pointillés, en plus de son remplissage.
- Tendons : rouge très clair.
- Légende numérotée en Caveat (« Fig. 1 · vue de dos »), avec des échantillons identiques au schéma.
- Garde la silhouette complète et le zoom ; la mise en page de la fiche exercice montre la disposition attendue.

---

## Bug à corriger au passage

Dans la bibliothèque, quand on fait défiler la liste des exercices, **le bas de l'écran devient vide** : les cartes suivantes ne s'affichent pas. C'est probablement la virtualisation de la liste ou un conteneur à hauteur fixe. Corrige-le et ajoute un test de bout en bout qui fait défiler toute la liste.

---

## Exigences

- **Accessibilité** : contraste de 4,5:1 minimum pour tout texte (y compris les petits gris, le Caveat et le rouge sur papier), dans les deux modes. Les lignes Seyès ne doivent jamais réduire la lisibilité : vérifie le texte posé dessus. Zones tactiles d'au moins 44 px. Les tampons tournés restent lisibles par les lecteurs d'écran (texte réel, pas d'image).
- **Mouvement** : pas d'animation décorative. Si tu en ajoutes une (coche qui se dessine, par exemple), une seule, courte, et désactivée avec `prefers-reduced-motion`.
- **Responsive** : les maquettes sont en mobile ; adapte proprement à la tablette et à l'ordinateur sans casser le concept.
- **Bilingue** : vérifie que les libellés anglais tiennent dans les mêmes composants.
- **Impression / PDF** : la vue fiche imprimée garde le style (sans les lignes Seyès si elles gênent à l'impression).
- **Ne change pas** : les données, le moteur de recommandation, la logique de progression, les liens de partage, les routes.

---

## Validation

1. Après chaque grand écran refait, prends une capture avec Playwright en mobile (390 × 844) et compare-la à la capture de référence correspondante dans `design/captures/`. Corrige les écarts.
2. Fais aussi des captures en mode sombre, en anglais et sur ordinateur, et montre-les-moi.
3. Lance tous les tests existants : ils doivent continuer à passer.
4. Termine par un court récapitulatif : ce qui a changé, les écrans adaptés au-delà des 4 maquettes, et les décisions que tu as prises.
