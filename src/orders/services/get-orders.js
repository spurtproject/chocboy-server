const Order = require("../models");
const ApiError = require("../../helpers/error");

const getOrders = async (criteria = {}) => {
  try {
    let response = {};
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10);

    const userCount = await Order.count();
    const totalNumberOfPages = userCount / 20;
    const approximateNumber = Math.ceil(totalNumberOfPages);
    const rawData = await Order.find()
      .populate("customer")
      .populate("transactionId")
      .populate("product")
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
    const nextPage = _page + 1;
    response.currentPage = _page;
    response.nextPage = nextPage;
    response.totalNumberOfPages = approximateNumber;
    return { response, rawData };
  } catch (error) {
    throw new ApiError(400, "Unable to get orders");
  }
};

module.exports = getOrders;
