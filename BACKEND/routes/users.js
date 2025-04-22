const express = require('express');
const router = express.Router();
const { register, login, getProfile, sendOtp, verifyOtp, updateUpiId, requestWithdrawal, sendResetOtp, verifyResetOtp, resetPassword } = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.post('/update-upi', verifyToken, updateUpiId);
router.post('/request-withdrawal', verifyToken, requestWithdrawal);
router.post('/send-reset-otp', sendResetOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

module.exports = router;