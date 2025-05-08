const mongoose = require('mongoose');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type: String,
            required: true,
            minlength:[3, 'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5, 'Email must be at least 5 characters long'],
    },
    password:{
        type:String,
        required:true,
        Select:false,
    },
    sockedId:{
        type:String,
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return await brypt.compare(candidatePassword, user.password);
}


userSchema.statics.hashPassword = async function (password) {
    const salt = await brypt.genSalt(10);
    return await brypt.hash(password, salt);
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;