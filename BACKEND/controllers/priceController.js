const axios = require('axios');
const NodeCache = require('node-cache');
const Price = require('../models/Price');

const cache = new NodeCache({ stdTTL: 3600 }); // Reduced to 1 hour for fresher data

const API_KEY = process.env.DATA_GOV_API_KEY;
const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

exports.getPrices = async (req, res) => {
  try {
    const { state, commodity } = req.query;
    const cacheKey = `prices_${state || 'all'}_${commodity || 'all'}`;

    // Check cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Check local database for recent data (last 12 hours)
    let prices = await Price.find({
      ...(state && { state }),
      ...(commodity && { commodity }),
      fetchedAt: { $gte: new Date(Date.now() - 12 * 60 * 60 * 1000) }, // Last 12 hours
    });

    // If no recent data, fetch from Agmarknet API
    if (prices.length === 0) {
      let offset = 0;
      const limit = 100;
      let allRecords = [];

      while (true) {
        const response = await axios.get(API_URL, {
          params: {
            'api-key': API_KEY,
            format: 'json',
            limit,
            offset,
            ...(state && { 'filters[state]': state }),
            ...(commodity && { 'filters[commodity]': commodity }),
          },
          timeout: 10000,
        });

        const records = response.data.records || [];
        if (records.length === 0) break;

        allRecords = allRecords.concat(records);
        offset += limit;
      }

      prices = allRecords.map((record) => ({
        state: record.state,
        district: record.district,
        market: record.market,
        commodity: record.commodity,
        variety: record.variety,
        min_price: parseFloat(record.min_price) || 0,
        max_price: parseFloat(record.max_price) || 0,
        modal_price: parseFloat(record.modal_price) || 0,
        date: new Date(record.arrival_date),
      }));

      // Save to database
      if (prices.length > 0) {
        await Price.insertMany(
          prices.map((price) => ({ ...price, fetchedAt: new Date() })),
          { ordered: false } // Continue on errors
        );
        // Invalidate cache for this query
        cache.del(cacheKey);
      }
    }

    // Cache the response
    cache.set(cacheKey, prices);

    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error.message, error.stack);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
};