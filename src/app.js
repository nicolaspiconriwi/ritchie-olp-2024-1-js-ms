require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { unleashHTMLWelcome } = require('./helpers/unleash-welcome-a-la-nico');
const router = require('./routes/router');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', unleashHTMLWelcome);
app.use('/api', router);

module.exports = app;
