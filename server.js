// npm i helmet cors bcrypt jsonwebtoken

// helmet -> Agrega encabezados HTTP: Ej. Conexiones seguras SSL/TLS
// cors -> Permiso para conexión entre servidores
// bcrypt -> Encriptar contraseñas
// jsonwebtoken -> Generar tokens

// ./node_modules/.bin/sequelize migration:create --name CreateTableUsers

//comando para crear las migraciones
// ./node_modules/.bin/sequelize db:migrate

const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet()); // Basic configuration for helmet
app.use(cors()) // Basic configuration for enable CORS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(3000, () => {
  console.log(`Express on port 3000`);
});