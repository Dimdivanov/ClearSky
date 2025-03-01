const router = require('express').Router();
const getUserLocation = require('../../util/getUserLocation');
const { fetchWeatherData } = require('../../util/fetchWeather');

router.get('/weather', async (req, res) => {
    try {
        const locationData = await getUserLocation(req);
        const weatherData = await fetchWeatherData(locationData);

        res.json(weatherData);
    } catch (err) {
        console.error('Could not fetch weather data:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
