// Crea pedido(s) en WooCommerce y devuelve URL(s) de pago
// Si el carrito tiene items de ambas fuentes, crea 2 pedidos separados
export const prerender = false;

import type { APIRoute } from 'astro';
import { createWcOrder } from '../../../lib/wc-api';
import type { WcOrderLineItem, WcCreateOrderPayload } from '../../../lib/wc-api';
import type { Pieza } from '../../../lib/cate-types';
import { insertarPedidoCate, marcarVendidaCate } from '../../../lib/cate-api-server';
import type { CatePedidoLinea } from '../../../lib/cate-api-server';

const CATE_BASE = import.meta.env.PUBLIC_CATE_API_URL;
const CATE_KEY = import.meta.env.PUBLIC_CATE_API_KEY;
const PLACEHOLDER_ID = parseInt(import.meta.env.WC_CATE_PLACEHOLDER_PRODUCT_ID || '0');

interface CheckoutItem {
  productId: string;      // "cate-123" o "wc-456"
  quantity: number;
  name?: string;
  price?: number;
  priceWithoutTax?: number;
}

interface CheckoutRequest {
  items: CheckoutItem[];
  billing: WcCreateOrderPayload['billing'];
  shipping: WcCreateOrderPayload['shipping'];
}

interface OrderResult {
  orderId: number;
  orderNumber: string;
  total: string;
  paymentUrl: string;
  orderKey: string;
  source: 'cate' | 'woocommerce';
}

async function createWcOrderForItems(
  wcLineItems: WcOrderLineItem[],
  billing: WcCreateOrderPayload['billing'],
  shipping: WcCreateOrderPayload['shipping'],
): Promise<{ id: number; number: string; total: string; payment_url: string; order_key: string }> {
  const payload: WcCreateOrderPayload = {
    payment_method: '',
    payment_method_title: '',
    set_paid: false,
    billing,
    shipping,
    line_items: wcLineItems,
  };
  return createWcOrder(payload);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as CheckoutRequest;

    if (!body.items || body.items.length === 0) {
      return new Response(JSON.stringify({ error: 'El carrito esta vacio' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Separar items por fuente
    const cateItems: CheckoutItem[] = [];
    const wcOnlyItems: CheckoutItem[] = [];

    for (const item of body.items) {
      if (item.productId.startsWith('cate-')) {
        cateItems.push(item);
      } else if (item.productId.startsWith('wc-')) {
        wcOnlyItems.push(item);
      }
    }

    const orders: OrderResult[] = [];

    // --- Procesar items WooCommerce ---
    if (wcOnlyItems.length > 0) {
      const wcLineItems: WcOrderLineItem[] = wcOnlyItems.map(item => ({
        product_id: parseInt(item.productId.replace('wc-', '')),
        quantity: item.quantity,
      }));

      const wcOrder = await createWcOrderForItems(wcLineItems, body.billing, body.shipping);
      orders.push({
        orderId: wcOrder.id,
        orderNumber: wcOrder.number,
        total: wcOrder.total,
        paymentUrl: wcOrder.payment_url,
        orderKey: wcOrder.order_key,
        source: 'woocommerce',
      });
    }

    // --- Procesar items CAT-e ---
    if (cateItems.length > 0) {
      // Verificar disponibilidad de cada pieza
      for (const item of cateItems) {
        const cateId = item.productId.replace('cate-', '');
        try {
          const res = await fetch(`${CATE_BASE}/API/V2/Busqueda/GetPieza/${cateId}`, {
            headers: { 'Authorization': `Basic ${CATE_KEY}` },
          });
          if (!res.ok) throw new Error('Pieza no disponible');
          const pieza = (await res.json()) as Pieza;

          if (pieza.Cantidad <= 0) {
            return new Response(JSON.stringify({
              error: `La pieza "${pieza.Pieza}" ya no esta disponible`,
            }), {
              status: 409,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        } catch {
          // Si no se puede verificar, continuar
        }
      }

      // Crear WC order con placeholder products (para pasarela de pago)
      if (PLACEHOLDER_ID <= 0) {
        return new Response(JSON.stringify({
          error: 'Configuracion incompleta: producto placeholder CAT-e no definido',
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const cateWcLineItems: WcOrderLineItem[] = cateItems.map(item => ({
        product_id: PLACEHOLDER_ID,
        quantity: item.quantity,
        meta_data: [
          { key: '_cate_pieza_id', value: item.productId.replace('cate-', '') },
          { key: '_cate_pieza_nombre', value: item.name || '' },
          { key: '_cate_pieza_precio', value: String(item.price || 0) },
          { key: '_source', value: 'cate' },
        ],
      }));

      const cateOrder = await createWcOrderForItems(cateWcLineItems, body.billing, body.shipping);
      orders.push({
        orderId: cateOrder.id,
        orderNumber: cateOrder.number,
        total: cateOrder.total,
        paymentUrl: cateOrder.payment_url,
        orderKey: cateOrder.order_key,
        source: 'cate',
      });

      // Notificar a Azeler via InsertarPedido
      try {
        const lineas: CatePedidoLinea[] = cateItems.map(item => ({
          codPiezaAlmacen: parseInt(item.productId.replace('cate-', '')),
          precio: item.priceWithoutTax || (item.price ? item.price / 1.21 : 0),
          precioConImpuesto: item.price || 0,
          descripcion: item.name || '',
          cantidad: item.quantity,
        }));

        await insertarPedidoCate(body.billing, cateOrder.number, lineas);

        // Marcar piezas como vendidas en CAT-e
        for (const item of cateItems) {
          const cateId = parseInt(item.productId.replace('cate-', ''));
          await marcarVendidaCate(cateId);
        }
      } catch (err) {
        console.error('Error notificando a Azeler (pedido WC creado correctamente):', err);
        // No falla el checkout — el pedido WC ya se creo
      }
    }

    if (orders.length === 0) {
      return new Response(JSON.stringify({ error: 'No hay productos validos para procesar' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ orders }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creando pedido:', err);
    return new Response(JSON.stringify({ error: 'Error al crear el pedido' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
