const ApiError = require("../../helpers/error");
const verifyPaymentApi = require("../api/verify-payment.api");

const paymentResponseService = async (payload, paystack_hash) => {
  try {
    console.log(payload);
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (hash !== paystack_hash) {
      throw new ApiError(401, "Incorrect hash");
    }

    const result = verifyPaymentApi(payload.data.reference);
    console.log(result);
    const transaction = await Transaction.findOne({
      transactionRef: payload.data.reference,
    });
    const payment = await Payment.findOne({
      transactionRef: payload.data.reference,
    });
    const order = await Order.findOne({ transactionId: transaction._id });

    if (result.data.status == "success") {
      transaction.status = payment.status = TRANSACTION_STATUS.SUCCESSFUL;
      order.paymentStatus = PAYMENT_STATUS.PAID;
    }

    await transaction.save();
    await payment.save();
    await order.save();
  } catch (error) {
    throw error;
  }
};

module.exports = paymentResponseService;
