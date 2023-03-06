const Order = require('./order.model');
const Transaction = require('../transactions/transaction.model');
const moment = require('moment');
const ApiError = require('../helpers/error');

const createOrder = async (userId, data) => {
  try {
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
  } catch (error) {
    throw new ApiError(400, 'Unable to generate order');
  }
};

const getOrders = async (criteria = {}) => {
  try {
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10);

    return await Order.find()
      .populate('customer')
      .populate('transactionId')
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
  } catch (error) {
    throw new ApiError(400, 'Unable to get orders');
  }
};

const getOrder = async (id) => {
  try {
    return await Order.findById(id)
      .populate('transactionId')
      .populate('customer');
  } catch (error) {
    throw new ApiError(400, 'Unable to get order');
  }
};

module.exports = { createOrder, getOrder, getOrders };
