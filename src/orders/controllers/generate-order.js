const handleHttpError = require("../../helpers/http-error.handler");
const orderService = require("../services");

const generateOrder = async (req, res) => {
  try {
    const data = await orderService.createOrder(req.user, req.body.data);
    res
      .status(201)
      .json({ status: "success", message: "Order now generated...", data });
  } catch (error) {
    handleHttpError(error, res);
  }
};

module.exports = generateOrder;
