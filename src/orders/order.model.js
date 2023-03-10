const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
      required: true,
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
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    description: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    deliveryAmount: {
      type: Number,
      trim: true,
    },
    deliveryStatus: {
      type: String,
      trim: true,
      default: 'pending',
      enum: ['pending', 'shipping', 'delivered', 'cancelled'],
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
