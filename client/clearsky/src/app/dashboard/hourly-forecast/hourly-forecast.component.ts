import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Forecast } from '../../type/weatherType';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [],
  providers: [WeatherService],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css',
})
export class HourlyForecastComponent implements OnInit {
  forecasts: (Forecast & { formattedTime: string } )[] = [];

  constructor(private forecastService: WeatherService) {}

  ngOnInit(): void {
    this.forecastService.getWeather().subscribe((data) => {
      this.forecasts = data.forecast.map((forecast) => ({
        ...forecast,
        formattedTime: this.formatTime(forecast.dt_txt),
      }));
    });
  }

  private formatTime(dt_txt: string): string {
    return dt_txt.split(' ')[1].slice(0, -3);
  }
}
