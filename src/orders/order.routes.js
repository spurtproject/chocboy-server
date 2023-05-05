const { Router } = require("express");
const {
  generateOrder,
  getOrder,
  getOrders,
  addDeliveryInfo,
  verifyPaymentOrder,
  generateWindowOrder,
} = require("./controllers");
const { adminAuthorization } = require("../helpers/auth");
const router = Router();

router.post("/generate", generateOrder);

router.post("/window/generate", generateWindowOrder);

router.get("/all", adminAuthorization, getOrders);
router.get("/:_id", getOrder);
router.put("/delivery/info", addDeliveryInfo);

module.exports = router;
