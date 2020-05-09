const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    // Revisamos si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer email y password del request
    const { email, password } = req.body;

    try{
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({ msg: 'Password incorrecto '});
        }

        // Si todo es correcto, crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario._id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Devolvemos el token
            res.json({ token });
        });

    }catch(error){
        console.log(error);
    }
}

// Obtiene qué usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        // Con select(-password) indicamos que devuelva todo menos el password
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); 
        res.json({usuario});
    } catch (error) {
        console.log(erro);
        return res.status(500).send('Hubo un error');
    }
}