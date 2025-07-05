const axios = require("axios");
require("dotenv").config();

module.exports.getAddressCoordinates = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const apiKey = process.env.GOOGLE_MAPS_API;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
    );

    const results = response.data.results;

    if (results.length === 0) {
      throw new Error("No results found for the given address.");
    }

    const location = results[0].geometry.location;

    return {
      ltd: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error("Error getting coordinates:", error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  try {
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const apiKey = process.env.GOOGLE_MAPS_API;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`
    );

    const data = response.data;

    if (
      !data.rows ||
      data.rows.length === 0 ||
      !data.rows[0].elements ||
      data.rows[0].elements.length === 0 ||
      data.rows[0].elements[0].status !== "OK"
    ) {
      throw new Error("Invalid distance matrix response.");
    }

    const element = data.rows[0].elements[0];

    // Parse distance and duration as numbers (in km and min)
    const distanceKm = element.distance.value / 1000; // meters to km
    const durationMin = element.duration.value / 60; // seconds to min

    return {
      distanceKm,
      durationMin,
    };
  } catch (error) {
    console.error("Error getting distance and time:", error.message);
    throw error;
  }
};


module.exports.getAutoCompleteSuggestions = async (input, offset = null) => {
  try {
    const encodedInput = encodeURIComponent(input);
    const apiKey = process.env.GOOGLE_MAPS_API;

    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;
    if (offset !== null) {
      url += `&offset=${offset}`;
    }

    const response = await axios.get(url);
    const predictions = response.data.predictions;

    return predictions.map((item) => ({
      description: item.description,
      placeId: item.place_id,
      terms: item.terms.map((term) => ({
        value: term.value,
        offset: term.offset,
      })),
    }));
  } catch (error) {
    console.error("Error getting autocomplete suggestions:", error.message);
    throw error;
  }
};
