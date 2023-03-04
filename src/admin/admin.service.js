const User = require('../auth/user.model');
const ApiError = require('../helpers/error');

const getUserById = async (id) => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (error) {
    throw new ApiError(400, 'Unable to get user');
  }
};

module.exports = { getUserById };
