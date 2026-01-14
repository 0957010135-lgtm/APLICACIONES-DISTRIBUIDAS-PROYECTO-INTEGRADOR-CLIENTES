const db = require('../config/db');

/* ======================
   GET - LISTAR TODOS
   ====================== */
exports.getClientes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
   GET - POR ID
   ====================== */
exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM clientes WHERE id_cliente = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
   POST - CREAR CLIENTE
   ====================== */
exports.createCliente = async (req, res) => {
  try {
    const {
      cedula,
      apellidos,
      nombres,
      nacionalidad,
      fecha_nacimiento,
      lugar_nacimiento,
      sexo,
      estado_civil,
      telefono,
      email,
      direccion
    } = req.body;

    if (!cedula || !apellidos || !nombres) {
      return res.status(400).json({
        message: 'Campos obligatorios faltantes'
      });
    }

    const [result] = await db.query(
      `INSERT INTO clientes
       (cedula, apellidos, nombres, nacionalidad, fecha_nacimiento,
        lugar_nacimiento, sexo, estado_civil, telefono, email, direccion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cedula,
        apellidos,
        nombres,
        nacionalidad,
        fecha_nacimiento,
        lugar_nacimiento,
        sexo,
        estado_civil,
        telefono,
        email,
        direccion
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        message: 'No se pudo crear el cliente'
      });
    }

    res.status(201).json({
      message: 'Cliente creado correctamente',
      id_cliente: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
   PUT - ACTUALIZAR
   ====================== */
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { apellidos, nombres, telefono, email, direccion } = req.body;

    const [result] = await db.query(
      `UPDATE clientes
       SET apellidos = ?, nombres = ?, telefono = ?, email = ?, direccion = ?
       WHERE id_cliente = ?`,
      [apellidos, nombres, telefono, email, direccion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
   DELETE - ELIMINAR
   ====================== */
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
