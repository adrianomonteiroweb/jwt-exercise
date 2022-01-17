const { loginModel } = require('../models/users.models');

const loginService = async (body) => {
  const login = await loginModel(body);

  return login || null;
};

module.exports = {
  loginService,
};
