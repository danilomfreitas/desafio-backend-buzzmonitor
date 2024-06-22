// Carregando variáveis de ambiente
require('dotenv').config()

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const livroRoute = require('./routes/livroRoute');
const pedidoRoute = require('./routes/pedidoRoute');

app.use('/livros', livroRoute);
app.use('/pedidos', pedidoRoute);

module.exports = app;
