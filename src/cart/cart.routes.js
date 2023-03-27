const { Router } = require('express');
const { createCart, getCart, updateCart } = require('./cart.controller');
const router = Router();

router.post('/create', createCart);

router.get('/single/', getCart);

router.put('/update/:_id', updateCart);

module.exports = router;
