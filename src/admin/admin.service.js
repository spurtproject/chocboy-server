const User = require('../auth/user.model');
const ApiError = require('../helpers/error');
const Product = require('../products/product.model');
const Order = require('../orders/order.model');
const Transaction = require('../transactions/transaction.model');

const getUserById = async (id) => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (error) {
    throw new ApiError(400, 'Unable to get user');
  }
};

const getUsers = (criteria = {}) => {
  try {
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10) || 20;
    return User.find()
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
  } catch (error) {
    throw new ApiError(400, 'Unable to get all users...');
  }
};
const getAdminDashboardInfo = async () => {
  const numberOfProducts = await Product.count();

  const numberOfOrders = await Order.count();

  const totalSales = await Transaction.aggregate([
    { $match: { status: 'successful' } },
    { $group: { _id: 'sales', totalSum: { $sum: '$amount' } } },
  ]);

  return { numberOfProducts, numberOfOrders, totalSales };
};

module.exports = {
  getUserById,
  getUsers,
  getAdminDashboardInfo,
};
