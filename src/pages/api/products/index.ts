// Busqueda unificada: combina resultados de CAT-e y WooCommerce
export const prerender = false;

import type { APIRoute } from 'astro';
import { getWcProducts } from '../../../lib/wc-api';
import { normalizeWcProduct, normalizeCatePieza } from '../../../lib/product-normalizer';
import type { UnifiedProduct, UnifiedSearchResult } from '../../../lib/unified-types';
import type { Pieza } from '../../../lib/cate-types';

const CATE_BASE = import.meta.env.PUBLIC_CATE_API_URL || 'https://pre-api.azelerecambios.com';
const CATE_KEY = import.meta.env.PUBLIC_CATE_API_KEY || '';

async function cateFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${CATE_BASE}/API/${endpoint}`, {
    headers: { 'Authorization': `Basic ${CATE_KEY}` },
  });
  if (!res.ok) throw new Error(`CAT-e API ${res.status}`);
  return res.json() as Promise<T>;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const q = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '0');
    const perPage = parseInt(url.searchParams.get('per_page') || '12');
    const source = url.searchParams.get('source') || 'all';

    let allProducts: UnifiedProduct[] = [];
    let totalCate = 0;
    let totalWc = 0;

    // Buscar en CAT-e
    if (source === 'all' || source === 'cate') {
      try {
        const searchText = q.trim() || ' ';
        totalCate = await cateFetch<number>(
          `V2/Busqueda/GetNumPiezas/${encodeURIComponent(searchText)}`
        );
        if (totalCate > 0) {
          const piezas = await cateFetch<Pieza[]>(
            `V2/Busqueda/GetPiezas/${encodeURIComponent(searchText)}/${page}/${perPage}`
          );
          allProducts.push(...piezas.map(normalizeCatePieza));
        }
      } catch (err) {
        console.error('Error buscando en CAT-e:', err);
      }
    }

    // Buscar en WooCommerce
    if (source === 'all' || source === 'wc') {
      try {
        const wcResult = await getWcProducts({
          search: q.trim() || undefined,
          page: page + 1,   // WC es 1-indexed
          per_page: perPage,
        });
        totalWc = wcResult.totalItems;
        allProducts.push(...wcResult.products.map(normalizeWcProduct));
      } catch (err) {
        console.error('Error buscando en WooCommerce:', err);
      }
    }

    // Ordenar: primero los que tienen precio, luego por precio asc
    allProducts.sort((a, b) => {
      if (a.price != null && b.price == null) return -1;
      if (a.price == null && b.price != null) return 1;
      if (a.price != null && b.price != null) return a.price - b.price;
      return 0;
    });

    const totalItems = totalCate + totalWc;
    const result: UnifiedSearchResult = {
      products: allProducts,
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / perPage),
      itemsPerPage: perPage,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error en /api/products:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
