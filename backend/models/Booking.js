const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bikeName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
