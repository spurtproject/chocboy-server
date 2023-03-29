const mongoose = require('mongoose');

const { Schema } = mongoose;

const couponUseSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  couponCode: {
    type: String,
    trim: true,
  },
  numberOfCouponUse: {
    type: Number,
    default: 1,
  },
});

const CouponUse = mongoose.model('CouponUse', couponUseSchema);

module.exports = CouponUse;
