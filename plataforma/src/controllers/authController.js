const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

exports.registro = async (req, res) => {
  try {
    const { nombre, email, password, departamento } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        status: 'error',
        message: 'El email ya está registrado'
      });
    }

    // Crear nuevo usuario
    const usuario = await User.create({
      nombre,
      email,
      password,
      departamento
    });

    // Generar token
    const token = signToken(usuario._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          departamento: usuario.departamento
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si se proporcionó email y password
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Por favor proporcione email y contraseña'
      });
    }

    // Buscar usuario y verificar contraseña
    const usuario = await User.findOne({ email }).select('+password');
    if (!usuario || !(await usuario.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Email o contraseña incorrectos'
      });
    }

    // Generar token
    const token = signToken(usuario._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          departamento: usuario.departamento
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 