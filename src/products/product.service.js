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

module.exports = { createProduct, getProduct, getProducts };
