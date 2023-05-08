const { Order } = require("../models");
const ApiError = require("../../helpers/error");

const orderStatus = async (id, data) => {
  try {
    if (!data.status) {
      throw new ApiError(400, "status field is required");
    }
    const order = await Order.findById(id);
    order.deliveryStatus = data.status;
    return await order.save();
  } catch (error) {
    throw error;
  }
};

module.exports = orderStatus;
