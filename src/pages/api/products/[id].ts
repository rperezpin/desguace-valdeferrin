// Detalle de producto unificado por ID (cate-{id} o wc-{id})
export const prerender = false;

import type { APIRoute } from 'astro';
import { getWcProduct } from '../../../lib/wc-api';
import { normalizeWcProduct, normalizeCatePieza } from '../../../lib/product-normalizer';
import type { Pieza } from '../../../lib/cate-types';

const CATE_BASE = import.meta.env.PUBLIC_CATE_API_URL;
const CATE_KEY = import.meta.env.PUBLIC_CATE_API_KEY;

export const GET: APIRoute = async ({ params }) => {
  try {
    const rawId = params.id || '';

    if (rawId.startsWith('cate-')) {
      const cateId = parseInt(rawId.replace('cate-', ''));
      const res = await fetch(`${CATE_BASE}/API/V2/Busqueda/GetPieza/${cateId}`, {
        headers: { 'Authorization': `Basic ${CATE_KEY}` },
      });
      if (!res.ok) throw new Error('Pieza no encontrada');
      const pieza = (await res.json()) as Pieza;
      return new Response(JSON.stringify(normalizeCatePieza(pieza)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (rawId.startsWith('wc-')) {
      const wcId = parseInt(rawId.replace('wc-', ''));
      const product = await getWcProduct(wcId);
      return new Response(JSON.stringify(normalizeWcProduct(product)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'ID invalido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Producto no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
