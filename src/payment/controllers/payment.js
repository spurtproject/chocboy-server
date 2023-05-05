const handleHttpError = require("../../helpers/http-error.handler");
const { verifyPaymentService, paymentResponseService } = require("../services");

class PaymentController {
  async verifyPayment(req, res) {
    try {
      const { reference } = req.body;
      if (!reference) {
        throw new ApiError(400, "Reference is required");
      }
      const result = await verifyPaymentService(reference);
      res.status(200).json({
        message: "Payment has been verified",
        data: result,
        code: 200,
      });
    } catch (error) {
      handleHttpError(error, res);
    }
  }

  async paymentResponse(req, res) {
    try {
      if (!reference) {
        throw new ApiError(400, "Reference is required");
      }
      const result = await paymentResponseService(
        req.body,
        req.headers["x-paystack-signature"]
      );
      res.status(200).json({
        message: "success",
        data: result,
        code: 200,
      });
    } catch (error) {
      handleHttpError(error, res);
    }
  }
}

module.exports = PaymentController;
