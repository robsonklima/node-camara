const express = require('express');
const router = express.Router();
const { Sessao, validate } = require('../models/sessao');

router.get('/', async (req, res) => {
  const sessoes = await Sessao
    .aggregate([
        {
            $unwind: '$proposicao',
            $unwind: '$categorias'
        },
        {
        $project: {
                proposicao: "$proposicao",
                categorias: ["$categorias"]
            }
        },
        {
            $sort: {proposicao: 1}    
        },
        {
            $limit: 60
        }
    ]);
  
    res.send(sessoes);
});

router.get('/vereadores', async (req, res) => {
  const sessoes = await Sessao
    .aggregate([
      {
        $unwind: '$votos'
      },
      { $group : {_id: {vereador:"$votos.vereador", partido:"$votos.partido"}}},
      { $sort: {_id: 1}},
      { $project: 
          {  
            _id: 0,
            vereador: "$_id.vereador",
            partido: "$_id.partido"
          }
      }
    ]);
  res.send(sessoes);
});

router.get('/comparecimentos/:vereador', async (req, res) => {
  const comparecimento = await Sessao
    .aggregate([
      {
          $match: {
              "comparecimento.vereador": req.params.vereador
          }
      },
      {
          $unwind: '$comparecimento'
      },
      {
          $match: {
              "comparecimento.vereador": req.params.vereador
          }
      },
      {
          $project : 
          {
              _id: 0,
              nome: "$comparecimento.vereador",
              presenca: "$comparecimento.presenca"
          }
      },
      {"$group" : {_id:"$presenca", count: {$sum: 1}}},
      {
          $project : 
          {
              _id: 0,
              presenca: "$_id",
              contagem: "$count"
          }
      }
    ]);

  res.send(comparecimento);
});

router.get('/tendencias/:vereador', async (req, res) => {
  const tendencia = await Sessao
    .aggregate([
      {
          $match: {
              "votos": { $elemMatch: { "vereador": req.params.vereador, "voto": "Sim" }},
              "categorias.nome":{$exists:true}
          },
      },
      {
          $group: {
              _id: "$categorias.nome",
              contagem: {$sum: 1}
          }
      },
      {
          $sort: {
              contagem: -1
          },
      },
      {
          $project: {
              _id: 0,
              categorias: "$_id",
              contagem: "$contagem"
          }
      }
    ]);

  res.send(tendencia);
});

router.get('/:id', async (req, res) => {
  const sessao = await Sessao.findById(req.params.id);

  res.send(sessao);
});

module.exports = router;