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

  // const checkCart = await Cart.findOne({ customer: userId });
  // if (checkCart) {
  //   throw new ApiError(
  //     400,
  //     'You already have a cart to your name on this platform'
  //   );
  // }

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

  // const newTotalPrice = totalPrice + data.choiceQuantity * data.unitPrice;
  // const newTotalItems = totalItems + data.choiceQuantity;

  // const updatedData = {};
  // updatedData.totalItems = newTotalItems;
  // updatedData.totalPrice = newTotalPrice;

  // return await Cart.findOneAndUpdate(
  //   { customer: userId },
  //   { $set: updatedData },
  //   { new: true }
  // );
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
