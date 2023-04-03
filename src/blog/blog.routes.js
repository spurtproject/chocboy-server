const { Router } = require('express');
const { userAuthentication, adminAuthorization } = require('../helpers/auth');

const {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  publishBlog,
} = require('./blog.controllers');

const upload = require('../helpers/multer');
const router = Router();

router.post(
  '/create',
  userAuthentication,
  adminAuthorization,
  upload.single('photo'),
  createBlog
);

router.get('/all', getBlogs);

router.get('/:_id', getBlog);

router.patch('/publish', userAuthentication, adminAuthorization, publishBlog);

router.put(
  '/edit',
  userAuthentication,
  adminAuthorization,
  upload.single('photo'),
  editBlog
);

router.delete(
  '/delete/:_id',
  userAuthentication,
  adminAuthorization,
  deleteBlog
);

module.exports = router;
