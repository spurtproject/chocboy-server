const changePassword = require("./change-password");
const comparePassword = require("./compare-password");
const confirmOTP = require("./confirm-otp");
const editUserProfile = require("./edit-profile");
const getUserByMail = require("./get-user-by-email");
const updatePassword = require("./update-password");
const {
  generateAuthTokens,
  generateToken,
  expireUserToken,
} = require("./token");
const getUserProfile = require("./get-user-profile");

module.exports = {
  editUserProfile,
  confirmOTP,
  getUserByMail,
  comparePassword,
  changePassword,
  updatePassword,
  generateAuthTokens,
  generateToken,
  expireUserToken,
  getUserProfile,
};
