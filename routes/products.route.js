const express = require('express');
const { AdminAddProduct, AdminEditProduct } = require('../controller/product.controller');
const router = express.Router();


router.get('/add-product', AdminAddProduct)

router.get('/edit-product', AdminEditProduct)


module.exports = router