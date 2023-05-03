const catchAsync = require("express-async-handler");
const authService = require("../services");

const updatePassword = catchAsync(async (req, res) => {
  console.log(req.user);
  await authService.updatePassword(
    req.user.email,
    req.body.oldPassword,
    req.body.newPassword
  );
  res
    .status(201)
    .json({ status: "success", message: "Password Successfully Updated..." });
});

module.exports = updatePassword;
