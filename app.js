//Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//Inicializar variables
let app = express();



//Body parser
// parse application/x-www-form-urlencoded
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




//Importar rutas
let appRoutes = require('./routes/app');
let usuarioRoutes = require('./routes/usuario');
let loginRoutes = require('./routes/login');






// Conexión a la base de datos

mongoose.connection.openUri('mongodb://app:12345@appdatab-shard-00-01.lmrov.mongodb.net:27017/hospitalDB?ssl=true&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=atlas-dscjhz-shard-', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {

    try {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

});




//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Escuchar petición
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});