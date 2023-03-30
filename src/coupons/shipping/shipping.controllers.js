const shippingService = require('./shipping.service');

const catchAsync = require('express-async-handler');

const generateShippingCode = catchAsync(async (req, res) => {
  const data = await shippingService.generateCode(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Shipping code now generated...',
    data,
  });
});

const editDiscountCode = catchAsync(async (req, res) => {
  const data = await shippingService.updateCode(req.params._id, req.body);
  res
    .status(200)
    .json({ status: true, message: 'Discount code now updated...' });
});

const getAll = async (req, res) => {
  const data = await shippingService.getShippingCodes();
  res.status(201).json({
    status: 'success',
    message: 'All shipping codes now retrieved...',
    data,
  });
};

const deleteShippingCoupon = async (req, res) => {
  await shippingService.deleteShippingCode(req.query.coupon);
  res.status(200).json({
    status: true,
    message: 'This shipping coupon was just deleted...',
  });
};

module.exports = {
  generateShippingCode,
  editDiscountCode,
  getAll,
  deleteShippingCoupon,
};
