/**
 * Seed script — populates Strapi with initial data for Bistrot De La Cour
 * Run: cd strapi && node seed.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = "http://localhost:1337";
let authToken = null;

// ─── Helpers ───────────────────────────────────────────────

async function api(method, endpoint, body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const opts = {
    method,
    headers,
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${STRAPI_URL}${endpoint}`, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API Error ${res.status}: ${err}`);
  }
  return res.json();
}

/**
 * Upload an image and return the media ID
 */
async function uploadImage(filePath, name) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${filePath} — skipping`);
    return null;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();
  formData.append("files", blob, name);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    console.warn(`  ⚠ Upload failed for ${name}: ${res.status}`);
    return null;
  }

  const data = await res.json();
  return data[0].id;
}

// ─── Seed Data ─────────────────────────────────────────────

async function loginAdmin() {
  console.log("\n🔑 Logging in as admin...");

  const email = process.env.STRAPI_EMAIL || "thefreelance.biz@gmail.com";
  const password = process.env.STRAPI_PASSWORD;

  if (!password) {
    throw new Error(
      "Missing STRAPI_PASSWORD environment variable.\n" +
      "Run: STRAPI_PASSWORD='your-password' node seed.mjs"
    );
  }

  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Login failed: ${err.error?.message || res.statusText}\n` +
      `Check your credentials.`
    );
  }

  const data = await res.json();
  authToken = data.data.token;
  console.log("  ✓ Logged in successfully");
}

// Stub — not needed since we login via /admin/login
async function registerAdmin() {
  console.log("  ℹ Registration not needed — use /admin/login");
}

async function seedMenuCategories() {
  console.log("\n🍽️  Seeding Menu Categories...");
  const categories = [
    {
      name: "Entrées",
      slug: "entrees",
      description: "Pour commencer en beauté",
      icon: "Leaf",
      order: 1,
    },
    {
      name: "Plats principaux",
      slug: "plats",
      description: "Nos spécialités",
      icon: "ChefHat",
      order: 2,
    },
    {
      name: "Desserts",
      slug: "desserts",
      description: "Douceurs sucrées",
      icon: "Wheat",
      order: 3,
    },
    {
      name: "Boissons",
      slug: "boissons",
      description: "Cocktails, vins et plus",
      icon: "Fish",
      order: 4,
    },
  ];

  const created = [];
  for (const cat of categories) {
    const res = await api(
      "POST",
      "/api/menu-categories",
      { data: cat },
      authToken,
    );
    created.push({ id: res.data.id, slug: res.data.attributes.slug });
    console.log(`  ✓ ${cat.name}`);
  }
  return created;
}

