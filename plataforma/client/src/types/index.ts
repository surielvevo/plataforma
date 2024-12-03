export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'investigador' | 'admin';
  departamento: string;
}

export interface Investigation {
  _id: string;
  titulo: string;
  descripcion: string;
  investigador: User;
  estado: 'planificacion' | 'en_proceso' | 'completado' | 'cancelado';
  fechaInicio: Date;
  fechaFin: Date;
  progreso: number;
  area: string;
  metodologia: string;
  resultadosEsperados: string;
  presupuesto: PresupuestoItem[];
  avances: Avance[];
}

export interface PresupuestoItem {
  _id: string;
  categoria: string;
  monto: number;
  ejecutado: number;
  descripcion?: string;
  gastos: Gasto[];
}

export interface Gasto {
  monto: number;
  descripcion: string;
  fecha: Date;
  comprobante?: string;
}

export interface Avance {
  descripcion: string;
  porcentaje: number;
  fecha: Date;
  evidencias: Evidencia[];
}

export interface Evidencia {
  titulo: string;
  url: string;
  tipo: string;
} 