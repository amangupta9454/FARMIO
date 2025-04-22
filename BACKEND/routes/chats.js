const express = require('express');
const router = express.Router();
const { getChat, sendMessage } = require('../controllers/chatController');
const { verifyToken } = require('../middleware/auth');

router.get('/:listingId', verifyToken, getChat);
router.post('/:listingId', verifyToken, sendMessage);

module.exports = router;