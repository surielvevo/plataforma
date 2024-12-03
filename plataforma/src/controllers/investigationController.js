const Investigation = require('../models/Investigation');

exports.crearInvestigacion = async (req, res) => {
  try {
    const investigacion = await Investigation.create({
      ...req.body,
      investigador: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: {
        investigacion
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.obtenerInvestigaciones = async (req, res) => {
  try {
    const investigaciones = await Investigation.find({
      investigador: req.user._id
    }).populate('investigador', 'nombre email');

    res.status(200).json({
      status: 'success',
      results: investigaciones.length,
      data: {
        investigaciones
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.actualizarInvestigacion = async (req, res) => {
  try {
    const investigacion = await Investigation.findOneAndUpdate(
      {
        _id: req.params.id,
        investigador: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!investigacion) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontró la investigación'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        investigacion
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.eliminarInvestigacion = async (req, res) => {
  try {
    const investigacion = await Investigation.findOneAndDelete({
      _id: req.params.id,
      investigador: req.user._id
    });

    if (!investigacion) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontró la investigación'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 