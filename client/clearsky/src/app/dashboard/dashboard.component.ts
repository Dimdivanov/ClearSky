import { Component, OnInit } from '@angular/core';
import { Forecast, WeatherData } from '../type/weatherType';
import { WeatherService } from './weather.service';
import { SearchComponent } from './search/search.component';
import { WeatherComponent } from './weather/weather.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { AirConditionsComponent } from './air-conditions/air-conditions.component';
import { WeeklyForecastComponent } from './weekly-forecast/weekly-forecast.component';
import { ActivatedRoute } from '@angular/router';
import { HighlightMenuDirective } from '../directives/highlight-menu.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SearchComponent,
    WeatherComponent,
    HourlyForecastComponent,
    AirConditionsComponent,
    WeeklyForecastComponent,
    HighlightMenuDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  weatherData: WeatherData | null = null;
  forecasts: (Forecast & { formattedTime: string })[] = [];

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const city = params['search'];
      if (city) {
        this.updateWeather(city);
      } else {
        this.updateWeather('');
      }
    });
  }

  updateSearch(city: string): void {
    this.updateWeather(city);
  }

  updateWeather(city: string): void {
    this.weatherService.getWeather(city).subscribe({
      next: (weather) => {
        this.weatherData = weather;
        this.weatherService.setWeatherData(weather);

        this.forecasts = weather.forecast.map((forecast) => ({
          ...forecast,
          formattedTime: this.formatTime(forecast.dt_txt),
        }));
      },
      error: (err) => console.error('Error fetching initial weather:', err),
    });
  }

  private formatTime(dt_txt: string): string {
    return dt_txt.split(' ')[1].slice(0, -3); // Example format: '14:00'
  }
}
