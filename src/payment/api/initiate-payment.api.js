const { PAYSTACK_SECRET, PAYSTACK_INITIALIZE } = require("../../config/keys");
const axios = require("axios");

const initiatePaymentApi = async ({
  email,
  amount,
  reference,
  callback_url,
}) => {
  try {
    const secretKey = `Bearer ${PAYSTACK_SECRET}`;
    const headers = {
      authorization: secretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
    };
    const data = {
      email,
      amount: amount * 100,
      reference,
      callback_url,
    };

    const response = await axios.post(PAYSTACK_INITIALIZE, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = initiatePaymentApi;
