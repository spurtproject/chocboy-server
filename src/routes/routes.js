const { Router } = require('express');
const { userAuthentication, adminAuthorization } = require('../helpers/auth');
const router = Router();
const { getCurrentUser } = require('../admin/admin.controller');
const { verifyPaymentOrder } = require('../orders/order.controller');
router.use('/auth', require('../auth/auth.routes'));
router.use(
  '/product',
  userAuthentication,
  require('../products/product.routes')
);
const { getLocations } = require('../location/location.controller');

router.use('/category', require('../categories/category.routes'));

router.get('/order/paystack/callback', verifyPaymentOrder);

router.use('/order', userAuthentication, require('../orders/order.routes'));

router.use('/user', userAuthentication, getCurrentUser);

router.get('/location/all', userAuthentication, getLocations);

router.use(
  '/location',
  userAuthentication,
  adminAuthorization,
  require('../location/location.routes')
);

router.use(
  '/admin',
  userAuthentication,
  adminAuthorization,
  require('../admin/admin.routes')
);

module.exports = router;
