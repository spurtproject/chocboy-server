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

const getUsers = (criteria = {}) => {
  try {
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10) || 20;
    return User.find()
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
  } catch (error) {
    throw new ApiError(400, 'Unable to get all users...');
  }
};

module.exports = { getUserById, getUsers };
