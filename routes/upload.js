const express = require('express');

const fileUpload = require('express-fileupload');
const fs = require('fs');



let app = express();

let Usuario = require('../models/usuario');
let Medico = require('../models/medico');
let Hospital = require('../models/hospital');


// default options
app.use(fileUpload());



app.put('/:tipo/:id', (req, res, next) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    //tipos de colecciones
    let tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {

        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { messge: 'Tipo de colección no es válida' }
        });

    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccionó nada',
            errors: { messge: 'Debe seleccionar una imagen' }
        });
    }

    //Obtener nombre del archivo
    let archivo = req.files.imagen;
    let nombreCortado = archivo.name.split('.');
    let extensionArchivo = nombreCortado[nombreCortado.length - 1]



    //Solo estas extenciones aceptamos
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            errors: { messge: 'Las extensiones validas son: ' + extensionesValidas.join(', ') }
        });
    }


    //Nombre de archivo personalizado
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;


    //Mover el archivo del temporal a un path
    let path = `./upload/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);

    });

});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { messge: 'Usuario no existe' }
                });
            }

            let pathViejo = './upload/usuarios/' + usuario.img;

            //Si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err) => {});
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = '......';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de Usuario actualizada',
                    usuario: usuarioActualizado
                });

            })

        });

    }

    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {

            if (!medico) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Medico no existe',
                    errors: { messge: 'Medico no existe' }
                });
            }

            let pathViejo = './upload/medicos/' + medico.img;

            //Si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err) => {});
            }

            medico.img = nombreArchivo;

            medico.save((err, medicoActualizado) => {

                medicoActualizado.password = '......';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de Medico actualizada',
                    medico: medicoActualizado
                });

            })

        });

    }

    if (tipo === 'hospitales') {

        Hospital.findById(id, (err, hospital) => {

            if (!hospital) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Hospital no existe',
                    errors: { messge: 'Hospital no existe' }
                });
            }

            let pathViejo = './upload/hospitales/' + hospital.img;

            //Si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err) => {});
            }

            hospital.img = nombreArchivo;

            hospital.save((err, hospitalActualizado) => {

                hospitalActualizado.password = '......';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de Hospital actualizada',
                    hospital: hospitalActualizado
                });

            })

        });

    }

}


module.exports = app;