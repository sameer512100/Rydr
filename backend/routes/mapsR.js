const express = require("express");
const router = express.Router();
const authM = require("../middlewares/authM");
const mapsController = require("../controllers/mapsC");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authM.authUser,
  mapsController.getCoordinates
);

router.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  authM.authUser,
  mapsController.getDistanceAndTime
);


router.get("/get-suggestions",query("input").isString().isLength({min:3}),authM.authUser,mapsController.getSuggestions);

module.exports = router;
