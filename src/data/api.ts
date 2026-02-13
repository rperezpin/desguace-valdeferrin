// API CAT-e v3.7 — Azeler
// La API key es de acceso lectura al catálogo, segura para uso client-side.

export const apiConfig = {
  baseUrl: import.meta.env.PUBLIC_CATE_API_URL || 'https://pre-api.azelerecambios.com',
  apiKey: import.meta.env.PUBLIC_CATE_API_KEY || '',
  itemsPerPage: 12,
} as const;
