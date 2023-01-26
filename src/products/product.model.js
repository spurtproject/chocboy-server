const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema;

const productSchema = new Schema({
  id: ObjectId,
  title: {
    type: String,
    trim: true,
    required: true,
  },
  thumbNail: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
