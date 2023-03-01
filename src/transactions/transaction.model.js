const mongoose = require('mongoose');
const { getEnumsArray, TRANSACTION_STATUS } = require('../helpers/enums');

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: [...getEnumsArray(TRANSACTION_STATUS)],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
