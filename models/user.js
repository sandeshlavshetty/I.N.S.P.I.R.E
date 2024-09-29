const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
    btid: String,
    name: String,
    email: String,
    password: String,
    role : String,
    approval : Number,
    chosen_option: { type: String, default: "" },  // Added field
    d_optn: { type: String, default: "" }                 // Added field
});

module.exports = mongoose.model('user', userSchema);
