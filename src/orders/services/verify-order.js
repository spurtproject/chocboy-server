const Transaction = require("../../transactions/transaction.model");
const { verifyPayment } = require("../../helpers/paystack");
const ApiError = require("../../helpers/error");

const verifyOrder = async (paymentRef) => {
  // const result = await verifyPayment(paymentRef);
  // const transactionRef = result.data.data.reference;
  // const transactionRef = req.query.reference

  let paymentResult;
  await verifyPayment(paymentRef, (err, body) => {
    if (err) {
      throw new ApiError(400, "Unable to verify payment");
    }
    paymentResult = JSON.parse(body);
  });
  const transactionRef = paymentResult.data.reference;

  await Transaction.findOneAndUpdate(
    {
      transactionRef: transactionRef,
    },
    { status: "successful" },
    { new: true }
  );
  return "confirmed";
};

module.exports = verifyOrder;
