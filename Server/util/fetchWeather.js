const Weather = require('../src/models/Weather');
const { API_URL_CURRENT, API_KEY, HOURLY_FORECAST } = require('../src/config');

async function fetchWeatherData(location) {
    try {
        let weatherData = await Weather.findOne({ city: location.city });

        // Fetch Current Weather Data
        const apiUrl = `${API_URL_CURRENT}&appid=${API_KEY}&q=${location.city}`;
        const currentRes = await fetch(apiUrl);
        if (!currentRes.ok) {
            throw new Error(`API request failed with status: ${currentRes.status}!`);
        }
        const newDataWeather = await currentRes.json();

        // Fetching Forecast Data
        const apiUrlForecast = `${HOURLY_FORECAST}&appid=${API_KEY}&q=${location.city}`;
        const forecastResponse = await fetch(apiUrlForecast);
        if (!forecastResponse.ok) {
            throw new Error(
                `Forecast API request failed with status: ${forecastResponse.status}`
            );
        }
        const forecastData = await forecastResponse.json();

        // Process Hourly Forecast (Next 7 Data Points)
        const forecastArray = forecastData.list.slice(0, 7).map((forecast) => ({
            dt_txt: forecast.dt_txt,
            temperature: Math.round(forecast.main.temp - 273.15),
            temp_min: Math.round(forecast.main.temp_min - 273.15),
            temp_max: Math.round(forecast.main.temp_max - 273.15),
            condition: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
        }));

        // Process Weekly Forecast
        const weeklyForecastArray = forecastData.list.map((forecast) => ({
            dt_txt: forecast.dt_txt,
            temp_min: Math.round(forecast.main.temp_min - 273.15),
            temp_max: Math.round(forecast.main.temp_max - 273.15),
            condition: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
        }));

        // Prepare New Weather Data
        const weatherUpdate = {
            city: location.city,
            temperature: Math.round(newDataWeather.main.temp - 273.15),
            feels_like: Math.round(newDataWeather.main.feels_like - 273.15),
            description: newDataWeather.weather[0].description,
            icon: newDataWeather.weather[0].icon,
            sunrise: newDataWeather.sys.sunrise,
            sunset: newDataWeather.sys.sunset,
            wind: newDataWeather.wind.speed,
            forecast: forecastArray,
            weeklyForecast: weeklyForecastArray,
        };

        // Update Existing Weather Data or Insert a New Entry
        weatherData = await Weather.findOneAndUpdate(
            { city: location.city },
            weatherUpdate,
            { new: true, upsert: true }
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
