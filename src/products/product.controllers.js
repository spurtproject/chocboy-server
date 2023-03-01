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

const getProduct = catchAsync(async (req, res) => {
  const data = await productService.getProduct(req.params._id);
  res.status(201).json({
    status: true,
    message: `Product ${req.params._id} successfully retrieved...`,
    data,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const data = await productService.getProducts();
  res
    .status(201)
    .json({ status: true, message: 'All products now retrieved...', data });
});

const editProduct = catchAsync(async (req, res) => {
  const updatedBody = req.body;
  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    updatedBody.productImage = avatar.secure_url;
  }
  const data = await productService.updateProduct(
    req.query.productId,
    updatedBody
  );
  res.status(201).json({
    status: 'success',
    message: `Product with the id ${req.query.productId} was successfully updated...`,
    data,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  res.status(200).json({
    status: true,
    message: `The product with the id ${req.params.id} was just deleted...`,
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
};
