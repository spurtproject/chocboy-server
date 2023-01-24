const { Router } = require('express');
const { register, login } = require('./auth.controllers');
const { checkEmail } = require('../helpers/checkEmail');
const { registerValidator, loginValidator } = require('../helpers/validate');
const passport = require('passport');
const router = Router();

router.post(
  '/register',
  registerValidator,
  checkEmail,
  passport.authenticate('user', { session: false }),
  register
);

router.post('/login', loginValidator, login);

module.exports = router;
