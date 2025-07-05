const userModel = require("../models/userM");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklistM");
const captainModel = require("../models/captainM");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  const isBlacklisted = await Blacklist.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ error: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized access" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication token is missing ( UNAUTHORIZED )" });
  }

  const isBlacklisted = await Blacklist.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ error: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized access" });
  }
};
