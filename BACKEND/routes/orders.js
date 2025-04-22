const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getOrders, acceptOrder, rejectOrder, getEarnings } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayment);
router.get('/', verifyToken, getOrders);
router.post('/accept', verifyToken, acceptOrder);
router.post('/reject', verifyToken, rejectOrder);
router.get('/earnings', verifyToken, getEarnings);

module.exports = router;