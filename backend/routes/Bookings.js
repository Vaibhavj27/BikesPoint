const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');  // Import User model

// POST route to create a new booking using email
router.post('/', async (req, res) => {
    const { userEmail, bikeName, price, startDate, endDate } = req.body;

    try {
        const newBooking = new Booking({ userEmail, bikeName, price, startDate, endDate });
        const savedBooking = await newBooking.save();

        const user = await User.findOne({ email: userEmail });  // Find user by email
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Add the booking to user's bookings array (optional)
        user.bookings.push(savedBooking._id);
        await user.save();

        res.json({ success: true, message: 'Booking saved successfully', booking: savedBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, message: 'Error saving booking', error });
    }
});
// GET route to fetch user's bookings using email
router.get('/user/:email/bookings', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate('bookings');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, bookings: user.bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ success: false, message: 'Error fetching user bookings', error });
    }
});



module.exports = router;
