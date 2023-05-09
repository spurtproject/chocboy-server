const getAdminStats = require("./get-admin-stats");
const getCurrentUser = require("./get-current-user");
const getRevenueMetrics = require("./get-revenue-metrics");
const getUsers = require("./get-users");
const getOrders = require("./get-orders");
const getContacts = require("./get-contacts");

module.exports = {
  getCurrentUser,
  getUsers,
  getAdminStats,
  getRevenueMetrics,
  getOrders,
  getContacts,
};
