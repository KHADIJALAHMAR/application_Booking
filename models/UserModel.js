const mongoose =require('mongoose');
const bcrypt = require('bcrypt');

const RoleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    status: {
      type: Boolean
    }
});

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
    },
    role: RoleSchema,
});

UserSchema.pre('save', function(next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10).then((hashedPass) => {
        user.password = hashedPass;
        next();
    });
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compare(password, this.password);
}


// creating the model
const User = mongoose.model('User', UserSchema);



module.exports = User
