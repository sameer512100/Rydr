const { validationResult } = require("express-validator");
const mapService = require("../services/mapServices");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;
  try {
    const result = await mapService.getDistanceAndTime(origin, destination);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch distance and time" });
  }
};

module.exports.getSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;
  if (!input || input.trim() === "") {
    return res.status(400).json({ message: "Input query is required" });
  }

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("getSuggestions error:", error); // Add this for debugging
    res
      .status(500)
      .json({ message: "Unable to fetch suggestions", error: error.message });
  }
};
