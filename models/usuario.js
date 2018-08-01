const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true
  },
  email: {
    type: String,
    maxlength: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  },
  isAdmin: Boolean
});

usuarioSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const Usuario = mongoose.model('User', usuarioSchema);

function validateUser(usuario) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().max(255).required()  
  };

  return Joi.validate(usuario, schema);
}

exports.Usuario = Usuario;
exports.validate = validateUser;