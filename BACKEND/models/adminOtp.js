const mongoose = require('mongoose');

const AdminOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires after 5 minutes
});

module.exports = mongoose.model('AdminOtp', AdminOtpSchema);