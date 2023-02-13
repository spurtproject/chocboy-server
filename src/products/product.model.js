const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  productImage: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
