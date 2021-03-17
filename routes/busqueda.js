const express = require('express');

let app = express();

let Hospital = require('../models/hospital');
let Medico = require('../models/medico');
let Usuario = require('../models/usuario');


// ========================================
// Busqueda Colección
// =========================================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    let busqueda = req.params.busqueda;
    let tabla = req.params.tabla;
    let regexp = new RegExp(busqueda, 'i');

    let promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regexp);
            break;

        case 'medicos':
            promesa = buscarMedicos(busqueda, regexp);
            break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regexp);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda son: usuarios, medicos y hospitales',
                error: { message: 'Tipo de tabla/coleccion no valido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    });

});



// ========================================
// Busqueda General
// =========================================
app.get('/todo/:busqueda', (req, res, next) => {

    let busqueda = req.params.busqueda;
    let regexp = new RegExp(busqueda, 'i');

    Promise.all([
            buscarHospitales(busqueda, regexp),
            buscarMedicos(busqueda, regexp),
            buscarUsuarios(busqueda, regexp)

        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            });

        })

});

function buscarHospitales(busqueda, regexp) {


    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regexp })
            .populate('usuario', 'nombre email')
            .exec((err, hospitales) => {

                if (err) {
                    reject('Error al cargar hospitales', err);
                } else {
                    resolve(hospitales)
                }

            });

    });

}

function buscarMedicos(busqueda, regexp) {


    return new Promise((resolve, reject) => {

        Medico.find({ nombre: regexp })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((err, medicos) => {

                if (err) {
                    reject('Error al cargar medicos', err);
                } else {
                    resolve(medicos)
                }

            });

    });

}

function buscarUsuarios(busqueda, regexp) {


    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role')
            .or([{ 'nombre': regexp }, { 'email': regexp }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            })
    });

}

module.exports = app;