const { Router } = require("express");
const { getUsers, getAdminStats, getRevenueMetrics } = require("./controllers");

const router = Router();

router.get("/metrics", getRevenueMetrics);
router.get("/all/users", getUsers);
router.get("/stats", getAdminStats);

module.exports = router;
