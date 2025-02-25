import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../type/weatherType';
import { WeatherService } from './weather.service';
import { SearchComponent } from "./search/search.component";
import { WeatherComponent } from "./weather/weather.component";
import { HourlyForecastComponent } from "./hourly-forecast/hourly-forecast.component";
import { AirConditionsComponent } from "./air-conditions/air-conditions.component";
import { WeeklyForecastComponent } from "./weekly-forecast/weekly-forecast.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent, WeatherComponent, HourlyForecastComponent, AirConditionsComponent, WeeklyForecastComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  weatherData: WeatherData | null = null;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (weather) => {
        console.log('Weather Data:', weather);
        this.weatherData = weather;
      },
      error: (err) => console.error('Error fetching weather:', err),
    });
  }
}
