import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../../type/weatherType';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [CommonModule],
  providers: [WeatherService, DatePipe],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.css',
})
export class WeeklyForecastComponent implements OnInit {
  weatherData: WeatherData | null = null;
  constructor(
    private forecastService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.forecastService.getWeather().subscribe({
      next: (weather) => {
        this.weatherData = weather;
      },
      error: (err) => console.error('Error fetching from weekly weather', err),
    });
  }
}
