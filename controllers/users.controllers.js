require('dotenv').config();

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { loginService } = require('../services/users.services');

const loginError = { message: 'Erro ao realizar login!' };

const bodyValidation = (body) =>
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

const newError = new Error('Invalid username or password');
newError.statusCode = 401;

const loginController = async (req, res, next) => {
  const { username, password } = req.body;
  const admin = username === 'admin' && password !== 's3nh4S3gur4???';
  const { error } = bodyValidation(req.body);
  if (error) return next(error);
  if (username === 'admin' && password !== 's3nh4S3gur4???') return next(newError);
  const result = await loginService(req.body);
  const payload = { username, admin };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return result ? res.status(200).json({ token }) : res.status(422).json(loginError);
};

module.exports = {
  loginController,
};
