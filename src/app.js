// Carregando variáveis de ambiente
require('dotenv').config()

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const livroRoute = require('./routes/livroRoute');

app.use('/livros', livroRoute);

module.exports = app;
