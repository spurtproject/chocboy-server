const ApiError = require('../helpers/error');
const Cart = require('./cart.model');

const createCart = async (userId, data) => {
  const totalPrice = await data.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);

  const rawData = {};

  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.items = data;
  rawData.customer = userId;

  const generateCart = await Cart.create(rawData);
  return generateCart;
};

const getCart = async (userId) => {
  try {
    return await Cart.findOne({ customer: userId });
  } catch (error) {
    throw new ApiError(400, 'Unable to retrieve cart');
  }
};

const updateCart = async (cartId, data) => {
  const { totalItems, totalPrice } = await Cart.findById(cartId);
  const cartItems = await Cart.findById(cartId);
  const currentCartItems = cartItems.items;

  cartItems.items.push(data);
  const saveme = await cartItems.save();

  const newTotalPrice = totalPrice + data.choiceQuantity * data.unitPrice;
  const newTotalItems = totalItems + data.choiceQuantity;

  const updatedData = {};
  updatedData.totalItems = newTotalItems;
  updatedData.totalPrice = newTotalPrice;

  return await Cart.findByIdAndUpdate(
    cartId,
    { $set: updatedData },
    { new: true }
  );
};

module.exports = { createCart, getCart, updateCart };
