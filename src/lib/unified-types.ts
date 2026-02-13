// Tipos unificados para productos de ambas fuentes (CAT-e + WooCommerce)

export interface UnifiedProduct {
  id: string;                     // "cate-{id}" o "wc-{id}"
  source: 'cate' | 'woocommerce';
  sourceId: number;
  name: string;
  slug: string;
  description: string;
  price: number | null;           // Con IVA, null = "Consultar"
  priceWithoutTax: number | null;
  currency: 'EUR';
  image: string;                  // URL o data:image/png;base64,...
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number | null;

  vehicle: {
    brand: string;
    model: string | null;
    version: string | null;
    engine: string | null;
    year: number | null;
    kms: number | null;
    color: string;
  } | null;

  partInfo: {
    condition: string;
    warranty: number | null;      // Meses
    manufacturer: string;
    referenceOEM: string;
    referenceIAM: string;
    weight: number | null;
    observations: string;
  } | null;

  purchasable: boolean;           // false si no hay precio o sin stock
  detailUrl: string;
}

export interface CartItem {
  product: UnifiedProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

export interface UnifiedSearchResult {
  products: UnifiedProduct[];
  totalItems: number;
  currentPage: number;            // 0-indexed
  totalPages: number;
  itemsPerPage: number;
}
