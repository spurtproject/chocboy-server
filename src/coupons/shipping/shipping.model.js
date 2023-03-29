const mongoose = require('mongoose');

const { Schema } = mongoose;

const shippingSchema = new Schema({
  shippingCode: {
    type: String,
    required: true,
    trim: true,
  },
  maxNumberOfUse: {
    type: Number,
    trim: true,
  },
  numberOfTimesUsed: {
    type: Number,
    trim: true,
    default: 0,
  },
  shippingPercentage: {
    type: Number,
    trim: true,
    default: null,
  },
  shippingPrice: {
    type: Number,
    trim: true,
    default: null,
  },
  maxNumberOfUsePerUser: {
    type: Number,
    trim: true,
  },
  validFrom: {
    type: Date,
    trim: true,
  },
  validTill: {
    type: Date,
    trim: true,
  },
});

const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;
