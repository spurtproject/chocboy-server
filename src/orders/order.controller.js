const catchAsync = require('express-async-handler');
const orderService = require('./order.service');

const generateOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req.user, req.body);
  res
    .status(201)
    .json({ status: 'success', message: 'Order now generated...', data });
});

const generateWindowOrder = catchAsync(async (req, res) => {
  const data = await orderService.createWindowOrder(req.body)
  res.status(201).json({status: true, message: 'order window generated', data})
});

const addDeliveryInfo = catchAsync(async (req, res) => {
  const paystackData = await orderService.updateOrder(
    req.user,
    req.query.orderId,
    req.body
  );
  // const paystackResponse = paystackData.data.data;
  res.status(200).json({
    status: true,
    message: 'Delivery and shipping details now updated...',
  });
});

const verifyPaymentOrder = async (req, res) => {
  // await orderService.verifyOrder(req.query.reference);
  await orderService.verifyOrder(req.body.reference);
  res.status(200).json({
    status: true,
    message: 'Way to go! Payment confirmed & Successful...'
  });
};

const verifyPaymentStatus = async (req, res) => {
  await orderService.verifyStatus(req.body);
  res.send(200);
}

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
  verifyPaymentStatus,
  addDeliveryInfo,
  generateWindowOrder
};
