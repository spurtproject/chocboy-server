const { Router } = require('express');
const {
  generateOrder,
  getOrder,
  getOrders,
  addDeliveryInfo,
  verifyPaymentOrder,
} = require('./order.controller');
const { adminAuthorization } = require('../helpers/auth');
const router = Router();

router.post('/generate', generateOrder);

// router.post('/verify', verifyPaymentOrder)

router.get('/all', adminAuthorization, getOrders);
router.get('/:_id', getOrder);
router.put('/delivery/info', addDeliveryInfo);

module.exports = router;
