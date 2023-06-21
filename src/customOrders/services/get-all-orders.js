const { CustomOrder } = require("../models");
const { getPagination, handlePageCount } = require("../../orders/functions");

const getAllOrders = async (query) => {
  try {
    const { skip, limit } = getPagination(query);

    const orderCount = await CustomOrder.count({});
    const orders = await CustomOrder.find({})
      .populate("customer")
      .populate("transactionId")
      .skip(skip)
      .limit(limit);
    const page = query.page ? parseInt(query.page.toString()) : 1;
    const { current_count, page_count } = handlePageCount(
      page,
      orders.length,
      limit,
      orderCount
    );
    const response = {
      totalNoPages: page_count,
      currentCount: current_count,
      orderCount,
      orders,
    };
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = getAllOrders;
