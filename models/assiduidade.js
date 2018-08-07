const mongoose = require('mongoose');

const assiduidadeSchema = new mongoose.Schema({
  presenca: {
    type: String
  },
  contagem: {
    type: Number
  }
});

const Assiduidade = mongoose.model('assiduidades', assiduidadeSchema);

exports.Assiduidade = Assiduidade;