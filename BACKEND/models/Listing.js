const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  locationName: { type: String, required: true },
  image: { type: String, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  manufactureDate: { type: Date, required: true },
  description: { type: String, required: true },
  specifications: { type: String, required: true },
});

ListingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', ListingSchema);