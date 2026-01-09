const Contactos = require('../models/contactosModel');

const contactosController = {
    getAllByCliente: async (req, res, next) => {
        try {
            const contactos = await Contactos.getAllByClienteId(req.params.clienteId);
            res.json(contactos);
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const id = await Contactos.create(req.body);
            res.status(201).json({ message: 'Contacto creado', id });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            await Contactos.update(req.params.id, req.body);
            res.json({ message: 'Contacto actualizado' });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Contactos.delete(req.params.id);
            res.json({ message: 'Contacto eliminado' });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = contactosController;
