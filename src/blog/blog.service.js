const Blog = require("./blog.model");
const moment = require("moment");
const getSlug = require("./function");
const ApiError = require("../helpers/error");

const createBlog = async (data) => {
  try {
    const rawData = data;
    rawData.slug = getSlug(rawData.title);
    const blog = await Blog.findOne({ slug: rawData.slug });

    if (blog) {
      throw new ApiError(409, "A blog with this title already exists");
    }
    if (!rawData.state) {
      rawData.state = "draft";
    }
    const count = data.body.split(" ").length;
    const avg = 200;
    const counted = count / avg;
    const maincount = Math.ceil(counted);
    rawData.reading_time = `${maincount} min read.`;

    return await Blog.create(rawData);
  } catch (error) {
    throw error;
  }
};

const getBlog = async (blogId) => {
  const { read_count } = await Blog.findById(blogId);
  const readCountIncrement = read_count + 1;
  return await Blog.findByIdAndUpdate(
    blogId,
    { read_count: readCountIncrement },
    { new: true }
  );
};

const getBlogWithSlug = async (slug) => {
  const blog = await Blog.findOne({ slug });
  return blog;
};

const getBlogs = async (criteria = {}) => {
  let response = {};
  const { page, per_page } = criteria;
  const _page = parseInt(page, 10);
  const _per_page = parseInt(per_page, 10) || 10;
  const blogCount = await Blog.count();
  const totalNumberOfPages = blogCount / 10;
  const approximateNumber = Math.ceil(totalNumberOfPages);
  const rawData = await Blog.find()
    .skip(_per_page * (_page - 1))
    .limit(_per_page);
  response.currentPage = _page;
  response.totalNumberOfPages = approximateNumber;
  return { response, rawData };
};

const editBlog = async (blogId, data) => {
  return await Blog.findByIdAndUpdate(blogId, data, { new: true });
};

const publishBlog = async (blogId) => {
  return await Blog.findByIdAndUpdate(
    blogId,
    { state: "published" },
    { new: true }
  );
};

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  publishBlog,
  getBlogWithSlug,
};
