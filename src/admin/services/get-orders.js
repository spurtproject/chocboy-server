const { Order } = require("../../orders/models");
const { getPagination, handlePageCount } = require(".././../orders/functions");

const getOrders = async (query) => {
  try {
    const { skip, limit } = getPagination(query);

    const orderCount = await Order.count({});
    const orders = await Order.find({})
      .populate("customer")
      .populate("transactionId")
      .populate("items.product")
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
    throw error;
  }
};

module.exports = getOrders;
