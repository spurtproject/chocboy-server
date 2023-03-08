const { Router } = require('express');

const router = Router();
const {
  getUsers,
  getAdminStats,
  getRevenueMetrics,
} = require('./admin.controller');

router.get('/metrics', getRevenueMetrics);
router.get('/all/users', getUsers);
router.get('/stats', getAdminStats);

module.exports = router;
