import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../../type/weatherType';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  providers: [WeatherService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  weather: WeatherData | null = null;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.weatherService.getWeather().subscribe((data) => {
      this.weather = data;
    });
  }
}
