require('dotenv').config();
const {
  PAYSTACK_INITIALIZE,
  PAYSTACK_VERIFY,
  PAYSTACK_SECRET,
} = require('../config/keys');
const axios = require('axios');

const initiatePayment = async (form) => {
  console.log(form);
  console.log(PAYSTACK_INITIALIZE, PAYSTACK_VERIFY, PAYSTACK_SECRET);
  const paystackHeader = {
    authorization: `Bearer ${PAYSTACK_SECRET}`,
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  };
  console.log(paystackHeader);
  const mydata = await axios.post(PAYSTACK_INITIALIZE, form, {
    headers: paystackHeader,
  });
  console.log(mydata.data.data);
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
