const catchAsync = require("express-async-handler");
const vendorService = require("../services");

const getVendors = catchAsync(async (req, res) => {
  const data = await vendorService.getVendors();
  res
    .status(201)
    .json({ status: true, message: "All Vendors now retrieved...", data });
});

module.exports = getVendors;
