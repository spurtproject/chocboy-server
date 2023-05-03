const adminService = require("../services");
const catchAsync = require("express-async-handler");

const getUsers = catchAsync(async (req, res) => {
  const data = await adminService.getUsers(req.query);

  res.status(201).json({
    status: "success",
    message: "All users' info now retrieved... ",
    data,
  });
});

module.exports = getUsers;
