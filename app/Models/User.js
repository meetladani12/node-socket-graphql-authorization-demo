const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }

},{
    timestamps : true
});
const User = mongoose.model('users',userSchema);
module.exports = { User, userSchema }