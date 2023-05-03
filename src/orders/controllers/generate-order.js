const catchAsync = require("express-async-handler");
const orderService = require("../services");

const generateOrder = catchAsync(async (req, res) => {
  const data = await orderService.createOrder(req.user, req.body);
  res
    .status(201)
    .json({ status: "success", message: "Order now generated...", data });
});

module.exports = generateOrder;
