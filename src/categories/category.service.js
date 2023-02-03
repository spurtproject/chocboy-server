const Category = require('./category.model');

const createCategory = async (data) => {
  const category = JSON.parse(JSON.stringify(data));
  return await Category.create(category);
};

const getCategories = async () => {
  return await Category.find().sort({ _id: -1 });
};

module.exports = { createCategory, getCategories };
