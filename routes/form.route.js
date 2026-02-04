const express = require('express');
const { AdminLogin, AdminSign, Admindashboard, AddAdmin }
    = require('../controller/form.controller');
const { AdminFormValidator } = require('../validation/form.validation');

const router = express.Router();


router.get('/sign', AdminSign)
router.get('/login', AdminLogin)
router.get('/', Admindashboard)
router.post('/add-new/admin', AdminFormValidator,AddAdmin)

module.exports = router