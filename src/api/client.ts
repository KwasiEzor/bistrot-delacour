/**
 * Placeholder client for Payload CMS migration.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStrapiImageUrl = (image: any, _size?: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  if (!image) return null;
  // This is a placeholder to prevent frontend crashes during migration
  return typeof image === 'string' ? image : (image.url || null);
};

export const fetchAPI = async (path: string, _options = {}) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const url = `${import.meta.env.VITE_API_URL}${path}`;
  const response = await fetch(url);
  return response.json();
};
