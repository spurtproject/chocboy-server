const { Router } = require('express');
const { createCategory, getCategories } = require('./category.controller');
const router = Router();

router.post('/create', createCategory);

router.get('/all', getCategories);

module.exports = router;
