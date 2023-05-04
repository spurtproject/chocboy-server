const mongoose = require("mongoose");
const {
  PLATFORM,
  getEnumsArray,
  TRANSACTION_STATUS,
} = require("../../helpers/enums");

const { Schema } = mongoose;

const paymentSchema = new Schema(
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
      enum: [...getEnumsArray(TRANSACTION_STATUS)],
    },
    transactionRef: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      default: "PAYSTACK",
      enum: [...getEnumsArray(PLATFORM)],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
