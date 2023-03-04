const { Router } = require('express');
const { userAuthentication } = require('../helpers/auth');
const router = Router();
const { getCurrentUser } = require('../admin/admin.controller');
router.use('/auth', require('../auth/auth.routes'));
router.use(
  '/product',
  userAuthentication,
  require('../products/product.routes')
);

router.use(
  '/category',
  // userAuthentication,
  require('../categories/category.routes')
);

router.use('/order', userAuthentication, require('../orders/order.routes'));

// router.use('/admin');
router.use('/user', userAuthentication, getCurrentUser);

module.exports = router;
