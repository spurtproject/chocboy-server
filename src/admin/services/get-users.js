const { User } = require("../../auth/models");
const ApiError = require("../../helpers/error");

const getUsers = async (criteria = {}) => {
  try {
    let response = {};
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10) || 20;
    const userCount = await User.count();
    const totalNumberOfPages = userCount / 20;
    const approximateNumber = Math.ceil(totalNumberOfPages);

    const rawData = await User.find()
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
    response.currentPage = _page;
    response.totalNumberOfPages = approximateNumber;
    return { response, rawData };
  } catch (error) {
    throw new ApiError(400, "Unable to get all users...");
  }
};

module.exports = getUsers;
