const { Router } = require('express');
const {
  generateDiscountCode,
  editDiscountCode,
} = require('./discount.controllers');
const router = Router();

router.post('/create', generateDiscountCode);

router.patch('/:_id', editDiscountCode);

module.exports = router;
