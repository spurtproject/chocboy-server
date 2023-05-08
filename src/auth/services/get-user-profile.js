const { handleUserResponse } = require("../functions");
const { User } = require("../models");

const getUserProfile = async (_id) => {
  try {
    let user = await User.findOne({ _id });
    return handleUserResponse(user);
  } catch (err) {
    throw err;
  }
};

module.exports = getUserProfile;
