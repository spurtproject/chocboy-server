const ApiError = require("../../helpers/error");
const bcrypt = require("bcryptjs");

const comparePassword = async (entered, password) => {
  try {
    const result = await bcrypt.compare(entered, password);
    if (!result) {
      throw new ApiError(400, "Oops! Inputted password is incorrect!");
    }
    return result;
  } catch (err) {
    throw new ApiError(400, "Incorrect old password inputted...");
  }
};

module.exports = comparePassword;
