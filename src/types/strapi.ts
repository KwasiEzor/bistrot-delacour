/**
 * Placeholder types for Payload CMS migration.
 * These will be replaced by Payload specific types soon.
 */

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
  publishedAt: string;
}

export interface MenuCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order: number;
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
  image: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface GalleryImage {
  id: number;
  documentId: string;
  title: string;
  image: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  category: string;
  order: number;
}

export interface Review {
  id: number;
  documentId: string;
  author: string;
  content: string;
  rating: number;
  date: string | null;
  createdAt: string;
  isVerified: boolean;
  source: string;
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
