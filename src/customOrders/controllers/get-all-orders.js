const catchAsync = require("express-async-handler");
const orderService = require("../services");

const getAllOrders = catchAsync(async (req, res) => {
  const data = await orderService.getAllOrders(req.query, req.user);
  res
    .status(201)
    .json({ status: true, message: "All orders now retrieved...", data });
});

module.exports = getAllOrders;
