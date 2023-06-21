const blogService = require("./blog.service");
const cloudinary = require("../helpers/cloudinary");
const catchAsync = require("express-async-handler");

const createBlog = catchAsync(async (req, res) => {
  const requestBody = req.body;
  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    requestBody.photo = avatar.secure_url;
  }
  const data = await blogService.createBlog(requestBody);
  res
    .status(201)
    .json({ status: "success", message: "Blog successfully drafted...", data });
});

const getBlog = catchAsync(async (req, res) => {
  const data = await blogService.getBlog(req.params._id);
  res
    .status(200)
    .json({ status: true, message: "Blog successfully retrieved...", data });
});

const getBlogWithSlug = catchAsync(async (req, res) => {
  const data = await blogService.getBlogWithSlug(req.params.slug);
  res
    .status(200)
    .json({ status: true, message: "Blog successfully retrieved...", data });
});

const getBlogs = async (req, res) => {
  const data = await blogService.getBlogs(req.query);
  res
    .status(201)
    .json({ status: "success", message: "All blogs now retrieved...", data });
};

const editBlog = async (req, res) => {
  const updatedbody = req.body;
  if (req.file) {
    const avatar = await cloudinary.uploader.upload(req.file.path);
    updatedbody.photo = avatar.secure_url;
  }
  const data = await blogService.editBlog(req.query.blogId, updatedbody);
  res
    .status(200)
    .json({ status: "success", message: "Blog successfully updated...", data });
};

const publishBlog = catchAsync(async (req, res) => {
  const data = await blogService.publishBlog(req.query.blogId);

  res.status(200).json({
    status: true,
    message: `The blog ${req.query.blogId} was just published...`,
    data,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req.params._id);
  res.status(200).json({
    status: true,
    message: `The blog ${req.params._id} was just deleted...`,
  });
});

module.exports = {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  publishBlog,
  getBlogWithSlug,
};
