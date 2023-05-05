const { Router } = require("express");
const PaymentController = require("./controllers/payment");

const router = Router();
const { verifyPayment } = new PaymentController();

router.post("/verify", verifyPayment);

module.exports = router;
