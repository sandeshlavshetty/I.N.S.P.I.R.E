const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
    btid: String,
    name: String,
    email: String,
    password: String,
    role : String,
    approval : Number
});

module.exports = mongoose.model('user', userSchema);
