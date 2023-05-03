const { User } = require("../models");
const ApiError = require("../../helpers/error");

const editUserProfile = async (userId, data) => {
  console.log(data);
  const user = await User.findOne({ id: userId });
  if (!user) {
    throw new ApiError(400, "User not found...");
  }
  if (data) {
    if (data.email) {
      const confirm = await User.findOne({ email: data.email });
      if (confirm) {
        throw new ApiError(
          400,
          "A user with this email exists on this platform"
        );
      }
    }

    return await User.findByIdAndUpdate(userId, data, { new: true });
  }
  throw new ApiError(400, "Kindly input the details you're looking to update!");
};

module.exports = editUserProfile;
