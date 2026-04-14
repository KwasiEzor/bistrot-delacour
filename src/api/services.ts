import { fetchAPI } from './client';
import type { 
  Testimonial, 
  MenuCategory, 
  MenuItem, 
  GalleryImage, 
  Review, 
  PaginatedDocs,
  SiteSetting,
  FAQ
} from '../types/payload';

/**
 * Payload CMS Data Services (REST API)
 */

export const getTestimonials = async (featuredOnly = false): Promise<PaginatedDocs<Testimonial>> => {
  const query = featuredOnly ? '?where[isFeatured][equals]=true&sort=order' : '?sort=order';
  return fetchAPI(`/api/testimonials${query}`);
};

export const getMenuCategories = async (): Promise<PaginatedDocs<MenuCategory>> => {
  return fetchAPI('/api/menu-categories?sort=order');
};

export const getMenuItems = async (categorySlug?: string): Promise<PaginatedDocs<MenuItem>> => {
  let query = '?sort=name';
  if (categorySlug) {
    query += `&where[category.slug][equals]=${categorySlug}`;
  }
  return fetchAPI(`/api/menu-items${query}`);
};

export const getSpecialMenuItems = async (): Promise<PaginatedDocs<MenuItem>> => {
  return fetchAPI('/api/menu-items?where[isSpecial][equals]=true');
};

export const getGalleryImages = async (): Promise<PaginatedDocs<GalleryImage>> => {
  return fetchAPI('/api/gallery-images?sort=order');
};

export const getReviews = async (limit = 50): Promise<PaginatedDocs<Review>> => {
  return fetchAPI(`/api/reviews?limit=${limit}&sort=-date`);
};

export const getTeamMembers = async (): Promise<PaginatedDocs<unknown>> => {
  return fetchAPI('/api/team-members?sort=order');
};

export const getFAQs = async (): Promise<PaginatedDocs<FAQ>> => {
  return fetchAPI('/api/faqs?sort=order');
};

export const getSiteSetting = async (): Promise<SiteSetting> => {
  return fetchAPI('/api/globals/site-settings');
};

export const getSeoSetting = async (): Promise<unknown> => {
  return fetchAPI('/api/globals/seo-settings');
};

export const createReservation = async (data: unknown): Promise<unknown> => {
  return fetchAPI('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const createContactMessage = async (data: unknown): Promise<unknown> => {
  return fetchAPI('/api/contact-messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
