const catchAsync = require("express-async-handler");
const vendorService = require("../services");

const getVendor = catchAsync(async (req, res) => {
  const data = await vendorService.getVendor(req.params._id);
  res.status(201).json({
    status: true,
    message: `Vendor ${req.params._id} successfully retrieved...`,
    data,
  });
});

module.exports = getVendor;
