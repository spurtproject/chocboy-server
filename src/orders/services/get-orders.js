const { Order } = require("../models");
const { getPagination, handlePageCount } = require("../functions");

const getOrders = async (query, customer) => {
  try {
    const { skip, limit } = getPagination(query);

    const orderCount = await Order.count({ customer });
    const orders = await Order.find({ customer })
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
