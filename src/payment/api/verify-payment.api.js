const axios = require("axios");
const { PAYSTACK_SECRET } = require("../../config/keys");

const verifyPaymentApi = async (reference) => {
  try {
    const secretKey = `Bearer ${PAYSTACK_SECRET}`;
    const headers = {
      authorization: secretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
    };

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = verifyPaymentApi;
