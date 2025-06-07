const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long']
        },
        lastname:{
            type: String,
            minlength: [3,'Last name must be at least 3 characters long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required: true,
        select:false
    },
    socketId:{
        type: String,
        default: null
    },
})


userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;