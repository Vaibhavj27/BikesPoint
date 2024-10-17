// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('Public')); // Serve static files from the frontend directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BikesPointDB')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Use user routes
app.use('/api', userRoutes); // Use the user routes with a '/api' prefix

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



