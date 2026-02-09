const { body } = require('express-validator');

const productCheck = [
    body('product-name')
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 2 }).withMessage('Name too short'),

    body('category')
        .notEmpty().withMessage('Category is required'),

    body('brand')
        .notEmpty().withMessage('Brand is required'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be number'),

    body('product-details')
        .notEmpty().withMessage('Product details required')
        .isLength({ min: 10 }).withMessage('Details too short')
];

module.exports = { productCheck };
