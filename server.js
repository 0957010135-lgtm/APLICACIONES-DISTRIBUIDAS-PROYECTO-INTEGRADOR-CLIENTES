const express = require('express');
const dotenv = require('dotenv');
const clientesRoutes = require('./routes/clientesRoutes');
const contactosRoutes = require('./routes/contactosRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/contactos', contactosRoutes);

// Manejo simple de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
