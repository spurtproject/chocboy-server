const { Router } = require('express');
const { generateOrder } = require('./order.controller');
const router = Router();

router.post('/generate', generateOrder);

module.exports = router;
