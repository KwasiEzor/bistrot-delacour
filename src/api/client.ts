// API client for Strapi v5
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

function buildQueryString(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return '';
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return '';
  return '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString();
}

async function strapiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  const queryString = buildQueryString(params);
  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Strapi API Error: ${response.status} - ${error.message || response.statusText}`);
  }

  return response.json();
}

export function getStrapiImageUrl(
  image: { url: string; formats?: Record<string, { url: string }> } | null | undefined,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'
): string | null {
  if (!image) return null;
  if (size === 'original') return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  const format = image.formats?.[size];
  if (format) return format.url.startsWith('http') ? format.url : `${STRAPI_URL}${format.url}`;
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}

export { STRAPI_URL, strapiFetch };
