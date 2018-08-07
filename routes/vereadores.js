const express = require('express');
const router = express.Router();
const { Vereador } = require('../models/vereador');
const { Assiduidade } = require('../models/assiduidade');

router.get('/', async (req, res) => {
  const vereadores = await Vereador
    .aggregate([
      { $group : {_id: {vereador:"$vereador", partido:"$partido"}, count:{$sum: 1}}},
      { $sort: {_id: 1}},
      { $project: 
          {  
            _id: 0,
            vereador: "$_id.vereador",
            partido: "$_id.partido"
          }
      }
    ]);

  res.send(vereadores);
});

router.get('/assiduidades/:nome', async (req, res) => {
  const assiduidade = await Assiduidade
    .aggregate([
      {
          $match: {
              "vereadores.nome": req.params.nome
          }
      },
      {
          $unwind: '$vereadores'
      },
      {
          $match: {
              "vereadores.nome": req.params.nome
          }
      },
      {
          $project : 
          {
              _id: 0,
              nome: "$vereadores.nome",
              presenca: "$vereadores.presenca"
          }
      },
      {"$group" : {_id:"$presenca", count:{$sum: 1}}},
      {
          $project : 
          {
              _id: 0,
              presenca: "$_id",
              contagem: "$count"
          }
      }
  ]);

  res.send(assiduidade);
});

module.exports = router;