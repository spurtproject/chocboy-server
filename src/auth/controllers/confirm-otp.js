const catchAsync = require("express-async-handler");
const authService = require("../services");

const confirmOTP = catchAsync(async (req, res) => {
  if (!req.body.OTP) {
    throw new ApiError(400, "An OTP is required here...");
  }

  const user = await authService.confirmOTP(req.user.userPin, req.body.OTP);
  res
    .status(200)
    .json({ status: true, message: "Yeaa! OTP correctly inputted..." });
});

module.exports = confirmOTP;
