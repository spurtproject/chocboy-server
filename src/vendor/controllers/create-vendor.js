const catchAsync = require("express-async-handler");
const vendorService = require("../services");

const createVendor = catchAsync(async (req, res) => {
  let data = req.body;

  const vendor = await vendorService.createVendor(data);
  res
    .status(201)
    .json({ status: true, message: "Vendor now created...", vendor });
});

module.exports = createVendor;
