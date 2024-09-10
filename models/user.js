const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:mongoDB@users.cfn02.mongodb.net/");

const userSchema = mongoose.Schema({
    btid: String,
    name: String,
    email: String,
    password: String,
    role : String,
    approval : Number
});

module.exports = mongoose.model('user', userSchema);
