const { Router } = require('express');
const {
  getSingleShippingCode,
  generateShippingCode,
  editDiscountCode,
  getAll,
  deleteShippingCoupon,
} = require('./shipping.controllers');
const router = Router();

router.post('/create', generateShippingCode);

router.get('/single', getSingleShippingCode);

router.get('/all', getAll);

router.patch('/:_id', editDiscountCode);

router.delete('/delete', deleteShippingCoupon);

module.exports = router;
