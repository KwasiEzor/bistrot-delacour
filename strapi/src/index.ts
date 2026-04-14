export default {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }: { strapi: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    // ─── Set public API permissions ───
    const publicRoles = await strapi.db
      .query('plugin::users-permissions.role')
      .findMany({ where: { type: 'public' } });

    if (publicRoles.length > 0) {
      const publicRoleId = publicRoles[0].id;
      const existingPerms = await strapi.db
        .query('plugin::users-permissions.permission')
        .findMany({ where: { role: { id: publicRoleId } } });
      const existingActions = new Set(existingPerms.map((p: { action: string }) => p.action));

      const publicActions = [
        'api::menu-category.menu-category.find',
        'api::menu-category.menu-category.findOne',
        'api::menu-item.menu-item.find',
        'api::menu-item.menu-item.findOne',
        'api::gallery-image.gallery-image.find',
        'api::gallery-image.gallery-image.findOne',
        'api::review.review.find',
        'api::review.review.findOne',
        'api::team-member.team-member.find',
        'api::team-member.team-member.findOne',
        'api::faq.faq.find',
        'api::faq.faq.findOne',
        'api::testimonial.testimonial.find',
        'api::testimonial.testimonial.findOne',
        'api::site-setting.site-setting.find',
        'api::seo-setting.seo-setting.find',
        'api::reservation.reservation.create',
        'api::contact-message.contact-message.create',
      ];

      for (const action of publicActions) {
        if (!existingActions.has(action)) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRoleId },
          });
        }
      }
      strapi.log.info('✓ Public API permissions set');
    }

    // ─── Seed database if not already seeded ───
    const isSeeded = await strapi.db
      .query('strapi::core-store')
      .findOne({ where: { key: 'bistrot_seeded' } });

    if (isSeeded) return;

    // Check admin user exists (skip warning if not, but still seed)
    const adminUser = await strapi.db.query('admin::user').findOne({ where: {} });
    if (!adminUser) {
      strapi.log.info('⚠ No admin user yet — seeding data anyway. Create admin at /admin after.');
    }

    strapi.log.info('🌱 Seeding database...');

    try {
      // Categories
      const categories = [
        { name: 'Entrées', slug: 'entrees', description: 'Pour commencer en beauté', icon: 'Leaf', order: 1 },
        { name: 'Plats principaux', slug: 'plats', description: 'Nos spécialités', icon: 'ChefHat', order: 2 },
        { name: 'Desserts', slug: 'desserts', description: 'Douceurs sucrées', icon: 'Wheat', order: 3 },
        { name: 'Boissons', slug: 'boissons', description: 'Cocktails, vins et plus', icon: 'Fish', order: 4 },
      ];

      strapi.log.info('  🍽️  Menu Categories');
      const catMap: Record<string, { documentId: string }> = {};
      for (const cat of categories) {
        const created = await strapi.documents('api::menu-category.menu-category').create({ data: cat });
        catMap[cat.slug] = created;
        strapi.log.info(`    ✓ ${cat.name}`);
      }

      // Menu Items
      const items = [
        { name: 'Carpaccio de Saint-Jacques', slug: 'carpaccio-saint-jacques', description: "Fines tranches de Saint-Jacques, huile d'olive, citron confit", price: '24€', allergens: ['Crustacés'], cs: 'entrees' },
        { name: 'Foie gras maison', slug: 'foie-gras-maison', description: 'Foie gras mi-cuit, chutney de figues', price: '28€', allergens: ['Fruits à coque'], cs: 'entrees' },
        { name: 'Salade de chèvre chaud', slug: 'salade-chevre-chaud', description: 'Chèvre pané, miel, noix', price: '16€', allergens: ['Lait', 'Fruits à coque'], cs: 'entrees' },
        { name: 'Soupe à l\'oignon', slug: 'soupe-oignon', description: 'Gratinée au Gruyère', price: '14€', allergens: ['Lait', 'Gluten'], cs: 'entrees' },
        { name: 'Bœuf Bourguignon', slug: 'boeuf-bourguignon', description: 'Bœuf braisé au vin rouge, champignons', price: '28€', allergens: ['Sulfites'], cs: 'plats', isSpecial: true },
        { name: 'Saumon grillé', slug: 'saumon-grille', description: 'Filet de saumon, légumes, hollandaise', price: '26€', allergens: ['Poisson', 'Œufs', 'Lait'], cs: 'plats' },
        { name: 'Coq au vin', slug: 'coq-au-vin', description: 'Coq fermier au vin rouge', price: '25€', allergens: ['Sulfites'], cs: 'plats' },
        { name: 'Risotto aux champignons', slug: 'risotto-champignons', description: 'Riz crémeux, champignons, parmesan', price: '22€', allergens: ['Lait', 'Gluten'], cs: 'plats' },
        { name: 'Magret de canard', slug: 'magret-canard', description: 'Sauce fruits rouges, pommes grenailles', price: '29€', allergens: [], cs: 'plats', isSpecial: true },
        { name: 'Blanquette de veau', slug: 'blanquette-veau', description: 'Riz blanc, légumes de saison', price: '27€', allergens: ['Lait', 'Gluten'], cs: 'plats' },
        { name: 'Tarte Tatin', slug: 'tarte-tatin', description: 'Pomme caramélisée, crème vanillée', price: '12€', allergens: ['Lait', 'Gluten'], cs: 'desserts', isSpecial: true },
        { name: 'Crème brûlée', slug: 'creme-brulee', description: 'Caramel croquant, fruits rouges', price: '10€', allergens: ['Lait', 'Œufs'], cs: 'desserts' },
        { name: 'Mousse au chocolat', slug: 'mousse-chocolat', description: 'Chocolat noir 70%, framboise', price: '11€', allergens: ['Lait', 'Œufs'], cs: 'desserts' },
        { name: 'Profiteroles', slug: 'profiteroles', description: 'Glace vanille, chocolat chaud', price: '13€', allergens: ['Lait', 'Gluten', 'Œufs'], cs: 'desserts' },
        { name: 'Vin rouge - Bordeaux', slug: 'vin-rouge-bordeaux', description: 'Château Margaux 2018', price: '8€/verre • 45€/bouteille', allergens: ['Sulfites'], cs: 'boissons' },
        { name: 'Vin blanc - Chardonnay', slug: 'vin-blanc-chardonnay', description: 'Domaine Romanée-Conti 2020', price: '7€/verre • 38€/bouteille', allergens: ['Sulfites'], cs: 'boissons' },
        { name: 'Bière locale', slug: 'biere-locale', description: 'Bières belges pression', price: '4,50€', allergens: [], cs: 'boissons' },
        { name: 'Cocktails signature', slug: 'cocktails-signature', description: 'French 75, Negroni', price: '12€', allergens: [], cs: 'boissons' },
        { name: 'Café & Digestifs', slug: 'cafe-digestifs', description: 'Café artisanal, calvados, cognac', price: '3,50€ - 8€', allergens: [], cs: 'boissons' },
      ];

      strapi.log.info('  🍴 Menu Items');
      for (const item of items) {
        const { cs: _cs, ...rest } = item; // eslint-disable-line @typescript-eslint/no-unused-vars
        const data: Record<string, unknown> = { ...rest, isAvailable: true };
        if (catMap[item.cs]) data.category = catMap[item.cs].documentId;
        await strapi.documents('api::menu-item.menu-item').create({ data });
        strapi.log.info(`    ✓ ${item.name}`);
      }

      // Site Settings
      strapi.log.info('  ⚙️  Site Settings');
      await strapi.documents('api::site-setting.site-setting').create({
        data: {
          restaurantName: 'Bistrot De La Cour', tagline: "L'Art de la Convivialité",
          address: 'Rue de Dampremy 22', city: 'Charleroi', zipCode: '6000', country: 'Belgique',
          phone: '071 59 64 48', email: 'contact@bistrot-delacour.be',
          openingHours: { monday_thursday: { open: '12:00', close: '22:00' }, friday_saturday: { open: '12:00', close: '23:00' }, sunday: { open: '12:00', close: '22:00' } },
          heroTitle: "L'Art de la Convivialité",
          heroSubtitle: 'Découvrez une cuisine simple et excellente au cœur de Charleroi.',
          facebookUrl: 'https://facebook.com/bistrotdelacour',
          instagramUrl: 'https://instagram.com/bistrotdelacour',
          googleMapsUrl: 'https://maps.google.com/?q=Rue+de+Dampremy+22+6000+Charleroi',
          heroBadgeRating: '4.7', heroBadgeReviewCount: 178,
        },
      });

      // SEO Settings
      strapi.log.info('  🔍 SEO Settings');
      await strapi.documents('api::seo-setting.seo-setting').create({
        data: {
          defaultTitle: 'Bistrot De La Cour - Restaurant Charleroi',
          defaultDescription: 'Cuisine simple et excellente dans une ambiance chaleureuse.',
          siteUrl: 'https://bistrot-delacour.be', siteLanguage: 'fr', twitterHandle: '@bistrotdelacour',
        },
      });

      // Team
      strapi.log.info('  👥 Team');
      for (const m of [
        { name: 'Jean-Michel Dubois', role: 'Chef & Propriétaire', bio: "15 ans d'expérience.", order: 1 },
        { name: 'Marie Claire', role: 'Chef de Salle', bio: 'Experte en vins.', order: 2 },
        { name: 'Pierre Laurent', role: 'Sommelier', bio: "Spécialiste vins régionaux.", order: 3 },
      ]) {
        await strapi.documents('api::team-member.team-member').create({ data: m });
        strapi.log.info(`    ✓ ${m.name}`);
      }

      // Reviews
      strapi.log.info('  ⭐ Reviews');
      for (const r of [
        { author: 'Marie Dubois', rating: 5, content: "Un bistrot charmant. Le bœuf bourguignon était divin !", date: '2024-12-15', isVerified: true, source: 'google' },
        { author: 'Pierre Martin', rating: 5, content: 'Très bon rapport qualité-prix.', date: '2024-12-12', isVerified: true, source: 'google' },
        { author: 'Sophie Leroy', rating: 4, content: 'Cuisine simple mais savoureuse.', date: '2024-12-10', isVerified: false, source: 'tripadvisor' },
        { author: 'J-F Moreau', rating: 5, content: 'La tarte tatin est à tomber.', date: '2024-12-08', isVerified: true, source: 'google' },
        { author: 'Isabelle Dupont', rating: 5, content: "Un lieu authentique.", date: '2024-12-05', isVerified: true, source: 'facebook' },
        { author: 'Michel Bernard', rating: 4, content: 'Cuisine traditionnelle bien exécutée.', date: '2024-12-03', isVerified: false, source: 'google' },
        { author: 'Catherine Petit', rating: 5, content: 'Excellent ! Tout parfait.', date: '2024-11-28', isVerified: true, source: 'google' },
        { author: 'Laurent Garnier', rating: 5, content: 'Le vin conseillé par le sommelier excellent.', date: '2024-11-25', isVerified: true, source: 'tripadvisor' },
      ]) {
        await strapi.documents('api::review.review').create({ data: r });
        strapi.log.info(`    ✓ ${r.author}`);
      }

      // Testimonials
      strapi.log.info('  💬 Testimonials');
      for (const t of [
        { author: 'Marie Dubois', quote: "Un bistrot charmant. Divin !", rating: 5, isFeatured: true, order: 1 },
        { author: 'Pierre Martin', quote: 'Délicieux !', rating: 5, isFeatured: true, order: 2 },
        { author: 'Sophie Leroy', quote: 'Très bon rapport qualité-prix.', rating: 4, isFeatured: true, order: 3 },
        { author: 'J-F Moreau', quote: 'La tarte tatin est à tomber.', rating: 5, isFeatured: true, order: 4 },
        { author: 'Isabelle Dupont', quote: "Un lieu authentique.", rating: 5, isFeatured: true, order: 5 },
        { author: 'Catherine Petit', quote: 'Excellent !', rating: 5, isFeatured: true, order: 6 },
      ]) {
        await strapi.documents('api::testimonial.testimonial').create({ data: t });
        strapi.log.info(`    ✓ ${t.author}`);
      }

      // FAQ
      strapi.log.info('  ❓ FAQ');
      for (const f of [
        { question: "Puis-je réserver pour un groupe ?", answer: "Oui, jusqu'à 12 personnes.", category: 'reservations', order: 1 },
        { question: "Avez-vous un parking ?", answer: "Parking public gratuit à proximité.", category: 'general', order: 2 },
        { question: "Cartes de crédit acceptées ?", answer: "Visa, Mastercard, Amex, espèces.", category: 'general', order: 3 },
        { question: "Adaptation pour allergies ?", answer: "Oui, prévenez-nous à l'avance.", category: 'menu', order: 4 },
        { question: "Menu enfant ?", answer: "Oui, portions adaptées.", category: 'menu', order: 5 },
        { question: "Tenue exigée ?", answer: "Non, ambiance conviviale.", category: 'general', order: 6 },
        { question: "Annulation gratuite ?", answer: "Jusqu'à 24h avant.", category: 'reservations', order: 7 },
        { question: "Accessible PMR ?", answer: "Oui, entièrement.", category: 'accessibility', order: 8 },
      ]) {
        await strapi.documents('api::faq.faq').create({ data: f });
        strapi.log.info(`    ✓ ${f.question}`);
      }

      // ─── Publish all content (Strapi v5 needs is_published=1) ───
      strapi.log.info('  📢 Publishing all content...');
      const pubTables = ['menu_categories', 'menu_items', 'team_members', 'reviews', 'testimonials', 'faqs', 'site_settings', 'seo_settings', 'gallery_images', 'reservations', 'contact_messages'];
      for (const table of pubTables) {
        try {
          const result = await strapi.db.connection.raw(
            `UPDATE ${table} SET is_published = 1, published_at = COALESCE(published_at, created_at) WHERE is_published = 0 OR is_published IS NULL`
          );
          const changes = (result as { changes?: number } | { [key: number]: { changes?: number } })?.changes || (result as any)?.[0]?.changes || 0; // eslint-disable-line @typescript-eslint/no-explicit-any
          if (changes > 0) strapi.log.info(`    ✓ ${table}: ${changes} published`);
        } catch (_unused: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
          // Table might not have is_published column — that's ok
        }
      }

      // Mark seeded
      await strapi.db.query('strapi::core-store').create({
        data: { key: 'bistrot_seeded', value: 'true' },
      });

      strapi.log.info('✅ Database seeded!');
    } catch (error: unknown) {
      const err = error as Error;
      strapi.log.error(`❌ Seed failed: ${err.message}`);
      console.error(error);
    }
  },
};
