const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;


// // Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host,
  user,
  password,
  database
});

module.exports = connection;