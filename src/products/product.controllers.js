const catchAsync = require('express-async-handler');
const cloudinary = require('../helpers/cloudinary');
const productService = require('./product.service');

const createProduct = catchAsync(async (req, res) => {
  let data = {};
  data = req.body;

  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    data.productImage = avatar.secure_url;
  }

  const product = await productService.createProduct(data);
  res
    .status(201)
    .json({ status: true, message: 'Product now created...', product });
});

module.exports = { createProduct };
