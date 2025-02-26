import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Forecast } from '../../type/weatherType';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [],
  providers: [WeatherService],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.css',
})
export class WeeklyForecastComponent {

}
