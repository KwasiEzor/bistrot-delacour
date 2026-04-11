import { strapiFetch } from './client';
import type {
  MenuCategory, MenuItem, Reservation, ContactMessage,
  GalleryImage, Review, TeamMember, FAQ, Testimonial,
  SiteSettings, SEOSettings, StrapiResponse, StrapiCollection,
} from '../types/strapi';

// ─── Menu Categories ─────────────────────────────────────
export async function getMenuCategories() {
  return strapiFetch<StrapiCollection<MenuCategory>>('/menu-categories', {
    params: { 'sort': 'order:asc', 'pagination[pageSize]': '100' },
  });
}

// ─── Menu Items ──────────────────────────────────────────
export async function getMenuItems(category?: string) {
  const params: Record<string, string> = {
    'sort': 'createdAt:desc',
    'pagination[pageSize]': '100',
  };
  if (category) params['filters[category][slug][$eq]'] = category;
  return strapiFetch<StrapiCollection<MenuItem>>('/menu-items', { params });
}

export async function getSpecialMenuItems() {
  return strapiFetch<StrapiCollection<MenuItem>>('/menu-items', {
    params: { 'filters[isSpecial][$eq]': 'true', 'pagination[pageSize]': '10' },
  });
}

// ─── Reservations ────────────────────────────────────────
export async function createReservation(data: {
  date: string; time: string; guests: number;
  name: string; email: string; phone: string; specialRequests?: string;
}) {
  return strapiFetch<StrapiResponse<Reservation>>('/reservations', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

// ─── Contact Messages ────────────────────────────────────
export async function createContactMessage(data: {
  name: string; email: string; subject: string; message: string;
}) {
  return strapiFetch<StrapiResponse<ContactMessage>>('/contact-messages', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

// ─── Gallery ─────────────────────────────────────────────
export async function getGalleryImages(category?: string, featuredOnly = false) {
  const params: Record<string, string> = {
    'sort': 'order:asc', 'pagination[pageSize]': '100',
  };
  if (category) params['filters[category][$eq]'] = category;
  if (featuredOnly) params['filters[isFeatured][$eq]'] = 'true';
  return strapiFetch<StrapiCollection<GalleryImage>>('/gallery-images', { params });
}

// ─── Reviews ─────────────────────────────────────────────
export async function getReviews(limit = 20) {
  return strapiFetch<StrapiCollection<Review>>('/reviews', {
    params: { 'sort': 'date:desc', 'pagination[pageSize]': String(limit) },
  });
}

// ─── Team Members ────────────────────────────────────────
export async function getTeamMembers() {
  return strapiFetch<StrapiCollection<TeamMember>>('/team-members', {
    params: { 'sort': 'order:asc', 'pagination[pageSize]': '20' },
  });
}

// ─── FAQ ─────────────────────────────────────────────────
export async function getFAQs(category?: string) {
  const params: Record<string, string> = { 'sort': 'order:asc', 'pagination[pageSize]': '100' };
  if (category) params['filters[category][$eq]'] = category;
  return strapiFetch<StrapiCollection<FAQ>>('/faqs', { params });
}

// ─── Testimonials ────────────────────────────────────────
export async function getTestimonials(featuredOnly = false) {
  const params: Record<string, string> = { 'sort': 'order:asc', 'pagination[pageSize]': '50' };
  if (featuredOnly) params['filters[isFeatured][$eq]'] = 'true';
  return strapiFetch<StrapiCollection<Testimonial>>('/testimonials', { params });
}

// ─── Site Settings ───────────────────────────────────────
export async function getSiteSettings() {
  return strapiFetch<StrapiResponse<SiteSettings>>('/site-setting');
}

// ─── SEO Settings ────────────────────────────────────────
export async function getSEOSettings() {
  return strapiFetch<StrapiResponse<SEOSettings>>('/seo-setting');
}
