const { Router } = require('express');
const router = Router();
const postProduct = require('../controllers/postProduct');

router.post('/product', postProduct);

module.exports = router;