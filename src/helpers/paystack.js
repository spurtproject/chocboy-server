require('dotenv').config();
const {
  PAYSTACK_INITIALIZE,
  PAYSTACK_VERIFY,
  PAYSTACK_SECRET,
} = require('../config/keys');
const axios = require('axios');

const initiatePayment = async (form) => {
  const paystackHeader = {
    authorization: `Bearer ${PAYSTACK_SECRET}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  };

  return await axios.post(PAYSTACK_INITIALIZE, form, {
    headers: paystackHeader,
  });
};

const verifyPayment = async (ref) => {
  const payStackConfig = {
    method: 'get',
    url: `${PAYSTACK_VERIFY}` + encodeURIComponent(ref),
    headers: {
      authorization: `Bearer ${PAYSTACK_SECRET}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
  };
  return await axios(payStackConfig);
};

module.exports = { initiatePayment, verifyPayment };
