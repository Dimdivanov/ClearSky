export interface Forecast {
  dt_txt: string;
  temperature: number;
  temp_min: number;
  temp_max: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  wind: number;
  forecast: Forecast[]; // Array of forecast data
}
