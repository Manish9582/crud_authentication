const express = require('express');
const { AdminAddProduct, AdminEditProduct, AddProduct, showSingleCard, DeleteSingleItem } = require('../controller/product.controller');
const { productCheck } = require('../validation/product.validator');
const upload = require('../middleware/imageUploader.middleware');
const router = express.Router();


router.get('/add-product', AdminAddProduct)

router.get('/edit-product', AdminEditProduct)

router.post(
    '/add/product',
    upload.fields([
        { name: 'product-image', maxCount: 1 },
        { name: 'product-smaples', maxCount: 5 }
    ])
    ,productCheck,AddProduct
);

router.get('/get-single/data/:id',showSingleCard);
router.delete('/delete/:id',DeleteSingleItem)

module.exports = router