const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
