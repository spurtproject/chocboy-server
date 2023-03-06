const catchAsync = require('express-async-handler');
const orderService = require('./order.service');

const generateOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req.user._id, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Order successfully generated...',
    data,
  });
});

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

module.exports = { generateOrder, getOrder, getOrders };
