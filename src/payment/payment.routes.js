const { Router } = require("express");
const PaymentController = require("./controllers/payment");

const router = Router();
const { verifyPayment, paymentResponse } = new PaymentController();

router.post("/verify", verifyPayment);
router.post("/response", paymentResponse);

module.exports = router;
