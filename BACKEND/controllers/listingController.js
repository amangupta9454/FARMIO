const Listing = require('../models/Listing');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createListing = async (req, res) => {
  const { name, quantity, price, locationName, coordinates, category, manufactureDate, description, specifications } = req.body;
  try {
    if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can create listings' });
    
    // Prevent duplicate submissions
    const recentListing = await Listing.findOne({
      name,
      farmer: req.user.id,
      createdAt: { $gte: new Date(Date.now() - 1000) },
    });
    if (recentListing) {
      return res.status(409).json({ message: 'Duplicate listing detected' });
    }

    let imageUrl = null;
    if (req.file) {
      // Upload image buffer directly from memory
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'farmers-market', use_filename: true, unique_filename: false },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const listing = new Listing({
      name,
      quantity,
      price,
      location: coordinates ? { coordinates: JSON.parse(coordinates) } : undefined,
      locationName,
      image: imageUrl,
      farmer: req.user.id,
      category,
      manufactureDate,
      description,
      specifications,
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
};

const getListings = async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  try {
    const query = lat && lng ? {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(maxDistance) || 10000,
        },
      },
    } : {};
    const listings = await Listing.find(query).populate('farmer', 'name location');
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('farmer', 'name location');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Error fetching listing', error: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.farmer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the listing owner can delete it' });
    }
    await listing.deleteOne();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Error deleting listing', error: error.message });
  }
};

module.exports = { createListing, getListings, getListingById, deleteListing };