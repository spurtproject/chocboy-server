const catchAsync = require("express-async-handler");
const authService = require("../services");

const changePassword = catchAsync(async (req, res) => {
  if (!req.body.password) {
    throw new ApiError(400, "Kindly input the new desired password");
  }
  const user = await authService.changePassword(
    req.user.email,
    req.body.password
  );
  res.status(200).json({
    status: true,
    message: "Password Change Successfully Effected...",
  });
});

module.exports = changePassword;
