const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientesRoutes = require('./routes/clientes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);

module.exports = app;
