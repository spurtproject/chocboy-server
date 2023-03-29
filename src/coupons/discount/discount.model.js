const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountSchema = new Schema({
  discountCode: {
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
  discountPercentage: {
    type: Number,
    trim: true,
    default: null,
  },
  discountPrice: {
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

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;