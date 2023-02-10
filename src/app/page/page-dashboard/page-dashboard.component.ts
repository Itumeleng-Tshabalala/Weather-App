import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherApi } from 'src/app/shared/api/weather.api';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  filter,
  map,
  mergeMap,
  Observable,
  of,
  share,
  switchMap,
  toArray,
} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.css'],
})
export class PageDashboardComponent implements OnInit, OnChanges {
  city!: string;
  forecasts: any[] = [];
  currentWeather: any = {};
  isCelcius: boolean = true;

  constructor(private _weatherApi: WeatherApi) {}

  ngOnInit(): void {
    setInterval(() => {
      this.getCurrentWeather(this.isCelcius);
      this.getFiveDaysWeatherForecast(this.isCelcius);
    }, 1200000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug('Changes', changes);
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }

  

  getCurrentWeather(isCelcius: boolean) {
    return this.getCurrentLocation()
      .pipe(
        mergeMap((params: any) => {
          console.debug('getCurrentLocation', params);
          return this._weatherApi.getCurrentWeather(params);
        }),
        map((response: any) => {
          console.debug('response', response);
          return this.getUpdateObject(response, isCelcius);
        })
      )
      .subscribe({
        next: (weather: any) => {
          this.currentWeather = weather;
          console.debug('this.currentWeather', this.currentWeather);
        },
        error: (error: any) => {},
        complete: () => {
          console.debug('Completed!');
        },
      });
  }

  getFiveDaysWeatherForecast(isCelcius: boolean) {
    return this.getCurrentLocation()
      .pipe(
        mergeMap((params: any) => {
          return this._weatherApi.getFiveDayWeatherForecast(params);
        }),
        map((response: any) => {
          this.city = _.get(response, 'city.name');
          return response.list;
        }),
        mergeMap((response: any) => {
          return of(...response);
        }),
        filter((response: any, index: number) => {
          return index % 8 === 0;
        }),
        map((response: any) => {
          return response;
        }),
        toArray(),
        share()
      )
      .subscribe({
        next: (forecasts: any) => {
          console.debug('getFiveDaysWeatherForecast', forecasts);
          this.forecasts = forecasts;
          this.filterFiveDaysWeatherForecasts(isCelcius);
        },
        error: (error: any) => {},
        complete: () => {
          console.debug('Completed!');
        },
      });
  }

  setIsCelcius(isCelcius: boolean) {
    this.isCelcius = isCelcius;
    console.debug('setIsCelcius', isCelcius);
  }

  filterFiveDaysWeatherForecasts(isCelcius: boolean) {
    console.debug('setIsCelcius', isCelcius);
    this.forecasts = this.forecasts.map((forecast: any, index) => {
      console.debug('Forecast', forecast);
      return this.getUpdateObject(forecast, isCelcius);
    });
  }

  getUpdateObject(object: any, isCelcius: boolean) {
    return {
      ..._.omit(object, ['main', 'dt']),
      main: {
        feels_like: _.get(object.main, 'feels_like'),
        grnd_level: _.get(object.main, 'grnd_level'),
        humidity: _.get(object.main, 'humidity'),
        pressure: _.get(object.main, 'pressure'),
        sea_level: _.get(object.main, 'sea_level'),
        temp: _.get(object.main, 'temp'),
        temp_kf: _.get(object.main, 'temp_kf'),
        temp_max: isCelcius
          ? (_.get(object.main, 'temp_max') - 273.15).toFixed(2)
          : ((_.get(object.main, 'temp_max') * 9) / 5 - 459.67).toFixed(2),
        temp_min: isCelcius
          ? (_.get(object.main, 'temp_min') - 273.15).toFixed(2)
          : ((_.get(object.main, 'temp_min') * 9) / 5 - 459.67).toFixed(2),
      },
      dt: object.dt ? this.formatDateTime(object.dt) : null,
    };
  }

  formatDateTime(value: number) {
    return new Date(value * 1000);
  }
}
