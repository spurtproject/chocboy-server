const catchAsync = require("express-async-handler");
const orderService = require("../services");

const getCustomOrder = catchAsync(async (req, res) => {
  const data = await orderService.getCustomOrder(req.params._id);
  res
    .status(200)
    .json({ status: true, message: "Order now retrieved...", data });
});

module.exports = getCustomOrder;
