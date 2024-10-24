// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const session = require('express-session')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('Public')); // Serve static files from the frontend directory


app.use(session({
    secret: '9359913123', // Replace with a secret key of your choice
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if you're using HTTPS
}));
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



