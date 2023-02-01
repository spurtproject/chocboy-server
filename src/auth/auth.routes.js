const { Router } = require('express');
const {
  register,
  login,
  forgotPassword,
  confirmOTP,
  changePassword,
  updatePassword,
  editProfile,
} = require('./auth.controllers');
const { checkEmail } = require('../helpers/checkEmail');
const { registerValidator, loginValidator } = require('../helpers/validate');
const { userAuthentication } = require('../helpers/auth');
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

router.put('/password/forgot', forgotPassword);

router.post('/confirm/otp', userAuthentication, confirmOTP);

router.put('/edit/profile', userAuthentication, editProfile);

router.put('/change/password', userAuthentication, changePassword);

router.patch('/update/password', userAuthentication, updatePassword);

module.exports = router;
