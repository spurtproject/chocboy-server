const { Order } = require("../models");

const getOrder = async (id) => {
  try {
    return await Order.findById(id)
      .populate("transactionId")
      .populate("customer")
      .populate("items.product");
  } catch (error) {
    throw error;
  }
};

module.exports = getOrder;
