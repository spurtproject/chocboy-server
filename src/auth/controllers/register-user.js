const catchAsync = require("express-async-handler");
const tokenService = require("../services");
const { signUpMessage } = require("../../helpers/email");

const register = catchAsync(async (req, res) => {
  let data = req.user;
  let body = req.body;
  const authToken = await tokenService.generateAuthTokens(data);
  await signUpMessage(body.email, body.name);
  const token = authToken.access.token;
  res.status(201).json({
    status: true,
    message: "Account Successfully Created!",
    data,
    token,
  });
});

module.exports = register;
