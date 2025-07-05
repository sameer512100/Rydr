const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d", // Automatically remove the document after 1 day
  },
});

module.exports = mongoose.model("Blacklist", blacklistSchema);
