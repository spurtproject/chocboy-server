const { Router } = require("express");
const {
  getUsers,
  getAdminStats,
  getRevenueMetrics,
  getOrders,
  getContacts,
} = require("./controllers");
const { getAllOrders } = require("../customOrders/controllers");

const router = Router();

router.get("/metrics", getRevenueMetrics);
router.get("/all/users", getUsers);
router.get("/stats", getAdminStats);
router.get("/orders", getOrders);
router.get("/custom-orders", getAllOrders);
router.get("/contacts", getContacts);

module.exports = router;
