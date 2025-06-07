const userModel = require('../models/userM');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({ token, user });
};

module.exports.login = async (req, res, next) => {
    // Implement login logic here or add a placeholder
    res.send('Login route');
};

module.exports.getProfile = async (req, res, next) => {
    // Implement profile logic here or add a placeholder
    res.send('Profile route');
};