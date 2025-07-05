const rideServe = require("../services/rideService");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userID, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideServe.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getFares = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.body;
  try {
    const fares = await rideServe.getFare(pickup, destination);
    res.json(fares);
  } catch (error) {
    res.status(500).json({ message: "Failed to get fares" });
  }
};