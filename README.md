# Mas Hinaiti — site de vente du séjour en immersion

Site une page pour vendre la nuit en Suite Vaima au Mas Hinaiti (Montpellier Ovalie) : hero, le mas, la nuit heure par heure (section signature), la suite, les options, les avis, le tarif, l'accès et le formulaire de demande de date.

Stack : Vite 8, React 19, TypeScript, Tailwind 4, Motion. Aucun backend. Polices auto-hébergées (Fraunces, Figtree).

## Lancer

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # sortie dans dist/
npm run preview   # sert dist/ sur http://localhost:4173
```

Déploiement : projet statique (Vercel, Netlify, OVH…). Sur Vercel, importer le dépôt, framework « Vite », rien d'autre à régler.

## Où modifier le contenu

Tout le texte, les chiffres, les liens et les tarifs sont dans `src/content/site.ts`. Les composants n'ont aucun texte en dur, sauf les titres de section.

## À valider avec le mas avant mise en ligne

Ces éléments viennent des fiches publiques (Booking, Loveroomers, Suitecosy, 1001salles) et n'ont pas été confirmés par la propriétaire :

- **Le tarif** « à partir de 240 € » (`priceFrom`). Les plateformes affichent 210, 240 ou 250 € selon la date.
- **Téléphone et email** (`contact`). Vides pour l'instant : le pied de page ne les affiche pas, et le formulaire bascule en mode « copier la demande ».
- **Le formulaire** : renseigner `VITE_FORM_ENDPOINT` (Formspree ou équivalent, voir `.env.example`) pour recevoir les demandes par email. Sans endpoint ni email, le site copie le récapitulatif dans le presse-papiers et renvoie vers Instagram.
- **Mentions légales** (`legal`) : éditeur, SIRET, hébergeur. Affichées dans le pied de page dès qu'elles sont remplies.
- **Ce qui est compris** : champagne à l'arrivée, petit-déjeuner, piscine en saison. Relevé sur les fiches, à confirmer.
- **Les avis** : deux avis cités mot pour mot depuis 1001salles. À remplacer par les avis Google si le mas préfère.

## Photos

Les 12 photos dans `public/img/` sont celles des fiches Loveroomers et Suitecosy (605 à 1024 px de large), les seules disponibles sans filigrane. Elles sont utilisées à taille moyenne pour rester nettes. **Demander au mas les originaux HD** (les mêmes prises de vue existent en pleine résolution) et les remplacer en gardant les mêmes noms de fichiers ; le site n'a pas à changer.

La direction artistique complète est dans `DESIGN.md`.
