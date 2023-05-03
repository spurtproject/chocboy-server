const { User } = require("../models");
const ApiError = require("../../helpers/error");

const getUserByMail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "You are yet to be registered with this mail...");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    throw new ApiError(
      400,
      "Oops! You are yet to be registered with this mail..."
    );
  }
};

module.exports = getUserByMail;
