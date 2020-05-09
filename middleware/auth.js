const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'});
    }

    // Validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario; // Porque en el payload del cifrado le hemos incluido un json con usuario y de valor el id
        next(); // Para que vaya al siguiente middleware
    }catch(error){
        return res.status(401).json({msg: 'Token no válido'})
    }
}