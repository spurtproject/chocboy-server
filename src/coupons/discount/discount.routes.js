const { Router } = require('express');
const {
  getDiscount,
  generateDiscountCode,
  editDiscountCode,
  getAll,
  deleteDiscountCoupon,
} = require('./discount.controllers');
const router = Router();

router.post('/create', generateDiscountCode);

router.get('/all', getAll);

router.post('/single', getDiscount)

router.patch('/:_id', editDiscountCode);

router.delete('/delete', deleteDiscountCoupon);

module.exports = router;
