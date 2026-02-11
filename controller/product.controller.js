const { validationResult } = require("express-validator")
const createModelProduct = require("../models/product.model")
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')

exports.AdminAddProduct = (req, res) => { res.render('products/add-product', { errors: [] }) }

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
        if (item.porductImage) {
            const singlePath = path.join(baseDir, item.porductImage);
            if (fs.existsSync(singlePath)) {
                fs.unlinkSync(singlePath);
            }
        }
        if (item.porductSamples && Array.isArray(item.porductSamples)) {
            for (const img of item.porductSamples) {
                const imgPath = path.join(baseDir, img);
                if (fs.existsSync(imgPath)) {
                    fs.unlinkSync(imgPath);
                }
            }
        }
        await item.deleteOne();
        res.json({ message: "success" });

    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

exports.AdminEditProduct = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect('/');
    }
    let ftechData = await createModelProduct.findById(id);
    res.render('products/edit-product', { data: ftechData })
}

exports.AdminEditUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const body = req.body;
        const files = req.files;
        const baseDir = path.join(__dirname, '..', 'public', 'images');

        let mainImage = body.productImageOld;
        if (files['product-image'] && files['product-image'][0]) {
            mainImage = files['product-image'][0].filename;
            if (body.productImageOld) {
                const oldPath = path.join(baseDir, body.productImageOld);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        let finalSamples = [];
        let oldSamples = Array.isArray(body.oldSamples) ? body.oldSamples : [body.oldSamples];

        oldSamples.forEach((oldImg, index) => {
            const fieldName = `newSample_${index}`;

            if (files[fieldName] && files[fieldName][0]) {
                finalSamples.push(files[fieldName][0].filename);
                if (oldImg) {
                    const oldSamplePath = path.join(baseDir, oldImg);
                    if (fs.existsSync(oldSamplePath)) {
                        fs.unlinkSync(oldSamplePath);
                    }
                }
            } else {
                finalSamples.push(oldImg);
            }
        });


        await createModelProduct.findByIdAndUpdate(
            productId,
            {
                porductImage: mainImage,
                porductSamples: finalSamples,
                productName: body['product-name'],
                category: body.category,
                brand: body.brand,
                price: body.price,
                productDetails: body['product-details']
            },
            { new: true }
        );

        res.redirect('/');

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).send("Update fail ho gaya");
    }
};