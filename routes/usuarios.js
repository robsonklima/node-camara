const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { Usuario, validate } = require('../models/usuario');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  console.log(req.body)

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let usuario = await Usuario.findOne({ email: req.body.email });
  if (usuario) return res.status(400).send('User already registered.');

  usuario = new Usuario(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = usuario.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;