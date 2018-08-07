const express = require('express');
const error = require('../middleware/error');
const sessoes = require('../routes/sessoes');
const usuarios = require('../routes/usuarios');
const auth = require('../routes/auth');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/sessoes', sessoes);
  app.use('/api/usuarios', usuarios);
  app.use('/api/auth', auth);
  app.use(error);
}