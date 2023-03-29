const { Router } = require('express');

const router = Router();

router.use('/discount', require('./discount/discount.routes'));

router.use('/shipping', require('./shipping/shipping.routes'));

module.exports = router;
