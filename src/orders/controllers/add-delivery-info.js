const catchAsync = require("express-async-handler");
const orderService = require("../services");

const addDeliveryInfo = catchAsync(async (req, res) => {
  const paystackData = await orderService.updateOrder(
    req.user,
    req.query.orderId,
    req.body
  );
  // const paystackResponse = paystackData.data.data;
  res.status(200).json({
    status: true,
    message: "Delivery and shipping details now updated...",
  });
});

module.exports = addDeliveryInfo;
