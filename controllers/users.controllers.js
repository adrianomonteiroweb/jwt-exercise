require('dotenv').config();

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { loginService } = require('../services/users.services');

const bodyValidation = (body) =>
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

const loginController = async (req, res, next) => {
  const { error } = bodyValidation(req.body);
  if (error) return next(error);
  let result;
  try {
    result = await loginService(req.body);
  } catch (err) {
    return res.status().json({ message: 'Erro na conexão!' });
  }
  const payload = {
    username: req.body.username,
    admin: false,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
  return result ? res.status(200).json({ token })
  : res.status(422).json({ message: 'Erro ao realizar login!' });
};

module.exports = {
  loginController,
};
