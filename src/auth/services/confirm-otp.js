const ApiError = require("../../helpers/error");

const confirmOTP = (userPin, data) => {
  if (userPin != data) {
    throw new ApiError(400, "Incorrect pin inputted...");
  }
  return;
};

module.exports = confirmOTP;
