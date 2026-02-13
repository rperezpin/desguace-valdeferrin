// Cliente API CAT-e v3.7 — Azeler
// Wrapper moderno con fetch() para uso client-side

import { apiConfig } from '../data/api';
import type { CatalogItem, Pieza, Vehiculo } from './cate-types';

// --- Core ---

async function apiFetch<T>(endpoint: string): Promise<T> {
  const url = `${apiConfig.baseUrl}/API/${endpoint}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${apiConfig.apiKey}`,
    },
  });
  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// --- Catálogo (para búsqueda avanzada) ---

export function getTipos(): Promise<CatalogItem[]> {
  return apiFetch('V1/Catalogo/GetTipos/');
}

export function getSubTipos(tipoId: number): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetSubTipos/${tipoId}`);
}

export function getMarcas(subtipoId: number): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetMarcas/${subtipoId}`);
}

export function getModelos(codMarca: string): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetModelos/${codMarca}`);
}

export function getVersiones(codMarca: string, codModelo: string): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetVersiones/${codMarca}/${codModelo}`);
}

export function getGrupos(subtipoId: number): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetGrupos/${subtipoId}`);
}

export function getPiezasCatalogo(subtipoId: number, grupoId: string): Promise<CatalogItem[]> {
  return apiFetch(`V1/Catalogo/GetPiezas/${subtipoId}/${grupoId}`);
}

// --- Búsqueda de piezas (rápida por texto) ---

export function getNumPiezas(text: string): Promise<number> {
  return apiFetch(`V2/Busqueda/GetNumPiezas/${encodeURIComponent(text)}`);
}

export function getPiezas(text: string, page: number, count: number): Promise<Pieza[]> {
  return apiFetch(`V2/Busqueda/GetPiezas/${encodeURIComponent(text)}/${page}/${count}`);
}

// --- Búsqueda por referencia OEM/IAM ---

export function getNumPiezasRef(ref: string): Promise<number> {
  return apiFetch(`V2/Busqueda/GetNumPiezasRef/${encodeURIComponent(ref)}`);
}

export function getPiezasRef(ref: string, page: number, count: number): Promise<Pieza[]> {
  return apiFetch(`V2/Busqueda/GetPiezasRef/${encodeURIComponent(ref)}/${page}/${count}`);
}

// --- Búsqueda avanzada de piezas ---

export function getNumPiezasAvanzada(
  tipo: string, marca: string, modelo: string, version: string, pieza: string
): Promise<number> {
  return apiFetch(`V2/Busqueda/GetNumPiezas/${tipo}/${marca}/${modelo}/${version}/${pieza}`);
}

export function getPiezasAvanzada(
  tipo: string, marca: string, modelo: string, version: string, pieza: string,
  page: number, count: number
): Promise<Pieza[]> {
  return apiFetch(`V2/Busqueda/GetPiezas/${tipo}/${marca}/${modelo}/${version}/${pieza}/${page}/${count}`);
}

// --- Búsqueda avanzada equivalentes ---

export function getNumPiezasEquiv(
  tipo: string, marca: string, modelo: string, version: string, pieza: string
): Promise<number> {
  return apiFetch(`V2/Busqueda/GetNumPiezasEquiv/${tipo}/${marca}/${modelo}/${version}/${pieza}`);
}

export function getPiezasEquiv(
  tipo: string, marca: string, modelo: string, version: string, pieza: string,
  page: number, count: number
): Promise<Pieza[]> {
  return apiFetch(`V2/Busqueda/GetPiezasEquiv/${tipo}/${marca}/${modelo}/${version}/${pieza}/${page}/${count}`);
}

// --- Detalle de pieza ---

export function getPieza(id: number): Promise<Pieza> {
  return apiFetch(`V2/Busqueda/GetPieza/${id}`);
}

// --- Vehículos (búsqueda rápida) ---

export function getNumVehiculos(text: string): Promise<number> {
  return apiFetch(`V1/Vehiculos/GetNumVehiculos/${encodeURIComponent(text)}`);
}

export function getVehiculos(text: string, page: number, count: number): Promise<Vehiculo[]> {
  return apiFetch(`V1/Vehiculos/GetVehiculos/${encodeURIComponent(text)}/${page}/${count}`);
}

// --- Vehículos (búsqueda avanzada) ---

export function getNumVehiculosAvanzada(
  tipo: string, marca: string, modelo: string, version: string, motor: string
): Promise<number> {
  return apiFetch(`V1/Vehiculos/GetNumVehiculos/${tipo}/${marca}/${modelo}/${version}/${motor}`);
}

export function getVehiculosAvanzada(
  tipo: string, marca: string, modelo: string, version: string, motor: string,
  page: number, count: number
): Promise<Vehiculo[]> {
  return apiFetch(`V1/Vehiculos/GetVehiculos/${tipo}/${marca}/${modelo}/${version}/${motor}/${page}/${count}`);
}

// --- Detalle de vehículo ---

export function getVehiculo(id: number): Promise<Vehiculo> {
  return apiFetch(`V2/Vehiculos/GetVehiculo/${id}`);
}
