const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userR'); // Assuming you have a routes file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
.then(() => {
  console.log('Connected to MongoDB ✅');
})
.catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// User routes

app.use('/users',userRoutes); // Assuming you have user routes defined in userR.js






// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app for testing or further configuration
module.exports = app;