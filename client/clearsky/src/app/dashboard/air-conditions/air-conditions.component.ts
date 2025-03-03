import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Forecast, WeatherData } from '../../type/weatherType';

@Component({
  selector: 'app-air-conditions',
  standalone: true,
  imports: [],
  providers: [WeatherService],
  templateUrl: './air-conditions.component.html',
  styleUrl: './air-conditions.component.css',
})
export class AirConditionsComponent {
  @Input() weather: WeatherData | null = null;
}
