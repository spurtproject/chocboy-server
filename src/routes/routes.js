const { Router } = require("express");
const { userAuthentication, adminAuthorization } = require("../helpers/auth");
const router = Router();
const { getCurrentUser } = require("../admin/controllers");
// const { verifyPaymentOrder, verifyPaymentStatus } = require('../orders/order.controller');
const { getLocations } = require("../location/location.controller");

router.use("/auth", require("../auth/auth.routes"));

router.use("/product", require("../products/product.routes"));

router.use("/category", require("../categories/category.routes"));

// router.post('/v1/payment/paystack/callback', verifyPaymentOrder);

// router.post('v2/payment/paystack/webhook', verifyPaymentStatus);

router.use("/payment", require("../payment/payment.routes"));

router.use("/discount", require("../coupons/discount/discount.routes"));

router.use("/shipping", require("../coupons/shipping/shipping.routes"));

router.use("/cart", userAuthentication, require("../cart/cart.routes"));

router.use("/order", userAuthentication, require("../orders/order.routes"));

router.use("/user", userAuthentication, getCurrentUser);

router.get("/location/all", getLocations);

router.use("/blog", require("../blog/blog.routes"));

router.use("/coupon", userAuthentication, require("../coupons/coupon.routes"));

router.use(
  "/location",
  userAuthentication,
  adminAuthorization,
  require("../location/location.routes")
);

router.use(
  "/admin",
  userAuthentication,
  adminAuthorization,
  require("../admin/admin.routes")
);

module.exports = router;
