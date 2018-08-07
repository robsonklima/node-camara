const express = require('express');
const router = express.Router();
const { Sessao, validate } = require('../models/sessao');

router.get('/', async (req, res) => {
  const sessoes = await Sessao
    .aggregate([
      {
        $unwind: '$proposicao'
      },
      {
        $project : 
        {
          _id: 1,
          proposicao: "$proposicao"
        }
      },
      {
        $limit: 50
      }
  ]);
  res.send(sessoes);
});

router.get('/:id', async (req, res) => {
  const sessao = await Sessao.findById(req.params.id);

  res.send(sessao);
});

module.exports = router;