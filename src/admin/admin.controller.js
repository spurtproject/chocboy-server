const adminService = require('./admin.service');
const catchAsync = require('express-async-handler');

const getCurrentUser = catchAsync(async (req, res) => {
  let user;

  if (req.query.userId) {
    user = await adminService.getUserById(req.query.userId);
  } else {
    user = await adminService.getUserById(req.user._id);
  }

  res
    .status(200)
    .json({ status: true, message: 'User now retrieved... ', user });
});

const getUsers = catchAsync(async (req, res) => {
  const data = await adminService.getUsers(req.query);

  res.status(201).json({
    status: 'success',
    message: "All users' info now retrieved... ",
    data,
  });
});

const getAdminStats = catchAsync(async (req, res) => {
  const data = await adminService.getAdminDashboardInfo();
  res
    .status(202)
    .json({
      status: true,
      message: 'Admin dashboard stats now Retrieved...',
      data,
    });
});

module.exports = { getCurrentUser, getUsers, getAdminStats };
