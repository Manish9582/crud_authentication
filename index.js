const express = require('express');
const mongoose = require('mongoose');
const routerFrom = require('./routes/form.route.js');
const routerProducts = require('./routes/products.route.js');

const app = express();
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('dotenv').config();

let port = process.env.PORT

app.use('/admin',routerFrom)
app.use('/product',routerProducts)

mongoose.connect(process.env.mongoDB)
    .then(() => console.log("Database is connecting")).
    catch(() => console.log("Database is not connecting"))


app.listen(port, () => console.log(`Server running on ${port}`));