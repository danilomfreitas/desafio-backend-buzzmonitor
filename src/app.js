// Carregando variáveis de ambiente
require('dotenv').config()

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookRoute = require('./routes/bookRoute');
const orderRoute = require('./routes/orderRoute');

app.use('/books', bookRoute);
app.use('/orders', orderRoute);

module.exports = app;
