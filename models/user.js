const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const User = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

User.plugin(uniqueValidator);
const Users = mongoose.model("User", User);
module.exports = Users;