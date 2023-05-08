const createOrder = require("./create-order");
const getOrder = require("./get-order");
const getOrders = require("./get-orders");
const updateOrder = require("./update-order");
const verifyOrder = require("./verify-order");
const verifyStatus = require("./verify-status");
const createWindowOrder = require("./window-order");
const orderStatus = require("./order-status");

module.exports = {
  createWindowOrder,
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  verifyOrder,
  verifyStatus,
  orderStatus,
};
