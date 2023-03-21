const catchAsync = require('express-async-handler');
const orderService = require('./order.service');

const generateOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req.user, req.body);
  res
    .status(201)
    .json({ status: 'success', message: 'Order now generated...', data });
});

const generateWindowOrder = (req, res) => {};

const addDeliveryInfo = catchAsync(async (req, res) => {
  const paystackData = await orderService.updateOrder(
    req.user,
    req.query.orderId,
    req.body
  );
  const paystackResponse = paystackData.data.data;
  res.redirect(paystackResponse.authorization_url);
});

const verifyPaymentOrder = async (req, res) => {
  const verify = await orderService.verifyOrder(req.query.reference);
  res.status(200).json({
    status: true,
    message: 'Way to go! Payment confirmed & Successful...',
  });
};

const getOrders = catchAsync(async (req, res) => {
  const data = await orderService.getOrders(req.query);
  res
    .status(201)
    .json({ status: true, message: 'All orders now retrieved...', data });
});

const getOrder = catchAsync(async (req, res) => {
  const data = await orderService.getOrder(req.params._id);
  res
    .status(200)
    .json({ status: true, message: 'Order now retrieved...', data });
});

module.exports = {
  generateOrder,
  getOrder,
  getOrders,
  verifyPaymentOrder,
  addDeliveryInfo,
};
