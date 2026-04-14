/**
 * Bootstrap script — runs inside Strapi server context
 * Place in strapi/src/bootstrap.ts and it runs on server start
 * 
 * Usage:
 *   1. Add to strapi/src/index.ts: bootstrap: require('./bootstrap').bootstrap
 *   2. OR run: cd strapi && npx strapi console (paste code)
 *   3. OR set env: SEED=true && npm run develop
 */

const SEED_DATA = {
  menuCategories: [
    { name: 'Entrées', slug: 'entrees', description: 'Pour commencer en beauté', icon: 'Leaf', order: 1 },
    { name: 'Plats principaux', slug: 'plats', description: 'Nos spécialités', icon: 'ChefHat', order: 2 },
    { name: 'Desserts', slug: 'desserts', description: 'Douceurs sucrées', icon: 'Wheat', order: 3 },
    { name: 'Boissons', slug: 'boissons', description: 'Cocktails, vins et plus', icon: 'Fish', order: 4 },
  ],

  menuItems: [
    // Entrées
    { name: 'Carpaccio de Saint-Jacques', slug: 'carpaccio-saint-jacques', description: "Fines tranches de Saint-Jacques fraîches, huile d'olive extra vierge, citron confit et fleur de sel", price: '24€', allergens: ['Crustacés'], categorySlug: 'entrees' },
    { name: 'Foie gras maison', slug: 'foie-gras-maison', description: 'Foie gras de canard mi-cuit, chutney de figues et pain brioché toasté', price: '28€', allergens: ['Fruits à coque'], categorySlug: 'entrees' },
    { name: 'Salade de chèvre chaud', slug: 'salade-chevre-chaud', description: 'Salade mélangée, chèvre frais pané, miel d\'acacia et noix grillées', price: '16€', allergens: ['Lait', 'Fruits à coque'], categorySlug: 'entrees' },
    { name: 'Soupe à l\'oignon', slug: 'soupe-oignon', description: 'Soupe traditionnelle gratinée au fromage de Gruyère et croûtons', price: '14€', allergens: ['Lait', 'Gluten'], categorySlug: 'entrees' },
    // Plats
    { name: 'Bœuf Bourguignon', slug: 'boeuf-bourguignon', description: 'Traditionnel bœuf braisé au vin rouge bourguignon, champignons de saison et oignons grelots', price: '28€', allergens: ['Sulfites'], categorySlug: 'plats', isSpecial: true },
    { name: 'Saumon grillé', slug: 'saumon-grille', description: 'Filet de saumon frais grillé, légumes de saison et sauce hollandaise légère', price: '26€', allergens: ['Poisson', 'Œufs', 'Lait'], categorySlug: 'plats' },
    { name: 'Coq au vin', slug: 'coq-au-vin', description: 'Coq fermier mijoté au vin rouge, champignons et petits légumes', price: '25€', allergens: ['Sulfites'], categorySlug: 'plats' },
    { name: 'Risotto aux champignons', slug: 'risotto-champignons', description: 'Riz Arborio crémeux, mélange de champignons sauvages et parmesan', price: '22€', allergens: ['Lait', 'Gluten'], categorySlug: 'plats' },
    { name: 'Magret de canard', slug: 'magret-canard', description: 'Magret de canard grillé, sauce aux fruits rouges et pommes grenailles', price: '29€', allergens: [], categorySlug: 'plats', isSpecial: true },
    { name: 'Blanquette de veau', slug: 'blanquette-veau', description: 'Traditionnelle blanquette de veau, riz blanc et légumes de saison', price: '27€', allergens: ['Lait', 'Gluten'], categorySlug: 'plats' },
    // Desserts
    { name: 'Tarte Tatin', slug: 'tarte-tatin', description: 'Pomme caramélisée, pâte feuilletée croustillante, crème fraîche vanillée', price: '12€', allergens: ['Lait', 'Gluten'], categorySlug: 'desserts', isSpecial: true },
    { name: 'Crème brûlée', slug: 'creme-brulee', description: 'Crème vanillée onctueuse, caramel croquant et fruits rouges', price: '10€', allergens: ['Lait', 'Œufs'], categorySlug: 'desserts' },
    { name: 'Mousse au chocolat', slug: 'mousse-chocolat', description: 'Mousse légère au chocolat noir 70%, coulis de framboise', price: '11€', allergens: ['Lait', 'Œufs'], categorySlug: 'desserts' },
    { name: 'Profiteroles', slug: 'profiteroles', description: 'Choux frais garnis de glace vanille et chocolat chaud', price: '13€', allergens: ['Lait', 'Gluten', 'Œufs'], categorySlug: 'desserts' },
    // Boissons
    { name: 'Vin rouge - Bordeaux', slug: 'vin-rouge-bordeaux', description: 'Château Margaux 2018 - Notes de fruits noirs et tanins soyeux', price: '8€/verre • 45€/bouteille', allergens: ['Sulfites'], categorySlug: 'boissons' },
    { name: 'Vin blanc - Chardonnay', slug: 'vin-blanc-chardonnay', description: 'Domaine de la Romanée-Conti 2020 - Frais et minéral', price: '7€/verre • 38€/bouteille', allergens: ['Sulfites'], categorySlug: 'boissons' },
    { name: 'Bière locale', slug: 'biere-locale', description: 'Bières belges artisanales pression - Sélection du moment', price: '4,50€', allergens: [], categorySlug: 'boissons' },
    { name: 'Cocktails signature', slug: 'cocktails-signature', description: 'French 75 - Gin, champagne, citron et sucre - Negroni - Campari, gin et vermouth rouge', price: '12€', allergens: [], categorySlug: 'boissons' },
    { name: 'Café & Digestifs', slug: 'cafe-digestifs', description: 'Café torréfié artisanal, calvados, cognac et autres spiritueux', price: '3,50€ - 8€', allergens: [], categorySlug: 'boissons' },
  ],

  siteSettings: {
    restaurantName: 'Bistrot De La Cour',
    tagline: "L'Art de la Convivialité",
    address: 'Rue de Dampremy 22',
    city: 'Charleroi',
    zipCode: '6000',
    country: 'Belgique',
    phone: '071 59 64 48',
    email: 'contact@bistrot-delacour.be',
    openingHours: {
      monday_thursday: { open: '12:00', close: '22:00' },
      friday_saturday: { open: '12:00', close: '23:00' },
      sunday: { open: '12:00', close: '22:00' },
    },
    heroTitle: "L'Art de la Convivialité",
    heroSubtitle: 'Découvrez une cuisine simple et excellente dans une ambiance chaleureuse au cœur de Charleroi.',
    facebookUrl: 'https://facebook.com/bistrotdelacour',
    instagramUrl: 'https://instagram.com/bistrotdelacour',
    googleMapsUrl: 'https://maps.google.com/?q=Rue+de+Dampremy+22+6000+Charleroi',
    heroBadgeRating: '4.7',
    heroBadgeReviewCount: 178,
  },

  seoSettings: {
    defaultTitle: 'Bistrot De La Cour - Restaurant Charleroi',
    defaultDescription: 'Découvrez une cuisine simple et excellente dans une ambiance chaleureuse au cœur de Charleroi.',
    siteUrl: 'https://bistrot-delacour.be',
    siteLanguage: 'fr',
    twitterHandle: '@bistrotdelacour',
  },

  teamMembers: [
    { name: 'Jean-Michel Dubois', role: 'Chef & Propriétaire', bio: "15 ans d'expérience dans la gastronomie française, passionné par les produits frais et les recettes traditionnelles.", order: 1 },
    { name: 'Marie Claire', role: 'Chef de Salle', bio: 'Experte en service et en vins, elle veille à ce que chaque moment passé chez nous soit mémorable.', order: 2 },
    { name: 'Pierre Laurent', role: 'Sommelier', bio: "Spécialiste des vins régionaux, il saura vous conseiller le meilleur accord pour vos plats.", order: 3 },
  ],

  reviews: [
    { author: 'Marie Dubois', rating: 5, content: "Un bistrot charmant avec une cuisine excellente. Le service est rapide et l'ambiance très conviviale. Le bœuf bourguignon était divin !", date: '2024-12-15', isVerified: true, source: 'google' },
    { author: 'Pierre Martin', rating: 5, content: 'Très bon rapport qualité-prix. Les plats sont préparés avec soin et les portions sont généreuses.', date: '2024-12-12', isVerified: true, source: 'google' },
    { author: 'Sophie Leroy', rating: 4, content: 'Cuisine simple mais savoureuse. Parfait pour un dîner en couple. Le cadre est agréable.', date: '2024-12-10', isVerified: false, source: 'tripadvisor' },
    { author: 'Jean-François Moreau', rating: 5, content: 'Découvert ce bistrot par hasard et quelle belle surprise ! La tarte tatin est à tomber.', date: '2024-12-08', isVerified: true, source: 'google' },
    { author: 'Isabelle Dupont', rating: 5, content: "Un lieu authentique où l'on se sent bien. La cuisine est faite maison avec des produits frais.", date: '2024-12-05', isVerified: true, source: 'facebook' },
    { author: 'Michel Bernard', rating: 4, content: 'Bon restaurant de quartier. Cuisine traditionnelle bien exécutée. Service rapide.', date: '2024-12-03', isVerified: false, source: 'google' },
    { author: 'Catherine Petit', rating: 5, content: 'Excellent ! Tout était parfait : la nourriture, le service, l\'ambiance.', date: '2024-11-28', isVerified: true, source: 'google' },
    { author: 'Laurent Garnier', rating: 5, content: 'Superbe expérience culinaire. Le vin conseillé par le sommelier était excellent.', date: '2024-11-25', isVerified: true, source: 'tripadvisor' },
    { author: 'Valérie Roux', rating: 4, content: 'Très bonne adresse. Cuisine de qualité, service attentionné.', date: '2024-11-22', isVerified: false, source: 'google' },
    { author: 'Philippe Durand', rating: 5, content: 'Restaurant familial par excellence. Les enfants sont les bienvenus.', date: '2024-11-20', isVerified: true, source: 'direct' },
  ],

  testimonials: [
    { author: 'Marie Dubois', quote: "Un bistrot charmant avec une cuisine excellente. Le bœuf bourguignon était divin !", rating: 5, isFeatured: true, order: 1 },
    { author: 'Pierre Martin', quote: 'Délicieux ! Les plats sont préparés avec soin et les portions sont généreuses.', rating: 5, isFeatured: true, order: 2 },
    { author: 'Sophie Leroy', quote: 'Très bon rapport qualité-prix. Cuisine simple mais savoureuse.', rating: 4, isFeatured: true, order: 3 },
    { author: 'Jean-François Moreau', quote: 'La tarte tatin est à tomber. Service impeccable.', rating: 5, isFeatured: true, order: 4 },
    { author: 'Isabelle Dupont', quote: "Un lieu authentique où l'on se sent bien.", rating: 5, isFeatured: true, order: 5 },
    { author: 'Catherine Petit', quote: 'Excellent ! Tout était parfait.', rating: 5, isFeatured: true, order: 6 },
  ],

  faqs: [
    { question: "Puis-je réserver une table pour un groupe ?", answer: "Oui, nous acceptons les réservations pour les groupes jusqu'à 12 personnes.", category: 'reservations', order: 1 },
    { question: "Avez-vous un parking ?", answer: "Oui, un parking public gratuit est disponible à proximité.", category: 'general', order: 2 },
    { question: "Acceptez-vous les cartes de crédit ?", answer: "Oui, Visa, Mastercard et American Express. Espèces également.", category: 'general', order: 3 },
    { question: "Pouvez-vous adapter les plats pour les allergies ?", answer: "Absolument ! Notre équipe est formée pour gérer les allergies alimentaires.", category: 'menu', order: 4 },
    { question: "Proposez-vous des menus pour enfants ?", answer: "Oui, menu enfant adapté avec portions raisonnables.", category: 'menu', order: 5 },
    { question: "Y a-t-il une tenue vestimentaire exigée ?", answer: "Non, ambiance conviviale. Venez comme vous êtes !", category: 'general', order: 6 },
    { question: "Puis-je annuler ma réservation ?", answer: "Gratuit jusqu'à 24h avant. Au-delà, 50% du montant est facturé.", category: 'reservations', order: 7 },
    { question: "Le restaurant est-il accessible PMR ?", answer: "Oui, entièrement accessible.", category: 'accessibility', order: 8 },
  ],
};

