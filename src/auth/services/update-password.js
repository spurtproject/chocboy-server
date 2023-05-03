const { User } = require("../models");
const ApiError = require("../../helpers/error");
const bcrypt = require("bcryptjs");

const updatePassword = async (email, oldPassword, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Incorrect email or password...");
  }
  const compare = await comparePassword(oldPassword, user.password);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return await User.findOneAndUpdate(
    user._id,
    { password: hashedPassword },
    { new: true }
  );
};

module.exports = updatePassword;
