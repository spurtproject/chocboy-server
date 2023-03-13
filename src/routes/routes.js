const { Router } = require('express');
const { userAuthentication, adminAuthorization } = require('../helpers/auth');
const router = Router();
const { getCurrentUser } = require('../admin/admin.controller');
router.use('/auth', require('../auth/auth.routes'));
router.use(
  '/product',
  userAuthentication,
  require('../products/product.routes')
);

router.use('/category', require('../categories/category.routes'));

router.use('/order', userAuthentication, require('../orders/order.routes'));

router.use('/user', userAuthentication, getCurrentUser);

router.use('/location', require('../location/location.routes'));

router.use(
  '/admin',
  userAuthentication,
  adminAuthorization,
  require('../admin/admin.routes')
);

module.exports = router;
