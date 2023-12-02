const { Router } = require('express');
const router = Router();
const postProduct = require('../controllers/postProduct');
const postProductByPk = require('../controllers/deleteProductByPk');

router.post('/product', postProduct);

router.delete('/product/:productId', postProductByPk);

module.exports = router;