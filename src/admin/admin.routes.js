const { Router } = require('express');

const router = Router();
const { getUsers } = require('./admin.controller');

router.get('/all/users', getUsers);

module.exports = router;
