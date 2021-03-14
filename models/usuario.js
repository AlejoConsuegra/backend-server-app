const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};


let usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, requiered: [true, 'El correo es necesario'] },
    password: { type: String, requiered: [true, 'La contraseña es necesario'] },
    img: { type: String, requiered: false },
    role: { type: String, requiered: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);