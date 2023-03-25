const cartService = require('./cart.service');
const catchAsync = require('express-async-handler');

const createCart = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const data = await cartService.createCart(req.body);

  res.status(201).json({ status: true, message: 'Cart now added...', data });
});

const updateCart = async (req, res) => {
  const data = await cartService.editCart(req.params._id, req.body);
  res
    .status(200)
    .json({ status: 'success', message: 'Cart now updated...', data });
};

const deleteCart = (req, res) => {};

module.exports = { createCart, updateCart, deleteCart };
