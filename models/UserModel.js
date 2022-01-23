const mongoose =require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 60
    },
    password : {
        type: String,
        required: true
    }
});


// creating the model
const User = mongoose.model('User', UserSchema);



module.exports = User
