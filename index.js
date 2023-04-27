const express = require('express');
const app = express();
const port = 3005;
const usuariosRouter = require('./routes/usuarios');
const connection = require("./config/database")

app.use(express.json());

// Conexión a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error al conectarse a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos con ID: ' + connection.threadId);
});

// Configuración de rutas en Express
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi servidor!');
});

app.use('/usuarios', usuariosRouter);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});