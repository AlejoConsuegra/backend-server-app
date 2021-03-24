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
let hospitalRoutes = require('./routes/hospital');
let medicoRoutes = require('./routes/medico');
let busquedaRoutes = require('./routes/busqueda');
let uploadRoutes = require('./routes/upload');
let imagenesRoutes = require('./routes/imagenes');
// const db = 'mongodb://app:zdNSgaJvP39bY21a@appdatab-shard-00-01.lmrov.mongodb.net:27017/hospitalDB?ssl=true&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=atlas-dscjhz-shard-';

// Conexión a la base de datos

// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));




mongoose.connection.openUri('mongodb://app1:M3KpgWSGFtdOHJ1q@appdatab-shard-00-02.lmrov.mongodb.net:27017/hospitalDB?ssl=true&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    try {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la base de datos');
    }




});



//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);

//Escuchar petición
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});