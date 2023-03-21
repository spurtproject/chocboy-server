const Order = require('./order.model');
const Transaction = require('../transactions/transaction.model');
const moment = require('moment');
const { initiatePayment, verifyPayment } = require('../helpers/paystack');
const ApiError = require('../helpers/error');

const createWindowOrder = async (data) => {
  const totalPrice = await data.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);
  const date = moment().format('L');

  const rawData = {};
  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.items = data;
  const generateOrder = await Order.create(rawData);
  return generateOrder;
};

const createOrder = async (user, data) => {
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
  transactionData.customer = user._id;
  transactionData.amount = totalPrice;
  transactionData.status = 'pending';
  const createTransaction = await Transaction.create(transactionData);
  const transactionId = createTransaction._id;
  const rawData = {};
  rawData.customer = user._id;
  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.transactionId = transactionId;
  rawData.items = data;
  const generateOrder = await Order.create(rawData);

  return generateOrder;
};

const updateOrder = async (user, orderId, data) => {
  try {
    const { totalPrice, transactionId } = await Order.findById(orderId);
    const netTotal = data.deliveryAmount + totalPrice;
    const newTotal = { totalPrice: netTotal };
    await Order.findByIdAndUpdate(orderId, { $set: newTotal }, { new: true });
    await Order.findByIdAndUpdate(orderId, { $set: data }, { new: true });
    const payStackForm = {};
    payStackForm.amount = netTotal * 100;
    payStackForm.email = user.email;
    payStackForm.metadata = {
      userId: user._id,
    };
    const payStackReturn = await initiatePayment(payStackForm);

    const paystackRef = payStackReturn.data.data.reference;

    await Transaction.findByIdAndUpdate(
      transactionId,
      { transactionRef: paystackRef },
      { new: true }
    );
    return payStackReturn;
  } catch (error) {
    throw new ApiError(400, 'Unable to update order');
  }
};

const verifyOrder = async (paymentRef) => {
  const result = await verifyPayment(paymentRef);
  const transactionRef = result.data.data.reference;
  await Transaction.findOneAndUpdate(
    {
      transactionRef: transactionRef,
    },
    { status: 'successful' },
    { new: true }
  );
  return result;
};

const getOrders = async (criteria = {}) => {
  try {
    let response = {};
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10);

    const userCount = await Order.count();
    const totalNumberOfPages = userCount / 20;
    const approximateNumber = Math.ceil(totalNumberOfPages);
    const rawData = await Order.find()
      .populate('customer')
      .populate('transactionId')
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
    const nextPage = _page + 1;
    response.currentPage = _page;
    response.nextPage = nextPage;
    response.totalNumberOfPages = approximateNumber;
    return { response, rawData };
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

module.exports = {
  createWindowOrder,
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  verifyOrder,
};
