const express = require('express');
const router = express.Router();
const { createListing, getListings, getListingById, deleteListing } = require('../controllers/listingController');
const { verifyToken } = require('../middleware/auth');
const multer = require('multer');

// Use memory storage to avoid saving files locally
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyToken, upload.single('image'), createListing);
router.get('/', getListings);
router.get('/:id', getListingById);
router.delete('/:id', verifyToken, deleteListing);

module.exports = router;