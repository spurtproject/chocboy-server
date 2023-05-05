const { Transaction } = require("../../payment/models");
const {
  buildCreditAggregationPipeline,
  convertToMonthlyDataArray,
} = require("../../helpers/utils");

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

module.exports = getRevenueMetrics;
