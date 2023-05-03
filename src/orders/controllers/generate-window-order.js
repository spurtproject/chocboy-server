const catchAsync = require("express-async-handler");
const orderService = require("../services");

const generateWindowOrder = catchAsync(async (req, res) => {
  const data = await orderService.createWindowOrder(req.body);
  res
    .status(201)
    .json({ status: true, message: "order window generated", data });
});

module.exports = generateWindowOrder;
