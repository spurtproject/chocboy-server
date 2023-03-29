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

module.exports = { generateShippingCode, editDiscountCode, getAll };
