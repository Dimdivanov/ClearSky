const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
    dt_txt: { type: String, required: true },
    temperature: { type: Number, required: true },
    condition: { type: String, required: true },
    icon: { type: String, required: true },
});

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    temperature: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    sunrise: { type: Number, required: true },
    sunset: { type: Number, required: true },
    wind: { type: Number, required: true },
    forecast: [forecastSchema], // Array of hourly forecast details
});
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
