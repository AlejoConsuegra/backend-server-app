const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let hospitalSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, requiered: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }

}, { collection: 'hospitales' });

module.exports = mongoose.model('Hospital', hospitalSchema);