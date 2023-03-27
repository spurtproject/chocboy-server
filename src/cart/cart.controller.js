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
  const data = await cartService.updateCart(req.user._id, req.body);
  res
    .status(200)
    .json({ status: 'success', message: 'Cart now updated...', data });
};

const editCartItem = async (req, res) => {
  const data = await cartService.editCartItem(
    req.user._id,
    req.body,
    req.query.productId
  );
  res
    .status(201)
    .json({ status: true, message: 'Cart item successfully edited...', data });
};

const deleteCart = async (req, res) => {
  await cartService.deleteCartItem(req.user._id, req.query.productId);
  res.status(200).json({ status: true, message: 'Cart item now deleted...' });
};

module.exports = { createCart, getCart, updateCart, editCartItem, deleteCart };
