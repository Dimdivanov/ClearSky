import { Injectable } from '@angular/core';
import { WeatherData } from '../type/weatherType';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.apiUrl);
  }
}
