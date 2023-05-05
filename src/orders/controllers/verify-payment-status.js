const orderService = require("../services");

const verifyPaymentStatus = async (req, res) => {
  await orderService.verifyStatus(req.body);
  res.send(200);
};

module.exports = verifyPaymentStatus;
