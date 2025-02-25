const Weather = require('../src/models/Weather');
const { API_URL_CURRENT, API_KEY, HOURLY_FORECAST } = require('../src/config');

async function fetchWeatherData(location) {
    try {
        let weatherData = await Weather.findOne({ city: location.city });

        // If cached data exists, update it; otherwise, fetch fresh data
        const apiUrl = `${API_URL_CURRENT}&appid=${API_KEY}&q=${location.city}`;
        const currentRes = await fetch(apiUrl);
        if (!currentRes.ok) {
            throw new Error(`API request failed with status: ${currentRes.status}!`);
        }
        const newDataWeather = await currentRes.json();

        // Fetching Forecast
        const apiUrlForecast = `${HOURLY_FORECAST}&appid=${API_KEY}&q=${location.city}`;
        const forecastResponse = await fetch(apiUrlForecast);
        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast API request failed with status: ${forecastResponse.status}`
            );
        }
        const forecastData = await forecastResponse.json();
        const forecastArray = forecastData.list.slice(0, 7).map((forecast) => ({
            dt_txt: forecast.dt_txt, // Date & time of forecast
            temperature: forecast.main.temp - 273.15,
            condition: forecast.weather[0].description, // Weather condition
            icon: forecast.weather[0].icon,
        }));

        // Prepare new weather data
        const weatherUpdate = {
            city: location.city,
            temperature: newDataWeather.main.temp - 273.15,
            feels_like: newDataWeather.main.feels_like - 273.15,
            description: newDataWeather.weather[0].description,
            icon: newDataWeather.weather[0].icon,
            sunrise: newDataWeather.sys.sunrise,
            sunset: newDataWeather.sys.sunset,
            wind: newDataWeather.wind.speed,
            forecast: forecastArray,
        };

        // Update existing weather data or insert new one
        weatherData = await Weather.findOneAndUpdate(
            { city: location.city },
            weatherUpdate,
            { new: true, upsert: true } // Returns the updated document & creates if it doesn't exist
        );

        console.log(
            weatherData ? 'Updated cached weather data' : 'Saved new weather data'
        );
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
}

module.exports = { fetchWeatherData };
