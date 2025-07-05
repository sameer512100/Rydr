const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: [true, "Pickup location is required"],
    trim: true,
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
    trim: true,
  },
  fare: {
    type: Number,
    required: [true, "Fare is required"],
    min: [0, "Fare must be positive"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
    min: [0, "Duration must be positive"],
  },
  distance: {
    type: Number,
    min: [0, "Distance must be positive"],
  },
  paymentID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp:{
    type: String,
    select: false,
    required:true
  }
});

module.exports = mongoose.model("RideModel", rideSchema);
