const captainModel = require('../models/captainM');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');
const blacklistModel = require('../models/blacklistM');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isEmailExists = await captainModel.findOne({ email });
    if (isEmailExists) {
        return res.status(400).json({ error: 'Captain already exists' });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword,
        vehicle
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    if (!captain) {
        return res.status(404).json({ error: 'Captain not found' });
    }
    
    res.status(200).json({ captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistModel.create({ token: token }); 
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}