const adminService = require("../services");
const catchAsync = require("express-async-handler");

const getAdminStats = catchAsync(async (req, res) => {
  const data = await adminService.getAdminDashboardInfo();
  res.status(202).json({
    status: true,
    message: "Admin dashboard stats now Retrieved...",
    data,
  });
});

module.exports = getAdminStats;
