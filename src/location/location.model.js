const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  state: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    trim: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
