import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    btid: String,
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: { type: String, default: "student" },
    approval: { type: Number, default: 0 },
    chosen_option: { type: String, default: "" },
    d_optn: { type: String, default: "" },
    googleId: { type: String, default: null },
    provider: { type: String, default: "local" } // Track whether the user is logged in with Google or credentials.
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;