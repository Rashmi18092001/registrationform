const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