async function seedMenuItems(categories) {
  console.log("\n🍴 Seeding Menu Items...");

  const imageDir = path.join(__dirname, "..", "public", "images");

  const items = [
    // Entrées
    {
      name: "Carpaccio de Saint-Jacques",
      slug: "carpaccio-saint-jacques",
      description:
        "Fines tranches de Saint-Jacques fraîches, huile d'olive extra vierge, citron confit et fleur de sel",
      price: "24€",
      allergens: ["Crustacés"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "carpaccio.jpg",
    },
    {
      name: "Foie gras maison",
      slug: "foie-gras-maison",
      description:
        "Foie gras de canard mi-cuit, chutney de figues et pain brioché toasté",
      price: "28€",
      allergens: ["Fruits à coque"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "foie-gras.jpg",
    },
    {
      name: "Salade de chèvre chaud",
      slug: "salade-chevre-chaud",
      description:
        "Salade mélangée, chèvre frais pané, miel d'acacia et noix grillées",
      price: "16€",
      allergens: ["Lait", "Fruits à coque"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "goat-cheese-salad.jpg",
    },
    {
      name: "Soupe à l'oignon",
      slug: "soupe-oignon",
      description:
        "Soupe traditionnelle gratinée au fromage de Gruyère et croûtons",
      price: "14€",
      allergens: ["Lait", "Gluten"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "onion-soup.jpg",
    },
    // Plats
    {
      name: "Bœuf Bourguignon",
      slug: "boeuf-bourguignon",
      description:
        "Traditionnel bœuf braisé au vin rouge bourguignon, champignons de saison et oignons grelots",
      price: "28€",
      allergens: ["Sulfites"],
      isAvailable: true,
      isSpecial: true,
      imageFile: "boeuf-bourguignon.jpg",
    },
    {
      name: "Saumon grillé",
      slug: "saumon-grille",
      description:
        "Filet de saumon frais grillé, légumes de saison et sauce hollandaise légère",
      price: "26€",
      allergens: ["Poisson", "Œufs", "Lait"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "salmon.jpg",
    },
    {
      name: "Coq au vin",
      slug: "coq-au-vin",
      description:
        "Coq fermier mijoté au vin rouge, champignons et petits légumes",
      price: "25€",
      allergens: ["Sulfites"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "coq-au-vin.jpg",
    },
    {
      name: "Risotto aux champignons",
      slug: "risotto-champignons",
      description:
        "Riz Arborio crémeux, mélange de champignons sauvages et parmesan",
      price: "22€",
      allergens: ["Lait", "Gluten"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "mushroom-risotto.jpg",
    },
    {
      name: "Magret de canard",
      slug: "magret-canard",
      description:
        "Magret de canard grillé, sauce aux fruits rouges et pommes grenailles",
      price: "29€",
      allergens: [],
      isAvailable: true,
      isSpecial: true,
      imageFile: "magret-canard.jpg",
    },
    {
      name: "Blanquette de veau",
      slug: "blanquette-veau",
      description:
        "Traditionnelle blanquette de veau, riz blanc et légumes de saison",
      price: "27€",
      allergens: ["Lait", "Gluten"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "blanquette-veau.jpg",
    },
    // Desserts
    {
      name: "Tarte Tatin",
      slug: "tarte-tatin",
      description:
        "Pomme caramélisée, pâte feuilletée croustillante, crème fraîche vanillée",
      price: "12€",
      allergens: ["Lait", "Gluten"],
      isAvailable: true,
      isSpecial: true,
      imageFile: "tarte-tatin.jpg",
    },
    {
      name: "Crème brûlée",
      slug: "creme-brulee",
      description:
        "Crème vanillée onctueuse, caramel croquant et fruits rouges",
      price: "10€",
      allergens: ["Lait", "Œufs"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "creme-brulee.jpg",
    },
    {
      name: "Mousse au chocolat",
      slug: "mousse-chocolat",
      description: "Mousse légère au chocolat noir 70%, coulis de framboise",
      price: "11€",
      allergens: ["Lait", "Œufs"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "chocolate-mousse.jpg",
    },
    {
      name: "Profiteroles",
      slug: "profiteroles",
      description: "Choux frais garnis de glace vanille et chocolat chaud",
      price: "13€",
      allergens: ["Lait", "Gluten", "Œufs"],
      isAvailable: true,
      isSpecial: false,
      imageFile: "profiteroles.jpg",
    },
    // Boissons
    {
      name: "Vin rouge - Bordeaux",
      slug: "vin-rouge-bordeaux",
      description:
        "Château Margaux 2018 - Notes de fruits noirs et tanins soyeux",
      price: "8€/verre • 45€/bouteille",
      allergens: ["Sulfites"],
      isAvailable: true,
      isSpecial: false,
      imageFile: null,
    },
    {
      name: "Vin blanc - Chardonnay",
      slug: "vin-blanc-chardonnay",
      description: "Domaine de la Romanée-Conti 2020 - Frais et minéral",
      price: "7€/verre • 38€/bouteille",
      allergens: ["Sulfites"],
      isAvailable: true,
      isSpecial: false,
      imageFile: null,
    },
    {
      name: "Bière locale",
      slug: "biere-locale",
      description: "Bières belges artisanales pression - Sélection du moment",
      price: "4,50€",
      allergens: [],
      isAvailable: true,
      isSpecial: false,
      imageFile: null,
    },
    {
      name: "Cocktails signature",
      slug: "cocktails-signature",
      description:
        "French 75 - Gin, champagne, citron et sucre - Negroni - Campari, gin et vermouth rouge",
      price: "12€",
      allergens: [],
      isAvailable: true,
      isSpecial: false,
      imageFile: null,
    },
    {
      name: "Café & Digestifs",
      slug: "cafe-digestifs",
      description:
        "Café torréfié artisanal, calvados, cognac et autres spiritueux",
      price: "3,50€ - 8€",
      allergens: [],
      isAvailable: true,
      isSpecial: false,
      imageFile: null,
    },
  ];

  const catMap = {
    Entrées: categories.find((c) => c.slug === "entrees"),
    Plats: categories.find((c) => c.slug === "plats"),
    Desserts: categories.find((c) => c.slug === "desserts"),
    Boissons: categories.find((c) => c.slug === "boissons"),
  };

  const catNames = {
    entrees: ["Entrées", "Entrées", "Entrées", "Entrées"],
    plats: ["Plats", "Plats", "Plats", "Plats", "Plats", "Plats"],
    desserts: ["Desserts", "Desserts", "Desserts", "Desserts"],
    boissons: ["Boissons", "Boissons", "Boissons", "Boissons", "Boissons"],
  };

  const flatCatNames = Object.values(catNames).flat();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const catName = flatCatNames[i];
    const category = catMap[catName];

    let imageId = null;
    if (item.imageFile) {
      const imagePath = path.join(imageDir, item.imageFile);
      imageId = await uploadImage(imagePath, item.imageFile);
    }

    const data = {
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      allergens: item.allergens,
      isAvailable: item.isAvailable,
      isSpecial: item.isSpecial,
    };
    if (category) data.category = category.id;
    if (imageId) data.image = imageId;

    await api("POST", "/api/menu-items", { data }, authToken);
    console.log(`  ✓ ${item.name}`);
  }
}

async function seedSiteSettings() {
  console.log("\n⚙️  Seeding Site Settings...");

  const heroImagePath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "restaurant-interior.jpg",
  );
  const heroImageId = await uploadImage(heroImagePath, "hero-interior.jpg");

  const data = {
    restaurantName: "Bistrot De La Cour",
    tagline: "L'Art de la Convivialité",
    address: "Rue de Dampremy 22",
    city: "Charleroi",
    zipCode: "6000",
    country: "Belgique",
    phone: "071 59 64 48",
    email: "contact@bistrot-delacour.be",
    openingHours: {
      monday_thursday: { open: "12:00", close: "22:00" },
      friday_saturday: { open: "12:00", close: "23:00" },
      sunday: { open: "12:00", close: "22:00" },
    },
    heroTitle: "L'Art de la Convivialité",
    heroSubtitle:
      "Découvrez une cuisine simple et excellente dans une ambiance chaleureuse au cœur de Charleroi. Une expérience culinaire authentique.",
    facebookUrl: "https://facebook.com/bistrotdelacour",
    instagramUrl: "https://instagram.com/bistrotdelacour",
    googleMapsUrl:
      "https://maps.google.com/?q=Rue+de+Dampremy+22+6000+Charleroi",
    heroBadgeRating: "4.7",
    heroBadgeReviewCount: 178,
    cancellationPolicy:
      "Annulation gratuite jusqu'à 24h avant votre réservation. Au-delà, nous facturons 50% du montant de la réservation.",
    groupBookingNote:
      "Pour les groupes de plus de 8 personnes, contactez-nous directement par téléphone au 071 59 64 48. Nous vous proposerons un menu adapté.",
    serviceNote:
      "Service continu de 12h à 22h en semaine, jusqu'à 23h le week-end. La dernière commande est prise 30 minutes avant la fermeture.",
  };

  if (heroImageId) data.heroImage = heroImageId;

  await api("POST", "/api/site-setting", { data }, authToken);
  console.log("  ✓ Site Settings created");
}

async function seedSEOSettings() {
  console.log("\n🔍 Seeding SEO Settings...");

  const data = {
    defaultTitle: "Bistrot De La Cour - Restaurant Charleroi",
    defaultDescription:
      "Découvrez une cuisine simple et excellente dans une ambiance chaleureuse au cœur de Charleroi. Bistrot De La Cour, une expérience culinaire authentique depuis 2018.",
    siteUrl: "https://bistrot-delacour.be",
    siteLanguage: "fr",
    twitterHandle: "@bistrotdelacour",
    schemaOrgData: {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Bistrot De La Cour",
      image: "https://bistrot-delacour.be/images/restaurant-interior.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rue de Dampremy 22",
        addressLocality: "Charleroi",
        postalCode: "6000",
        addressCountry: "BE",
      },
      telephone: "+3271596448",
      servesCuisine: "French",
      priceRange: "€€",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "12:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "12:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "12:00",
          closes: "22:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "178",
      },
    },
    pages: [
      {
        path: "/",
        title: "Accueil - Bistrot De La Cour",
        description: "Restaurant chaleureux à Charleroi, cuisine authentique",
      },
      {
        path: "/about",
        title: "À propos - Notre Histoire",
        description:
          "Depuis 2018, le Bistrot De La Cour est le rendez-vous des gourmands de Charleroi",
      },
      {
        path: "/menu",
        title: "Notre Menu - Plats & Boissons",
        description:
          "Découvrez nos plats préparés avec des ingrédients frais et de saison",
      },
      {
        path: "/reservation",
        title: "Réserver une Table",
        description:
          "Réservez votre table en ligne pour une expérience culinaire exceptionnelle",
      },
      {
        path: "/gallery",
        title: "Galerie Photos",
        description:
          "Découvrez l'ambiance chaleureuse et la cuisine raffinée du Bistrot De La Cour",
      },
      {
        path: "/reviews",
        title: "Avis Clients",
        description: "Découvrez ce que nos clients pensent de leur expérience",
      },
      {
        path: "/contact",
        title: "Contactez-nous",
        description: "Vous avez une question ? N'hésitez pas à nous contacter",
      },
    ],
  };

  await api("POST", "/api/seo-setting", { data }, authToken);
  console.log("  ✓ SEO Settings created");
}

async function seedTeamMembers() {
  console.log("\n👥 Seeding Team Members...");

  const photoDir = path.join(__dirname, "..", "public", "images");
  const members = [
    {
      name: "Jean-Michel Dubois",
      role: "Chef & Propriétaire",
      bio: "15 ans d'expérience dans la gastronomie française, passionné par les produits frais et les recettes traditionnelles.",
      photoFile: "chef.jpg",
      order: 1,
    },
    {
      name: "Marie Claire",
      role: "Chef de Salle",
      bio: "Experte en service et en vins, elle veille à ce que chaque moment passé chez nous soit mémorable.",
      photoFile: "couple-dining.jpg",
      order: 2,
    },
    {
      name: "Pierre Laurent",
      role: "Sommelier",
      bio: "Spécialiste des vins régionaux, il saura vous conseiller le meilleur accord pour vos plats.",
      photoFile: "gallery-3.jpg",
      order: 3,
    },
  ];

  for (const member of members) {
    const photoPath = path.join(photoDir, member.photoFile);
    const photoId = await uploadImage(photoPath, member.photoFile);

    const data = {
      name: member.name,
      role: member.role,
      bio: member.bio,
      order: member.order,
    };
    if (photoId) data.photo = photoId;

    await api("POST", "/api/team-members", { data }, authToken);
    console.log(`  ✓ ${member.name}`);
  }
}

async function seedReviews() {
  console.log("\n⭐ Seeding Reviews...");

  const reviews = [
    {
      author: "Marie Dubois",
      rating: 5,
      content:
        "Un bistrot charmant avec une cuisine excellente. Le service est rapide et l'ambiance très conviviale. Le bœuf bourguignon était divin ! À recommander absolument.",
      date: "2024-12-15",
      isVerified: true,
      source: "google",
    },
    {
      author: "Pierre Martin",
      rating: 5,
      content:
        "Très bon rapport qualité-prix. Les plats sont préparés avec soin et les portions sont généreuses. L'accueil est chaleureux et le personnel attentionné.",
      date: "2024-12-12",
      isVerified: true,
      source: "google",
    },
    {
      author: "Sophie Leroy",
      rating: 4,
      content:
        "Cuisine simple mais savoureuse. Parfait pour un dîner en couple. Le cadre est agréable et l'ambiance feutrée. Je reviendrai certainement !",
      date: "2024-12-10",
      isVerified: false,
      source: "tripadvisor",
    },
    {
      author: "Jean-François Moreau",
      rating: 5,
      content:
        "Découvert ce bistrot par hasard et quelle belle surprise ! La tarte tatin est à tomber. Service impeccable et prix raisonnables.",
      date: "2024-12-08",
      isVerified: true,
      source: "google",
    },
    {
      author: "Isabelle Dupont",
      rating: 5,
      content:
        "Un lieu authentique où l'on se sent bien. La cuisine est faite maison avec des produits frais. L'équipe est sympathique et professionnelle.",
      date: "2024-12-05",
      isVerified: true,
      source: "facebook",
    },
    {
      author: "Michel Bernard",
      rating: 4,
      content:
        "Bon restaurant de quartier. Cuisine traditionnelle bien exécutée. Service rapide, idéal pour un repas entre amis ou collègues.",
      date: "2024-12-03",
      isVerified: false,
      source: "google",
    },
    {
      author: "Catherine Petit",
      rating: 5,
      content:
        "Excellent ! Tout était parfait : la nourriture, le service, l'ambiance. Le saumon grillé était cuit à la perfection. Une adresse à retenir.",
      date: "2024-11-28",
      isVerified: true,
      source: "google",
    },
    {
      author: "Laurent Garnier",
      rating: 5,
      content:
        "Superbe expérience culinaire. Les plats sont créatifs tout en restant classiques. Le vin conseillé par le sommelier était excellent.",
      date: "2024-11-25",
      isVerified: true,
      source: "tripadvisor",
    },
    {
      author: "Valérie Roux",
      rating: 4,
      content:
        "Très bonne adresse. Cuisine de qualité, service attentionné. Petit bémol sur le bruit, mais cela fait partie du charme des bistrots.",
      date: "2024-11-22",
      isVerified: false,
      source: "google",
    },
    {
      author: "Philippe Durand",
      rating: 5,
      content:
        "Restaurant familial par excellence. Les enfants sont les bienvenus et le menu enfant est adapté. Ambiance conviviale garantie !",
      date: "2024-11-20",
      isVerified: true,
      source: "direct",
    },
  ];

  for (const review of reviews) {
    await api("POST", "/api/reviews", { data: review }, authToken);
    console.log(`  ✓ ${review.author} (${review.rating}★)`);
  }
}

async function seedTestimonials() {
  console.log("\n💬 Seeding Testimonials...");

  const testimonials = [
    {
      author: "Marie Dubois",
      quote:
        "Un bistrot charmant avec une cuisine excellente. Le bœuf bourguignon était divin ! À recommander absolument.",
      rating: 5,
      isFeatured: true,
      order: 1,
    },
    {
      author: "Pierre Martin",
      quote:
        "Délicieux ! Les plats sont préparés avec soin et les portions sont généreuses. L'accueil est chaleureux.",
      rating: 5,
      isFeatured: true,
      order: 2,
    },
    {
      author: "Sophie Leroy",
      quote:
        "Très bon rapport qualité-prix. Cuisine simple mais savoureuse. Parfait pour un dîner en couple.",
      rating: 4,
      isFeatured: true,
      order: 3,
    },
    {
      author: "Jean-François Moreau",
      quote:
        "La tarte tatin est à tomber. Service impeccable et prix raisonnables. À découvrir !",
      rating: 5,
      isFeatured: true,
      order: 4,
    },
    {
      author: "Isabelle Dupont",
      quote:
        "Un lieu authentique où l'on se sent bien. La cuisine est faite maison avec des produits frais.",
      rating: 5,
      isFeatured: true,
      order: 5,
    },
    {
      author: "Catherine Petit",
      quote:
        "Excellent ! Tout était parfait : la nourriture, le service, l'ambiance. Une adresse à retenir.",
      rating: 5,
      isFeatured: true,
      order: 6,
    },
  ];

  for (const t of testimonials) {
    await api("POST", "/api/testimonials", { data: t }, authToken);
    console.log(`  ✓ ${t.author}`);
  }
}

async function seedGallery() {
  console.log("\n📸 Seeding Gallery Images...");

  const imageDir = path.join(__dirname, "..", "public", "images");
  const images = [
    {
      title: "Salle principale",
      caption: "Notre salle principale chaleureuse",
      category: "interior",
      isFeatured: true,
      order: 1,
      file: "restaurant-interior.jpg",
    },
    {
      title: "Présentation élégante",
      caption: "L'art de la présentation",
      category: "food",
      isFeatured: true,
      order: 2,
      file: "food-presentation.jpg",
    },
    {
      title: "Tables et décoration",
      caption: "Ambiance intime",
      category: "interior",
      isFeatured: false,
      order: 3,
      file: "gallery-1.jpg",
    },
    {
      title: "Plat signature",
      caption: "Le plat signature du chef",
      category: "food",
      isFeatured: true,
      order: 4,
      file: "gallery-2.jpg",
    },
    {
      title: "Bar et cave à vins",
      caption: "Notre sélection de vins",
      category: "interior",
      isFeatured: false,
      order: 5,
      file: "gallery-3.jpg",
    },
    {
      title: "Salle à manger",
      caption: "Élégance et confort",
      category: "interior",
      isFeatured: false,
      order: 6,
      file: "gallery-4.jpg",
    },
    {
      title: "Dessert au chocolat",
      caption: "Dessert maison au chocolat",
      category: "food",
      isFeatured: true,
      order: 7,
      file: "gallery-5.jpg",
    },
    {
      title: "Façade du restaurant",
      caption: "Notre façade accueillante",
      category: "exterior",
      isFeatured: false,
      order: 8,
      file: "restaurant-exterior.jpg",
    },
    {
      title: "Ambiance conviviale",
      caption: "Moments de partage",
      category: "interior",
      isFeatured: false,
      order: 9,
      file: "couple-dining.jpg",
    },
    {
      title: "Carpaccio de Saint-Jacques",
      caption: "Saint-Jacques fraîches",
      category: "food",
      isFeatured: false,
      order: 10,
      file: "carpaccio.jpg",
    },
    {
      title: "Bœuf Bourguignon",
      caption: "Notre classique revisité",
      category: "food",
      isFeatured: false,
      order: 11,
      file: "boeuf-bourguignon.jpg",
    },
    {
      title: "Saumon grillé",
      caption: "Saumon frais aux légumes",
      category: "food",
      isFeatured: false,
      order: 12,
      file: "salmon.jpg",
    },
  ];

  for (const img of images) {
    const filePath = path.join(imageDir, img.file);
    const imageId = await uploadImage(filePath, img.file);
    if (!imageId) continue;

    const data = {
      title: img.title,
      caption: img.caption,
      category: img.category,
      isFeatured: img.isFeatured,
      order: img.order,
      image: imageId,
    };

    await api("POST", "/api/gallery-images", { data }, authToken);
    console.log(`  ✓ ${img.title}`);
  }
}

async function seedFAQ() {
  console.log("\n❓ Seeding FAQ...");

  const faqs = [
    {
      question: "Puis-je réserver une table pour un groupe ?",
      answer:
        "Oui, nous acceptons les réservations pour les groupes jusqu'à 12 personnes. Pour les groupes plus importants, contactez-nous directement par téléphone.",
      category: "reservations",
      order: 1,
    },
    {
      question: "Avez-vous un parking ?",
      answer:
        "Oui, un parking public gratuit est disponible à proximité du restaurant. Nous pouvons aussi vous indiquer les parkings payants les plus proches.",
      category: "general",
      order: 2,
    },
    {
      question: "Acceptez-vous les cartes de crédit ?",
      answer:
        "Oui, nous acceptons les cartes Visa, Mastercard et American Express. Le paiement en espèces est également possible.",
      category: "general",
      order: 3,
    },
    {
      question: "Pouvez-vous adapter les plats pour les allergies ?",
      answer:
        "Absolument ! Notre équipe est formée pour gérer les allergies alimentaires. Merci de nous prévenir à l'avance lors de votre réservation.",
      category: "menu",
      order: 4,
    },
    {
      question: "Proposez-vous des menus pour enfants ?",
      answer:
        "Oui, nous avons un menu enfant adapté avec des portions raisonnables et des plats simples que les enfants aiment.",
      category: "menu",
      order: 5,
    },
    {
      question: "Y a-t-il une tenue vestimentaire exigée ?",
      answer:
        "Non, nous privilégions une ambiance conviviale. Venez comme vous êtes ! Cependant, nous apprécions une tenue correcte.",
      category: "general",
      order: 6,
    },
    {
      question: "Puis-je annuler ma réservation ?",
      answer:
        "L'annulation est gratuite jusqu'à 24h avant votre réservation. Au-delà, nous facturons 50% du montant.",
      category: "reservations",
      order: 7,
    },
    {
      question:
        "Le restaurant est-il accessible aux personnes à mobilité réduite ?",
      answer:
        "Oui, notre restaurant est entièrement accessible. N'hésitez pas à nous contacter pour toute question spécifique.",
      category: "accessibility",
      order: 8,
    },
  ];

  for (const faq of faqs) {
    await api("POST", "/api/faqs", { data: faq }, authToken);
    console.log(`  ✓ ${faq.question}`);
  }
}

// ─── Main ──────────────────────────────────────────────────

async function main() {
  console.log("🚀 Seeding Bistrot De La Cour Strapi Database...\n");
  console.log("=".repeat(50));

  await loginAdmin();

  const categories = await seedMenuCategories();
  await seedMenuItems(categories);
  await seedSiteSettings();
  await seedSEOSettings();
  await seedTeamMembers();
  await seedReviews();
  await seedTestimonials();
  await seedGallery();
  await seedFAQ();

  console.log("\n" + "=".repeat(50));
  console.log("✅ Seeding complete!");
  console.log("🌐 Admin panel: http://localhost:1337/admin");
  console.log("🍽️  Frontend: http://localhost:5173");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
