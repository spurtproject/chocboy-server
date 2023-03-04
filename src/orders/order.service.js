const Order = require('./order.model');
const Transaction = require('../transactions/transaction.model');
const moment = require('moment');
const ApiError = require('../helpers/error');

const createOrder = async (userId, data) => {
  const totalPrice = await data.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);
  const date = moment().format('L');
  const transactionData = {};
  transactionData.customer = userId;
  transactionData.amount = totalPrice;
  transactionData.status = 'pending';
  const createTransaction = await Transaction.create(transactionData);
  const transactionId = createTransaction._id;
  const rawData = {};
  rawData.customer = userId;
  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.transactionId = transactionId;
  rawData.items = data;
  const generateOrder = await Order.create(rawData);
  return generateOrder;
};

module.exports = { createOrder };
