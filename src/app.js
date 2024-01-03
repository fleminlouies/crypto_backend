const express = require('express');
const cors = require('cors');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/crypto', cryptoRoutes);

module.exports = app;
