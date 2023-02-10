import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherApi extends Api {
  /**
   *
   * @param city
   * @param degreesType
   * @returns
   */
  getFiveDayWeatherForecast(params: any): Observable<any> {
    return this.getI(
      // [This API returns the five day weather forecast]
      `${environment.apiUrl}?lat=${params.latitude}&lon=${params.longitude}&appid=${environment.apiKey}`
    );
  }

  /**
   *
   * @param params
   * @returns
   */
  getCurrentWeather(params: any): Observable<any> {
    return this.getI(
      // [This API returns the current weather forecast]
      `${environment.currentWeatherApiUrl}?lat=${params.latitude}&lon=${params.longitude}&appid=${environment.apiKey}`
    );
  }
}
