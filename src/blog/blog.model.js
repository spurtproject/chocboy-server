const mongoose = require("mongoose");
const { BLOG_CLASS, getEnumsArray } = require("../helpers/enums");

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      default: BLOG_CLASS.ARTICLE,
      enum: [...getEnumsArray(BLOG_CLASS)],
    },
    description: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      enum: ["draft", "published"],
    },
    tags: {
      type: String,
      trim: true,
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
