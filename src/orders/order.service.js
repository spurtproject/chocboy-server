const Order = require('./order.model');
const Transaction = require('../transactions/transaction.model');
const Product = require('../products/product.model');
const ApiError = require('../helpers/error');

const createOrder = async (userId, data) => {
  console.log(data);
};

module.exports = { createOrder };
