const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: { type: String, unique: true },
    password: String,
    lastLogin: Date,
    lastLogout: Date  // Add this field to capture logout time
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
