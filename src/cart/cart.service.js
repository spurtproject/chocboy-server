const Cart = require('./cart.model');

const createCart = async (data) => {
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

  const generateCart = await Cart.create(rawData);
  return generateCart;
};

const getCart = async (cartId) => {
  return await Cart.findById(cartId);
};

const editCart = async (cartId, data) => {
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

module.exports = { createCart, getCart, editCart };
