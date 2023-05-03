const Order = require("../models");
const Transaction = require("../../transactions/transaction.model");
const Discount = require("../../coupons/discount/discount.model");
const CouponUse = require("../../coupons/coupon-use.model");
const moment = require("moment");
const { initiatePayment } = require("../../helpers/paystack");
const ApiError = require("../../helpers/error");

const createOrder = async (user, data) => {
  if (data[data.length - 1].discountCode) {
    const couponCode = data.pop();
    const checkDiscountCode = await Discount.findOne({
      discountCode: couponCode.discountCode,
    });
    if (!checkDiscountCode) {
      throw new ApiError(
        400,
        "This discount code either doesn't exist or is invalid..."
      );
    }

    const {
      numberOfTimesUsed,
      maxNumberOfUse,
      maxNumberOfUsePerUser,
      validFrom,
      validTill,
    } = await Discount.findOne({ discountCode: couponCode.discountCode });

    if (validTill < Date.now()) {
      throw new ApiError(
        400,
        "This discount code is expired and thus invalid..."
      );
    }
    if (validFrom > Date.now()) {
      throw new ApiError(400, "This discount code is not yet valid for use...");
    }
    const checkDiscountCodeUse = await CouponUse.findOne({
      customer: user._id,
      couponCode: couponCode.discountCode,
    });
    if (checkDiscountCodeUse) {
      const couponUseIncrement = checkDiscountCodeUse.numberOfCouponUse + 1;
      await CouponUse.findOneAndUpdate(
        { customer: user._id, couponCode: couponCode.discountCode },
        { numberOfCouponUse: couponUseIncrement },
        { new: true }
      );
    }
    if (!checkDiscountCodeUse) {
      const rawCouponData = {};
      rawCouponData.customer = user._id;
      rawCouponData.couponCode = couponCode.discountCode;
      numberOfCouponUse = 1;
      const createNumberOfTimesUsed = await CouponUse.create(rawCouponData);
    }
    const createCouponUse = await CouponUse.findOne({
      customer: user._id,
      couponCode: couponCode.discountCode,
    });

    if (numberOfTimesUsed === maxNumberOfUse) {
      throw new ApiError(
        400,
        "Oops! This discount code has reached it's maximum Use Limit..."
      );
    }
    if (createCouponUse.numberOfCouponUse > maxNumberOfUsePerUser) {
      throw new ApiError(
        400,
        "You have reached your maximum use limit for this Coupon Code..."
      );
    }

    let netTotalPrice;
    let grossTotalPrice;
    const { discountPercentage, discountPrice } = await Discount.findOne({
      discountCode: couponCode.discountCode,
    });
    if (discountPercentage !== null && discountPrice === null) {
      grossTotalPrice = await data.reduce((prev, curr) => {
        prev += curr.unitPrice * curr.choiceQuantity;
        return prev;
      }, 0);
      const discount = discountPercentage * grossTotalPrice;

      netTotalPrice = grossTotalPrice - discount;
    }
    if (discountPrice !== null && discountPercentage === null) {
      grossTotalPrice = await data.reduce((prev, curr) => {
        prev += curr.unitPrice * curr.choiceQuantity;
        return prev;
      }, 0);
      netTotalPrice = grossTotalPrice - discountPrice;
    }
    const totalItems = await data.reduce((prev, curr) => {
      prev += curr.choiceQuantity;
      return prev;
    }, 0);

    // PAYSTCK gateway here
    const date = moment().format("L");
    const form = {};
    form.amount = netTotalPrice * 100;
    form.email = user.email;
    form.metadata = {
      userId: user._id,
    };
    let payStackRespone;
    await initiatePayment(form, (err, body) => {
      if (err) {
        throw new ApiError(400, "Error initializing payment");
      }
      payStackRespone = JSON.parse(body);
    });
    // const paystackRef = payStackRespone.data.data.reference;
    const paystackRef = payStackRespone.data.reference;

    const transactionData = {};
    transactionData.customer = user._id;
    transactionData.amount = netTotalPrice; // CHECK what should be passed here
    transactionData.status = "pending";
    transactionData.transactionRef = paystackRef; // check if this gives an error

    const createTransaction = await Transaction.create(transactionData);
    const transactionId = createTransaction._id;
    const rawData = {};
    rawData.customer = user._id;
    rawData.date = date;
    rawData.totalItems = totalItems;
    rawData.totalPrice = totalPrice;
    rawData.transactionId = transactionId;
    rawData.items = data;

    const generateOrder = await Order.create(rawData);

    const newNumberOfTimesUsed = numberOfTimesUsed + 1;
    await Discount.findOneAndUpdate(
      { discountCode: couponCode.discountCode },
      { numberOfTimesUsed: newNumberOfTimesUsed },
      { new: true }
    );
    return generateOrder;
  }

  const totalPrice = await data.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);

  // PAYSTCK gateway here
  const date = moment().format("L");

  const form = {};
  form.amount = totalPrice * 100;
  form.email = user.email;
  form.metadata = {
    userId: user._id,
  };
  let payStackRespone;
  await initiatePayment(form, (err, body) => {
    if (err) {
      throw new ApiError(400, "Error initializing payment");
    }
    payStackRespone = JSON.parse(body);
  });
  const paystackRef = payStackRespone.data.reference;

  const transactionData = {};
  transactionData.customer = user._id;
  transactionData.amount = totalPrice;
  transactionData.status = "pending";
  transactionData.transactionRef = paystackRef;

  const createTransaction = await Transaction.create(transactionData);
  const transactionId = createTransaction._id;
  const rawData = {};
  rawData.customer = user._id;
  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.transactionId = transactionId;
  rawData.items = data;

  const generateOrder = await Order.create(rawData);

  return generateOrder;
};

module.exports = createOrder;
