const cartService = require('./cart.service');
const catchAsync = require('express-async-handler');

const createCart = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const data = await cartService.createCart(req.user._id, req.body);

  res.status(201).json({ status: true, message: 'Cart now added...', data });
});

const getCart = catchAsync(async (req, res) => {
  const data = await cartService.getCart(req.user._id);
  res
    .status(200)
    .json({ status: true, message: 'Cart now retrieved...', data });
});

const updateCart = async (req, res) => {
  const data = await cartService.updateCart(req.params._id, req.body);
  res
    .status(200)
    .json({ status: 'success', message: 'Cart now updated...', data });
};

const deleteCart = (req, res) => {};

module.exports = { createCart, getCart, updateCart, deleteCart };
