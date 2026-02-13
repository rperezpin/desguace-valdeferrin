// Funciones que normalizan productos de CAT-e y WooCommerce al formato unificado

import type { Pieza } from './cate-types';
import type { WcProduct } from './wc-api';
import type { UnifiedProduct } from './unified-types';

/**
 * Normaliza una pieza CAT-e al formato UnifiedProduct
 */
export function normalizeCatePieza(p: Pieza): UnifiedProduct {
  const hasPrice = p.ImporteIVA != null && p.ImporteIVA > 0;
  const firstImage = p.Fotos && p.Fotos.length > 0
    ? `data:image/png;base64,${p.Fotos[0]}`
    : '/images/placeholder-pieza.svg';
  const allImages = p.Fotos && p.Fotos.length > 0
    ? p.Fotos.map(f => `data:image/png;base64,${f}`)
    : ['/images/placeholder-pieza.svg'];

  return {
    id: `cate-${p.IdPiezaAlmacen}`,
    source: 'cate',
    sourceId: p.IdPiezaAlmacen,
    name: p.Pieza,
    slug: `cate-${p.IdPiezaAlmacen}`,
    description: p.Observaciones || '',
    price: p.ImporteIVA,
    priceWithoutTax: p.Importe,
    currency: 'EUR',
    image: firstImage,
    images: allImages,
    category: [p.Marca, p.Modelo].filter(Boolean).join(' '),
    inStock: p.Cantidad > 0,
    stockQuantity: p.Cantidad,
    vehicle: {
      brand: p.Marca,
      model: p.Modelo,
      version: p.Version,
      engine: p.Motor,
      year: p.Anio,
      kms: p.Kms,
      color: p.Color,
    },
    partInfo: {
      condition: p.EstadoFisico,
      warranty: p.Garantia,
      manufacturer: p.Fabricante,
      referenceOEM: p.ReferenciaOEM,
      referenceIAM: p.ReferenciaIAM,
      weight: p.Peso,
      observations: p.Observaciones,
    },
    purchasable: hasPrice && p.Cantidad > 0,
    detailUrl: `/recambios/pieza?id=${p.IdPiezaAlmacen}&source=cate`,
  };
}

/**
 * Normaliza un producto WooCommerce al formato UnifiedProduct
 */
export function normalizeWcProduct(p: WcProduct): UnifiedProduct {
  const price = p.price ? parseFloat(p.price) : null;
  const priceWithoutTax = price ? +(price / 1.21).toFixed(2) : null;

  const firstImage = p.images.length > 0
    ? p.images[0].src
    : '/images/placeholder-pieza.svg';
  const allImages = p.images.length > 0
    ? p.images.map(img => img.src)
    : ['/images/placeholder-pieza.svg'];

  const getMeta = (key: string) => p.meta_data?.find(m => m.key === key)?.value || null;
  const getAttr = (name: string) => p.attributes?.find(a => a.name === name)?.options[0] || null;

  const vehicleBrand = getMeta('_vehicle_brand') || getAttr('Marca') || '';
  const hasVehicleInfo = !!vehicleBrand;

  return {
    id: `wc-${p.id}`,
    source: 'woocommerce',
    sourceId: p.id,
    name: p.name,
    slug: p.slug,
    description: p.short_description || p.description,
    price,
    priceWithoutTax,
    currency: 'EUR',
    image: firstImage,
    images: allImages,
    category: p.categories?.map(c => c.name).join(', ') || 'General',
    inStock: p.stock_status === 'instock',
    stockQuantity: p.stock_quantity,
    vehicle: hasVehicleInfo ? {
      brand: vehicleBrand,
      model: getMeta('_vehicle_model') || getAttr('Modelo'),
      version: getMeta('_vehicle_version') || getAttr('Version'),
      engine: getMeta('_vehicle_engine') || getAttr('Motor'),
      year: getMeta('_vehicle_year') ? parseInt(getMeta('_vehicle_year')!) : null,
      kms: null,
      color: '',
    } : null,
    partInfo: p.sku ? {
      condition: getAttr('Estado') || 'Nuevo',
      warranty: getMeta('_warranty_months') ? parseInt(getMeta('_warranty_months')!) : null,
      manufacturer: getAttr('Fabricante') || '',
      referenceOEM: p.sku,
      referenceIAM: '',
      weight: p.weight ? parseFloat(p.weight) : null,
      observations: '',
    } : null,
    purchasable: price != null && price > 0 && p.stock_status === 'instock',
    detailUrl: `/recambios/pieza?id=${p.id}&source=wc`,
  };
}
