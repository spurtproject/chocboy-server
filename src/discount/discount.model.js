const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountSchema = new Schema({
  discountCode: {
    type: String,
    required: true,
    trim: true,
  },
  maxNumberOfUsers: {
    type: Number,
    trim: true,
  },
  maximumUse: {
    type: Number,
    trim: true,
  },
  validity: {},
});
