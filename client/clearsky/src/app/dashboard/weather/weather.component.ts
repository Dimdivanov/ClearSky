import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../../type/weatherType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  providers: [WeatherService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  @Input() weather: WeatherData | null = null;
}
