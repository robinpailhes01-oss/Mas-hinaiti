# Mas Hinaiti — Design Spec

Site de vente du séjour en immersion (Suite Vaima) au Mas Hinaiti, 1671 rue de Bugarel, Montpellier Ovalie.

## Intake

- **Pain** — Partir vraiment à deux coûte une semaine de congés et vingt heures d'avion. Rester à Montpellier, c'est le même restaurant, le même hôtel, la même « love room » à néons qu'on trouve sur toutes les plateformes.
- **Person** — Un couple de Montpellier ou d'Occitanie (30–55 ans) qui veut marquer le coup : anniversaire, demande, retrouvailles. Il a déjà testé la suite avec jacuzzi vue parking, il cherche un lieu qui ait une âme et où on le laisse tranquille.
- **Promise** — La Polynésie à dix minutes de la Comédie. Une suite, un patio privé, un parc de 2 000 m², une piscine. De 16 h à 11 h, le mas est à vous.
- **Job unique de la page** — envoyer une demande de date (formulaire), avec Booking.com en sortie secondaire.
- **Preuve réelle** — avis 5/5 publiés sur 1001salles (cités mot pour mot), chiffres vérifiables : 34 jets, écran 2,20 × 1,24 m, 2 000 m², 10 min du centre, 5 min à pied du GGL Stadium, 25 places de parking.
- **Assets — Tier B** — 12 photos propres récupérées des fiches Loveroomers / Suitecosy (605–1024 px, sans filigrane). Les 38 photos 1001salles sont filigranées, donc exclues. Traitement unifiant : légère chaleur + contraste, export WebP. Les originaux HD sont à demander au client (voir README).
- **Copy** — rédigée en français natif à partir des textes publics du mas, à faire valider par la propriétaire.
- **Références** — Aman / Belmond (marges généreuses, photos qui respirent, aucun néon), carnets de voyage polynésiens (motif de vague, serif chaleureuse). Contre-références : fiches Loveroomers (rose, LED, ballons) et grilles de cartes « hôtel ».

## Brief stratégique

- **UVP** : Le Mas Hinaiti offre aux couples de Montpellier une nuit en immersion polynésienne, à dix minutes du centre, en leur réservant une suite, un patio et un parc de 2 000 m² pour eux seuls.
- **Piliers** : (1) dépaysement réel, pas décoratif · (2) intimité totale, on ne vous dérange pas · (3) tout est compris, rien à organiser · (4) à côté de chez vous.
- **Archétypes** : Amant (primaire) + Explorateur (secondaire). Chaleur et intimité, mais avec l'idée de voyage.
- **Contre** : l'esthétique « love room » (néons, pétales en plastique, ballons) et le look fiche de plateforme.

| Entrée stratégique | → Décision de design |
|---|---|
| Pilier « dépaysement réel » | Photos du lieu à taille moyenne, jamais de stock ; motif de vague dessiné à la main comme seul ornement |
| Pilier « intimité, on ne vous dérange pas » | Une seule action par écran, pas de pop-up, pas de carrousel |
| Pilier « tout est compris » | Section tarif qui liste ce qui est inclus avant le prix |
| Pilier « à côté de chez vous » | Le hero nomme la Comédie ; la section accès donne des minutes, pas des km |
| Contre « love room » | Aucun rose, aucun néon, ballons exclus des photos ; palette lagon/sable |
| Amant + Explorateur | Serif chaleureuse à axe optique (Fraunces) + sans humaniste (Figtree), rythme lent, transition jour → nuit → matin |

## Direction esthétique

**« La retenue d'un hôtel Aman + un carnet de voyage polynésien »**. Le Aman apporte les marges, le silence, l'absence totale de cartes et d'icônes ; le carnet de voyage apporte la serif chaleureuse, la vague tracée à la main et la palette prise dans le lagon et le sable, pas dans un thème SaaS.

## Séquence naturelle du sujet

Le séjour a une chronologie réelle : arrivée 16 h (soleil, piscine) → soir (bain, champagne, chef) → nuit (cinéma depuis le lit) → matin (petit-déjeuner au patio, départ 11 h). La page suit cette séquence : la section signature « Une nuit au mas » est épinglée et fait passer le fond du sable de l'après-midi au lagon nocturne, puis revient au matin. C'est le seul moment de scroll « signature » (une seule section épinglée).

## Tokens

- **Couleur**
  - `--sable` `#E9DFC9` — surface de jour
  - `--tiare` `#F8F3E8` — surface claire secondaire, texte sur fond nuit
  - `--encre` `#1C221F` — texte
  - `--lagon` `#0E4F4A` — accent (CTA, liens, vague)
  - `--nuit` `#08222A` — surface de nuit
  - `--crepuscule` `#8A4A32` — uniquement au milieu de la transition jour → nuit, jamais comme accent
- **Type** — Display : Fraunces (variable, opsz + SOFT). Corps : Figtree. Pas de mono (pas de données). Échelle : 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 88.
- **Espacement** — base 8 px : 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192.
- **Rayon** — 2 px max sur les champs et boutons ; photos à angles droits.
- **Ombres** — aucune. Séparation par couleur de surface et par filet 1 px.
- **Motion** — 120 ms micro, 240 ms standard, 600–800 ms révélations ; easing `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion` : aucune section épinglée, pas de parallaxe, la page reste complète en statique.

## Élément signature

La section « Une nuit au mas, heure par heure » : épinglée, les six moments défilent pendant que le fond passe du sable au lagon de nuit et revient au matin. Tout le reste de la page reste calme autour.

## Mobile

Hero empilé (titre puis photo), ratio 4:5. Section épinglée raccourcie (hauteur 380 vh → 300 vh) sans parallaxe. Cibles tactiles ≥ 44 px. `100dvh` pour les éléments collants.
