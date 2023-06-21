const mongoose = require("mongoose");
const { Schema } = mongoose;

const treasureSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    socialMedia: {
      type: String,
      trim: true,
    },
    numOfFriends: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Treasure = mongoose.model("Treasure", treasureSchema);

module.exports = Treasure;
