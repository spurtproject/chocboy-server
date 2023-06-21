const moment = require("moment");
const { initiatePaymentService } = require("../../payment/services");
const { CustomOrder } = require("../models");

const createCustomOrder = async (user, data) => {
  const { chocolateSize, chocolateType, amount, deliveryInformation } = data;
  //   console.log(amount);
  try {
    const date = moment().format("L");

    const chargedAmount = amount * 100;
    const { transaction, paystackResponse } = await initiatePaymentService({
      amount: chargedAmount,
      email: user.email,
      user_id: user._id,
    });

    const payload = {
      customer: user._id,
      date,
      transactionId: transaction._id,
      chocolateSize,
      chocolateType,
      amount,
      deliveryInformation,
    };

    const generateOrder = await CustomOrder.create(payload);

    return {
      customer: generateOrder.customer,
      amount: generateOrder.amount,
      transactionId: generateOrder.transactionId,
      deliveryStatus: generateOrder.deliveryStatus,
      paymentStatus: generateOrder.paymentStatus,
      ...paystackResponse.data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = createCustomOrder;
