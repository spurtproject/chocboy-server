const { Transaction, Payment } = require("../models");
const { Order } = require("../../orders/models");
const { TRANSACTION_STATUS, PAYMENT_STATUS } = require("../../helpers/enums");
const verifyPaymentApi = require("../api/verify-payment.api");

const verifyPaymentService = async (reference) => {
  try {
    const result = await verifyPaymentApi(reference);
    const transaction = await Transaction.findOne({
      transactionRef: reference,
    });
    const payment = await Payment.findOne({ transactionRef: reference });
    const order = await Order.findOne({ transactionId: transaction._id });

    if (result.data.status == "success") {
      transaction.status = payment.status = TRANSACTION_STATUS.SUCCESSFUL;
      order.paymentStatus = PAYMENT_STATUS.PAID;
    }

    return result;
  } catch (error) {
    this.logger.error(error);
    throw error;
  }
};

module.exports = verifyPaymentService;
