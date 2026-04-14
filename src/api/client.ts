/**
 * Payload CMS API Client
 */

export const getPayloadImageUrl = (image: unknown, size?: 'thumbnail' | 'medium' | 'large') => {
  if (!image) return null;
  
  // If image is just a string (ID), we can't get the URL easily without fetching
  if (typeof image === 'string') return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = image as any;

  // If it's the full media object from Payload
  if (size && img.sizes && img.sizes[size]) {
    return img.sizes[size].url || img.url;
  }

  return img.url || null;
};

export const fetchAPI = async (path: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...((options as any).headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};
