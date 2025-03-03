import { Component, Input, OnInit } from '@angular/core';
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
export class HourlyForecastComponent {
  @Input() forecasts: (Forecast & { formattedTime: string } )[] = [];
}
