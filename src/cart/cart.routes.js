const { Router } = require('express');
const { createCart, updateCart } = require('./cart.controller');
const router = Router();

router.post('/create', createCart);

router.put('/update/:_id', updateCart);

module.exports = router;
