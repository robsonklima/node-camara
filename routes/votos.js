const express = require('express');
const router = express.Router();
const { Voto, validate } = require('../models/voto');
const validateObjectId = require('../middleware/validObjectId')

router.get('/', async (req, res) => {
  const votos = await Voto.find().select('-__v');
  res.send(votos);
});

router.get('/:sessao', async (req, res) => {
  const votos = await Voto.find({"sessao" : {$regex : ".*" + req.params.sessao + ".*"}}).select('-__v');
  res.send(votos);
});

module.exports = router;