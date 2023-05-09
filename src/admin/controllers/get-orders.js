const catchAsync = require("express-async-handler");
const orderService = require("../services");

const getOrders = catchAsync(async (req, res) => {
  const data = await orderService.getOrders(req.query);
  res
    .status(201)
    .json({ status: true, message: "All orders now retrieved...", data });
});

module.exports = getOrders;
