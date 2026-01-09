const Clientes = require('../models/clientesModel');
const Contactos = require('../models/contactosModel');

const clientesController = {
    getAll: async (req, res, next) => {
        try {
            const clientes = await Clientes.getAll();
            res.json(clientes);
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const cliente = await Clientes.getById(req.params.id);
            if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
            // traer contactos
            const contactos = await Contactos.getAllByClienteId(cliente.id_cliente);
            res.json({ ...cliente, contactos });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const id = await Clientes.create(req.body);
            // crear contactos si vienen
            if (req.body.contactos && Array.isArray(req.body.contactos)) {
                for (const c of req.body.contactos) {
                    await Contactos.create({ ...c, id_cliente: id });
                }
            }
            res.status(201).json({ message: 'Cliente creado', id });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            await Clientes.update(req.params.id, req.body);
            res.json({ message: 'Cliente actualizado' });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Clientes.delete(req.params.id);
            res.json({ message: 'Cliente eliminado' });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = clientesController;
