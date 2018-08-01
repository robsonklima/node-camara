const express = require('express');
const router = express.Router();
const { Sessao, validate } = require('../models/sessao');

router.get('/', async (req, res) => {
  const sessoes = await Sessao.find().select();
  res.send(sessoes);
});

module.exports = router;