const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
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
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
