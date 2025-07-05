const captainModel = require("../models/captainM");

module.exports.createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  if (
    !fullname ||
    !fullname.firstname ||
    !fullname.lastname ||
    !email ||
    !password ||
    !vehicle ||
    !vehicle.color ||
    !vehicle.plate ||
    !vehicle.capacity ||
    !vehicle.vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.create({
    fullname,
    email,
    password,
    vehicle,
  });
  return captain;
};
