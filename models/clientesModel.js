const db = require('../config/db');

const Clientes = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM clientes');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        return rows[0];
    },

    create: async (cliente) => {
        const { tipo_identificacion, numero_identificacion, apellidos, nombres, nacionalidad, fecha_nacimiento, lugar_nacimiento, sexo, estado_civil } = cliente;
        const [result] = await db.query(
            `INSERT INTO clientes 
            (tipo_identificacion, numero_identificacion, apellidos, nombres, nacionalidad, fecha_nacimiento, lugar_nacimiento, sexo, estado_civil)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [tipo_identificacion, numero_identificacion, apellidos, nombres, nacionalidad, fecha_nacimiento, lugar_nacimiento, sexo, estado_civil]
        );
        return result.insertId;
    },

    update: async (id, cliente) => {
        const { tipo_identificacion, numero_identificacion, apellidos, nombres, nacionalidad, fecha_nacimiento, lugar_nacimiento, sexo, estado_civil } = cliente;
        await db.query(
            `UPDATE clientes SET tipo_identificacion=?, numero_identificacion=?, apellidos=?, nombres=?, nacionalidad=?, fecha_nacimiento=?, lugar_nacimiento=?, sexo=?, estado_civil=? WHERE id_cliente=?`,
            [tipo_identificacion, numero_identificacion, apellidos, nombres, nacionalidad, fecha_nacimiento, lugar_nacimiento, sexo, estado_civil, id]
        );
    },

    delete: async (id) => {
        await db.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    }
};

module.exports = Clientes;
