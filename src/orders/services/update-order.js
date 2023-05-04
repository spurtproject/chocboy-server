const Order = require("../models");
const { Transaction } = require("../../payment/models");
const CouponUse = require("../../coupons/coupon-use.model");
const Shipping = require("../../coupons/shipping/shipping.model");
const { initiatePayment } = require("../../helpers/paystack");
const ApiError = require("../../helpers/error");

const updateOrder = async (user, orderId, data) => {
  try {
    if (data.shippingCode) {
      const shippingCode = data.shippingCode;
      delete data.shippingCode;

      const checkShippingCode = await Shipping.findOne({
        shippingCode: shippingCode,
      });
      if (!checkShippingCode) {
        throw new ApiError(
          400,
          "This shipping code either doesn't exist or is invalid"
        );
      }
      const {
        numberOfTimesUsed,
        maxNumberOfUse,
        maxNumberOfUsePerUser,
        validFrom,
        validTill,
      } = await Shipping.findOne({ shippingCode: shippingCode });

      if (validTill < Date.now()) {
        throw new ApiError(
          400,
          "This shipping code is expired and thus invalid..."
        );
      }
      if (validFrom > Date.now()) {
        throw new ApiError(
          400,
          "This shipping code is not yet valid for use..."
        );
      }
      const checkShippingCodeUse = await CouponUse.findOne({
        customer: user._id,
        couponCode: shippingCode,
      });
      if (checkShippingCodeUse) {
        const couponUseIncrement = checkShippingCodeUse.numberOfCouponUse + 1;
        await CouponUse.findOneAndUpdate(
          { customer: user._id, couponCode: shippingCode },
          { numberOfCouponUse: couponUseIncrement },
          { new: true }
        );
      }
      if (!checkShippingCodeUse) {
        const rawCouponData = {};
        rawCouponData.customer = user._id;
        rawCouponData.couponCode = shippingCode;
        numberOfCouponUse = 1;
        const createNumberOfTimesUsed = await CouponUse.create(rawCouponData);
      }
      const createCouponUse = await CouponUse.findOne({
        customer: user._id,
        couponCode: shippingCode,
      });
      if (numberOfTimesUsed === maxNumberOfUse) {
        throw new ApiError(
          400,
          "Oops! This shipping code has reached it's maximum Use Limit..."
        );
      }
      if (createCouponUse.numberOfCouponUse > maxNumberOfUsePerUser) {
        throw new ApiError(
          400,
          "You have reached your maximum use limit for this Coupon Code..."
        );
      }
      const { totalPrice, transactionId } = await Order.findById(orderId);
      console.log(totalPrice, transactionId);
      console.log(shippingCode);
      const { shippingPercentage, shippingPrice } = await Shipping.findOne({
        shippingCode: shippingCode,
      });
      if (shippingPrice !== null && shippingPercentage === null) {
        const newShippingCost = data.deliveryAmount - shippingPrice;
        const newNetTotal = totalPrice + newShippingCost;
        const mytotal = await Order.findByIdAndUpdate(
          orderId,
          { totalPrice: newNetTotal },
          { new: true }
        );
        const newCost = await Order.findByIdAndUpdate(
          orderId,
          { deliveryAmount: newShippingCost },
          { new: true }
        );
      }
      if (shippingPercentage !== null && shippingPrice === null) {
        const newShippingCost =
          data.deliveryAmount - shippingPercentage * data.deliveryAmount;

        const newNetTotal = totalPrice + newShippingCost;
        await Order.findByIdAndUpdate(
          orderId,
          { totalPrice: newNetTotal },
          { new: true }
        );
        await Order.findByIdAndUpdate(
          orderId,
          { deliveryAmount: newShippingCost },
          { new: true }
        );
      }
      const newNumberOfTimesUsed = numberOfTimesUsed + 1;
      await Shipping.findOneAndUpdate(
        { shippingCode: shippingCode },
        { numberOfTimesUsed: newNumberOfTimesUsed },
        { new: true }
      );
    }

    const netTotal = data.deliveryAmount + totalPrice;
    const newTotal = { totalPrice: netTotal };
    await Order.findByIdAndUpdate(orderId, { $set: newTotal }, { new: true });
    // return await Order.findByIdAndUpdate(
    await Order.findByIdAndUpdate(orderId, { $set: data }, { new: true });
    // Inititate Paystack payment
    // const payStackForm = {};
    // payStackForm.amount = netTotal * 100;
    // payStackForm.email = user.email;
    // payStackForm.metadata = {
    //   userId: user._id,
    // };
    // const payStackReturn = await initiatePayment(payStackForm);

    // const paystackRef = payStackReturn.data.data.reference;

    const form = {};
    form.amount = netTotal * 100;
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

    await Transaction.findByIdAndUpdate(
      transactionId,
      { transactionRef: paystackRef },
      { new: true }
    );
    return payStackRespone;
  } catch (error) {
    throw new ApiError(400, "Unable to update order");
  }
};

module.exports = updateOrder;
