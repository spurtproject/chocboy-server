const { CustomOrder } = require("../models");
const ApiError = require("../../helpers/error");

const customOrderStatus = async (id, data) => {
  try {
    if (!data.status) {
      throw new ApiError(400, "status field is required");
    }
    const order = await CustomOrder.findById(id);
    order.deliveryStatus = data.status;
    return await order.save();
  } catch (error) {
    throw error;
  }
};

module.exports = customOrderStatus;
