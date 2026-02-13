// Consultar estado de un pedido
export const prerender = false;

import type { APIRoute } from 'astro';
import { getWcOrder } from '../../../lib/wc-api';

export const GET: APIRoute = async ({ params, url }) => {
  try {
    const orderId = parseInt(params.id || '0');
    const orderKey = url.searchParams.get('key') || '';

    if (!orderId) {
      return new Response(JSON.stringify({ error: 'ID de pedido invalido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const order = await getWcOrder(orderId);

    if (order.order_key !== orderKey) {
      return new Response(JSON.stringify({ error: 'Acceso no autorizado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      id: order.id,
      number: order.number,
      status: order.status,
      total: order.total,
      lineItems: order.line_items,
      billing: order.billing,
      shipping: order.shipping,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Pedido no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
