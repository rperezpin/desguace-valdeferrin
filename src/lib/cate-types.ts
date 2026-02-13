// Tipos de datos de la API CAT-e v3.7

export interface CatalogItem {
  CodTipoVehiculo?: number;
  CodMarca?: string;
  CodModelo?: string;
  CodVersion?: string;
  CodMotor?: string;
  CodGrupoMontaje?: string;
  CodPieza?: string;
  Descripcion: string;
}

export interface Pieza {
  IdPiezaAlmacen: number;
  Pieza: string;
  Cantidad: number;
  Importe: number | null;
  ImporteIVA: number | null;
  ImporteAlmacen: number | null;
  ImporteAlmacenIVA: number | null;
  Tipo: string;
  Marca: string;
  Modelo: string | null;
  Version: string | null;
  Motor: string | null;
  Anio: number | null;
  Kms: number | null;
  Color: string;
  EstadoFisico: string;
  Garantia: number | null;
  Fabricante: string;
  ReferenciaOEM: string;
  ReferenciaIAM: string;
  Observaciones: string;
  Fotos: string[] | null;
  Peso: number | null;
  IdVehiculo?: number;
}

export interface Vehiculo {
  IdPiezaAlmacen: number;
  IdEmpresa: number;
  Bastidor: string;
  Matricula: string;
  FechaMatriculacion: string | null;
  Precio: number;
  Tipo: string;
  Marca: string;
  Modelo: string | null;
  Version: string | null;
  Motor: string | null;
  Carroceria: string | null;
  Combustible: string | null;
  Kms: number | null;
  Color: string;
  Estado: string;
  Observaciones: string;
  Fotos: string[] | null;
  Cambio?: string | null;
}
