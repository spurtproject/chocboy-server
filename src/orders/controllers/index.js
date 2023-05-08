const addDeliveryInfo = require("./add-delivery-info");
const generateOrder = require("./generate-order");
const generateWindowOrder = require("./generate-window-order");
const getOrder = require("./get-order");
const getOrders = require("./get-orders");
const verifyPaymentOrder = require("./verify-payment-order");
const verifyPaymentStatus = require("./verify-payment-status");
const orderStatus = require("./order-status");

module.exports = {
  generateOrder,
  getOrder,
  getOrders,
  verifyPaymentOrder,
  verifyPaymentStatus,
  addDeliveryInfo,
  generateWindowOrder,
  orderStatus,
};
