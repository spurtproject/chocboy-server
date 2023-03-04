const catchAsync = require('express-async-handler');
const orderService = require('./order.service');

const generateOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req.user._id, req.body);
  res.status(200).json({ status: 'success', data });
});

const getOrders = (req, res) => {};
module.exports = { generateOrder };
