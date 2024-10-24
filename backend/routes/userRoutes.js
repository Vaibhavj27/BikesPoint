// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Booking = require('../models/Booking');
const session = require('express-session')
const router = express.Router();

// Sign Up route
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            bookings: [] // Initialize the bookings array
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});


// Sign In Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body; // Get email and password from the request body

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        req.session.UserId = user._id;
        // If authentication is successful, send a success response
        res.status(200).json({ message: 'Sign In successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



// GET route to retrieve the current user's ID
router.get('/api/current-user', async (req, res) => {
    try {
        const userId = req.user._id; // Assuming `req.user` contains the logged-in user's info
        res.json({ userId: userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user ID', error: err });
    }
});


// POST route to create a new booking
router.post('/api/bookings', async (req, res) => {
    try {
        const { bikeName, price, startDate, endDate } = req.body;
        const userId = req.session.UserId; // Get userId from session

        // Validate required fields
        if (!bikeName || !price || !startDate || !endDate || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Create a new booking
        const newBooking = new Booking({
            bikeName,
            price,
            startDate,
            endDate,
            userId // Make sure userId is coming from a logged-in user
        });

        const savedBooking = await newBooking.save();

        // Update the user's bookings array
        const user = await User.findById(userId);
        if (user) {
            user.bookings.push(savedBooking._id);
            await user.save();
        }

        res.status(201).json({ message: 'Booking successful', booking: savedBooking });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error booking the bike', error: err });
    }
});

module.exports=router;