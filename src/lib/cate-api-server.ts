// Cliente CAT-e API — server-side only (POST methods)
// No importar en <script> tags ni en codigo client-side

const CATE_BASE = import.meta.env.PUBLIC_CATE_API_URL;
const CATE_KEY = import.meta.env.PUBLIC_CATE_API_KEY;
const CIF_EMPRESA = import.meta.env.CATE_CIF_EMPRESA || '';
const CODIGO_GESTOR = import.meta.env.CATE_CODIGO_GESTOR || null;

// --- Interfaces ---

export interface CatePedidoLinea {
  codPiezaAlmacen: number;
  precio: number;
  precioConImpuesto: number;
  descripcion: string;
  cantidad: number;
}

export interface CatePedidoPayload {
  pedido: {
    cifEmpresa: string;
    codigoGestor: string | null;
    FechaPedido: string;
    telefono: string;
    email: string;
    nombreRazonSocial: string;
    nif: string;
    idPais: number;
    provincia: string;
    poblacion: string;
    codPostal: string;
    direccion: string;
    observaciones: string;
    numPedido: string;
    formaPago: string;
    transportista: string | null;
    precioTransporte: number;
    precioTransporteConImpuesto: number;
    porcentajeImpuesto: number;
    lineas: CatePedidoLinea[];
  };
}

// --- InsertarPedido ---

export async function insertarPedidoCate(
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
  },
  orderNumber: string,
  lineas: CatePedidoLinea[],
  observaciones: string = '',
): Promise<any> {
  const payload: CatePedidoPayload = {
    pedido: {
      cifEmpresa: CIF_EMPRESA,
      codigoGestor: CODIGO_GESTOR,
      FechaPedido: new Date().toISOString(),
      telefono: billing.phone,
      email: billing.email,
      nombreRazonSocial: `${billing.first_name} ${billing.last_name}`,
      nif: '',
      idPais: 1,
      provincia: billing.state,
      poblacion: billing.city,
      codPostal: billing.postcode,
      direccion: billing.address_1,
      observaciones,
      numPedido: orderNumber,
      formaPago: 'PAGO CON TARJETA',
      transportista: null,
      precioTransporte: 0,
      precioTransporteConImpuesto: 0,
      porcentajeImpuesto: 0,
      lineas,
    },
  };

  const res = await fetch(`${CATE_BASE}/API/V1/Pedidos/InsertarPedido`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${CATE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('InsertarPedido error:', res.status, body);
    throw new Error(`InsertarPedido ${res.status}: ${body}`);
  }

  return res.json();
}

// --- MarcarVendida ---

export async function marcarVendidaCate(idPiezaAlmacen: number): Promise<void> {
  const res = await fetch(`${CATE_BASE}/API/V2/Busqueda/GetMarcarVendida/${idPiezaAlmacen}`, {
    headers: {
      'Authorization': `Basic ${CATE_KEY}`,
    },
  });

  if (!res.ok) {
    console.error(`MarcarVendida error for ${idPiezaAlmacen}:`, res.status);
  }
}
