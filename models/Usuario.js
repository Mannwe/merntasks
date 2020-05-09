const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true // Con esta instrucción, mongodb eliminará espacios al principio y al final a la hora de insertar el campo
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);