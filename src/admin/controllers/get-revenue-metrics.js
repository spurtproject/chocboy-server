const adminService = require("../services");
const catchAsync = require("express-async-handler");

const getRevenueMetrics = catchAsync(async (req, res) => {
  const data = await adminService.getRevenueMetrics();
  res.status(200).json({
    status: true,
    message: "Revenue Metric / Yearly Transaction Graph now retrieved...",
    data,
  });
});

module.exports = getRevenueMetrics;
