/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { 
  Testimonial, 
  MenuCategory, 
  MenuItem, 
  GalleryImage, 
  Review, 
  StrapiCollection 
} from '../types/strapi'

/**
 * Placeholder services for Payload CMS migration.
 */

export const getTestimonials = async (_featured?: boolean): Promise<StrapiCollection<Testimonial>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};

export const getMenuCategories = async (): Promise<StrapiCollection<MenuCategory>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};
export const getMenuItems = async (_categorySlug?: string): Promise<StrapiCollection<MenuItem>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};
export const getSpecialMenuItems = async (): Promise<StrapiCollection<MenuItem>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};
export const getGalleryImages = async (): Promise<StrapiCollection<GalleryImage>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};
export const getReviews = async (_limit?: number): Promise<StrapiCollection<Review>> => {
  return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: 25, pageCount: 0 } } };
};
export const getTeamMembers = async (): Promise<any> => [];
export const getSiteSetting = async (): Promise<any> => null;
export const getSeoSetting = async (): Promise<any> => null;
export const createReservation = async (data: any): Promise<any> => data;
export const createContactMessage = async (data: any): Promise<any> => data;
