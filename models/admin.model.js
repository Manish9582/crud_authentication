const mongoose = require('mongoose');

let createScehme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});

const formModel=mongoose.model('Form',createScehme);
module.exports=formModel;