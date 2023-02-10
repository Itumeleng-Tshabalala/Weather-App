import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TownListComponent } from './components/town-list/town-list.component';
import { WeatherApi } from './api/weather.api';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TownListComponent,
    CurrentWeatherComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    TownListComponent,
    CurrentWeatherComponent,
  ],
  providers: [WeatherApi],
})
export class SharedModule {}
