const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/bus_poll");

const userSchema = mongoose.Schema({
    btid: String,
    name: String,
    email: String,
    password: String,
    role : String,
    approval : Number
});

module.exports = mongoose.model('user', userSchema);
