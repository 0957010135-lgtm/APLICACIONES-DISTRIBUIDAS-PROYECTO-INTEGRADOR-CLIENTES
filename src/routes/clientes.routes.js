const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const controller = require('../controllers/clientes.controller');

router.get('/', auth, controller.getClientes);
router.get('/:id', auth, controller.getClienteById);
router.post('/', auth, controller.createCliente);
router.put('/:id', auth, controller.updateCliente);
router.delete('/:id', auth, controller.deleteCliente);

module.exports = router;
