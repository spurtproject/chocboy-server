const categoryService = require('./category.service');
const catchAsync = require('express-async-handler');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({
    status: true,
    message: 'Product Category now created...',
    category,
  });
});

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();
  res
    .status(200)
    .json({ status: true, message: 'All categories retrieved...', categories });
};

module.exports = { createCategory, getCategories };
