const connection = require('./connection');

const loginModel = async (body) => {
  try {
    const db = await connection();
    const newUser = await db.collection('users').insertOne(body);
  
    return newUser || null;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  loginModel,
};
