const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  market: { type: String, required: true },
  commodity: { type: String, required: true },
  variety: { type: String, required: true },
  min_price: { type: Number, required: true, min: 0 },
  max_price: { type: Number, required: true, min: 0 },
  modal_price: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  fetchedAt: { type: Date, default: Date.now, required: true },
});

// Add unique compound index for upsert operations
priceSchema.index(
  { state: 1, district: 1, market: 1, commodity: 1, variety: 1, date: 1 },
  { unique: true }
);
// Index for common query patterns
priceSchema.index({ state: 1, commodity: 1, fetchedAt: -1 });

module.exports = mongoose.model('Price', priceSchema);