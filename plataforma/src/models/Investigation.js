const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  comprobante: {
    type: String // URL del documento escaneado
  }
});

const presupuestoSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  ejecutado: {
    type: Number,
    default: 0
  },
  gastos: [gastoSchema]
});

const avanceSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true
  },
  porcentaje: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  evidencias: [{
    titulo: String,
    url: String,
    tipo: String
  }]
});

const investigationSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  investigador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coInvestigadores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  estado: {
    type: String,
    enum: ['planificacion', 'en_proceso', 'completado', 'cancelado'],
    default: 'planificacion'
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  presupuesto: [presupuestoSchema],
  avances: [avanceSchema],
  progreso: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  documentos: [{
    nombre: String,
    url: String,
    tipo: String,
    fechaSubida: Date
  }],
  area: {
    type: String,
    required: true
  },
  palabrasClave: [String],
  metodologia: {
    type: String,
    required: true
  },
  resultadosEsperados: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Middleware para actualizar el progreso automáticamente
investigationSchema.pre('save', function(next) {
  if (this.avances.length > 0) {
    const ultimoAvance = this.avances[this.avances.length - 1];
    this.progreso = ultimoAvance.porcentaje;
  }
  next();
});

module.exports = mongoose.model('Investigation', investigationSchema); 