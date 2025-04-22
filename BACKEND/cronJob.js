const cron = require('node-cron');
const axios = require('axios');
const Price = require('./models/Price');

const API_KEY = process.env.DATA_GOV_API_KEY;
const API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

// Schedule daily update at 2 AM (to ensure Agmarknet data is available)
cron.schedule('0 2 * * *', async () => {
  try {
    console.log(`Starting daily price update at ${new Date().toISOString()}`);

    // Fetch data with pagination to handle large datasets
    let offset = 0;
    const limit = 100;
    let allPrices = [];

    while (true) {
      const response = await axios.get(API_URL, {
        params: {
          'api-key': API_KEY,
          format: 'json',
          limit,
          offset,
        },
        timeout: 10000, // 10-second timeout
      });

      const records = response.data.records || [];
      if (records.length === 0) break;

      allPrices = allPrices.concat(
        records.map((record) => ({
          state: record.state,
          district: record.district,
          market: record.market,
          commodity: record.commodity,
          variety: record.variety,
          min_price: parseFloat(record.min_price) || 0,
          max_price: parseFloat(record.max_price) || 0,
          modal_price: parseFloat(record.modal_price) || 0,
          date: new Date(record.arrival_date),
          fetchedAt: new Date(),
        }))
      );

      offset += limit;
    }

    console.log(`Fetched ${allPrices.length} price records`);

    // Upsert to avoid duplicates
    let inserted = 0;
    let updated = 0;
    for (const price of allPrices) {
      const result = await Price.findOneAndUpdate(
        {
          state: price.state,
          district: price.district,
          market: price.market,
          commodity: price.commodity,
          variety: price.variety, // Added variety to ensure uniqueness
          date: price.date,
        },
        price,
        { upsert: true, new: true }
      );
      if (result.isNew) inserted++;
      else updated++;
    }

    console.log(`Daily price update completed: ${inserted} inserted, ${updated} updated`);
  } catch (error) {
    console.error('Error in daily price update:', error.message, error.stack);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
  }
});

// Log when cron starts
console.log('Cron job initialized for daily price updates');

module.exports = cron;