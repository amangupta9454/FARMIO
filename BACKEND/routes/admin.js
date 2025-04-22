const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

router.post('/send-otp', adminController.sendAdminOtp);
router.post('/verify-otp', adminController.verifyAdminOtp);
router.get('/analytics', verifyToken, adminMiddleware, adminController.getAnalytics);
router.get('/farmers', verifyToken, adminMiddleware, adminController.getFarmers);
router.get('/consumers', verifyToken, adminMiddleware, adminController.getConsumers);
router.post('/users', verifyToken, adminMiddleware, adminController.addUser);
router.put('/users/block/:id', verifyToken, adminMiddleware, adminController.blockUser);
router.put('/users/unblock/:id', verifyToken, adminMiddleware, adminController.unblockUser);
router.delete('/users/:id', verifyToken, adminMiddleware, adminController.removeUser);
router.get('/recent-listings', verifyToken, adminMiddleware, adminController.getRecentListings);

module.exports = router;