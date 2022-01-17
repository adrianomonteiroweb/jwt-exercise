const { loginService } = require('../services/users.services');

const loginController = async (req, res) => {
  let result;
  try {
    result = await loginService(req.body);
  } catch (error) {
    return res.status().json({ message: 'Erro na conexão!' });
  }
  return result
  ? res.status(200).json(result)
  : res.status(422).json({ message: 'Erro ao realizar login!' });
};

module.exports = {
  loginController,
};
