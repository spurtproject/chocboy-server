const { User } = require("../models");
const ApiError = require("../../helpers/error");
const { handleUserResponse } = require("../functions");

const editUserProfile = async (userId, data) => {
  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new ApiError(400, "User not found...");
    }
    if (!data) {
      throw new ApiError(
        400,
        "Kindly input the details you're looking to update!"
      );
    }

    const { name, email, phone, state, address, dateOfBirth, photo } = data;

    if (email) {
      const confirm = await User.findOne({ email });
      if (confirm) {
        throw new ApiError(
          400,
          "A user with this email exists on this platform"
        );
      }
    }

    const result = await User.findByIdAndUpdate(userId, data, { new: true });
    return handleUserResponse(result);
  } catch (error) {
    throw error;
  }
};

module.exports = editUserProfile;
