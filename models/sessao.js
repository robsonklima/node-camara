const mongoose = require('mongoose');
const Joi = require('joi');

const sessaoSchema = new mongoose.Schema({
  ementa: {
    type: String,
    required: true
  },
  horarioInicio: {
    type: String
  },
  proposicao: {
    type: String
  },
  sessao: {
    type: String
  },
  resultado: {
    type: String
  },
  autoria: {
    type: String
  },
  abstencoes: {
    type: String
  },
  horarioTermino: {
    type: String
  },
  nao: {
    type: String
  },
  sim: {
    type: String
  }
});

const Sessao = mongoose.model('sessoes', sessaoSchema);

function validateSessao(sessao) {
  const schema = {
    ementa: Joi.string().required()
  };

  return Joi.validate(sessao, schema);
}

exports.Sessao = Sessao;
exports.validate = validateSessao;