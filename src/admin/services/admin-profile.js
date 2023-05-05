const Product = require("../../products/product.model");
const { Order } = require("../../orders/models");
const { Transaction } = require("../../payment/models");

const getAdminDashboardInfo = async () => {
  const numberOfProducts = await Product.count();

  const numberOfOrders = await Order.count();

  const totalSales = await Transaction.aggregate([
    { $match: { status: "successful" } },
    { $group: { _id: "sales", totalSum: { $sum: "$amount" } } },
  ]);

  return { numberOfProducts, numberOfOrders, totalSales };
};

module.exports = getAdminDashboardInfo;
