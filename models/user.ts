const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
})();

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
