const router = require('express').Router();

const { loginController } = require('../controllers/users.controllers');

router.post(
  '/',
  loginController,
  );

module.exports = router;
