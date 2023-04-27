const connection = require("../config/database")

exports.obtenerTodos = async (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al obtener los usuarios');
        } else {
          res.status(200).json(results);
        }
      });
};

exports.obtenerPorId = async (req, res) => {
  const id = req.params.id;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error al obtener el usuario: ', err);
        res.status(500).send('Error al obtener el usuario');
        return;
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
};

exports.crear = async (req, res) => {
    const nombre = req.body.nombre;
    const colorSable = req.body.color_sable;
    const aprendiz = req.body.aprendiz;
    const estiloBatalla = req.body.estilo_batalla;

    if (estiloBatalla < 1 || estiloBatalla > 7) {
        res.status(400).send('El estilo de batalla debe ser un valor entre 1 y 7');
        return;
    }

    connection.query('INSERT INTO usuarios (nombre, color_sable, aprendiz, estilo_batalla) VALUES (?, ?, ?, ?)', [nombre, colorSable, aprendiz, estiloBatalla], (err, results) => {
      if (err) {
        console.error('Error al crear el usuario: ', err);
        res.status(500).send('Error al crear el usuario');
        return;
      }
      res.status(201).json({id: results.insertId, mensaje: 'Usuario creado correctamente'});
    });
};

exports.actualizar = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const colorSable = req.body.color_sable;
    const aprendiz = req.body.aprendiz;
    const estiloBatalla = req.body.estilo_batalla;
    connection.query('UPDATE usuarios SET nombre = ?, color_sable = ?, aprendiz = ?, estilo_batalla = ? WHERE id = ?', [nombre, colorSable, aprendiz, estiloBatalla, id], (err, results) => {
      if (err) {
        console.error('Error al actualizar el usuario: ', err);
        res.status(500).send('Error al actualizar el usuario');
        return;
      }
      if (results.affectedRows > 0) {
        res.status(200).send('Usuario actualizado correctamente');
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
};

exports.eliminar = async (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error al eliminar el usuario: ', err);
        res.status(500).send('Error al eliminar el usuario');
        return;
      }
      if (results.affectedRows > 0) {
        res.status(200).send('Usuario eliminado correctamente');
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
};