const { Router } = require('express');
const { createProduct } = require('./product.controllers');
const upload = require('../helpers/multer');
const { productValidator } = require('../helpers/validator');
const { userAuthentication } = require('../helpers/auth');
const router = Router();

router.post('/create', upload.single('photo'), createProduct);

module.exports = router;
