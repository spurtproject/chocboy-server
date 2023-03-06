const { Router } = require('express');
const { generateOrder, getOrder, getOrders } = require('./order.controller');
const { adminAuthorization } = require('../helpers/auth');
const router = Router();

router.post('/generate', generateOrder);
router.get('/all', adminAuthorization, getOrders);
router.get('/:_id', getOrder);

module.exports = router;
