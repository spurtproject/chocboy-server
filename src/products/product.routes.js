const { Router } = require('express');
const {
  createProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
} = require('./product.controllers');
const { adminAuthorization } = require('../helpers/auth');
const upload = require('../helpers/multer');
const { productValidator } = require('../helpers/validator');
const { userAuthentication } = require('../helpers/auth');
const router = Router();

router.post(
  '/create',
  upload.single('photo'),
  adminAuthorization,
  createProduct
);
router.get('/:_id', getProduct);
router.get('/all/products', getProducts);
router.put('/edit', upload.single('photo'), adminAuthorization, editProduct);
router.delete('/delete/:id', adminAuthorization, deleteProduct);

module.exports = router;
