const db = require('../config/db');

const Contactos = {
    getAllByClienteId: async (clienteId) => {
        const [rows] = await db.query('SELECT * FROM contactos WHERE id_cliente = ?', [clienteId]);
        return rows;
    },

    create: async (contacto) => {
        const { id_cliente, tipo_contacto, valor } = contacto;
        const [result] = await db.query(
            'INSERT INTO contactos (id_cliente, tipo_contacto, valor) VALUES (?, ?, ?)',
            [id_cliente, tipo_contacto, valor]
        );
        return result.insertId;
    },

    update: async (id, contacto) => {
        const { tipo_contacto, valor } = contacto;
        await db.query(
            'UPDATE contactos SET tipo_contacto=?, valor=? WHERE id_contacto=?',
            [tipo_contacto, valor, id]
        );
    },

    delete: async (id) => {
        await db.query('DELETE FROM contactos WHERE id_contacto=?', [id]);
    }
};

module.exports = Contactos;
