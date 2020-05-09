// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Iniciar sesión
// api/auth
router.post('/', 
    /* Esta validación la hacemos en el cliente, pero la dejo como ejemplo de cómo se haría
       en express
    [
        check('email', 'Agrega un e-mail válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min:6 })
    ],*/
    authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;