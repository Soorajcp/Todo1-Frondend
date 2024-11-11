const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    phone: String,  
    password: String,
});

const User = mongoose.model("user", UserSchema);

module.exports = User