const { Router } = require('express');
const {
  generateDiscountCode,
  editDiscountCode,
  getAll,
  deleteDiscountCoupon,
} = require('./discount.controllers');
const router = Router();

router.post('/create', generateDiscountCode);

router.get('/all', getAll);

router.patch('/:_id', editDiscountCode);

router.delete('/delete', deleteDiscountCoupon);

module.exports = router;
