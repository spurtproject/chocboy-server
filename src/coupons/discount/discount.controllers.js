const discountService = require('./discount.service');
const ApiError = require('../../helpers/error');
const catchAsync = require('express-async-handler');

const generateDiscountCode = catchAsync(async (req, res) => {
  const data = await discountService.generateCode(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Discount code now generated...',
    data,
  });
});

const editDiscountCode = catchAsync(async (req, res) => {
  const data = await discountService.updateCode(req.params._id, req.body);
  res
    .status(200)
    .json({ status: true, message: 'Discount code now updated...' });
});

// discount code
const getDiscount = async (req, res) => {
  const data = await discountService.getSingleDiscountCode(req.body.discountCode)
  res
    .status(200)
    .json({status: true, message: 'Discount info fetched successfully', data})
}

const getAll = async (req, res) => {
  const data = await discountService.getDiscountCodes();
  res.status(201).json({
    status: 'success',
    message: 'All discount codes now retrieved...',
    data,
  });
};

const deleteDiscountCoupon = async (req, res) => {
  await discountService.deleteDiscountCode(req.query.coupon);

  res.status(200).json({
    status: true,
    message: 'This discount coupon was just deleted...',
  });
};

module.exports = {
  getDiscount,
  generateDiscountCode,
  editDiscountCode,
  getAll,
  deleteDiscountCoupon,
};
