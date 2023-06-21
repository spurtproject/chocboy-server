const { CustomOrder } = require("../models");

const getCustomOrder = async (id) => {
  try {
    return await CustomOrder.findById(id)
      .populate("transactionId")
      .populate("customer");
  } catch (error) {
    throw error;
  }
};

module.exports = getCustomOrder;
