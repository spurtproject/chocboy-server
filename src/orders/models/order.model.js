const mongoose = require("mongoose");
const { PAYMENT_STATUS, getEnumsArray } = require("../../helpers/enums");

const { Schema } = mongoose;

const orderSchema = new Schema(
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
    isCustomizable: {
      type: Boolean,
      default: false,
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
      ref: "Transaction",
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
      default: "pending",
      enum: ["pending", "shipping", "delivered", "cancelled"],
    },
    paymentStatus: {
      type: String,
      trim: true,
      default: PAYMENT_STATUS.PENDING,
      enum: [...getEnumsArray(PAYMENT_STATUS)],
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        choiceQuantity: {
          type: Number,
        },
        customField: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
