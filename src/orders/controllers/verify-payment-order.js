const catchAsync = require("express-async-handler");
const orderService = require("../services");

const verifyPaymentOrder = async (req, res) => {
  // await orderService.verifyOrder(req.query.reference);
  await orderService.verifyOrder(req.body.reference);
  res.status(200).json({
    status: true,
    message: "Way to go! Payment confirmed & Successful...",
  });
};

module.exports = verifyPaymentOrder;
