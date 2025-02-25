const cron = require('node-cron');
const mongoose = require('mongoose');
const Weather = require('./models/Weather');

const { MONGO_URI, API_URL_CURRENT, API_KEY } = require('./config');

mongoose.connect(MONGO_URI);

const fetchWeatherData = async () => {
    try {
        console.log('Fetching weather data...');

        const cities = await Weather.find().select('city');
        if (cities.length === 0) {
            console.log('No cities found in the database');
            return;
        }

        for (const city of cities) {
            const cityName = city.city;

            console.log(`Fetching data for ${cityName}...`);

            const apiUrl = `${API_URL_CURRENT}&appid=${API_KEY}&q=${cityName}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch data for ${cityName}: ${response.status}`
                );
            }

            const data = await response.json();
            const updatedWeather = await Weather.findOneAndUpdate(
                { city: cityName },
                {
                    temperature: data.main.temp - 273.15,
                    description: data.weather[0].description,
                },
                { new: true }
            );
            console.log(`Updated weather data for ${cityName}:`, updatedWeather);
        }
    } catch (error) {
        console.error('error fetching or saving the data:', error);
    }
};

cron.schedule('0 */6 * * *', fetchWeatherData, {
    scheduled: true,
    timezone: 'Europe/London',
});

console.log('Cron job scheduled to fetch weather data every 6 hours!');
