const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: { type: String, unique: true },
    password: String,
    lastLogin: { type: Date, default: null },
    
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