export async function bootstrap({ strapi }) {
  const isSeeded = await strapi.db.query('strapi::core-store').findOne({
    where: { key: 'bistrot_seeded' },
  });

  if (isSeeded) {
    strapi.log.info('Database already seeded — skipping');
    return;
  }

  strapi.log.info('🌱 Seeding Bistrot De La Cour database...');

  try {
    const adminUser = await strapi.db.query('admin::user').findOne();
    if (!adminUser) {
      strapi.log.warn('No admin user found. Please create one at /admin first, then restart.');
      return;
    }

    // ─── Menu Categories ───
    strapi.log.info('  🍽️  Menu Categories...');
    const catMap = {};
    for (const cat of SEED_DATA.menuCategories) {
      const created = await strapi.documents('api::menu-category.menu-category').create({ data: cat });
      catMap[cat.slug] = created;
      strapi.log.info(`    ✓ ${cat.name}`);
    }

    // ─── Menu Items ───
    strapi.log.info('  🍴 Menu Items...');
    for (const item of SEED_DATA.menuItems) {
      const category = catMap[item.categorySlug];
      const { categorySlug: _unused, ...rest } = item; // eslint-disable-line @typescript-eslint/no-unused-vars
      const data: Record<string, unknown> = { ...rest, isAvailable: true };
      if (category) data.category = category.documentId;
      await strapi.documents('api::menu-item.menu-item').create({ data });
      strapi.log.info(`    ✓ ${item.name}`);
    }

    // ─── Site Settings ───
    strapi.log.info('  ⚙️  Site Settings...');
    await strapi.documents('api::site-setting.site-setting').create({ data: SEED_DATA.siteSettings });
    strapi.log.info('    ✓ Site Settings');

    // ─── SEO Settings ───
    strapi.log.info('  🔍 SEO Settings...');
    await strapi.documents('api::seo-setting.seo-setting').create({ data: SEED_DATA.seoSettings });
    strapi.log.info('    ✓ SEO Settings');

    // ─── Team Members ───
    strapi.log.info('  👥 Team Members...');
    for (const member of SEED_DATA.teamMembers) {
      await strapi.documents('api::team-member.team-member').create({ data: member });
      strapi.log.info(`    ✓ ${member.name}`);
    }

    // ─── Reviews ───
    strapi.log.info('  ⭐ Reviews...');
    for (const review of SEED_DATA.reviews) {
      await strapi.documents('api::review.review').create({ data: review });
      strapi.log.info(`    ✓ ${review.author}`);
    }

    // ─── Testimonials ───
    strapi.log.info('  💬 Testimonials...');
    for (const t of SEED_DATA.testimonials) {
      await strapi.documents('api::testimonial.testimonial').create({ data: t });
      strapi.log.info(`    ✓ ${t.author}`);
    }

    // ─── FAQ ───
    strapi.log.info('  ❓ FAQ...');
    for (const faq of SEED_DATA.faqs) {
      await strapi.documents('api::faq.faq').create({ data: faq });
      strapi.log.info(`    ✓ ${faq.question}`);
    }

    // Mark as seeded
    await strapi.db.query('strapi::core-store').create({
      data: { key: 'bistrot_seeded', value: 'true' },
    });

    strapi.log.info('✅ Database seeded successfully!');
  } catch (error) {
    strapi.log.error(`❌ Seed failed: ${error.message}`);
    console.error(error);
  }
}
