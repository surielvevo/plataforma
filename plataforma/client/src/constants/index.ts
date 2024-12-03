export const ESTADOS_INVESTIGACION = {
  PLANIFICACION: 'planificacion',
  EN_PROCESO: 'en_proceso',
  COMPLETADO: 'completado',
  CANCELADO: 'cancelado'
} as const;

export const CATEGORIAS_PRESUPUESTO = {
  HONORARIOS: 'honorarios',
  MATERIALES: 'materiales',
  TRANSPORTE: 'transporte',
  EQUIPOS: 'equipos',
  OTROS: 'otros'
} as const;

export const ROLES = {
  ADMIN: 'admin',
  INVESTIGADOR: 'investigador'
} as const; 