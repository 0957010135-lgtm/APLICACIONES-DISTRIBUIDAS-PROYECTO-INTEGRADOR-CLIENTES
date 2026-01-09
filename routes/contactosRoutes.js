const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosController');

// contactos por cliente
router.get('/:clienteId', contactosController.getAllByCliente);
router.post('/', contactosController.create);
router.put('/:id', contactosController.update);
router.delete('/:id', contactosController.delete);

module.exports = router;
