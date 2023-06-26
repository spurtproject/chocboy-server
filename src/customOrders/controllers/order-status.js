const catchAsync = require("express-async-handler");
const orderService = require("../services");

const customOrderStatus = catchAsync(async (req, res) => {
  const data = await orderService.customOrderStatus(req.params.id, req.body);
  res.status(200).json({ status: true, message: "Order status updated", data });
});

module.exports = customOrderStatus;
