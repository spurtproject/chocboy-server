const { Router } = require('express');
const {
  generateShippingCode,
  editDiscountCode,
  getAll,
  deleteShippingCoupon,
} = require('./shipping.controllers');
const router = Router();

router.post('/create', generateShippingCode);

router.get('/all', getAll);

router.patch('/:_id', editDiscountCode);

router.delete('/delete', deleteShippingCoupon);

module.exports = router;
