const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea proyectos
// api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Obtiene todos los proyectos de un usuario
// api/proyectos
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

// Actualizar proyecto vía id
// api/proyectos
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// Eliminar un proyecto
// api/proyectos
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;