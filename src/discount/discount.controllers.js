const discountService = require('./discount.service');
const ApiError = require('../helpers/error');
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
  // if (!req.body.maxNumberOfUse || !req.body.maxNumberOfUsePerUser) {
  //   res.status(403).json({
  //     status: 'access denied',
  //     message: "You're only at liberty to edit number of use and for user",
  //   });
  //   return;
  // }
  const data = await discountService.updateCode(req.params._id, req.body);
  res
    .status(200)
    .json({ status: true, message: 'Discount code now updated...' });
});

const getAll = async (req, res) => {
  const data = await discountService.getDiscountCodes();
  res.status(201).json({
    status: 'success',
    message: 'All discount code now retrieved...',
    data,
  });
};

const deleteDiscountCode = (req, res) => {};

module.exports = { generateDiscountCode, editDiscountCode, getAll };
