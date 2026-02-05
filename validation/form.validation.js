const { body } = require('express-validator');

const AdminFormValidator = [
    body('name')
        .notEmpty().withMessage('Name is required').bail()
        .isString().withMessage('Enter only characters'),

    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Enter valid email'),

    body('city')
        .notEmpty().withMessage('City name is required').bail()
        .isString().withMessage('Enter only characters'),

    body('zip')
        .notEmpty().withMessage('Zip code is required').bail()
        .isNumeric().withMessage('Enter only numbers'),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
];

const LoginValidator = [
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Enter only emial'),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
]
module.exports = { AdminFormValidator,LoginValidator };
