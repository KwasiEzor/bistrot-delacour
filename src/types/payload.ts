/**
 * Payload CMS Type Definitions
 */

export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Media {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: MediaSize;
    medium?: MediaSize;
    large?: MediaSize;
  };
  alt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaSize {
  url?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  filesize?: number;
  filename?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  allergens?: string[] | null;
  category: string | MenuCategory;
  isAvailable: boolean;
  isSpecial: boolean;
  image?: string | Media;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  category: 'interior' | 'exterior' | 'food' | 'events' | 'team';
  image: string | Media;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  date?: string;
  isVerified: boolean;
  source: 'google' | 'tripadvisor' | 'facebook' | 'direct';
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'reservations' | 'menu' | 'general' | 'accessibility';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSetting {
  restaurantName: string;
  tagline?: string;
  address: string;
  city: string;
  zipCode?: string;
  country: string;
  phone: string;
  email?: string;
  openingHours?: {
    monday_thursday?: { open?: string; close?: string };
    friday_saturday?: { open?: string; close?: string };
    sunday?: { open?: string; close?: string };
  };
  hero?: {
    title?: string;
    subtitle?: string;
    image?: string | Media;
    badgeRating?: string;
    badgeReviewCount?: number;
  };
  socialLinks?: {
    facebookUrl?: string;
    instagramUrl?: string;
    googleMapsUrl?: string;
    tripadvisorUrl?: string;
  };
}
