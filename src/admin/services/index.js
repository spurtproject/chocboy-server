const getAdminDashboardInfo = require("./admin-profile");
const getRevenueMetrics = require("./get-revenue-metrics");
const getUserById = require("./get-single-user");
const getUsers = require("./get-users");

module.exports = {
  getUserById,
  getUsers,
  getAdminDashboardInfo,
  getRevenueMetrics,
};
