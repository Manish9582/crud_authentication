const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    porductImage: {
        type: String,
        required: true,
    },
    porductSamples: {
        type: [String],
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productDetails: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const createModelProduct = mongoose.model('Product', productModel);
module.exports = createModelProduct;