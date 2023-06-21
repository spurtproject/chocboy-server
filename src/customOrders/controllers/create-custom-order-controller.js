const handleHttpError = require("../../helpers/http-error.handler");
const customOrderService = require("../services");

const createCustomOrder = async (req, res) => {
  try {
    const data = await customOrderService.createCustomOrder(req.user, req.body);
    res
      .status(201)
      .json({ status: "success", message: "Order now generated...", data });
  } catch (error) {
    handleHttpError(error, res);
  }
};

module.exports = createCustomOrder;
