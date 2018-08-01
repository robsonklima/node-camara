const mongoose = require('mongoose');
const Joi = require('joi');

const votoSchema = new mongoose.Schema({
  vereador: {
    type: String,
    required: true
  },
  partido: {
    type: String,
    required: true
  },
  sessao: {
    type: String,
    required: true
  },
  voto: {
    type: String,
    required: true
  },
});

const Voto = mongoose.model('votos', votoSchema);

function validateVote(voto) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(voto, schema);
}

exports.Voto = Voto;
exports.validate = validateVote;