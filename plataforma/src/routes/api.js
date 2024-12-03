const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const investigationController = require('../controllers/investigationController');
const { protect, restrictTo } = require('../middleware/auth');

// Rutas de autenticación
router.post('/auth/registro', authController.registro);
router.post('/auth/login', authController.login);

// Rutas de investigaciones
router.use(protect); // Proteger todas las rutas siguientes

router.route('/investigaciones')
  .get(investigationController.obtenerInvestigaciones)
  .post(investigationController.crearInvestigacion);

router.route('/investigaciones/:id')
  .patch(investigationController.actualizarInvestigacion)
  .delete(investigationController.eliminarInvestigacion);

// Rutas administrativas
router.use(restrictTo('admin'));
// Aquí irían las rutas que solo los administradores pueden acceder

module.exports = router; 