const rideModel = require("../models/rideM");
const mapService = require("./mapServices");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare.");
  }
  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

  // Defensive: Check if mapService returns valid numbers
  if (
    !distanceTime ||
    typeof distanceTime.distanceKm !== "number" ||
    typeof distanceTime.durationMin !== "number" ||
    isNaN(distanceTime.distanceKm) ||
    isNaN(distanceTime.durationMin)
  ) {
    throw new Error("Invalid distance or duration returned from mapService.");
  }

  // Example rates
  const rates = {
    auto: { baseFare: 30, perKmRate: 12, perMinRate: 2 },
    motorcycle: { baseFare: 20, perKmRate: 8, perMinRate: 1.5 },
    car: { baseFare: 50, perKmRate: 15, perMinRate: 3 },
  };

  const fares = {};
  for (const type in rates) {
    const { baseFare, perKmRate, perMinRate } = rates[type];
    fares[type] =
      baseFare +
      distanceTime.distanceKm * perKmRate +
      distanceTime.durationMin * perMinRate;
  }
  return fares;
}

function getOtp(num) {
  const max = Math.pow(10, num) - 1;
  const otp = crypto
    .randomInt(0, max + 1)
    .toString()
    .padStart(num, "0");
  return otp;
}

module.exports.createRide = async ({
  pickup,
  destination,
  vehicleType,
  userId,
}) => {
  if (!pickup || !destination || !vehicleType) {
    throw new Error("All fields are required to create a ride.");
  }
  const fare = await getFare(pickup, destination);

  // Defensive: Check for valid fare and userId
  if (
    !Object.prototype.hasOwnProperty.call(fare, vehicleType) ||
    typeof fare[vehicleType] !== "number" ||
    isNaN(fare[vehicleType])
  ) {
    throw new Error(`Invalid fare calculation for vehicleType: ${vehicleType}`);
  }
  if (!userId) {
    throw new Error("User ID is required to create a ride.");
  }

  const ride = await rideModel.create({
    user: userId,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.getFare = getFare;
