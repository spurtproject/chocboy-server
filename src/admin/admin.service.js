const User = require("../auth/models/user.model");
const ApiError = require("../helpers/error");
const Product = require("../products/product.model");
const Order = require("../orders/order.model");
const Transaction = require("../transactions/transaction.model");
const {
  buildCreditAggregationPipeline,
  convertToMonthlyDataArray,
} = require("../helpers/utils");

const getUserById = async (id) => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (error) {
    throw new ApiError(400, "Unable to get user");
  }
};

const getUsers = async (criteria = {}) => {
  try {
    let response = {};
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10) || 20;
    const userCount = await User.count();
    const totalNumberOfPages = userCount / 20;
    const approximateNumber = Math.ceil(totalNumberOfPages);

    const rawData = await User.find()
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
    response.currentPage = _page;
    response.totalNumberOfPages = approximateNumber;
    return { response, rawData };
  } catch (error) {
    throw new ApiError(400, "Unable to get all users...");
  }
};
const getAdminDashboardInfo = async () => {
  const numberOfProducts = await Product.count();

  const numberOfOrders = await Order.count();

  const totalSales = await Transaction.aggregate([
    { $match: { status: "successful" } },
    { $group: { _id: "sales", totalSum: { $sum: "$amount" } } },
  ]);

  return { numberOfProducts, numberOfOrders, totalSales };
};

const getRevenueMetrics = async () => {
  const revenueFilter = { status: "successful" };

  let monthlyRevenue = await Transaction.aggregate(
    await buildCreditAggregationPipeline(revenueFilter)
  );
  console.log(monthlyRevenue);
  let monthlyTransactionGraph = await convertToMonthlyDataArray(
    monthlyRevenue,
    "totalAmount"
  );
  return monthlyTransactionGraph;
};

module.exports = {
  getUserById,
  getUsers,
  getAdminDashboardInfo,
  getRevenueMetrics,
};
