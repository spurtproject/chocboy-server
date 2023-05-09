const { Order } = require("../models");
const moment = require("moment");
const { initiatePaymentService } = require("../../payment/services");
const ApiError = require("../../helpers/error");

const createOrder = async (user, data) => {
  const { items, productAmount, deliveryAmount, state, address, phone } = data;
  console.log(data);
  let totalItems = 0;
  try {
    // PAYSTCK gateway here
    items.length &&
      items.map((item) => {
        if (!item.product) {
          throw new ApiError(400, "Product field cannot be null");
        }
      });

    const date = moment().format("L");

    const totalPrice = productAmount + deliveryAmount;

    items.map((item) => {
      totalItems += item.choiceQuantity;
    });

    const amount = totalPrice * 100;
    const { transaction, paystackResponse } = await initiatePaymentService({
      amount,
      email: user.email,
      user_id: user._id,
    });

    const payload = {
      customer: user._id,
      date,
      totalItems,
      totalPrice,
      transactionId: transaction._id,
      items,
      deliveryAmount,
      state,
      address,
      phone,
    };

    const generateOrder = await Order.create(payload);

    return {
      customer: generateOrder.customer,
      totalPrice: generateOrder.totalPrice,
      transactionId: generateOrder.transactionId,
      deliveryAmount: generateOrder.deliveryAmount,
      deliveryStatus: generateOrder.deliveryStatus,
      paymentStatus: generateOrder.paymentStatus,
      ...paystackResponse.data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = createOrder;
