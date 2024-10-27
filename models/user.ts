const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
    btid: String,
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "student" },
    approval: { type: Number, default: 0 },
    chosen_option: { type: String, default: "" },
    d_optn: { type: String, default: "" },
    googleId: { type: String, default: null },
    provider: { type: String, default: "local" } // Track whether the user is logged in with Google or credentials.
});

module.exports = mongoose.model('user', userSchema);
