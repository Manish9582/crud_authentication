const { validationResult } = require("express-validator")
const formModel = require("../models/admin.model")
const bcrypt = require('bcryptjs')


exports.AdminSign = (req, res) => { res.render('sign', { errors: 0 }) }
exports.AdminLogin = (req, res) => { res.render('login') }
exports.Admindashboard = (req, res) => {
    res.render('home')
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
            name,email,city,
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

