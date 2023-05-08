const { Router } = require("express");
const {
  generateOrder,
  getOrder,
  getOrders,
  addDeliveryInfo,
  verifyPaymentOrder,
  generateWindowOrder,
  orderStatus,
} = require("./controllers");
const { adminAuthorization, userAuthentication } = require("../helpers/auth");
const validate = require("../helpers/validateRequest");
const { createOrderDto } = require("./dto/create-order.dto");
const router = Router();

router.post("/generate", validate(createOrderDto), generateOrder);

router.post("/window/generate", generateWindowOrder);

router.get("/all", userAuthentication, getOrders);
router.get("/:_id", getOrder);
router.put("/status/:id", adminAuthorization, orderStatus);
router.put("/delivery/info", addDeliveryInfo);

module.exports = router;
