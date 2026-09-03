/**
 * Tout le contenu du site vit ici : chiffres, textes, liens.
 * Les valeurs marquées « À CONFIRMER » viennent des fiches publiques du mas
 * (Booking, Loveroomers, Suitecosy, 1001salles) et doivent être validées
 * par la propriétaire avant mise en ligne.
 */

export const site = {
  name: 'Mas Hinaiti',
  suite: 'Suite Vaima',
  address: {
    street: '1671 rue de Bugarel',
    zip: '34070',
    city: 'Montpellier',
    area: 'Quartier Ovalie',
  },
  contact: {
    // À CONFIRMER — vides tant que le mas n'a pas transmis ses coordonnées.
    phone: '',
    email: '',
  },
  links: {
    booking: 'https://www.booking.com/hotel/fr/mas-hinaiti.html',
    instagram: 'https://www.instagram.com/mas_hinaiti/',
    facebook: 'https://www.facebook.com/hinaitievents/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Mas+Hinaiti+1671+Rue+de+Bugarel+34070+Montpellier',
    mapsEmbed:
      'https://www.google.com/maps?q=1671+Rue+de+Bugarel,+34070+Montpellier&z=15&output=embed',
  },
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '',
  // À CONFIRMER — 240 € relevé sur Loveroomers, 250 € sur Suitecosy, 210 € sur WeekendLove.
  priceFrom: 240,
  checkIn: '16 h',
  checkOut: '11 h',
  // Mentions légales : rendues dans le pied de page uniquement si renseignées.
  legal: {
    owner: '',
    siret: '',
    host: '',
  },
}

export const preuves = [
  { valeur: '34', unite: 'jets d’eau et d’air', detail: 'dans la baignoire balnéo double' },
  { valeur: '2,20 m', unite: 'd’écran, en 4K', detail: 'face au lit' },
  { valeur: '2 000 m²', unite: 'de parc', detail: 'au milieu des vignes' },
  { valeur: '10 min', unite: 'du centre', detail: 'et de la place de la Comédie' },
]

export const moments = [
  {
    heure: '16 h',
    titre: 'Le portail se ferme derrière vous.',
    texte:
      'Parking privé, parc de 2 000 m², piscine en saison. Il n’y a personne d’autre : la suite est la seule chambre du mas.',
    image: '/img/piscine-pin.webp',
    alt: 'La piscine du mas sous le grand pin, ciel bleu',
    texteCouleur: '#1c221f',
  },
  {
    heure: '19 h',
    titre: 'Le bain.',
    texte:
      'Baignoire balnéo double, 34 jets d’eau et d’air, plusieurs programmes de relaxation, lumière tamisée. Le champagne est déjà là.',
    image: '/img/bain-balneo-nuit.webp',
    alt: 'La baignoire balnéo éclairée en turquoise dans la suite',
    texteCouleur: '#f8f3e8',
  },
  {
    heure: '21 h',
    titre: 'Dîner au patio.',
    texte:
      'Servi par un chef privé partenaire sur demande, dans le patio en mezzanine face au parc. Ou votre propre table, si vous préférez.',
    image: '/img/petit-dejeuner-vue.webp',
    alt: 'Table dressée dans le patio, vue sur les arbres du parc',
    texteCouleur: '#f8f3e8',
  },
  {
    heure: '23 h',
    titre: 'Cinéma, depuis le lit.',
    texte:
      'Écran de 2,20 m sur 1,24 m, vidéoprojecteur 4K, Apple TV avec Netflix, Canal+ et Disney+. Lit Queen size.',
    image: '/img/ecran-cinema.webp',
    alt: 'L’écran de cinéma déployé face au lit, baignoire au premier plan',
    texteCouleur: '#f8f3e8',
  },
  {
    heure: '9 h',
    titre: 'Petit-déjeuner face au parc.',
    texte: 'Servi dans le patio privatif, au soleil. Compris dans la nuit.',
    image: '/img/petit-dejeuner-patio.webp',
    alt: 'Le petit-déjeuner servi dans le patio, vue sur les toits et le jardin',
    texteCouleur: '#1c221f',
  },
  {
    heure: '11 h',
    titre: 'Départ. Ou une nuit de plus.',
    texte: 'Le centre de Montpellier est à dix minutes. Vous étiez ailleurs.',
    image: '/img/patio-vue-parc.webp',
    alt: 'Vue depuis la porte-fenêtre du patio sur les toits et le parc',
    texteCouleur: '#1c221f',
  },
]

export const suiteSpecs = [
  {
    titre: 'La chambre',
    lignes: ['30 m², lit Queen size', 'Écran rétractable de 2,20 m et vidéoprojecteur 4K', 'Apple TV : Netflix, Canal+, Canal à la demande, Disney+', 'Enceinte et lumière d’ambiance'],
  },
  {
    titre: 'La salle de bain',
    lignes: ['Baignoire balnéothérapie double, 34 jets eau et air', 'Douche à l’italienne', 'Double vasque, miroir tactile rétroéclairé', 'WC séparés, peignoirs et serviettes'],
  },
  {
    titre: 'Le patio',
    lignes: ['Privatif, en mezzanine', 'Vue sur le parc et la piscine', 'Petit-déjeuner servi sur place'],
  },
  {
    titre: 'Le mas',
    lignes: ['Parc de 2 000 m² au milieu des vignes', 'Piscine et terrasse en saison', 'Parking privé, wifi', 'Machine à café'],
  },
]

export const options = [
  {
    titre: 'Dîner par un chef privé',
    texte: 'Un chef partenaire du mas vient cuisiner et servir dans le patio de la suite. Sur devis, selon le menu.',
  },
  {
    titre: 'Privatisation de la piscine',
    texte: 'En saison, la piscine et la terrasse pour vous deux, sans horaire.',
  },
  {
    titre: 'Décoration sur mesure',
    texte: 'Anniversaire, demande en mariage, retrouvailles : dites-nous l’occasion, l’équipe prépare la suite avant votre arrivée.',
  },
  {
    titre: 'Une nuit de plus',
    texte: 'Le séjour se prolonge à la demande, selon les disponibilités.',
  },
]

export const avis = [
  {
    texte:
      'Le domaine est absolument incroyable et la propriétaire est très attentionnée et très à l’écoute. Pour des vacances réussies, je recommande vivement cette propriétaire qui vous accompagnera avec bienveillance et soutien tout au long de votre séjour.',
    source: 'Avis publié sur 1001salles',
  },
  {
    texte:
      'Nous sommes reconnaissants envers Janick, son mari et son équipe pour leur professionnalisme, leur disponibilité, leur réactivité et leur gentillesse. […] Tout était arrangé avec beaucoup de goût et un travail remarquable.',
    source: 'Avis publié sur 1001salles',
  },
]

export const inclus = [
  'La Suite Vaima pour deux, de 16 h à 11 h',
  'Le petit-déjeuner servi au patio',
  'Le champagne à l’arrivée',
  'Le bain balnéo, le cinéma, le patio',
  'Le parc, la piscine et la terrasse en saison',
  'Le parking privé et le wifi',
]

export const acces = [
  { duree: '10 min', mode: 'en voiture', lieu: 'du centre et de la place de la Comédie' },
  { duree: '5 min', mode: 'à pied', lieu: 'du GGL Stadium' },
  { duree: '2 min', mode: 'à pied', lieu: 'de l’arrêt de bus Bugarel' },
  { duree: '15 min', mode: 'en voiture', lieu: 'de l’aéroport et de la gare Saint-Roch' },
  { duree: '25', mode: 'places', lieu: 'de parking privé au mas' },
]
