const express = require('express');
const { AdminAddProduct, AdminEditProduct, AddProduct, showSingleCard, DeleteSingleItem, AdminEditUpdateProduct } = require('../controller/product.controller');
const { productCheck } = require('../validation/product.validator');
const upload = require('../middleware/imageUploader.middleware');
const router = express.Router();


router.get('/add-product', AdminAddProduct)

router.post(
    '/add/product',
    upload.fields([
        { name: 'product-image', maxCount: 1 },
        { name: 'product-smaples', maxCount: 5 }
    ])
    , productCheck, AddProduct
);

router.get('/get-single/data/:id', showSingleCard);
router.delete('/delete/:id', DeleteSingleItem)
router.get('/edit/:id', AdminEditProduct)

let fields = [{ name: 'product-image', maxCount: 1 }];
for (let i = 0; i < 10; i++) {
    fields.push({ name: `newSample_${i}`, maxCount: 1 });
}

router.post('/update/:id', upload.fields(fields), AdminEditUpdateProduct);

module.exports = router