const createCustomOrder = require("./create-custom-order-controller");
const getCustomOrder = require("./get-custom-order");
const getCustomOrders = require("./get-custom-orders");
const getAllOrders = require("./get-all-orders");
const customOrderStatus = require("./order-status");

module.exports = {
  createCustomOrder,
  getCustomOrder,
  getCustomOrders,
  getAllOrders,
  customOrderStatus,
};
