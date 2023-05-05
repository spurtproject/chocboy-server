const Order = require("../models");
const ApiError = require("../../helpers/error");

const getOrder = async (id) => {
  try {
    return await Order.findById(id)
      .populate("transactionId")
      .populate("customer");
  } catch (error) {
    throw new ApiError(400, "Unable to get order");
  }
};

module.exports = getOrder;
