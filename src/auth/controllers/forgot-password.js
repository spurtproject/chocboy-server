const authService = require("../services");
const { sendOTP } = require("../../helpers/email");
const catchAsync = require("express-async-handler");

const forgotPassword = catchAsync(async (req, res) => {
  const { email, userPin } = await authService.getUserByMail(req.body.email);
  let data = { email, userPin };
  const token = await authService.generateAuthTokens(data);
  sendOTP(email, userPin);
  res.status(200).json({
    status: true,
    message: "You have just been sent an OTP to your email... Please confirm",
    token: token.access.token,
  });
});

module.exports = forgotPassword;
