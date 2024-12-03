const Investigation = require('../models/Investigation');

exports.actualizarPresupuesto = async (req, res) => {
  try {
    const { investigacionId } = req.params;
    const { categoria, monto, descripcion } = req.body;

    const investigacion = await Investigation.findOne({
      _id: investigacionId,
      investigador: req.user._id
    });

    if (!investigacion) {
      return res.status(404).json({
        status: 'error',
        message: 'Investigación no encontrada'
      });
    }

    // Agregar nueva partida presupuestaria
    investigacion.presupuesto.push({
      categoria,
      monto,
      descripcion,
      ejecutado: 0
    });

    await investigacion.save();

    res.status(200).json({
      status: 'success',
      data: {
        presupuesto: investigacion.presupuesto
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.registrarGasto = async (req, res) => {
  try {
    const { investigacionId, presupuestoId } = req.params;
    const { monto, descripcion, fecha } = req.body;

    const investigacion = await Investigation.findOne({
      _id: investigacionId,
      investigador: req.user._id
    });

    if (!investigacion) {
      return res.status(404).json({
        status: 'error',
        message: 'Investigación no encontrada'
      });
    }

    const partida = investigacion.presupuesto.id(presupuestoId);
    if (!partida) {
      return res.status(404).json({
        status: 'error',
        message: 'Partida presupuestaria no encontrada'
      });
    }

    // Verificar si hay suficiente presupuesto
    if (partida.ejecutado + monto > partida.monto) {
      return res.status(400).json({
        status: 'error',
        message: 'El gasto excede el presupuesto disponible'
      });
    }

    // Registrar el gasto
    partida.ejecutado += monto;
    partida.gastos.push({
      monto,
      descripcion,
      fecha: fecha || new Date()
    });

    await investigacion.save();

    res.status(200).json({
      status: 'success',
      data: {
        partida
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 