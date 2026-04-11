// Strapi entity types for the frontend

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollection<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Menu Category ───────────────────────────────────────
export interface MenuCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    order: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    menuItems?: { data: MenuItem[] };
  };
}

// ─── Menu Item ───────────────────────────────────────────
export interface MenuItem {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    price: string;
    allergens: string[] | null;
    isAvailable: boolean;
    isSpecial: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image?: { data: StrapiImage };
    category?: { data: MenuCategory };
  };
}

// ─── Reservation ─────────────────────────────────────────
export interface Reservation {
  id: number;
  attributes: {
    date: string;
    time: string;
    guests: number;
    name: string;
    email: string;
    phone: string;
    specialRequests: string | null;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

// ─── Contact Message ─────────────────────────────────────
export interface ContactMessage {
  id: number;
  attributes: {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    adminReply: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

// ─── Gallery Image ───────────────────────────────────────
export interface GalleryImage {
  id: number;
  attributes: {
    title: string;
    caption: string | null;
    category: 'interior' | 'exterior' | 'food' | 'events' | 'team' | null;
    isFeatured: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: { data: StrapiImage };
  };
}

// ─── Review ──────────────────────────────────────────────
export interface Review {
  id: number;
  attributes: {
    author: string;
    rating: number;
    content: string;
    date: string;
    isVerified: boolean;
    source: 'google' | 'tripadvisor' | 'facebook' | 'direct' | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// ─── Team Member ─────────────────────────────────────────
export interface TeamMember {
  id: number;
  attributes: {
    name: string;
    role: string;
    bio: string | null;
    order: number;
    socialLinks: Record<string, string> | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    photo?: { data: StrapiImage };
  };
}

// ─── FAQ ─────────────────────────────────────────────────
export interface FAQ {
  id: number;
  attributes: {
    question: string;
    answer: string;
    category: 'general' | 'reservations' | 'menu' | 'accessibility' | 'parking' | 'other' | null;
    order: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// ─── Testimonial ─────────────────────────────────────────
export interface Testimonial {
  id: number;
  attributes: {
    author: string;
    quote: string;
    rating: number;
    isFeatured: boolean;
    order: number;
    date: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// ─── Site Settings ───────────────────────────────────────
export interface SiteSettings {
  id: number;
  attributes: {
    restaurantName: string;
    tagline: string | null;
    address: string;
    city: string;
    zipCode: string | null;
    country: string;
    phone: string;
    email: string | null;
    openingHours: {
      [key: string]: { open: string; close: string };
    } | null;
    heroTitle: string | null;
    heroSubtitle: string | null;
    heroImage?: { data: StrapiImage };
    facebookUrl: string | null;
    instagramUrl: string | null;
    googleMapsUrl: string | null;
    googleBusinessUrl: string | null;
    tripadvisorUrl: string | null;
    cancellationPolicy: string | null;
    groupBookingNote: string | null;
    serviceNote: string | null;
    heroBadgeRating: string;
    heroBadgeReviewCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

// ─── SEO Settings ────────────────────────────────────────
export interface PageMeta {
  id: string;
  path: string;
  title: string | null;
  description: string | null;
  image?: { data: StrapiImage };
  noIndex: boolean;
  canonicalUrl: string | null;
}

export interface SEOSettings {
  id: number;
  attributes: {
    defaultTitle: string;
    defaultDescription: string;
    defaultImage?: { data: StrapiImage };
    siteUrl: string;
    siteLanguage: string;
    twitterHandle: string | null;
    googleSiteVerification: string | null;
    schemaOrgData: Record<string, unknown> | null;
    pages: PageMeta[];
    createdAt: string;
    updatedAt: string;
  };
}
