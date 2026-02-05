const express = require('express');
const { AdminLogin, AdminSign, Admindashboard, AddAdmin, AdminLoginMethod, AdminLogout }
    = require('../controller/form.controller');
const { AdminFormValidator, LoginValidator } = require('../validation/form.validation');

const router = express.Router();


router.get('/sign', AdminSign)
router.get('/login', AdminLogin)
router.get('/', Admindashboard)
router.post('/add-new/admin', AdminFormValidator,AddAdmin)
router.post('/login/admin', LoginValidator,AdminLoginMethod)
router.get('/logout',AdminLogout);
module.exports = router