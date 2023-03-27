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
