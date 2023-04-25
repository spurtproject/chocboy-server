// require('dotenv').config();
// const {
//   PAYSTACK_INITIALIZE,
//   PAYSTACK_VERIFY,
//   PAYSTACK_SECRET,
// } = require('../config/keys');
// const axios = require('axios');

// const initiatePayment = async (form) => {
//   const paystackHeader = {
//     authorization: `Bearer ${PAYSTACK_SECRET}`,
//     'content-type': 'application/json',
//     'cache-control': 'no-cache',
//   };

//   return await axios.post(PAYSTACK_INITIALIZE, form, {
//     headers: paystackHeader,
//   });
// };

// const verifyPayment = async (ref) => {
//   const payStackConfig = {
//     method: 'get',
//     url: `${PAYSTACK_VERIFY}` + encodeURIComponent(ref),
//     headers: {
//       authorization: `Bearer ${PAYSTACK_SECRET}`,
//       'content-type': 'application/json',
//       'cache-control': 'no-cache',
//     },
//   };
//   return await axios(payStackConfig);
// };

// module.exports = { initiatePayment, verifyPayment };


const {
  PAYSTACK_INITIALIZE,
  PAYSTACK_VERIFY,
  PAYSTACK_SECRET,
} = require('../config/keys');

// require('dotenv').config()
// const paystack_secret = process.env.PAYSTACK_SECRET

const paystack = (req) => {
    
    const secretKey = `Bearer ${PAYSTACK_SECRET}`;

    const initPayment = async (form, cb) => {
        const opt = {
            // url: 'https://api.paystack.co/transaction/initialize',
            url: PAYSTACK_INITIALIZE,
            // check paystack doc for redirect url format, get this from Sonia
            // already did that actually, using the wrong route was the p
            headers: {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control':  'no-cache'
            },
            form // this will contain the name, email, amount and other params
        }

        const callback = (err, response, body) => {
            return cb(err, body)
        }
        // All the "callback" does is return the callback function (cb) passed
        // into the initPayment passing in the error and body from 
        // the request. cb would be well defined to run after 
        // initializePayment runs whenever we call it.

        await req.post(opt, callback)
    }

    const verifyPayment = async (ref, cb) => {
        const opt = {
            // url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            url: `${PAYSTACK_VERIFY}` + encodeURIComponent(ref),
            headers: {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (err, response, body) => {
            return cb(err, body)
        }
        await req(opt, callback)
        // this is automatically a get request
    }

    return { initPayment, verifyPayment }
}

module.exports = paystack;