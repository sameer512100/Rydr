const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initializeSocket } = require("./socket");

const userRoutes = require("./routes/userR");
const captainRoutes = require("./routes/captainR");
const mapRoutes = require("./routes/mapsR");
const rideRoutes = require("./routes/ridesR");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err);
  });

// Health check
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Routes
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

// Server start
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
initializeSocket(server);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
