const ApiError = require('../helpers/error');
const Cart = require('./cart.model');

const createCart = async (userId, data) => {
  const rawData = {};

  rawData.items = data;
  rawData.customer = userId;
  const checkCart = await Cart.findOne({ customer: userId });
  if (checkCart) {
    throw new ApiError(
      400,
      'You already have a cart to your name on this platform'
    );
  }

  return await Cart.create(rawData);
};

const getCart = async (userId) => {
  try {
    return await Cart.findOne({ customer: userId });
  } catch (error) {
    throw new ApiError(400, 'Unable to retrieve cart');
  }
};

const updateCart = async (userId, data) => {
  const cartItems = await Cart.findOne({ customer: userId });
  const currentCartItems = cartItems.items;

  cartItems.items.push(data);
  return await cartItems.save();
};

const editCartItem = async (userId, data, productId) => {
  return await Cart.findOneAndUpdate(
    { 'items._id': productId },
    { $set: { 'items.$': data } },
    { new: true }
  );
};

const deleteCartItem = async (userId, productId) => {
  return await Cart.findOneAndUpdate(
    { customer: userId },
    { $pull: { items: { _id: productId } } },
    { new: true }
  );
};

module.exports = {
  createCart,
  getCart,
  editCartItem,
  updateCart,
  deleteCartItem,
};
