const { Router } = require('express');
const {
  generateShippingCode,
  editDiscountCode,
  getAll,
} = require('./shipping.controllers');
const router = Router();

router.post('/create', generateShippingCode);

router.get('/all', getAll);

router.patch('/:_id', editDiscountCode);

module.exports = router;
