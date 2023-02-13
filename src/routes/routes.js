const { Router } = require('express');
const { userAuthentication } = require('../helpers/auth');
const router = Router();

router.use('/auth', require('../auth/auth.routes'));
router.use(
  '/product',
  // userAuthentication,
  require('../products/product.routes')
);

router.use(
  '/category',
  // userAuthentication,
  require('../categories/category.routes')
);

module.exports = router;
