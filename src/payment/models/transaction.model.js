const mongoose = require("mongoose");
const { getEnumsArray, TRANSACTION_STATUS } = require("../../helpers/enums");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      default: TRANSACTION_STATUS.PENDING,
      enum: [...getEnumsArray(TRANSACTION_STATUS)],
    },
    transactionRef: {
      type: String,
      required: true,
    },
    lastTransactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
