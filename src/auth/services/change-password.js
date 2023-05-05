const { User } = require("../models");
const bcrypt = require("bcryptjs");

const changePassword = async (user, data) => {
  let hashedPassword = await bcrypt.hash(data, 10);
  return await User.findOneAndUpdate(
    { email: user },
    { password: hashedPassword },
    { new: true }
  );
};

module.exports = changePassword;
