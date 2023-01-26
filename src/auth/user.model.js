const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    userPin: {
      type: Number,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordMatch = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
