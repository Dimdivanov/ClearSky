import { Component, Input} from '@angular/core';
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
export class WeeklyForecastComponent{
  @Input() weather: WeatherData | null = null;
}
