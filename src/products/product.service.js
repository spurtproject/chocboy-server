const Product = require('./product.model');
const ApiError = require('../helpers/error');

const createProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    throw new ApiError(400, 'Unable to create product');
  }
};

module.exports = { createProduct };
