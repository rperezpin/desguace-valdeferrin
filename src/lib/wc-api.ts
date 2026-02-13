// Cliente WooCommerce REST API v3 — server-side only
// No importar en <script> tags ni en codigo client-side

// --- Interfaces ---

export interface WcProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  meta_data: { key: string; value: string }[];
  weight: string;
  manage_stock: boolean;
}

export interface WcCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  image: { src: string; alt: string } | null;
}

export interface WcOrderLineItem {
  product_id: number;
  quantity: number;
  meta_data?: { key: string; value: string }[];
}

export interface WcCreateOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: WcOrderLineItem[];
}

export interface WcOrder {
  id: number;
  number: string;
  status: string;
  total: string;
  payment_url: string;
  order_key: string;
  line_items: {
    id: number;
    name: string;
    quantity: number;
    total: string;
    price: number;
    image: { src: string };
  }[];
  billing: WcCreateOrderPayload['billing'];
  shipping: WcCreateOrderPayload['shipping'];
}

// --- Config ---

function getConfig() {
  return {
    storeUrl: import.meta.env.WC_STORE_URL,
    consumerKey: import.meta.env.WC_CONSUMER_KEY,
    consumerSecret: import.meta.env.WC_CONSUMER_SECRET,
  };
}

// --- Fetch wrapper ---

async function wcFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const config = getConfig();
  const url = new URL(`/wp-json/wc/v3/${endpoint}`, config.storeUrl);
  const auth = btoa(`${config.consumerKey}:${config.consumerSecret}`);

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WC API ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

// --- Productos ---

export interface WcProductListParams {
  page?: number;       // 1-indexed (WC convention)
  per_page?: number;
  search?: string;
  category?: number;
  status?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
}

export async function getWcProducts(params: WcProductListParams = {}): Promise<{
  products: WcProduct[];
  totalItems: number;
  totalPages: number;
}> {
  const config = getConfig();
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.per_page) searchParams.set('per_page', String(params.per_page));
  if (params.search) searchParams.set('search', params.search);
  if (params.category) searchParams.set('category', String(params.category));
  searchParams.set('status', params.status || 'publish');

  const queryStr = searchParams.toString();
  const url = new URL(`/wp-json/wc/v3/products${queryStr ? `?${queryStr}` : ''}`, config.storeUrl);
  const auth = btoa(`${config.consumerKey}:${config.consumerSecret}`);

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`WC API ${res.status}`);
  }

  const products = (await res.json()) as WcProduct[];
  const totalItems = parseInt(res.headers.get('X-WP-Total') || '0');
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0');

  return { products, totalItems, totalPages };
}

export async function getWcProduct(id: number): Promise<WcProduct> {
  return wcFetch<WcProduct>(`products/${id}`);
}

export async function getWcProductBySlug(slug: string): Promise<WcProduct | null> {
  const products = await wcFetch<WcProduct[]>(`products?slug=${encodeURIComponent(slug)}`);
  return products[0] || null;
}

// --- Categorias ---

export async function getWcCategories(): Promise<WcCategory[]> {
  return wcFetch<WcCategory[]>('products/categories?per_page=100&hide_empty=true');
}

// --- Pedidos ---

export async function createWcOrder(payload: WcCreateOrderPayload): Promise<WcOrder> {
  return wcFetch<WcOrder>('orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getWcOrder(id: number): Promise<WcOrder> {
  return wcFetch<WcOrder>(`orders/${id}`);
}
