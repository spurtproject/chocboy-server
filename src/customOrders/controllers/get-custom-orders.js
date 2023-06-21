const catchAsync = require("express-async-handler");
const orderService = require("../services");

const getCustomOrders = catchAsync(async (req, res) => {
  const data = await orderService.getCustomOrders(req.query, req.user);
  res
    .status(201)
    .json({ status: true, message: "All orders now retrieved...", data });
});

module.exports = getCustomOrders;
