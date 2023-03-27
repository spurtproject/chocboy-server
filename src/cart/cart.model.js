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

    totalItems: {
      type: Number,
      trim: true,
    },
    totalPrice: {
      type: Number,
    },

    items: [
      {
        product: {
          type: String,
        },
        choiceQuantity: {
          type: Number,
        },
        unitPrice: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
