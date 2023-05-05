const { Order } = require("../models");
const Discount = require("../../coupons/discount/discount.model");
const CouponUse = require("../../coupons/coupon-use.model");
const moment = require("moment");
const ApiError = require("../../helpers/error");
const { initiatePaymentService } = require("../../payment/services");

const createOrder = async (user, data) => {
  try {
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
        throw new ApiError(
          400,
          "This discount code is not yet valid for use..."
        );
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
      const amount = netTotalPrice * 100;

      const { transaction, paystackResponse } = await initiatePaymentService({
        amount,
        email: user.email,
        user_id: user._id,
      });

      const rawData = {};
      rawData.customer = user._id;
      rawData.date = date;
      rawData.totalItems = totalItems;
      rawData.totalPrice = totalPrice;
      rawData.transactionId = transaction._id;
      rawData.items = data;

      const generateOrder = await Order.create(rawData);

      const newNumberOfTimesUsed = numberOfTimesUsed + 1;
      await Discount.findOneAndUpdate(
        { discountCode: couponCode.discountCode },
        { numberOfTimesUsed: newNumberOfTimesUsed },
        { new: true }
      );
      return {
        customer: generateOrder.customer,
        totalPrice: generateOrder.totalPrice,
        transactionId: generateOrder.transactionId,
        deliveryAmount: generateOrder.deliveryAmount,
        deliveryStatus: generateOrder.deliveryStatus,
        paymentStatus: generateOrder.paymentStatus,
        ...paystackResponse.data,
      };
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

    const amount = totalPrice * 100;
    const { transaction, paystackResponse } = await initiatePaymentService({
      amount,
      email: user.email,
      user_id: user._id,
    });

    const rawData = {};
    rawData.customer = user._id;
    rawData.date = date;
    rawData.totalItems = totalItems;
    rawData.totalPrice = totalPrice;
    rawData.transactionId = transaction._id;
    rawData.items = data;

    const generateOrder = await Order.create(rawData);

    return {
      customer: generateOrder.customer,
      totalPrice: generateOrder.totalPrice,
      transactionId: generateOrder.transactionId,
      deliveryAmount: generateOrder.deliveryAmount,
      deliveryStatus: generateOrder.deliveryStatus,
      paymentStatus: generateOrder.paymentStatus,
      ...paystackResponse.data,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = createOrder;
