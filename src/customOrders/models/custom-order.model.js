const mongoose = require("mongoose");
const { PAYMENT_STATUS, getEnumsArray } = require("../../helpers/enums");

const { Schema } = mongoose;

const customOrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    chocolateSize: {
      type: String,
      trim: true,
    },
    chocolateType: [
      {
        type: {
          type: String,
        },
        message: {
          type: String,
        },
      },
    ],
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    amount: {
      type: Number,
      trim: true,
    },
    deliveryInformation: {
      phoneNumber: {
        type: String,
        trim: true,
      },
      fullName: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      additionalInfo: {
        type: String,
      },
    },
    deliveryStatus: {
      type: String,
      trim: true,
      default: "pending",
      enum: ["pending", "shipping", "delivered", "cancelled"],
    },
    paymentStatus: {
      type: String,
      trim: true,
      default: PAYMENT_STATUS.PENDING,
      enum: [...getEnumsArray(PAYMENT_STATUS)],
    },
  },
  { timestamps: true }
);

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);

module.exports = CustomOrder;
