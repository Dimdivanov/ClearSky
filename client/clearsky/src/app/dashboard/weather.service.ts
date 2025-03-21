import { Injectable } from '@angular/core';
import { WeatherData } from '../type/weatherType';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherSubject$$ = new BehaviorSubject<WeatherData | null>(null);
  weather$ = this.weatherSubject$$.asObservable();
  
  constructor(private http: HttpClient) {}

  getWeather(city?: string): Observable<WeatherData> {
    let url = environment.apiUrl;
    if (city) {
      url += `?city=${city}`;
    }
    return this.http.get<WeatherData>(url);
  }

  setWeatherData(weather: WeatherData): void {
    this.weatherSubject$$.next(weather);
  }
}
