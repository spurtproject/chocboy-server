const catchAsync = require("express-async-handler");
const ApiError = require("../../helpers/error");
const authService = require("../services");
const cloudinary = require("../../helpers/cloudinary");

const editProfile = catchAsync(async (req, res) => {
  if (req.body.password) {
    throw new ApiError(400, "You can't update your password Here!");
  }
  const updatedbody = req.body;

  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    updatedbody.photo = avatar.secure_url;
  }

  const user = await authService.editUserProfile(req.user._id, updatedbody);
  res.status(200).json({
    status: "success",
    message: "Yeaa! Profile update successful!",
    user,
  });
});

module.exports = editProfile;
