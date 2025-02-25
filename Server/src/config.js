require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    API_URL_CURRENT: process.env.API_URL_CURRENT,
    HOURLY_FORECAST: process.env.HOURLY_FORECAST,
    PORT: process.env.PORT || 3000,
    HASH: parseInt(process.env.HASH) || 12,
    API_KEY: process.env.API_KEY,
};
