// API client configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Build query string from params object
 */
function buildQueryString(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return '';
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return '';
  return '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString();
}

/**
 * Generic fetch wrapper with error handling
 */
async function strapiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  const queryString = buildQueryString(params);
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Strapi API Error: ${response.status} - ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Upload file to Strapi media
 */
async function strapiUpload(file: File): Promise<{ id: number; url: string }> {
  const formData = new FormData();
  formData.append('files', file);

  const response = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0];
}

/**
 * Get image URL from Strapi image data
 */
export function getStrapiImageUrl(
  imageData: { data?: { attributes: { url: string; formats?: Record<string, { url: string }> } } } | null | undefined,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'
): string | null {
  if (!imageData?.data) return null;
  const { attributes } = imageData.data;

  // Strapi v5 returns full URLs; if relative, prepend STRAPI_URL
  const baseUrl = attributes.url.startsWith('http')
    ? ''
    : STRAPI_URL;

  if (size === 'original') {
    return `${baseUrl}${attributes.url}`;
  }

  const format = attributes.formats?.[size];
  if (format) {
    const formatUrl = format.url.startsWith('http') ? '' : STRAPI_URL;
    return `${formatUrl}${format.url}`;
  }

  return `${baseUrl}${attributes.url}`;
}

export { STRAPI_URL, strapiFetch, strapiUpload };
