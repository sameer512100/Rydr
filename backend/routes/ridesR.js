const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/rideC");
const authMiddleware = require("../middlewares/authM");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);


router.post("/get-fares",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  rideController.getFares
);

module.exports = router;
