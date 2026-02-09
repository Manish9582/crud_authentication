const { validationResult } = require("express-validator")
const formModel = require("../models/admin.model")
const bcrypt = require('bcryptjs')
const createModelProduct = require("../models/product.model")


exports.AdminSign = (req, res) => { res.render('sign', { errors: [] }) }
exports.AdminLogin = (req, res) => { res.render('login', { errors: [] }) }
exports.Admindashboard = async (req, res) => {
    const sendProductList =await createModelProduct.find()
    res.render('home', {
        errors: [],
        data: sendProductList,
    })
}

exports.AddAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('sign', {
            errors: errors.array()
        });
    }
    try {
        const { name, email, city, zip, password } = req.body;
        let storePassHash = await bcrypt.hash(password, 10)
        const storedata = await formModel.create({
            name, email, city,
            zipCode: zip,
            password: storePassHash
        });
        if (storedata) {
            res.render('login', { status: 'success', message: "Add Admin successfully" });
        }
    } catch {
        res.render('sign', { status: 'fail', message: "Please try again" });
    }
};


exports.AdminLoginMethod = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('login', { errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let findAdmin = await formModel.findOne({ email })
        if (!findAdmin) {
            return res.render('login', {
                message: { msg: "Email is not found" },
                errors: []
            });
        }
        const isMatch = await bcrypt.compare(password, findAdmin.password);
        if (!isMatch) {
            return res.render('login', {
                message: { msg: "Wrong password" },
                errors: []
            });
        }
        let addSessionData = req.session.admin = {
            name: findAdmin.name,
            id: findAdmin._id,
            email: findAdmin.email
        }
        if (addSessionData) {
            return res.redirect("/");
        }

    } catch {
        return res.render('login', { status: 'fail', message: "Please try again" });
    }
}


exports.AdminLogout = (req, res) => {
    delete req.session.admin;
    res.redirect('/login');
};