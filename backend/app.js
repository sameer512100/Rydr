// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Import route files
const userRoutes = require("./routes/userR"); // User-related routes
const captainRoutes = require("./routes/captainR"); // Captain-related routes
const mapRoutes = require('./routes/mapsR') // Map-routes
const rideRoutes = require('./routes/ridesR')

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// ---------------------------
// Middleware Setup
// ---------------------------

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// ---------------------------
// MongoDB Connection
// ---------------------------

// Connect to MongoDB using the URI from .env file or default local URI
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err);
  });

// ---------------------------
// Basic API Route
// ---------------------------

// Default route to check if the API is running
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// ---------------------------
// API Routes
// ---------------------------

// Mount user-related API routes under /users
app.use("/users", userRoutes);

// Mount captain-related API routes under /captains
app.use("/captains", captainRoutes);

app.use("/maps",mapRoutes);

app.use("/rides",rideRoutes)




// ---------------------------
// Start the Server
// ---------------------------

const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing or further configuration
module.exports = app;
