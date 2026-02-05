const express = require('express');
const mongoose = require('mongoose');
const routerFrom = require('./routes/form.route.js');
const routerProducts = require('./routes/products.route.js');
const session = require('express-session');
const { isAdminLoggedIn } = require('./middleware/auth.middleware.js');


const app = express();
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('dotenv').config();

let port = process.env.PORT
app.use(session({
    secret: process.env.SessionPort,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000   // 1 day
    }
}))

app.use((req, res, next) => {
  res.locals.admin = req.session.admin || null;
  next();
});
app.use(isAdminLoggedIn)
app.use('/', routerFrom)
app.use('/product', routerProducts)

mongoose.connect(process.env.mongoDB)
    .then(() => console.log("Database is connecting")).
    catch(() => console.log("Database is not connecting"))


app.listen(port, () => console.log(`Server running on ${port}`));