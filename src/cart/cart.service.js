const ApiError = require("../helpers/error");
const Cart = require("./cart.model");

const createCart = async (userId, data) => {
  const rawData = {};

  rawData.items = data;
  rawData.customer = userId;
  const checkCart = await Cart.findOne({ customer: userId });
  if (checkCart) {
    throw new ApiError(
      400,
      "You already have a cart to your name on this platform"
    );
  }

  return await Cart.create(rawData);
};

const getCart = async (userId) => {
  try {
    return await Cart.findOne({ customer: userId }).populate({
      path: "items.product",
    });
  } catch (error) {
    throw new ApiError(400, "Unable to retrieve cart");
  }
};

const updateCart = async (userId, data) => {
  const cartItems = await Cart.findOne({ customer: userId });
  const currentCartItems = cartItems.items;

  cartItems.items.push(data);
  return await cartItems.save();
};

const editCartItem = async (userId, data, itemId) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { customer: userId, "items._id": itemId },
      {
        $set: {
          "items.$.product": data.product,
          "items.$.choiceQuantity": data.choiceQuantity,
          "items.$.unitPrice": data.unitPrice,
          "items.$.productImage": data.productImage,
        },
      },
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const deleteCartItem = async (userId, itemId) => {
  return await Cart.findOneAndUpdate(
    { customer: userId },
    { $pull: { items: { _id: itemId } } },
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
