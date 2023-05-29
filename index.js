const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//crear servidor express
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto ${process.env.PORT}`);
});
