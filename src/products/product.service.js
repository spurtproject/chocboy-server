const Product = require('./product.model');
const ApiError = require('../helpers/error');

const createProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    throw new ApiError(400, 'Unable to create product');
  }
};

const getProduct = async (_id) => {
  try {
    return await Product.findById(_id, { category: 0 });
  } catch (error) {
    throw new ApiError(400, 'Unable to get product...');
  }
};

const getProducts = async () => {
  try {
    return await Product.find().sort({ _id: -1 });
  } catch (error) {
    throw new ApiError(400, 'Unable to retrieve all products...');
  }
};

const updateProduct = async (productId, data) => {
  try {
    return await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
  } catch (error) {
    throw new ApiError(400, 'Unable to update this product...');
  }
};

const deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new ApiError(400, 'Unable to delete product...');
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
