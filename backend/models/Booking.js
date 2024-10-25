const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true }, // Change to email
    bikeName: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);