const { Router } = require('express');
const {
  generateDiscountCode,
  editDiscountCode,
  getAll,
} = require('./discount.controllers');
const router = Router();

router.post('/create', generateDiscountCode);

router.get('/all', getAll);

router.patch('/:_id', editDiscountCode);

module.exports = router;
