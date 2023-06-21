const { Router } = require("express");
const { adminAuthorization, userAuthentication } = require("../helpers/auth");
const validate = require("../helpers/validateRequest");
const { createCustomOrderDto } = require("./dto/create-order.dto");
const { createCustomOrder, getCustomOrder } = require("./controllers");
const { getCustomOrders } = require("./services");
const router = Router();

router.post(
  "/create",
  userAuthentication,
  validate(createCustomOrderDto),
  createCustomOrder
);

router.get("", userAuthentication, getCustomOrders);
router.get("/:_id", getCustomOrder);
// router.put("/status/:id", adminAuthorization, orderStatus);
// router.put("/delivery/info", addDeliveryInfo);

module.exports = router;
