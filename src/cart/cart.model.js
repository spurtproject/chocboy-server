const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    items: [
      {
        product: {
          type: String,
        },
        productImage: {
          type: String,
        },
        choiceQuantity: {
          type: Number,
        },
        unitPrice: {
          type: Number,
        },
        customizedText: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
