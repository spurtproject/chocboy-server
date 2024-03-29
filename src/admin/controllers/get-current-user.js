const adminService = require("../services");
const catchAsync = require("express-async-handler");

const getCurrentUser = catchAsync(async (req, res) => {
  let user;

  if (req.query.userId) {
    user = await adminService.getUserById(req.query.userId);
  } else {
    user = await adminService.getUserById(req.user._id);
  }

  res
    .status(200)
    .json({ status: true, message: "User now retrieved... ", user });
});

module.exports = getCurrentUser;
