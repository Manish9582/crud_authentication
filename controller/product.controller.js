const { validationResult } = require("express-validator")
const createModelProduct = require("../models/product.model")
const path = require('path');
const fs = require('fs')

exports.AdminAddProduct = (req, res) => { res.render('products/add-product', { errors: [] }) }
exports.AdminEditProduct = (req, res) => { res.render('products/edit-product') }

exports.AddProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('products/add-product', { errors: errors.array() })
    }
    try {
        const mainImage = req.files['product-image'][0]?.filename;
        const sampleImages = req.files['product-smaples']?.map(file => file.filename);
        const dataSubmit = await createModelProduct.create({
            porductImage: mainImage,
            porductSamples: sampleImages,
            productName: req.body['product-name'],
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            productDetails: req.body['product-details']
        })
        const sendProductList = await createModelProduct.find()
        res.render('home', {
            errors: [],
            data: sendProductList,
        })
    } catch (err) {
        console.log(err);
        res.send("Error uploading product");
    }
}


exports.showSingleCard = async (req, res) => {
    try {
        const id = req.params.id;
        const sendSingle = await createModelProduct.findById(id);
        if (!sendSingle) {
            return res.status(404).json({ message: "Data not found", id: id });
        }
        res.json({
            message: "success",
            data: sendSingle
        });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

exports.DeleteSingleItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await createModelProduct.findById(id);

        if (!item) {
            return res.status(404).json({ message: "Data not found" });
        }

        const baseDir = path.join(__dirname, '..', 'public', 'images');
        const singlePath = path.join(baseDir, item.porductImage);
        if (fs.existsSync(singlePath)) {
            fs.unlinkSync(singlePath);
        }

        for (const img of item.porductSamples) {
            const imgPath = path.join(baseDir, img);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await item.deleteOne();

        const sendProductList = await createModelProduct.find()
        res.render('home', {
            errors: [],
            data: sendProductList,
        })

    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};
