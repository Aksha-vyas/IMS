const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user = new Schema({
    userId: String,
    password: String,
    Type: String
});


const User = mongoose.model('User', user, "users");
module.exports = User;
