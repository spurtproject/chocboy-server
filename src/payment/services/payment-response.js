const { PAYSTACK_SECRET } = require("../../config/keys");
const ApiError = require("../../helpers/error");
const verifyPaymentApi = require("../api/verify-payment.api");
const crypto = require("crypto");
const { Transaction, Payment } = require("../models");
const { Order } = require("../../orders/models");
const { CustomOrder } = require("../../customOrders/models");
const { TRANSACTION_STATUS, PAYMENT_STATUS } = require("../../helpers/enums");

const paymentResponseService = async (payload, paystack_hash) => {
  try {
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (hash !== paystack_hash) {
      throw new ApiError(401, "Incorrect hash");
    }

    const result = await verifyPaymentApi(payload.data.reference);
    const transaction = await Transaction.findOne({
      transactionRef: payload.data.reference,
    });
    const payment = await Payment.findOne({
      transactionRef: payload.data.reference,
    });
    let order = await Order.findOne({ transactionId: transaction._id });

    if (!order) {
      order = await CustomOrder.findOne({ transactionId: transaction._id });
    }

    if (result.data.status == "success") {
      transaction.status = payment.status = TRANSACTION_STATUS.SUCCESSFUL;
      order.paymentStatus = PAYMENT_STATUS.PAID;
    }

    await transaction.save();
    await payment.save();
    await order.save();
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = paymentResponseService;
