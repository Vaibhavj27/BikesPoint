
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // Array of booking IDs
});

module.exports = mongoose.model('User', userSchema);
