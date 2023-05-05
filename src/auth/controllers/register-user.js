const catchAsync = require("express-async-handler");
const tokenService = require("../services");

const register = catchAsync(async (req, res) => {
  let data = req.user;
  const authToken = await tokenService.generateAuthTokens(data);
  const token = authToken.access.token;
  res.status(201).json({
    status: true,
    message: "Account Successfully Created!",
    data,
    token,
  });
});

module.exports = register;
