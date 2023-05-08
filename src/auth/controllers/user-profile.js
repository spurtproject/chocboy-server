const catchAsync = require("express-async-handler");
const authService = require("../services");

const userProfile = catchAsync(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.status(200).json({
    status: "success",
    message: "Profile fetched successful!",
    user,
  });
});

module.exports = userProfile;
