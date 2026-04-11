// Strapi v5 entity types — flat format (no attributes wrapper)

export interface StrapiResponse<T> {
  data: T | null;
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

export interface StrapiCollection<T> {
  data: T[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

export interface StrapiImage {
  id: number;
  documentId: string;
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
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface MenuCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface MenuItem {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  allergens: string[] | null;
  isAvailable: boolean;
  isSpecial: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Reservation {
  id: number;
  documentId: string;
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
}

export interface ContactMessage {
  id: number;
  documentId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  adminReply: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: number;
  documentId: string;
  title: string;
  caption: string | null;
  category: 'interior' | 'exterior' | 'food' | 'events' | 'team' | null;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  image: StrapiImage | null;
}

export interface Review {
  id: number;
  documentId: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  isVerified: boolean;
  source: 'google' | 'tripadvisor' | 'facebook' | 'direct' | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  bio: string | null;
  order: number;
  socialLinks: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  photo: StrapiImage | null;
}

export interface FAQ {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category: 'general' | 'reservations' | 'menu' | 'accessibility' | 'parking' | 'other' | null;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Testimonial {
  id: number;
  documentId: string;
  author: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
  order: number;
  date: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  restaurantName: string;
  tagline: string | null;
  address: string;
  city: string;
  zipCode: string | null;
  country: string;
  phone: string;
  email: string | null;
  openingHours: Record<string, { open: string; close: string }> | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImage: StrapiImage | null;
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
  publishedAt: string | null;
}

export interface SEOSettings {
  id: number;
  documentId: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: StrapiImage | null;
  siteUrl: string;
  siteLanguage: string;
  twitterHandle: string | null;
  googleSiteVerification: string | null;
  schemaOrgData: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
