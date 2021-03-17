const express = require('express');

let app = express();

const path = require('path');
const fs = require('fs');

app.get('/:tipo/:img', (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImage = path.resolve(__dirname, `../upload/${tipo}/${img}`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImage);
    }

});

module.exports = app;