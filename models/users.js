const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
}); 
const UsersModel = mongoose.model('users', usersSchema);

module.exports = UsersModel;