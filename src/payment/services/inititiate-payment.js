const { v4 } = require("uuid");
const initiatePaymentApi = require("../api/initiate-payment.api");
const saveTransaction = require("./save-transaction");

const initiatePaymentService = async ({
  amount,
  email,
  user_id,
  callback_url,
}) => {
  const reference = v4();

  try {
    const response = await initiatePaymentApi({
      email,
      amount,
      reference,
      callback_url,
    });
    const transaction = await saveTransaction({
      amount,
      customer: user_id,
      transactionRef: reference,
    });
    return { transaction, paystackResponse: response };
  } catch (error) {
    throw error;
  }
};

module.exports = initiatePaymentService;
