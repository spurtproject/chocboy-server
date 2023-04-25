const Order = require('./order.model');
const Transaction = require('../transactions/transaction.model');
const Discount = require('../coupons/discount/discount.model');
const CouponUse = require('../coupons/coupon-use.model');
const Shipping = require('../coupons/shipping/shipping.model');
const moment = require('moment');
const { initiatePayment, verifyPayment } = require('../helpers/paystack');
const ApiError = require('../helpers/error');
const { raw } = require('express');

const createWindowOrder = async (data) => {
  const totalPrice = await data.reduce((prev, curr) => {
    prev += curr.unitPrice * curr.choiceQuantity;
    return prev;
  }, 0);
  const totalItems = await data.reduce((prev, curr) => {
    prev += curr.choiceQuantity;
    return prev;
  }, 0);
  const date = moment().format('L');

  const rawData = {};
  rawData.date = date;
  rawData.totalItems = totalItems;
  rawData.totalPrice = totalPrice;
  rawData.items = data;
  const generateOrder = await Order.create(rawData);
  return generateOrder;
};

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
        'This discount code is expired and thus invalid...'
      );
    }
    if (validFrom > Date.now()) {
      throw new ApiError(400, 'This discount code is not yet valid for use...');
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
        'You have reached your maximum use limit for this Coupon Code...'
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
    const date = moment().format('L');
    const form = {};
    form.amount = netTotalPrice * 100;
    form.email = user.email;
    form.metadata = {
      userId: user._id,
      // address: user.address,
      
    };
    let payStackRespone;
    await initiatePayment(form, (err, body) => {
      if(err){
        throw new ApiError(400, "Error initializing payment")
      }
      payStackRespone = JSON.parse(body)
    });
    // const paystackRef = payStackRespone.data.data.reference;
    const paystackRef = payStackRespone.data.reference;

    const transactionData = {};
    transactionData.customer = user._id;
    transactionData.amount = netTotalPrice; // CHECK what should be passed here
    transactionData.status = 'pending';
    transactionData.transactionRef = paystackRef // check if this gives an error

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
  const date = moment().format('L');

  const form = {};
  form.amount = netTotal * 100;
  form.email = user.email;
  form.metadata = {
    userId: user._id,
  };
  let payStackRespone;
  await initiatePayment(form, (err, body) => {
    if(err){
      throw new ApiError(400, "Error initializing payment")
    }
    payStackRespone = JSON.parse(body)
  });
  const paystackRef = payStackRespone.data.reference;


  const transactionData = {};
  transactionData.customer = user._id;
  transactionData.amount = totalPrice;
  transactionData.status = 'pending';
  transactionData.transactionRef = paystackRef
  
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
          'This shipping code is expired and thus invalid...'
        );
      }
      if (validFrom > Date.now()) {
        throw new ApiError(
          400,
          'This shipping code is not yet valid for use...'
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
          'You have reached your maximum use limit for this Coupon Code...'
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
    await Order.findByIdAndUpdate(
      orderId,
      { $set: data },
      { new: true }
    );
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
      if(err){
        throw new ApiError(400, "Error initializing payment")
      }
      payStackRespone = JSON.parse(body)
    });
    const paystackRef = payStackRespone.data.reference;

    await Transaction.findByIdAndUpdate(
      transactionId,
      { transactionRef: paystackRef },
      { new: true }
    );
    return payStackRespone;

  } catch (error) {
    throw new ApiError(400, 'Unable to update order');
  }
};

const verifyOrder = async (paymentRef) => {
  // const result = await verifyPayment(paymentRef);
  // const transactionRef = result.data.data.reference;
  // const transactionRef = req.query.reference

  let paymentResult
  await verifyPayment(paymentRef, (err, body) => {
    if(err){
      throw new ApiError(400, 'Unable to verify payment')
    }
    paymentResult = JSON.parse(body)
  });
  const transactionRef = paymentResult.data.reference;

  await Transaction.findOneAndUpdate(
    {
      transactionRef: transactionRef,
    },
    { status: 'successful' },
    { new: true }
  );
  return 'confirmed';
};

const getOrders = async (criteria = {}) => {
  try {
    let response = {};
    const { page, per_page } = criteria;
    const _page = parseInt(page, 10);
    const _per_page = parseInt(per_page, 10);

    const userCount = await Order.count();
    const totalNumberOfPages = userCount / 20;
    const approximateNumber = Math.ceil(totalNumberOfPages);
    const rawData = await Order.find()
      .populate('customer')
      .populate('transactionId')
      .skip(_per_page * (_page - 1))
      .limit(_per_page);
    const nextPage = _page + 1;
    response.currentPage = _page;
    response.nextPage = nextPage;
    response.totalNumberOfPages = approximateNumber;
    return { response, rawData };
  } catch (error) {
    throw new ApiError(400, 'Unable to get orders');
  }
};

const getOrder = async (id) => {
  try {
    return await Order.findById(id)
      .populate('transactionId')
      .populate('customer');
  } catch (error) {
    throw new ApiError(400, 'Unable to get order');
  }
};

module.exports = {
  createWindowOrder,
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  verifyOrder,
};
