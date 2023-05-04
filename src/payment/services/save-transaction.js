const { PLATFORM } = require("../../helpers/enums");
const { Transaction, Payment } = require("../models");

const saveTransaction = async ({ amount, customer, transactionRef }) => {
  try {
    const transaction = await Transaction.findOne({ customer })
      .sort({ _id: -1 })
      .limit(1);

    const lastTransactionId = transaction
      ? transaction.lastTransactionId
      : null;

    const data = {
      amount,
      customer,
      transactionRef,
      lastTransactionId,
      platform: PLATFORM.PAYSTACK,
    };

    const result = await Transaction.create(data);
    await Payment.create(data);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = saveTransaction;
