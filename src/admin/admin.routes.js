const { Router } = require('express');

const router = Router();
const { getUsers, getAdminStats } = require('./admin.controller');

router.get('/all/users', getUsers);
router.get('/stats', getAdminStats);

module.exports = router;
